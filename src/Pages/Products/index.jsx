import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../../Components";
import useFavorites from "../../Hooks/useFavorites";

export default function Products() {
  const { categoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const { isFavorite: isInFavorites, toggle: toggleFavorite } = useFavorites();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/categories?`,
        );

        if (!res.ok) {
          throw new Error("دسته‌بندی‌ها دریافت نشدند");
        }

        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setError("");
      setProducts([]);

      try {
        const url =
          selectedCategory === "all"
            ? `${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&pagination[pageSize]=100`
            : `${import.meta.env.VITE_STRAPI_URL}/api/categories/${selectedCategory}?populate[products][populate]=*`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`دریافت اطلاعات ناموفق بود (${res.status})`);
        }

        const result = await res.json();

        if (selectedCategory === "all") {
          setProducts(result.data || []);
        } else {
          const category = result.data?.attributes || result.data;
          setProducts(category?.products?.data || category?.products || []);
        }
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [selectedCategory]);

  const visibleProducts = products.filter((item) => {
    const product = item.attributes || item;
    const name = product.name || product.title || "";

    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfbfc]">
      <section className="bg-gradient-to-l from-[#fce7ef] via-[#fff5f8] to-[#f2f3f6] px-5 py-14 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-rose-400">
          SILVER COLLECTION
        </p>

        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          محصولات SILVER
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-slate-500">
          دنیایی از محصولات مراقبت پوست، مو و زیبایی برای درخشیدن هر روز تو
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 rounded-2xl border border-rose-100 bg-white p-4">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={19}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جست‌وجوی محصولات..."
              className="w-full rounded-xl border border-slate-200 bg-[#fdfbfc] py-3 pl-4 pr-11 text-sm outline-none focus:border-rose-300"
            />
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-rose-100 bg-white p-5">
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-slate-800">
              <SlidersHorizontal size={18} className="text-rose-400" />
              دسته‌بندی‌ها
            </h2>

            <div className="flex flex-wrap gap-2 md:flex-col">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-xl px-4 py-3 text-right text-sm transition ${
                  selectedCategory === "all"
                    ? "bg-rose-50 font-medium text-rose-500"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                همه محصولات
              </button>

              {categories.map((item) => {
                const category = item.attributes || item;
                const id = item.documentId || item.id;

                return (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(String(id))}
                    className={`rounded-xl px-4 py-3 text-right text-sm transition ${
                      String(selectedCategory) === String(id)
                        ? "bg-rose-50 font-medium text-rose-500"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {category.name || category.title}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6">
              <p className="text-sm text-slate-500">
                {visibleProducts.length.toLocaleString("fa-IR")} محصول
              </p>
            </div>

            {error && (
              <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {!error && visibleProducts.length === 0 ? (
              <div className="rounded-2xl border border-rose-100 bg-white p-12 text-center text-sm text-slate-500">
                محصولی پیدا نشد.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {visibleProducts.map((item) => (
                  <ProductCard
                    key={item.documentId || item.id}
                    id={item.documentId || item.id}
                    title={(item.attributes || item).name || "محصول"}
                    slug={item.slug}
                    price={item.price}
                    image={
                      (item.attributes || item).image?.url
                        ? `${import.meta.env.VITE_STRAPI_URL}${(item.attributes || item).image.url}`
                        : "/images/product-placeholder.jpg"
                    }
                    brandTitle={
                      (item.attributes || item).brand?.name ||
                      (item.attributes || item).brandTitle
                    }
                    discountPercent={item.discountPrice}
                    isFavorite={isInFavorites(item.documentId || item.id)}
                    onWishlist={() =>
                      toggleFavorite({
                        id: item.documentId || item.id,
                        title: item.name || "محصول",
                        price: item.price,
                        image: (item.attributes || item).image?.url
                          ? `${import.meta.env.VITE_STRAPI_URL}${(item.attributes || item).image.url}`
                          : "/images/product-placeholder.jpg",
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
