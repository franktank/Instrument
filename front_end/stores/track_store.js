var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var TrackStore = new Store(Dispatcher);
var _tracks = [];

TrackStore._onDispatch = function(payload) {
  switch (payload.actionType) {
    case "add":
      TrackStore.addTrack(payload.track);
      break;

    case "remove":
      TrackStore.addTrack(payload.track);
      break;
  }
};

module.exports = TrackStore;
