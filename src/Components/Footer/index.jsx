import { Link } from "react-router-dom";
import { Mail, Heart, Sparkles, ArrowUpLeft } from "lucide-react";
import { FaInstagram, FaTelegram } from "react-icons/fa";

const footerLinks = [
  { label: "خانه", to: "/" },
  { label: "محصولات", to: "/products" },
  { label: "برندها", to: "/brands" },
  { label: "سبد خرید", to: "/cart" },
  { label: "حساب کاربری", to: "/profile" },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="border-t border-pink-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-rose-100 to-slate-200 text-rose-500">
                <Sparkles size={22} strokeWidth={1.7} />
              </span>

              <span>
                <span className="block text-xl font-semibold tracking-[0.12em] text-slate-700">
                  SILVER
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-rose-400">
                  BEAUTY & CARE
                </span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-8 text-slate-500">
              دنیایی از زیبایی و مراقبت، با انتخابی خاص برای پوست و موی تو.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400"
              >
                <FaTelegram size={18} />
              </a>
              <a
                href="mailto:hello@silver.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-slate-800">
              دسترسی سریع
            </h3>

            <ul className="space-y-4">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-rose-400"
                  >
                    <ArrowUpLeft size={14} className="text-rose-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-slate-800">
              حساب کاربری
            </h3>

            <ul className="space-y-4">
              {footerLinks.slice(3).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-rose-400"
                  >
                    <ArrowUpLeft size={14} className="text-rose-300" />
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-rose-400"
                >
                  <ArrowUpLeft size={14} className="text-rose-300" />
                  ورود و ثبت‌نام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-slate-800">
              همراه SILVER
            </h3>

            <p className="mb-5 text-sm leading-7 text-slate-500">
              زیبایی از مراقبت شروع می‌شه. محصولات موردعلاقه‌ات رو پیدا کن و
              روتین خودت رو بساز.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-rose-400 to-pink-300 px-5 py-3 text-sm font-medium text-white shadow-sm shadow-pink-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              مشاهده محصولات
              <Heart size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-pink-100 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-right">
            <p className="text-xs leading-6 text-slate-400">
              © {new Date().getFullYear()} SILVER Beauty & Care. تمام حقوق محفوظ
              است.
            </p>

            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              ساخته‌شده برای زیبایی تو
              <Heart size={13} className="fill-rose-300 text-rose-300" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
