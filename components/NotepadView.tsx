
import React from 'react';

interface NotepadViewProps {
  notes: string;
  setNotes: (val: string) => void;
}

const NotepadView: React.FC<NotepadViewProps> = ({ notes, setNotes }) => {
  const clearNotes = () => {
    if (window.confirm("Clear all tactical notes?")) {
      setNotes('');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Tactical Field Notes
          </h2>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Synced with Quick Note Terminal</p>
        </div>
        <button 
          onClick={clearNotes}
          className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors"
        >
          Wipe Memory
        </button>
      </div>
      
      <textarea
        className="flex-1 p-8 bg-slate-900/10 text-slate-200 font-medium placeholder-slate-700 outline-none resize-none leading-relaxed text-xl"
        placeholder="Enter suspect details, incident logs, or plate numbers here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      
      <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center">
        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Character count: {notes.length}
        </span>
        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Terminal Storage Active
        </span>
      </div>
    </div>
  );
};

export default NotepadView;