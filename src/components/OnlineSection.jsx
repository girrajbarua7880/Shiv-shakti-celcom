import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { services, shop } from "../data";

export default function OnlineSection() {
  const onlineServices = services
    .filter((service) => service.category !== "Repairing")
    .slice(0, 8);

  const whatsappMessage = `Hello ${shop.name}, I need help with an online service.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="online"
      className="scroll-mt-20 overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-[0.16em] text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              ONLINE DESK • VIKASH
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
              CSC, MP Online & digital services.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Get help with online applications, Aadhaar-related services,
              government forms, document uploads, banking assistance and other
              digital work.
            </p>

            {/* Service List */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {onlineServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-blue-400/30 hover:bg-white/[0.07]"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />

                  <span className="text-sm font-semibold text-slate-200">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>
                Assistance available for eligible documents and services.
              </span>
            </div>
          </div>

          {/* CTA Panel */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                <FileText size={27} />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-blue-300">
                ONLINE ASSISTANCE
              </p>

              <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                Need help with an online service?
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Share your requirement with Vikash and get guidance for the
                service you need.
              </p>

              {/* CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-500"
              >
                <MessageCircle size={18} />
                Talk to Vikash on WhatsApp
                <ArrowRight size={17} />
              </a>

              <p className="mt-4 text-center text-xs text-slate-500">
                Quick enquiry • Easy communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
