import { Continent } from '../models/passport.model';

export interface SeasonCard {
  name: string;
  months: string;
  blurb: string;
  temp: string;
  rain: string;
  tone: 'spring' | 'summer' | 'autumn' | 'winter';
}

export type ClimateKind = 'Tropical' | 'Temperate' | 'Varied';

export function climateKind(continent: Continent): ClimateKind {
  if (continent === 'Europe' || continent === 'North America') {
    return 'Temperate';
  }
  if (continent === 'Asia') {
    return 'Varied';
  }
  return 'Tropical';
}

export function seasonsFor(continent: Continent): SeasonCard[] {
  if (climateKind(continent) === 'Temperate') {
    return [
      {
        name: 'Spring',
        months: 'Mar – May',
        blurb: 'Milder days, longer light, and landscapes coming back into leaf.',
        temp: '8–18°C',
        rain: 'Showers',
        tone: 'spring',
      },
      {
        name: 'Summer',
        months: 'Jun – Aug',
        blurb: 'The warmest stretch of the year, with long days and busy travel season.',
        temp: '18–28°C',
        rain: 'Low to mixed',
        tone: 'summer',
      },
      {
        name: 'Autumn',
        months: 'Sep – Nov',
        blurb: 'Cooler air, harvest colours, and fewer crowds in many cities.',
        temp: '8–18°C',
        rain: 'Moderate',
        tone: 'autumn',
      },
      {
        name: 'Winter',
        months: 'Dec – Feb',
        blurb: 'The coldest months; pack layers and expect shorter daylight.',
        temp: '-2–8°C',
        rain: 'Snow or rain',
        tone: 'winter',
      },
    ];
  }

  return [
    {
      name: 'Spring',
      months: 'Mar – May',
      blurb: 'Warm and increasingly humid, with greener landscapes after the first rains.',
      temp: '25–31°C',
      rain: 'Moderate rain',
      tone: 'spring',
    },
    {
      name: 'Summer',
      months: 'Jun – Aug',
      blurb: 'The main rainy season in many tropical belts, with heavy showers and lush scenery.',
      temp: '24–29°C',
      rain: 'Heavy rain',
      tone: 'summer',
    },
    {
      name: 'Autumn',
      months: 'Sep – Nov',
      blurb: 'Rains often ease, leaving warm, humid weather and clearer views.',
      temp: '24–31°C',
      rain: 'Moderate rain',
      tone: 'autumn',
    },
    {
      name: 'Winter',
      months: 'Dec – Feb',
      blurb: 'Usually the driest, most comfortable stretch, with lower humidity.',
      temp: '24–30°C',
      rain: 'Low rain',
      tone: 'winter',
    },
  ];
}
