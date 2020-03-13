# repeater-ctx

**`public/ctx.js`**

```js
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
```

**`Page Code`**

```js
import { createCtx } from 'public/ctx';

/**
 * Create a context with a callback function that returns actual repeater data.
 */
const createHandler = createCtx(() => {
  return $w('#repeater').data;
});

/**
 * Create an event handler for an item into the repeater
 */
const clickHandler = createHandler((event, { itemId, $item, itemData, index, data }) => {
  // Event that is fired
  console.log(event);
  // Repeater item data
  console.log(
    itemId,
    $item('#button').label,
    itemData,
    index,
    data,
  );
});

$w.onReady(() => {
  // Using
  $w('#button').onClick(clickHandler);
});
```
