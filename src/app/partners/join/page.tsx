"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Phone,
  GraduationCap,
  BadgeCheck,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Megaphone,
  Handshake,
  Building2,
  Wrench,
  Globe,
  ChevronLeft,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const PARTNER_TYPE_ICONS = [Handshake, Globe];
const PROCESS_STEP_ICONS = [Phone, Building2, GraduationCap, TrendingUp];
const SUPPORT_ICONS = [GraduationCap, Megaphone, BarChart3, ShieldCheck];

export default function PartnersJoinPage() {
  const { t, tArray } = useTranslation();

  const partnerTypes = tArray<{ title: string; description: string; benefits: string[] }>("partners.join.partnerTypes.types");
  const processSteps = tArray<{ step: string; title: string; description: string }>("partners.join.process.steps");
  const supportItems = tArray<{ title: string; description: string }>("partners.join.support.items");
  const portalFeatures = tArray<string>("partners.join.portal.features");
  const differenceCards = tArray<{ title: string; description: string }>("partners.join.difference.cards");

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <Navbar variant="partners" />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          <div className="dot-grid-dark absolute inset-0 opacity-30 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-20 lg:pt-28 lg:pb-24 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1 mb-6">
                {t("partners.join.hero.badge")}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                {t("partners.join.hero.title")}
                <br />
                <span className="text-neutral-500">{t("partners.join.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mb-8">
                {t("partners.join.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#process">
                  <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-12 px-7 text-sm font-bold">
                    {t("partners.join.hero.howToJoin")}
                    <ArrowLeft className="mr-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ghost section */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("partners.join.whyGhost.badge")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                {t("partners.join.whyGhost.title")}
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                {t("partners.join.whyGhost.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Wrench className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">{t("partners.join.whyGhost.installers.title")}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {t("partners.join.whyGhost.installers.description")}
                </p>
              </div>
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">{t("partners.join.whyGhost.companies.title")}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {t("partners.join.whyGhost.companies.description")}
                </p>
              </div>
              <div className="border border-neutral-200 rounded-2xl p-7 bg-white">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">{t("partners.join.whyGhost.sales.title")}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {t("partners.join.whyGhost.sales.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free version strategy */}
        <section className="bg-neutral-50/50 border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("partners.join.strategy.badge")}</span>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-3 mb-5">
                {t("partners.join.strategy.title")}
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                {t("partners.join.strategy.description")}
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">80₪</p>
                  <p className="text-xs text-neutral-500">{t("partners.join.strategy.priceLabel")}</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">20%</p>
                  <p className="text-xs text-neutral-500">{t("partners.join.strategy.commissionLabel")}</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold mb-1">∞</p>
                  <p className="text-xs text-neutral-500">{t("partners.join.strategy.passiveLabel")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("partners.join.partnerTypes.badge")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                {t("partners.join.partnerTypes.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {partnerTypes.map((type, i) => {
                const Icon = PARTNER_TYPE_ICONS[i];
                return (
                  <div key={i} className="border border-neutral-200 rounded-2xl p-7 bg-white hover:border-neutral-300 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <h3 className="font-bold">{type.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-5">{type.description}</p>
                    <div className="space-y-2.5">
                      {type.benefits.map((benefit, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <ChevronLeft className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-neutral-600 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{t("partners.join.process.badge")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                {t("partners.join.process.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((pStep, i) => {
                const Icon = PROCESS_STEP_ICONS[i];
                return (
                  <div key={i} className="relative">
                    <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/50 hover:border-neutral-700 transition-colors h-full">
                      <span className="text-[10px] text-neutral-600 font-mono font-bold">{pStep.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center my-4">
                        {Icon && <Icon className="w-5 h-5 text-neutral-300" />}
                      </div>
                      <h3 className="font-bold text-sm mb-2">{pStep.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{pStep.description}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-px bg-neutral-800" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ongoing support */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("partners.join.support.badge")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3">
                {t("partners.join.support.title")}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {supportItems.map((item, i) => {
                const Icon = SUPPORT_ICONS[i];
                return (
                  <div key={i} className="border border-neutral-200 rounded-2xl p-6 bg-white">
                    {Icon && <Icon className="w-5 h-5 text-neutral-400 mb-4" />}
                    <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[11px] text-neutral-400 mt-6">
              {t("partners.join.support.disclaimer")}
            </p>
          </div>
        </section>

        {/* Portal features */}
        <section className="bg-neutral-50/50 border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("partners.join.portal.badge")}</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                  {t("partners.join.portal.title")}
                  <br />
                  <span className="text-neutral-400">{t("partners.join.portal.titleHighlight")}</span>
                </h2>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  {t("partners.join.portal.description")}
                </p>
                <div className="space-y-3">
                  {portalFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-200 rounded-2xl bg-white p-8 min-h-[320px] flex items-center justify-center">
                <div className="text-center text-neutral-400">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-neutral-300" />
                  </div>
                  <p className="text-sm font-bold text-neutral-500 mb-1">{t("partners.join.portal.imagePlaceholder")}</p>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                    {t("partners.join.portal.imageDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ghost difference */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{t("partners.join.difference.badge")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-8">
                {t("partners.join.difference.title")}
                <br />
                <span className="text-neutral-500">{t("partners.join.difference.titleHighlight")}</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-right max-w-2xl mx-auto mb-10">
                {differenceCards.map((card, i) => (
                  <div key={i} className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/50">
                    <p className="font-bold text-sm mb-2">{card.title}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border border-neutral-800 rounded-2xl p-8 bg-neutral-900/30 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="border border-neutral-200 rounded-xl overflow-hidden">
                    <Image
                      src="/blackicon_whitebg.png"
                      alt="Ghost"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <p className="text-lg font-bold mb-3">
                  &ldquo;{t("partners.join.difference.quote")}
                  <br />
                  <span className="text-neutral-500">{t("partners.join.difference.quoteHighlight")}&rdquo;</span>
                </p>
                <p className="text-xs text-neutral-600">
                  {t("partners.join.difference.quoteDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t("partners.join.cta.title")}
              <br />
              <span className="text-neutral-400">{t("partners.join.cta.titleHighlight")}</span>
            </h2>
            <p className="text-neutral-500 text-lg mt-6 mb-10 max-w-xl mx-auto leading-relaxed">
              {t("partners.join.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:partners@ghost-ai.com">
                <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-13 px-8 text-sm font-bold">
                  {t("partners.join.cta.contactButton")}
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
