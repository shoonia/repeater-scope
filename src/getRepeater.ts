export const getRepeater = (event: $w.Event): $w.Repeater => {
  let node: any = event.target;

  if (event.context.type !== 'COMPONENT_SCOPE') {
    console.error(`repeater-scope: "#${node.id}" outside of any $w.Repeater context`);
  }

  while ((node = node.parent).type !== '$w.Repeater') {
    /**/
  }

  return node;
};
