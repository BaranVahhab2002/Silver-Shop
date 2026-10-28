import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Sparkles } from "lucide-react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getBrands() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/brands?populate=*&pagination[pageSize]=100`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`دریافت برندها ناموفق بود (${res.status})`);
        }

        const result = await res.json();

        if (!controller.signal.aborted) {
          setBrands(result.data || []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setBrands([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getBrands();

    return () => controller.abort();
  }, []);

  const filteredBrands = brands.filter((item) => {
    const brand = item.attributes || item;
    const name = brand.name || brand.title || "";

    return name.toLowerCase().includes(search.trim().toLowerCase());
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfbfc]">
      <section className="bg-gradient-to-l from-[#fce7ef] via-[#fff5f8] to-[#f2f3f6] px-5 py-14 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-rose-400">
          SILVER BRANDS
        </p>

        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          برندهای SILVER
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-slate-500">
          مجموعه‌ای از برندهای زیبایی و مراقبت پوست و مو
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={19}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جست‌وجوی برند..."
              className="w-full rounded-xl border border-slate-200 bg-[#fdfbfc] py-3 pl-4 pr-11 text-sm outline-none focus:border-rose-300"
            />
          </div>

          <p className="text-sm text-slate-500">
            {filteredBrands.length.toLocaleString("fa-IR")} برند
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-rose-100 bg-white p-5"
              >
                <div className="mb-5 aspect-square rounded-xl bg-rose-50" />
                <div className="mx-auto h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : filteredBrands.length === 0 && !error ? (
          <div className="rounded-2xl border border-rose-100 bg-white p-12 text-center">
            <Sparkles size={35} className="mx-auto mb-4 text-rose-300" />
            <p className="text-sm text-slate-500">برندی پیدا نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredBrands.map((item) => {
              const brand = item.attributes || item;
              const id = item.documentId || item.id;
              const name = brand.name || brand.title || "برند";

              const logo =
                brand.logo?.data?.attributes?.url ||
                brand.logo?.data?.url ||
                brand.logo?.url ||
                brand.logo?.[0]?.url ||
                brand.image?.data?.attributes?.url ||
                brand.image?.data?.url ||
                brand.image?.url;

              const imageSrc = logo
                ? logo.startsWith("http")
                  ? logo
                  : `${import.meta.env.VITE_STRAPI_URL}${logo}`
                : null;

              const description =
                typeof brand.description === "string" ? brand.description : "";

              return (
                <div
                  key={id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/50 sm:p-5"
                >
                  <div className="mb-5 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff1f5] to-[#f5f4f6] p-5">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Sparkles size={42} className="text-rose-200" />
                    )}
                  </div>

                  <h2 className="mb-2 text-center text-base font-semibold text-slate-800">
                    {name}
                  </h2>

                  <p className="mb-5 line-clamp-2 min-h-10 text-center text-xs leading-5 text-slate-400">
                    {description || "محصولات زیبایی و مراقبتی"}
                  </p>

                  <Link
                    to={`/brands/${encodeURIComponent(id)}/products`}
                    className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-3 text-xs font-medium text-rose-500 transition hover:bg-rose-400 hover:text-white"
                  >
                    مشاهده محصولات برند
                    <ArrowLeft size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
