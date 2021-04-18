# repeater-scope

Create handlers for the repeater items.

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
export function repeatedButton_dblClick(event) {
  const { $item, itemData, index, data } = useScope(event);
}
```

- [Velo by Wix: Event handling of Repeater Item](https://shoonia.site/event-handling-of-repeater-item/)

## MIT
