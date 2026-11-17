import { Continent, Passport } from '../models/passport.model';

export type Landscape = 'desert' | 'mountain' | 'tropical';

const BY_ID: Record<string, Landscape> = {
  YE: 'desert',
  SA: 'desert',
  AE: 'desert',
  QA: 'desert',
  KW: 'desert',
  BH: 'desert',
  OM: 'desert',
  IQ: 'desert',
  SY: 'desert',
  JO: 'desert',
  IL: 'desert',
  PS: 'desert',
  IR: 'desert',
  AF: 'desert',
  TM: 'desert',
  UZ: 'desert',
  KZ: 'desert',
  MN: 'desert',
  DZ: 'desert',
  LY: 'desert',
  EG: 'desert',
  SD: 'desert',
  TD: 'desert',
  NE: 'desert',
  ML: 'desert',
  MR: 'desert',
  SO: 'desert',
  ER: 'desert',
  DJ: 'desert',
  NA: 'desert',
  BW: 'desert',
  MA: 'desert',
  TN: 'desert',
  AU: 'desert',

  CH: 'mountain',
  AT: 'mountain',
  LI: 'mountain',
  AD: 'mountain',
  NP: 'mountain',
  BT: 'mountain',
  TJ: 'mountain',
  KG: 'mountain',
  GE: 'mountain',
  AM: 'mountain',
  AZ: 'mountain',
  JP: 'mountain',
  KP: 'mountain',
  KR: 'mountain',
  CN: 'mountain',
  TW: 'mountain',
  PK: 'mountain',
  TR: 'mountain',
  NO: 'mountain',
  IS: 'mountain',
  NZ: 'mountain',
  CL: 'mountain',
  PE: 'mountain',
  BO: 'mountain',
  EC: 'mountain',
  AR: 'mountain',
  US: 'mountain',
  CA: 'mountain',
  LS: 'mountain',
  ET: 'mountain',
  RW: 'mountain',
  ZA: 'mountain',

  BS: 'tropical',
  MT: 'tropical',
  CY: 'tropical',
};

const BY_CONTINENT: Record<Continent, Landscape> = {
  Africa: 'tropical',
  Asia: 'tropical',
  Europe: 'mountain',
  'North America': 'tropical',
  'South America': 'tropical',
  Oceania: 'tropical',
};

export function landscapeFor(passport: Passport): Landscape {
  return BY_ID[passport.id] ?? BY_CONTINENT[passport.continent];
}

export function landscapeSrc(landscape: Landscape): string {
  return `${landscape}CountryLongCard.png`;
}
