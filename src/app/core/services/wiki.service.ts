import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Passport } from '../models/passport.model';

interface WikiRest {
  title?: string;
  extract?: string;
  description?: string;
  thumbnail?: { source?: string };
  originalimage?: { source?: string };
}

export interface WikiSummary {
  title: string;
  extract: string;
  image?: string;
  description?: string;
}

export interface SightFact {
  name: string;
  image?: string;
  extract?: string;
}

export interface CountryFacts {
  about: string;
  heroImage?: string;
  description?: string;
  cuisine?: WikiSummary;
  climate?: WikiSummary;
  sights: SightFact[];
}

const WIKI_TITLES: Record<string, string> = {
  GB: 'United Kingdom',
  US: 'United States',
  KR: 'South Korea',
  KP: 'North Korea',
  CD: 'Democratic Republic of the Congo',
  CG: 'Republic of the Congo',
  CZ: 'Czech Republic',
  VA: 'Vatican City',
  FM: 'Federated States of Micronesia',
  TL: 'East Timor',
  SZ: 'Eswatini',
  CI: 'Ivory Coast',
  MK: 'North Macedonia',
  PS: 'State of Palestine',
  XK: 'Kosovo',
  TW: 'Taiwan',
  AE: 'United Arab Emirates',
  LA: 'Laos',
  MD: 'Moldova',
  BO: 'Bolivia',
  IR: 'Iran',
  SY: 'Syria',
  RU: 'Russia',
  VN: 'Vietnam',
  MM: 'Myanmar',
};

@Injectable({ providedIn: 'root' })
export class WikiService {
  private readonly http = inject(HttpClient);

  load(passport: Passport): Observable<CountryFacts> {
    const title = WIKI_TITLES[passport.id] ?? passport.name;
    const sights = passport.education.attractions.slice(0, 3);

    return forkJoin({
      country: this.summary(title),
      cuisine: this.summary(`${title} cuisine`),
      climate: this.summary(`Climate of ${title}`),
      sights: sights.length
        ? forkJoin(sights.map((name) => this.sight(name)))
        : of([]),
    }).pipe(
      map(({ country, cuisine, climate, sights: loadedSights }) => ({
        about: country?.extract || passport.education.funFact,
        heroImage: scenicImage(country?.image),
        description: country?.description,
        cuisine: cuisine ?? undefined,
        climate: climate ?? undefined,
        sights: loadedSights,
      })),
    );
  }

  private sight(name: string): Observable<SightFact> {
    return this.summary(name).pipe(
      map((page) => ({
        name,
        image: page?.image,
        extract: page?.extract,
      })),
    );
  }

  private summary(title: string): Observable<WikiSummary | null> {
    const slug = encodeURIComponent(title.replaceAll(' ', '_'));
    return this.http
      .get<WikiRest>(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
        headers: { 'Api-User-Agent': 'ClearedPassportGame/1.0' },
      })
      .pipe(
        map((page) => {
          if (!page?.extract) {
            return null;
          }
          return {
            title: page.title ?? title,
            extract: page.extract,
            image: page.originalimage?.source ?? page.thumbnail?.source,
            description: page.description,
          };
        }),
        catchError(() => of(null)),
      );
  }
}

function scenicImage(url?: string): string | undefined {
  if (!url || /flag[_-]?of|coat[_-]?of[_-]?arms/i.test(url)) {
    return undefined;
  }
  return url;
}
