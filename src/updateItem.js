import { getRepeater } from './getRepeater';

/**
 * Update Repeated Item by event
 * https://github.com/shoonia/repeater-scope
 *
 * @param {$w.Event} event
 * @param {$w.ForItemCallback} callback
 * @returns {void}
 */
export const updateItem = (event, callback) => {
  getRepeater(event).forItems([event.context.itemId], callback);
};
