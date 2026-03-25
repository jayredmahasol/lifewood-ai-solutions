import React, { useEffect, useRef } from 'react';
import { Globe, MapPin, Languages, Users } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

const statsData = [
  {
    id: 1,
    value: 40,
    suffix: "+",
    label: "Global Delivery Centers",
    content: "Lifewood operates 40+ secure delivery centers worldwide, providing the backbone for AI data operations. These hubs ensure sensitive data is processed in controlled environments, with industrialized workflows and strict compliance standards across all regions.",
    accent: "bg-[#046241]/10 text-[#046241]",
    icon: MapPin
  },
  {
    id: 2,
    value: 30,
    suffix: "+",
    label: "Countries Across All Continents",
    content: "Our presence spans across 30+ countries, ensuring we have the cultural nuance and local expertise required for global AI deployment.",
    accent: "bg-[#FFB347]/20 text-[#133020]",
    icon: Globe
  },
  {
    id: 3,
    value: 50,
    suffix: "+",
    label: "Language Capabilities and Dialects",
    content: "We support over 50 languages and numerous dialects, enabling truly global and inclusive AI models.",
    accent: "bg-[#046241]/10 text-[#046241]",
    icon: Languages
  },
  {
    id: 4,
    value: 56000,
    suffix: "+",
    label: "Global Online Resources",
    content: "A massive network of over 56,000 skilled resources ready to scale your data operations at speed.",
    accent: "bg-[#133020]/5 text-[#133020]",
    icon: Users
  }
];

const CountUp: React.FC<{ to: number; duration?: number; className?: string }> = ({ to, duration = 2, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [to, duration, inView]);

  return <span ref={nodeRef} className={className}>0</span>;
};

export const Stats: React.FC = () => {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-[#f9f7f1] via-white to-[#f9f7f1] overflow-hidden">
      <div className="max-w-7xl mx-auto item-center relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#133020]/10 text-[#133020] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#133020]">Global Scale & Reach</h2>
          <p className="text-[#133020]/60 mt-4 max-w-2xl text-base md:text-lg">
            A light, modern snapshot of Lifewoods operational footprint and capability breadth worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.15 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-white border border-[#133020]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1 text-[#133020]">
                      <span className="text-4xl font-bold tracking-tight">
                        <CountUp to={stat.value} duration={2.2} />
                      </span>
                      <span className="text-2xl font-bold">{stat.suffix}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#133020] mb-3">{stat.label}</h3>
                <p className="text-sm text-[#133020]/60 leading-relaxed">{stat.content}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
