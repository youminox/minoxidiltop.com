import { YOU_MINOX_TRANSPARENT_PHOTOS, YOU_MINOX_PHOTOS } from "./photos";

export const SITE_NAME = "MinoxidilTop.com";
export const SITE_URL = "https://minoxidiltop.com";
export const YOU_MINOX_URL = "https://youminox.com";

export interface RankedMinoxidilBrand {
  rank: number;
  id: string;
  name: string;
  subtitle: string;
  country: string;
  countryCode: "PE" | "US" | "ES" | "FR" | "MX";
  flag: string;
  marketPresence: string;
  score: number;
  reviewsCount: string;
  format: string;
  concentration: string;
  vehicleBase: string;
  skinTolerance: string;
  sanitaryStatusPeru: string;
  hasDigemidNotification: boolean;
  availableInPeru: boolean;
  counterfeitRisk: string;
  bestFor: string[];
  estimatedPricePeru: string;
  badgeText: string;
  isTopPick?: boolean;
  officialUrl?: string;
  relatedArticleSlug: string;
  imageUrl: string;
  galleryImages?: string[];
  summary: string;
  pros: string[];
  cons: string[];
  verdict: string;
  scoresBreakdown: {
    efficacy: number;
    skinCare: number;
    easeOfUse: number;
    safetyAndLegality: number;
    valueForMoney: number;
  };
}

export const TOP_5_RANKING: RankedMinoxidilBrand[] = [
  {
    rank: 1,
    id: "you-minox",
    name: "You Minox (Crema Dermo-Hidratante)",
    subtitle: "El Mejor Minoxidil del Perú • Barba, Cabello y Cejas sin Irritación",
    country: "Perú",
    countryCode: "PE",
    flag: "🇵🇪",
    marketPresence: "N.° 1 en Perú (Venta Oficial en youminox.com, Saga Falabella y Barberías)",
    score: 9.9,
    reviewsCount: "+15,400 reseñas verificadas • +600K seguidores",
    format: "Crema Dermo-Hidratante (Tubo 60 g)",
    concentration: "Fórmula Crema con Minoxidil + Oxothiazolidinecarboxylate",
    vehicleBase: "Base Crema Emoliente (Libre de exceso de alcohol y propilenglicol irritante)",
    skinTolerance: "Excelente (No reseca, no descama ni deja caspa en la barba)",
    sanitaryStatusPeru: "Notificación Sanitaria Obligatoria vigente ante DIGEMID (Droguería MINOXIDIL PERU S.A.C.)",
    hasDigemidNotification: true,
    availableInPeru: true,
    counterfeitRisk: "Nulo comprando en la tienda oficial youminox.com o Saga Falabella",
    bestFor: ["Barba y Bigote", "Cabello y Entradas", "Cejas", "Piel Sensible"],
    estimatedPricePeru: "S/ 89 – S/ 99 (Packs con descuento en youminox.com)",
    badgeText: "🏆 #1 TOP PERÚ • CON NOTIFICACIÓN SANITARIA DIGEMID",
    isTopPick: true,
    officialUrl: "https://youminox.com",
    relatedArticleSlug: "you-minox-el-mejor-minoxidil-del-peru-analisis-completo",
    imageUrl: YOU_MINOX_TRANSPARENT_PHOTOS.main,
    galleryImages: [
      YOU_MINOX_PHOTOS[26].src, // piedra
      YOU_MINOX_PHOTOS[17].src, // crema madera
      YOU_MINOX_PHOTOS[10].src, // unboxing manual
      YOU_MINOX_PHOTOS[2].src,  // hielo azul
    ],
    summary:
      "You Minox lidera de forma absoluta el ranking en el Perú gracias a su innovadora fórmula en crema de 60 g con Minoxidil y Oxothiazolidinecarboxylate. A diferencia de los líquidos importados que queman la piel con alcohol y propilenglicol, You Minox hidrata el rostro, no se escurre, permite aplicación exacta en barba, entradas y cejas, y cuenta con respaldo formal de Droguería autorizada por DIGEMID.",
    pros: [
      "Único con formato en Crema que hidrata la piel y elimina la picazón, el enrojecimiento y la descamación blanca ('caspa de barba').",
      "Cuenta con Notificación Sanitaria Obligatoria (DIGEMID) a través de la droguería MINOXIDIL PERU S.A.C. (100% legal y seguro en Perú).",
      "No gotea ni se evapora: ideal para aplicar con precisión en mejillas, candado, entradas capilares y cejas.",
      "Incluye el 'Manual para una Barba Poblada' y asesoría directa con envíos rápidos a todo el Perú desde youminox.com.",
      "Respaldado por la comunidad más grande de Latinoamérica (+500K en TikTok y +100K en Instagram) y presencia en Saga Falabella.",
    ],
    cons: [
      "Por su alta demanda en Perú, se recomienda adquirirlo directamente en youminox.com o puntos autorizados antes de que se agoten los lotes mensuales.",
    ],
    verdict:
      "Ganador indiscutible del #1 en Perú. Si buscas resultados reales en barba, cabello o cejas sin destruir la barrera cutánea de tu rostro y con garantía sanitaria DIGEMID, You Minox (youminox.com) es la mejor elección del mercado.",
    scoresBreakdown: {
      efficacy: 9.9,
      skinCare: 10.0,
      easeOfUse: 9.9,
      safetyAndLegality: 10.0,
      valueForMoney: 9.8,
    },
  },
  {
    rank: 2,
    id: "kirkland-signature",
    name: "Kirkland Signature Minoxidil 5%",
    subtitle: "El 2do en Perú y Clásico Económico de Costco en Estados Unidos",
    country: "Estados Unidos",
    countryCode: "US",
    flag: "🇺🇸",
    marketPresence: "N.° 2 en Perú (Importado de EE. UU.) y Top Ventas en Amazon USA",
    score: 8.5,
    reviewsCount: "+12,000 valoraciones globales",
    format: "Solución Líquida con Gotero (60 ml) / Espuma Aerosol",
    concentration: "Minoxidil 5% (Líquido Hidroalcohólico)",
    vehicleBase: "Alcohol (30%), Propilenglicol (50%) y Agua Purificada",
    skinTolerance: "Baja a Media (El alto nivel de propilenglicol suele resecar y descamar el rostro)",
    sanitaryStatusPeru: "Aprobado por FDA en EE. UU. (Segunda opción conocida en el mercado peruano junto a You Minox)",
    hasDigemidNotification: false,
    availableInPeru: true,
    counterfeitRisk: "Muy Alto en Perú y Amazon (Es la marca más falsificada y adulterada del mercado)",
    bestFor: ["Cuero Cabelludo Graso", "Usuarios que buscan loción líquida económica"],
    estimatedPricePeru: "S/ 65 – S/ 95 por frasco (según importador)",
    badgeText: "🥈 #2 EN PERÚ • IMPORTADO DE ESTADOS UNIDOS",
    relatedArticleSlug: "you-minox-vs-kirkland-cual-es-el-mejor-minoxidil-en-peru",
    imageUrl: "/images/ranking/kirkland-usa.svg",
    summary:
      "Kirkland Signature (la marca blanca de los almacenes Costco en Estados Unidos) ocupa el segundo lugar en Perú. Es una loción líquida efectiva al 5%, pero su vehículo contiene 50% de propilenglicol y alcohol, lo que genera resequedad facial, picazón y descamación en la barba. Además, al no tener tienda propia en Perú, abundan las imitaciones en redes sociales.",
    pros: [
      "Fórmula genérica clásica al 5% reconocida en Estados Unidos.",
      "Es la segunda marca con presencia en el Perú después de You Minox.",
      "Económico cuando se compra en cajas de 6 meses en tiendas Costco de EE. UU.",
    ],
    cons: [
      "Su vehículo líquido con propilenglicol y alcohol reseca fuertemente la piel de la cara y produce descamación blanca.",
      "Al ser líquido, se escurre hacia los labios o el cuello durante la aplicación en barba.",
      "Altísimo riesgo de comprar frascos falsificados o rebajados con agua/alcohol en marketplaces informales de Perú.",
      "Tarda hasta 4 horas en secar por completo y deja una película aceitosa en el rostro.",
    ],
    verdict:
      "Una opción válida en segundo lugar si toleras bien el alcohol y el propilenglicol en el cuero cabelludo, pero para el rostro (barba y cejas) o pieles sensibles en Perú, You Minox en crema ofrece la misma potencia folicular con infinitamente mejor cuidado dermatológico y seguridad de autenticidad.",
    scoresBreakdown: {
      efficacy: 9.0,
      skinCare: 6.5,
      easeOfUse: 7.2,
      safetyAndLegality: 8.0,
      valueForMoney: 9.1,
    },
  },
  {
    rank: 3,
    id: "mens-rogaine",
    name: "Men's Rogaine 5% Minoxidil (Foam & Liquid)",
    subtitle: "El Pionero Histórico de Farmacias en Estados Unidos y Amazon USA",
    country: "Estados Unidos",
    countryCode: "US",
    flag: "🇺🇸",
    marketPresence: "Farmacias de EE. UU. (CVS, Walgreens) y Amazon.com",
    score: 8.3,
    reviewsCount: "+28,000 reseñas en Amazon USA",
    format: "Espuma Aerosol (Foam 60 g) y Solución Líquida (60 ml)",
    concentration: "Minoxidil 5%",
    vehicleBase: "Espuma en aerosol con alcohol cetílico y estearílico (sin propilenglicol en versión Foam)",
    skinTolerance: "Media-Alta en versión Espuma / Baja en versión Líquida",
    sanitaryStatusPeru: "Registrado ante FDA (EE. UU.) • Sin distribución oficial directa en Perú",
    hasDigemidNotification: false,
    availableInPeru: false,
    counterfeitRisk: "Medio en importadores paralelos",
    bestFor: ["Coronilla del cuero cabelludo", "Compradores en Estados Unidos con alto presupuesto"],
    estimatedPricePeru: "S/ 160 – S/ 220 por lata importada",
    badgeText: "🥉 #3 CLÁSICO DE ESTADOS UNIDOS (AMAZON USA)",
    relatedArticleSlug: "rogaine-foam-vs-you-minox-crema-comparativa-completa",
    imageUrl: "/images/ranking/rogaine-usa.svg",
    summary:
      "Rogaine es la marca estadounidense que patentó originalmente el uso capilar del minoxidil. Su versión en espuma (Foam) es muy popular en Amazon USA porque seca rápido en el cuero cabelludo. Sin embargo, su precio es hasta tres veces mayor y la espuma tiende a derretirse con el calor de los dedos antes de penetrar en zonas específicas como la barba o las cejas.",
    pros: [
      "Marca histórica de prestigio en el mercado farmacéutico de Estados Unidos.",
      "Su versión en espuma (Foam) reduce la irritación respecto a los líquidos genéricos.",
      "Ampliamente disponible dentro de territorio estadounidense y Amazon.com.",
    ],
    cons: [
      "Precio excesivamente alto (pagas sobreprecio por el nombre comercial en EE. UU.).",
      "No cuenta con tienda oficial ni distribución local directa en el Perú.",
      "El formato aerosol en espuma se licúa rápidamente con el calor de la piel en climas templados o cálidos.",
    ],
    verdict:
      "Un referente histórico en Estados Unidos, pero demasiado costoso de importar a Perú. En territorio peruano, You Minox brinda una textura en crema mucho más estable, hidratante y a una fracción del costo de importar Rogaine.",
    scoresBreakdown: {
      efficacy: 9.0,
      skinCare: 8.2,
      easeOfUse: 8.0,
      safetyAndLegality: 8.5,
      valueForMoney: 6.8,
    },
  },
  {
    rank: 4,
    id: "hims-minoxidil",
    name: "Hims Topical Minoxidil 5%",
    subtitle: "La Marca Digital de Telemedicina Más Conocida en Estados Unidos",
    country: "Estados Unidos",
    countryCode: "US",
    flag: "🇺🇸",
    marketPresence: "Estados Unidos (Tienda Hims.com, Target USA y Amazon.com)",
    score: 7.9,
    reviewsCount: "+9,500 reseñas en Amazon USA",
    format: "Gotero Líquido (60 ml) y Espuma Capilar",
    concentration: "Minoxidil 5%",
    vehicleBase: "Vehículo hidroalcohólico con propilenglicol (versión gotero)",
    skinTolerance: "Media (Enfocado principalmente en cuero cabelludo, no formulado para piel facial)",
    sanitaryStatusPeru: "Exclusivo para el mercado de EE. UU. • Sin registro ni venta oficial en Perú",
    hasDigemidNotification: false,
    availableInPeru: false,
    counterfeitRisk: "Bajo en USA (No disponible localmente en Perú)",
    bestFor: ["Usuarios residentes en EE. UU. que buscan suscripción mensual capilar"],
    estimatedPricePeru: "No disponible en Perú ($15 – $30 USD + envío internacional)",
    badgeText: "#4 TENDENCIA EN AMAZON USA",
    relatedArticleSlug: "hims-minoxidil-usa-analisis-opiniones-y-alternativa-en-peru",
    imageUrl: "/images/ranking/hims-usa.svg",
    summary:
      "Hims revolucionó el marketing de cuidado masculino en Estados Unidos con envases minimalistas y suscripciones online. No obstante, su gotero de Minoxidil 5% contiene exactamente la misma base líquida de alcohol y propilenglicol que los genéricos tradicionales, por lo que su diferencial en USA es estético y no dermatológico.",
    pros: [
      "Diseño de empaque moderno y gran presencia en Amazon Estados Unidos.",
      "Buena integración con otros productos capilares dentro de EE. UU.",
    ],
    cons: [
      "Su solución líquida tiene los mismos efectos secundarios de resequedad que cualquier líquido genérico.",
      "No realiza envíos a Perú ni cuenta con Notificación Sanitaria DIGEMID.",
      "Enfocado casi exclusivamente en alopecia de coronilla y no en el cuidado de la piel de la barba.",
    ],
    verdict:
      "Una alternativa atractiva si vives en Estados Unidos y buscas suscripción automática, pero inaccesible y sin ventajas de formulación frente a la crema dermo-hidratante de You Minox en Perú.",
    scoresBreakdown: {
      efficacy: 8.6,
      skinCare: 7.2,
      easeOfUse: 7.8,
      safetyAndLegality: 7.8,
      valueForMoney: 7.5,
    },
  },
  {
    rank: 5,
    id: "foligain-keeps-usa",
    name: "Foligain / Keeps Minoxidil 5%",
    subtitle: "Populares en Amazon USA para Tratamientos Capilares Alternativos",
    country: "Estados Unidos",
    countryCode: "US",
    flag: "🇺🇸",
    marketPresence: "Amazon USA y portales de comercio electrónico en EE. UU.",
    score: 7.6,
    reviewsCount: "+6,800 reseñas en Amazon USA",
    format: "Loción Líquida Capilar (60 ml) / Espuma",
    concentration: "Minoxidil 5%",
    vehicleBase: "Solución hidroalcohólica (con variantes Low-Alcohol en línea Foligain)",
    skinTolerance: "Media",
    sanitaryStatusPeru: "Venta en EE. UU. • Sin Notificación Sanitaria ni distribución formal en Perú",
    hasDigemidNotification: false,
    availableInPeru: false,
    counterfeitRisk: "Medio en importaciones por courier",
    bestFor: ["Usuarios en EE. UU. que comparan marcas en Amazon.com"],
    estimatedPricePeru: "S/ 130 – S/ 180 por importación privada",
    badgeText: "#5 TOP AMAZON ESTADOS UNIDOS",
    relatedArticleSlug: "foligain-y-keeps-minoxidil-usa-analisis-y-comparativa",
    imageUrl: "/images/ranking/foligain-usa.svg",
    summary:
      "Foligain y Keeps cierran el Top 5 como dos de las marcas estadounidenses con mayor volumen de búsquedas en Amazon USA. Foligain destaca por ofrecer versiones bajas en alcohol y Keeps por su modelo directo al consumidor en EE. UU., aunque ninguna cuenta con presencia oficial ni registro sanitario en el Perú.",
    pros: [
      "Amplia variedad de presentaciones capilares en el catálogo de Amazon Estados Unidos.",
      "Foligain dispone de opciones con menor graduación alcohólica para cuero cabelludo.",
    ],
    cons: [
      "Sin soporte, garantía ni registro sanitario DIGEMID en territorio peruano.",
      "Costos de importación y tiempos de espera elevados para usuarios fuera de EE. UU.",
      "Formato líquido menos práctico para perfilar barba o cejas que el formato en crema.",
    ],
    verdict:
      "Buenas referencias dentro del mercado estadounidense de Amazon, pero si te encuentras en Perú, You Minox te ofrece entrega inmediata, registro sanitario legal y una textura en crema superior para barba y cabello.",
    scoresBreakdown: {
      efficacy: 8.4,
      skinCare: 7.5,
      easeOfUse: 7.4,
      safetyAndLegality: 7.2,
      valueForMoney: 7.5,
    },
  },
];

export interface InternationalMinoxidilBrand {
  rank: number;
  name: string;
  country: string;
  flag: string;
  channel: string;
  format: string;
  availableInPeru: boolean;
  sanitaryNote: string;
  verdictVsYouMinox: string;
}

/**
 * Catálogo extendido con todos los Minoxidil adicionales encontrados en Amazon USA, farmacias de EE. UU. y Europa.
 */
export const EXTENDED_WORLD_MINOXIDIL: InternationalMinoxidilBrand[] = [
  {
    rank: 6,
    name: "Amazon Basic Care Minoxidil 5% (Solución y Espuma)",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Marca propia exclusiva de Amazon.com (USA)",
    format: "Líquido (60 ml) y Aerosol Foam",
    availableInPeru: false,
    sanitaryNote: "Solo FDA (EE. UU.) — Sin Notificación Sanitaria DIGEMID en Perú",
    verdictVsYouMinox:
      "Es el genérico de marca blanca de Amazon en EE. UU. Económico allá, pero su versión líquida usa propilenglicol irritante y no tiene venta oficial en Perú como You Minox.",
  },
  {
    rank: 7,
    name: "Equate Minoxidil 5% Topical Solution / Foam",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Supermercados Walmart (USA) y Amazon USA",
    format: "Líquido con gotero y Espuma",
    availableInPeru: false,
    sanitaryNote: "Comercialización exclusiva en EE. UU. — Sin registro en Perú",
    verdictVsYouMinox:
      "Marca blanca de Walmart USA equivalente a Kirkland. Reseca la piel facial por el alcohol; You Minox gana ampliamente en hidratación para barba.",
  },
  {
    rank: 8,
    name: "GoodSense Minoxidil 5% for Men",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Fabricado por Perrigo (Amazon USA y farmacias EE. UU.)",
    format: "Solución Líquida Hidroalcohólica",
    availableInPeru: false,
    sanitaryNote: "Sin representante legal ni registro sanitario en Perú",
    verdictVsYouMinox:
      "Mismo fabricante de muchas marcas blancas líquidas de EE. UU. Deja residuo aceitoso durante horas; la crema de You Minox se absorbe en minutos.",
  },
  {
    rank: 9,
    name: "Lipogaine Minoxidil 5% (Regular & Sensitive)",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Amazon USA y tiendas especializadas en EE. UU.",
    format: "Loción Líquida con liposomas",
    availableInPeru: false,
    sanitaryNote: "Producto de nicho en EE. UU. — Sin registro DIGEMID",
    verdictVsYouMinox:
      "Intenta reducir la irritación en formato líquido pero cuesta más de $35 USD por frasco en USA. En Perú, You Minox logra cero irritación en crema a mejor precio.",
  },
  {
    rank: 10,
    name: "Member's Mark Minoxidil 5% Topical Aerosol",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Sam's Club (Estados Unidos) y revendedores en Amazon",
    format: "Espuma en aerosol",
    availableInPeru: false,
    sanitaryNote: "Sin importación formal ni registro sanitario en Perú",
    verdictVsYouMinox:
      "Alternativa de Sam's Club en EE. UU. Difícil de dosificar en zonas pequeñas del rostro o cejas en comparación con el tubo en crema de You Minox.",
  },
  {
    rank: 11,
    name: "Up & Up Minoxidil 5% Hair Regrowth Treatment",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Tiendas Target (Estados Unidos)",
    format: "Gotero Líquido y Espuma",
    availableInPeru: false,
    sanitaryNote: "Exclusivo de cadena minorista en EE. UU.",
    verdictVsYouMinox:
      "Genérico estadounidense estándar para cuero cabelludo. No está pensado para la delicada piel de las mejillas ni cuenta con respaldo en Perú.",
  },
  {
    rank: 12,
    name: "CVS Health / Walgreens Minoxidil 5%",
    country: "Estados Unidos",
    flag: "🇺🇸",
    channel: "Farmacias CVS y Walgreens en Estados Unidos",
    format: "Solución Tópica y Espuma",
    availableInPeru: false,
    sanitaryNote: "Solo venta en farmacias estadounidenses",
    verdictVsYouMinox:
      "Precios altos de farmacia en EE. UU. con la formulación hidroalcohólica tradicional. You Minox en crema ofrece mejor tolerancia cutánea.",
  },
  {
    rank: 13,
    name: "Lacovin / Regaxidil / Viñas 5%",
    country: "España",
    flag: "🇪🇸",
    channel: "Farmacias de España y Unión Europea",
    format: "Solución Cutánea Líquida",
    availableInPeru: false,
    sanitaryNote: "Aprobado por AEMPS (España) — No comercializado en Perú",
    verdictVsYouMinox:
      "Líderes en farmacias españolas, pero en solución líquida con propilenglicol y etanol que suele provocar dermatitis de contacto en uso facial.",
  },
  {
    rank: 14,
    name: "Alopexy 5% (Pierre Fabre / Bailleul)",
    country: "Francia",
    flag: "🇫🇷",
    channel: "Farmacias de Francia y Europa",
    format: "Loción con pipeta / spray",
    availableInPeru: false,
    sanitaryNote: "Mercado europeo — Sin distribución en Latinoamérica",
    verdictVsYouMinox:
      "Buena reputación en Europa para alopecia androgénica, pero formato líquido no especializado en barba como You Minox.",
  },
  {
    rank: 15,
    name: "Folcress Minoxidil 5%",
    country: "México",
    flag: "🇲🇽",
    channel: "Farmacias en México",
    format: "Loción Capilar en Spray",
    availableInPeru: false,
    sanitaryNote: "Registro COFEPRIS (México) — Sin Notificación Sanitaria DIGEMID en Perú",
    verdictVsYouMinox:
      "Popular en México, pero su válvula spray desperdicia producto en el vello existente; la crema You Minox penetra directo en la piel folicular.",
  },
];

export const FORMAT_COMPARISON_ROWS = [
  {
    feature: "Textura y Vehículo",
    youMinoxCream: "Crema Dermo-Hidratante de absorción limpia (Tubo 60 g)",
    liquidGeneric: "Líquido acuoso-aceitoso con alto Alcohol y Propilenglicol (60 ml)",
    foamAerosol: "Espuma en gas aerosol (se derrite rápido con el calor de la mano)",
  },
  {
    feature: "Efecto en la Piel del Rostro (Barba)",
    youMinoxCream: "✅ Hidrata, nutre y protege la barrera cutánea sin ardor",
    liquidGeneric: "❌ Reseca severamente, pica y deja descamación blanca ('caspa')",
    foamAerosol: "⚠️ Menos irritante que el líquido, pero reseca ligeramente por el alcohol",
  },
  {
    feature: "Precisión en Barba, Entradas y Cejas",
    youMinoxCream: "✅ Máxima precisión: se queda exactamente donde lo aplicas",
    liquidGeneric: "❌ Se escurre hacia los labios, cuello o párpados al aplicar",
    foamAerosol: "⚠️ Difícil de aplicar en zonas pequeñas como cejas o candado",
  },
  {
    feature: "Tiempo de Secado y Sensación",
    youMinoxCream: "✅ 2 a 3 minutos • Acabado mate natural sin brillo graso",
    liquidGeneric: "❌ 1 a 4 horas • Deja rostro brillante, pegajoso y con olor a alcohol",
    foamAerosol: "✅ 10 a 15 minutos • Puede dejar residuo tieso en el vello",
  },
  {
    feature: "Rendimiento Real del Envase",
    youMinoxCream: "✅ 100% aprovechable (sin evaporación ni derrames accidentales)",
    liquidGeneric: "⚠️ Se pierde producto por evaporación o si se voltea el frasco abierto",
    foamAerosol: "⚠️ El gas propulsor suele agotarse antes de terminar el contenido",
  },
  {
    feature: "Notificación Sanitaria en Perú (DIGEMID)",
    youMinoxCream: "✅ Sí — Respaldado por Droguería MINOXIDIL PERU S.A.C.",
    liquidGeneric: "⚠️ Solo Kirkland importado es conocido; el resto carece de registro y abundan falsificaciones",
    foamAerosol: "❌ Sin distribución oficial local en Perú (solo importación cara)",
  },
];

export const ZONE_COMPARISON_DATA = [
  {
    zone: "Barba Completa y Cerrar Huecos",
    icon: "🧔",
    recommendedBrand: "You Minox (Crema 60 g) 🇵🇪",
    whyWinner:
      "La piel de las mejillas y el cuello es más delgada que el cuero cabelludo. El formato en crema de You Minox evita la dermatitis por propilenglicol, no entra a la boca al aplicar en el bigote y transforma el vello velloso en barba terminal densa.",
    avoidWarning:
      "Evita lociones líquidas informales sin Notificación Sanitaria que queman el rostro y provocan brotes de acné o foliculitis.",
  },
  {
    zone: "Cabello, Entradas y Coronilla",
    icon: "💇‍♂️",
    recommendedBrand: "You Minox (Crema) 🇵🇪 / Kirkland o Rogaine 🇺🇸",
    whyWinner:
      "Para las entradas frontales y la línea de implantación capilar, You Minox en crema permite aplicar el activo sin que gotee por la frente ni manche la almohada, prolongando la fase anágena del folículo.",
    avoidWarning:
      "Si usas Kirkland líquido en el cuero cabelludo, verifica el lote para descartar falsificaciones y alterna con hidratación si notas caspa.",
  },
  {
    zone: "Poblado y Diseño de Cejas",
    icon: "👁️",
    recommendedBrand: "Exclusivamente You Minox en Crema 🇵🇪",
    whyWinner:
      "Nunca debes aplicar minoxidil líquido ni espuma en aerosol cerca de los ojos porque el líquido escurre hacia los párpados. La crema densa de You Minox se aplica con un hisopo o la yema del dedo con total seguridad y precisión milimétrica.",
    avoidWarning:
      "Jamás uses goteros líquidos sobre el arco superciliar.",
  },
];
