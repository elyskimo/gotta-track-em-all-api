interface Label {
  slug: string;
  eng: string;
}

export interface CardData {
  set: string;
  number: number;
  rarity: string;
  rarityCode: string;
  imageName: string;
  label: Label;
  packs: string[];
}
