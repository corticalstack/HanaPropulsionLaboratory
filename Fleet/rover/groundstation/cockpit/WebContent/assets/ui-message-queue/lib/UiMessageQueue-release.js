// Generated by CoffeeScript 1.6.3
(function() {
  var AlertDisplay, DomDisplay, FifoQueue, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.AlertDisplay = (function() {
    "use strict";
    function AlertDisplay() {}

    AlertDisplay.prototype.displayMessage = function(message) {
      return alert(message);
    };

    return AlertDisplay;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.DomDisplay = (function() {
    "use strict";
    function DomDisplay(domElementId) {
      this.displayMessage = __bind(this.displayMessage, this);
      if (!(this._domElement = root.document.getElementById(domElementId))) {
        throw new Error("Error: cannot find Element Id: '" + domElementId + "'.");
      }
    }

    DomDisplay.prototype.displayMessage = function(message) {
      return this._domElement.innerHTML = message;
    };

    return DomDisplay;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.FifoQueue = (function() {
    "use strict";
    function FifoQueue() {
      this._stack = [];
    }

    FifoQueue.prototype.push = function(obj) {
      if (obj !== null) {
        return this._stack.push(obj);
      }
    };

    FifoQueue.prototype.getCount = function() {
      return this._stack.length;
    };

    FifoQueue.prototype.hasItems = function() {
      return this.getCount() > 0;
    };

    FifoQueue.prototype.getItem = function() {
      var item;
      if (!this.hasItems()) {
        throw new Error("Queue empty, ensure not empty by using FifoQueue.hasItems().");
      }
      item = this._stack[0];
      this._stack.shift();
      return item;
    };

    return FifoQueue;

  })();

  /*
  UiMessageQueue - a User Message Queue Javascript implementation
  (c) 2014 Rob Murray
  @see https://github.com/rob-murray/ui-message-queue
  UiMessageQueue may be freely distributed under the MIT license
  */


  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  AlertDisplay = root.AlertDisplay || require('../lib/AlertDisplay').AlertDisplay;

  DomDisplay = root.DomDisplay || require('../lib/DomDisplay').DomDisplay;

  FifoQueue = root.FifoQueue || require('../lib/FifoQueue').FifoQueue;

  root.UiMessageQueue = (function() {
    "use strict";
    UiMessageQueue.DEFAULT_DELAY = 1000;

    UiMessageQueue.DEFAULT_EMPTY_DISPLAY_MESSAGE = "";

    function UiMessageQueue(args) {
      this._processMessageQueue = __bind(this._processMessageQueue, this);
      this._displayMessage = __bind(this._displayMessage, this);
      this.push = __bind(this.push, this);
      if (!args) {
        throw new Error("Missing arguments. UiMessageQueue requires arguments to run.");
      }
      this._displayer = new AlertDisplay();
      this._delay = UiMessageQueue.DEFAULT_DELAY;
      this._emptyDisplayString = UiMessageQueue.DEFAULT_EMPTY_DISPLAY_MESSAGE;
      this._messageStack = new FifoQueue();
      this._setOptions(args);
      this._triggered = false;
    }

    UiMessageQueue.prototype._setOptions = function(options) {
      var e;
      if (options.emptyDisplayString) {
        if (!(typeof options.emptyDisplayString === "string")) {
          throw new Error("Invalid argument: emptyDisplayString is not a String");
        }
        this._emptyDisplayString = options.emptyDisplayString;
      }
      if (options.delay) {
        if (!isFinite(options.delay)) {
          throw new Error("Invalid argument: delay is not numeric");
        }
        this._delay = options.delay;
      }
      if (options.outputElementId) {
        try {
          return this._displayer = new DomDisplay(options.outputElementId);
        } catch (_error) {
          e = _error;
          return this._displayer = new AlertDisplay();
        }
      }
    };

    UiMessageQueue.prototype.push = function(message) {
      if (typeof message === "string") {
        this._messageStack.push(message);
      }
      if (this._triggered === false) {
        return this._processMessageQueue();
      }
    };

    UiMessageQueue.prototype._displayMessage = function(message) {
      return this._displayer.displayMessage(message);
    };

    UiMessageQueue.prototype._processMessageQueue = function() {
      var self;
      if (this._messageStack.hasItems()) {
        self = this;
        if (this._messageStack.getCount() === 1 && this._triggered === false) {
          this._displayMessage(this._messageStack.getItem());
        }
        setTimeout((function(self) {
          if (self._messageStack.hasItems()) {
            self._displayMessage(self._messageStack.getItem());
          } else {
            self._displayMessage(self._emptyDisplayString);
          }
          return self._processMessageQueue();
        }), self._delay, this);
        return this._triggered = true;
      } else {
        return this._triggered = false;
      }
    };

    return UiMessageQueue;

  })();

}).call(this);
