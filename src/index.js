export const createCtx = (getData) => (callback) => (event) => {
  const itemId = event.context.itemId;
  const find = (i) => i._id === itemId;

  callback(event, {
    $item: $w.at(event.context),

    get itemData() {
      return getData().find(find);
    },

    get index() {
      return getData().findIndex(find);
    },

    get data() {
      return getData();
    },
  });
};
