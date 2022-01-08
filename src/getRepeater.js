/**
 * Get parent Repeater by event
 * https://github.com/shoonia/repeater-scope
 *
 * @param {$w.Event} event
 * @returns {$w.Repeater}
 */
export const getRepeater = (event) => {
  /** @type {*} */
  let node = event.target;

  if (event.context.type !== 'COMPONENT_SCOPE') {
    console.error(`repeater-scope: "#${node.id}" out of any $w.Repeater context`);
  }

  while ((node = node.parent).type !== '$w.Repeater') {
    /**/
  }

  return node;
};
