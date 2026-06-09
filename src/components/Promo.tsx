import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const demos = [
  { label: "Реклама", duration: "0:30" },
  { label: "Корпоративный ролик", duration: "1:15" },
  { label: "Аудиокнига", duration: "2:00" },
];

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="/images/spiral-circles.jpg"
            alt="Звуковые волны"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      <h3 className="absolute top-12 left-6 text-white uppercase z-10 text-xs tracking-[0.3em] text-neutral-400">
        Демо-материалы
      </h3>

      <div className="absolute bottom-12 left-6 right-6 z-10 flex flex-col gap-4 max-w-2xl">
        <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light mb-6 leading-snug">
          Послушайте, как звучит профессиональная озвучка — выберите демо
        </p>
        {demos.map((demo, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border border-white/30 px-5 py-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <polygon points="3,1 13,7 3,13" />
              </svg>
            </div>
            <span className="text-white font-light flex-1">{demo.label}</span>
            <span className="text-neutral-400 text-sm">{demo.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
