import { Passport } from '../models/passport.model';
import { comparePassports } from './compare';

function stub(overrides: Partial<Passport> & Pick<Passport, 'id' | 'name'>): Passport {
  return {
    continent: 'Europe',
    coverColor: 'burgundy',
    biometric: 'face',
    visaFreeCount: 100,
    bloc: 'other',
    script: 'Latin',
    education: {
      capital: 'Test',
      drivingSide: 'right',
      outlets: ['C'],
      attractions: ['A'],
      metro: [],
      funFact: 'Fact',
    },
    ...overrides,
  };
}

describe('comparePassports', () => {
  it('marks an exact country match all green', () => {
    const france = stub({
      id: 'FR',
      name: 'France',
      visaFreeCount: 185,
      biometric: 'face+fingerprint',
      bloc: 'EU',
    });
    const result = comparePassports(france, france);
    expect(result.correct).toBe(true);
    expect(result.categories.every((c) => c.tone === 'green')).toBe(true);
  });

  it('uses orange for related cover colors and arrows on visa-free misses', () => {
    const guess = stub({
      id: 'US',
      name: 'United States',
      continent: 'North America',
      coverColor: 'navy',
      visaFreeCount: 179,
    });
    const target = stub({
      id: 'AU',
      name: 'Australia',
      continent: 'Oceania',
      coverColor: 'blue',
      visaFreeCount: 182,
    });
    const result = comparePassports(guess, target);
    expect(result.correct).toBe(false);
    expect(result.categories.find((c) => c.key === 'coverColor')?.tone).toBe('orange');
    expect(result.categories.find((c) => c.key === 'visaFreeCount')?.tone).toBe('orange');
    expect(result.categories.find((c) => c.key === 'continent')?.tone).toBe('red');
  });

  it('points visa-free arrows toward the target', () => {
    const guess = stub({ id: 'AF', name: 'Afghanistan', visaFreeCount: 23 });
    const target = stub({ id: 'SG', name: 'Singapore', visaFreeCount: 192 });
    const visa = comparePassports(guess, target).categories.find((c) => c.key === 'visaFreeCount');
    expect(visa?.tone).toBe('red');
    expect(visa?.arrow).toBe('up');
  });

  it('treats face vs face+fingerprint as orange when both have a chip', () => {
    const guess = stub({ id: 'US', name: 'United States', biometric: 'face' });
    const target = stub({ id: 'DE', name: 'Germany', biometric: 'face+fingerprint' });
    expect(comparePassports(guess, target).categories.find((c) => c.key === 'biometric')?.tone).toBe(
      'orange',
    );
  });
});
