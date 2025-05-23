interface SetLabel {
  en: string;
}

export interface SetData {
  code: string;
  releaseDate: string;
  count: number;
  label: SetLabel;
  packs: string[];
}
