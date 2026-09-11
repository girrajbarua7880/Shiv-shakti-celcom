export default function CategoryChips({ items, value, onChange }) {
  return (
    <div
      className="flex w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
      role="tablist"
      aria-label="Categories"
    >
      {items.map((item) => {
        const active = value === item;

        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition duration-200 sm:text-sm ${
              active
                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}