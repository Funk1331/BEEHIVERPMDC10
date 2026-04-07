
import React from 'react';
import { ChargeSheetItem, OffenceType } from '../types';

interface ChargeSheetProps {
  items: ChargeSheetItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  updateQuantity: (id: string, delta: number) => void;
}

const ChargeSheet: React.FC<ChargeSheetProps> = ({ items, onRemove, onClear, updateQuantity }) => {
  const totalJailTime = items
    .filter(i => i.type === OffenceType.JAIL)
    .reduce((acc, item) => acc + (item.punishment * item.quantity), 0);

  const totalFines = items
    .filter(i => i.type === OffenceType.FINE)
    .reduce((acc, item) => acc + (item.punishment * item.quantity), 0);

  const totalDemerits = items.reduce((acc, item) => acc + ((item.demerits || 0) * item.quantity), 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Charge Sheet
          </h2>
        </div>
        {items.length > 0 && (
          <button 
            onClick={onClear}
            className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
            <svg className="w-12 h-12 mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-400 font-medium text-sm">Waiting for selection...</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between group">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold px-1 rounded mono ${item.type === OffenceType.JAIL ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {item.code}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">{item.name}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                   <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white">-</button>
                    <span className="w-4 text-center text-xs font-bold text-white mono">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white">+</button>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    {item.type === OffenceType.JAIL ? `${item.punishment} MO` : `$${item.punishment}`}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-bold mono ${item.type === OffenceType.JAIL ? 'text-orange-400' : 'text-emerald-400'}`}>
                  {item.type === OffenceType.JAIL ? `${item.punishment * item.quantity}m` : `$${item.punishment * item.quantity}`}
                </span>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="block mt-1 p-1 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-auto"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-500/5 border border-orange-500/10 p-3 rounded-xl">
             <p className="text-orange-500/60 text-[9px] font-bold uppercase tracking-widest mb-1">Total Jail Time</p>
             <p className="text-2xl font-black text-orange-400 mono">{totalJailTime}<span className="text-xs ml-1">mo</span></p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
             <p className="text-emerald-500/60 text-[9px] font-bold uppercase tracking-widest mb-1">Total Infringements</p>
             <p className="text-2xl font-black text-emerald-400 mono">${totalFines}</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 py-1 bg-sky-500/5 border border-sky-500/10 rounded-lg">
          <span className="text-sky-400 text-[9px] font-bold uppercase tracking-widest">Accumulated Demerits</span>
          <span className="text-sky-400 font-bold mono">{totalDemerits} pts</span>
        </div>
      </div>
    </div>
  );
};

export default ChargeSheet;
