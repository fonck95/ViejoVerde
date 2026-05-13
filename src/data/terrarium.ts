export type Species = {
  num: string
  name: string
  scientific: string
  role: string
  origin: 'Bosque' | 'Vivero' | 'Ecosistema'
  detail: string
}

export type CareNote = {
  title: string
  body: string
  icon: 'water' | 'light' | 'thermo' | 'vent' | 'alert' | 'care'
}

export const terrarium = {
  code: 'VV-001',
  name: 'El Guardián del Roble',
  subtitle: 'Reliquia viva de un bosque silencioso',
  born: 'Abril 12, 2024',
  origin: 'Bosque de niebla · Santander, Colombia',
  age: '13 lunas',
  number: '01 / 24',
  story: [
    'Nació en las laderas húmedas donde la niebla se posa sobre la piedra cada mañana.',
    'Recolectado a mano, en silencio, durante una caminata de cuatro horas que terminó al borde de un viejo roble.',
    'Cada fragmento de musgo, cada raíz, cada espora fue separada con cuidado, sin romper el equilibrio del bosque que lo entregó.',
  ],
  promise: 'No vendemos plantas. Cuidamos reliquias vivas de pequeños bosques.',
  species: [
    {
      num: '01',
      name: 'Fittonia',
      scientific: 'Fittonia albivenis',
      role: 'Cobertura · color',
      origin: 'Vivero',
      detail: 'Hojas pequeñas con nervaduras plateadas que sostienen la humedad.',
    },
    {
      num: '02',
      name: 'Musgo',
      scientific: 'Briófita silvestre',
      role: 'Alfombra · respiración',
      origin: 'Bosque',
      detail: 'Una alfombra antigua que mantiene viva la microfauna del frasco.',
    },
    {
      num: '03',
      name: 'Selaginella',
      scientific: 'Selaginella sp.',
      role: 'Helecho · textura',
      origin: 'Bosque',
      detail: 'Capas plumosas que recuerdan al sotobosque cuando hay neblina.',
    },
    {
      num: '04',
      name: 'Espatifilo',
      scientific: 'Spathiphyllum sp.',
      role: 'Hoja ancha · acento',
      origin: 'Bosque',
      detail: 'Variante silvestre, pequeña, con una espata blanca que aparece a veces.',
    },
    {
      num: '05',
      name: 'Colémbolos',
      scientific: 'Collembola',
      role: 'Microorganismos · limpieza',
      origin: 'Ecosistema',
      detail: 'Pequeños habitantes que mantienen el frasco vivo y libre de moho.',
    },
  ] satisfies Species[],
  care: [
    {
      title: 'Riego',
      body: 'Cada 2 a 4 semanas. Sólo si no hay condensación visible en el vidrio. Mejor poca agua que demasiada.',
      icon: 'water',
    },
    {
      title: 'Luz',
      body: 'Indirecta y constante. Nunca sol directo. Cerca de una ventana con cortina o sombra parcial.',
      icon: 'light',
    },
    {
      title: 'Temperatura',
      body: 'Entre 18 °C y 26 °C. Lejos de corrientes de aire y cambios bruscos.',
      icon: 'thermo',
    },
    {
      title: 'Ventilación',
      body: 'Si el vidrio se opaca por días, abrir el corcho 30 minutos por semana.',
      icon: 'vent',
    },
    {
      title: 'Señales',
      body: 'Olor a pantano = exceso de agua. Hojas amarillas = falta de luz. Moho blanco superficial es normal.',
      icon: 'alert',
    },
    {
      title: 'Acompañamiento',
      body: 'Tienes 3 visitas de asistencia incluidas durante el primer año. Escríbenos cuando lo necesites.',
      icon: 'care',
    },
  ] satisfies CareNote[],
  process: [
    {
      step: 'I',
      title: 'Caminar',
      body: 'Vamos al bosque a observar. No tomamos nada todavía; sólo escuchamos.',
    },
    {
      step: 'II',
      title: 'Recolectar',
      body: 'Sólo lo que el bosque puede dar sin romperse. Musgo desplazado, esquejes caídos, esporas.',
    },
    {
      step: 'III',
      title: 'Componer',
      body: 'Capas de roca, carbón, sustrato y vida. Cada frasco tarda dos semanas en encontrar su silencio.',
    },
    {
      step: 'IV',
      title: 'Cuidar',
      body: 'Antes de salir, lo observamos por treinta días. Sólo entonces se entrega.',
    },
  ],
}
