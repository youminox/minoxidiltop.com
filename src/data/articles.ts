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

function buildZoneSpecificSection(seed: ArticleSeed): {
  h2Title: string;
  paragraphs: string[];
  bullets: string[];
} {
  switch (seed.targetZone) {
    case "barba":
      return {
        h2Title: `Protocolo de Aplicación en Barba y Mejillas: De Vello Fino a Barba Terminal`,
        paragraphs: [
          `Cuando buscamos resultados reales en torno a <strong>${seed.focusKeyword}</strong>, es fundamental comprender que la piel de las mejillas, el bigote y el mentón posee un estrato córneo mucho más sensible que el cuero cabelludo. Las soluciones líquidas importadas contienen hasta un 50% de propilenglicol y alcohol etílico, lo que provoca ardor, enrojecimiento y una molesta descamación blanca conocida como "caspa de barba".`,
          `Por el contrario, la formulación en crema de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> combina <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en un vehículo dermo-hidratante de 60 g que se absorbe en menos de 3 minutos, nutriendo la dermis mientras prolonga la fase anágena de cada folículo facial. Además, cuando tus nuevos folículos alcancen buena densidad, puedes consultar el <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>Ranking Oficial de las Mejores Barberías del Perú en GuíaDeBarberías.com</strong></a> y las guías de visagismo en <a href="https://masbarba.net/estilo/" target="_blank" rel="noopener noreferrer"><strong>MásBarba.net</strong></a> para perfilar tu barba con un maestro barbero.`,
        ],
        bullets: [
          `<strong>Mes 1 a 2 (Despertar Folicular):</strong> Activación de la microcirculación periférica y aparición de los primeros vellos vellosos finos en mejillas y conectores.`,
          `<strong>Mes 3 a 4 (Engrosamiento y Densidad):</strong> Recambio natural hacia fibras más oscuras y cierre progresivo de los huecos de la barba.`,
          `<strong>Mes 5 a 6 (Consolidación Terminal):</strong> Maduración completa del vello terminal definitivo con raíz profunda y permanente.`,
          `<strong>Cero Goteo y Cero Resequedad:</strong> Al ser crema, puedes aplicarla con precisión en el bigote y el candado sin que escurra hacia los labios.`,
        ],
      };
    case "cabello":
      return {
        h2Title: `Acción Folicular en Entradas y Coronilla: Cómo Frenar la Miniaturización Capilar`,
        paragraphs: [
          `En el análisis clínico de <strong>${seed.focusKeyword}</strong>, el objetivo principal es revertir la miniaturización de los folículos pilosos causada por la sensibilidad genética a los andrógenos. Al aplicar un vasodilatador tópico de calidad farmacéutica, se abren los canales de potasio y se incrementa el aporte de oxígeno y nutrientes hacia la papila dérmica, tal como se documenta en la enciclopedia capilar de <a href="https://masbarba.net/alopecia/" target="_blank" rel="noopener noreferrer"><strong>regeneración capilar y alopecia de MásBarba.net</strong></a>.`,
          `Tanto en la línea frontal (entradas y sienes) como en la coronilla, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a> ofrece una ventaja decisiva frente a los goteros líquidos: no se escurre por la frente, no apelmaza el cabello existente ni deja residuos grasosos. Para complementar tu tratamiento con el corte de cabello ideal, revisa la guía de <a href="https://guiadebarberias.com/blog/cortes-de-cabello-para-disimular-entradas-y-coronilla/" target="_blank" rel="noopener noreferrer"><strong>cortes de cabello para disimular entradas y coronilla en GuíaDeBarberías.com</strong></a>.`,
        ],
        bullets: [
          `<strong>Precisión en Entradas Capilares:</strong> Permite masajear el activo directamente sobre las sienes y la línea de implantación sin desperdiciar producto.`,
          `<strong>Sin Residuo Pegajoso:</strong> Ideal para usar por la mañana antes de ir a la oficina o por la noche sin manchar la almohada.`,
          `<strong>Sinergia Antioxidante:</strong> El Oxothiazolidinecarboxylate protege el bulbo capilar frente al estrés oxidativo diario.`,
          `<strong>Respaldo Sanitario en Perú:</strong> Comercializado formalmente con Notificación Sanitaria Obligatoria ante DIGEMID.`,
        ],
      };
    case "cejas":
      return {
        h2Title: `Seguridad Dermatológica y Aplicación Precisa en Cejas y Pieles Sensibles`,
        paragraphs: [
          `Al abordar <strong>${seed.focusKeyword}</strong>, la regla número uno de los especialistas es evitar cualquier loción líquida o espuma en aerosol cerca del contorno ocular. Los líquidos hidroalcohólicos tienen baja viscosidad y se deslizan fácilmente hacia los párpados, causando irritación severa.`,
          `Gracias a su consistencia en crema blanca dermo-hidratante, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a> se fija exactamente donde lo colocas. Basta una microdosis aplicada con un hisopo o la yema del dedo para poblar la cabeza, el arco o la cola de las cejas, así como para tratar pieles sensibles sin riesgo de dermatitis de contacto.`,
        ],
        bullets: [
          `<strong>Fijación Milimétrica sin Escurrimiento:</strong> La crema permanece en el arco superciliar sin bajar hacia los ojos.`,
          `<strong>Barrera Cutánea Protegida:</strong> Elimina el ardor, la rojez y los brotes de granos asociados al propilenglicol líquido.`,
          `<strong>Resultados Visibles desde la Semana 6:</strong> El ciclo folicular de las cejas responde rápidamente a la estimulación tópica constante.`,
          `<strong>Apto para Hombres y Mujeres:</strong> Textura invisible de acabado mate tras un suave masaje de 30 segundos.`,
        ],
      };
    case "regulacion":
      return {
        h2Title: `Marco Regulatorio en el Perú: Notificación Sanitaria DIGEMID y Seguridad del Usuario`,
        paragraphs: [
          `Un aspecto crítico sobre <strong>${seed.focusKeyword}</strong> es la legalidad y trazabilidad sanitaria en el mercado peruano. En el Perú, únicamente destacan dos opciones referentes: <strong>#1 You Minox</strong> (la única marca peruana en crema con Notificación Sanitaria Obligatoria ante DIGEMID y respaldo de la droguería <strong>MINOXIDIL PERU S.A.C.</strong>) y <strong>#2 Kirkland Signature</strong> (importado de Estados Unidos).`,
          `Fuera de estas dos referencias, el consumidor debe tener extremo cuidado: en el país no existen más marcas formales recomendables, ya que la normativa exige contar con <strong>Notificación Sanitaria Obligatoria</strong>. Comprar frascos artesanales o marcas informales sin registro expone tu rostro a adulteraciones, contaminación bacteriana y quemaduras químicas.`,
        ],
        bullets: [
          `<strong>Notificación Sanitaria Obligatoria (DIGEMID):</strong> Garantiza que la concentración del activo y los excipientes cumplen con los estándares de salud pública.`,
          `<strong>Droguería Habilitada (MINOXIDIL PERU S.A.C.):</strong> Asegura Buenas Prácticas de Almacenamiento (BPA) y control de temperatura de cada lote.`,
          `<strong>Cero Riesgo de Falsificación en Canal Oficial:</strong> Comprando en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer">youminox.com</a> o Saga Falabella recibes un producto 100% auténtico y sellado.`,
          `<strong>Alerta contra Clonaciones:</strong> Las lociones líquidas importadas por vías informales sufren un altísimo índice de falsificación en marketplaces.`,
        ],
      };
    case "rutina":
      return {
        h2Title: `Rutina Diaria Paso a Paso para Maximizar la Absorción y los Resultados`,
        paragraphs: [
          `El éxito en torno a <strong>${seed.focusKeyword}</strong> depende en un 80% de la constancia diaria y de la correcta preparación de la piel. Cuando los poros están limpios y libres de sebo oxidado, la penetración transfolicular del principio activo se multiplica notablemente, especialmente si complementas tu nutrición con las guías de <a href="https://masbarba.net/biotina/" target="_blank" rel="noopener noreferrer"><strong>Biotina y vitaminas capilares en MásBarba.net</strong></a>.`,
          `Al integrar <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> en tu rutina de mañana y noche, el proceso toma menos de 2 minutos porque no tienes que esperar horas a que se evapore un líquido aceitoso. Y cuando llegue el momento de darle forma profesional a tu barba, puedes revisar la <a href="https://guiadebarberias.com/blog/cuidado-post-barberia-rutina-para-mantener-degradado-y-barba/" target="_blank" rel="noopener noreferrer"><strong>rutina de cuidado post-barbería en GuíaDeBarberías.com</strong></a>.`,
        ],
        bullets: [
          `<strong>Paso 1 — Limpieza con Agua Tibia:</strong> Lava tu rostro o cuero cabelludo con un limpiador suave y seca con toques ligeros.`,
          `<strong>Paso 2 — Dosificación Inteligente:</strong> Extrae una pequeña porción de crema You Minox y distribúyela en las zonas objetivo.`,
          `<strong>Paso 3 — Masaje de 30 Segundos:</strong> Frota suavemente con las yemas de los dedos hasta su total absorción mate.`,
          `<strong>Paso 4 — Higiene Post-Aplicación:</strong> Lávate bien las manos con agua y jabón y deja actuar el producto un mínimo de 4 horas.`,
        ],
      };
    default:
      return {
        h2Title: `Análisis Comparativo: Por Qué You Minox Supera a las Marcas Tradicionales de EE. UU.`,
        paragraphs: [
          `Al evaluar de forma objetiva <strong>${seed.focusKeyword}</strong>, comparamos los parámetros que realmente determinan que un usuario complete su tratamiento con éxito: eficacia folicular, tolerancia dermatológica en la piel del rostro, facilidad de aplicación diaria y respaldo sanitario legal en el Perú.`,
          `Mientras que marcas estadounidenses de Amazon analizadas en el portal norteamericano <a href="https://minoxidil-usa.com/comparison/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com</strong></a> como <strong>Kirkland Signature (#2)</strong>, <strong>Men's Rogaine (#3)</strong>, <strong>Hims (#4)</strong> o <strong>Foligain/Keeps (#5)</strong> fueron diseñadas originalmente para el cuero cabelludo en vehículos alcohólicos o aerosoles costosos, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 en Perú)</strong></a> fue formulado en crema específicamente para estimular barba, cabello y cejas sin irritar la piel.`,
        ],
        bullets: [
          `<strong>#1 You Minox (Perú 🇵🇪 — 9.9/10):</strong> Formato Crema de 60 g con Oxothiazolidinecarboxylate, sin irritación y con Notificación Sanitaria DIGEMID.`,
          `<strong>#2 Kirkland Signature (EE. UU. 🇺🇸 — 8.5/10):</strong> Líquido económico efectivo, pero reseca la piel por su propilenglicol y presenta alto riesgo de falsificación.`,
          `<strong>#3 Men's Rogaine (EE. UU. 🇺🇸 — 8.3/10):</strong> Espuma clásica de farmacia en USA, pero hasta 3 veces más cara y sin distribución oficial en Perú.`,
          `<strong>#4 Hims & #5 Foligain/Keeps (EE. UU. 🇺🇸):</strong> Populares en Amazon Estados Unidos, pero sin registro sanitario ni soporte local en territorio peruano.`,
        ],
      };
  }
}

function buildVariantSpecificSection(
  seed: ArticleSeed,
  variant: ArticleLayoutVariant,
  localBarberias?: PeruBarberiaSummary[]
): string {
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
                `<li><strong><a href="https://guiadebarberias.com/barberia/${b.slug}/" target="_blank" rel="noopener noreferrer">${b.name}</a> (${b.district}, ${b.city}):</strong> Ubicada en ${b.address}. Calificación: <strong>★ ${b.rating.toFixed(1)}</strong> (${b.reviewCount} reseñas). Precios referenciales: Corte ${b.cutPrice} | Barba ${b.beardPrice} | Combo ${b.comboPrice}. Especialidad: <em>${b.styleTag}</em>.</li>`
            )
            .join("\n  ")
        : "";

    return `
<h2>Adaptación Climática y Folicular en ${loc} (${region})</h2>
<p>Los usuarios que inician su tratamiento de crecimiento de barba o recuperación capilar en <strong>${loc}</strong> enfrentan condiciones ambientales particulares: <strong>${climate.toLowerCase()}</strong>. En ejes de alta actividad como <strong>${avenues}</strong>, aplicar lociones líquidas hidroalcohólicas tradicionales suele ocasionar evaporación prematura, irritación dérmica o escurrimiento incómodo durante la jornada laboral.</p>
<p>Por ello, en <strong>${loc}</strong> el formato en crema dermo-hidratante de 60 g de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 en el Perú con Notificación Sanitaria DIGEMID)</strong></a> se ha consolidado como el favorito absoluto frente al líquido importado de Kirkland (#2). Su emulsión con <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> protege la barrera lipídica frente al clima de ${loc} y permite despachos rápidos a domicilio a través de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>youminox.com</strong></a>.</p>
${
  barbListHtml
    ? `<h3>Barberías Recomendadas para Perfilar tu Barba en ${loc} (Vía GuíaDeBarberías.com)</h3>
<p>Cuando tus folículos en <strong>${loc}</strong> alcancen el tercer o cuarto mes de maduración, te recomendamos acudir a los maestros barberos verificados en el directorio oficial <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com</strong></a>:</p>
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
    const brands = seed.localBrands || "Kirkland, Rogaine, Hims";
    return `
<h2>Panorama Regulatorio (${reg}) y Marcas Comercializadas en ${loc} ${flag}</h2>
<p>En el mercado de <strong>${loc} (${flag})</strong>, los productos tópicos de estimulación capilar y de barba están supervisados bajo los lineamientos de <strong>${reg}</strong>. Actualmente, los usuarios locales suelen encontrar en farmacias y plataformas de comercio electrónico opciones como <strong>${brands}</strong>, las cuales en su gran mayoría mantienen vehículos líquidos hidroalcohólicos clásicos o espumas en aerosol diseñadas originalmente para la coronilla.</p>
<p>Al contrastar la oferta de <strong>${loc}</strong> con el estándar sudamericano liderado en el Perú por <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (MINOXIDIL PERU S.A.C. — Notificación Sanitaria DIGEMID)</strong></a>, destaca una diferencia tecnológica clave: mientras las lociones convencionales dependen del propilenglicol como solvente, la ingeniería cosmética en crema de 60 g de <strong>You Minox</strong> incorpora <strong>Oxothiazolidinecarboxylate</strong> en una base emoliente que elimina por completo la descamación facial y permite una aplicación localizada en barba, entradas y cejas.</p>
    `.trim();
  }

  if (variant === "barberia") {
    return `
<h2>Protocolo de Visagismo y Barbería Profesional en el Perú (GuíaDeBarberías.com)</h2>
<p>Lograr una barba imponente o un corte que favorezca tus facciones requiere combinar dos pilares: <strong>densidad folicular real</strong> (estimulada diariamente con <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a>) y <strong>geometría de perfilado en barbería</strong>. En alianza con los especialistas de <a href="https://guiadebarberias.com/" target="_blank" rel="noopener noreferrer"><strong>GuíaDeBarberías.com</strong></a>, recomendamos respetar los tiempos de reposo de la piel antes y después del afeitado con navaja.</p>
<ul>
  <li><strong>Antes de tu cita en la barbería:</strong> Lava tu rostro y acude con la piel limpia para que el barbero evalúe la dirección natural de tus remolinos y el grosor de tu vello terminal.</li>
  <li><strong>Ritual de Toalla Caliente y Ozonoterapia:</strong> El vapor térmico dilata los poros faciales y ablanda la queratina, facilitando un trazo limpio en pómulos y cuello (2 dedos por encima de la nuez de Adán).</li>
  <li><strong>Espera de 4 a 6 horas post-navaja:</strong> Tras el perfilado con navaja libre, espera al menos 4 horas antes de aplicar tu dosis nocturna de <strong>You Minox en Crema</strong> para nutrir y regenerar la epidermis sin ardor.</li>
</ul>
    `.trim();
  }

  return "";
}

function buildArticleFaqs(seed: ArticleSeed): { question: string; answer: string }[] {
  const locSuffix = seed.locationName ? ` en ${seed.locationName}` : "";
  return [
    {
      question: `¿Por qué You Minox es la opción #1 recomendada para ${seed.focusKeyword}${locSuffix}?`,
      answer: `Porque You Minox (disponible en youminox.com) es el único tratamiento en el Perú formulado en una base de crema dermo-hidratante de 60 g con Minoxidil y Oxothiazolidinecarboxylate, respaldado por Notificación Sanitaria Obligatoria de DIGEMID. A diferencia del minoxidil líquido tradicional, no reseca, no produce caspa en la barba ni se escurre.`,
    },
    {
      question: `¿Por qué en el Perú solo se recomiendan You Minox y Kirkland?`,
      answer: `En el mercado peruano solo destacan estas dos opciones porque para comercializar legalmente productos tópicos capilares y de barba se exige Notificación Sanitaria Obligatoria ante DIGEMID (como la que posee You Minox a través de la droguería MINOXIDIL PERU S.A.C.). Fuera de You Minox (#1) y Kirkland importado de EE. UU. (#2), las demás opciones informales carecen de registro sanitario y representan un riesgo para la piel.`,
    },
    {
      question: `¿En cuánto tiempo se ven resultados reales aplicando You Minox de forma constante?`,
      answer: `Los primeros vellos finos y la reducción de la caída comienzan a notarse entre la semana 4 y la semana 8 de uso continuo (2 veces al día). El engrosamiento significativo ocurre entre el mes 3 y el mes 4, y la consolidación del vello terminal definitivo se alcanza entre el mes 6 y el mes 12 de tratamiento.`,
    },
    {
      question: `¿Dónde puedo comprar You Minox 100% original con envío rápido${locSuffix}?`,
      answer: `Puedes adquirirlo directamente en la tienda oficial https://youminox.com con envío rápido a todo Lima y provincias del Perú, así como en tiendas por departamento autorizadas como Saga Falabella y barberías seleccionadas.`,
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
  const variantSectionHtml = buildVariantSpecificSection(
    seed,
    variant,
    localBarberias
  );

  return `
<p class="lead">En esta guía especializada de <strong>MinoxidilTop.com</strong> analizamos a fondo todo sobre <strong>${seed.focusKeyword}</strong>. ${seed.angleSummary} Además, evaluamos por qué <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> se consolida como el <strong>#1 del Ranking en el Perú</strong> frente a Kirkland Signature y a las marcas comercializadas en Amazon Estados Unidos.</p>

${variantSectionHtml ? `${variantSectionHtml}\n` : ""}
<h2>Fundamentos Clínicos: Lo que Debes Saber sobre ${seed.title}</h2>
<p>El interés por <strong>${seed.focusKeyword}</strong> ha crecido exponencialmente tanto en el Perú como en Estados Unidos y toda Latinoamérica. Sin embargo, la mayoría de los usuarios inician su tratamiento sin conocer un factor determinante: <strong>el vehículo cosmético-farmacéutico es tan importante como el principio activo</strong>.</p>
<p>Tradicionalmente, el minoxidil se vendía únicamente en lociones líquidas hidroalcohólicas diseñadas hace más de treinta años para el cuero cabelludo. Cuando ese líquido cargado de alcohol y propilenglicol se aplica en el rostro (barba, bigote o cejas) o en pieles sensibles, evapora los lípidos naturales de la epidermis, provocando picazón intensa, descamación blanca, enrojecimiento y abandono temprano del tratamiento.</p>
<p>Para solucionar definitivamente este problema, en el Perú se desarrolló <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a>, integrando <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en una emulsión hidratante que penetra directamente en el folículo piloso sin agredir la piel y contando con <strong>Notificación Sanitaria Obligatoria ante DIGEMID</strong>.</p>

<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <img src="${secondaryPhoto.src}" alt="${secondaryPhoto.alt}" class="w-full max-h-[420px] object-cover" loading="lazy" />
  <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100/80">
    📸 <strong>Fotografía real de producto:</strong> ${secondaryPhoto.caption} — Disponible en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">youminox.com</a>.
  </figcaption>
</figure>

<h2>${zoneSection.h2Title}</h2>
${zoneSection.paragraphs.map((p) => `<p>${p}</p>`).join("\n")}
<ul>
  ${zoneSection.bullets.map((b) => `<li>${b}</li>`).join("\n  ")}
</ul>

${customPillarHtml ? `${customPillarHtml}\n` : ""}
<h2>Cuadro Comparativo: You Minox (#1 Perú) vs. Kirkland (#2) y Marcas de USA</h2>
<p>Para que tomes una decisión informada respecto a <strong>${seed.focusKeyword}</strong>, hemos elaborado la siguiente matriz comparativa entre las dos únicas marcas referentes en el mercado peruano (<strong>You Minox 🇵🇪</strong> y <strong>Kirkland Signature 🇺🇸</strong>) y las principales alternativas de Estados Unidos en Amazon (<strong>Rogaine 🇺🇸</strong>, <strong>Hims 🇺🇸</strong> y <strong>Foligain/Keeps 🇺🇸</strong>):</p>

<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
  <table class="min-w-full text-left text-sm">
    <thead class="bg-slate-900 text-white">
      <tr>
        <th class="px-4 py-3 font-extrabold">Marca y País</th>
        <th class="px-4 py-3 font-extrabold">Formato y Textura</th>
        <th class="px-4 py-3 font-extrabold">Tolerancia en Piel / Barba</th>
        <th class="px-4 py-3 font-extrabold">Situación Sanitaria en Perú</th>
        <th class="px-4 py-3 font-extrabold">Puntaje</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 bg-white">
      <tr class="bg-emerald-50/70">
        <td class="px-4 py-3 font-extrabold text-slate-900">🥇 #1 You Minox 🇵🇪<br/><span class="text-xs font-semibold text-emerald-700">youminox.com</span></td>
        <td class="px-4 py-3 font-semibold text-emerald-900">Crema Dermo-Hidratante (Tubo 60 g)</td>
        <td class="px-4 py-3 text-emerald-800 font-semibold">✅ Excelente (Cero caspa, cero ardor, ideal barba, cabello y cejas)</td>
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
        <td class="px-4 py-3 text-slate-700">Media-Alta en cuero cabelludo; se licúa rápido en rostro</td>
        <td class="px-4 py-3 text-slate-600">Solo FDA en EE. UU. • Sin distribución oficial directa en Perú</td>
        <td class="px-4 py-3 font-bold text-slate-800">8.3 / 10</td>
      </tr>
      <tr>
        <td class="px-4 py-3 font-bold text-slate-900">#4 Hims Topical 5% 🇺🇸<br/><span class="text-xs text-slate-500">Estados Unidos</span></td>
        <td class="px-4 py-3 text-slate-700">Gotero Líquido (60 ml)</td>
        <td class="px-4 py-3 text-amber-700">⚠️ Vehículo alcohólico estándar pensado solo para cabello</td>
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

<h2>Ventajas Exclusivas de la Fórmula en Crema de You Minox en el Perú</h2>
<p>Dentro de nuestra categoría de <strong>${categoryLabel}</strong>, los dermatólogos, químicos farmacéuticos y maestros barberos coinciden en cinco razones por las que <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a> se ha convertido en el estándar de oro en el Perú:</p>
<ol>
  <li><strong>Hidratación Activa y Cero Descamación:</strong> Su base en crema blanca mantiene la elasticidad de la piel, evitando la apariencia de piel quemada o con polvo blanco.</li>
  <li><strong>Potenciada con Oxothiazolidinecarboxylate:</strong> Como se observa en el rotulado oficial de su tubo de 60 g, este activo bio-protector optimiza el entorno celular del folículo piloso.</li>
  <li><strong>Aplicación Triple Zona (Barba, Cabello y Cejas):</strong> Al no gotear ni escurrirse, un solo tubo te sirve para rellenar mejillas, cubrir entradas capilares y poblar cejas con total seguridad.</li>
  <li><strong>Respaldo Legal en Perú (DIGEMID):</strong> Comercializado por <strong>MINOXIDIL PERU S.A.C.</strong> con Notificación Sanitaria Obligatoria vigente y presencia en retailers de prestigio como <strong>Saga Falabella</strong> y en su web oficial <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>youminox.com</strong></a>.</li>
  <li><strong>Acompañamiento Real y Fundador Transparente:</strong> Creado por <a href="https://charlielingan.com/es" target="_blank" rel="noopener noreferrer"><strong>Charlie Lingán (charlielingan.com)</strong></a>, incluye el famoso <em>"Manual para una Barba Poblada"</em> y el respaldo de una comunidad de más de 600,000 seguidores en TikTok e Instagram. Puedes leer <a href="https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru" target="_blank" rel="noopener noreferrer"><strong>por qué fundó You Minox en Crema-Gel aquí</strong></a>.</li>
</ol>

<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <img src="${tertiaryPhoto.src}" alt="${tertiaryPhoto.alt}" class="w-full max-h-[420px] object-cover" loading="lazy" />
  <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100/80">
    ✨ <strong>Calidad Profesional You Minox:</strong> ${tertiaryPhoto.caption}
  </figcaption>
</figure>

<h3>Guías Relacionadas en MinoxidilTop.com para Profundizar</h3>
<ul>
  ${relatedLinks
    .map(
      (link) =>
        `<li><a href="/blog/${link.slug}/"><strong>${link.title}</strong></a></li>`
    )
    .join("\n  ")}
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

export const BLOG_POSTS: BlogPost[] = ARTICLE_SEEDS.map((seed, index) => {
  const photos = getPhotosForArticle(seed.id);
  const faqs = buildArticleFaqs(seed);
  const layoutVariant = resolveLayoutVariant(seed);
  const badgeLabel = resolveBadgeLabel(layoutVariant, seed);

  // Pick 3 related links from the catalog
  const rel1 = ARTICLE_SEEDS[(index + 1) % ARTICLE_SEEDS.length];
  const rel2 = ARTICLE_SEEDS[(index + 7) % ARTICLE_SEEDS.length];
  const rel3 = ARTICLE_SEEDS[0].id === seed.id ? ARTICLE_SEEDS[1] : ARTICLE_SEEDS[0];

  const excerpt = `${seed.angleSummary} Descubre el cuadro comparativo completo, consejos de aplicación y por qué You Minox (youminox.com) es el #1 del ranking en Perú con Notificación Sanitaria DIGEMID.`;

  const keyTakeaways = [
    `You Minox (youminox.com) lidera el ranking en Perú (#1 con 9.9/10) gracias a su formato en crema de 60 g que no irrita ni reseca la piel.`,
    `En el Perú solo destacan dos marcas referentes: You Minox (con Notificación Sanitaria DIGEMID) y Kirkland Signature (importado de EE. UU.).`,
    `El vehículo en crema con Minoxidil y Oxothiazolidinecarboxylate permite aplicar el producto con precisión en barba, cabello y cejas sin escurrirse.`,
  ];

  const localBarberias =
    layoutVariant === "geoperu"
      ? getBarberiasByLocation(seed.locationName)
      : layoutVariant === "barberia"
        ? TOP_NATIONAL_BARBERIAS.slice(0, 4)
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
    [
      { slug: rel3.slug, title: rel3.title },
      { slug: rel1.slug, title: rel1.title },
      { slug: rel2.slug, title: rel2.title },
    ],
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
