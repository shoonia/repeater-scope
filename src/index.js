export const createCtx = (getData) => (cb) => (event) => {
  const itemId = event.context.itemId;
  const find = (i) => i._id === itemId;

  cb(event, {
    itemId,

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
