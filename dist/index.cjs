'use strict';

var createScope = function createScope(getData) {
  return function (event) {
    var ctx = event.context;

    var find = function find(i) {
      return i._id === ctx.itemId;
    };

    return {
      $item: $w.at(ctx),

      get itemData() {
        return getData().find(find);
      },

      get index() {
        return getData().findIndex(find);
      },

      get data() {
        return getData();
      }

    };
  };
};

var getRepeater = function getRepeater(event) {
  var node = event.target;

  if (event.context.type !== 'COMPONENT_SCOPE') {
    console.error("repeater-scope: \"#" + node.id + "\" outside of any $w.Repeater context");
  }

  while ((node = node.parent).type !== '$w.Repeater') {
    /**/
  }

  return node;
};

var useScope = function useScope(event) {
  var ctx = event.context;

  var find = function find(i) {
    return i._id === ctx.itemId;
  };

  return {
    $item: $w.at(ctx),

    get itemData() {
      return getRepeater(event).data.find(find);
    },

    get index() {
      return getRepeater(event).data.findIndex(find);
    },

    get data() {
      return getRepeater(event).data;
    }

  };
};

var updateItem = function updateItem(event, callback) {
  getRepeater(event).forItems([event.context.itemId], callback);
};

exports.createScope = createScope;
exports.getRepeater = getRepeater;
exports.updateItem = updateItem;
exports.useScope = useScope;
