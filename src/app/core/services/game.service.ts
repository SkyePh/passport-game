import { Injectable, computed, signal } from '@angular/core';
import { PASSPORTS } from '../../data/passports';
import {
  GuessResult,
  MAX_GUESSES,
  Passport,
  RoundStatus,
} from '../models/passport.model';
import { comparePassports } from './compare';

const SEEN_KEY = 'cleared-seen';
const DARK_KEY = 'cleared-dark';
const HOWTO_KEY = 'cleared-howto';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly target = signal<Passport>(PASSPORTS[0]);
  readonly guesses = signal<GuessResult[]>([]);
  readonly status = signal<RoundStatus>('playing');
  readonly seenIds = signal<string[]>(this.readSeen());
  readonly dark = signal(this.readDark());
  readonly showHowTo = signal(!this.readHowToSeen());
  readonly poolResetNotice = signal(false);

  readonly remaining = computed(() => MAX_GUESSES - this.guesses().length);
  readonly progress = computed(() => (this.guesses().length / MAX_GUESSES) * 100);
  readonly roster = PASSPORTS;

  constructor() {
    this.applyDark(this.dark());
    this.startRound();
  }

  submit(passport: Passport): void {
    if (this.status() !== 'playing') {
      return;
    }
    if (this.guesses().some((g) => g.passport.id === passport.id)) {
      return;
    }

    const result = comparePassports(passport, this.target());
    const nextGuesses = [result, ...this.guesses()];
    this.guesses.set(nextGuesses);

    if (result.correct) {
      this.status.set('won');
      this.markSeen(this.target().id);
      return;
    }
    if (nextGuesses.length >= MAX_GUESSES) {
      this.status.set('lost');
      this.markSeen(this.target().id);
    }
  }

  playAgain(): void {
    this.startRound();
  }

  resetPool(): void {
    this.seenIds.set([]);
    this.writeSeen([]);
    this.poolResetNotice.set(false);
    this.startRound();
  }

  toggleDark(enabled: boolean): void {
    this.dark.set(enabled);
    this.applyDark(enabled);
    localStorage.setItem(DARK_KEY, enabled ? '1' : '0');
  }

  dismissHowTo(): void {
    this.showHowTo.set(false);
    localStorage.setItem(HOWTO_KEY, '1');
  }

  openHowTo(): void {
    this.showHowTo.set(true);
  }

  private startRound(): void {
    this.poolResetNotice.set(false);
    const seen = new Set(this.seenIds());
    let pool = PASSPORTS.filter((p) => !seen.has(p.id));

    if (pool.length === 0) {
      this.poolResetNotice.set(true);
      this.seenIds.set([]);
      this.writeSeen([]);
      pool = [...PASSPORTS];
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    this.target.set(pick);
    this.guesses.set([]);
    this.status.set('playing');
  }

  private markSeen(id: string): void {
    const next = Array.from(new Set([...this.seenIds(), id]));
    this.seenIds.set(next);
    this.writeSeen(next);
  }

  private readSeen(): string[] {
    try {
      const raw = localStorage.getItem(SEEN_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private writeSeen(ids: string[]): void {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  }

  private readDark(): boolean {
    const stored = localStorage.getItem(DARK_KEY);
    if (stored === '1') {
      return true;
    }
    if (stored === '0') {
      return false;
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private applyDark(enabled: boolean): void {
    document.documentElement.classList.toggle('p-dark', enabled);
  }

  private readHowToSeen(): boolean {
    return localStorage.getItem(HOWTO_KEY) === '1';
  }
}
