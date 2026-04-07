import React, { useState, useMemo, useCallback, useDeferredValue, useEffect } from 'react';
import { OFFENCES } from '../constants';
import { Offence, ChargeSheetItem, OffenceType } from '../types';
import SearchInput from './SearchInput';
import OffenceCard from './OffenceCard';
import ChargeSheet from './ChargeSheet';
import ProceduresView from './ProceduresView';
import NotepadView from './NotepadView';
import IncidentCodesView from './IncidentCodesView';
import InfoView from './InfoView';
import MedicalView from './MedicalView';

type Tab = 'CRIMES_&_INFRINGEMENTS' | 'INCIDENT_CODES' | 'PROCEDURES' | 'MEDICAL' | 'NOTEPAD' | 'INFO';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('CRIMES_&_INFRINGEMENTS');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<OffenceType | 'ALL'>('ALL');
  const [chargeSheet, setChargeSheet] = useState<ChargeSheetItem[]>([]);
  
  // Shared Notepad State
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('beehiverp_notes') || '';
  });
  const [isQuickNoteOpen, setIsQuickNoteOpen] = useState(false);

  // Sidebar Resizing State
  const [chargeSheetWidth, setChargeSheetWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    localStorage.setItem('beehiverp_notes', notes);
  }, [notes]);

  // Handle Resizing Logic
  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 320 && newWidth <= 800) {
        setChargeSheetWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const deferredSearch = useDeferredValue(searchTerm);

  const filteredOffences = useMemo(() => {
    const search = deferredSearch.toLowerCase();
    return OFFENCES.filter(o => {
      const matchesSearch = 
        o.name.toLowerCase().includes(search) || 
        o.code.toLowerCase().includes(search);
      
      const matchesType = selectedType === 'ALL' || o.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [deferredSearch, selectedType]);

  const addToChargeSheet = useCallback((offence: Offence) => {
    setChargeSheet(prev => {
      const existing = prev.find(item => item.id === offence.id);
      if (existing) {
        return prev.map(item => 
          item.id === offence.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...offence, quantity: 1 }];
    });
  }, []);

  const removeFromChargeSheet = useCallback((id: string) => {
    setChargeSheet(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setChargeSheet(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearChargeSheet = useCallback(() => {
    if (window.confirm("Confirm reset of current charge sheet?")) {
      setChargeSheet([]);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'CRIMES_&_INFRINGEMENTS':
        return (
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
            <div className="shrink-0 space-y-4 no-print">
              <div className="flex flex-col xl:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <SearchInput value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0 shadow-2xl">
                  {['ALL', OffenceType.JAIL, OffenceType.FINE].map(type => (
                    <button 
                        key={type}
                        onClick={() => setSelectedType(type as any)}
                        className={`px-10 py-3.5 rounded-xl text-[13px] font-black transition-all uppercase tracking-widest ${
                          selectedType === type 
                          ? (type === 'ALL' ? 'bg-blue-600 text-white' : type === OffenceType.JAIL ? 'bg-orange-600 text-white' : 'bg-emerald-600 text-white') + ' shadow-lg' 
                          : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      {type === 'ALL' ? 'ALL' : type === OffenceType.JAIL ? 'JAIL' : 'INFRINGEMENTS'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-3 grid grid-cols-1 2xl:grid-cols-2 gap-4 content-start pb-12">
              {filteredOffences.length > 0 ? (
                filteredOffences.map(offence => (
                  <OffenceCard 
                    key={offence.id} 
                    offence={offence} 
                    onAdd={addToChargeSheet} 
                  />
                ))
              ) : (
                <div className="col-span-full py-48 flex flex-col items-center justify-center opacity-10">
                  <p className="text-3xl font-black text-slate-500 uppercase tracking-[0.5em]">No matches</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'INCIDENT_CODES':
        return <IncidentCodesView />;
      case 'PROCEDURES':
        return <ProceduresView />;
      case 'NOTEPAD':
        return <NotepadView notes={notes} setNotes={setNotes} />;
      case 'INFO':
        return <InfoView />;
      case 'MEDICAL':
        return <MedicalView />;
      default:
        return null;
    }
  };

  const isWithSidebar = activeTab === 'CRIMES_&_INFRINGEMENTS';

  return (
    <div className={`min-h-screen flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-200 ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between z-10 shrink-0 shadow-2xl gap-4 no-print">
        <div className="hidden lg:block w-32"></div>

        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          {(['CRIMES_&_INFRINGEMENTS', 'INCIDENT_CODES', 'PROCEDURES', 'MEDICAL', 'NOTEPAD', 'INFO'] as const).map(tabId => (
            <button 
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all tracking-wider ${
                activeTab === tabId 
                ? 'bg-blue-600 text-white shadow-xl scale-105' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tabId.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="hidden lg:block w-32">
        </div>
      </nav>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 flex overflow-hidden bg-slate-900/30">
          <section className="flex-1 flex flex-col overflow-hidden">
            {renderContent()}
          </section>

          {isWithSidebar && (
            <>
              {/* Resize Handle */}
              <div 
                onMouseDown={startResizing}
                className={`w-1.5 shrink-0 transition-colors cursor-col-resize hover:bg-blue-500/50 group flex items-center justify-center ${isResizing ? 'bg-blue-500' : 'bg-transparent border-l border-slate-800'}`}
              >
                <div className={`w-0.5 h-8 rounded-full transition-colors ${isResizing ? 'bg-white' : 'bg-slate-800 group-hover:bg-blue-400'}`}></div>
              </div>

              <aside 
                style={{ width: `${chargeSheetWidth}px` }}
                className="shrink-0 p-6 bg-slate-950/90 flex flex-col shadow-2xl backdrop-blur-3xl print:w-full print:border-none"
              >
                <ChargeSheet 
                  items={chargeSheet} 
                  onRemove={removeFromChargeSheet} 
                  onClear={clearChargeSheet}
                  updateQuantity={updateQuantity}
                />
              </aside>
            </>
          )}
        </main>

        {/* Floating Quick Note Component */}
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4 z-50 no-print">
          {isQuickNoteOpen && (
            <div className="w-80 h-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-200">
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Quick Notes</span>
                <button 
                  onClick={() => setIsQuickNoteOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <textarea
                className="flex-1 p-4 bg-transparent text-sm text-slate-200 outline-none resize-none font-medium placeholder-slate-600"
                placeholder="Type quick details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
          
          <button
            onClick={() => setIsQuickNoteOpen(!isQuickNoteOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-95 group ${
              isQuickNoteOpen ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
            }`}
            title="Toggle Quick Notes"
          >
            <svg className={`w-6 h-6 transition-transform duration-300 ${isQuickNoteOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      <footer className="bg-slate-950 px-8 py-3 border-t border-slate-900 flex justify-center items-center text-[10px] text-slate-600 uppercase font-black tracking-[0.4em] shrink-0 no-print">
        <span>FUNK1331 - BHPF66</span>
      </footer>
    </div>
  );
};

export default App;