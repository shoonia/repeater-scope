import type { IData, IScopeData } from './types';

type TGetData = () => IData[];

export const createScope = (getData: TGetData) => (event: $w.Event): IScopeData => {
  const ctx = event.context;
  const find = (i: IData) => i._id === ctx.itemId;

  return {
    $item: $w.at(ctx),

    get itemData() {
      return getData().find(find);
    },

    get index() {
      return getData().findIndex(find);
    },

    get data() {
      return getData();
    },
  };
};
