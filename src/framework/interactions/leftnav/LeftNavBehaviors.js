var LeftNavBehaviors = {
  PARALLAX_FADE: {
    side: {
      translate: function(sideWidth, scrollLeft) {
        return {
          x: sideWidth - .5 * scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function(sideWidth, scrollLeft) {
        return .5 + .5 * (1 - this.state.scrollLeft / sideWidth);
      }
    },
    top: {
      translate: function(sideWidth, scrollLeft) {
        return sideWidth - scrollLeft;
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    },
    content: {
      translate: function(sideWidth, scrollLeft) {
        return sideWidth - scrollLeft;
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    }
  }
};

module.exports = LeftNavBehaviors;