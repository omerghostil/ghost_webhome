"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatMockup } from "@/components/chat-mockup";
import { SearchDemoSection } from "@/components/search-demo-section";
import { EvolutionTimeline } from "@/components/evolution-timeline";
import { GhostTimeline } from "@/components/ghost-timeline";
import { GhostOnboardingDemo } from "@/components/ghost-onboarding-demo";
import {
  MessageSquare,
  Radio,
  Bell,
  Calendar,
  ArrowLeft,
  Users,
  Smartphone,
  Mail,
  Phone,
  Volume2,
  Check,
} from "lucide-react";
import { GhostTypingText } from "@/components/ghost-typing-text";
import { useTranslation } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ALERT_CHANNEL_ICONS = [Smartphone, MessageSquare, Mail, Phone, Volume2];

const TEAM_IMAGES = [
  { image: "/eivgeni_portrait.jpeg", imagePosition: "center 45%", ghostTyping: true },
  { image: "/omer_portrait.png", imagePosition: "center 22%", ghostTyping: true },
];

export default function Home() {
  const { t, tArray } = useTranslation();

  const realtimeQueries = tArray<string>("home.realtimeQueries");
  const alertChannels = tArray<string>("home.alertChannels");
  const useCases = tArray<{ title: string; desc: string }>("home.useCases");
  const teamMembers = tArray<{ name: string; role: string; bio: string }>("home.teamMembers");
  const aiCapabilities = tArray<string>("home.aiCapabilities");
  const advisors = tArray<string>("home.advisors");

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-200">
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden">
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
            <div className="text-center mb-14">
              <div className="inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold border border-neutral-200 rounded-full px-3 py-1 mb-6">
                {t("home.hero.badge")}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                {t("home.hero.title")}
                <br />
                <span className="text-neutral-400">{t("home.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10">
                {t("home.hero.description")}
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/demo">
                  <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-12 px-7 text-sm font-bold">
                    {t("common.buttons.freeDemo")}
                    <ArrowLeft className="mr-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-12 px-7 text-sm">
                  {t("common.buttons.howItWorks")}
                </Button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <ChatMockup />
            </div>
          </div>
        </section>

        {/* ── ONBOARDING DEMO ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <GhostOnboardingDemo />
          </div>
        </section>

        {/* ── GHOST TIMELINE ── */}
        <section className="bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <GhostTimeline />
          </div>
        </section>

        {/* ── MESSAGE 2: History Search (Dark Animated) ── */}
        <SearchDemoSection />

        {/* ── MESSAGE 3: Real-time checks ── */}
        <section id="msg3" className="bg-neutral-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{t("home.sections.realtime.number")}</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                  {t("home.sections.realtime.title")}
                  <br />
                  <span className="text-neutral-500">{t("home.sections.realtime.titleHighlight")}</span>
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  {t("home.sections.realtime.description")}
                </p>
              </div>
              <div className="space-y-2.5">
                {realtimeQueries.map((q, i) => (
                  <div key={i} className="flex items-center gap-3 border border-neutral-700 rounded-xl px-4 py-3 bg-neutral-800/50 hover:border-neutral-600 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow flex-shrink-0" />
                    <p className="text-xs text-neutral-300">&ldquo;{q}&rdquo;</p>
                    <span className="text-[10px] text-neutral-600 mr-auto whitespace-nowrap">{t("home.sections.realtime.live")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MESSAGE 4: Tasks, Checks & Alerts ── */}
        <section id="msg4" className="border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-2xl mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{t("home.sections.tasks.number")}</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-3 mb-5">
                {t("home.sections.tasks.title")}
                <br />
                <span className="text-neutral-400">{t("home.sections.tasks.titleHighlight")}</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                {t("home.sections.tasks.description")}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Continuous monitoring */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Bell className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">{t("home.sections.tasks.continuousMonitoring")}</h3>
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed mb-4">
                  &ldquo;{t("home.sections.tasks.continuousMonitoringExample")}&rdquo;
                </div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2.5">{t("home.sections.tasks.alertChannelsLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  {alertChannels.map((name, i) => {
                    const Icon = ALERT_CHANNEL_ICONS[i];
                    return (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-1">
                        {Icon && <Icon className="w-3 h-3" />}
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled check */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Calendar className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">{t("home.sections.tasks.scheduledCheck")}</h3>
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed">
                  &ldquo;{t("home.sections.tasks.scheduledCheckExample")}&rdquo;
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-400">
                  <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">{t("home.sections.tasks.everyDay")}</div>
                  <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">{t("home.sections.tasks.time")}</div>
                  <div className="bg-neutral-100 rounded-md px-2 py-1">{t("home.sections.tasks.recurring")}</div>
                </div>
              </div>

              {/* Smart trigger */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <Radio className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
                <h3 className="font-bold text-sm mb-3">{t("home.sections.tasks.triggerCheck")}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">{t("home.sections.tasks.trigger")}</div>
                    <span className="text-xs text-neutral-500">{t("home.sections.tasks.triggerDesc")}</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200 mr-4" />
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">{t("home.sections.tasks.check")}</div>
                    <span className="text-xs text-neutral-500">{t("home.sections.tasks.checkDesc")}</span>
                  </div>
                  <div className="w-px h-3 bg-neutral-200 mr-4" />
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">{t("home.sections.tasks.action")}</div>
                    <span className="text-xs text-neutral-500">{t("home.sections.tasks.actionDesc")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES — Part 4: No fixed capability list ── */}
        <section className="border-t border-neutral-100 bg-neutral-50/50">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-4">{t("home.sections.useCases.badge")}</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t("home.sections.useCases.title")}</h2>
            <p className="text-neutral-500 leading-relaxed mb-10 max-w-2xl">
              {t("home.sections.useCases.description")}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {useCases.map((uc, i) => (
                <div key={i} className="border border-neutral-200 rounded-xl p-5 bg-white hover:border-neutral-300 transition-colors">
                  <h3 className="font-bold text-sm mb-1.5">{uc.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVOLUTION TIMELINE ── */}
        <section className="border-b border-neutral-100">
          <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <EvolutionTimeline />
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

        {/* ── CTA ── */}
        <section className="border-t border-neutral-200 bg-neutral-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t("home.sections.cta.title")}
              <br />
              {t("home.sections.cta.titleLine2")}
              <br />
              <span className="text-neutral-500">{t("home.sections.cta.titleHighlight")}</span>
            </h2>
            <p className="text-neutral-400 text-lg mt-6 mb-10 max-w-xl mx-auto">
              {t("home.sections.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full h-13 px-8 text-sm font-bold">
                  {t("common.buttons.freeDemo")}
                  <ArrowLeft className="mr-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:hello@ghost-ai.com">
                <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-full h-13 px-8 text-sm">
                  {t("common.buttons.contactUs")}
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
