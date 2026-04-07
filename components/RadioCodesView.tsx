
import React, { useState, useMemo } from 'react';

interface CodeItem {
  code: string;
  description: string;
  category: string;
}

const RADIO_CODES: CodeItem[] = [
  // ... (same data)
  { category: '10-CODES', code: '10-0', description: 'Off Duty' },
  { category: '10-CODES', code: '10-1', description: 'Broadcast to all units' },
  { category: '10-CODES', code: '10-2', description: 'En route' },
  { category: '10-CODES', code: '10-3', description: 'Available' },
  { category: '10-CODES', code: '10-4', description: 'Repeat your last transmission' },
  { category: '10-CODES', code: '10-5', description: 'Out of service' },
  { category: '10-CODES', code: '10-6', description: 'Busy but available for calls' },
  { category: '10-CODES', code: '10-7', description: 'Arrived at scene' },
  { category: '10-CODES', code: '10-8', description: 'Subject has warrant/record' },
  { category: '10-CODES', code: '10-9', description: 'Urgent message' },
  { category: '10-CODES', code: '10-10', description: 'Officer needs urgent help (Panic)' },

  { category: 'RESULT CODES', code: 'K1', description: 'No Action Taken' },
  { category: 'RESULT CODES', code: 'K2', description: 'Refer to Another Section' },
  { category: 'RESULT CODES', code: 'K3', description: 'Warning Given' },
  { category: 'RESULT CODES', code: 'K4', description: 'False Alarm' },
  { category: 'RESULT CODES', code: 'K5', description: 'Offender Found / Enquiries Completed' },
  { category: 'RESULT CODES', code: 'K6', description: 'Prosecution Initiated (Reported)' },
  { category: 'RESULT CODES', code: 'K7', description: 'Cancelled before arrival' },
  { category: 'RESULT CODES', code: 'K8', description: 'Prime Unit' },
  { category: 'RESULT CODES', code: 'K9', description: 'Arrest Made' },

  { category: 'SITUATION CODES', code: '1110', description: 'Murder' },
  { category: 'SITUATION CODES', code: '1120', description: 'Attempted Murder' },
  { category: 'SITUATION CODES', code: '1130', description: 'Manslaughter' },
  { category: 'SITUATION CODES', code: '1210', description: 'Kidnapping/Abduction' },
  { category: 'SITUATION CODES', code: '1310', description: 'Aggravated Robbery (Weapon)' },
  { category: 'SITUATION CODES', code: '1316', description: 'Aggravated Robbery (Manual)' },
  { category: 'SITUATION CODES', code: '1320', description: 'Robbery' },
  { category: 'SITUATION CODES', code: '1410', description: 'Grievous Assault' },
  { category: 'SITUATION CODES', code: '1510', description: 'Serious Assault' },
  { category: 'SITUATION CODES', code: '1640', description: 'Minor Assault' },
  { category: 'SITUATION CODES', code: '1710', description: 'Threats/Intimidation' },
  { category: 'SITUATION CODES', code: '1540', description: 'Male Assaults Female' },
  { category: 'SITUATION CODES', code: '1480', description: 'Use firearm on Police Officer' },
  { category: 'SITUATION CODES', code: '1550', description: 'Assaults Police' },
  { category: 'SITUATION CODES', code: '1730', description: 'Threatening Behaviour' },
  { category: 'SITUATION CODES', code: '1754', description: 'Possess Offensive Weapon' },
  { category: 'SITUATION CODES', code: '1758', description: 'Unlawful possess knife' },
  { category: 'SITUATION CODES', code: '3110', description: 'Drug Offence - Class A' },
  { category: 'SITUATION CODES', code: '3115', description: 'Drug Offence - Class B' },
  { category: 'SITUATION CODES', code: '3210', description: 'Drug Offence - Class C' },
  { category: 'SITUATION CODES', code: '4120', description: 'Burglary' },
  { category: 'SITUATION CODES', code: '4211', description: 'Unlawful Take Motor Vehicle' },
  { category: 'SITUATION CODES', code: '4370', description: 'Theft' },
  { category: 'SITUATION CODES', code: '5110', description: 'Arson' },
  { category: 'SITUATION CODES', code: '5120', description: 'Wilful Damage' },
  { category: 'SITUATION CODES', code: '6110', description: 'Trespass' },
  { category: 'SITUATION CODES', code: '7130', description: 'Escapes Custody' },
  { category: 'SITUATION CODES', code: '3T', description: 'Stop/Search car/Person' },
];

const RadioCodesView: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return RADIO_CODES.filter(item => 
      item.code.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const groups = useMemo(() => {
    const map: Record<string, CodeItem[]> = {};
    filtered.forEach(item => {
      const cat = item.category.toUpperCase();
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [filtered]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-6 bg-neutral-900/10">
      <div className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-neutral-500 group-focus-within:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-white placeholder-neutral-500 transition-all font-medium"
            placeholder="Search radio codes (e.g. '10-3', 'Arrest', '3T')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(groups).length > 0 ? (
          (Object.entries(groups) as [string, CodeItem[]][]).map(([category, items]) => (
            <section key={category} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden h-fit">
              <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800">
                <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">
                  {category}
                </h3>
              </div>
              <div className="p-2 divide-y divide-neutral-800/50">
                {items.map(item => (
                  <div key={item.code} className="p-3 flex items-center justify-between hover:bg-neutral-800/30 transition-colors group">
                    <span className="mono text-yellow-500 font-black text-sm w-16 shrink-0">{item.code}</span>
                    <span className="text-xs text-neutral-300 font-medium text-right group-hover:text-white transition-colors">{item.description}</span>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center opacity-20">
            <p className="text-xl font-bold text-neutral-500">No matching codes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioCodesView;
