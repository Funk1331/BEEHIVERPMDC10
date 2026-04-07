
import React, { memo } from 'react';
import { Offence, OffenceType } from '../types';

interface OffenceCardProps {
  offence: Offence;
  onAdd: (offence: Offence) => void;
}

const OffenceCard: React.FC<OffenceCardProps> = ({ offence, onAdd }) => {
  const isJail = offence.type === OffenceType.JAIL;

  return (
    <div 
      className={`bg-slate-900 border p-4 rounded-xl flex items-center justify-between transition-all group cursor-pointer ${
        isJail ? 'border-orange-900/40 hover:border-orange-500/50 hover:bg-orange-950/10' : 'border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50'
      }`}
      onClick={() => onAdd(offence)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${
            isJail ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            {offence.code}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider ${isJail ? 'text-orange-600' : 'text-slate-500'}`}>
            {offence.type === OffenceType.JAIL ? 'Jail Crime' : 'Infringement'}
          </span>
          {offence.act && (
            <span className="text-[9px] font-medium text-slate-500 italic">
              — {offence.act}
            </span>
          )}
        </div>
        <h3 className="text-slate-100 font-semibold group-hover:text-white leading-tight">{offence.name}</h3>
        {offence.notes && (
          <p className="text-[10px] text-sky-500/80 font-medium mt-1 italic line-clamp-1">{offence.notes}</p>
        )}
      </div>
      
      <div className="flex items-center gap-4 ml-4">
        <div className="text-right whitespace-nowrap">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
            {isJail ? 'Jail Time' : 'Fine Amount'}
          </p>
          <div className="flex flex-col items-end">
             <p className={`text-lg font-black mono ${isJail ? 'text-orange-400' : 'text-emerald-500'}`}>
              {isJail ? `${offence.punishment} mo` : `$${offence.punishment}`}
            </p>
            {offence.demerits && (
              <span className="text-[10px] font-bold text-sky-400 mono bg-sky-500/10 px-1 rounded">
                +{offence.demerits} demerits
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg text-white transition-colors shadow-lg ${
          isJail ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default memo(OffenceCard);