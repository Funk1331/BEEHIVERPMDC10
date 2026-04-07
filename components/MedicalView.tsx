import React, { useState } from 'react';

type Condition = 'NORMAL' | 'STRESSED' | 'TRAUMA' | 'CRITICAL';

interface Vitals {
  heartRate: string;
  bloodPressure: string;
  respRate: string;
  spO2: string;
  temperature: string;
  bgl: string;
  gcs: string;
}

const MedicalView: React.FC = () => {
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: '80',
    bloodPressure: '120/80',
    respRate: '16',
    spO2: '99',
    temperature: '37.0',
    bgl: '5.5',
    gcs: '15',
  });

  const [injuries, setInjuries] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFromDescription = async () => {
    if (!injuries.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ injuries }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const generatedVitals = await response.json();
      
      setVitals(prev => ({
        ...prev,
        ...generatedVitals
      }));
    } catch (error) {
      console.error("Failed to generate vitals:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVitals = (condition: Condition) => {
    let hr, bpSys, bpDia, rr, spo2, temp, bglVal, gcsVal;
    switch (condition) {
      case 'NORMAL':
        hr = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
        bpSys = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
        bpDia = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
        rr = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
        spo2 = Math.floor(Math.random() * (100 - 97 + 1)) + 97;
        temp = (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1);
        bglVal = (Math.random() * (7.8 - 4.0) + 4.0).toFixed(1);
        gcsVal = 15;
        break;
      case 'STRESSED':
        hr = Math.floor(Math.random() * (130 - 100 + 1)) + 100;
        bpSys = Math.floor(Math.random() * (150 - 130 + 1)) + 130;
        bpDia = Math.floor(Math.random() * (95 - 85 + 1)) + 85;
        rr = Math.floor(Math.random() * (26 - 20 + 1)) + 20;
        spo2 = Math.floor(Math.random() * (99 - 95 + 1)) + 95;
        temp = (Math.random() * (38.0 - 37.0) + 37.0).toFixed(1);
        bglVal = (Math.random() * (8.5 - 5.0) + 5.0).toFixed(1);
        gcsVal = 15;
        break;
      case 'TRAUMA':
        hr = Math.floor(Math.random() * (150 - 120 + 1)) + 120;
        bpSys = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
        bpDia = Math.floor(Math.random() * (60 - 50 + 1)) + 50;
        rr = Math.floor(Math.random() * (35 - 25 + 1)) + 25;
        spo2 = Math.floor(Math.random() * (95 - 88 + 1)) + 88;
        temp = (Math.random() * (36.5 - 35.0) + 35.0).toFixed(1);
        bglVal = (Math.random() * (10.0 - 6.0) + 6.0).toFixed(1);
        gcsVal = Math.floor(Math.random() * (14 - 9 + 1)) + 9;
        break;
      case 'CRITICAL':
        hr = Math.floor(Math.random() * (180 - 140 + 1)) + 140; // Or very low
        if (Math.random() > 0.5) hr = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
        bpSys = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
        bpDia = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
        rr = Math.floor(Math.random() * (10 - 4 + 1)) + 4; // Or very high
        if (Math.random() > 0.5) rr = Math.floor(Math.random() * (45 - 35 + 1)) + 35;
        spo2 = Math.floor(Math.random() * (88 - 75 + 1)) + 75;
        temp = (Math.random() * (35.0 - 33.0) + 33.0).toFixed(1);
        bglVal = (Math.random() * (15.0 - 2.0) + 2.0).toFixed(1);
        gcsVal = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        break;
    }

    setVitals(prev => ({
      ...prev,
      heartRate: hr.toString(),
      bloodPressure: `${bpSys}/${bpDia}`,
      respRate: rr.toString(),
      spO2: spo2.toString(),
      temperature: temp.toString(),
      bgl: bglVal.toString(),
      gcs: gcsVal.toString(),
    }));
  };

  const handleVitalChange = (field: keyof Vitals, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-slate-900/10">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Medical RP Assistant</h2>
        <p className="text-slate-400 text-sm mt-1">Quickly generate or input vitals to provide to EMS.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-2 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Current Vitals
              </h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => generateVitals('NORMAL')} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-bold transition-colors">Normal</button>
                <button onClick={() => generateVitals('STRESSED')} className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-lg text-xs font-bold transition-colors">Stressed</button>
                <button onClick={() => generateVitals('TRAUMA')} className="px-3 py-1.5 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border border-orange-500/20 rounded-lg text-xs font-bold transition-colors">Trauma</button>
                <button onClick={() => generateVitals('CRITICAL')} className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-xs font-bold transition-colors">Critical</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <VitalInput label="Heart Rate (BPM)" value={vitals.heartRate} onChange={(v) => handleVitalChange('heartRate', v)} color="text-red-400" />
              <VitalInput label="Blood Pressure" value={vitals.bloodPressure} onChange={(v) => handleVitalChange('bloodPressure', v)} color="text-blue-400" />
              <VitalInput label="Resp. Rate" value={vitals.respRate} onChange={(v) => handleVitalChange('respRate', v)} color="text-sky-400" />
              <VitalInput label="SpO2 (%)" value={vitals.spO2} onChange={(v) => handleVitalChange('spO2', v)} color="text-indigo-400" />
              <VitalInput label="Temperature (°C)" value={vitals.temperature} onChange={(v) => handleVitalChange('temperature', v)} color="text-orange-400" />
              <VitalInput label="BGL (mmol/L)" value={vitals.bgl} onChange={(v) => handleVitalChange('bgl', v)} color="text-purple-400" />
              <VitalInput label="GCS (3-15)" value={vitals.gcs} onChange={(v) => handleVitalChange('gcs', v)} color="text-teal-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Injuries & Symptoms
            </h3>
            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none mb-4"
              placeholder="E.g., Gunshot wound to the right shoulder, bleeding heavily. Complaining of dizziness and shortness of breath..."
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={generateFromDescription}
                disabled={isGenerating || !injuries.trim()}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  isGenerating || !injuries.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Vitals from Description
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Quick Reference</h3>
             <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-300 font-bold">Normal Heart Rate</p>
                  <p className="text-slate-500">60 - 100 BPM</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal Blood Pressure</p>
                  <p className="text-slate-500">90/60 - 120/80 mmHg</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal Resp. Rate</p>
                  <p className="text-slate-500">12 - 20 breaths/min</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal SpO2</p>
                  <p className="text-slate-500">95% - 100%</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal Temperature</p>
                  <p className="text-slate-500">36.5 - 37.5 °C</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal BGL</p>
                  <p className="text-slate-500">4.0 - 7.8 mmol/L</p>
                </div>
                <div>
                  <p className="text-slate-300 font-bold">Normal GCS</p>
                  <p className="text-slate-500">15 (Fully conscious)</p>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-slate-300 font-bold mb-1">Blood Types</p>
                  <div className="flex flex-wrap gap-2">
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <span key={type} className="px-2 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-xs font-bold">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VitalInput = ({ label, value, onChange, color }: { label: string, value: string, onChange: (v: string) => void, color: string }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</label>
    <input
      type="text"
      className={`w-full bg-transparent text-xl font-black ${color} outline-none`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default MedicalView;
