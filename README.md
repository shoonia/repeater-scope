# repeater-scope

Create handlers for the repeater items.

**`public/util.js`**

```js
/**
 * Create Repeated Item Scope
 *
 * @typedef {{
 *  _id: string;
 *  [key: string]: any;
 * }} ItemData;
 *
 * @typedef {{
 *   $item: $w.$w;
 *   itemData: ItemData;
 *   index: number;
 *   data: ItemData[];
 * }} ScopeData;
 *
 * @param {() => ItemData[]} getData
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

```

**`Page Code`**

```js
import { createScope } from 'public/util';

// Create a scope with a callback function that returns actual repeater data.
const useScope = createScope(() => {
  return $w('#repeater').data;
});

$w.onReady(() => {
  // use a dynamic event handler
  $w("#repeatedButton").onClick((event) => {
    const { $item, itemData, index, data } = useScope(event);
  });
});

// or a static event handler
export function repeatedButton_click(event) {
  const { $item, itemData, index, data } = useScope(event);
}
```

- [Code Snippet](/index.js)
- [Corvid by Wix: Event handling of Repeater Item](https://shoonia.site/event-handling-of-repeater-item/)
