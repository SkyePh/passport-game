import { PASSPORTS } from './passports';

describe('PASSPORTS roster', () => {
  it('includes about 199 unique passport-issuing entities', () => {
    const ids = PASSPORTS.map((passport) => passport.id);
    expect(ids.length).toBeGreaterThanOrEqual(190);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every country educational extras', () => {
    for (const passport of PASSPORTS) {
      expect(passport.education.capital.length).toBeGreaterThan(0);
      expect(passport.education.outlets.length).toBeGreaterThan(0);
      expect(passport.education.attractions.length).toBeGreaterThan(0);
      expect(passport.education.funFact.length).toBeGreaterThan(0);
    }
  });
});
