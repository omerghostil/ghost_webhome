"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MessageCircle,
  BrainCircuit,
  Check,
  Users,
} from "lucide-react";
import { EvolutionTimeline } from "@/components/evolution-timeline";
import { GhostTimeline } from "@/components/ghost-timeline";
import { GhostOnboardingDemo } from "@/components/ghost-onboarding-demo";
import { GhostTypingText } from "@/components/ghost-typing-text";
import { useTranslation } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const TEAM_IMAGES = [
  { image: "/eivgeni_portrait.jpeg", imagePosition: "center 45%", ghostTyping: true },
  { image: "/omer_portrait.png", imagePosition: "center 22%", ghostTyping: true },
];

export default function AboutPage() {
  const { t, tArray } = useTranslation();

  const teamMembers = tArray<{ name: string; role: string; bio: string }>("home.teamMembers");
  const aiCapabilities = tArray<string>("home.aiCapabilities");
  const advisors = tArray<string>("home.advisors");

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 lg:pt-36 lg:pb-32 text-center">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-700 rounded-full px-4 py-1.5 mb-10">
              <span>{t("about.hero.badge")}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              {t("about.hero.title")}
              <br />
              {t("about.hero.titleLine2")}
            </h1>
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              {t("about.hero.description")}
            </p>
          </div>
        </section>

        {/* ── ADVISORS ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                {t("home.sections.advisors.badge")}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                {t("home.sections.advisors.title")}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                {t("home.sections.advisors.description")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {advisors.map((advisor, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full px-4 py-2">
                  <Check className="w-3.5 h-3.5 text-neutral-400" />
                  {advisor}
                </div>
              ))}
            </div>

            <p className="text-center text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              {t("home.sections.advisors.footer")}
            </p>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                  {t("about.story.badge")}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                  {t("about.story.title")}
                  <br />
                  {t("about.story.titleLine2")}
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-neutral-500 leading-relaxed">
                  {t("about.story.paragraph1")}
                </p>
                <p className="text-neutral-500 leading-relaxed">
                  {t("about.story.paragraph2")}
                </p>
              </div>
            </div>
            <EvolutionTimeline />

            {/* Quote */}
            <div className="mt-20 border-t border-neutral-100 pt-12 text-center">
              <blockquote className="text-xl lg:text-2xl font-bold text-neutral-950 max-w-3xl mx-auto leading-relaxed">
                &ldquo;{t("about.story.quote")}&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── VISION ── */}
        <section className="bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                <span>{t("about.vision.badge")}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                {t("about.vision.title")}
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                {t("about.vision.description")}
              </p>
            </div>

            {/* How */}
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                {t("about.vision.howLabel")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-0">
              {/* Chat Interface */}
              <div className="border border-neutral-200 rounded-2xl p-8 bg-white">
                <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-6">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t("about.vision.chatTitle")}</h3>
                <p className="text-neutral-500 leading-relaxed mb-4">
                  {t("about.vision.chatDesc")}
                </p>
                <p className="font-bold text-neutral-950">
                  {t("about.vision.chatBold")}
                </p>
              </div>

              {/* AI Agent */}
              <div className="border border-neutral-200 rounded-2xl p-8 bg-white">
                <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t("about.vision.aiTitle")}</h3>
                <p className="text-neutral-500 leading-relaxed mb-4">
                  {t("about.vision.aiDesc")}
                </p>
                <p className="font-bold text-neutral-950">
                  {t("about.vision.aiBold")}
                </p>
              </div>
            </div>

            <GhostTimeline />

            <GhostOnboardingDemo />
          </div>
        </section>

        {/* ── PRODUCT ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold border border-neutral-700 rounded-full px-3 py-1 mb-6">
                {t("home.sections.product.badge")}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                {t("home.sections.product.title")}
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-12">
                {t("home.sections.product.description")}
              </p>

              <div className="text-right max-w-lg mx-auto mb-12">
                <p className="text-sm font-bold text-neutral-300 mb-4">{t("home.sections.product.aiCapabilitiesLabel")}</p>
                <div className="space-y-3">
                  {aiCapabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-400">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-neutral-400 leading-relaxed mb-2">
                {t("home.sections.product.naturalLanguage")}
              </p>
              <p className="text-white font-bold text-lg">
                {t("home.sections.product.result")}
              </p>
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                <Users className="w-3 h-3" />
                <span>{t("home.sections.team.badge")}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {t("home.sections.team.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {teamMembers.map((member, i) => {
                const images = TEAM_IMAGES[i];
                return (
                  <div key={i} className="group border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                    {images?.image ? (
                      <div className="aspect-[4/5] relative bg-neutral-200 overflow-hidden">
                        <Image
                          src={images.image}
                          alt={member.name}
                          fill
                          style={{ objectPosition: images.imagePosition ?? "center" }}
                          className="object-cover grayscale scale-100 brightness-[0.75] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/5] bg-neutral-200" />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-neutral-400 font-bold mb-3">{member.role}</p>
                      {images?.ghostTyping ? (
                        <GhostTypingText
                          text={member.bio}
                          className="text-sm text-neutral-500 leading-relaxed"
                          charDelay={40}
                        />
                      ) : (
                        <p className="text-sm text-neutral-500 leading-relaxed">{member.bio}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t("about.cta.title")}
            </h2>
            <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
                  {t("about.cta.demoButton")}
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm">
                  {t("about.cta.joinButton")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
