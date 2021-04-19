/**
 * Use Repeated Item Scope
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

  let repeater = event.target;

  while ((repeater = repeater.parent).type !== '$w.Repeater') {
    /**/
  }

  return {
    repeater,

    $item: $w.at(ctx),

    get itemData() {
      return repeater.data.find(find);
    },

    get index() {
      return repeater.data.findIndex(find);
    },

    get data() {
      return repeater.data;
    },
  };
};
