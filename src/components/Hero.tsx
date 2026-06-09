import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/cb3dac93-2689-4952-9752-dd9695895a03/files/b2884b72-cfce-4fca-9568-cc15cf18d617.jpg"
          alt="Студия звукозаписи"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-xs uppercase tracking-[0.4em] mb-6 text-neutral-300">Профессиональный диктор</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
          ГОЛОС,<br />КОТОРЫЙ<br />ПРОДАЁТ
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto opacity-80 font-light">
          Реклама, озвучка, корпоративные ролики — доверьте звук профессионалу
        </p>
        <a
          href="#contact"
          className="inline-block mt-10 border border-white text-white uppercase text-sm tracking-widest px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
        >
          Заказать озвучку
        </a>
      </div>
    </div>
  );
}
