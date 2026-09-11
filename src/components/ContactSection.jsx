import { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Clock3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { services, shop } from "../data";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: services[0]?.name || "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const whatsappMessage = `Hello ${shop.name},

Name: ${form.name}
Mobile: ${form.phone}
Service: ${form.service}
Requirement: ${form.message || "Not specified"}

I would like to know more about this service.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.phone.replace(/\D/g, "").length < 10) {
      return;
    }

    setSent(true);
  };

  const resetForm = () => {
    setSent(false);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-[0.18em] text-blue-600">
              CONTACT US
            </span>

            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Need a repair or online service?
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Tell us what you need. Submit the form and continue the
              conversation directly on WhatsApp.
            </p>

            {/* Contact Details */}
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${shop.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={19} />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Call us
                  </span>
                  <span className="mt-1 block truncate font-bold text-slate-800">
                    {shop.phone}
                  </span>
                </span>

                <ArrowRight
                  size={18}
                  className="ml-auto text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />
              </a>

              <a
                href={`mailto:${shop.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={19} />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="mt-1 block truncate font-bold text-slate-800">
                    {shop.email}
                  </span>
                </span>

                <ArrowRight
                  size={18}
                  className="ml-auto text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={19} />
                </span>

                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Visit us
                  </span>
                  <span className="mt-1 block font-bold leading-6 text-slate-800">
                    {shop.address}
                  </span>
                </span>
              </div>
            </div>

            {/* Trust Points */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-white p-3">
                <ShieldCheck size={19} className="text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Reliable service
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-3">
                <Clock3 size={19} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  Quick response
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {sent ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={34} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-slate-900">
                  Request is ready
                </h3>

                <p className="mt-2 max-w-md leading-6 text-slate-600">
                  Your details have been prepared. Open WhatsApp to send your
                  request directly to {shop.name}.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-700 sm:w-auto"
                >
                  <MessageCircle size={18} />
                  Open WhatsApp
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                >
                  Edit request
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    SEND REQUEST
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-900">
                    How can we help?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in your details and we'll connect with you on
                    WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Your name
                      </label>

                      <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Mobile number
                      </label>

                      <input
                        required
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={(e) =>
                          updateForm(
                            "phone",
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Select service
                    </label>

                    <select
                      required
                      value={form.service}
                      onChange={(e) => updateForm("service", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Your requirement
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Tell us what you need..."
                      value={form.message}
                      onChange={(e) => updateForm("message", e.target.value)}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    <Send size={17} />
                    Prepare WhatsApp Request
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    Your information is only used to respond to your service
                    request.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}