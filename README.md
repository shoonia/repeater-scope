# repeater-scope

[![Build for Velo by Wix](https://img.shields.io/badge/Built%20for-Velo%20by%20Wix-3638f4)](https://wix.com/velo)
[![ci build](https://github.com/shoonia/repeater-scope/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/repeater-scope/actions/workflows/ci.yml)
[![npm version](https://badgen.net/npm/v/repeater-scope)](https://www.npmjs.com/package/repeater-scope)

The utils for repeated item scope event handlers in [Velo](https://www.wix.com/velo) by Wix.

![Velo by Wix](https://static.wixstatic.com/shapes/e3b156_89be007cf73e40da8513b7cede9bf089.svg)

## How to use

You use the [Package Manager](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/packages/working-with-npm-packages) to manage the npm packages in your site.

Latest available version: [Check status](https://www.wix.com/velo/npm-modules)

![Installing repeater-scope with Velo npm Packages Manager](https://static.wixstatic.com/media/e3b156_d76c5e0dcf574ed192869d57ee9186c7~mv2.jpg)

## API

Using global select function `$w()` you can select needed elements group in Repeater Item Template.

- [`useScope(event)`](#usescope)
- [`createScope(cb)`](#createscope)
- [`getRepeater(event)`](#getrepeater) *(since v2.0.0)*
- [`updateItem(event, callback)`](#updateitem) *(since v2.0.0)*

### useScope

Automatic find the parent Repeater by emitted `event` object.

```js
import { useScope } from 'repeater-scope';

$w.onReady(() => {
  // use dynamic event handler with global selector function $w
  $w('#repeatedButton').onClick((event) => {
    const { $item, itemData, index, data } = useScope(event);

    $item('#repeatedText').text = itemData.title;
  });
});

// or a static event handler
export function repeatedButton_dblClick(event) {
  const { $item, itemData, index, data } = useScope(event);
};
```

### createScope

Create scope function with specific data array. It can be useful with state management libraries.

```js
import { createScope } from 'repeater-scope';

// Create a scope with a callback function that returns actual repeater data.
const useScope = createScope(() => {
  return $w('#repeater').data;
});

export function repeatedButton_Click(event) {
  const { $item, itemData, index, data } = useScope(event);
};
```

### getRepeater

Gets parent Repeater by event

```js
import { getRepeater } from 'repeater-scope';

$w.onReady(() => {
  $w('#repeatedButton').onClick((event) => {
    const $repeater = getRepeater(event);

    $repeater.hide();
  });
});
```

### updateItem

Update Repeated Item by event

```js
import { updateItem } from 'repeater-scope';

$w.onReady(() => {
  $w('#repeatedButton').onClick((event) => {
    updateItem(event, ($item, itemData, index) => {
      $item('#repeatedText').text = itemData.title;
    });
  });
});
```

## Syntax

```ts
function useScope(event: $w.Event): ScopeData

function createScope(event: $w.Event): ScopeData

type ScopeData = {
  $item: $w.$w;
  itemData: ItemData;
  index: number;
  data: ItemData[];
}

type ItemData = {
  _id: string;
  [key: string]: any;
}

function getRepeater(event: $w.Event): $w.Repeater

function updateItem(event: $w.Event, callback: $w.ForItemCallback): void
```

### Parameters

- **$item** - A selector function with [repeated item scope](https://www.wix.com/velo/reference/$w/repeater/introduction#$w_repeater_introduction_repeated-item-scope).
- **itemData** - The object from the repeater's `data` array that corresponds to the repeated item being created.
- **index** - The index of the `itemData` object in the `data` array.
- **data** - [A repeater's data array](https://www.wix.com/velo/reference/$w/repeater/data)

## Resources

- [Event handling of Repeater Item](https://shoonia.site/event-handling-of-repeater-item/)
- [The utils for repeated item scope event handlers](https://shoonia.site/the-utils-for-repeated-item-scope-event-handlers/)
- [Repeated item event handlers v2.0](https://shoonia.site/repeated-item-event-handlers-v2/)
- [Repeater Introduction](https://www.wix.com/velo/reference/$w/repeater/introduction)

## License

[MIT](./LICENSE)
