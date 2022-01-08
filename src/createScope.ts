import type { ItemData, ScopeData } from './types';

type TGetData = () => ItemData[];

export const createScope = (getData: TGetData) => (event: $w.Event): ScopeData => {
  const ctx = event.context;
  const find = (i: ItemData) => i._id === ctx.itemId;

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
