const SHADER = /* wgsl */ `
struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

struct Uniforms {
  srcSize: vec2<f32>,
};

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var tex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> u: Uniforms;

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> VOut {
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0,  1.0),
  );
  var uvs = array<vec2<f32>, 4>(
    vec2<f32>(0.0, 1.0),
    vec2<f32>(1.0, 1.0),
    vec2<f32>(0.0, 0.0),
    vec2<f32>(1.0, 0.0),
  );
  var out: VOut;
  out.pos = vec4<f32>(positions[vi], 0.0, 1.0);
  out.uv = uvs[vi];
  return out;
}

// Mitchell-Netravali B=1/3, C=1/3 -- a balanced bicubic kernel that keeps
// edges sharp without introducing ringing artifacts typical of Lanczos.
fn mitchell(x: f32) -> f32 {
  let B: f32 = 1.0 / 3.0;
  let C: f32 = 1.0 / 3.0;
  let ax = abs(x);
  if (ax < 1.0) {
    return ((12.0 - 9.0 * B - 6.0 * C) * ax * ax * ax
          + (-18.0 + 12.0 * B + 6.0 * C) * ax * ax
          + (6.0 - 2.0 * B)) / 6.0;
  } else if (ax < 2.0) {
    return ((-B - 6.0 * C) * ax * ax * ax
          + (6.0 * B + 30.0 * C) * ax * ax
          + (-12.0 * B - 48.0 * C) * ax
          + (8.0 * B + 24.0 * C)) / 6.0;
  }
  return 0.0;
}

@fragment
fn fs(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let size = u.srcSize;
  let coord = uv * size - vec2<f32>(0.5, 0.5);
  let baseI = floor(coord);
  let f = coord - baseI;

  var accum = vec4<f32>(0.0, 0.0, 0.0, 0.0);
  var totalW = 0.0;
  for (var dy: i32 = -1; dy <= 2; dy = dy + 1) {
    for (var dx: i32 = -1; dx <= 2; dx = dx + 1) {
      let w = mitchell(f32(dx) - f.x) * mitchell(f32(dy) - f.y);
      let sx = baseI.x + f32(dx) + 0.5;
      let sy = baseI.y + f32(dy) + 0.5;
      let st = clamp(vec2<f32>(sx / size.x, sy / size.y), vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 1.0));
      accum = accum + textureSampleLevel(tex, samp, st, 0.0) * w;
      totalW = totalW + w;
    }
  }
  return accum / totalW;
}
`

let cachedDevice: Promise<GPUDevice | null> | null = null

function getDevice(): Promise<GPUDevice | null> {
  if (cachedDevice) return cachedDevice
  cachedDevice = (async () => {
    if (!('gpu' in navigator) || !navigator.gpu) return null
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) return null
    return adapter.requestDevice()
  })().catch(() => null)
  return cachedDevice
}

export function isWebGPUAvailable(): boolean {
  return typeof navigator !== 'undefined' && 'gpu' in navigator && !!navigator.gpu
}

export async function upscaleToCanvas(
  canvas: HTMLCanvasElement,
  bitmap: ImageBitmap,
  scale: number,
): Promise<void> {
  const device = await getDevice()
  if (!device) throw new Error('WebGPU device unavailable')

  const ctx = canvas.getContext('webgpu') as GPUCanvasContext | null
  if (!ctx) throw new Error('WebGPU canvas context unavailable')

  const targetW = Math.max(1, Math.round(bitmap.width * scale))
  const targetH = Math.max(1, Math.round(bitmap.height * scale))
  canvas.width = targetW
  canvas.height = targetH

  const format = navigator.gpu.getPreferredCanvasFormat()
  ctx.configure({ device, format, alphaMode: 'premultiplied' })

  const texture = device.createTexture({
    size: [bitmap.width, bitmap.height],
    format: 'rgba8unorm',
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  })
  device.queue.copyExternalImageToTexture(
    { source: bitmap, flipY: false },
    { texture, premultipliedAlpha: true },
    [bitmap.width, bitmap.height],
  )

  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
    addressModeU: 'clamp-to-edge',
    addressModeV: 'clamp-to-edge',
  })

  const module = device.createShaderModule({ code: SHADER })
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: { module, entryPoint: 'vs' },
    fragment: { module, entryPoint: 'fs', targets: [{ format }] },
    primitive: { topology: 'triangle-strip' },
  })

  const uniformBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(
    uniformBuffer,
    0,
    new Float32Array([bitmap.width, bitmap.height, 0, 0]),
  )

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: texture.createView() },
      { binding: 2, resource: { buffer: uniformBuffer } },
    ],
  })

  const encoder = device.createCommandEncoder()
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: ctx.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
      },
    ],
  })
  pass.setPipeline(pipeline)
  pass.setBindGroup(0, bindGroup)
  pass.draw(4)
  pass.end()
  device.queue.submit([encoder.finish()])

  texture.destroy()
  uniformBuffer.destroy()
}
