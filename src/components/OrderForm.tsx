import { useState } from "react";
import ScrollToTop from "@/components/ui/scroll-to-top";

const SEND_ORDER_URL = "https://functions.poehali.dev/f443d4cd-94cc-4423-a230-224569425659";

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", description: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-neutral-900 py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Заказать озвучку</p>
          <ScrollToTop dark />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
          Расскажите о проекте —<br />я выйду на связь
        </h2>

        {status === "success" ? (
          <div className="border border-white/20 bg-white/5 p-8 text-center">
            <p className="text-white text-xl font-light mb-2">Заявка отправлена!</p>
            <p className="text-neutral-400 text-sm">Я свяжусь с вами в течение 24 часов</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-neutral-400 hover:text-white text-sm transition-colors duration-300 uppercase tracking-widest"
            >
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
              className="bg-transparent border border-white/20 text-white placeholder-neutral-500 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors duration-300"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-transparent border border-white/20 text-white placeholder-neutral-500 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors duration-300"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Опишите проект: тип озвучки, хронометраж, тон голоса, сроки..."
              required
              rows={5}
              className="bg-transparent border border-white/20 text-white placeholder-neutral-500 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors duration-300 resize-none"
            />
            {status === "error" && (
              <p className="text-red-400 text-sm">Что-то пошло не так. Попробуйте ещё раз или напишите напрямую.</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 bg-white text-black uppercase text-sm tracking-widest px-8 py-4 hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Отправляю..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}