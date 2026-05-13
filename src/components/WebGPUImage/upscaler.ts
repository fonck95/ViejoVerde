const VS = /* wgsl */ `
struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

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
`

// Lanczos-3 windowed sinc: 6x6 taps in source-pixel space. Preserves edge
// detail better than Mitchell-Netravali bicubic when enlarging logos with
// hard boundaries. Sampling is performed on premultiplied-alpha data so
// transparent neighbors do not bleed dark fringes onto opaque edges.
const UPSCALE_FS = /* wgsl */ `
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

const PI: f32 = 3.141592653589793;

fn sinc(x: f32) -> f32 {
  let ax = abs(x);
  if (ax < 1.0e-5) { return 1.0; }
  let px = PI * x;
  return sin(px) / px;
}

fn lanczos3(x: f32) -> f32 {
  if (abs(x) >= 3.0) { return 0.0; }
  return sinc(x) * sinc(x / 3.0);
}

@fragment
fn fs(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let size = u.srcSize;
  let coord = uv * size - vec2<f32>(0.5, 0.5);
  let baseI = floor(coord);
  let f = coord - baseI;

  var accum = vec4<f32>(0.0, 0.0, 0.0, 0.0);
  var totalW = 0.0;
  for (var dy: i32 = -2; dy <= 3; dy = dy + 1) {
    let wy = lanczos3(f32(dy) - f.y);
    for (var dx: i32 = -2; dx <= 3; dx = dx + 1) {
      let wx = lanczos3(f32(dx) - f.x);
      let w = wx * wy;
      let sx = (baseI.x + f32(dx) + 0.5) / size.x;
      let sy = (baseI.y + f32(dy) + 0.5) / size.y;
      let st = clamp(vec2<f32>(sx, sy), vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 1.0));
      accum = accum + textureSampleLevel(tex, samp, st, 0.0) * w;
      totalW = totalW + w;
    }
  }
  return accum / max(totalW, 1.0e-4);
}
`

// Light unsharp mask in destination space to recover the micro-contrast that
// any resampling kernel inevitably softens. The 5-tap cross blur is cheap and
// avoids the ringing a wide Gaussian would produce on already-sharp edges.
const SHARPEN_FS = /* wgsl */ `
struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

struct Uniforms {
  texelSize: vec2<f32>,
  amount: f32,
  _pad: f32,
};

@group(0) @binding(0) var samp: sampler;
@group(0) @binding(1) var tex: texture_2d<f32>;
@group(0) @binding(2) var<uniform> u: Uniforms;

@fragment
fn fs(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  let c  = textureSampleLevel(tex, samp, uv, 0.0);
  let n  = textureSampleLevel(tex, samp, uv + vec2<f32>( 0.0, -u.texelSize.y), 0.0);
  let s  = textureSampleLevel(tex, samp, uv + vec2<f32>( 0.0,  u.texelSize.y), 0.0);
  let e  = textureSampleLevel(tex, samp, uv + vec2<f32>( u.texelSize.x,  0.0), 0.0);
  let w  = textureSampleLevel(tex, samp, uv + vec2<f32>(-u.texelSize.x,  0.0), 0.0);
  let blur = c * 0.5 + (n + s + e + w) * 0.125;
  let sharp = c + (c - blur) * u.amount;
  // Keep premultiplied invariant: RGB <= A and within [0,1].
  let a = clamp(sharp.a, 0.0, 1.0);
  let rgb = clamp(sharp.rgb, vec3<f32>(0.0), vec3<f32>(a));
  return vec4<f32>(rgb, a);
}
`

type Pipelines = {
  device: GPUDevice
  upscale: GPURenderPipeline
  sharpen: GPURenderPipeline
  canvasFormat: GPUTextureFormat
  sampler: GPUSampler
}

let cachedDevice: Promise<GPUDevice | null> | null = null
let cachedPipelines: Pipelines | null = null

function getDevice(): Promise<GPUDevice | null> {
  if (cachedDevice) return cachedDevice
  cachedDevice = (async () => {
    if (!('gpu' in navigator) || !navigator.gpu) return null
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' })
    if (!adapter) return null
    return adapter.requestDevice()
  })().catch(() => null)
  return cachedDevice
}

async function getPipelines(canvasFormat: GPUTextureFormat): Promise<Pipelines | null> {
  if (cachedPipelines && cachedPipelines.canvasFormat === canvasFormat) return cachedPipelines
  const device = await getDevice()
  if (!device) return null

  const vsModule = device.createShaderModule({ code: VS })
  const upscaleFs = device.createShaderModule({ code: UPSCALE_FS })
  const sharpenFs = device.createShaderModule({ code: SHARPEN_FS })

  const upscale = device.createRenderPipeline({
    layout: 'auto',
    vertex: { module: vsModule, entryPoint: 'vs' },
    fragment: { module: upscaleFs, entryPoint: 'fs', targets: [{ format: 'rgba16float' }] },
    primitive: { topology: 'triangle-strip' },
  })

  const sharpen = device.createRenderPipeline({
    layout: 'auto',
    vertex: { module: vsModule, entryPoint: 'vs' },
    fragment: { module: sharpenFs, entryPoint: 'fs', targets: [{ format: canvasFormat }] },
    primitive: { topology: 'triangle-strip' },
  })

  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
    addressModeU: 'clamp-to-edge',
    addressModeV: 'clamp-to-edge',
  })

  cachedPipelines = { device, upscale, sharpen, canvasFormat, sampler }
  return cachedPipelines
}

export function isWebGPUAvailable(): boolean {
  return typeof navigator !== 'undefined' && 'gpu' in navigator && !!navigator.gpu
}

export async function upscaleToCanvas(
  canvas: HTMLCanvasElement,
  bitmap: ImageBitmap,
  targetW: number,
  targetH: number,
  sharpness: number,
): Promise<void> {
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
  const pipelines = await getPipelines(canvasFormat)
  if (!pipelines) throw new Error('WebGPU device unavailable')
  const { device, upscale, sharpen, sampler } = pipelines

  const ctx = canvas.getContext('webgpu') as GPUCanvasContext | null
  if (!ctx) throw new Error('WebGPU canvas context unavailable')

  const w = Math.max(1, Math.round(targetW))
  const h = Math.max(1, Math.round(targetH))
  if (canvas.width !== w) canvas.width = w
  if (canvas.height !== h) canvas.height = h

  ctx.configure({
    device,
    format: canvasFormat,
    alphaMode: 'premultiplied',
    colorSpace: 'srgb',
  })

  // Upload source as premultiplied so the resample kernel weights opaque
  // and transparent samples correctly without bleeding background black.
  const sourceTexture = device.createTexture({
    size: [bitmap.width, bitmap.height],
    format: 'rgba8unorm',
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  })
  device.queue.copyExternalImageToTexture(
    { source: bitmap, flipY: false },
    { texture: sourceTexture, premultipliedAlpha: true, colorSpace: 'srgb' },
    [bitmap.width, bitmap.height],
  )

  const upscaled = device.createTexture({
    size: [w, h],
    format: 'rgba16float',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT,
  })

  const upscaleUniforms = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(
    upscaleUniforms,
    0,
    new Float32Array([bitmap.width, bitmap.height, 0, 0]),
  )

  const upscaleBindGroup = device.createBindGroup({
    layout: upscale.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: sourceTexture.createView() },
      { binding: 2, resource: { buffer: upscaleUniforms } },
    ],
  })

  const sharpenUniforms = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(
    sharpenUniforms,
    0,
    new Float32Array([1 / w, 1 / h, Math.max(0, sharpness), 0]),
  )

  const sharpenBindGroup = device.createBindGroup({
    layout: sharpen.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: sampler },
      { binding: 1, resource: upscaled.createView() },
      { binding: 2, resource: { buffer: sharpenUniforms } },
    ],
  })

  const encoder = device.createCommandEncoder()

  const upPass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: upscaled.createView(),
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
      },
    ],
  })
  upPass.setPipeline(upscale)
  upPass.setBindGroup(0, upscaleBindGroup)
  upPass.draw(4)
  upPass.end()

  const finalPass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: ctx.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
      },
    ],
  })
  finalPass.setPipeline(sharpen)
  finalPass.setBindGroup(0, sharpenBindGroup)
  finalPass.draw(4)
  finalPass.end()

  device.queue.submit([encoder.finish()])

  sourceTexture.destroy()
  upscaled.destroy()
  upscaleUniforms.destroy()
  sharpenUniforms.destroy()
}
