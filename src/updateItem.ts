import { getRepeater } from './getRepeater';

export const updateItem = (
  event: $w.Event,
  callback: $w.ForItemCallback
): void => {
  getRepeater(event).forItems([event.context.itemId], callback);
};
