'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Card from '@/components/Card';
import { CARDS_DATA } from '@/lib';

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScrollProgress = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(heroScrollProgress.scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroScrollProgress.scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <p className="text-white/80 text-xl md:text-2xl font-light animate-pulse">
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      <main ref={containerRef} className="relative mt-[50vh]">
        {CARDS_DATA.map((project, i) => {
          const targetScale = 1 - (CARDS_DATA.length - i) * 0.05;

          return (
            <Card
              key={`card_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </>
  );
}
