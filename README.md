# repeater-ctx

Create handlers for the repeater items.

**`public/ctx.js`**

```js
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
```

**`Page Code`**

```js
import { createCtx } from 'public/ctx';

/**
 * Create a context with a callback function that returns actual repeater data.
 */
const connectHandler = createCtx(() => {
  return $w('#repeater').data;
});

/**
 * Connect callback handler to repeater data scope
 */
const clickHandler = connectHandler((event, { $item, itemData, index, data }) => {
  // Event that is fired
  console.log(event);
  // Repeater item data
  console.log(
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
