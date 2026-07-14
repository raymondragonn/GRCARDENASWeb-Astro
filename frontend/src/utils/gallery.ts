const CAPTION_DICTIONARY: Record<string, string> = {
  // obra-mecanica
  'amarre-pozo': 'Amarre a pozo',
  'bateria-separacion': 'Batería de separación',
  'cabezal-pozo': 'Cabezal de pozo',
  'cabezal-recoleccion-aerea': 'Cabezal de recolección aérea',
  'codo-valvulas': 'Codo y válvulas',
  colector: 'Colector',
  'cuadrilla-ducto': 'Cuadrilla en ducto',
  'excavadora-tuberia': 'Excavadora en tubería',
  'inspeccion-junta': 'Inspección de junta',
  'inspeccion-soldadura': 'Inspección de soldadura',
  instrumentacion: 'Instrumentación',
  'junta-tuberia': 'Junta de tubería',
  'linea-conduccion': 'Línea de conducción',
  'montaje-tuberia': 'Montaje de tubería',
  'patio-instalacion-aerea': 'Patio de instalación aérea',
  'rotulado-linea': 'Rotulado de línea',
  'senalizacion-ducto': 'Señalización de ducto',
  soldadura: 'Soldadura',
  'tendido-tuberia': 'Tendido de tubería',
  'zanja-tuberia': 'Zanja de tubería',
  // obra-civil
  chapeo: 'Chapeo',
  'cimentacion-concreto': 'Cimentación de concreto',
  'compactacion-terreno': 'Compactación de terreno',
  'cuadrilla-campo': 'Cuadrilla en campo',
  'topografia-marcaje': 'Topografía y marcaje',
  'tractor-desbroce': 'Tractor de desbroce',
  // infra-metalica
  'cercado-perimetral': 'Cercado perimetral',
  // anticorrosiva
  'inspeccion-recubrimiento': 'Inspección de recubrimiento',
  'manga-termocontractil': 'Manga termocontráctil',
  'prueba-recubrimiento': 'Prueba de recubrimiento',
  recubrimiento: 'Recubrimiento',
  sandblast: 'Sandblast',
  'sellado-junta': 'Sellado de junta',
  // renta
  capacitacion: 'Capacitación DC-5',
  'fletes-transporte-maquinaria': 'Fletes y transporte de maquinaria',
  'hiab-grua': 'Grúa Hiab',
  retroexcavadora: 'Retroexcavadora',
  // nosotros
  'control-acceso-seguridad': 'Control de acceso y seguridad',
  'gestion-residuos': 'Gestión de residuos',
  'vehiculo-flotilla': 'Vehículo de flotilla',
  // experiencia
  'vista-aerea-instalacion': 'Vista aérea de instalación',
};

function humanizeSlug(slug: string): string {
  if (CAPTION_DICTIONARY[slug]) return CAPTION_DICTIONARY[slug];
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Deriva un texto legible a partir de un nombre de archivo con el patrón
 * `{prefijoCategoria}-{subcategoria}-{NN}.ext`, p. ej.
 * captionFromFilename('obra-mecanica-cabezal-pozo-24.jpg', 'obra-mecanica') -> 'Cabezal de pozo'
 */
export function captionFromFilename(filename: string, categoryPrefix: string): string {
  const base = filename.replace(/\.(jpe?g|png)$/i, '');
  const withoutPrefix = base.startsWith(`${categoryPrefix}-`) ? base.slice(categoryPrefix.length + 1) : base;
  const slug = withoutPrefix.replace(/-\d+$/, '');
  return humanizeSlug(slug || withoutPrefix);
}

export function sortByFilename<T extends { path: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
}
