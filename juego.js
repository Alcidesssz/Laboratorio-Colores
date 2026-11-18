/* =========================================================
   LABORATORIO DE COLORES
   Datos -> estado -> funciones de dibujo -> lógica -> inicio
   ========================================================= */

/* ---------- 1. DATOS ----------
   p = "partes" de [rojo, amarillo, azul] que tiene cada color.
   Así el juego calcula las mezclas sumando partes. */
const TIPOS = {
  primario:   { titulo: 'Color primario',   emoji: '🌟', texto: 'Los colores primarios son los 3 colores base: rojo, amarillo y azul. No se pueden hacer mezclando otros.' },
  secundario: { titulo: 'Color secundario', emoji: '🧪', texto: 'Los colores secundarios se hacen mezclando 2 colores primarios. Hay 3: naranja, verde y violeta.' },
  terciario:  { titulo: 'Color terciario',  emoji: '🌈', texto: 'Los colores terciarios se hacen mezclando un primario con un secundario vecino. Hay 6.' },
  secreto:    { titulo: 'Color secreto',    emoji: '🕵️', texto: 'Los colores secretos no están en el círculo, ¡pero se pueden descubrir!' }
};

const COLORES = [
  { id: 'rojo', nombre: 'Rojo', tipo: 'primario', hex: '#E53935', p: [1, 0, 0], receta: '',
    texto: 'El rojo no se puede hacer mezclando otros colores. ¡Es uno de los tres colores base!',
    ejemplos: [['🍎', 'la manzana'], ['🍓', 'la frutilla'], ['🚒', 'el camión de bomberos']] },
  { id: 'amarillo', nombre: 'Amarillo', tipo: 'primario', hex: '#FFD60A', p: [0, 1, 0], receta: '',
    texto: 'El amarillo es el color del sol y de la luz. Tampoco se puede hacer mezclando otros.',
    ejemplos: [['🌻', 'el girasol'], ['🍌', 'la banana'], ['🐥', 'el pollito']] },
  { id: 'azul', nombre: 'Azul', tipo: 'primario', hex: '#1E6FE8', p: [0, 0, 1], receta: '',
    texto: 'El azul es el tercer color base. Con él se pueden crear muchísimos colores nuevos.',
    ejemplos: [['🌊', 'el mar'], ['🐳', 'la ballena'], ['💧', 'una gota de agua']] },

  { id: 'naranja', nombre: 'Naranja', tipo: 'secundario', hex: '#FF8A00', p: [1, 1, 0], receta: 'rojo + amarillo',
    texto: 'Juntaste dos primarios: el rojo y el amarillo. ¡Salió el naranja!',
    ejemplos: [['🍊', 'la mandarina'], ['🥕', 'la zanahoria'], ['🦊', 'el zorro']] },
  { id: 'verde', nombre: 'Verde', tipo: 'secundario', hex: '#2EA84F', p: [0, 1, 1], receta: 'amarillo + azul',
    texto: 'El amarillo y el azul se juntaron y formaron el verde, el color de las plantas.',
    ejemplos: [['🐸', 'la rana'], ['🥦', 'el brócoli'], ['🌿', 'las hojas']] },
  { id: 'violeta', nombre: 'Violeta', tipo: 'secundario', hex: '#8E44D6', p: [1, 0, 1], receta: 'rojo + azul',
    texto: 'El rojo y el azul se hicieron amigos y formaron el violeta.',
    ejemplos: [['🍇', 'las uvas'], ['🍆', 'la berenjena'], ['🔮', 'una bola mágica']] },

  { id: 'rojo-anaranjado', nombre: 'Rojo anaranjado', tipo: 'terciario', hex: '#F4511E', p: [2, 1, 0], receta: 'rojo + naranja (o 2 rojos + 1 amarillo)',
    texto: 'Tiene más rojo que amarillo, por eso parece un rojo con ganas de ser naranja.',
    ejemplos: [['🔥', 'el fuego'], ['🦀', 'el cangrejo'], ['🌅', 'el atardecer']] },
  { id: 'amarillo-anaranjado', nombre: 'Amarillo anaranjado', tipo: 'terciario', hex: '#FFB300', p: [1, 2, 0], receta: 'amarillo + naranja (o 2 amarillos + 1 rojo)',
    texto: 'Es un amarillo con un toque de naranja, cálido como la miel.',
    ejemplos: [['🍯', 'la miel'], ['🍑', 'el durazno'], ['🦁', 'el león']] },
  { id: 'amarillo-verdoso', nombre: 'Amarillo verdoso', tipo: 'terciario', hex: '#B5D334', p: [0, 2, 1], receta: 'amarillo + verde (o 2 amarillos + 1 azul)',
    texto: 'Es un amarillo con un toque de verde, como las hojas cuando recién nacen.',
    ejemplos: [['🍐', 'la pera'], ['🎾', 'la pelota de tenis'], ['🐛', 'la oruga']] },
  { id: 'azul-verdoso', nombre: 'Azul verdoso', tipo: 'terciario', hex: '#14A8B8', p: [0, 1, 2], receta: 'azul + verde (o 2 azules + 1 amarillo)',
    texto: 'Es un azul con un toque de verde. ¡Parece el agua de un mar tropical!',
    ejemplos: [['🏊', 'el agua de la pileta'], ['🦚', 'el pavo real'], ['💎', 'una piedra turquesa']] },
  { id: 'azul-violaceo', nombre: 'Azul violáceo', tipo: 'terciario', hex: '#4B4BD6', p: [1, 0, 2], receta: 'azul + violeta (o 2 azules + 1 rojo)',
    texto: 'Es un azul con un toque de violeta, como el cielo cuando ya es de noche.',
    ejemplos: [['🌌', 'el cielo de noche'], ['🫐', 'los arándanos'], ['👖', 'los jeans']] },
  { id: 'rojo-violaceo', nombre: 'Rojo violáceo', tipo: 'terciario', hex: '#C2185B', p: [2, 0, 1], receta: 'rojo + violeta (o 2 rojos + 1 azul)',
    texto: 'Es un rojo con un toque de violeta, un color fuerte y muy vivo.',
    ejemplos: [['🌺', 'una flor fucsia'], ['🍬', 'un caramelo'], ['🦩', 'el flamenco']] },

  { id: 'marron', nombre: 'Marrón', tipo: 'secreto', hex: '#7B4B2A', p: [1, 1, 1], receta: 'rojo + amarillo + azul',
    texto: '¡Descubriste un color secreto! Cuando se juntan los tres primarios, los colores se apagan y sale el marrón.',
    ejemplos: [['🍫', 'el chocolate'], ['🪵', 'el tronco de un árbol'], ['🐻', 'el oso']] }
];

/* Orden de los colores en el círculo, empezando arriba y siguiendo las agujas del reloj */
const ORDEN_RUEDA = ['amarillo', 'amarillo-anaranjado', 'naranja', 'rojo-anaranjado', 'rojo', 'rojo-violaceo',
                     'violeta', 'azul-violaceo', 'azul', 'azul-verdoso', 'verde', 'amarillo-verdoso'];

const porId = {};
const porClave = {};
COLORES.forEach(c => { porId[c.id] = c; porClave[c.p.join(',')] = c; });
const TOTAL = COLORES.filter(c => c.tipo !== 'secreto').length; // 12 colores del círculo

/* ---------- 2. ESTADO ---------- */
const CLAVE_GUARDADO = 'laboratorio-colores-v1';
let descubiertos = new Set(['rojo', 'amarillo', 'azul']);
let estrellas = 0;
let olla = [];          // ids de los colores puestos en la olla (máximo 3)
let objetivo = null;    // id del color del desafío (o null si no hay desafío)

function guardar() {
  try { localStorage.setItem(CLAVE_GUARDADO, JSON.stringify({ d: [...descubiertos], e: estrellas })); } catch (e) {}
}
function cargar() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_GUARDADO));
    if (datos) { descubiertos = new Set(datos.d); estrellas = datos.e || 0; }
  } catch (e) {}
}

/* ---------- 3. DIBUJO ---------- */
const $ = id => document.getElementById(id);

function dibujarProgreso() {
  const n = [...descubiertos].filter(id => porId[id].tipo !== 'secreto').length;
  $('barra-relleno').style.width = (n / TOTAL * 100) + '%';
  $('progreso-texto').textContent = n + ' de ' + TOTAL + ' colores' + (descubiertos.has('marron') ? ' + 1 secreto' : '');
  $('estrellas').textContent = '⭐ ' + estrellas;
}

function dibujarPaleta() {
  const grupos = [['primario', 'Primarios'], ['secundario', 'Secundarios'], ['terciario', 'Terciarios'], ['secreto', 'Secreto']];
  $('paleta').innerHTML = '';
  grupos.forEach(([tipo, titulo]) => {
    const div = document.createElement('div');
    div.className = 'grupo';
    div.innerHTML = '<h3>' + TIPOS[tipo].emoji + ' ' + titulo + '</h3><div class="fila"></div>';
    const fila = div.querySelector('.fila');
    COLORES.filter(c => c.tipo === tipo).forEach(c => {
      const item = document.createElement('div');
      item.className = 'item';
      const b = document.createElement('button');
      b.className = 'color-btn';
      if (descubiertos.has(c.id)) {
        b.style.background = c.hex;
        b.setAttribute('aria-label', 'Agregar ' + c.nombre + ' a la olla');
        b.onclick = () => agregar(c.id);
        item.append(b);
        item.insertAdjacentHTML('beforeend', '<span class="etiqueta-color">' + c.nombre + '</span>');
      } else {
        b.classList.add('bloqueado');
        b.textContent = '?';
        b.setAttribute('aria-label', 'Color todavía no descubierto');
        b.onclick = () => mostrarMensaje('🔒', 'Todavía no descubriste este color. ¡Seguí mezclando!');
        item.append(b);
      }
      fila.append(item);
    });
    $('paleta').append(div);
  });
}

function hexARgb(h) { return [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); }

function dibujarOlla() {
  $('slots').innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('button');
    s.className = 'slot';
    if (olla[i]) {
      s.classList.add('lleno');
      s.style.background = porId[olla[i]].hex;
      s.setAttribute('aria-label', 'Sacar ' + porId[olla[i]].nombre + ' de la olla');
      s.onclick = () => { olla.splice(i, 1); dibujarOlla(); };
    } else {
      s.setAttribute('aria-label', 'Lugar vacío');
    }
    $('slots').append(s);
  }
  // Vista previa: promedio de los colores que hay en la olla
  const vp = $('vista-previa');
  if (olla.length) {
    const suma = [0, 0, 0];
    olla.forEach(id => hexARgb(porId[id].hex).forEach((v, i) => suma[i] += v));
    vp.style.background = 'rgb(' + suma.map(v => Math.round(v / olla.length)).join(',') + ')';
    vp.textContent = '';
  } else {
    vp.style.background = '#E6E8F2';
    vp.textContent = '?';
  }
}

function polar(r, grados) {
  const a = grados * Math.PI / 180;
  return (150 + r * Math.cos(a)).toFixed(1) + ' ' + (150 + r * Math.sin(a)).toFixed(1);
}

function dibujarRueda() {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 300 300');
  ORDEN_RUEDA.forEach((id, i) => {
    const c = porId[id];
    const a0 = -105 + i * 30, a1 = a0 + 30;
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M' + polar(140, a0) + ' A140 140 0 0 1 ' + polar(140, a1) +
                           ' L' + polar(65, a1) + ' A65 65 0 0 0 ' + polar(65, a0) + ' Z');
    path.setAttribute('class', 'segmento');
    path.setAttribute('role', 'button');
    path.setAttribute('tabindex', '0');
    if (descubiertos.has(id)) {
      path.setAttribute('fill', c.hex);
      path.setAttribute('aria-label', c.nombre);
      const ver = () => mostrarColor(c, {});
      path.onclick = ver;
      path.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') ver(); };
    } else {
      path.classList.add('bloqueado');
      path.setAttribute('aria-label', 'Color sin descubrir');
    }
    svg.append(path);
    if (!descubiertos.has(id)) {
      const t = document.createElementNS(NS, 'text');
      const [x, y] = polar(102, a0 + 15).split(' ');
      t.setAttribute('x', x); t.setAttribute('y', +y + 7);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '22'); t.setAttribute('font-weight', 'bold');
      t.setAttribute('fill', '#1F2340');
      t.textContent = '?';
      svg.append(t);
    }
  });
  const centro = document.createElementNS(NS, 'text');
  centro.setAttribute('x', 150); centro.setAttribute('y', 162);
  centro.setAttribute('text-anchor', 'middle'); centro.setAttribute('font-size', '40');
  centro.textContent = '🎨';
  svg.append(centro);
  $('rueda').innerHTML = '';
  $('rueda').append(svg);
}

function dibujarDesafio() {
  const d = $('desafio');
  if (!objetivo) { d.hidden = true; $('btn-desafio').textContent = '🎯 Jugar desafío'; return; }
  const c = porId[objetivo];
  d.hidden = false;
  $('btn-desafio').textContent = '❌ Salir del desafío';
  d.innerHTML = '<span class="mini" style="background:' + c.hex + '"></span>' +
                '<p><b>Desafío:</b> ¡creá el color <b>' + c.nombre + '</b>!</p>' +
                '<button class="btn" id="btn-otro">Otro color</button>';
  $('btn-otro').onclick = nuevoDesafio;
}

function mostrarMensaje(emoji, texto) {
  $('resultado').innerHTML = '<div class="mensaje"><span class="emoji">' + emoji + '</span><p>' + texto + '</p></div>';
}

function mostrarColor(c, op) {
  const t = TIPOS[c.tipo];
  $('resultado').innerHTML =
    (op.nuevo ? '<div class="cinta">🎉 ¡Nuevo color desbloqueado!</div>' : '') +
    '<div class="tarjeta-cab"><span class="bolita" style="background:' + c.hex + '"></span>' +
      '<div><h3>' + c.nombre + '</h3><span class="etiqueta ' + c.tipo + '">' + t.emoji + ' ' + t.titulo + '</span></div></div>' +
    '<p>' + c.texto + '</p>' +
    (c.receta ? '<p class="receta">🧪 <b>Receta:</b> ' + c.receta + '</p>' : '') +
    '<p class="tipo-explica">' + t.texto + '</p>' +
    '<p class="ejemplos-tit">Cosas de este color:</p>' +
    '<ul class="ejemplos">' + c.ejemplos.map(e => '<li><span>' + e[0] + '</span>' + e[1] + '</li>').join('') + '</ul>' +
    (op.nota ? '<p class="nota">' + op.nota + '</p>' : '');
}

function confeti() {
  const colores = ['#E53935', '#FFD60A', '#1E6FE8', '#FF8A00', '#2EA84F', '#8E44D6'];
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('span');
    s.className = 'confeti';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.background = colores[i % colores.length];
    s.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.append(s);
    setTimeout(() => s.remove(), 2600);
  }
}

/* ---------- 4. LÓGICA ---------- */
const mcd = (a, b) => b ? mcd(b, a % b) : a;

// Suma las "partes" de cada color y simplifica (2 rojos + 2 amarillos = 1 rojo + 1 amarillo)
function calcular(ids) {
  const v = [0, 0, 0];
  ids.forEach(id => porId[id].p.forEach((n, i) => v[i] += n));
  if (v.every(n => n > 0)) return porId['marron'];
  const g = v.reduce(mcd);
  return porClave[v.map(n => n / g).join(',')] || null;
}

function agregar(id) {
  if (olla.length >= 3) {
    mostrarMensaje('🫕', 'La olla está llena (máximo 3 colores). Tocá un color de la olla para sacarlo.');
    $('slots').classList.remove('sacudir'); void $('slots').offsetWidth; $('slots').classList.add('sacudir');
    return;
  }
  olla.push(id);
  dibujarOlla();
}

function mezclar() {
  if (olla.length < 2) { mostrarMensaje('🤔', 'Poné al menos 2 colores en la olla para mezclar.'); return; }
  const c = calcular(olla);
  const vp = $('vista-previa');
  if (!c) {
    mostrarMensaje('🤷', 'Esa mezcla no forma ninguno de los colores del círculo. ¡Probá con otra combinación!');
    return;
  }
  vp.style.background = c.hex; vp.textContent = '';
  vp.classList.remove('salto'); void vp.offsetWidth; vp.classList.add('salto');

  const nuevo = !descubiertos.has(c.id);
  let nota = '';
  if (nuevo) { descubiertos.add(c.id); confeti(); }
  else if (c.tipo === 'primario') nota = 'Mezclar un color con sí mismo no lo cambia: ¡sigue siendo ' + c.nombre.toLowerCase() + '!';
  else nota = 'Este color ya lo habías descubierto.';

  if (objetivo && c.id === objetivo) {
    estrellas++;
    nota = '⭐ ¡Cumpliste el desafío! Ganaste una estrella.';
    confeti();
    objetivo = null;
    nuevoDesafio();
  }
    // Limpiar la olla, pero dejar el color nuevo a la vista en el círculo grande
  olla = [];
  dibujarOlla();
  vp.style.background = c.hex;
  vp.textContent = '';
  mostrarColor(c, { nuevo, nota });
  guardar();
  dibujarProgreso(); dibujarPaleta(); dibujarRueda();
}

function nuevoDesafio() {
  const candidatos = COLORES.filter(c => c.tipo !== 'primario' && c.tipo !== 'secreto' && c.id !== objetivo);
  objetivo = candidatos[Math.floor(Math.random() * candidatos.length)].id;
  dibujarDesafio();
}

function reiniciar() {
  if (!confirm('¿Seguro que querés empezar de nuevo? Se borra todo lo que descubriste.')) return;
  descubiertos = new Set(['rojo', 'amarillo', 'azul']);
  estrellas = 0; olla = []; objetivo = null;
  guardar();
  iniciar();
}

/* ---------- 5. INICIO ---------- */
function iniciar() {
  dibujarProgreso(); dibujarPaleta(); dibujarOlla(); dibujarRueda(); dibujarDesafio();
  mostrarMensaje('👋', '¡Hola! Tocá dos colores de tu paleta para ponerlos en la olla y después apretá <b>Mezclar</b>.');
}

$('btn-mezclar').onclick = mezclar;
$('btn-limpiar').onclick = () => { olla = []; dibujarOlla(); };
$('btn-desafio').onclick = () => { if (objetivo) { objetivo = null; dibujarDesafio(); } else nuevoDesafio(); };
$('btn-reiniciar').onclick = reiniciar;

cargar();
iniciar();
