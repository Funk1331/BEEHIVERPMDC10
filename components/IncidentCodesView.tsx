
import React, { useState, useMemo } from 'react';

interface IncidentCode {
  code: string;
  name: string;
}

const INCIDENT_DATA: IncidentCode[] = [
  { code: "1A", name: "Alarm Sounding" },
  { code: "1B", name: "Bomb Threat" },
  { code: "1C", name: "Car/Person Acting Suspiciously" },
  { code: "1D", name: "Domestic Dispute" },
  { code: "1E", name: "Emergency/Disaster/Spill" },
  { code: "1F", name: "Assist Fire/Ambulance" },
  { code: "1G", name: "Solvent Abuse" },
  { code: "1H", name: "Drunk Home" },
  { code: "1I", name: "Blockage/Breakdown on Highway" },
  { code: "1J", name: "Juvenile Complaint" },
  { code: "1K", name: "Drunk Custody/Detox Centre" },
  { code: "1L", name: "Land Rescue" },
  { code: "1M", name: "Mental" },
  { code: "1N", name: "Noise Control" },
  { code: "1P", name: "Premises Insecure" },
  { code: "1Q", name: "Breach Graduated Drivers Licence" },
  { code: "1R", name: "Breach of the Peace" },
  { code: "1S", name: "Sudden Death" },
  { code: "1T", name: "Truancy" },
  { code: "1U", name: "Traffic Incident" },
  { code: "1V", name: "Vehicle Collision" },
  { code: "1W", name: "Water/Sea Rescue/Emergency" },
  { code: "1X", name: "Attempted Suicide" },
  { code: "1Z", name: "Other Incident" },

  { code: "2A", name: "Advise Relatives/Owner" },
  { code: "2B", name: "Recruiting" },
  { code: "2C", name: "Civil Dispute" },
  { code: "2D", name: "Official Request for Information" },
  { code: "2E", name: "Remove fences/structures/vegetation" },
  { code: "2F", name: "Firearms Licensing" },
  { code: "2G", name: "Liquor Licensing/Vetting" },
  { code: "2H", name: "Draw Raffle" },
  { code: "2I", name: "Information" },
  { code: "2K", name: "Found Property" },
  { code: "2L", name: "Lost Property" },
  { code: "2M", name: "Missing Person" },
  { code: "2N", name: "Civil Court Process" },
  { code: "2O", name: "Court Orders" },
  { code: "2P", name: "Public Relations" },
  { code: "2Q", name: "Jury List Vetting" },
  { code: "2R", name: "Recovery of motor vehicle" },
  { code: "2S", name: "Summons" },
  { code: "2T", name: "Warrant to Arrest/Fines Enforcement" },
  { code: "2U", name: "Warrant of Seizure" },
  { code: "2V", name: "Validation" },
  { code: "2W", name: "Arrest Warrant (Other)" },
  { code: "2Y", name: "Stock/Animals" },
  { code: "2Z", name: "Other Service Request/Response" },

  { code: "3A", name: "Attend Scene of Crime/Incident" },
  { code: "3B", name: "Beat" },
  { code: "3C", name: "Crime Prevention Advice" },
  { code: "3D", name: "Dog Care/Maintenance" },
  { code: "3E", name: "Employee Vetting" },
  { code: "3F", name: "Foot Patrol" },
  { code: "3G", name: "Watchhouse/Counter Duty" },
  { code: "3H", name: "Hotel Visit" },
  { code: "3J", name: "Comm Centre Duty" },
  { code: "3K", name: "Keys Taken" },
  { code: "3M", name: "Directed Patrol / Mobile Patrol" },
  { code: "3O", name: "Other Vetting" },
  { code: "3R", name: "Road Checkpoint / Speed Camera Operation" },
  { code: "3S", name: "Serve Summons/Execute Arrest Warrant" },
  { code: "3T", name: "Stop/Search Car/Person" },
  { code: "3V", name: "Staff Visit/Supervision" },
  { code: "3W", name: "Watching/Observations" },
  { code: "3X", name: "Video Job" },
  { code: "3Y", name: "Other School Talks" },
  { code: "3Z", name: "Other Preventative Task" },

  { code: "4A", name: "Attend Scene/Meeting/Course/Other" },
  { code: "4B", name: "Mortuary Procedure" },
  { code: "4C", name: "Correspondence/Counter" },
  { code: "4D", name: "Demonstration Duty" },
  { code: "4E", name: "Escort Duty" },
  { code: "4F", name: "Fingerprint Examination" },
  { code: "4G", name: "Travel" },
  { code: "4H", name: "Photography Job" },
  { code: "4I", name: "Injury/Sickness" },
  { code: "4J", name: "Court Security (Prison Escort)" },
  { code: "4K", name: "Court Attendance (Witness, etc.)" },
  { code: "4L", name: "Logistics/Staff Transport" },
  { code: "4M", name: "Meal break" },
  { code: "4N", name: "Victim Advice" },
  { code: "4P", name: "Public Entertainment Duty" },
  { code: "4Q", name: "Enquiry/Investigation" },
  { code: "4S", name: "Vehicle servicing i.e. petrol/LPG" },
  { code: "4U", name: "Lockup" },
  { code: "4V", name: "VIP/DPS" },
  { code: "4W", name: "Witness/Other Person Protection" },
  { code: "4X", name: "Execute Search Warrant" },
  { code: "4Z", name: "Airport Security" },

  { code: "5F", name: "Family harm / domestic violence" },
  { code: "5H", name: "EM bail suitability visit" },
  { code: "5K", name: "Bail Check" },
  { code: "5M", name: "Parole recall warrant" },

  { code: "6D", name: "Bail Breach" },
  { code: "6E", name: "Electronically monitored bail alarm activation" },
  { code: "6I", name: "Illegal Street Racing" },
  { code: "6S", name: "Breach of Police Safety Order" },
  { code: "6Y", name: "Young person unaccompanied" },

  { code: "8P", name: "Pandemic Response" },
  { code: "8PA", name: "Pandemic 72 Hour Check" },
  { code: "8PB", name: "Pandemic Person Check" },
  { code: "8PC", name: "Pandemic Business Check" },
  { code: "8PD", name: "Pandemic Check Via Telephone Only" },
  { code: "8PG", name: "Mass Gathering" },
  { code: "8PL", name: "Directed Patrol" },
  { code: "8PM", name: "Reassurance Essential Facility" },
  { code: "8PZ", name: "Pandemic Checkpoint" },
];

const IncidentCodesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return INCIDENT_DATA.filter(item => 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-slate-900/10">
      <div className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all font-medium"
            placeholder="Search incident codes or names (e.g. '1A' or '3T')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
        {filteredData.map(item => (
          <div 
            key={item.code} 
            className="bg-slate-900 border border-slate-800/50 p-3 rounded-xl flex items-center gap-3 hover:border-blue-500/30 transition-all group"
          >
            <div className="w-10 h-10 shrink-0 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
              <span className="mono text-xs font-black text-blue-400">{item.code}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentCodesView;