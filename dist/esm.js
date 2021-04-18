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
    // @ts-ignore
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
const useScope = (event) => {
  const ctx = event.context;
  const find = (i) => i._id === ctx.itemId;

  let repeter = event.target;

  // @ts-ignore
  while ((repeter = repeter.parent).type !== '$w.Repeater') {
    /**/
  }

  return {
    repeter,

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

export { createScope, useScope };
