
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import SpecialOfferImg from "../../../../../../myShop/assests/images/special offer.jfif";
export default function SpecialOffer() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-l from-[#f9dce6] to-[#f1eef3] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-5 p-7 sm:p-12">
          <div className="flex items-center gap-2 text-sm text-rose-500">
            <Sparkles size={17} />
            YOUR DAILY GLOW
          </div>

          <h2 className="text-3xl font-bold leading-relaxed text-slate-800 sm:text-4xl">
            یه حس تازه،
            <span className="block text-rose-500">
              برای زیبایی هر روزت
            </span>
          </h2>

          <p className="max-w-md text-sm leading-8 text-slate-600">
            محصولات موردعلاقه‌ات رو کشف کن و با انتخاب‌های جدید،
            روتین مراقبت و زیبایی خودت رو کامل‌تر کن.
          </p>

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
          >
            شروع خرید
            <ArrowLeft size={17} />
          </Link>
        </div>

        <img
          src={SpecialOfferImg}
          alt="SILVER beauty collection"
          loading="lazy"
          className="h-64 w-full object-cover md:h-full md:min-h-[360px]"
        />
      </div>
    </section>
  );
}
