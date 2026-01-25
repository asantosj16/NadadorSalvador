import React from 'react';

interface WeatherDataCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
  loading?: boolean;
}

const WeatherDataCard: React.FC<WeatherDataCardProps> = ({
  label,
  value,
  icon,
  color,
  loading = false,
}) => {
  return (
    <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-inner">
      <div
        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg mb-2 shadow-lg`}
      >
        <span className="drop-shadow">{icon}</span>
      </div>
      <div className="text-[8px] font-black text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div
        className={`text-base font-black text-white tracking-tight ${
          loading ? 'animate-pulse' : ''
        }`}
      >
        {value}
      </div>
    </div>
  );
};

export default WeatherDataCard;
