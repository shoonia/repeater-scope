/**
 * Create handlers for the repeater items.
 *
 * @typedef {{
        _id: string;
        [key: string]: any;
    }} DataItem;
 *
 * @typedef {{
      $item: $w.$w;
      itemData: DataItem;
      index: number;
      data: DataItem[];
    }} ScopeData;
 *
 * @param {() => DataItem[]} getData
 * @returns {(event: $w.Event) => ScopeData}
 */
export const createScope = (getData) => (event) => {
  const itemId = event.context.itemId;
  const find = (i) => i._id === itemId;

  return {
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
  };
};
