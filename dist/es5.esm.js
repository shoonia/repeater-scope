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
 * Use Repeated Item Scope
 * https://github.com/shoonia/repeater-scope
 *
 * @typedef {{
 *  _id: string;
 *  [key: string]: any;
 * }} ItemData;
 *
 * @typedef {{
 *   repeater: $w.Repeater;
 *   $item: $w.$w;
 *   itemData: ItemData;
 *   index: number;
 *   data: ItemData[];
 * }} ScopeData;
 *
 * @param {$w.Event} event
 * @returns {ScopeData}
 */

var useScope = function useScope(event) {
  var ctx = event.context;

  var find = function find(i) {
    return i._id === ctx.itemId;
  };
  /** @type {*} */

  var repeater = event.target;

  while ((repeater = repeater.parent).type !== '$w.Repeater') {
    /**/
  }

  return {
    repeater: repeater,
    $item: $w.at(ctx),

    get itemData() {
      return repeater.data.find(find);
    },

    get index() {
      return repeater.data.findIndex(find);
    },

    get data() {
      return repeater.data;
    }

  };
};
/**
 * Create a promise queue
 *
 * @example
 * ```
 * const queue = createQueue()
 * const $element = $w('#element');
 *
 * $w('#block')
 *   .onMouseIn(() => {
 *     queue(() => $element.show());
 *  })
 *   .onMouseOut(() => {
 *     queue(() => $element.hide());
 *  });
 * ```
 *
 * @typedef {() => Promise<unknown>} Item
 *
 * @param {number} [maxLength] - max count items in the queue
 * @returns {(item: Item) => void}
 */

var createQueue = function createQueue(maxLength) {
  if (maxLength === void 0) {
    maxLength = 1;
  }

  /** @type {boolean} */
  var isRunning = false;
  /** @type {Item[]} */

  var items = [];

  var runQueue = function runQueue() {
    if (isRunning) {
      return;
    }

    var item = items.shift();

    if (typeof item === 'function') {
      isRunning = true;
      Promise.resolve(item()).then(function () {}, function () {}).then(function () {
        isRunning = false;
        runQueue();
      });
    }
  };

  return function (item) {
    if (items.length >= maxLength) {
      items.pop();
    }

    items.push(item);
    runQueue();
  };
};

export { createQueue, createScope, useScope };
