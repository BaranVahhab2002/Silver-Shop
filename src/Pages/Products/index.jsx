
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Heart,
} from "lucide-react";

export default function Products() {
  const { categoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryId || "all"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setSelectedCategory(categoryId || "all");
  }, [categoryId]);

  // Sync favorites
  useEffect(() => {
    const syncFavorites = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        setFavorites(Array.isArray(saved) ? saved : []);
      } catch {
        setFavorites([]);
      }
    };

    window.addEventListener("favoritesUpdated", syncFavorites);
    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        syncFavorites
      );
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

  const toggleFavorite = (product) => {
    const exists = favorites.some(
      (item) => String(item.id) === String(product.id)
    );

    const updated = exists
      ? favorites.filter(
          (item) => String(item.id) !== String(product.id)
        )
      : [...favorites, product];

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  // Fetch categories
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/categories?pagination[pageSize]=100`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("دسته‌بندی‌ها دریافت نشدند");
        }
        return res.json();
      })
      .then((data) => setCategories(data.data || []))
      .catch((err) => setError(err.message));
  }, []);

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const url =
          selectedCategory === "all"
            ? `${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&pagination[pageSize]=100`
            : `${import.meta.env.VITE_STRAPI_URL}/api/categories/${selectedCategory}?populate[products][populate]=*`;

        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            `دریافت اطلاعات ناموفق بود (${res.status})`
          );
        }

        const result = await res.json();

        if (controller.signal.aborted) return;

        if (selectedCategory === "all") {
          setProducts(result.data || []);
        } else {
          const category =
            result.data?.attributes || result.data;

          const categoryProducts =
            category?.products?.data ||
            category?.products ||
            [];

          setProducts(categoryProducts);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getProducts();

    return () => controller.abort();
  }, [selectedCategory]);

  // Search and sort
  const visibleProducts = [...products]
    .filter((item) => {
      const product = item.attributes || item;
      const name = product.name || product.title || "";

      return name
        .toLowerCase()
        .includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const first = a.attributes || a;
      const second = b.attributes || b;

      if (sort === "low") {
        return (
          Number(first.price || 0) -
          Number(second.price || 0)
        );
      }

      if (sort === "high") {
        return (
          Number(second.price || 0) -
          Number(first.price || 0)
        );
      }

      return 0;
    });

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fdfbfc]"
    >
      {/* Hero */}
      <section className="bg-gradient-to-l from-[#fce7ef] via-[#fff5f8] to-[#f2f3f6] px-5 py-14 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-rose-400">
          SILVER COLLECTION
        </p>

        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          محصولات SILVER
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-slate-500">
          دنیایی از محصولات مراقبت پوست، مو و زیبایی
          برای درخشیدن هر روز تو
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search and sorting */}
        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
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

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none"
          >
            <option value="">مرتب‌سازی پیش‌فرض</option>
            <option value="low">ارزان‌ترین</option>
            <option value="high">گران‌ترین</option>
          </select>
        </div>

        <div className="grid gap-7 md:grid-cols-[220px_minmax(0,1fr)]">
          {/* Categories */}
          <aside className="h-fit rounded-2xl border border-rose-100 bg-white p-5">
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-slate-800">
              <SlidersHorizontal
                size={18}
                className="text-rose-400"
              />
              دسته‌بندی‌ها
            </h2>

            <div className="flex flex-wrap gap-2 md:flex-col">
              <button
                onClick={() =>
                  setSelectedCategory("all")
                }
                className={`rounded-xl px-4 py-3 text-right text-sm transition ${
                  selectedCategory === "all"
                    ? "bg-rose-50 font-medium text-rose-500"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                همه محصولات
              </button>

              {categories.map((item) => {
                const category =
                  item.attributes || item;

                const id =
                  item.documentId || item.id;

                return (
                  <button
                    key={id}
                    onClick={() =>
                      setSelectedCategory(String(id))
                    }
                    className={`rounded-xl px-4 py-3 text-right text-sm transition ${
                      String(selectedCategory) ===
                      String(id)
                        ? "bg-rose-50 font-medium text-rose-500"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {category.name ||
                      category.title ||
                      "دسته‌بندی"}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Products */}
          <main className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                {loading
                  ? "در حال دریافت محصولات..."
                  : `${visibleProducts.length.toLocaleString(
                      "fa-IR"
                    )} محصول`}
              </p>
            </div>

            {error && (
              <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse overflow-hidden rounded-2xl border border-rose-100 bg-white"
                  >
                    <div className="aspect-square bg-rose-50" />

                    <div className="space-y-3 p-4">
                      <div className="h-4 w-2/3 rounded bg-slate-100" />
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                      <div className="h-10 rounded-xl bg-rose-50" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visibleProducts.length === 0 && !error ? (
              <div className="rounded-2xl border border-rose-100 bg-white p-12 text-center text-sm text-slate-500">
                محصولی پیدا نشد.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {visibleProducts.map((item) => {
                  const product =
                    item.attributes || item;

                  const id =
                    item.documentId || item.id;

                  const name =
                    product.name ||
                    product.title ||
                    "محصول";

                  const image = Array.isArray(
                    product.image
                  )
                    ? product.image[0]
                    : product.image;

                  const imageUrl =
                    image?.url ||
                    image?.data?.attributes?.url ||
                    image?.data?.url;

                  const src = imageUrl
                    ? imageUrl.startsWith("http")
                      ? imageUrl
                      : `${import.meta.env.VITE_STRAPI_URL}${imageUrl}`
                    : "/images/product-placeholder.jpg";

                  const href = `/product-details/${id}/${encodeURIComponent(
                    name
                  )}`;

                  const isFavorite = favorites.some(
                    (favorite) =>
                      String(favorite.id) === String(id)
                  );

                  return (
                    <div
                      key={id}
                      className="group min-w-0 overflow-hidden rounded-2xl border border-rose-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/50"
                    >
                      {/* Product image */}
                      <div className="relative overflow-hidden bg-[#faf3f6]">
                        <Link
                          to={href}
                          className="block"
                        >
                          <img
                            src={src}
                            alt={name}
                            loading="lazy"
                            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Favorite button */}
                        <button
                          type="button"
                          aria-label={
                            isFavorite
                              ? "حذف از علاقه‌مندی‌ها"
                              : "افزودن به علاقه‌مندی‌ها"
                          }
                          aria-pressed={isFavorite}
                          onClick={() =>
                            toggleFavorite({
                              id,
                              title: name,
                              price: product.price,
                              image: src,
                            })
                          }
                          className={`absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
                            isFavorite
                              ? "text-rose-500"
                              : "text-slate-400 hover:text-rose-400"
                          }`}
                        >
                          <Heart
                            size={19}
                            strokeWidth={1.8}
                            fill={
                              isFavorite
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      {/* Product information */}
                      <div className="space-y-3 p-3 sm:p-5">
                        <p className="text-xs text-rose-400">
                          SILVER BEAUTY
                        </p>

                        <Link to={href}>
                          <h3 className="line-clamp-2 min-h-11 text-sm font-medium leading-6 text-slate-700">
                            {name}
                          </h3>
                        </Link>

                        <p className="text-sm font-semibold text-slate-800">
                          {Number(
                            product.price || 0
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </p>

                        <Link
                          to={href}
                          className="flex items-center justify-center gap-2 rounded-xl bg-rose-400 px-2 py-3 text-xs text-white transition hover:bg-rose-500"
                        >
                          <ShoppingBag size={16} />
                          مشاهده محصول
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
