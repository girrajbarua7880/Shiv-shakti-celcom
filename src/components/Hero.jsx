import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import { shop, team } from "../data";

export default function Hero() {
  const whatsappMessage = `Hello ${shop.name}, I need service.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-slate-300 sm:text-xs">
            <CheckCircle2
              size={14}
              className="shrink-0 text-emerald-400"
            />
            LOCAL • RELIABLE • DOCUMENT-FIRST
          </div>

          {/* Heading */}
          <h1 className="mt-5 max-w-3xl text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Mobile care.
            <br />
            <span className="text-blue-400">Digital help.</span>
            <br />
            All in one place.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7 lg:text-lg">
            {shop.shortTagline}. Repair your phone, explore everyday
            accessories, or get help with online digital services.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
            >
              Explore Shop
              <ArrowRight size={17} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>

          {/* Trust */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-slate-400 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <Star
                size={15}
                fill="currentColor"
                className="text-amber-400"
              />
              <strong className="text-white">
                {shop.rating}/5
              </strong>
              Rating
            </span>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <span className="inline-flex items-center gap-2">
              <Clock3
                size={15}
                className="text-blue-400"
              />
              {shop.hours}
            </span>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-3xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-md sm:p-7">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-black tracking-[0.18em] text-blue-300">
                  SHIV SHAKTI
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Mobile & Digital Desk
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                <Smartphone size={23} />
              </div>
            </div>

            {/* Title */}
            <div className="py-6 sm:py-7">
              <p className="text-sm font-semibold text-slate-400">
                Your local
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                mobile desk.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Repairing, accessories and online assistance from one
                convenient place.
              </p>
            </div>

            {/* Team */}
            <div className="grid grid-cols-2 gap-3">
              {team.map((member) => {
                const TeamIcon = member.icon;

                return (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition hover:bg-white/[0.08] sm:p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-blue-300">
                      <TeamIcon size={18} />
                    </div>

                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {member.role}
                    </p>

                    <p className="mt-1 truncate text-sm font-black text-white">
                      {member.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5">
                <ShieldCheck
                  size={16}
                  className="shrink-0 text-emerald-400"
                />

                <span className="text-xs font-semibold text-slate-300">
                  Reliable
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-3 py-2.5">
                <Users
                  size={16}
                  className="shrink-0 text-blue-400"
                />

                <span className="text-xs font-semibold text-slate-300">
                  Local Support
                </span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-500"
            >
              <MessageCircle size={18} />
              Start on WhatsApp
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}