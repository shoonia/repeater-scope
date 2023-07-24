const createScope = getData => event => {
  const ctx = event.context;
  const find = i => i._id === ctx.itemId;
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

const getRepeater = event => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node = event.target;
  if (event.context.type !== 'COMPONENT_SCOPE') {
    console.error(`repeater-scope: "#${node.id}" outside of any $w.Repeater context`);
  }
  while ((node = node.parent).type !== '$w.Repeater') {
    /**/
  }
  return node;
};

const useScope = event => {
  const ctx = event.context;
  const find = i => i._id === ctx.itemId;
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

const updateItem = (event, callback) => {
  getRepeater(event).forItems([event.context.itemId], callback);
};

export { createScope, getRepeater, updateItem, useScope };
