export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania';

export type CoverColor =
  | 'burgundy'
  | 'navy'
  | 'blue'
  | 'green'
  | 'red'
  | 'black'
  | 'teal'
  | 'brown';

export type Biometric = 'none' | 'face' | 'face+fingerprint';

export type Bloc =
  | 'EU'
  | 'Schengen-non-EU'
  | 'ECOWAS'
  | 'CARICOM'
  | 'GCC'
  | 'Mercosur'
  | 'ASEAN'
  | 'other';

export type Script = 'Latin' | 'Cyrillic' | 'Arabic' | 'CJK' | 'Greek' | 'other';

export type DrivingSide = 'left' | 'right';

export type MatchTone = 'green' | 'orange' | 'red';

export interface MetroSystem {
  city: string;
  mapUrl?: string;
  note: string;
}

export interface Education {
  capital: string;
  drivingSide: DrivingSide;
  outlets: string[];
  attractions: string[];
  metro: MetroSystem[];
  funFact: string;
}

export interface Passport {
  id: string;
  name: string;
  aliases?: string[];
  continent: Continent;
  coverColor: CoverColor;
  biometric: Biometric;
  visaFreeCount: number;
  bloc: Bloc;
  script: Script;
  education: Education;
}

export interface CategoryResult {
  key: CategoryKey;
  label: string;
  value: string;
  tone: MatchTone;
  arrow?: 'up' | 'down';
}

export type CategoryKey =
  | 'coverColor'
  | 'continent'
  | 'visaFreeCount'
  | 'biometric'
  | 'bloc'
  | 'script';

export interface GuessResult {
  passport: Passport;
  categories: CategoryResult[];
  correct: boolean;
}

export type RoundStatus = 'playing' | 'won' | 'lost';

export const MAX_GUESSES = 6;

export const CATEGORY_HEADERS: { key: CategoryKey; label: string }[] = [
  { key: 'coverColor', label: 'Color' },
  { key: 'continent', label: 'Continent' },
  { key: 'visaFreeCount', label: 'Visa-free' },
  { key: 'biometric', label: 'Biometric' },
  { key: 'bloc', label: 'Bloc' },
  { key: 'script', label: 'Script' },
];
