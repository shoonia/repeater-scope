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
export const createQueue = (maxLength = 1) => {
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
