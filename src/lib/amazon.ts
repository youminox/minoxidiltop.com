export const AMAZON_TAG_US = "minoxidiltop-20";
export const AMAZON_TAG_ES = "minoxidiltop-21";

export type AmazonStoreRegion = "US" | "ES";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType:
    | "microneedling"
    | "shampoo"
    | "beard"
    | "supplement"
    | "applicator"
    | "skincare"
    | "minoxidil";
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

export interface AmazonPageContext {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
}

/**
 * Construye el enlace oficial de Afiliado de Amazon:
 * - América / Perú / EE. UU. (por defecto): amazon.com con tag=minoxidiltop-20
 * - España / Europa: amazon.es con tag=minoxidiltop-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

export function buildAmazonSearchUrl(
  queryUS: string,
  queryES: string,
  region: AmazonStoreRegion = "US"
): string {
  if (region === "ES") {
    return `https://www.amazon.es/s?k=${encodeURIComponent(queryES)}&tag=${AMAZON_TAG_ES}`;
  }
  return `https://www.amazon.com/s?k=${encodeURIComponent(queryUS)}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente si el visitante navega desde España/Europa (ES)
 * o desde América/Perú/EE. UU. (US por defecto).
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();

    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      lang === "es-es" ||
      tz.startsWith("Europe/")
    ) {
      return "ES";
    }

    return "US";
  } catch {
    return "US";
  }
}

// ============================================================================
// CATÁLOGO OFICIAL DE PRODUCTOS Y COMPLEMENTOS (AMAZON.COM & AMAZON.ES)
// ============================================================================

export const CATALOG = {
  DERMA_ROLLER_05MM: {
    id: "derma-roller-05mm",
    badge: "🧔 #1 Más Vendido para Poblar Barba",
    title: "Kit Dermaroller de Titanio 0.5mm (540 Microagujas) para Barba y Cuero Cabelludo",
    subtitle:
      "El rodillo clínico de 540 agujas de titanio grado médico diseñado para despertar folículos dormidos en mejillas, candado y entradas e inducir colágeno.",
    features: [
      "Longitud clínica de 0.5mm ideal para estimular barba y línea frontal 1 a 2 veces por semana",
      "Mango ergonómico antideslizante con estuche protector de viaje y sanitización",
      "Multiplica la absorción y activación enzimática (esperar 12–24 h antes del Minoxidil)",
    ],
    categoryType: "microneedling",
    queryUS: "0.5mm titanium derma roller beard hair growth men kit",
    queryES: "derma roller 0.5mm titanio barba pelo hombre",
    ctaLabel: "Ver Dermaroller en Amazon",
  } satisfies AmazonProductRecommendation,

  DERMA_STAMP_ADJUSTABLE: {
    id: "derma-stamp-adjustable",
    badge: "🏆 #1 Mejor Complemento Capilar y Barba",
    title: "Derma Stamp Ajustable de Titanio (0.25mm – 1.5mm) de Punción Vertical",
    subtitle:
      "Sello de microagujas verticales de precisión ideal para entradas capilares, coronilla y barba con vello existente sin enganchar ni arrancar el pelo.",
    features: [
      "140 agujas de titanio quirúrgico con dial graduable desde 0.25mm (cejas/rostro) hasta 1.5mm (coronilla)",
      "Aumenta la microcirculación sanguínea y la enzima sulfotransferasa hasta 3 veces más",
      "La entrada vertical a 90° evita micro-desgarros epidérmicos frente a rodillos convencionales",
    ],
    categoryType: "microneedling",
    queryUS: "adjustable titanium microneedle derma stamp hair beard growth men",
    queryES: "derma stamp ajustable titanio capilar barba hombre",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NIZORAL_KETOCONAZOLE: {
    id: "nizoral-ketoconazole-shampoo",
    badge: "🛡️ #1 Shampoo Clínico Recomendado",
    title: "Nizoral Anti-Dandruff & Scalp Care Shampoo con Ketoconazol 1%",
    subtitle:
      "El shampoo dermatológico esencial para usuarios de Minoxidil: elimina la descamación por propilenglicol, calma la picazón y bloquea la DHT folicular local.",
    features: [
      "Contiene Ketoconazol al 1% clínicamente probado para controlar caspa, grasa y micro-inflamación",
      "Forma parte de la 'Tríada Capilar' usándolo 2 a 3 veces por semana junto al Minoxidil",
      "Limpia profundamente el ostium folicular para que el tratamiento tópico penetre sin barreras",
    ],
    categoryType: "shampoo",
    asinUS: "B00AINMFAC",
    queryUS: "Nizoral Anti-Dandruff Shampoo 1% Ketoconazole",
    queryES: "champu ketoconazol anticaspa cuero cabelludo hombre",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  BIOTIN_DHT_SHAMPOO: {
    id: "biotin-dht-blocker-shampoo",
    badge: "💧 Mejor Shampoo Engrosador Diario",
    title: "Shampoo Engrosador Masculino con Biotina, Saw Palmetto y Cafeína (Sin Sulfatos)",
    subtitle:
      "Fórmula botánica de uso diario libre de sulfatos y parabenos con Biotina, Saw Palmetto y Romero para fortalecer el cabello fino y miniaturizado.",
    features: [
      "Complejo bloqueador natural de DHT (Extracto de Saw Palmetto, Semilla de Calabaza y Romero)",
      "100% libre de sulfatos agresivos: cuida la barrera lipídica antes de aplicar tu Minoxidil",
      "Aporta volumen estructural y grosor inmediato en entradas y coronilla",
    ],
    categoryType: "shampoo",
    queryUS: "mens biotin saw palmetto dht blocker thickening shampoo sulfate free",
    queryES: "champu biotina saw palmetto anticaida hombre sin sulfatos",
    ctaLabel: "Ver Shampoo en Amazon",
  } satisfies AmazonProductRecommendation,

  SCALP_MASSAGER_BRUSH: {
    id: "silicone-scalp-massager",
    badge: "⚡ Activador de Microcirculación",
    title: "Cepillo Masajeador y Exfoliante Capilar de Silicona Médica para Ducha",
    subtitle:
      "Masajeador ergonómico de cerdas flexibles que exfolia células muertas, oxigena la papila dérmica y estimula el grosor del tallo capilar.",
    features: [
      "Puntas de silicona suave grado médico que retiran residuos sin rasguñar el cuero cabelludo",
      "4 minutos de masaje mecánico diario aumentan el calibre folicular y relajan la tensión",
      "Diseño impermeable de una sola pieza antibacteriana ideal para la ducha",
    ],
    categoryType: "shampoo",
    queryUS: "mens silicone scalp massager shampoo brush hair growth",
    queryES: "masajeador cuero cabelludo silicona cepillo champu hombre",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  PHILIPS_BEARD_TRIMMER: {
    id: "philips-norelco-beard-trimmer",
    badge: "💈 #1 Recortadora de Barba de Precisión",
    title: "Philips Norelco MultiGroom — Recortadora de Barba y Degradado de Precisión",
    subtitle:
      "Mantén los vellos terminales y los nuevos vellos vellosos a una longitud uniforme de barbería sin tirar de la raíz folicular.",
    features: [
      "Cuchillas autoafilables DualCut de acero templado con peines guía de 0.5mm a 16mm",
      "Permite que el Minoxidil llegue directo a la piel sin desperdiciarse en vello largo",
      "Batería de iones de litio de larga duración y cabezales lavables bajo el grifo",
    ],
    categoryType: "beard",
    queryUS: "Philips Norelco Multigroom beard trimmer men kit",
    queryES: "Philips recortadora barba precision hombre",
    ctaLabel: "Ver oferta Philips en Amazon",
  } satisfies AmazonProductRecommendation,

  BOAR_BRISTLE_BEARD_KIT: {
    id: "boar-bristle-beard-brush-kit",
    badge: "🧔 Kit Esencial de Domado de Barba",
    title: "Kit Cepillo de Barba 100% Cerdas de Jabalí Natural + Peine de Madera de Peral",
    subtitle:
      "Entrena la dirección de tu nueva barba hacia abajo, exfolia la piel debajo del vello y distribuye la hidratación de manera uniforme.",
    features: [
      "Cerdas firmes 100% naturales de jabalí que ordenan el vello rebelde y limpian los poros",
      "Peine de madera de doble dentado antiestático que no quiebra los nuevos folículos en transición",
      "Estimula el flujo sanguíneo en mejillas, bigote y línea mandibular",
    ],
    categoryType: "beard",
    queryUS: "100% boar bristle beard brush and wooden comb set men",
    queryES: "cepillo barba cerdas jabali peine madera hombre",
    ctaLabel: "Ver Kit de Barba en Amazon",
  } satisfies AmazonProductRecommendation,

  CASTOR_ROSEMARY_OIL: {
    id: "castor-rosemary-growth-oil",
    badge: "🌿 Mejor Aceite Nutritivo Post-Minoxidil",
    title: "Aceite Orgánico Prensado en Frío de Romero, Menta y Ricino Negro Jamaicano",
    subtitle:
      "Blend botánico rico en ácidos grasos omega-6/9 y ácido ricinoleico para nutrir y dar grosor a la barba, cabello y cejas una vez absorbido el Minoxidil.",
    features: [
      "Aceite puro de Ricino Negro Jamaicano infusionado con aceite esencial de Romero y Menta",
      "Previene la rotura de la fibra de queratina y aporta brillo saludable sin alcohol",
      "Incluye gotero de vidrio y aplicador para barba, cuero cabelludo y cejas",
    ],
    categoryType: "beard",
    queryUS: "rosemary mint jamaican black castor oil hair beard growth men",
    queryES: "aceite romero y ricino negro crecimiento cabello barba hombre",
    ctaLabel: "Ver Aceite en Amazon",
  } satisfies AmazonProductRecommendation,

  MENS_BIOTIN_SAW_PALMETTO: {
    id: "mens-biotin-saw-palmetto-vitamins",
    badge: "💊 #1 Soporte Folicular Interno",
    title: "Vitaminas para Barba y Cabello — Biotina 10,000 mcg, Zinc, Colágeno y Saw Palmetto",
    subtitle:
      "Potencia tu tratamiento tópico desde adentro aportando los precursores exactos de queratina y micronutrientes para un vello más grueso.",
    features: [
      "Alta concentración de Biotina (10,000 mcg), Zinc, Vitamina D3 y Ácido Fólico",
      "Extracto estandarizado de Saw Palmetto y Cola de Caballo (Sílice) para mayor densidad",
      "Fórmula masculina certificada GMP para acompañar tu ciclo de 6 meses de Minoxidil",
    ],
    categoryType: "supplement",
    queryUS: "mens hair beard growth vitamins biotin 10000 mcg saw palmetto zinc",
    queryES: "vitaminas biotina 10000 mcg saw palmetto zinc pelo barba hombre",
    ctaLabel: "Ver Vitaminas en Amazon",
  } satisfies AmazonProductRecommendation,

  CERAMIDE_FACIAL_MOISTURIZER: {
    id: "mens-ceramide-facial-moisturizer",
    badge: "🧴 Mejor Reparador de Barrera Cutánea",
    title: "Crema Hidratante Facial con 3 Ceramidas y Ácido Hialurónico (No Comedogénica)",
    subtitle:
      "Restaura el manto hidrolipídico del rostro y alivia cualquier tirantez o resequedad sin obstruir los poros ni frenar el crecimiento de la barba.",
    features: [
      "3 ceramidas esenciales + ácido hialurónico que reparan la piel sensible o irritada",
      "Textura ultraligera libre de aceites (Oil-Free) con acabado mate invisible",
      "Sin fragancias ni parabenos: 100% segura y compatible con el ciclo folicular facial",
    ],
    categoryType: "skincare",
    queryUS: "mens ceramide hyaluronic acid facial moisturizer oil free non comedogenic",
    queryES: "crema hidratante facial ceramidas acido hialuronico hombre",
    ctaLabel: "Ver Hidratante en Amazon",
  } satisfies AmazonProductRecommendation,

  ROOT_SCALP_APPLICATOR: {
    id: "precision-root-scalp-applicator",
    badge: "🎯 Dosificador de Raíz 1 mL Cero Goteo",
    title: "Aplicador Capilar de Precisión con Peine Dosificador Graduado (1 mL a 3 mL)",
    subtitle:
      "Deposita lociones capilares directamente sobre la piel del cuero cabelludo sin desperdiciar producto en el cabello ni escurrir por la frente.",
    features: [
      "Esferas metálicas dosificadoras que liberan el líquido solo al presionar sobre la raíz",
      "Escala graduada transparente en mililitros para medir la dosis clínica exacta de 1 mL",
      "Evita manchar los dedos y masajea simultáneamente las entradas y la coronilla",
    ],
    categoryType: "applicator",
    queryUS: "scalp applicator comb graduated 1ml minoxidil hair oil applicator men",
    queryES: "aplicador cuero cabelludo peine dosificador 1ml locion capilar",
    ctaLabel: "Ver Aplicador en Amazon",
  } satisfies AmazonProductRecommendation,

  SATIN_PILLOWCASE_SET: {
    id: "mens-satin-pillowcase-set",
    badge: "🌙 Protección Folicular Nocturna",
    title: "Pack de 2 Fundas de Almohada de Satén Fresco Masculinas (Gris Carbón / Azul Marino)",
    subtitle:
      "Reduce la fricción nocturna contra la almohada, evita el quiebre de los nuevos vellos en fase de transición y no absorbe tus tratamientos tópicos.",
    features: [
      "Tejido de satén suave de baja fricción que protege las entradas capilares y la barba",
      "A diferencia del algodón poroso, no reseca la piel ni absorbe la hidratación facial",
      "Cierre tipo sobre lavable a máquina en tonos masculinos elegantes",
    ],
    categoryType: "applicator",
    queryUS: "mens cooling satin pillowcase 2 pack dark gray hair protection",
    queryES: "funda almohada saten gris oscuro pack 2 cuidado cabello barba",
    ctaLabel: "Ver Fundas en Amazon",
  } satisfies AmazonProductRecommendation,

  KIRKLAND_MINOXIDIL_5: {
    id: "kirkland-signature-minoxidil-5",
    badge: "🥈 #2 del Ranking (Marca Clásica USA)",
    title: "Kirkland Signature Minoxidil 5% Extra Strength — Tratamiento Tópico para Hombre",
    subtitle:
      "La loción hidroalcohólica clásica al 5% comercializada en Estados Unidos (pack de 3 y 6 meses con gotero graduado de 60 ml).",
    features: [
      "Minoxidil tópico al 5% bajo monografía OTC de la FDA en Estados Unidos",
      "Presentación en cajas multipack de 60 ml por frasco con gotero medidor de 1 mL",
      "Ideal para cuero cabelludo; si sufres resequedad facial, compleméntalo con hidratación",
    ],
    categoryType: "minoxidil",
    queryUS: "Kirkland Signature Minoxidil 5% Extra Strength Men Hair Regrowth",
    queryES: "Kirkland Minoxidil 5% solucion capilar hombre",
    ctaLabel: "Ver Kirkland en Amazon",
  } satisfies AmazonProductRecommendation,

  ROGAINE_FOAM_5: {
    id: "mens-rogaine-foam-5",
    badge: "🥉 #3 del Ranking (Espuma Clásica USA)",
    title: "Men's Rogaine 5% Minoxidil Unscented Foam — Espuma Capilar en Aerosol",
    subtitle:
      "La marca pionera de farmacias en Estados Unidos en formato espuma (Foam) de secado rápido sin propilenglicol para la coronilla.",
    features: [
      "Espuma en aerosol al 5% sin perfume aprobada por la FDA para alopecia androgenética",
      "Secado rápido en cuero cabelludo sin dejar película aceitosa pesada",
      "Disponible en packs de 3 meses con envío Prime en Amazon",
    ],
    categoryType: "minoxidil",
    queryUS: "Mens Rogaine 5% Minoxidil Unscented Foam Hair Regrowth",
    queryES: "Regaine Rogaine 5% minoxidil espuma capilar hombre",
    ctaLabel: "Ver Rogaine en Amazon",
  } satisfies AmazonProductRecommendation,

  HIMS_FOLIGAIN_5: {
    id: "hims-foligain-minoxidil-5",
    badge: "🇺🇸 Top Marcas de Amazon Estados Unidos",
    title: "Hims & Foligain Minoxidil 5% — Tratamientos Tópicos Capilares en Amazon USA",
    subtitle:
      "Las marcas estadounidenses #4 y #5 de nuestro ranking general con opciones en gotero líquido, espuma y variantes bajas en alcohol.",
    features: [
      "Formulaciones al 5% de alta demanda en el mercado estadounidense de telemedicina y Amazon",
      "Opciones Low-Alcohol (Foligain) y goteros minimalistas (Hims)",
      "Verifica disponibilidad y envío internacional directo en Amazon",
    ],
    categoryType: "minoxidil",
    queryUS: "Hims Foligain 5% Minoxidil Topical Hair Regrowth Men",
    queryES: "Foligain Minoxidil 5% locion capilar hombre",
    ctaLabel: "Ver en Amazon",
  } satisfies AmazonProductRecommendation,
};

/**
 * Enlaces directos de afiliado para las marcas #2 a #5 del Ranking Top 5 en el Home
 * (El puesto #1 You Minox mantiene siempre su enlace oficial a https://youminox.com).
 */
export const TOP_RANKING_AMAZON_QUERIES: Record<
  string,
  { queryUS: string; queryES: string; label: string }
> = {
  "kirkland-signature": {
    queryUS: "Kirkland Signature Minoxidil 5% Extra Strength Men",
    queryES: "Kirkland Minoxidil 5% hombre",
    label: "🛒 Ver Kirkland en Amazon ↗",
  },
  "mens-rogaine": {
    queryUS: "Mens Rogaine 5% Minoxidil Unscented Foam",
    queryES: "Regaine Rogaine 5% Minoxidil Espuma",
    label: "🛒 Ver Rogaine en Amazon ↗",
  },
  "hims-minoxidil": {
    queryUS: "Hims Minoxidil 5% Topical Hair Regrowth",
    queryES: "Hims Minoxidil 5% capilar hombre",
    label: "🛒 Ver Hims en Amazon ↗",
  },
  "foligain-keeps-usa": {
    queryUS: "Foligain Minoxidil 5% Hair Regrowth Men",
    queryES: "Foligain Minoxidil 5% hombre",
    label: "🛒 Ver Foligain en Amazon ↗",
  },
};

/**
 * Enlaces de afiliado para las marcas internacionales (#6 al #15) en la tabla del Home.
 */
export function getInternationalBrandAmazonQueries(brandName: string): {
  queryUS: string;
  queryES: string;
} {
  const clean = brandName.split("(")[0].trim();
  return {
    queryUS: `${clean} Minoxidil 5% men hair beard`,
    queryES: `${clean} Minoxidil 5% capilar hombre`,
  };
}

/**
 * Motor Contextual para los 500 Artículos:
 * Devuelve los 3 productos de afiliado de Amazon más relevantes según el tema exacto del artículo.
 */
export function getContextualAmazonProducts(
  slug: string,
  categorySlug: string,
  title: string
): AmazonPageContext {
  const s = `${slug} ${title.toLowerCase()}`;

  // 1. Marcas USA, Amazon y Comparativas de Marcas (Kirkland, Rogaine, Hims, Foligain, Equate, etc.)
  if (
    categorySlug === "marcas-usa-y-amazon" ||
    s.includes("kirkland") ||
    s.includes("rogaine") ||
    s.includes("hims") ||
    s.includes("foligain") ||
    s.includes("keeps") ||
    s.includes("equate") ||
    s.includes("goodsense") ||
    s.includes("lipogaine") ||
    s.includes("amazon")
  ) {
    return {
      sectionTitle:
        "🇺🇸 Marcas de Estados Unidos y Complementos Más Vendidos en Amazon",
      sectionSubtitle:
        "Compara los precios actuales en Amazon de las marcas estadounidenses del ranking y los accesorios clínicos que multiplican su absorción:",
      products: [
        CATALOG.KIRKLAND_MINOXIDIL_5,
        CATALOG.ROGAINE_FOAM_5,
        CATALOG.DERMA_STAMP_ADJUSTABLE,
      ],
    };
  }

  // 2. Dermaroller, Microneedling, Biotina, Colágeno y Rutinas
  if (
    s.includes("dermaroller") ||
    s.includes("dermapen") ||
    s.includes("microneedling") ||
    s.includes("biotina") ||
    s.includes("colageno") ||
    s.includes("vitamina") ||
    categorySlug === "cuidado-barba-y-rutinas"
  ) {
    return {
      sectionTitle:
        "⚡ Kit de Sinergia Triple en Amazon: Dermaroller Titanio + Biotina 10,000 mcg",
      sectionSubtitle:
        "Acelera el engrosamiento de tu barba y cabello combinando tu rutina tópica con inducción de colágeno de 0.5mm y precursores de queratina:",
      products: [
        CATALOG.DERMA_ROLLER_05MM,
        CATALOG.MENS_BIOTIN_SAW_PALMETTO,
        CATALOG.DERMA_STAMP_ADJUSTABLE,
      ],
    };
  }

  // 3. Barberías del Perú, Distritos de Lima y Ciudades del Perú
  if (
    categorySlug === "barberias-y-estilo-peru" ||
    categorySlug === "distritos-de-lima" ||
    categorySlug === "ciudades-del-peru" ||
    s.includes("barberia") ||
    s.includes("perfilar") ||
    s.includes("afeitar") ||
    s.includes("recortar") ||
    s.includes("visagismo")
  ) {
    return {
      sectionTitle:
        "💈 Herramientas de Barbería y Mantenimiento de Barba Más Vendidas en Amazon",
      sectionSubtitle:
        "Mantén el perfilado de la barbería impecable en casa y entrena la dirección de tus nuevos folículos con herramientas profesionales:",
      products: [
        CATALOG.PHILIPS_BEARD_TRIMMER,
        CATALOG.BOAR_BRISTLE_BEARD_KIT,
        CATALOG.DERMA_ROLLER_05MM,
      ],
    };
  }

  // 4. Cabello, Entradas, Coronilla, Alopecia y Shampoo Ketoconazol
  if (
    categorySlug === "minoxidil-para-cabello" ||
    s.includes("cabello") ||
    s.includes("entradas") ||
    s.includes("coronilla") ||
    s.includes("alopecia") ||
    s.includes("norwood") ||
    s.includes("shampoo") ||
    s.includes("ketoconazol")
  ) {
    return {
      sectionTitle:
        "💆‍♂️ Los 3 Complementos Clínicos #1 en Amazon para Entradas, Coronilla y Alopecia",
      sectionSubtitle:
        "Potencia la regeneración capilar manteniendo el cuero cabelludo libre de DHT con Ketoconazol 1%, Biotina sin sulfatos y micro-punción vertical:",
      products: [
        CATALOG.NIZORAL_KETOCONAZOLE,
        CATALOG.DERMA_STAMP_ADJUSTABLE,
        CATALOG.BIOTIN_DHT_SHAMPOO,
      ],
    };
  }

  // 5. Cejas, Piel Sensible, Dermatitis por Propilenglicol, Caspa y Regulación
  if (
    categorySlug === "minoxidil-para-cejas-y-piel" ||
    categorySlug === "regulacion-digemid-peru" ||
    s.includes("cejas") ||
    s.includes("dermatitis") ||
    s.includes("propilenglicol") ||
    s.includes("picazon") ||
    s.includes("caspa") ||
    s.includes("granos") ||
    s.includes("sensible")
  ) {
    return {
      sectionTitle:
        "🛡️ Cuidado de Piel Sensible, Reparación de Barrera y Precisión en Amazon",
      sectionSubtitle:
        "Protege tu epidermis contra la descamación, repara el manto lipídico con ceramidas no comedogénicas y dosifica con máxima precisión:",
      products: [
        CATALOG.CERAMIDE_FACIAL_MOISTURIZER,
        CATALOG.CASTOR_ROSEMARY_OIL,
        CATALOG.NIZORAL_KETOCONAZOLE,
      ],
    };
  }

  // 6. Países del Mundo y Comparativas Internacionales
  if (
    categorySlug === "paises-del-mundo" ||
    categorySlug === "rankings-y-comparativas"
  ) {
    return {
      sectionTitle:
        "🏆 Top Ventas Internacionales en Amazon para el Crecimiento de Barba y Cabello",
      sectionSubtitle:
        "Los productos y herramientas mejor valorados por miles de usuarios en Estados Unidos, Europa y Latinoamérica con envío directo de Amazon:",
      products: [
        CATALOG.DERMA_STAMP_ADJUSTABLE,
        CATALOG.PHILIPS_BEARD_TRIMMER,
        CATALOG.MENS_BIOTIN_SAW_PALMETTO,
      ],
    };
  }

  // 7. Por defecto: Crecimiento de Barba, Bigote y You Minox Crema
  return {
    sectionTitle:
      "🧔 Kit Esencial en Amazon para Multiplicar tus Resultados de Barba y Cabello",
    sectionSubtitle:
      "Complementa tu tratamiento diario con los 3 accesorios mejor calificados en Amazon para estimular, recortar y nutrir tus nuevos folículos:",
    products: [
      CATALOG.DERMA_ROLLER_05MM,
      CATALOG.PHILIPS_BEARD_TRIMMER,
      CATALOG.BOAR_BRISTLE_BEARD_KIT,
    ],
  };
}

export function getAmazonContextForCategory(
  categorySlug: string
): AmazonPageContext {
  return getContextualAmazonProducts(categorySlug, categorySlug, categorySlug);
}

export function getHomeAmazonShowcase(): AmazonPageContext {
  return {
    sectionTitle:
      "🛒 Complementos Oficiales Más Vendidos en Amazon para Potenciar tu Tratamiento",
    sectionSubtitle:
      "Acompaña tu rutina diaria de Minoxidil con micro-punción de titanio 0.5mm, bloqueo de DHT con Ketoconazol 1% y recorte de precisión sin dañar el folículo:",
    products: [
      CATALOG.DERMA_ROLLER_05MM,
      CATALOG.NIZORAL_KETOCONAZOLE,
      CATALOG.PHILIPS_BEARD_TRIMMER,
    ],
  };
}
