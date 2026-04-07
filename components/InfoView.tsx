
import React from 'react';

const InfoView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-neutral-900/10 overflow-y-auto">
      <div className="max-w-2xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-600/5 -mr-12 -mt-12 rounded-full blur-3xl"></div>
        
        <div className="bg-neutral-950 px-8 py-6 border-b border-neutral-800 flex items-center justify-center">
          <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.5em]">INFO</h2>
        </div>

        <div className="p-10 space-y-6 text-center">
          <div className="space-y-4">
            <p className="text-xl font-bold text-white leading-relaxed">
              UPDATES,
            </p>
            <p className="text-neutral-400 leading-relaxed text-lg font-medium">
              New MEDICAL tab added to assist with vitals when asked by AMBOS.
            </p>
            <p className="text-neutral-400 leading-relaxed text-lg font-medium">
              Sustained Loss of traction added<br />
              Breach of Gangs Act 2024 added
            </p>
          </div>

          <div className="pt-6 flex flex-col items-center justify-center space-y-1">
             <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">For suggestions, contact me on Discord:</p>
             <p className="text-sm font-black text-yellow-500 mono bg-yellow-500/5 px-3 py-1 rounded-full border border-yellow-500/10">Funk133.1</p>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col items-center justify-center">
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-1 italic">Nga Mihi</p>
            <p className="text-2xl font-black text-white italic tracking-tighter uppercase">Funk1331</p>
            <p className="text-[10px] text-yellow-500 font-black uppercase mt-1 tracking-widest">BHPF66</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoView;
