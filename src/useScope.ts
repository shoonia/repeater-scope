import type { IData, IScopeData } from './types';
import { getRepeater } from './getRepeater';

export const useScope = (event: $w.Event): IScopeData => {
  const ctx = event.context;
  const find = (i: IData) => i._id === ctx.itemId;

  return {
    $item: $w.at(ctx),

    get itemData() {
      return getRepeater(event).data.find(find);
    },

    get index() {
      return getRepeater(event).data.findIndex(find);
    },

    get data() {
      return getRepeater(event).data;
    },
  };
};
