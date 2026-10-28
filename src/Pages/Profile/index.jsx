import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Package,
  Heart,
  LogOut,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  Pencil,
  Save,
  X,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Orders } from "../../Components";

const initialUser = {
  name: "کاربر سیلور",
  email: "user@example.com",
  phone: "09123456789",
  address: "مشهد، ایران",
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/orders?pagination[pageSize]=1`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setOrdersCount(data.meta?.pagination?.total ?? 0);
      } catch (error) {
        console.error("Error fetching orders count:", error);
      }
    };

    fetchOrdersCount();
  }, []);

  const tabs = [
    { id: "profile", label: "اطلاعات حساب", icon: UserRound },
    { id: "orders", label: "سفارش‌های من", icon: Package },
    { id: "favorites", label: "علاقه‌مندی‌ها", icon: Heart },
  ];

  const fields = [
    { key: "name", label: "نام و نام خانوادگی", icon: UserRound },
    { key: "email", label: "ایمیل", icon: Mail },
    { key: "phone", label: "شماره تماس", icon: Phone },
    { key: "address", label: "آدرس", icon: MapPin },
  ];

  const saveProfile = (e) => {
    e.preventDefault();
    setUser(form);
    setEditing(false);
  };

  const logout = () => {
    navigate("/auth");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fdfbfc] px-4 pb-20 pt-12 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="mb-2 text-xs tracking-[0.2em] text-rose-400">
            MY ACCOUNT
          </p>
          <h1 className="text-3xl font-bold text-slate-800">حساب کاربری من</h1>
          <p className="mt-2 text-sm text-slate-400">
            اطلاعات حساب و فعالیت‌های خود را مدیریت کنید.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-slate-100 p-7 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-rose-100 text-rose-400 shadow-sm">
                <UserRound size={35} strokeWidth={1.5} />
              </div>
              <h2 className="font-bold text-slate-800">{user.name}</h2>
              <p className="mt-1 text-xs text-slate-500">{user.email}</p>
            </div>

            <div className="space-y-1 p-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() =>
                    id === "favorites"
                      ? navigate("/favorites")
                      : setActiveTab(id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm transition ${
                    activeTab === id
                      ? "bg-rose-50 font-semibold text-rose-500"
                      : "text-slate-500 hover:bg-slate-50 hover:text-rose-400"
                  }`}
                >
                  <Icon size={19} />
                  {label}
                  <ChevronLeft size={16} className="mr-auto" />
                </button>
              ))}

              <div className="my-3 border-t border-rose-100" />

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-50"
              >
                <LogOut size={19} />
                خروج از حساب
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            {activeTab === "profile" && (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "سفارش‌های من",
                      value: ordersCount.toLocaleString("fa-IR"),
                      icon: ShoppingBag,
                    },
                    { label: "علاقه‌مندی‌ها", value: "مشاهده", icon: Heart },
                    { label: "وضعیت حساب", value: "فعال", icon: ShieldCheck },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-400">
                        <Icon size={20} />
                      </div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="mt-2 text-lg font-bold text-slate-700">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm sm:p-8">
                  <div className="mb-8 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        اطلاعات شخصی
                      </h2>
                      <p className="mt-2 text-xs text-slate-400">
                        اطلاعات حساب خود را مشاهده و ویرایش کنید.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditing(!editing);
                        setForm(user);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-500 hover:bg-rose-100"
                    >
                      {editing ? <X size={16} /> : <Pencil size={16} />}
                      {editing ? "انصراف" : "ویرایش"}
                    </button>
                  </div>

                  <form onSubmit={saveProfile}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {fields.map(({ key, label, icon: Icon }) => (
                        <div key={key}>
                          <label className="mb-2 block text-xs font-medium text-slate-500">
                            {label}
                          </label>
                          <div className="relative">
                            <Icon
                              size={18}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-300"
                            />
                            <input
                              type={key === "email" ? "email" : "text"}
                              value={editing ? form[key] : user[key]}
                              onChange={(e) =>
                                setForm({ ...form, [key]: e.target.value })
                              }
                              disabled={!editing}
                              className={`w-full rounded-xl border py-3.5 pl-4 pr-11 text-sm outline-none transition ${
                                editing
                                  ? "border-rose-200 bg-white focus:border-rose-400"
                                  : "border-slate-100 bg-[#faf8fa] text-slate-500"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {editing && (
                      <button
                        type="submit"
                        className="mt-7 flex items-center gap-2 rounded-xl bg-rose-400 px-7 py-3 text-sm text-white hover:bg-rose-500"
                      >
                        <Save size={17} />
                        ذخیره تغییرات
                      </button>
                    )}
                  </form>
                </div>
              </>
            )}

            {activeTab === "orders" && <Orders />}
          </div>
        </div>
      </div>
    </div>
  );
}
