export interface ItemData {
  readonly _id: string;
  readonly [key: string]: unknown;
}

export interface ScopeData {
  readonly $item: $w.$w;
  readonly itemData?: ItemData;
  readonly index: number;
  readonly data: ItemData[];
}
