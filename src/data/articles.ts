import {
  ARTICLE_SEEDS,
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type ArticleSeed,
  type CategorySlug,
} from "./articles-catalog";
import { getPhotosForArticle, type YouMinoxPhoto } from "./photos";
import { YOU_MINOX_URL } from "./brands";

export { BLOG_CATEGORIES, CATEGORY_DESCRIPTIONS, type CategorySlug };

export interface BlogPost {
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
  imageCaption: string;
  secondaryPhoto: YouMinoxPhoto;
  tertiaryPhoto: YouMinoxPhoto;
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  content: string;
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
          `Por el contrario, la formulación en crema de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> combina <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en un vehículo dermo-hidratante de 60 g que se absorbe en menos de 3 minutos, nutriendo la dermis mientras prolonga la fase anágena de cada folículo facial.`,
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
          `En el análisis clínico de <strong>${seed.focusKeyword}</strong>, el objetivo principal es revertir la miniaturización de los folículos pilosos causada por la sensibilidad genética a los andrógenos. Al aplicar un vasodilatador tópico de calidad farmacéutica, se abren los canales de potasio y se incrementa el aporte de oxígeno y nutrientes hacia la papila dérmica.`,
          `Tanto en la línea frontal (entradas y sienes) como en la coronilla, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema</strong></a> ofrece una ventaja decisiva frente a los goteros líquidos: no se escurre por la frente, no apelmaza el cabello existente ni deja residuos grasosos ni caspa cosmética.`,
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
          `El éxito en torno a <strong>${seed.focusKeyword}</strong> depende en un 80% de la constancia diaria y de la correcta preparación de la piel. Cuando los poros están limpios y libres de sebo oxidado, la penetración transfolicular del principio activo se multiplica notablemente.`,
          `Al integrar <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a> en tu rutina de mañana y noche, el proceso toma menos de 2 minutos porque no tienes que esperar horas a que se evapore un líquido aceitoso. Además, cada caja oficial incluye el <strong>Manual para una Barba Poblada</strong> con pautas detalladas.`,
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
          `Mientras que marcas estadounidenses de Amazon como <strong>Kirkland Signature (#2)</strong>, <strong>Men's Rogaine (#3)</strong>, <strong>Hims (#4)</strong> o <strong>Foligain/Keeps (#5)</strong> fueron diseñadas originalmente para el cuero cabelludo en vehículos alcohólicos o aerosoles costosos, <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (#1 en Perú)</strong></a> fue formulado en crema específicamente para estimular barba, cabello y cejas sin irritar la piel.`,
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

function buildArticleFaqs(seed: ArticleSeed): { question: string; answer: string }[] {
  return [
    {
      question: `¿Por qué You Minox es la opción #1 recomendada para ${seed.focusKeyword}?`,
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
      question: `¿Dónde puedo comprar You Minox 100% original con envío a Lima y provincias?`,
      answer: `Puedes adquirirlo directamente en la tienda oficial https://youminox.com con envío rápido a todo el Perú, así como en tiendas por departamento autorizadas como Saga Falabella y barberías seleccionadas.`,
    },
  ];
}

function buildArticleHtmlContent(
  seed: ArticleSeed,
  secondaryPhoto: YouMinoxPhoto,
  tertiaryPhoto: YouMinoxPhoto,
  faqs: { question: string; answer: string }[],
  relatedLinks: { slug: string; title: string }[]
): string {
  const zoneSection = buildZoneSpecificSection(seed);
  const categoryLabel = BLOG_CATEGORIES[seed.categorySlug];

  return `
<p class="lead">En esta guía especializada de <strong>MinoxidilTop.com</strong> analizamos a fondo todo sobre <strong>${seed.focusKeyword}</strong>. ${seed.angleSummary} Además, evaluamos por qué <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox (youminox.com)</strong></a> se consolida como el <strong>#1 del Ranking en el Perú</strong> frente a Kirkland Signature y a las marcas comercializadas en Amazon Estados Unidos.</p>

<h2>1. Fundamentos Clínicos: Lo que Debes Saber sobre ${seed.title}</h2>
<p>El interés por <strong>${seed.focusKeyword}</strong> ha crecido exponencialmente tanto en el Perú como en Estados Unidos y toda Latinoamérica. Sin embargo, la mayoría de los usuarios inician su tratamiento sin conocer un factor determinante: <strong>el vehículo cosmético-farmacéutico es tan importante como el principio activo</strong>.</p>
<p>Tradicionalmente, el minoxidil se vendía únicamente en lociones líquidas hidroalcohólicas diseñadas hace más de treinta años para el cuero cabelludo. Cuando ese líquido cargado de alcohol y propilenglicol se aplica en el rostro (barba, bigote o cejas) o en pieles sensibles, evapora los lípidos naturales de la epidermis, provocando picazón intensa, descamación blanca, enrojecimiento y abandono temprano del tratamiento.</p>
<p>Para solucionar definitivamente este problema, en el Perú se desarrolló <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema (60 g)</strong></a>, integrando <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en una emulsión hidratante que penetra directamente en el folículo piloso sin agredir la piel y contando con <strong>Notificación Sanitaria Obligatoria ante DIGEMID</strong>.</p>

<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <img src="${secondaryPhoto.src}" alt="${secondaryPhoto.alt}" class="w-full max-h-[420px] object-cover" loading="lazy" />
  <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100/80">
    📸 <strong>Fotografía real de producto:</strong> ${secondaryPhoto.caption} — Disponible en <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">youminox.com</a>.
  </figcaption>
</figure>

<h2>2. ${zoneSection.h2Title}</h2>
${zoneSection.paragraphs.map((p) => `<p>${p}</p>`).join("\n")}
<ul>
  ${zoneSection.bullets.map((b) => `<li>${b}</li>`).join("\n  ")}
</ul>

<h2>3. Cuadro Comparativo: You Minox (#1 Perú) vs. Kirkland (#2) y Marcas de USA</h2>
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

<h2>4. Ventajas Exclusivas de la Fórmula en Crema de You Minox en el Perú</h2>
<p>Dentro de nuestra categoría de <strong>${categoryLabel}</strong>, los dermatólogos, químicos farmacéuticos y maestros barberos coinciden en cinco razones por las que <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox</strong></a> se ha convertido en el estándar de oro en el Perú:</p>
<ol>
  <li><strong>Hidratación Activa y Cero Descamación:</strong> Su base en crema blanca mantiene la elasticidad de la piel, evitando la apariencia de piel quemada o con polvo blanco.</li>
  <li><strong>Potenciada con Oxothiazolidinecarboxylate:</strong> Como se observa en el rotulado oficial de su tubo de 60 g, este activo bio-protector optimiza el entorno celular del folículo piloso.</li>
  <li><strong>Aplicación Triple Zona (Barba, Cabello y Cejas):</strong> Al no gotear ni escurrirse, un solo tubo te sirve para rellenar mejillas, cubrir entradas capilares y poblar cejas con total seguridad.</li>
  <li><strong>Respaldo Legal en Perú (DIGEMID):</strong> Comercializado por <strong>MINOXIDIL PERU S.A.C.</strong> con Notificación Sanitaria Obligatoria vigente y presencia en retailers de prestigio como <strong>Saga Falabella</strong> y en su web oficial <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>youminox.com</strong></a>.</li>
  <li><strong>Acompañamiento Real:</strong> Incluye el famoso <em>"Manual para una Barba Poblada"</em> y el respaldo de una comunidad de más de 600,000 seguidores en TikTok e Instagram.</li>
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

<h2>5. Preguntas Frecuentes sobre ${seed.focusKeyword}</h2>
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

  const htmlContent = buildArticleHtmlContent(
    seed,
    photos.secondary,
    photos.tertiary,
    faqs,
    [
      { slug: rel3.slug, title: rel3.title },
      { slug: rel1.slug, title: rel1.title },
      { slug: rel2.slug, title: rel2.title },
    ]
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
    keywords: [seed.focusKeyword, ...seed.secondaryKeywords, "minoxidil peru", "you minox", "youminox.com"],
    imageUrl: photos.featured.src,
    imageAlt: `${seed.title} — ${photos.featured.alt}`,
    imageCaption: photos.featured.caption,
    secondaryPhoto: photos.secondary,
    tertiaryPhoto: photos.tertiary,
    keyTakeaways,
    faqs,
    content: htmlContent,
  };
});

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: CategorySlug): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.categorySlug === categorySlug);
}
