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
  const ctx = event.context;
  const find = (i) => i._id === ctx.itemId;

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
const useScope = (event) => {
  const ctx = event.context;
  const find = (i) => i._id === ctx.itemId;

  /** @type {*} */
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
const createQueue = (maxLength = 1) => {
  /** @type {boolean} */
  let isRunning = false;

  /** @type {Item[]} */
  const items = [];

  const runQueue = () => {
    if (isRunning) {
      return;
    }

    const item = items.shift();

    if (typeof item === 'function') {
      isRunning = true;

      Promise.resolve(item())
        .then(() => {}, () => {})
        .then(() => {
          isRunning = false;
          runQueue();
        });
    }
  };

  return (item) => {
    if (items.length >= maxLength) {
      items.pop();
    }

    items.push(item);
    runQueue();
  };
};

export { createQueue, createScope, useScope };
