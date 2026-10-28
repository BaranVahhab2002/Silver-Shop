
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import HeroImage from "../../../../../../myShop/assests/images/herosection.jfif";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-[#fff0f5] via-[#fdfbfc] to-[#f2f3f6]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:px-12">
        <div className="order-2 space-y-6 text-center md:order-1 md:text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs text-rose-500">
            <Sparkles size={15} />
            SILVER BEAUTY & CARE
          </div>

          <h1 className="text-4xl font-bold leading-[1.6] text-slate-800 sm:text-5xl lg:text-6xl">
            زیبایی، از
            <span className="block text-rose-400">
              مراقبت شروع می‌شه
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-9 text-slate-500 md:mx-0 sm:text-base">
            با مجموعه‌ای از محصولات مراقبت پوست، مو و زیبایی،
            روتین مخصوص خودت رو بساز و هر روز بیشتر بدرخش.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-400 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              مشاهده محصولات
              <ArrowLeft size={17} />
            </Link>

            <Link
              to="/brands"
              className="rounded-xl border border-rose-200 bg-white px-6 py-3.5 text-sm text-slate-700 transition hover:bg-rose-50"
            >
              کشف برندها
            </Link>
          </div>
        </div>

        <div className="order-1 relative md:order-2">
          <div className="absolute -inset-5 rounded-full bg-rose-200/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#f9e8ee] shadow-xl shadow-rose-100/60">
            <img
              src={HeroImage}
              alt="SILVER beauty products"
              className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
            />
          </div>

          <div className="absolute -bottom-4 right-4 rounded-2xl border border-white bg-white/90 px-5 py-3 shadow-lg backdrop-blur">
            <p className="text-xs text-slate-400">YOUR DAILY</p>
            <p className="text-lg font-semibold tracking-widest text-rose-400">
              GLOW
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
