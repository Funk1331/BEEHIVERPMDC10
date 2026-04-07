
import React from 'react';

const ProceduresView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-900/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: CODES & COMMANDS */}
        <div className="space-y-6">
          {/* RESULT & 10 CODES */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Result & 10 Codes</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Result Codes</p>
                <div className="space-y-1 text-[11px] mono">
                  <div className="flex justify-between"><span className="text-blue-400">K1</span> <span className="text-slate-400">No Action</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">K2</span> <span className="text-slate-400">Hold Job</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">K6</span> <span className="text-slate-400">Reported</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">K8</span> <span className="text-slate-400">Prime Unit</span></div>
                  <div className="flex justify-between"><span className="text-orange-500 font-bold">K9</span> <span className="text-orange-500">Arrest</span></div>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Radio Codes</p>
                <div className="space-y-1 text-[11px] mono">
                  <div className="flex justify-between"><span className="text-blue-400">10-0</span> <span className="text-slate-400">Off-Duty</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">10-1</span> <span className="text-slate-400">Broadcast</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">10-2</span> <span className="text-slate-400">En-route</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">10-3</span> <span className="text-slate-400">Available</span></div>
                  <div className="flex justify-between"><span className="text-blue-400">10-7</span> <span className="text-slate-400">Arrived</span></div>
                  <div className="flex justify-between"><span className="text-red-600 font-bold">10-10</span> <span className="text-red-600">PANIC</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* CHAT BOX COMMANDS */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Handy Chat Box Commands</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { cmd: '/QP (NAME)', desc: 'QUERY PERSON' },
                { cmd: '/QVR (REGO)', desc: 'QUERY VEHICLE' },
                { cmd: '/3T (REGO) (DESC)', desc: 'STOP/SEARCH CAR/PERSON' },
                { cmd: '/10-3 (AREA)', desc: 'SET AVAILABLE' },
                { cmd: '/records', desc: 'OPEN DATABASE' },
                { cmd: '/imenu', desc: 'SEARCH PERSON/VEHICLE' },
                { cmd: '/Resolve (K) (ID)', desc: 'CLOSE JOB' },
              ].map(item => (
                <div key={item.cmd} className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0">
                  <span className="mono text-xs font-bold text-blue-400 italic">{item.cmd}</span>
                  <span className="text-[10px] text-slate-500 font-bold">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TACTICAL STATUS */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tactical Status</h3>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <p className="text-[9px] font-bold text-slate-600 uppercase mb-2">Response Priorities</p>
                <div className="space-y-1 text-[11px]">
                  <div className="flex gap-2"><span className="w-4 h-4 bg-red-600 rounded flex items-center justify-center text-white font-bold text-[9px]">1</span> Urgent Lights & Sirens</div>
                  <div className="flex gap-2"><span className="w-4 h-4 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-[9px]">2</span> Lights & Sirens as required</div>
                  <div className="flex gap-2"><span className="w-4 h-4 bg-slate-700 rounded flex items-center justify-center text-white font-bold text-[9px]">3</span> Non-urgent - Road Speeds</div>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-600 uppercase mb-2">Patient Status (Vitals)</p>
                <div className="space-y-1 text-[10px] font-bold">
                  <div><span className="text-red-500">Stat 1:</span> <span className="text-slate-400">Unconscious/No Breathing/Low Pulse</span></div>
                  <div><span className="text-orange-500">Stat 2:</span> <span className="text-slate-400">Pulse/Breathing but unresponsive</span></div>
                  <div><span className="text-blue-400">Stat 3:</span> <span className="text-slate-400">Conscious, breathing and awake</span></div>
                  <div><span className="text-emerald-500">Stat 4:</span> <span className="text-slate-400">Walking, Talking, Coherent</span></div>
                  <div><span className="text-slate-600">Stat 0:</span> <span className="text-slate-600">Deceased (K6)</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COLUMN 2: PHONETIC ALPHABET */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden h-fit">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
            <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Phonetic Alphabet</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              ['A', 'Alpha'], ['B', 'Bravo'], ['C', 'Charlie'], ['D', 'Delta'],
              ['E', 'Echo'], ['F', 'Foxtrot'], ['G', 'Golf'], ['H', 'Hotel'],
              ['I', 'India'], ['J', 'Juliet'], ['K', 'Kilo'], ['L', 'Lima'],
              ['M', 'Mike'], ['N', 'November'], ['O', 'Oscar'], ['P', 'Papa'],
              ['Q', 'Quebec'], ['R', 'Romeo'], ['S', 'Sierra'], ['T', 'Tango'],
              ['U', 'Uniform'], ['V', 'Victor'], ['W', 'Whiskey'], ['X', 'X-Ray'],
              ['Y', 'Yankee'], ['Z', 'Zulu']
            ].map(([letter, word]) => (
              <div key={letter} className="flex gap-4 items-center border-b border-slate-800 pb-0.5">
                <span className="mono text-blue-400 font-black w-2">{letter}</span>
                <span className="text-[11px] text-slate-400 font-bold">{word}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: CAUTIONS & ASSESSMENT */}
        <div className="space-y-6">
          {/* ADULT CAUTION */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Adult Caution (Rights)</h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[11px] text-slate-400 italic leading-relaxed">
                "You are being <span className="text-orange-500 font-bold">arrested / detained</span> for (REASON). You have the right to remain silent. You do not have to make any statement. Anything you say will be recorded and given in evidence in court. You have the right to speak with a lawyer without delay and in private before deciding to answer any questions. Police have a list of lawyers you may speak to for free, do you understand your rights?"
              </p>
              <div className="bg-slate-950 px-2 py-1 rounded text-center border border-slate-800">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">REPEAT UP TO 3 TIMES ONLY</p>
              </div>
            </div>
          </section>

          {/* YOUTH CAUTION */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Youth Caution (Rights)</h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[11px] text-slate-400 italic leading-relaxed">
                "You are being <span className="text-orange-500 font-bold">arrested / detained</span> for (REASON) or I am speaking to you about (REASON). You have the right to remain silent. You do not have to make any statement or answer any questions. If you agree to make a statement or answer any questions, you can change your mind and stop at any time. Anything you say will be recorded and given in evidence in court. You have the right to speak with a lawyer or any nominated person without delay and in private before answering any questions. Your lawyer or nominated person can be with you whilst you answer any questions. Police have a list of lawyers you may speak to for free, do you understand your rights?"
              </p>
              <div className="bg-slate-950 px-2 py-1 rounded text-center border border-slate-800">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">REPEAT UP TO 3 TIMES ONLY</p>
              </div>
            </div>
          </section>

          {/* SEARCH & PURSUIT */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Search & Pursuit</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-sky-600 uppercase mb-1">Search Caution</p>
                <p className="text-[10px] text-slate-500 italic leading-tight">
                  "Under the Search and Surveillance Act 2012, whilst in Police Custody, we have the right to search your person. Do you have anything on you that'll poke, stick, hurt or harm me?"
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-sky-600 uppercase mb-1">Pursuit Initiation</p>
                <p className="text-[10px] text-slate-500 italic leading-tight">
                  "Comms, (CALLSIGN) Priority vehicle failing to stop, (POSTAL) (DESCRIPTION) (REGO). (POLICE VEHICLE & CLASS). (WEATHER/TRAFFIC)."
                </p>
                <p className="text-[8px] font-black text-red-600 uppercase mt-2">TVI (PIT) APPROVAL SGT+ ONLY</p>
              </div>
            </div>
          </section>

          {/* TENR */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">TENR Assessment</h3>
            </div>
            <div className="p-4 space-y-1.5 text-[11px] font-bold">
              <div className="flex gap-2"><span className="text-blue-400 mono">T</span> <span className="text-slate-400">Threat: <span className="font-normal">Assess the threat</span></span></div>
              <div className="flex gap-2"><span className="text-blue-400 mono">E</span> <span className="text-slate-400">Exposure: <span className="font-normal">Manage Exposure</span></span></div>
              <div className="flex gap-2"><span className="text-blue-400 mono">N</span> <span className="text-slate-400">Necessity: <span className="font-normal">Necessity to Intervene</span></span></div>
              <div className="flex gap-2"><span className="text-blue-400 mono">R</span> <span className="text-slate-400">Response: <span className="font-normal">Proportionate response</span></span></div>
            </div>
          </section>

          {/* RESOLVING JOBS */}
          <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Resolving Jobs</h3>
            </div>
            <div className="p-4 space-y-2 text-[10px] font-bold">
              <p className="text-slate-400"><span className="text-white">Comms Active:</span> Responder app on phone &rarr; remember Job ID &rarr; <span className="mono text-blue-400 italic">/Resolve (K) (ID)</span></p>
              <p className="text-slate-400"><span className="text-white">Comms Inactive:</span> Use <span className="mono text-blue-400 italic">/10-3 (K) (Desc)</span></p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default ProceduresView;
