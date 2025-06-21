import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';

const CardEvent = ({ data }) => {
  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {data.name}
          </h3>

          <div className="mt-3 space-y-1 text-gray-300/80 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{data.date}</span>
            </div>
            {data.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
