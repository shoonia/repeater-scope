/**
 * Use Repeater Scope
 * https://github.com/shoonia/repeater-scope
 *
 * @typedef {{
 *  _id: string;
 *  [key: string]: any;
 * }} ItemData;
 *
 * @typedef {{
 *   $item: $w.$w;
 *   itemData: ItemData;
 *   index: number;
 *   data: ItemData[];
 * }} ScopeData;
 *
 * @param {$w.Event} event
 * @returns {ScopeData}
 */
export const useScope = (event) => {
  const ctx = event.context;
  const find = (i) => i._id === ctx.itemId;

  let repeter = event.target;
  // @ts-ignore
  while ((repeter = repeter.parent).type !== '$w.Repeater');

  return {
    // @ts-ignore
    $item: $w.at(ctx),

    get itemData() {
      return repeter.data.find(find);
    },

    get index() {
      return repeter.data.findIndex(find);
    },

    get data() {
      return repeter.data;
    },
  };
};
