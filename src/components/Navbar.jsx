import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { shop } from "../data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["services", "Services"],
    ["shop", "Shop"],
    ["online", "Online"],
    ["reviews", "Reviews"],
    ["contact", "Contact"],
  ];

  const whatsappMessage = `Hello ${shop.name}, I need assistance.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="Shiv Shakti Cellcome"
            className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
          />

          <span className="min-w-0">
            <span className="block truncate text-sm font-black leading-tight text-slate-900 sm:text-base">
              Shiv Shakti{" "}
              <span className="text-blue-600">Cellcome</span>
            </span>

            <span className="hidden text-[10px] font-semibold tracking-wide text-slate-400 sm:block">
              Repair • Accessories • Online
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 lg:inline-flex"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {label}
              </a>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}