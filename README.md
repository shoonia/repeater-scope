# repeater-scope

Create handlers for the repeater items.

**`public/util.js`**

```js
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
```

**`Page Code`**

```js
import { createScope } from 'public/util';

// Create a scope with a callback function that returns actual repeater data.
const useScope = createScope(() => {
  return $w('#repeater').data;
});

$w.onReady(() => {
  // Using
  $w('#repeatedButton').onClick((event) => {
    const { $item, itemData, index, data } = useScope(event);

    console.log(
      $item('#repeatedContainer'),
      itemData,
      index,
      data,
    );
  });
});
```
