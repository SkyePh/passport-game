import { Passport } from '../core/models/passport.model';
import { p, wikiMap } from './passport.factory';

export const OCEANIA: Passport[] = [
  p('AU', 'Australia', 'Oceania', 'navy', 'face', 182, 'other', 'Latin', 'Canberra', 'left', ['I'], ['Uluru', 'Great Barrier Reef', 'Sydney Opera House'], 'Australian ePassports are navy with a gold crest and kangaroo-and-emu supporters.', { metro: [{ city: 'Sydney', mapUrl: wikiMap('Sydney_Metro_map.svg'), note: 'Sydney Metro is the southern hemisphere’s first fully automated metro.' }] }),
  p('FJ', 'Fiji', 'Oceania', 'navy', 'face', 87, 'other', 'Latin', 'Suva', 'left', ['I'], ['Mamanuca Islands', 'Garden of the Sleeping Giant', 'Levuka'], 'Fijian navy passports cover an archipelago of more than 300 islands.'),
  p('KI', 'Kiribati', 'Oceania', 'navy', 'face', 122, 'other', 'Latin', 'South Tarawa', 'left', ['I'], ['Christmas Island atoll', 'Phoenix Islands', 'Tarawa lagoon'], 'Kiribati is the only country in all four hemispheres, and its passport is navy.'),
  p('MH', 'Marshall Islands', 'Oceania', 'navy', 'face', 127, 'other', 'Latin', 'Majuro', 'right', ['A', 'B'], ['Bikini Atoll', 'Arno Atoll', 'Laura Beach'], 'Marshallese passports are tied to a Compact of Free Association with the United States.'),
  p('FM', 'Micronesia', 'Oceania', 'navy', 'face', 120, 'other', 'Latin', 'Palikir', 'right', ['A', 'B'], ['Nan Madol', 'Chuuk Lagoon', 'Yap stone money'], 'FSM passports cover four states spread across a huge Pacific exclusive economic zone.', { aliases: ['Federated States of Micronesia'] }),
  p('NR', 'Nauru', 'Oceania', 'navy', 'face', 86, 'other', 'Latin', 'Yaren', 'left', ['I'], ['Command Ridge', 'Anibare Bay', 'Moqua Well'], 'Nauru is the world’s smallest republic; its navy passport is seldom seen.'),
  p('NZ', 'New Zealand', 'Oceania', 'navy', 'face', 182, 'other', 'Latin', 'Wellington', 'left', ['I'], ['Milford Sound', 'Hobbiton', 'Tongariro'], 'New Zealand ePassports are navy and also used by Realm travellers in some cases.'),
  p('PW', 'Palau', 'Oceania', 'navy', 'face', 120, 'other', 'Latin', 'Ngerulmud', 'right', ['A', 'B'], ['Rock Islands', 'Jellyfish Lake', 'German lighthouse'], 'Palauan passports are navy booklets for a country of roughly 18,000 people.'),
  p('PG', 'Papua New Guinea', 'Oceania', 'navy', 'face', 84, 'other', 'Latin', 'Port Moresby', 'left', ['I'], ['Kokoda Track', 'Rabaul volcanoes', 'Tufi fjords'], 'PNG passports cover one of the most linguistically diverse countries on earth.'),
  p('WS', 'Samoa', 'Oceania', 'navy', 'face', 129, 'other', 'Latin', 'Apia', 'left', ['I'], ['To Sua Trench', 'Robert Louis Stevenson Museum', 'Afu Aau Falls'], 'Samoan navy passports switched the country from right-hand to left-hand traffic in 2009.'),
  p('SB', 'Solomon Islands', 'Oceania', 'navy', 'face', 132, 'other', 'Latin', 'Honiara', 'left', ['G', 'I'], ['Skull Island', 'Rennell Island', 'Marovo Lagoon'], 'Solomon Islands passports are navy booklets for a scattered Melanesian archipelago.'),
  p('TO', 'Tonga', 'Oceania', 'burgundy', 'face', 127, 'other', 'Latin', 'Nukuʻalofa', 'left', ['I'], ['Haʻamonga ʻa Maui', 'Mapuʻa ʻa Vaea blowholes', 'Neiafu harbour'], 'Tonga is the Pacific’s last monarchy, and its passport is burgundy rather than navy.'),
  p('TV', 'Tuvalu', 'Oceania', 'navy', 'face', 125, 'other', 'Latin', 'Funafuti', 'left', ['I'], ['Funafuti Conservation Area', 'World War II relics', 'Amatuku islet'], 'Tuvaluan passports are among the rarest; the nation has about 11,000 people.'),
  p('VU', 'Vanuatu', 'Oceania', 'burgundy', 'face', 87, 'other', 'Latin', 'Port Vila', 'left', ['C', 'G', 'I'], ['Mount Yasur', 'Champagne Beach', 'Chief Roi Mata’s Domain'], 'Vanuatu passports are burgundy and bilingual in English and French, plus Bislama inside.'),
];
