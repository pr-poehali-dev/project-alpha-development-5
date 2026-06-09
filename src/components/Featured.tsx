import ScrollToTop from "@/components/ui/scroll-to-top";

const steps = [
  {
    number: "01",
    title: "Заявка",
    desc: "Вы описываете задачу: тип контента, тон голоса, хронометраж и сроки.",
  },
  {
    number: "02",
    title: "Согласование",
    desc: "Обсуждаем детали, подписываем договор, вы присылаете текст.",
  },
  {
    number: "03",
    title: "Запись",
    desc: "Записываю голос в профессиональной студии с обработкой и сведением.",
  },
  {
    number: "04",
    title: "Готово",
    desc: "Получаете готовый файл в нужном формате. Правки — бесплатно.",
  },
];

const services = [
  "Реклама на радио и ТВ",
  "Корпоративные презентации",
  "Обучающие видеокурсы",
  "Озвучка роликов и подкастов",
  "IVR и автоответчики",
  "Аудиокниги и сторис",
];

export default function Featured() {
  return (
    <div id="about" className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-0">
        <h3 className="uppercase mb-4 text-xs tracking-[0.3em] text-neutral-500">Схема работы</h3>
        <h2 className="text-3xl lg:text-5xl mb-12 text-neutral-900 font-bold leading-tight">
          От заявки до<br />готового звука —<br />4 шага
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 items-start">
              <span className="text-3xl font-bold text-neutral-200 w-12 shrink-0">{step.number}</span>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">{step.title}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-6">
          <a
            href="#contact"
            className="bg-black text-white border border-black px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-widest"
          >
            Обсудить проект
          </a>
          <ScrollToTop />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center bg-neutral-950 px-8 py-16 lg:px-16 lg:py-0">
        <h3 className="uppercase mb-8 text-xs tracking-[0.3em] text-neutral-500">Что озвучиваю</h3>
        <div className="flex flex-col gap-0">
          {services.map((s, i) => (
            <div
              key={i}
              className="border-b border-neutral-800 py-5 text-white text-lg font-light hover:text-neutral-300 transition-colors duration-300"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}