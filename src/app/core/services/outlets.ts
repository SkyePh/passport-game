export interface OutletDisplay {
  type: string;
  label: string;
  icon: string;
}

const ICONS: Record<string, string> = {
  A: 'socketB.png',
  B: 'socketB.png',
  C: 'socketF.png',
  D: 'socketDoM.png',
  E: 'socketE.png',
  F: 'socketF.png',
  G: 'socketG.png',
  H: 'socketH.png',
  I: 'socketI.png',
  J: 'socketJ.png',
  K: 'socketK.png',
  L: 'socketL.png',
  M: 'socketDoM.png',
  N: 'socketJ.png',
  O: 'socketUNIV.png',
};

export function outletsFor(types: string[]): OutletDisplay[] {
  return types
    .filter((type) => /^[A-O]$/i.test(type))
    .map((type) => type.toUpperCase())
    .map((type) => ({
      type,
      label: `Type ${type}`,
      icon: ICONS[type] ?? 'socketUNIV.png',
    }));
}
