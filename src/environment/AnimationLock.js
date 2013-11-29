// System-wide animation lock.
// You can either explicitly acquire and release the lock (i.e. when touching)
// or you can ping it and it'll time out.

var acquires = 0;
var lastAnimated = Date.now();
var waitingComponents = null;

var UNLOCK_TIMEOUT = 200;
var POLL_INTERVAL = UNLOCK_TIMEOUT / 2;

function checkIfUnlocked() {
  if (waitingComponents) {
    if (AnimationLock.isUnlocked()) {
      for (var key in waitingComponents) {
        waitingComponents[key].forceUpdate();
      }
      waitingComponents = null;
    }
  }
}

var AnimationLock = {
  init: function() {
    setInterval(checkIfUnlocked, POLL_INTERVAL);
  },

  acquire: function() {
    acquires++;
  },

  release: function() {
    acquires--;
  },

  informAnimationFrame: function() {
    lastAnimated = Date.now();
  },

  isUnlocked: function(component) {
    var isLocked = acquires > 0 || (Date.now() - lastAnimated) < UNLOCK_TIMEOUT;

    if (!isLocked) {
      return true;
    }

    if (component) {
      if (!waitingComponents) {
        waitingComponents = {};
      }
      waitingComponents[component._rootNodeID] = component;
    }

    return false;
  }
};

module.exports = AnimationLock;