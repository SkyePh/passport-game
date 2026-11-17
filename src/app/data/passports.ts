import { AFRICA } from './africa';
import { AMERICAS } from './americas';
import { ASIA } from './asia';
import { EUROPE } from './europe';
import { OCEANIA } from './oceania';
import { Passport } from '../core/models/passport.model';

export const PASSPORTS: Passport[] = [
  ...AFRICA,
  ...AMERICAS,
  ...ASIA,
  ...EUROPE,
  ...OCEANIA,
];
