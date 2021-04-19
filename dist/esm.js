/**
 * Create Repeated Item Scope
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
 * @param {() => ItemData[]} getData
 * @returns {(event: $w.Event) => ScopeData}
 */
const createScope = (getData) => (event) => {
  const itemId = event.context.itemId;
  const find = (i) => i._id === itemId;

  return {
    $item: $w.at(event.context),

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
const useScope = (event) => {
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

export { createScope, useScope };
