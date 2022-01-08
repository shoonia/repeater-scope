import { getRepeater } from './getRepeater';

/**
 * Update Repeated item by event
 * https://github.com/shoonia/repeater-scope
 *
 * @param {$w.Event} event
 * @param {$w.ForItemCallback} cb
 * @returns {void}
 */
export const updateItem = (event, cb) => {
  getRepeater(event).forItems([event.context.itemId], cb);
};
