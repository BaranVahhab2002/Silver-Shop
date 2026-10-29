import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Sparkles } from "lucide-react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/brands?populate=*&pagination[pageSize]=100`,
        );

        if (!res.ok) {
          throw new Error(`دریافت برندها ناموفق بود (${res.status})`);
        }

        const result = await res.json();
        setBrands(result.data || []);
      } catch (err) {
        setError(err.message);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredBrands = brands.filter((item) => {
    const brand = item.attributes || item;
    return (brand.name || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfbfc]">
      <div className="relative overflow-hidden bg-gradient-to-l from-rose-100 via-pink-50 to-white px-4 py-15 sm:py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-3 text-2xl font-extrabold text-gray-800 sm:text-4xl">
            برندهای سیلور شاپ
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-gray-500 md:text-xs">
            برندهای محبوبت رو پیدا کن و محصولات موردعلاقه‌ات رو کشف کن.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">همه برندها</h2>
            <p className="mt-2 text-sm text-gray-500">
              برند موردنظرت رو جستجو کن.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی برند..."
              className="w-full rounded-2xl border border-rose-100 bg-white py-3 pr-12 pl-4 text-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-3xl border border-rose-100 bg-white p-5"
              >
                <div className="mb-5 h-40 rounded-2xl bg-rose-50" />
                <div className="mb-3 h-5 w-2/3 rounded bg-rose-50" />
                <div className="h-4 w-full rounded bg-rose-50" />
              </div>
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-rose-200 bg-white px-4 py-16 text-center">
            <Sparkles size={40} className="mx-auto mb-4 text-rose-300" />
            <h3 className="mb-2 text-lg font-bold text-gray-700">
              برندی پیدا نشد
            </h3>
            <p className="text-sm text-gray-500">عبارت دیگری جستجو کن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBrands.map((item) => {
              const brand = item.attributes || item;
              const id = item.documentId || item.id;
              const name = brand.name || brand.title || "برند";

              const image =
                brand.logo?.data?.attributes?.url ||
                brand.logo?.data?.url ||
                brand.logo?.url ||
                brand.logo?.[0]?.url ||
                brand.image?.data?.attributes?.url ||
                brand.image?.data?.url ||
                brand.image?.url;

              const imageSrc = image
                ? image.startsWith("http")
                  ? image
                  : `${import.meta.env.VITE_STRAPI_URL}${image}`
                : null;

              return (
                <div
                  key={id}
                  className="group overflow-hidden rounded-3xl border border-rose-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/50"
                >
                  <div className="mb-5 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Sparkles size={42} className="text-rose-200" />
                    )}
                  </div>

                  <h2 className="mb-2 truncate text-lg font-bold text-gray-800">
                    {name}
                  </h2>

                  <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                    {typeof brand.description === "string"
                      ? brand.description
                      : "محصولات زیبایی و مراقبتی"}
                  </p>

                  <Link
                    to={`/brands/${encodeURIComponent(id)}/products`}
                    className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
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
