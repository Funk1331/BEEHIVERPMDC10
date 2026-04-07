
export enum OffenceType {
  JAIL = "JAIL",
  FINE = "FINE"
}

export enum OffenceCategory {
  CRIMINAL = "CRIMINAL",
  TRAFFIC = "TRAFFIC",
  LIQUOR_DRUGS = "LIQUOR & DRUGS",
  DISHONESTY = "DISHONESTY",
  PROPERTY = "PROPERTY",
  DISORDER = "DISORDER",
  MISC = "MISCELLANEOUS"
}

export interface Offence {
  id: string;
  type: OffenceType;
  category: OffenceCategory;
  code: string;
  name: string;
  punishment: number; 
  demerits?: number;
  notes?: string;
  act?: string; // Legislative reference (e.g. Crimes Act 1961, s 167)
}

export interface ChargeSheetItem extends Offence {
  quantity: number;
}