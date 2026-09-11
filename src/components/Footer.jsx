import { MessageCircle, Phone } from "lucide-react";
import { shop } from "../data";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(
    `Hello ${shop.name}, I need assistance.`,
  )}`;

  const phoneNumber = shop.phone.split(",")[0].trim();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h3 className="text-lg font-bold">{shop.name}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {shop.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#shop" className="transition hover:text-white">
              Shop
            </a>
            <a href="#online" className="transition hover:text-white">
              Online
            </a>
            <a href="#reviews" className="transition hover:text-white">
              Reviews
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <div className="flex flex-col gap-2">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-800"
            >
              <Phone size={17} />
              {shop.phone}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-emerald-500"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-7 border-t border-slate-800 pt-5 text-center text-xs text-slate-500 md:flex md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {shop.name}. All rights reserved.
          </p>

          <p className="mt-2 text-[10px] tracking-wide text-slate-600 md:mt-0">
            Website created by Girraj Barua
          </p>
        </div>
      </div>
    </footer>
  );
}