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
var createScope = function createScope(getData) {
  return function (event) {
    var ctx = event.context;

    var find = function find(i) {
      return i._id === ctx.itemId;
    };

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
      }

    };
  };
};

/**
 * Get parent Repeater by event
 * https://github.com/shoonia/repeater-scope
 *
 * @param {$w.Event} event
 * @returns {$w.Repeater}
 */
var getRepeater = function getRepeater(event) {
  /** @type {*} */
  var node = event.target;

  while ((node = node.parent).type !== '$w.Repeater') {
    /**/
  }

  return node;
};

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

var useScope = function useScope(event) {
  var ctx = event.context;

  var find = function find(i) {
    return i._id === ctx.itemId;
  };

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
    }

  };
};

/**
 * Update Repeated Item by event
 * https://github.com/shoonia/repeater-scope
 *
 * @param {$w.Event} event
 * @param {$w.ForItemCallback} callback
 * @returns {void}
 */

var updateItem = function updateItem(event, callback) {
  getRepeater(event).forItems([event.context.itemId], callback);
};

export { createScope, getRepeater, updateItem, useScope };
