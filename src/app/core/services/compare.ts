import {
  Biometric,
  Bloc,
  CategoryResult,
  Continent,
  CoverColor,
  GuessResult,
  Passport,
  Script,
} from '../models/passport.model';

const COLOR_FAMILY: Record<CoverColor, CoverColor[]> = {
  burgundy: ['burgundy', 'red'],
  red: ['red', 'burgundy'],
  navy: ['navy', 'blue', 'black'],
  blue: ['blue', 'navy'],
  black: ['black', 'navy'],
  green: ['green', 'teal'],
  teal: ['teal', 'green'],
  brown: ['brown'],
};

const ADJACENT: Record<Continent, Continent[]> = {
  Europe: ['Asia', 'Africa'],
  Asia: ['Europe', 'Africa', 'Oceania'],
  Africa: ['Europe', 'Asia'],
  'North America': ['South America'],
  'South America': ['North America'],
  Oceania: ['Asia'],
};

const BIOMETRIC_LABEL: Record<Biometric, string> = {
  none: 'None',
  face: 'Face',
  'face+fingerprint': 'Face + FP',
};

const BLOC_LABEL: Record<Bloc, string> = {
  EU: 'EU',
  'Schengen-non-EU': 'Schengen',
  ECOWAS: 'ECOWAS',
  CARICOM: 'CARICOM',
  GCC: 'GCC',
  Mercosur: 'Mercosur',
  ASEAN: 'ASEAN',
  other: 'Other',
};

const SCRIPT_LABEL: Record<Script, string> = {
  Latin: 'Latin',
  Cyrillic: 'Cyrillic',
  Arabic: 'Arabic',
  CJK: 'CJK',
  Greek: 'Greek',
  other: 'Other',
};

function titleCaseColor(color: CoverColor): string {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

function continentLabel(continent: Continent): string {
  if (continent === 'North America') {
    return 'N. America';
  }
  if (continent === 'South America') {
    return 'S. America';
  }
  return continent;
}

function colorMatch(guess: CoverColor, target: CoverColor): CategoryResult {
  const tone =
    guess === target ? 'green' : COLOR_FAMILY[guess].includes(target) ? 'orange' : 'red';
  return {
    key: 'coverColor',
    label: 'Color',
    value: titleCaseColor(guess),
    tone,
  };
}

function continentMatch(guess: Continent, target: Continent): CategoryResult {
  const tone =
    guess === target ? 'green' : ADJACENT[guess].includes(target) ? 'orange' : 'red';
  return {
    key: 'continent',
    label: 'Continent',
    value: continentLabel(guess),
    tone,
  };
}

function visaMatch(guess: number, target: number): CategoryResult {
  const diff = Math.abs(guess - target);
  const tone = diff === 0 ? 'green' : diff <= 20 ? 'orange' : 'red';
  return {
    key: 'visaFreeCount',
    label: 'Visa-free',
    value: String(guess),
    tone,
    arrow: tone === 'green' ? undefined : target > guess ? 'up' : 'down',
  };
}

function biometricMatch(guess: Biometric, target: Biometric): CategoryResult {
  let tone: CategoryResult['tone'] = 'red';
  if (guess === target) {
    tone = 'green';
  } else if (guess !== 'none' && target !== 'none') {
    tone = 'orange';
  }
  return {
    key: 'biometric',
    label: 'Biometric',
    value: BIOMETRIC_LABEL[guess],
    tone,
  };
}

function blocMatch(
  guessBloc: Bloc,
  targetBloc: Bloc,
  guessContinent: Continent,
  targetContinent: Continent,
): CategoryResult {
  let tone: CategoryResult['tone'] = 'red';
  if (guessBloc === targetBloc) {
    tone = 'green';
  } else if (
    guessBloc !== 'other' &&
    targetBloc !== 'other' &&
    guessContinent === targetContinent
  ) {
    tone = 'orange';
  }
  return {
    key: 'bloc',
    label: 'Bloc',
    value: BLOC_LABEL[guessBloc],
    tone,
  };
}

function scriptMatch(guess: Script, target: Script): CategoryResult {
  return {
    key: 'script',
    label: 'Script',
    value: SCRIPT_LABEL[guess],
    tone: guess === target ? 'green' : 'red',
  };
}

export function comparePassports(guess: Passport, target: Passport): GuessResult {
  const correct = guess.id === target.id;
  const categories: CategoryResult[] = correct
    ? [
        { key: 'coverColor', label: 'Color', value: titleCaseColor(guess.coverColor), tone: 'green' },
        { key: 'continent', label: 'Continent', value: continentLabel(guess.continent), tone: 'green' },
        { key: 'visaFreeCount', label: 'Visa-free', value: String(guess.visaFreeCount), tone: 'green' },
        {
          key: 'biometric',
          label: 'Biometric',
          value: BIOMETRIC_LABEL[guess.biometric],
          tone: 'green',
        },
        { key: 'bloc', label: 'Bloc', value: BLOC_LABEL[guess.bloc], tone: 'green' },
        { key: 'script', label: 'Script', value: SCRIPT_LABEL[guess.script], tone: 'green' },
      ]
    : [
        colorMatch(guess.coverColor, target.coverColor),
        continentMatch(guess.continent, target.continent),
        visaMatch(guess.visaFreeCount, target.visaFreeCount),
        biometricMatch(guess.biometric, target.biometric),
        blocMatch(guess.bloc, target.bloc, guess.continent, target.continent),
        scriptMatch(guess.script, target.script),
      ];

  return { passport: guess, categories, correct };
}

export function flagUrl(id: string, width = 80): string {
  return `https://flagcdn.com/w${width}/${id.toLowerCase()}.png`;
}
