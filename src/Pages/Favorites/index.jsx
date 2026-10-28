import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => String(item.id) !== String(id));

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#faf7f9] px-4 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-2xl bg-rose-100 p-3 text-rose-400">
            <Heart size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              علاقه‌مندی‌های من
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {favorites.length} محصول مورد علاقه
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-sm">
            <Heart size={55} strokeWidth={1.2} className="mb-5 text-rose-300" />

            <h2 className="text-xl font-semibold text-slate-700">
              هنوز محصولی اضافه نکردی!
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              محصولات مورد علاقه‌ات رو اینجا نگه دار.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 rounded-full bg-rose-400 px-7 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-square bg-[#faf5f7]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-4"
                  />

                  <button
                    onClick={() => removeFavorite(product.id)}
                    aria-label="حذف از علاقه‌مندی‌ها"
                    className="absolute left-3 top-3 rounded-full bg-white p-2 text-rose-400 shadow-sm transition hover:bg-rose-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-700">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-sm font-bold text-rose-400">
                    {Number(product.price || 0).toLocaleString("fa-IR")} تومان
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/product-details/${product.id}/${encodeURIComponent(product.title)}`,
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-3 text-xs font-medium text-rose-500 transition hover:bg-rose-100"
                  >
                    <ShoppingBag size={16} />
                    مشاهده محصول
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
