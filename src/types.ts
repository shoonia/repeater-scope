export interface IData {
  readonly _id: string;
  readonly [key: string]: unknown;
}

export interface IScopeData {
  readonly $item: $w.$w;
  readonly itemData?: IData;
  readonly index: number;
  readonly data: IData[];
}
