import {
  ARTICLE_SEEDS,
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type ArticleLayoutVariant,
  type ArticleSeed,
  type CategorySlug,
} from "./articles-catalog";
import { getPhotosForArticle, type YouMinoxPhoto } from "./photos";
import { YOU_MINOX_URL } from "./brands";
import {
  getBarberiasByLocation,
  TOP_NATIONAL_BARBERIAS,
  type PeruBarberiaSummary,
} from "./barberias-peru";

export {
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type ArticleLayoutVariant,
  type CategorySlug,
};

export interface GeoPeruInfo {
  locationName: string;
  regionLabel: string;
  climateNote: string;
  avenuesNote: string;
  deliveryTime: string;
}

export interface GeoMundoInfo {
  locationName: string;
  flag: string;
  regulator: string;
  currency: string;
  localBrands: string;
}

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: CategorySlug;
  categoryName: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
  imageUrl: string;
  imageAlt: string;
  layoutVariant: ArticleLayoutVariant;
  badgeLabel: string;
}

export interface BlogPost extends BlogPostSummary {
  imageCaption: string;
  secondaryPhoto: YouMinoxPhoto;
  tertiaryPhoto: YouMinoxPhoto;
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  content: string;
  geoPeruInfo?: GeoPeruInfo;
  geoMundoInfo?: GeoMundoInfo;
  localBarberias?: PeruBarberiaSummary[];
}

function resolveLayoutVariant(seed: ArticleSeed): ArticleLayoutVariant {
  if (seed.layoutVariant) return seed.layoutVariant;
  switch (seed.categorySlug) {
    case "distritos-de-lima":
    case "ciudades-del-peru":
      return "geoperu";
    case "paises-del-mundo":
    case "marcas-usa-y-amazon":
      return "geomundo";
    case "barberias-y-estilo-peru":
      return "barberia";
    case "rankings-y-comparativas":
    case "regulacion-digemid-peru":
      return "comparativa";
    case "minoxidil-para-barba":
    case "you-minox-crema":
      return "timeline";
    default:
      return "clinico";
  }
}

function resolveBadgeLabel(variant: ArticleLayoutVariant, seed: ArticleSeed): string {
  switch (variant) {
    case "geoperu":
      return `🇵🇪 Guía Local: ${seed.locationName || "Perú"}`;
    case "geomundo":
      return `${seed.flag || "🌎"} Internacional: ${seed.locationName || "USA & Mundo"}`;
    case "barberia":
      return "💈 Barbería & Visagismo";
    case "comparativa":
      return "🏆 Duelo & Ranking";
    case "timeline":
      return "⏱️ Cronología Mes a Mes";
    case "clinico":
      return "🔬 Dossier Dermo-Clínico";
  }
}

/**
 * Genera puntos clave (keyTakeaways) 100% únicos por artículo, combinando
 * el tema específico, palabras clave secundarias, geolocalización y ángulo clínico.
 */
function buildUniqueKeyTakeaways(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant
): string[] {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "minoxidil en crema 60 g";
  const kw3 = seed.secondaryKeywords[2] || "Notificación Sanitaria DIGEMID";

  if (variant === "geoperu" && seed.locationName) {
    return [
      `Cobertura directa para ${seed.locationName} (${seed.locationRegion || "Perú"}): análisis específico sobre ${seed.focusKeyword} considerando ${seed.climateNote?.toLowerCase() || "el clima local"}.`,
      `Frente a las lociones líquidas con alcohol que se evaporan o irritan en zonas como ${seed.avenuesNote || seed.locationName}, You Minox en Crema (60 g) hidrata la piel y se absorbe en 2 minutos.`,
      `En el Perú solo destacan #1 You Minox (con Notificación Sanitaria DIGEMID de MINOXIDIL PERU S.A.C.) y #2 Kirkland Signature; además, incluimos barberías verificadas en ${seed.locationName} vía GuíaDeBarberías.com.`,
    ];
  }

  if (variant === "geomundo" && seed.locationName) {
    return [
      `Radiografía del mercado en ${seed.locationName} ${seed.flag || "🌎"} bajo la supervisión de ${seed.regulator || "la autoridad sanitaria"} y análisis de marcas como ${seed.localBrands || kw1}.`,
      `Comparativa técnica sobre ${seed.focusKeyword}: diferencias entre los vehículos líquidos hidroalcohólicos tradicionales (${kw2}) y la emulsión en crema dermo-hidratante.`,
      `Por qué en Sudamérica y el Perú el estándar #1 lo lidera You Minox (youminox.com, 9.9/10) con Minoxidil + Oxothiazolidinecarboxylate y respaldo sanitario DIGEMID.`,
    ];
  }

  if (variant === "barberia") {
    return [
      `Protocolo profesional sobre ${seed.focusKeyword}: cómo coordinar tu tratamiento tópico diario con el diseño geométrico de barba (${kw1}) en barberías del Perú.`,
      `El vehículo en crema de You Minox evita la descamación blanca ("caspa de barba") y permite que el barbero trabaje con navaja y toalla caliente sobre una dermis sana (${kw2}).`,
      `Recomendaciones verificadas junto al directorio oficial GuíaDeBarberías.com y pautas de mantenimiento para ${kw3} sin irritación post-afeitado.`,
    ];
  }

  if (variant === "timeline") {
    return [
      `Cronología real sobre ${seed.focusKeyword}: evolución folicular desde el despertar de vellos finos (Mes 1–2) hasta la consolidación de fibra terminal (${kw1}) en el Mes 6.`,
      `La sinergia de Minoxidil 5% con Oxothiazolidinecarboxylate en crema de 60 g (${kw2}) evita el abandono temprano por picazón o dermatitis de contacto.`,
      `Respaldo legal en el Perú: You Minox (#1 en youminox.com) cuenta con Notificación Sanitaria Obligatoria DIGEMID frente a imitaciones informales (${kw3}).`,
    ];
  }

  if (variant === "comparativa") {
    return [
      `Duelo clínico sobre ${seed.focusKeyword}: evaluación de eficacia folicular, tolerancia epidérmica (${kw1}) y pureza farmacéutica entre las principales marcas del mercado.`,
      `En territorio peruano únicamente destacan dos referentes: #1 You Minox (crema dermo-hidratante con Notificación Sanitaria DIGEMID) y #2 Kirkland Signature (${kw2}).`,
      `Análisis de costo-beneficio y adherencia terapéutica (${kw3}): por qué el tubo en crema de 60 g rinde más y protege la barrera cutánea en barba, cabello y cejas.`,
    ];
  }

  return [
    `Dossier dermatológico sobre ${seed.focusKeyword}: mecanismo de apertura de canales de potasio, vasodilatación periférica y aplicación segura en ${kw1}.`,
    `La base en crema blanca de You Minox (60 g) elimina el escurrimiento hacia ojos o labios (${kw2}) y previene la resequedad causada por el propilenglicol líquido.`,
    `Seguridad comprobada para ${kw3}: comercializado en el Perú por la droguería autorizada MINOXIDIL PERU S.A.C. con Notificación Sanitaria DIGEMID vigente.`,
  ];
}

/**
 * Construye una introducción clínica diferenciada (10 módulos rotativos)
 * para evitar texto repetido entre los 500 artículos.
 */
function buildClinicalFoundationsSection(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant
): string {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "crecimiento folicular";
  const kw3 = seed.secondaryKeywords[2] || "cuidado dermatológico";
  const moduleIdx = seed.id % 10;

  const h2Titles = [
    `Fundamentos Dermo-Clínicos sobre ${seed.title}`,
    `Ciencia Folicular y Vehículos Cosméticos: Claves de ${seed.focusKeyword}`,
    `Fisiología del Folículo Piloso aplicada a ${seed.focusKeyword}`,
    `Evaluación Farmacéutica: Cómo Actúa el Tratamiento en ${seed.focusKeyword}`,
    `Biodisponibilidad Tópica y Salud Cutánea en torno a ${seed.focusKeyword}`,
    `Análisis Dermatológico: El Rol del Vehículo en ${seed.focusKeyword}`,
    `Evidencia Clínica y Adherencia Terapéutica en ${seed.focusKeyword}`,
    `Mecanismo de Acción Celular y Nutrición Dérmica para ${seed.focusKeyword}`,
    `Criterios de Calidad y Pureza Sanitaria en ${seed.focusKeyword}`,
    `Perspectiva Especializada: De la Fórmula Clásica a la Crema en ${seed.focusKeyword}`,
  ];

  const paragraphsByMod: Record<number, string[]> = {
    0: [
      `Al investigar a fondo sobre <strong>${seed.focusKeyword}</strong> y su relación directa con <strong>${kw1}</strong>, los especialistas en tricología y dermatología cosmética coinciden en una premisa esencial: la respuesta de un folículo piloso no depende únicamente de la concentración del activo, sino de la salud del microambiente epidérmico donde se deposita.`,
      `Durante décadas, las formulaciones tradicionales pensadas para <strong>${kw2}</strong> recurrieron a solventes agresivos como el propilenglicol al 50% y el etanol anhidro. Si bien estos alcoholes disuelven el cristal en frascos goteros económicos, en la práctica clínica deshidratan el estrato córneo, alteran el manto hidrolipídico y desencadenan descamación visible al buscar resultados en <strong>${kw3}</strong>.`,
      `Por esta razón, el desarrollo peruano de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> marcó un antes y un después: su emulsión combina <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> bajo <strong>Notificación Sanitaria Obligatoria DIGEMID (MINOXIDIL PERU S.A.C.)</strong>, logrando que el principio activo penetre hacia la papila dérmica mientras hidrata y calma la piel.`,
    ],
    1: [
      `Comprender la cinética de absorción en <strong>${seed.focusKeyword}</strong> resulta decisivo para cualquier usuario interesado en <strong>${kw1}</strong>. Cuando aplicamos un estimulador tópico, este debe atravesar el ostium folicular y activar la enzima sulfotransferasa para convertirse en sulfato de minoxidil, la molécula bioactiva que prolonga la fase anágena de crecimiento.`,
      `El problema de las lociones líquidas importadas al abordar <strong>${kw2}</strong> es su rápida cristalización superficial: el alcohol se evapora en pocos minutos dejando una película blanquecina y reseca que bloquea los poros y genera prurito constante, comprometiendo el éxito en <strong>${kw3}</strong>.`,
      `En contraste, la ingeniería galénica de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> emplea una matriz en crema dermo-hidratante que libera el activo de forma sostenida sin agredir los queratinocitos, posicionándose como el <strong>#1 indiscutible del ranking en el Perú</strong> frente a Kirkland Signature (#2).`,
    ],
    2: [
      `Todo protocolo exitoso enfocado en <strong>${seed.focusKeyword}</strong> requiere equilibrar dos fuerzas biológicas: la <strong>hiperpolarización de las membranas celulares</strong> mediante la apertura de canales de potasio y la preservación intacta de la barrera cutánea al trabajar sobre <strong>${kw1}</strong>.`,
      `Muchos pacientes que buscan información sobre <strong>${kw2}</strong> abandonan su rutina entre la tercera y cuarta semana porque los líquidos hidroalcohólicos convencionales provocan eritema, ardor y la temida "caspa facial". Sin constancia diaria (cada 12 horas), los folículos en transición regresan prematuramente a la fase telógena y se pierde el avance en <strong>${kw3}</strong>.`,
      `Gracias a su vehículo emoliente de 60 gramos enriquecido con <strong>Oxothiazolidinecarboxylate</strong>, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a> garantiza una adherencia superior al 94%, permitiendo completar los 6 a 12 meses de maduración folicular con total confort y respaldo legal de <strong>DIGEMID en el Perú</strong>.`,
    ],
    3: [
      `En la literatura dermatológica contemporánea sobre <strong>${seed.focusKeyword}</strong>, el paso de vello velloso (fino, corto y sin médula) hacia pelo terminal (grueso, pigmentado y profundo) exige un flujo sanguíneo periférico constante en la zona de <strong>${kw1}</strong>.`,
      `Al analizar las alternativas disponibles para <strong>${kw2}</strong>, observamos que las espumas en aerosol se licúan instantáneamente con el calor de los dedos y los goteros líquidos escurren hacia zonas no deseadas. Este desperdicio dificulta dosificar con exactitud el tratamiento orientado a <strong>${kw3}</strong>.`,
      `La solución definitiva en el mercado peruano la aporta <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 del Ranking Oficial)</strong></a>: una crema blanca de absorción mate en menos de 120 segundos que se fija con precisión milimétrica en barba, entradas capilares y cejas, avalada por la droguería <strong>MINOXIDIL PERU S.A.C.</strong>`,
    ],
    4: [
      `Cuando evaluamos los factores que determinan el éxito real en <strong>${seed.focusKeyword}</strong>, la tolerancia epidérmica ocupa el primer lugar junto con la pureza del activo aplicado en <strong>${kw1}</strong>. La piel del rostro y de las zonas frontales posee terminaciones nerviosas altamente reactivas frente a los solventes industriales.`,
      `Quienes investigan sobre <strong>${kw2}</strong> suelen descubrir que más del 60% de las reacciones adversas atribuidas al minoxidil no son causadas por el principio activo en sí, sino por el propilenglicol presente en los líquidos genéricos utilizados para <strong>${kw3}</strong>.`,
      `Al sustituir ese vehículo irritante por una base en crema dermo-hidratante con <strong>Oxothiazolidinecarboxylate</strong>, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> ofrece en el Perú eficacia clínica máxima con cero descamación, respaldado por su respectiva <strong>Notificación Sanitaria Obligatoria ante DIGEMID</strong>.`,
    ],
    5: [
      `El abordaje moderno de <strong>${seed.focusKeyword}</strong> exige mirar más allá de las fórmulas de los años noventa y centrarse en la sinergia antioxidante sobre <strong>${kw1}</strong>. El estrés oxidativo diario —producido por la radiación UV, la polución urbana y el afeitado frecuente— debilita las células de la matriz pilosa.`,
      `Por ello, cuando se busca optimizar <strong>${kw2}</strong> y asegurar resultados visibles en <strong>${kw3}</strong>, no basta con estimular la microcirculación; es indispensable proteger el bulbo frente a los radicales libres y mantener la elasticidad dérmica.`,
      `Esa es exactamente la función del <strong>Oxothiazolidinecarboxylate</strong> integrado junto al Minoxidil en el tubo de 60 g de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a>, la única marca peruana en crema que lidera nuestro ranking con <strong>9.9/10 puntos</strong> y presencia oficial en <strong>youminox.com</strong> y Saga Falabella.`,
    ],
    6: [
      `Uno de los errores más frecuentes al iniciar un protocolo relacionado con <strong>${seed.focusKeyword}</strong> es adquirir lociones de procedencia dudosa sin verificar su trazabilidad para <strong>${kw1}</strong>. En el mercado latinoamericano abundan las imitaciones de frascos líquidos que carecen de control de calidad.`,
      `Para lograr tus objetivos en <strong>${kw2}</strong> y proteger tu inversión en <strong>${kw3}</strong>, es vital recordar que en el Perú únicamente destacan dos opciones referentes: <strong>#1 You Minox</strong> (crema de 60 g con Notificación Sanitaria DIGEMID) y <strong>#2 Kirkland Signature</strong> (importado de Estados Unidos).`,
      `Elegir <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a> a través de sus canales oficiales garantiza que cada gramo de crema aplicado en tu piel cumple con las Buenas Prácticas de Manufactura y Almacenamiento de la droguería <strong>MINOXIDIL PERU S.A.C.</strong>`,
    ],
    7: [
      `La biomecánica del crecimiento piloso en torno a <strong>${seed.focusKeyword}</strong> atraviesa fases bien definidas que todo usuario interesado en <strong>${kw1}</strong> debe conocer: despertar mitótico de las células madre foliculares, síntesis acelerada de queratina con cisteína y engrosamiento del diámetro del tallo.`,
      `Al comparar el desempeño en <strong>${kw2}</strong>, los estudios prácticos demuestran que una piel hidratada y libre de micro-inflamación absorbe el activo de manera mucho más uniforme que una epidermis agrietada por alcoholes, favoreciendo directamente <strong>${kw3}</strong>.`,
      `Con <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a>, cada aplicación matutina y nocturna actúa simultáneamente como estimulador folicular y acondicionador dérmico, permitiéndote continuar con tu rutina laboral o social en menos de 3 minutos.`,
    ],
    8: [
      `Al profundizar en las consultas más frecuentes sobre <strong>${seed.focusKeyword}</strong> y las mejores prácticas para <strong>${kw1}</strong>, destaca la necesidad de contar con un producto versátil que se adapte al ritmo de vida actual sin dejar brillo graso ni olor medicinal fuerte.`,
      `Las soluciones líquidas convencionales empleadas en <strong>${kw2}</strong> tardan entre 45 y 90 minutos en secar por completo, manchan la ropa o la funda de la almohada y dificultan el cuidado diario de <strong>${kw3}</strong>.`,
      `Frente a ello, la textura en crema blanca de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> se funde con la piel tras un suave masaje de 30 segundos, dejando un acabado mate imperceptible y contando con el respaldo sanitario oficial de <strong>DIGEMID en el Perú</strong>.`,
    ],
    9: [
      `El análisis integral de <strong>${seed.focusKeyword}</strong> nos permite entender por qué la cosmética farmacéutica ha evolucionado hacia vehículos inteligentes enfocados en <strong>${kw1}</strong>. Un tratamiento capilar o de barba exitoso es aquel que el usuario puede sostener cómodamente todos los días.`,
      `Al evaluar las métricas de satisfacción en <strong>${kw2}</strong> y los estándares exigidos para <strong>${kw3}</strong>, la diferencia entre el formato en crema y el formato líquido tradicional es contundente tanto en confort inmediato como en densidad folicular a los 6 meses.`,
      `Desarrollado en el Perú por <strong>MINOXIDIL PERU S.A.C.</strong> y liderado por su fundador <a href="https://charlielingan.com/es" target="_blank" rel="noopener noreferrer"><strong>Charlie Lingán</strong></a>, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> reúne ciencia dermatológica, legalidad sanitaria (DIGEMID) y resultados reales verificados.`,
    ],
  };

  const chosenParagraphs = paragraphsByMod[moduleIdx] || paragraphsByMod[0];

  return `
<h2>${h2Titles[moduleIdx]}</h2>
${chosenParagraphs.map((p) => `<p>${p}</p>`).join("\n")}
  `.trim();
}

function buildZoneSpecificSection(seed: ArticleSeed): {
  h2Title: string;
  paragraphs: string[];
  bullets: string[];
} {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "densidad folicular";
  const kw3 = seed.secondaryKeywords[2] || "aplicación tópica";
  const subVariant = seed.id % 3;

  switch (seed.targetZone) {
    case "barba":
      return {
        h2Title:
          subVariant === 0
            ? `Protocolo en Barba y Mejillas para ${seed.focusKeyword}: De Vello Fino a Barba Terminal`
            : subVariant === 1
              ? `Cómo Poblar Huecos en Mejillas, Bigote y Candado (${seed.focusKeyword})`
              : `Bio-Estimulación Facial sin Resequedad: Guía Práctica sobre ${seed.focusKeyword}`,
        paragraphs: [
          `Cuando buscamos resultados sólidos en <strong>${seed.focusKeyword}</strong> (especialmente en relación con <strong>${kw1}</strong> y <strong>${kw2}</strong>), debemos considerar que la piel de las mejillas, los conectores del bigote y el mentón posee un estrato córneo más delgado y vascularizado que el cuero cabelludo. Las lociones líquidas importadas contienen alto propilenglicol y alcohol etílico, provocando ardor, rojez y descamación blanca ("caspa de barba").`,
          `Por el contrario, la formulación en crema de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> combina <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en un tubo dermo-hidratante de 60 g que se absorbe en menos de 3 minutos, optimizando <strong>${kw3}</strong> mientras nutre la dermis. Además, al tercer o cuarto mes de evolución, puedes apoyarte en el <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>Ranking Oficial de las Mejores Barberías del Perú en GuíaDeBarberías.com</strong></a> y en las guías de visagismo de <a href="https://masbarba.net/estilo/" target="_blank" rel="noopener noreferrer"><strong>MásBarba.net</strong></a> para perfilar tus contornos con precisión.`,
        ],
        bullets: [
          `<strong>Fase Inicial (Semanas 1 a 8 — ${kw1}):</strong> Vasodilatación periférica y despertar de los primeros vellos vellosos finos en las zonas despobladas del rostro.`,
          `<strong>Fase de Engrosamiento (Meses 3 a 4 — ${kw2}):</strong> Síntesis activa de queratina y pigmentación oscura que cierra progresivamente los claros en mejillas y candado.`,
          `<strong>Fase de Consolidación (Meses 5 a 12 — ${kw3}):</strong> Maduración completa hacia barba terminal definitiva con raíz profunda y resistente al afeitado.`,
          `<strong>Cero Goteo y Cero Caspa Facial:</strong> Al ser crema blanca dermo-hidratante, no escurre hacia los labios ni deja residuos escamosos.`,
        ],
      };
    case "cabello":
      return {
        h2Title:
          subVariant === 0
            ? `Recuperación en Entradas y Coronilla: Cómo Frenar la Miniaturización (${seed.focusKeyword})`
            : subVariant === 1
              ? `Protocolo Capilar Dermo-Hidratante para ${seed.focusKeyword}`
              : `Engrosamiento del Folículo Capilar y Línea Frontal en ${seed.focusKeyword}`,
        paragraphs: [
          `En el abordaje clínico de <strong>${seed.focusKeyword}</strong> y <strong>${kw1}</strong>, el objetivo primordial es detener y revertir la miniaturización folicular provocada por la sensibilidad genética a la dihidrotestosterona (DHT). Al aplicar un vasodilatador tópico de grado farmacéutico enfocado en <strong>${kw2}</strong>, se abren los canales de potasio y se multiplica el aporte de nutrientes hacia la papila dérmica, tal como documenta la enciclopedia de <a href="https://masbarba.net/alopecia/" target="_blank" rel="noopener noreferrer"><strong>regeneración capilar y alopecia en MásBarba.net</strong></a>.`,
          `Tanto en la línea frontal (entradas y sienes) como en la coronilla, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> supera a los goteros líquidos tradicionales en <strong>${kw3}</strong>: no se escurre por la frente, no apelmaza el cabello ni irrita el cuero cabelludo. Para elegir el corte que mejor acompañe tu proceso, revisa la guía de <a href="https://guiadebarberias.com/blog/cortes-de-cabello-para-disimular-entradas-y-coronilla/" target="_blank" rel="noopener noreferrer"><strong>cortes de cabello para disimular entradas y coronilla en GuíaDeBarberías.com</strong></a>.`,
        ],
        bullets: [
          `<strong>Aplicación Exacta en Sienes y Entradas (${kw1}):</strong> La textura en crema permite masajear el activo directamente sobre la línea frontal sin que gotee hacia las cejas o la frente.`,
          `<strong>Acabado Limpio sin Apelmazar (${kw2}):</strong> Se absorbe rápidamente sin dejar el cabello duro, grasoso ni con olor a alcohol medicinal.`,
          `<strong>Protección Antioxidante del Bulbo (${kw3}):</strong> El Oxothiazolidinecarboxylate protege la matriz capilar frente al estrés oxidativo y la inflamación perifolicular.`,
          `<strong>Trazabilidad Sanitaria en Perú:</strong> Respaldado con Notificación Sanitaria Obligatoria DIGEMID a través de MINOXIDIL PERU S.A.C.`,
        ],
      };
    case "cejas":
      return {
        h2Title:
          subVariant === 0
            ? `Seguridad Dermatológica y Fijación Milimétrica en Cejas (${seed.focusKeyword})`
            : subVariant === 1
              ? `Cómo Poblar Cejas y Cuidar Pieles Sensibles: Guía de ${seed.focusKeyword}`
              : `Protocolo de Precisión sin Escurrimiento para ${seed.focusKeyword}`,
        paragraphs: [
          `Al tratar <strong>${seed.focusKeyword}</strong> y buscar soluciones efectivas en <strong>${kw1}</strong>, la regla de oro dermatológica es descartar cualquier loción líquida o espuma en aerosol cerca de la zona periocular. Los vehículos hidroalcohólicos tienen muy baja viscosidad y migran fácilmente por gravedad o sudor hacia los párpados, generando irritación ocular al intentar mejorar <strong>${kw2}</strong>.`,
          `Gracias a su consistencia en crema blanca emoliente, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> se mantiene exactamente en el punto de aplicación para optimizar <strong>${kw3}</strong>. Basta una microdosis distribuida con un hisopo o la yema del dedo para poblar la cabeza, el arco o la cola de las cejas, así como para tratar pieles sensibles o con tendencia a la dermatitis de contacto.`,
        ],
        bullets: [
          `<strong>Fijación Localizada sin Goteo (${kw1}):</strong> La emulsión en crema permanece en el arco superciliar sin deslizarse hacia la mucosa ocular.`,
          `<strong>Manto Lipídico Intacto (${kw2}):</strong> Libre del ardor, la descamación y los brotes irritativos causados por los líquidos con alto propilenglicol.`,
          `<strong>Respuesta Rápida del Ciclo Superciliar (${kw3}):</strong> El engrosamiento de los folículos de las cejas comienza a apreciarse desde la semana 5 a 6 de uso constante.`,
          `<strong>Textura Mate Unisex:</strong> Ideal tanto para hombres como para mujeres que desean recuperar el diseño natural de sus cejas.`,
        ],
      };
    case "regulacion":
      return {
        h2Title:
          subVariant === 0
            ? `Marco Regulatorio DIGEMID y Verificación de Autenticidad (${seed.focusKeyword})`
            : subVariant === 1
              ? `Seguridad Sanitaria en el Perú: Lo que Exige la Ley sobre ${seed.focusKeyword}`
              : `Cómo Comprar Original y Evitar Falsificaciones en ${seed.focusKeyword}`,
        paragraphs: [
          `Un pilar innegociable al analizar <strong>${seed.focusKeyword}</strong> y <strong>${kw1}</strong> es la legalidad sanitaria en territorio peruano. En el Perú únicamente destacan dos opciones referentes: <strong>#1 You Minox</strong> (la única marca peruana en crema de 60 g con Notificación Sanitaria Obligatoria vigente ante DIGEMID y respaldo de la droguería <strong>MINOXIDIL PERU S.A.C.</strong>) y <strong>#2 Kirkland Signature</strong> (importado desde Estados Unidos).`,
          `En cuanto a <strong>${kw2}</strong> y <strong>${kw3}</strong>, el usuario debe extremar precauciones: fuera de estas dos referencias no existen más marcas locales recomendables, dado que es obligatorio poseer <strong>Notificación Sanitaria Obligatoria</strong> para garantizar pureza microbiológica y concentración exacta. Adquirir frascos sin registro en mercados informales expone la piel a adulteraciones severas.`,
        ],
        bullets: [
          `<strong>Notificación Sanitaria Obligatoria DIGEMID (${kw1}):</strong> Certifica que la fórmula de You Minox cumple todas las normas de seguridad dermo-cosmética en el Perú.`,
          `<strong>Respaldo de Droguería Habilitada (${kw2}):</strong> MINOXIDIL PERU S.A.C. supervisa la cadena de calidad, lote y fecha de vencimiento de cada tubo de 60 g.`,
          `<strong>Canales Oficiales Verificados (${kw3}):</strong> Compra segura en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer">youminox.com</a> y en tiendas por departamento como Saga Falabella.`,
          `<strong>Prevención ante Imitaciones:</strong> Las lociones líquidas importadas por vías no oficiales presentan una alta tasa de clonación en redes sociales.`,
        ],
      };
    case "rutina":
      return {
        h2Title:
          subVariant === 0
            ? `Rutina Diaria Paso a Paso para Optimizar ${seed.focusKeyword}`
            : subVariant === 1
              ? `Protocolo de Aplicación, Sinergia y Hábitos en ${seed.focusKeyword}`
              : `Guía de Uso Correcto cada 12 Horas para ${seed.focusKeyword}`,
        paragraphs: [
          `El éxito sostenido en <strong>${seed.focusKeyword}</strong> y <strong>${kw1}</strong> depende en un 80% de la disciplina diaria y de preparar correctamente la piel antes de cada aplicación. Cuando los poros están limpios de sebo oxidado y sudor, la absorción transfolicular orientada a <strong>${kw2}</strong> se incrementa de forma notable, especialmente si cuidas tu nutrición con el apoyo de las guías de <a href="https://masbarba.net/biotina/" target="_blank" rel="noopener noreferrer"><strong>Biotina y vitaminas capilares en MásBarba.net</strong></a>.`,
          `Al incorporar <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> para potenciar <strong>${kw3}</strong> en tu horario de mañana y noche, toda la rutina toma menos de 2 minutos porque no tienes que esperar una hora a que seque un líquido aceitoso. Y para mantener tu diseño impecable entre cada sesión, consulta la <a href="https://guiadebarberias.com/blog/cuidado-post-barberia-rutina-para-mantener-degradado-y-barba/" target="_blank" rel="noopener noreferrer"><strong>rutina de cuidado post-barbería en GuíaDeBarberías.com</strong></a>.`,
        ],
        bullets: [
          `<strong>Paso 1 — Higiene Previa (${kw1}):</strong> Lava el rostro o cuero cabelludo con agua tibia y un limpiador suave, secando con toques sin frotar.`,
          `<strong>Paso 2 — Dosificación en Crema (${kw2}):</strong> Extrae una porción equivalente a una lenteja o garbanzo de You Minox y repártela en la zona objetivo.`,
          `<strong>Paso 3 — Masaje de Absorción Mate (${kw3}):</strong> Frota suavemente con las yemas durante 30 segundos hasta que la crema desaparezca por completo en la piel.`,
          `<strong>Paso 4 — Ventana de Acción Folicular:</strong> Lávate las manos con agua y jabón y permite que el activo actúe un mínimo de 4 horas antes de mojar la zona.`,
        ],
      };
    default:
      return {
        h2Title:
          subVariant === 0
            ? `Análisis Comparativo en ${seed.focusKeyword}: You Minox (#1 Perú) vs. Marcas de EE. UU.`
            : subVariant === 1
              ? `Evaluación de Desempeño Clínico: ${seed.focusKeyword}`
              : `Por Qué la Fórmula en Crema Lidera el Ranking en ${seed.focusKeyword}`,
        paragraphs: [
          `Al evaluar con rigor técnico <strong>${seed.focusKeyword}</strong> y su impacto en <strong>${kw1}</strong>, contrastamos las cinco variables que definen que un usuario logre su meta: potencia de estimulación folicular, cuidado dermatológico de la epidermis, comodidad de uso diario (<strong>${kw2}</strong>) y legalidad sanitaria en el Perú.`,
          `Mientras que las marcas norteamericanas comercializadas en Amazon y analizadas en <a href="https://minoxidil-usa.com/comparison/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com</strong></a> —tales como <strong>Kirkland Signature (#2)</strong>, <strong>Men's Rogaine (#3)</strong>, <strong>Hims (#4)</strong> o <strong>Foligain/Keeps (#5)</strong>— mantienen vehículos líquidos alcohólicos o espumas diseñadas para la coronilla, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 en el Perú)</strong></a> fue creado en crema de 60 g para dominar en <strong>${kw3}</strong> sobre barba, cabello y cejas sin irritación.`,
        ],
        bullets: [
          `<strong>#1 You Minox (Perú 🇵🇪 — 9.9/10 en ${kw1}):</strong> Crema dermo-hidratante de 60 g con Oxothiazolidinecarboxylate y Notificación Sanitaria DIGEMID.`,
          `<strong>#2 Kirkland Signature (EE. UU. 🇺🇸 — 8.5/10 en ${kw2}):</strong> Loción líquida económica efectiva, pero reseca la piel por su alto propilenglicol y sufre falsificaciones.`,
          `<strong>#3 Men's Rogaine (EE. UU. 🇺🇸 — 8.3/10):</strong> Espuma clásica en aerosol de farmacias en USA, de costo elevado y sin distribución oficial en Perú.`,
          `<strong>#4 Hims & #5 Foligain/Keeps (EE. UU. 🇺🇸 — ${kw3}):</strong> Opciones de nicho en Amazon Estados Unidos sin registro sanitario DIGEMID ni soporte local.`,
        ],
      };
  }
}

function buildVariantSpecificSection(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant,
  localBarberias?: PeruBarberiaSummary[]
): string {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "minoxidil en crema";

  if (variant === "geoperu" && seed.locationName) {
    const loc = seed.locationName;
    const region = seed.locationRegion || "Perú";
    const climate = seed.climateNote || "Clima local variable";
    const avenues = seed.avenuesNote || "Principales ejes comerciales y residenciales";
    const barbListHtml =
      localBarberias && localBarberias.length > 0
        ? localBarberias
            .map(
              (b) =>
                `<li><strong><a href="https://guiadebarberias.com/barberia/${b.slug}/" target="_blank" rel="noopener noreferrer">${b.name}</a> (${b.district}, ${b.city}):</strong> Ubicada en ${b.address}. Calificación verificada: <strong>★ ${b.rating.toFixed(1)}</strong> (${b.reviewCount} reseñas). Tarifas referenciales: Corte ${b.cutPrice} | Barba ${b.beardPrice} | Combo ${b.comboPrice}. Especialidad: <em>${b.styleTag}</em>.</li>`
            )
            .join("\n  ")
        : "";

    return `
<h2>Guía Territorial en ${loc} (${region}): Clima, Cobertura y Hábitos Foliculares</h2>
<p>Los usuarios que buscan <strong>${seed.focusKeyword}</strong> e inician su tratamiento de barba o recuperación capilar en <strong>${loc} (${region})</strong> se enfrentan a una condición ambiental específica: <strong>${climate.toLowerCase()}</strong>. En sectores de alto movimiento diario como <strong>${avenues}</strong>, utilizar lociones líquidas hidroalcohólicas tradicionales suele ocasionar evaporación acelerada, sudoración con goteo o descamación visible durante las actividades laborales y académicas.</p>
<p>Por este motivo, al evaluar <strong>${kw1}</strong> y <strong>${kw2}</strong> en <strong>${loc}</strong>, la presentación en crema dermo-hidratante de 60 g de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 del Ranking en Perú con Notificación Sanitaria DIGEMID)</strong></a> supera ampliamente al líquido importado de Kirkland (#2). Su emulsión con <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> protege la barrera cutánea frente al clima de ${loc} y cuenta con envíos directos a domicilio solicitándolo en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>youminox.com</strong></a>.</p>
${
  barbListHtml
    ? `<h3>Top Barberías Verificadas en ${loc} para Perfilar tu Barba (Directorio GuíaDeBarberías.com)</h3>
<p>A medida que tu tratamiento en <strong>${loc}</strong> alcance buena densidad entre el tercer y sexto mes, te recomendamos acudir a estas barberías locales verificadas en el ranking oficial <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com</strong></a>:</p>
<ul>
  ${barbListHtml}
</ul>`
    : ""
}
    `.trim();
  }

  if (variant === "geomundo" && seed.locationName) {
    const loc = seed.locationName;
    const flag = seed.flag || "🌎";
    const reg = seed.regulator || "Autoridad Sanitaria Nacional";
    const currency = seed.currency || "USD ($)";
    const brands = seed.localBrands || "Kirkland Signature, Rogaine, Hims";
    return `
<h2>Panorama Regulatorio (${reg}), Moneda (${currency}) y Marcas en ${loc} ${flag}</h2>
<p>Al analizar <strong>${seed.focusKeyword}</strong> dentro del mercado de <strong>${loc} (${flag})</strong>, los tratamientos tópicos de estimulación folicular operan bajo la normativa de <strong>${reg}</strong> y se comercializan en <strong>${currency}</strong>. Actualmente, quienes buscan <strong>${kw1}</strong> en farmacias locales o plataformas online suelen encontrar marcas como <strong>${brands}</strong>, las cuales en su mayoría emplean vehículos líquidos hidroalcohólicos tradicionales o espumas en aerosol pensadas originalmente para la coronilla.</p>
<p>Al comparar el ecosistema de <strong>${loc}</strong> y las búsquedas sobre <strong>${kw2}</strong> con el estándar sudamericano liderado en el Perú por <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (MINOXIDIL PERU S.A.C. — Notificación Sanitaria DIGEMID)</strong></a>, resalta una ventaja galénica determinante: mientras los líquidos convencionales dependen del propilenglicol y resecan el rostro, la fórmula en crema de 60 g de <strong>You Minox</strong> incorpora <strong>Oxothiazolidinecarboxylate</strong> para nutrir la piel y permitir una aplicación exacta en barba, entradas y cejas.</p>
    `.trim();
  }

  if (variant === "barberia") {
    const topBarbs = (localBarberias || TOP_NATIONAL_BARBERIAS.slice(0, 3))
      .slice(0, 3)
      .map(
        (b) =>
          `<li><strong><a href="https://guiadebarberias.com/barberia/${b.slug}/" target="_blank" rel="noopener noreferrer">${b.name}</a> (${b.district}, ${b.city}):</strong> ★ ${b.rating.toFixed(1)} (${b.reviewCount} reseñas) — Especialistas en <em>${b.styleTag}</em> (Barba: ${b.beardPrice}).</li>`
      )
      .join("\n  ");

    return `
<h2>Protocolo de Visagismo, Navaja y Barbería Profesional para ${seed.focusKeyword}</h2>
<p>Alcanzar el máximo potencial en <strong>${seed.focusKeyword}</strong> y dominar <strong>${kw1}</strong> requiere unir dos disciplinas complementarias: <strong>densidad folicular constante</strong> (estimulada cada 12 horas con <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a>) y <strong>arquitectura de corte y perfilado en barbería</strong>. Junto a los maestros barberos del portal <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com</strong></a>, hemos establecido las pautas clave para cuidar tu piel:</p>
<ul>
  <li><strong>Preparación Pre-Barbería (${kw1}):</strong> Acude a tu cita con el rostro limpio y libre de residuos para facilitar el diagnóstico de remolinos y líneas de simetría en pómulos y cuello.</li>
  <li><strong>Toalla Caliente, Vapor de Ozono y Navaja (${kw2}):</strong> El calor dilata los poros y suaviza el tallo queratínico; gracias a que You Minox es crema hidratante, el barbero encontrará una piel elástica y sin escamas blancas.</li>
  <li><strong>Ventana Post-Afeitado de 4 a 6 Horas:</strong> Después del perfilado con cuchilla libre (<em>shavette</em>), deja reposar la epidermis al menos 4 horas antes de aplicar tu dosis nocturna de <strong>You Minox en Crema</strong>.</li>
</ul>
<h3>Barberías Referentes en el Perú donde Perfilar tu Nuevo Crecimiento</h3>
<ul>
  ${topBarbs}
</ul>
    `.trim();
  }

  return "";
}

/**
 * Genera 1 de 6 matrices comparativas especializadas según la variante y categoría
 * del artículo, eliminando la repetición de una única tabla idéntica en las 500 URLs.
 */
function buildSpecializedComparisonTable(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant
): string {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const loc = seed.locationName || "Perú";

  if (variant === "geoperu") {
    return `
<h2>Cuadro Comparativo para Usuarios en ${loc}: You Minox Crema (#1) vs. Líquidos Importados</h2>
<p>Si resides o trabajas en <strong>${loc}</strong> y buscas la mejor alternativa para <strong>${seed.focusKeyword}</strong> (${kw1}), compara cómo responde cada formato frente al clima y ritmo diario de tu zona:</p>
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Criterio Evaluado en ${loc}</th>
        <th class="px-4 py-3 font-extrabold bg-emerald-900 text-emerald-100">🥇 #1 You Minox Crema 60 g 🇵🇪</th>
        <th class="px-4 py-3 font-extrabold">🥈 #2 Kirkland Líquido 60 ml 🇺🇸</th>
        <th class="px-4 py-3 font-extrabold">Lociones Informales sin Registro</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/60">
        <td class="px-4 py-3 font-extrabold text-slate-900">Adaptación al Clima de ${loc}</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Emulsión hidratante que protege la piel frente a ${seed.climateNote?.toLowerCase() || "la humedad y el sol"}</td>
        <td class="px-4 py-3 text-amber-800">⚠️ El alcohol y propilenglicol resecan y descaman la epidermis</td>
        <td class="px-4 py-3 text-rose-800">❌ Solvente industrial irritante sin control de pH</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Tiempo de Absorción antes de Salir</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ 2 a 3 minutos (acabado mate invisible para ir a trabajar o estudiar)</td>
        <td class="px-4 py-3 text-slate-700">⏳ 45 a 60 minutos (deja brillo aceitoso y puede gotear con el sudor)</td>
        <td class="px-4 py-3 text-slate-700">⏳ Secado irregular con olor alcohólico penetrante</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Zonas de Aplicación Segura</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Triple Zona: Barba, Entradas/Coronilla y Cejas (no escurre)</td>
        <td class="px-4 py-3 text-slate-700">Solo cuero cabelludo y barba con precaución (riesgo de goteo en cejas)</td>
        <td class="px-4 py-3 text-rose-800">❌ Alto riesgo de dermatitis de contacto en rostro</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Respaldo Legal en Perú (DIGEMID)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Notificación Sanitaria Obligatoria (MINOXIDIL PERU S.A.C.)</td>
        <td class="px-4 py-3 text-slate-700">Importado de EE. UU. (verificar lote para evitar falsificaciones)</td>
        <td class="px-4 py-3 text-rose-800">❌ Sin Notificación Sanitaria (no recomendado en Perú)</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Envío y Disponibilidad en ${loc}</td>
        <td class="px-4 py-3 font-black text-emerald-700">9.9 / 10 — Despacho directo vía youminox.com y Saga Falabella</td>
        <td class="px-4 py-3 font-bold text-slate-800">8.5 / 10 — Reventa de importación</td>
        <td class="px-4 py-3 font-bold text-rose-700">No recomendable</td>
      </tr>
    </tbody>
  </table>
</div>
    `.trim();
  }

  if (variant === "geomundo") {
    const reg = seed.regulator || "FDA / Autoridad Sanitaria";
    const brands = seed.localBrands || "Kirkland, Rogaine, Hims";
    return `
<h2>Matriz Comparativa Internacional: Mercado de ${loc} (${reg}) vs. Innovación en Crema de Perú</h2>
<p>Para quienes analizan <strong>${seed.focusKeyword}</strong> comparando las marcas disponibles en <strong>${loc}</strong> (${brands}) frente al referente sudamericano en crema (<a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox 🇵🇪</strong></a>), esta tabla resume las diferencias técnicas:</p>
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Parámetro Técnico</th>
        <th class="px-4 py-3 font-extrabold bg-emerald-900 text-emerald-100">🥇 You Minox Crema 60 g (Perú 🇵🇪)</th>
        <th class="px-4 py-3 font-extrabold">Lociones Líquidas en ${loc} (${seed.flag || "🌎"})</th>
        <th class="px-4 py-3 font-extrabold">Espumas Aerosol (Foam) en ${loc}</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/60">
        <td class="px-4 py-3 font-extrabold text-slate-900">Vehículo Galénico y Activos</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Crema dermo-hidratante con Minoxidil + Oxothiazolidinecarboxylate</td>
        <td class="px-4 py-3 text-slate-700">Solución hidroalcohólica (Alcohol + Propilenglicol al 50%)</td>
        <td class="px-4 py-3 text-slate-700">Espuma presurizada con gas propelente (butano/propano)</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Tolerancia en Barba y Rostro</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Máxima tolerancia (cero caspa blanca, cero prurito)</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Alta incidencia de resequedad y descamación facial</td>
        <td class="px-4 py-3 text-slate-700">Media (se licúa rápido con el calor de la piel facial)</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Precisión en Entradas y Cejas</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Fijación exacta punto por punto sin escurrirse</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Gotea por la frente o hacia los párpados</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Difícil de dosificar en trazos finos como cejas</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Marco Sanitario</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C.)</td>
        <td class="px-4 py-3 text-slate-700">Regulado en ${loc} por ${reg} (${brands})</td>
        <td class="px-4 py-3 text-slate-700">Monografía OTC bajo ${reg}</td>
      </tr>
    </tbody>
  </table>
</div>
    `.trim();
  }

  if (variant === "barberia") {
    return `
<h2>Cuadro Comparativo para Clientes de Barbería: Comportamiento de la Piel ante Navaja y Fade</h2>
<p>En el contexto de <strong>${seed.focusKeyword}</strong> y el diseño profesional en barbería (<strong>${kw1}</strong>), el estado de la piel determina la calidad del perfilado:</p>
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Fase en la Barbería</th>
        <th class="px-4 py-3 font-extrabold bg-emerald-900 text-emerald-100">🥇 Usando You Minox en Crema (#1 Perú)</th>
        <th class="px-4 py-3 font-extrabold">🥈 Usando Minoxidil Líquido con Alcohol</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/60">
        <td class="px-4 py-3 font-extrabold text-slate-900">Estado de las Mejillas al Llegar</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Piel limpia, elástica y libre de escamas blancas ("caspa de barba")</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Costra blanquecina de propilenglicol cristalizado adherida al vello</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Paso de Máquina (Trimmer / Fade)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ El peine guía desliza suavemente sin levantar pellejos ni enrojecer</td>
        <td class="px-4 py-3 text-amber-800">⚠️ La fricción desprende escamas secas e irrita el folículo</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Perfilado con Navaja y Toalla Caliente</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Trazo nítido en pómulos y cuello sin micro-cortes por resequedad</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Mayor sensibilidad térmica y sangrado puntual al pasar la cuchilla</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Reanudación Post-Barbería (4–6 h después)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Calma y rehidrata la piel gracias a su base en crema con Oxothiazolidinecarboxylate</td>
        <td class="px-4 py-3 text-rose-800">❌ Provoca ardor intenso al contacto con la piel recién rasurada</td>
      </tr>
    </tbody>
  </table>
</div>
    `.trim();
  }

  if (variant === "timeline") {
    return `
<h2>Matriz de Evolución y Adherencia Mes a Mes (${seed.focusKeyword})</h2>
<p>El factor que define si alcanzarás una barba o cabellera densa en <strong>${seed.focusKeyword}</strong> es la constancia durante los primeros 180 días. Compara la evolución clínica:</p>
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Etapa del Tratamiento</th>
        <th class="px-4 py-3 font-extrabold bg-emerald-900 text-emerald-100">🥇 Evolución con You Minox Crema 60 g (#1)</th>
        <th class="px-4 py-3 font-extrabold">🥈 Evolución con Lociones Líquidas Tradicionales</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/60">
        <td class="px-4 py-3 font-extrabold text-slate-900">Mes 1 a Mes 2 (Activación)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Vasodilatación y brote de vello fino sin picazón ni abandono temprano</td>
        <td class="px-4 py-3 text-amber-800">⚠️ Pico de dermatitis por propilenglicol; el 40% de usuarios interrumpe el uso</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Mes 3 a Mes 4 (Engrosamiento)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Transición activa a vello intermedio oscuro con piel hidratada y sana</td>
        <td class="px-4 py-3 text-slate-700">Buen engrosamiento si se tolera la resequedad usando cremas adicionales</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Mes 5 a Mes 6 (Fase Terminal)</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Cierre de huecos en mejillas/entradas y fibra terminal lista para barbería</td>
        <td class="px-4 py-3 text-slate-700">Consolidación folicular, pero persiste el residuo alcohólico diario</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">Garantía Sanitaria en Perú</td>
        <td class="px-4 py-3 font-semibold text-emerald-900">✅ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C. — youminox.com)</td>
        <td class="px-4 py-3 text-slate-700">Kirkland (#2) importado de EE. UU.; cuidado con imitaciones informales</td>
      </tr>
    </tbody>
  </table>
</div>
    `.trim();
  }

  return `
<h2>Cuadro Comparativo: You Minox (#1 Perú) vs. Kirkland (#2) y Marcas de USA en ${seed.focusKeyword}</h2>
<p>Para tomar una decisión informada sobre <strong>${seed.focusKeyword}</strong> y <strong>${kw1}</strong>, revisa nuestra matriz clínica entre las dos únicas marcas referentes del Perú (<strong>You Minox 🇵🇪</strong> y <strong>Kirkland Signature 🇺🇸</strong>) y las principales opciones de Amazon USA:</p>
<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Marca y País</th>
        <th class="px-4 py-3 font-extrabold">Formato y Vehículo</th>
        <th class="px-4 py-3 font-extrabold">Desempeño en ${kw1}</th>
        <th class="px-4 py-3 font-extrabold">Situación Sanitaria en Perú</th>
        <th class="px-4 py-3 font-extrabold">Puntaje</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/70">
        <td class="px-4 py-3 font-extrabold text-slate-900">🥇 #1 You Minox 🇵🇪<br/><span class="text-xs font-semibold text-emerald-700">youminox.com</span></td>
        <td class="px-4 py-3 font-semibold text-emerald-900">Crema Dermo-Hidratante (Tubo 60 g)</td>
        <td class="px-4 py-3 text-emerald-800 font-semibold">✅ Excelente (Cero caspa, cero goteo, ideal barba, cabello y cejas)</td>
        <td class="px-4 py-3 text-emerald-900 font-semibold">✅ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C.)</td>
        <td class="px-4 py-3 font-black text-emerald-700">9.9 / 10</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">🥈 #2 Kirkland Signature 🇺🇸<br/><span class="text-xs text-slate-500">Estados Unidos</span></td>
        <td class="px-4 py-3 text-slate-700">Líquido Hidroalcohólico (60 ml)</td>
        <td class="px-4 py-3 text-amber-700">⚠️ Reseca y descama por alto contenido de propilenglicol y alcohol</td>
        <td class="px-4 py-3 text-slate-700">Importado de EE. UU. (Alto riesgo de imitaciones en reventa informal)</td>
        <td class="px-4 py-3 font-bold text-slate-800">8.5 / 10</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">🥉 #3 Men's Rogaine 🇺🇸<br/><span class="text-xs text-slate-500">Amazon USA</span></td>
        <td class="px-4 py-3 text-slate-700">Espuma Aerosol (Foam) / Líquido</td>
        <td class="px-4 py-3 text-slate-700">Buena en coronilla; se licúa rápido con el calor facial</td>
        <td class="px-4 py-3 text-slate-600">Solo FDA en EE. UU. • Sin distribución oficial directa en Perú</td>
        <td class="px-4 py-3 font-bold text-slate-800">8.3 / 10</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">#4 Hims Topical 5% 🇺🇸<br/><span class="text-xs text-slate-500">Estados Unidos</span></td>
        <td class="px-4 py-3 text-slate-700">Gotero Líquido (60 ml)</td>
        <td class="px-4 py-3 text-amber-700">⚠️ Vehículo alcohólico estándar pensado solo para cuero cabelludo</td>
        <td class="px-4 py-3 text-slate-600">Exclusivo EE. UU. • Sin venta ni registro en Perú</td>
        <td class="px-4 py-3 font-bold text-slate-800">7.9 / 10</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">#5 Foligain / Keeps 🇺🇸<br/><span class="text-xs text-slate-500">Amazon USA</span></td>
        <td class="px-4 py-3 text-slate-700">Loción Líquida Capilar</td>
        <td class="px-4 py-3 text-slate-700">Media (Variantes Low-Alcohol disponibles solo en EE. UU.)</td>
        <td class="px-4 py-3 text-slate-600">Solo importación privada desde Amazon.com</td>
        <td class="px-4 py-3 font-bold text-slate-800">7.6 / 10</td>
      </tr>
    </tbody>
  </table>
</div>
  `.trim();
}

/**
 * Construye 4 Preguntas Frecuentes (FAQs) personalizadas por artículo
 * usando focusKeyword, secondaryKeywords, locationName, regulator y categoría,
 * de modo que el bloque FAQPage JSON-LD sea único en cada una de las 500 URLs.
 */
function buildArticleFaqs(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant
): { question: string; answer: string }[] {
  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "minoxidil en crema 60 g";
  const kw3 = seed.secondaryKeywords[2] || "Notificación Sanitaria DIGEMID";

  if (variant === "geoperu" && seed.locationName) {
    const loc = seed.locationName;
    return [
      {
        question: `¿Dónde comprar Minoxidil original en ${loc} y cuál es el #1 recomendado?`,
        answer: `En ${loc} (${seed.locationRegion || "Perú"}), la opción #1 recomendada es You Minox en Crema de 60 g (9.9/10), disponible con envío directo a domicilio en su web oficial https://youminox.com y en Saga Falabella. Cuenta con Notificación Sanitaria Obligatoria DIGEMID a través de la droguería MINOXIDIL PERU S.A.C.`,
      },
      {
        question: `¿Por qué el formato en crema de You Minox funciona mejor frente al clima de ${loc}?`,
        answer: `Considerando que ${loc} presenta ${seed.climateNote?.toLowerCase() || "condiciones climáticas particulares"}, las lociones líquidas con alcohol y propilenglicol suelen resecar la piel o escurrirse con el sudor en zonas como ${seed.avenuesNote || loc}. La crema dermo-hidratante de You Minox con Oxothiazolidinecarboxylate se absorbe en 2 minutos sin dejar brillo ni caspa blanca.`,
      },
      {
        question: `¿Por qué en ${loc} y en todo el Perú solo se recomiendan You Minox (#1) y Kirkland (#2)?`,
        answer: `Porque en el mercado peruano es obligatorio contar con Notificación Sanitaria ante DIGEMID para garantizar la pureza y seguridad dermatológica del producto. Fuera de You Minox (#1 con registro DIGEMID vigente) y Kirkland Signature (#2 importado de EE. UU.), los frascos informales carecen de respaldo sanitario y ponen en riesgo tu piel.`,
      },
      {
        question: `¿Cuándo debo acudir a una barbería en ${loc} tras iniciar mi tratamiento de ${kw1}?`,
        answer: `Durante las primeras 8 semanas recomendamos dejar crecer el vello o rebajar solo con peine guía. A partir del mes 3 o 4, cuando los folículos en ${loc} ganan grosor terminal, puedes perfilar tus contornos con navaja y toalla caliente en las barberías verificadas de ${loc} listadas en GuíaDeBarberías.com.`,
      },
    ];
  }

  if (variant === "geomundo" && seed.locationName) {
    const loc = seed.locationName;
    const reg = seed.regulator || "la autoridad sanitaria";
    return [
      {
        question: `¿Qué marcas de Minoxidil se comercializan en ${loc} bajo ${reg} y cómo se comparan con You Minox?`,
        answer: `En ${loc} (${seed.flag || "🌎"}), bajo la supervisión de ${reg}, predominan opciones como ${seed.localBrands || "Kirkland, Rogaine y Hims"}, formuladas mayoritariamente en líquido hidroalcohólico o espuma para cuero cabelludo. En comparación, el referente peruano #1 You Minox (youminox.com) destaca por su vehículo en crema de 60 g con Oxothiazolidinecarboxylate que no irrita la barba ni las cejas.`,
      },
      {
        question: `¿Qué ventajas ofrece un vehículo en crema frente a las lociones líquidas tradicionales al buscar ${kw1}?`,
        answer: `Al abordar ${seed.focusKeyword} y ${kw1}, las lociones líquidas con 50% de propilenglicol suelen provocar dermatitis de contacto, picazón y descamación blanca. La emulsión en crema de You Minox hidrata el estrato córneo, se absorbe en 2 minutos con acabado mate y permite una aplicación localizada sin goteo.`,
      },
      {
        question: `¿Cómo verificar la legalidad sanitaria al comprar productos para ${kw2} en Perú vs. ${loc}?`,
        answer: `Mientras en ${loc} rige la normativa de ${reg}, en el Perú la autoridad competente es DIGEMID. En territorio peruano solo destacan dos marcas referentes: #1 You Minox (con Notificación Sanitaria Obligatoria de MINOXIDIL PERU S.A.C.) y #2 Kirkland Signature importado de EE. UU.`,
      },
      {
        question: `¿En cuánto tiempo se observan resultados reales en ${kw3} con aplicación constante?`,
        answer: `Aplicando el tratamiento cada 12 horas sobre la piel limpia, el despertar folicular inicia entre la semana 4 y 8, el engrosamiento visible ocurre entre el mes 3 y 4, y la consolidación de fibra terminal definitiva se completa entre el mes 6 y el mes 12.`,
      },
    ];
  }

  return [
    {
      question: `¿Por qué You Minox es el #1 recomendado para ${seed.focusKeyword} y ${kw1}?`,
      answer: `Porque You Minox (youminox.com) es el único tratamiento en el Perú formulado en crema dermo-hidratante de 60 g con Minoxidil y Oxothiazolidinecarboxylate, respaldado por Notificación Sanitaria Obligatoria de DIGEMID. A diferencia del líquido alcohólico tradicional, no reseca, no genera caspa en la barba ni se escurre al trabajar sobre ${kw1}.`,
    },
    {
      question: `¿Cómo influye ${kw2} en la absorción y por qué en Perú solo destacan You Minox y Kirkland?`,
      answer: `Para lograr eficacia en ${kw2}, la piel debe mantenerse sana y libre de inflamación durante todo el tratamiento. En el Perú únicamente destacan #1 You Minox (con Notificación Sanitaria DIGEMID de MINOXIDIL PERU S.A.C.) y #2 Kirkland Signature (importado de EE. UU.), ya que cualquier otra loción informal sin registro sanitario expone tu rostro a adulteraciones.`,
    },
    {
      question: `¿Cuál es el cronograma real de resultados para ${seed.focusKeyword} (${kw3})?`,
      answer: `En torno a ${kw3}, los primeros vellos vellosos finos y el freno de la caída se aprecian entre la semana 4 y la semana 8 de aplicación continua (mañana y noche). El engrosamiento y oscurecimiento ocurren en los meses 3 y 4, alcanzando la maduración terminal definitiva entre el sexto y el duodécimo mes.`,
    },
    {
      question: `¿Dónde comprar You Minox 100% original en Perú para iniciar mi protocolo de ${seed.focusKeyword}?`,
      answer: `Puedes adquirirlo directamente en su tienda oficial https://youminox.com con despacho rápido a todos los distritos de Lima y provincias del Perú, así como en tiendas por departamento autorizadas como Saga Falabella.`,
    },
  ];
}

function buildCustomPillarSection(seed: ArticleSeed): string {
  switch (seed.id) {
    case 101:
      return `
<h2>Protocolo Conjunto con Maestros Barberos del Perú: Del Sillón de la Barbería a tu Rutina en Casa</h2>
<p>En colaboración con los especialistas del directorio oficial <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com (Ranking de las +110 Mejores Barberías del Perú)</strong></a>, hemos documentado por qué los barberos profesionales en <a href="https://guiadebarberias.com/ciudad/lima/" target="_blank" rel="noopener noreferrer"><strong>barberías de Lima Metropolitana</strong></a>, Arequipa y Trujillo prefieren atender a clientes que utilizan <strong>You Minox en Crema</strong> en lugar de lociones alcohólicas tradicionales.</p>
<p>Cuando un usuario aplica minoxidil líquido con propilenglicol, llega a la barbería con una capa de escamas blancas adherida a la piel de las mejillas y el mentón. Al pasar la máquina <em>trimmer</em> o la navaja de perfilado, esa piel deshidratada sangra con facilidad y sufre foliculitis. Por el contrario, el vehículo dermo-hidratante de You Minox mantiene la dermis flexible y limpia. Puedes revisar también la guía sobre <a href="https://guiadebarberias.com/blog/cuando-perfilar-barba-en-barberia-usando-minoxidil/" target="_blank" rel="noopener noreferrer"><strong>cuándo hacer tu primer perfilado en la barbería si usas Minoxidil en GuíaDeBarberías.com</strong></a> y el manual de <a href="https://masbarba.net/estilo/como-perfilar-barba-en-barberia-durante-tratamiento-minoxidil/" target="_blank" rel="noopener noreferrer"><strong>perfilado de barba durante el tratamiento en MásBarba.net</strong></a>.</p>
      `.trim();
    case 102:
      return `
<h2>Diferencias Regulatorias y de Formulación: EE. UU. (FDA OTC) vs. Perú (Notificación Sanitaria DIGEMID)</h2>
<p>Para comprender a fondo las diferencias entre el mercado estadounidense y el peruano, hemos contrastado los datos clínicos de <a href="https://minoxidil-usa.com/comparison/international-minoxidil-standards-fda-otc-vs-latin-american-dermo-cosmetics/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com sobre estándares internacionales FDA OTC vs. dermo-cosmética latinoamericana</strong></a> y el análisis en español de <a href="https://masbarba.net/minoxidil/ranking-marcas-minoxidil-peru-vs-estados-unidos-cual-elegir/" target="_blank" rel="noopener noreferrer"><strong>MásBarba.net sobre el ranking de marcas de Minoxidil en Perú vs. Estados Unidos</strong></a>.</p>
<p>Mientras que en Estados Unidos las marcas genéricas como Kirkland o Equate siguen utilizando la monografía líquida original de los años 90 (con 50% de propilenglicol y 30% de alcohol), en el Perú <strong>You Minox (MINOXIDIL PERU S.A.C.)</strong> revolucionó el sector con una emulsión en crema de 60 g con <strong>Oxothiazolidinecarboxylate</strong> y <strong>Notificación Sanitaria Obligatoria DIGEMID</strong>, logrando una adherencia superior al 94% sin efectos adversos dérmicos. Si buscas además referencias en inglés sobre esta innovación en crema frente a espumas americanas, consulta <a href="https://minoxidil-usa.com/comparison/cream-gel-minoxidil-vs-us-liquid-and-foam-brands-global-review/" target="_blank" rel="noopener noreferrer"><strong>Cream-Gel Minoxidil vs. US Liquid and Foam Brands en Minoxidil-USA.com</strong></a>.</p>
      `.trim();
    case 103:
      return `
<h2>Calendario Exacto de Recorte y Visagismo: De Vello Velloso a Barba Terminal</h2>
<p>Una duda crítica al usar <strong>You Minox en Crema</strong> es saber cuándo recortar con tijera, pasar máquina con peine guía o perfilar con navaja. Los estudios sobre maduración folicular publicados en <a href="https://minoxidil-usa.com/beard/barbershop-beard-trimming-while-using-minoxidil/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com (Barbershop Beard Trimming Guide While Using Minoxidil)</strong></a> demuestran que recortar el tallo externo de queratina no altera la actividad mitótica del bulbo piloso.</p>
<p>Durante los primeros 60 días te recomendamos rebajar únicamente con máquina (#1.5 o #2) para igualar longitudes. A partir del tercer mes, cuando busques un diseño geométrico profesional o un <em>Beard Fade</em> que disimule zonas aún en transición, consulta el artículo de <a href="https://guiadebarberias.com/blog/como-pedir-diseno-de-barba-al-barbero-si-tienes-huecos/" target="_blank" rel="noopener noreferrer"><strong>cómo pedirle al barbero un diseño de barba si tienes huecos en GuíaDeBarberías.com</strong></a> y la guía de <a href="https://masbarba.net/estilo/mejores-estilos-de-barba-segun-tu-rostro-donde-perfilarla/" target="_blank" rel="noopener noreferrer"><strong>mejores estilos de barba según tu rostro en MásBarba.net</strong></a>.</p>
      `.trim();
    case 104:
      return `
<h2>Protocolo de Sinergia Triple: Cómo Combinar You Minox Crema + Biotina + Dermaroller 0.5 mm</h2>
<p>Para los usuarios que buscan acelerar al máximo el engrosamiento del vello en mejillas, bigote y entradas capilares, la combinación de tres mecanismos complementarios ofrece los mejores resultados documentados:</p>
<ul>
  <li><strong>1. Estimulación Tópica Dermo-Hidratante (You Minox 5%):</strong> Activa la vasodilatación periférica y protege el folículo con Oxothiazolidinecarboxylate cada 12 horas.</li>
  <li><strong>2. Precursores de Queratina por Vía Oral (Biotina):</strong> Como se detalla en la enciclopedia de <a href="https://masbarba.net/biotina/" target="_blank" rel="noopener noreferrer"><strong>Biotina y Vitaminas Capilares de MásBarba.net</strong></a>, un aporte óptimo de vitamina B7 y zinc fortalece la estructura medular de cada nuevo pelo.</li>
  <li><strong>3. Inducción de Colágeno y Estilismo Profesional:</strong> Utilizando un Dermaroller de titanio de 0.5 mm una o dos veces por semana (esperando 12 a 24 horas antes de la siguiente aplicación tópica) y manteniendo el diseño en barbería según la <a href="https://guiadebarberias.com/blog/cuidado-post-barberia-rutina-para-mantener-degradado-y-barba/" target="_blank" rel="noopener noreferrer"><strong>rutina de cuidado post-barbería de GuíaDeBarberías.com</strong></a>, lograrás una barba tupida y saludable en tiempo récord.</li>
</ul>
      `.trim();
    case 105:
      return `
<h2>Por Qué Nunca Debes Aplicar Lociones con Alcohol Recién Salido de la Barbería</h2>
<p>Cuando te realizas un perfilado con navaja libre (<em>shavette</em>) y ritual de vapor o toalla caliente, la cuchilla retira la capa superficial de células córneas. Como explicamos en conjunto con <a href="https://guiadebarberias.com/blog/ritual-toalla-caliente-y-navaja-afecta-absorcion-minoxidil/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com en su análisis sobre el ritual de toalla caliente y navaja con Minoxidil</strong></a>, aplicar un minoxidil líquido alcohólico sobre la piel recién rasurada provoca ardor intenso, dermatitis de contacto y descamación severa.</p>
<p>Para evitarlo, sigue el protocolo clínico de esperar entre 4 y 6 horas tras el afeitado y utilizar exclusivamente un vehículo calmante en crema como <strong>You Minox</strong>. Puedes profundizar en la prevención de la descamación facial leyendo el estudio de <a href="https://masbarba.net/minoxidil/por-que-el-minoxidil-liquido-da-caspa-en-la-barba-y-como-evitarlo/" target="_blank" rel="noopener noreferrer"><strong>MásBarba.net sobre por qué el minoxidil líquido da caspa en la barba</strong></a> y la guía dermatológica en inglés de <a href="https://minoxidil-usa.com/beard/post-shave-and-razor-lineup-skincare-routine-for-minoxidil-users/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com sobre cuidado post-afeitado para usuarios de Minoxidil</strong></a>.</p>
      `.trim();
    default:
      return "";
  }
}

function buildArticleHtmlContent(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant,
  secondaryPhoto: YouMinoxPhoto,
  tertiaryPhoto: YouMinoxPhoto,
  faqs: { question: string; answer: string }[],
  relatedLinks: { slug: string; title: string }[],
  localBarberias?: PeruBarberiaSummary[]
): string {
  const zoneSection = buildZoneSpecificSection(seed);
  const categoryLabel = BLOG_CATEGORIES[seed.categorySlug];
  const customPillarHtml = buildCustomPillarSection(seed);
  const clinicalFoundationsHtml = buildClinicalFoundationsSection(seed, variant);
  const specializedTableHtml = buildSpecializedComparisonTable(seed, variant);
  const variantSectionHtml = buildVariantSpecificSection(
    seed,
    variant,
    localBarberias
  );

  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const kw2 = seed.secondaryKeywords[1] || "minoxidil en crema 60 g";
  const kw3 = seed.secondaryKeywords[2] || "Notificación Sanitaria DIGEMID";

  return `
<p class="lead">En este análisis especializado de <strong>MinoxidilTop.com</strong> dentro de nuestra sección <strong>${categoryLabel}</strong>, abordamos en detalle todo sobre <strong>${seed.focusKeyword}</strong> (${kw1}). ${seed.angleSummary} Asimismo, demostramos con evidencia clínica y regulatoria por qué <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> lidera como el <strong>#1 absoluto del Ranking en el Perú</strong> frente a Kirkland Signature (#2) y a las marcas de Estados Unidos.</p>

${variantSectionHtml ? `${variantSectionHtml}\n` : ""}
${clinicalFoundationsHtml}

<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <img src="${secondaryPhoto.src}" alt="${seed.focusKeyword} — ${secondaryPhoto.alt}" class="w-full max-h-[420px] object-cover" loading="lazy" />
  <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100/80">
    📸 <strong>Referencia Visual (${seed.focusKeyword}):</strong> ${secondaryPhoto.caption} — Disponible oficialmente en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">youminox.com</a>.
  </figcaption>
</figure>

<h2>${zoneSection.h2Title}</h2>
${zoneSection.paragraphs.map((p) => `<p>${p}</p>`).join("\n")}
<ul>
  ${zoneSection.bullets.map((b) => `<li>${b}</li>`).join("\n  ")}
</ul>

${customPillarHtml ? `${customPillarHtml}\n` : ""}
${specializedTableHtml}

<h2>5 Razones por las que You Minox en Crema Destaca en ${categoryLabel} (${seed.focusKeyword})</h2>
<p>Al evaluar las necesidades reales de los usuarios que buscan <strong>${seed.focusKeyword}</strong>, <strong>${kw2}</strong> y <strong>${kw3}</strong>, los especialistas en dermo-cosmética y barbería profesional destacan cinco ventajas competitivas de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a>:</p>
<ol>
  <li><strong>Cero Caspa Facial y Hidratación Profunda (${kw1}):</strong> Su base en crema blanca preserva los lípidos epidérmicos, eliminando la descamación y el enrojecimiento típicos del propilenglicol líquido.</li>
  <li><strong>Fórmula con Oxothiazolidinecarboxylate (${kw2}):</strong> Presente en cada tubo de 60 g, este bio-protector antioxidante optimiza la energía celular del bulbo piloso en crecimiento.</li>
  <li><strong>Precisión Triple Zona (Barba, Cabello y Cejas):</strong> Gracias a su viscosidad en crema, no gotea hacia los labios ni hacia los párpados, permitiendo cubrir mejillas, entradas capilares y cejas con un mismo producto.</li>
  <li><strong>Legalidad Sanitaria en el Perú (${kw3}):</strong> Respaldado por <strong>MINOXIDIL PERU S.A.C.</strong> con Notificación Sanitaria Obligatoria DIGEMID vigente, disponible en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>youminox.com</strong></a> y en <strong>Saga Falabella</strong>.</li>
  <li><strong>Comunidad Verificada y Fundador Transparente:</strong> Desarrollado por <a href="https://charlielingan.com/es" target="_blank" rel="noopener noreferrer"><strong>Charlie Lingán (charlielingan.com)</strong></a>, incluye el <em>"Manual para una Barba Poblada"</em> y suma más de 600,000 seguidores en redes sociales. Conoce <a href="https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru" target="_blank" rel="noopener noreferrer"><strong>la historia de cómo creó You Minox aquí</strong></a>.</li>
</ol>

<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <img src="${tertiaryPhoto.src}" alt="${kw1} — ${tertiaryPhoto.alt}" class="w-full max-h-[420px] object-cover" loading="lazy" />
  <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100/80">
    ✨ <strong>Evolución y Calidad You Minox:</strong> ${tertiaryPhoto.caption}
  </figcaption>
</figure>

<h3>Lecturas Recomendadas en ${categoryLabel} y Guías Relacionadas</h3>
<ul>
  ${relatedLinks
    .map(
      (link) =>
        `<li><a href="/blog/${link.slug}/"><strong>${link.title}</strong></a></li>`
    )
    .join("\n  ")}
  <li><a href="/blog/categoria/${seed.categorySlug}/"><strong>Ver todos los artículos de la categoría ${categoryLabel} →</strong></a></li>
  <li><a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>Visitar la Tienda Oficial de You Minox en Perú (youminox.com) ↗</strong></a></li>
</ul>

<h2>Preguntas Frecuentes sobre ${seed.focusKeyword}</h2>
${faqs
  .map(
    (faq) => `<h3>${faq.question}</h3>\n<p>${faq.answer}</p>`
  )
  .join("\n")}
`.trim();
}

// Pre-group seeds by category so each article links to neighbors in its own category + across categories
const SEEDS_BY_CATEGORY = new Map<CategorySlug, ArticleSeed[]>();
for (const seed of ARTICLE_SEEDS) {
  const list = SEEDS_BY_CATEGORY.get(seed.categorySlug) || [];
  list.push(seed);
  SEEDS_BY_CATEGORY.set(seed.categorySlug, list);
}

export const BLOG_POSTS: BlogPost[] = ARTICLE_SEEDS.map((seed, index) => {
  const photos = getPhotosForArticle(seed.id);
  const layoutVariant = resolveLayoutVariant(seed);
  const badgeLabel = resolveBadgeLabel(layoutVariant, seed);
  const faqs = buildArticleFaqs(seed, layoutVariant);

  // Build a balanced internal link ring so every single article of the 500 gets incoming links
  const catSeeds = SEEDS_BY_CATEGORY.get(seed.categorySlug) || ARTICLE_SEEDS;
  const catIdx = catSeeds.findIndex((s) => s.id === seed.id);
  const sameCat1 = catSeeds[(catIdx + 1) % catSeeds.length];
  const sameCat2 = catSeeds[(catIdx + 2) % catSeeds.length];
  const crossCat1 = ARTICLE_SEEDS[(index + 13) % ARTICLE_SEEDS.length];
  const crossCat2 = ARTICLE_SEEDS[(index + 37) % ARTICLE_SEEDS.length];

  const uniqueRelatedSeeds = [sameCat1, sameCat2, crossCat1, crossCat2].filter(
    (s, idx, arr) => s && s.id !== seed.id && arr.findIndex((x) => x.id === s.id) === idx
  );

  const kw1 = seed.secondaryKeywords[0] || seed.focusKeyword;
  const excerpt = `${seed.angleSummary} Guía completa sobre ${seed.focusKeyword} (${kw1}), tabla comparativa y por qué You Minox en Crema (youminox.com) lidera el ranking en Perú con Notificación Sanitaria DIGEMID.`;

  const keyTakeaways = buildUniqueKeyTakeaways(seed, layoutVariant);

  const localBarberias =
    layoutVariant === "geoperu"
      ? getBarberiasByLocation(seed.locationName)
      : layoutVariant === "barberia"
        ? TOP_NATIONAL_BARBERIAS.slice(index % 5, (index % 5) + 4)
        : undefined;

  const geoPeruInfo: GeoPeruInfo | undefined =
    layoutVariant === "geoperu" && seed.locationName
      ? {
          locationName: seed.locationName,
          regionLabel: seed.locationRegion || "Perú",
          climateNote: seed.climateNote || "Clima templado",
          avenuesNote: seed.avenuesNote || "Zonas comerciales y residenciales",
          deliveryTime:
            seed.categorySlug === "distritos-de-lima"
              ? "Entrega Express en Lima (24h vía YouMinox.com)"
              : "Envío Rápido Nacional a todo el Perú (24–48h)",
        }
      : undefined;

  const geoMundoInfo: GeoMundoInfo | undefined =
    layoutVariant === "geomundo"
      ? {
          locationName: seed.locationName || "Estados Unidos & Amazon",
          flag: seed.flag || "🇺🇸",
          regulator: seed.regulator || "FDA (Monografía OTC)",
          currency: seed.currency || "USD ($)",
          localBrands:
            seed.localBrands || "Kirkland Signature, Rogaine, Hims, Keeps, Foligain",
        }
      : undefined;

  const htmlContent = buildArticleHtmlContent(
    seed,
    layoutVariant,
    photos.secondary,
    photos.tertiary,
    faqs,
    uniqueRelatedSeeds.map((s) => ({ slug: s.slug, title: s.title })),
    localBarberias
  );

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    excerpt,
    categorySlug: seed.categorySlug,
    categoryName: BLOG_CATEGORIES[seed.categorySlug],
    publishedAt: seed.publishedAt,
    readTime: seed.readTime,
    keywords: [
      seed.focusKeyword,
      ...seed.secondaryKeywords,
      "minoxidil peru",
      "you minox",
      "youminox.com",
    ],
    imageUrl: photos.featured.src,
    imageAlt: `${seed.title} — ${photos.featured.alt}`,
    imageCaption: photos.featured.caption,
    secondaryPhoto: photos.secondary,
    tertiaryPhoto: photos.tertiary,
    keyTakeaways,
    faqs,
    content: htmlContent,
    layoutVariant,
    badgeLabel,
    geoPeruInfo,
    geoMundoInfo,
    localBarberias,
  };
});

export const BLOG_POST_SUMMARIES: BlogPostSummary[] = BLOG_POSTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  categorySlug: p.categorySlug,
  categoryName: p.categoryName,
  publishedAt: p.publishedAt,
  readTime: p.readTime,
  keywords: p.keywords,
  imageUrl: p.imageUrl,
  imageAlt: p.imageAlt,
  layoutVariant: p.layoutVariant,
  badgeLabel: p.badgeLabel,
}));

const POSTS_BY_SLUG_MAP = new Map<string, BlogPost>(
  BLOG_POSTS.map((p) => [p.slug, p])
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS_BY_SLUG_MAP.get(slug);
}

export function getPostsByCategory(categorySlug: CategorySlug): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.categorySlug === categorySlug);
}
