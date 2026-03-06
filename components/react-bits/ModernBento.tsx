import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Zap, Activity, Target, ArrowUpRight, CheckCircle2, 
  TrendingUp, Calendar, Shield, Award, Star
} from 'lucide-react';

interface BentoItem {
  title: string;
  description: string;
  label: string;
  color?: string;
  icon?: any;
  value?: string;
  subtext?: string;
  colSpan?: number;
  rowSpan?: number;
}

interface BentoCardProps {
  item: BentoItem;
  index: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, index }) => {
  const Icon = item.icon || Star;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`
        relative overflow-hidden rounded-[2rem] p-6 flex flex-col justify-between group
        ${item.colSpan ? `md:col-span-${item.colSpan}` : ''}
        ${item.rowSpan ? `md:row-span-${item.rowSpan}` : ''}
        bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300
        hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1
      `}
      style={{
        background: item.color ? `linear-gradient(145deg, ${item.color}10, ${item.color}05)` : undefined,
        borderColor: item.color ? `${item.color}20` : undefined
      }}
    >
      {/* Decorative Background */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 blur-2xl" style={{ background: item.color || '#fff' }} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${item.color ? '' : 'bg-white/5'}`} style={{ backgroundColor: item.color ? `${item.color}20` : undefined }}>
          <Icon size={24} style={{ color: item.color }} />
        </div>
        {item.label && (
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2 py-1 rounded-full border border-current">
            {item.label}
          </span>
        )}
      </div>

      <div>
        {item.value && (
          <h3 className="text-3xl font-bold mb-1 tracking-tight">{item.value}</h3>
        )}
        <h4 className="text-lg font-bold mb-1 opacity-90">{item.title}</h4>
        <p className="text-sm opacity-50 leading-relaxed">{item.description}</p>
      </div>

      {/* Hover Action */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export const ModernBento = ({ items }: { items: BentoItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full p-1">
      {items.map((item, i) => (
        <BentoCard key={i} item={item} index={i} />
      ))}
    </div>
  );
};

export default ModernBento;
