# repeater-scope

The utils for Repeater scope event handlers in Velo by Wix.

## useScope

**`Page Code`**

```js
import { useScope } from 'repeater-scope';

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

## createScope

**`Page Code`**

```js
import { createScope } from 'repeater-scope';

// Create a scope with a callback function that returns actual repeater data.
const useScope = createScope(() => {
  return $w('#repeater').data;
});

export function repeatedButton_dblClick(event) {
  const { $item, itemData, index, data } = useScope(event);
}
```

- [Velo by Wix: Event handling of Repeater Item](https://shoonia.site/event-handling-of-repeater-item/)

## License

[MIT](./LICENSE)
