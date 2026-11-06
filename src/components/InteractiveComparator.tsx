"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TOP_5_RANKING,
  YOU_MINOX_URL,
} from "@/data/brands";

const RIVAL_OPTIONS = [
  {
    id: "kirkland-signature",
    label: "🥈 #2 Kirkland Signature 5% (EE. UU. 🇺🇸)",
    brand: TOP_5_RANKING[1],
  },
  {
    id: "mens-rogaine",
    label: "🥉 #3 Men's Rogaine Foam 5% (EE. UU. 🇺🇸)",
    brand: TOP_5_RANKING[2],
  },
  {
    id: "hims-minoxidil",
    label: "#4 Hims Topical Minoxidil 5% (EE. UU. 🇺🇸)",
    brand: TOP_5_RANKING[3],
  },
  {
    id: "foligain-keeps-usa",
    label: "#5 Foligain / Keeps 5% (Amazon USA 🇺🇸)",
    brand: TOP_5_RANKING[4],
  },
];

export default function InteractiveComparator() {
  const [selectedRivalId, setSelectedRivalId] = useState<string>("kirkland-signature");
  const [targetZone, setTargetZone] = useState<"barba" | "cabello" | "cejas">("barba");
  const [skinType, setSkinType] = useState<"sensible" | "normal" | "seca">("sensible");
  const [monthsDuration, setMonthsDuration] = useState<3 | 6 | 12>(6);

  const youMinox = TOP_5_RANKING[0];
  const rival =
    RIVAL_OPTIONS.find((r) => r.id === selectedRivalId)?.brand ||
    TOP_5_RANKING[1];

  const getCustomDiagnosticText = () => {
    const zoneLabel =
      targetZone === "barba"
        ? "poblar la barba y cerrar huecos en mejillas/candado"
        : targetZone === "cabello"
        ? "recuperar entradas capilares y fortalecer la coronilla"
        : "poblar y engrosar las cejas con máxima seguridad ocular";

    const skinNote =
      skinType === "sensible"
        ? "Como tienes piel sensible, debes evitar los vehículos líquidos con alto alcohol y propilenglicol que causan dermatitis y descamación."
        : skinType === "seca"
        ? "Al tener piel con tendencia seca, las lociones alcohólicas agravarán la tirantez y producirán 'caspa' blanca en tu rostro."
        : "Aunque tu piel sea normal, el uso continuo de alcohol líquido dos veces al día termina debilitando la barrera lipídica natural.";

    return `Para ${zoneLabel} durante un ciclo recomendado de ${monthsDuration} meses, el ganador clínico absoluto es You Minox en Crema (60 g). ${skinNote} Además, en el Perú cuenta con Notificación Sanitaria Obligatoria vigente ante DIGEMID.`;
  };

  return (
    <section
      id="comparador-interactivo"
      className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-3">
            ⚡ Herramientas Interactivas de Decisión
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Comparador Interactivo <span className="text-emerald-400">1 vs. 1</span> y Diagnosticador Capilar
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Enfrenta directamente al <strong>#1 del Perú (You Minox 🇵🇪)</strong> contra cualquier marca de Estados Unidos y descubre qué presentación se adapta mejor a tu piel.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left 7 Columns: 1 vs 1 Head-to-Head Comparator */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Duelo Cara a Cara
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  🥇 You Minox 🇵🇪 vs. Marca Rival
                </h3>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="rival-select"
                  className="text-[11px] font-bold text-slate-400 mb-1"
                >
                  Elige la marca para comparar:
                </label>
                <select
                  id="rival-select"
                  value={selectedRivalId}
                  onChange={(e) => setSelectedRivalId(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white focus:border-emerald-400 focus:outline-none"
                >
                  {RIVAL_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Header of Both Brands */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="rounded-2xl border-2 border-emerald-500/60 bg-emerald-950/40 p-4 text-center relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-0.5 text-[10px] font-black uppercase text-slate-950">
                  🥇 #1 Ganador
                </span>
                <div className="h-24 flex items-center justify-center my-2">
                  <img
                    src={youMinox.imageUrl}
                    alt={youMinox.name}
                    className="max-h-24 w-auto object-contain drop-shadow-lg"
                  />
                </div>
                <p className="text-sm font-extrabold text-white">
                  {youMinox.flag} You Minox (Crema)
                </p>
                <p className="text-xs font-black text-emerald-400 mt-0.5">
                  Puntaje: {youMinox.score} / 10
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center">
                <span className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                  Puesto #{rival.rank}
                </span>
                <div className="h-24 flex items-center justify-center my-2">
                  <img
                    src={rival.imageUrl}
                    alt={rival.name}
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-bold text-slate-200">
                  {rival.flag} {rival.name.split("(")[0].trim()}
                </p>
                <p className="text-xs font-bold text-amber-400 mt-0.5">
                  Puntaje: {rival.score} / 10
                </p>
              </div>
            </div>

            {/* Metric Comparison Bars & Rows */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  1. Formato y Vehículo de Absorción
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-emerald-300">
                    ✅ {youMinox.format} (No gotea ni se evapora)
                  </div>
                  <div className="text-slate-300">{rival.format}</div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  2. Tolerancia en Piel (Resequedad / Caspa)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-emerald-300">
                    ✅ 10/10 — Hidrata, sin picazón ni descamación
                  </div>
                  <div className="text-amber-300">
                    ⚠️ {rival.scoresBreakdown.skinCare}/10 — {rival.skinTolerance}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  3. Notificación Sanitaria DIGEMID en Perú
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-emerald-300">
                    ✅ Sí (MINOXIDIL PERU S.A.C. Autorizado)
                  </div>
                  <div className="text-slate-400">
                    ❌ {rival.sanitaryStatusPeru}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  4. Riesgo de Falsificación / Adulteración
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-emerald-300">
                    ✅ {youMinox.counterfeitRisk}
                  </div>
                  <div className="text-amber-300">⚠️ {rival.counterfeitRisk}</div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  5. Zonas Recomendadas de Uso
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-emerald-300">
                    ✅ Barba, Cabello (Entradas) y Cejas
                  </div>
                  <div className="text-slate-300">
                    {rival.bestFor.join(" • ")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <Link
                href={`/blog/${rival.relatedArticleSlug}/`}
                className="text-xs font-extrabold text-emerald-400 hover:underline"
              >
                📖 Leer comparativa completa: You Minox vs.{" "}
                {rival.name.split("(")[0].trim()} →
              </Link>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-emerald-400 px-5 py-2.5 text-center text-xs font-extrabold text-slate-950 shadow-md transition hover:bg-emerald-300"
              >
                Ir a YouMinox.com ↗
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Personalized Treatment Calculator & Diagnostic */}
          <div className="lg:col-span-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-2xl">
            <span className="inline-block rounded-full bg-amber-400/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-300 mb-2">
              🧔 Test Clínico Personalizado
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              ¿Qué Minoxidil Necesitas Según tu Zona y Tipo de Piel?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Selecciona tu objetivo actual para calcular tu protocolo ideal sin
              irritación:
            </p>

            {/* Step 1: Zone */}
            <div className="mb-5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-2">
                1. ¿Qué zona deseas poblar o recuperar?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "barba", label: "🧔 Barba" },
                    { id: "cabello", label: "💇‍♂️ Cabello" },
                    { id: "cejas", label: "👁️ Cejas" },
                  ] as const
                ).map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setTargetZone(z.id)}
                    className={`rounded-xl py-2.5 px-2 text-xs font-extrabold border transition cursor-pointer ${
                      targetZone === z.id
                        ? "bg-emerald-400 text-slate-950 border-emerald-400 shadow-md"
                        : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Skin Type */}
            <div className="mb-5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-2">
                2. ¿Cómo reacciona tu piel al alcohol o lociones?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "sensible", label: "Sensible / Se irrita" },
                    { id: "seca", label: "Seca / Descama" },
                    { id: "normal", label: "Normal / Mixta" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSkinType(s.id)}
                    className={`rounded-xl py-2.5 px-2 text-[11px] font-bold border transition cursor-pointer ${
                      skinType === s.id
                        ? "bg-emerald-400 text-slate-950 border-emerald-400 shadow-md"
                        : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Duration */}
            <div className="mb-6">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-2">
                3. Meta de Tratamiento Continuo:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([3, 6, 12] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonthsDuration(m)}
                    className={`rounded-xl py-2 px-2 text-xs font-extrabold border transition cursor-pointer ${
                      monthsDuration === m
                        ? "bg-amber-400 text-slate-950 border-amber-400"
                        : "bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {m} Meses {m === 6 ? "(Ideal)" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Card */}
            <div className="rounded-2xl bg-slate-950/90 border border-emerald-500/40 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Diagnóstico & Recomendación #1
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-black text-emerald-300">
                  🇵🇪 Compatible 100%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {getCustomDiagnosticText()}
              </p>
              <div className="rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3 mb-4 text-xs text-emerald-200 flex items-center justify-between">
                <span>Unidades recomendadas ({monthsDuration} meses):</span>
                <strong className="text-white text-sm">
                  {monthsDuration === 3
                    ? "2 a 3 tubos (60 g c/u)"
                    : monthsDuration === 6
                    ? "4 a 6 tubos (Pack Ahorro)"
                    : "8 a 10 tubos (Ciclo Completo)"}
                </strong>
              </div>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-amber-400 py-3.5 text-center text-xs sm:text-sm font-black text-slate-950 shadow-lg transition hover:bg-amber-300"
              >
                🥇 Pedir You Minox Original en YouMinox.com ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
