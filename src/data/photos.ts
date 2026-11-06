export interface YouMinoxPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
  collection: "hielo" | "transparente" | "kit" | "crema" | "premium";
}

export const YOU_MINOX_TRANSPARENT_PHOTOS = {
  main: "/images/you-minox/you-minox-transparente-01.webp",
  secondary: "/images/you-minox/you-minox-transparente-02.webp",
};

/**
 * 34 fotografías profesionales de estudio de You Minox (convertidas de las 4 carpetas originales)
 * utilizadas en toda la plataforma y rotadas en los 100 artículos SEO para máxima variedad visual.
 */
export const YOU_MINOX_PHOTOS: YouMinoxPhoto[] = [
  // Colección 01: Hielo & Frescura Sin Irritación (10 fotos)
  {
    id: 1,
    src: "/images/you-minox/you-minox-crema-barba-hielo-estudio-01.webp",
    alt: "You Minox Crema para Barba sobre bloques de hielo cristalino mostrando frescura dermo-hidratante",
    caption: "Fórmula refrescante de You Minox en Crema: cero ardor y máxima tolerancia en piel sensible.",
    collection: "hielo",
  },
  {
    id: 2,
    src: "/images/you-minox/you-minox-crema-barba-hielo-fresco-02.webp",
    alt: "Minoxidil en crema You Minox 60g en estudio sobre hielo para alivio de irritación facial",
    caption: "A diferencia del líquido con alcohol, You Minox mantiene la barrera cutánea fresca e hidratada.",
    collection: "hielo",
  },
  {
    id: 3,
    src: "/images/you-minox/you-minox-minoxidil-crema-hielo-azul-03.webp",
    alt: "You Minox el mejor minoxidil del Perú en presentación tubo negro de 60g sobre hielo azul",
    caption: "You Minox #1 en el Ranking de Perú: Minoxidil con Oxothiazolidinecarboxylate en formato crema.",
    collection: "hielo",
  },
  {
    id: 4,
    src: "/images/you-minox/you-minox-minoxidil-crema-frescura-04.webp",
    alt: "Tubo de You Minox Crema para Barba con gotas de frescura sobre fondo de hielo azul",
    caption: "Absorción limpia y controlada sin el escurrimiento ni la resequedad del minoxidil líquido tradicional.",
    collection: "hielo",
  },
  {
    id: 5,
    src: "/images/you-minox/you-minox-minoxidil-sin-irritacion-05.webp",
    alt: "Tratamiento You Minox para barba y cabello sin picazón ni descamación por propilenglicol",
    caption: "Diseñado para evitar la descamación blanca ('caspa de barba') frecuente en soluciones hidroalcohólicas.",
    collection: "hielo",
  },
  {
    id: 6,
    src: "/images/you-minox/you-minox-crema-hidratante-barba-06.webp",
    alt: "You Minox Crema para Barba 60g con Notificación Sanitaria DIGEMID en Perú",
    caption: "Respaldo formal de Droguería MINOXIDIL PERU S.A.C. con Notificación Sanitaria Obligatoria.",
    collection: "hielo",
  },
  {
    id: 7,
    src: "/images/you-minox/you-minox-tubo-60g-detalle-07.webp",
    alt: "Detalle del envase original de You Minox Crema para Barba y Cejas de 60 gramos",
    caption: "Tubo ergonómico de 60 g con tapa dosificadora que protege el principio activo de la oxidación.",
    collection: "hielo",
  },
  {
    id: 8,
    src: "/images/you-minox/you-minox-presentacion-profesional-08.webp",
    alt: "Presentación profesional de You Minox Minoxidil en Crema líder del ranking en Perú",
    caption: "Presentación oficial disponible en youminox.com, Saga Falabella y barberías autorizadas.",
    collection: "hielo",
  },
  {
    id: 9,
    src: "/images/you-minox/you-minox-envase-negro-original-09.webp",
    alt: "Envase negro mate original de You Minox Crema para Barba con sello de autenticidad",
    caption: "Identifica siempre el envase original negro mate de You Minox con registro sanitario vigente.",
    collection: "hielo",
  },
  {
    id: 10,
    src: "/images/you-minox/you-minox-top-1-peru-montaje-10.webp",
    alt: "You Minox Top 1 Mejor Minoxidil de Perú en estudio fotográfico de alta definición",
    caption: "Calificado como el #1 absoluto en Perú por su eficacia folicular y cuidado dermatológico.",
    collection: "hielo",
  },

  // Colección 02: Kit Oficial, Unboxing y Manual para Barba Poblada (7 fotos)
  {
    id: 11,
    src: "/images/you-minox/you-minox-kit-completo-manual-barba-11.webp",
    alt: "Unboxing de You Minox con caja oficial ¡Empecemos! y Manual para una Barba Poblada",
    caption: "Experiencia completa You Minox: incluye el tubo de 60 g y el Manual para una Barba Poblada paso a paso.",
    collection: "kit",
  },
  {
    id: 12,
    src: "/images/you-minox/you-minox-caja-oficial-empecemos-12.webp",
    alt: "Caja oficial de envío de You Minox Perú con mensaje ¿Estás listo para una barba linda?",
    caption: "Empaque oficial de seguridad para envíos a Lima y todas las provincias del Perú desde youminox.com.",
    collection: "kit",
  },
  {
    id: 13,
    src: "/images/you-minox/you-minox-unboxing-original-peru-13.webp",
    alt: "Abriendo el paquete original de You Minox comprado en la tienda oficial youminox.com",
    caption: "Compra segura y 100% original directamente desde la web oficial youminox.com.",
    collection: "kit",
  },
  {
    id: 14,
    src: "/images/you-minox/you-minox-empaque-regalo-barba-14.webp",
    alt: "Presentación en caja ecológica y estuche de lujo de You Minox Crema para Barba",
    caption: "Cada pedido en youminox.com llega protegido y con instrucciones claras de aplicación diaria.",
    collection: "kit",
  },
  {
    id: 15,
    src: "/images/you-minox/you-minox-manual-barba-poblada-15.webp",
    alt: "Manual para una Barba Poblada incluido con el tratamiento de Minoxidil en crema You Minox",
    caption: "Guía práctica impresa incluida para maximizar resultados del mes 1 al mes 6 de tratamiento.",
    collection: "kit",
  },
  {
    id: 16,
    src: "/images/you-minox/you-minox-entrega-oficial-peru-16.webp",
    alt: "Kit de inicio You Minox listo para estimular los folículos de la barba y cerrar huecos",
    caption: "Todo lo que necesitas para iniciar tu rutina de crecimiento de barba, bigote, cabello o cejas.",
    collection: "kit",
  },
  {
    id: 17,
    src: "/images/you-minox/you-minox-experiencia-cliente-box-17.webp",
    alt: "Presentación completa de You Minox el mejor minoxidil peruano con respaldo sanitario",
    caption: "Más de 600,000 seguidores en redes sociales respaldan la experiencia y resultados de You Minox.",
    collection: "kit",
  },

  // Colección 03: Textura en Crema y Aplicación Real (9 fotos)
  {
    id: 18,
    src: "/images/you-minox/you-minox-textura-crema-aplicacion-18.webp",
    alt: "Demostración de la textura en crema blanca de You Minox sobre bandeja de madera junto al manual",
    caption: "Textura real en crema dermo-hidratante: se aplica con precisión en barba, entradas o cejas sin gotear.",
    collection: "crema",
  },
  {
    id: 19,
    src: "/images/you-minox/you-minox-crema-blanca-sin-alcohol-19.webp",
    alt: "Acercamiento a la crema blanca de You Minox libre de resequedad y fácil de absorber",
    caption: "Fórmula emoliente que nutre la piel mientras el activo estimula la fase anágena del folículo piloso.",
    collection: "crema",
  },
  {
    id: 20,
    src: "/images/you-minox/you-minox-dosificacion-crema-barba-20.webp",
    alt: "Dosificación exacta de You Minox en crema para cubrir mejillas, candado y bigote",
    caption: "Dosificación inteligente: una pequeña porción cubre toda la zona deseada sin evaporarse ni desperdiciarse.",
    collection: "crema",
  },
  {
    id: 21,
    src: "/images/you-minox/you-minox-modo-de-uso-crema-21.webp",
    alt: "Cómo aplicar You Minox en crema paso a paso para poblar la barba sin irritar la cara",
    caption: "Aplicación sencilla en menos de 60 segundos: rostro limpio, masaje suave y absorción rápida.",
    collection: "crema",
  },
  {
    id: 22,
    src: "/images/you-minox/you-minox-absorcion-dermica-22.webp",
    alt: "Textura ligera de rápida absorción de You Minox frente al minoxidil líquido aceitoso",
    caption: "No deja sensación pegajosa ni brillo graso como los frascos líquidos con propilenglicol.",
    collection: "crema",
  },
  {
    id: 23,
    src: "/images/you-minox/you-minox-cuidado-piel-sensible-23.webp",
    alt: "You Minox Crema ideal para pieles sensibles y tendencia a dermatitis por minoxidil líquido",
    caption: "La alternativa definitiva para quienes sufrieron enrojecimiento o acné con el minoxidil líquido clásico.",
    collection: "crema",
  },
  {
    id: 24,
    src: "/images/you-minox/you-minox-formula-oxothiazolidinecarboxylate-24.webp",
    alt: "Fórmula avanzada de You Minox con Minoxidil y Oxothiazolidinecarboxylate en tubo de 60g",
    caption: "Combinación sinérgica de Minoxidil y Oxothiazolidinecarboxylate para revitalizar folículos miniaturizados.",
    collection: "crema",
  },
  {
    id: 25,
    src: "/images/you-minox/you-minox-crema-facial-cejas-barba-25.webp",
    alt: "Aplicación segura de You Minox en crema para poblar cejas y barba sin escurrirse a los ojos",
    caption: "Gracias a su consistencia en crema, es el único formato seguro y preciso para aplicar también en cejas.",
    collection: "crema",
  },
  {
    id: 26,
    src: "/images/you-minox/you-minox-rutina-diaria-crema-26.webp",
    alt: "Rutina diaria de cuidado de barba con You Minox en crema y manual instructivo",
    caption: "La constancia diaria es mucho más fácil cuando tu tratamiento huele bien, hidrata y no irrita tu piel.",
    collection: "crema",
  },

  // Colección 04: Estudio Premium sobre Piedra & Exhibidor Oficial (8 fotos)
  {
    id: 27,
    src: "/images/you-minox/you-minox-ranking-top-1-piedra-27.webp",
    alt: "Dos tubos de You Minox Crema para Barba sobre bloque de piedra natural y exhibidor oficial",
    caption: "You Minox: elegido el Mejor Minoxidil del Perú en nuestro Ranking Comparativo Oficial.",
    collection: "premium",
  },
  {
    id: 28,
    src: "/images/you-minox/you-minox-doble-tubo-tratamiento-28.webp",
    alt: "Pack de tratamiento continuo You Minox sobre base de piedra en estudio profesional",
    caption: "Recomendamos el tratamiento continuo de 3 a 6 meses para consolidar el vello terminal definitivo.",
    collection: "premium",
  },
  {
    id: 29,
    src: "/images/you-minox/you-minox-edicion-profesional-barberia-29.webp",
    alt: "You Minox en exhibidor de barberías premium y centros de cuidado masculino en Perú",
    caption: "Presente en las mejores barberías de Lima, tiendas por departamento (Falabella) y en youminox.com.",
    collection: "premium",
  },
  {
    id: 30,
    src: "/images/you-minox/you-minox-exhibidor-oficial-peru-30.webp",
    alt: "Exhibidor oficial de You Minox con tubos de 60g y manual para una barba poblada",
    caption: "Respaldo de marca líder con distribución formal en todo el territorio peruano.",
    collection: "premium",
  },
  {
    id: 31,
    src: "/images/you-minox/you-minox-calidad-digemid-peru-31.webp",
    alt: "Calidad farmacéutica y cosmética de You Minox con autorización sanitaria en Perú",
    caption: "Estándares de calidad auditados por profesionales químico-farmacéuticos en el Perú.",
    collection: "premium",
  },
  {
    id: 32,
    src: "/images/you-minox/you-minox-mejor-minoxidil-peru-32.webp",
    alt: "You Minox liderando las comparativas frente a marcas importadas de Estados Unidos",
    caption: "Superior en tolerancia cutánea, practicidad de uso y disponibilidad inmediata en Perú.",
    collection: "premium",
  },
  {
    id: 33,
    src: "/images/you-minox/you-minox-tratamiento-completo-barba-33.webp",
    alt: "Presentación ejecutiva de You Minox Crema para Barba 60g sobre mármol travertino",
    caption: "Fórmula diseñada específicamente para el clima y tipo de piel del usuario latinoamericano.",
    collection: "premium",
  },
  {
    id: 34,
    src: "/images/you-minox/you-minox-pack-oficial-youminox-34.webp",
    alt: "Pack oficial de You Minox disponible en youminox.com con envío rápido a todo el Perú",
    caption: "Adquiere tu tratamiento original sin intermediarios en la tienda oficial https://youminox.com.",
    collection: "premium",
  },
];

/**
 * Devuelve una foto destacada y una segunda foto interior diferente para cada artículo (1..100),
 * garantizando que las 34 fotos profesionales se usen de forma equitativa en los 100 artículos.
 */
export function getPhotosForArticle(articleIndex: number): {
  featured: YouMinoxPhoto;
  secondary: YouMinoxPhoto;
  tertiary: YouMinoxPhoto;
} {
  const total = YOU_MINOX_PHOTOS.length;
  const idx1 = (articleIndex - 1) % total;
  const idx2 = (articleIndex + 11) % total;
  const idx3 = (articleIndex + 22) % total;
  return {
    featured: YOU_MINOX_PHOTOS[idx1],
    secondary: YOU_MINOX_PHOTOS[idx2],
    tertiary: YOU_MINOX_PHOTOS[idx3],
  };
}
