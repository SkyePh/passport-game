import {
  Biometric,
  Bloc,
  Continent,
  CoverColor,
  DrivingSide,
  MetroSystem,
  Passport,
  Script,
} from '../core/models/passport.model';

export function wikiMap(file: string): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=800`;
}

export function p(
  id: string,
  name: string,
  continent: Continent,
  coverColor: CoverColor,
  biometric: Biometric,
  visaFreeCount: number,
  bloc: Bloc,
  script: Script,
  capital: string,
  drivingSide: DrivingSide,
  outlets: string[],
  attractions: string[],
  funFact: string,
  extras: { aliases?: string[]; metro?: MetroSystem[] } = {},
): Passport {
  return {
    id,
    name,
    continent,
    coverColor,
    biometric,
    visaFreeCount,
    bloc,
    script,
    aliases: extras.aliases,
    education: {
      capital,
      drivingSide,
      outlets,
      attractions,
      funFact,
      metro: extras.metro ?? [],
    },
  };
}
