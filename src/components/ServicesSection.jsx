import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import CategoryChips from "./CategoryChips";
import ServiceCard from "./ServiceCard";
import { services, serviceCategories } from "../data";

export default function ServicesSection() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [showMore, setShowMore] = useState(false);

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        cat === "All" || service.category === cat;

      const searchableText = `
        ${service.name}
        ${service.desc}
        ${service.managedBy}
        ${service.tags?.join(" ") || ""}
      `.toLowerCase();

      return (
        matchesCategory &&
        (!search || searchableText.includes(search))
      );
    });
  }, [cat, q]);

  const visibleServices = showMore
    ? filtered
    : filtered.slice(0, 7);

  const handleCategoryChange = (value) => {
    setCat(value);
    setShowMore(false);
  };

  const handleSearch = (value) => {
    setQ(value);
    setShowMore(false);
  };

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="SERVICES"
          title="Simple services. Clear process."
          description="Explore mobile repairing, online services and everyday digital assistance."
        />

        {/* Toolbar */}
        <div className="mt-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={q}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search a service..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {q && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="overflow-x-auto pb-1">
            <CategoryChips
              items={serviceCategories}
              value={cat}
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Services */}
        {visibleServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No services found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("All");
                setShowMore(false);
              }}
              className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* View More */}
        {filtered.length > 7 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              {showMore ? (
                <>
                  Show Less
                  <ChevronUp size={17} />
                </>
              ) : (
                <>
                  View More Services
                  <ChevronDown size={17} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Result Count */}
        {filtered.length > 0 && (
          <p className="mt-4 text-center text-xs text-slate-400">
            Showing {visibleServices.length} of {filtered.length} services
          </p>
        )}
      </div>
    </section>
  );
}