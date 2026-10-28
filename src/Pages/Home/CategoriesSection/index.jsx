
import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import CategoriesImg from "../../../../../../myShop/assests/images/catsection.jfif";
const categories = [
  {
    title: "مراقبت پوست",
    subtitle: "SKINCARE",
    image: CategoriesImg,
    link: "/products",
  },
  {
    title: "مراقبت مو",
    subtitle: "HAIRCARE",
    image: CategoriesImg,
    link: "/products",
  },
  {
    title: "لوازم آرایشی",
    subtitle: "MAKEUP",
    image: CategoriesImg,
    link: "/products",
  },
  {
    title: "عطر و رایحه",
    subtitle: "FRAGRANCE",
    image: CategoriesImg,
    link: "/products",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="mb-9 text-center">
        <p className="mb-2 text-xs tracking-[0.2em] text-rose-400">
          SHOP BY CATEGORY
        </p>
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          دسته‌بندی محصولات
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          هر چیزی که برای زیبایی و مراقبت نیاز داری
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.link}
            className="group relative overflow-hidden rounded-2xl bg-rose-50 sm:rounded-3xl"
          >
            <img
              src={category.image}
              alt={category.title}
              className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 right-0 left-0 p-4 text-white sm:p-6">
              <p className="text-[10px] tracking-widest text-white/70">
                {category.subtitle}
              </p>

              <div className="mt-1 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold sm:text-lg">
                  {category.title}
                </h3>
                <ArrowUpLeft size={19} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
