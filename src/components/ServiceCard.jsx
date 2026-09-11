import {
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { shop } from "../data";

export default function ServiceCard({ service }) {
  const whatsappMessage = `Hello ${shop.name}, I need help with ${service.name}.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const ServiceIcon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:rounded-3xl sm:p-5">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
          <ServiceIcon size={22} strokeWidth={2} />
        </div>

        {service.badge && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700 sm:text-xs">
            {service.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-5 flex flex-1 flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-xs">
          {service.category}
        </span>

        <h3 className="mt-1.5 text-base font-black leading-6 text-slate-900 sm:text-lg">
          {service.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {service.desc}
        </p>

        {/* Managed By */}
        {service.managedBy && (
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />

            <span>
              Managed by{" "}
              <span className="font-bold text-slate-700">
                {service.managedBy}
              </span>
            </span>
          </div>
        )}

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-600 sm:text-sm"
        >
          <MessageCircle size={15} />
          Enquire
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}