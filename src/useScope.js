import { getRepeater } from './getRepeater';

/**
 * Use Repeated Item Scope
 * https://github.com/shoonia/repeater-scope
 *
 * @typedef {{
 *  _id: string;
 *  [key: string]: any;
 * }} IData;
 *
 * @typedef {{
 *   $item: $w.$w;
 *   itemData: IData;
 *   index: number;
 *   data: IData[];
 * }} IScopeData;
 *
 * @param {$w.Event} event
 * @returns {IScopeData}
 */
export const useScope = (event) => {
  const ctx = event.context;
  const find = (i) => i._id === ctx.itemId;

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
