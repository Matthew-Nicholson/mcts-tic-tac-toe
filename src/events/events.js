"use strict";
exports.__esModule = true;
exports.eventHandler = void 0;
function createEventHandler() {
    var events = {};
    var handler = {
        publish: function (event, data) {
            if (!events[event]) {
                return;
            }
            else {
                events[event].forEach(function (callback) { return callback(data); });
            }
        },
        subscribe: function (event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        },
        unsubscribe: function (event, callback) {
            if (!events[event])
                return;
            events[event] = events[event].filter(function (cb) { return cb !== callback; });
        },
        subscribeOnce: function (event, callback) {
            var once = function (data) {
                callback(data);
                handler.unsubscribe(event, once);
            };
            handler.subscribe(event, once);
        }
    };
    return handler;
}
exports.eventHandler = createEventHandler();
