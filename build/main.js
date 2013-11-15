/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function require(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, require);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// The bundle contains no chunks. A empty chunk loading function.
/******/ 	require.e = function requireEnsure(_, callback) {
/******/ 		callback.call(null, this);
/******/ 	};
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	require.modules = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	require.cache = installedModules;
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return require(0);
/******/ })
/************************************************************************/
/******/ ({
/******/ // __webpack_public_path__
/******/ c: "",

/***/ 0:
/***/ function(module, exports, require) {

	var React = require(4);
	var ReactHack = require(5);
	var GlassPage = require(1);
	var HomePage = require(2);
	var ViewerPage = require(3);

	React.initializeTouchEvents(true);

	ReactHack.start({
	  '': HomePage,
	  'glass': GlassPage,
	  ':username': ViewerPage,
	});

/***/ },

/***/ 1:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	// Implicit require of Scroller from Zynga

	var GlassContainer = require(6);
	var Message = require(7);
	var StaticContainer = require(8);
	var StyleKeys = require(140);

	require(24);

	var isIPhone5 = require(9);

	var IS_IPHONE_5 = isIPhone5();

	var COLORS = ['red', 'green', 'blue'];
	var HEADER_HEIGHT = 40; // keep in sync w/ GlassPage.css

	var GlassPage = React.createClass({displayName: 'GlassPage',
	  getInitialState: function() {
	    return {scrollTop: 0, force: false};
	  },

	  handleClick: function() {
	    this.setState({force: true});
	  },

	  componentWillMount: function() {
	    this.scroller = new Scroller(this.handleScroll);
	    this.configured = false;
	  },

	  componentDidMount: function() {
	    this.configure();
	  },

	  componentDidUpdate: function() {
	    this.configure();
	  },

	  configure: function() {
	    if (this.configured || (!IS_IPHONE_5 && !this.state.force)) {
	      return;
	    }
	    this.configured = true;
	    var node = this.refs.content.getDOMNode();
	    this.scroller.setDimensions(
	      this.getDOMNode().clientWidth,
	      this.getDOMNode().clientHeight,
	      node.clientWidth,
	      node.clientHeight
	    );
	  },

	  handleScroll: function(left, top, zoom) {
	    this.setState({scrollTop: top});
	  },

	  handleTouchStart: function(e) {
	    this.scroller.doTouchStart(e.touches, e.timeStamp);
	    e.preventDefault();
	  },

	  handleTouchMove: function(e) {
	    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
	    e.preventDefault();
	  },

	  handleTouchEnd: function(e) {
	    this.scroller.doTouchEnd(e.timeStamp);
	    e.preventDefault();
	  },

	  render: function() {
	    if (!IS_IPHONE_5 && !this.state.force) {
	      return (
	        Message(null, 
	" This demo peforms best on at least an iPhone 5 and iOS 7.",React.DOM.br(null ),
	          React.DOM.a( {href:"javascript:;", onClick:this.handleClick}, "Click here to live dangerously"),". "        )
	      );
	    }

	    var children = [];
	    for (var i = 0; i < 100; i++) {
	      children.push(
	        React.DOM.li( {key:i, style:{color: COLORS[i % COLORS.length]}}, 
	" Item ", i,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "        )
	      );
	    }

	    var style = {};
	    style[StyleKeys.TRANSFORM] = 'translate3d(0, ' + (-this.state.scrollTop) + 'px, 0)';

	    // TODO: we can make this positioning significantly less lame
	    // by measuring the DOM but I'm not sure we want to rely that
	    // staying up-to-date, so for now make it explicit.
	    var maxHeight = document.body.clientHeight;

	    var overlays = {
	      header: {
	        left: 0,
	        top: 0,
	        width: '100%',
	        height: HEADER_HEIGHT,
	        style: {borderBottom: '1px solid rgba(10, 10, 10, 0.1)'},
	        children: React.DOM.div( {className:"GlassPage-header"}, "This is the header")
	      },
	      footer: {
	        left: 0,
	        top: maxHeight - HEADER_HEIGHT,
	        width: '100%',
	        height: HEADER_HEIGHT,
	        style: {borderTop: '1px solid rgba(10, 10, 10, 0.1)'},
	        children: React.DOM.div( {className:"GlassPage-footer"}, "This is the footer")
	      }
	    };

	    var contentBox = {
	      left: 0,
	      top: HEADER_HEIGHT,
	      width: '100%',
	      height: maxHeight - 2 * HEADER_HEIGHT,
	      style: {backgroundColor: '#fcfcfc'}
	    };

	    return (
	      GlassContainer(
	        {style:{background: 'white', border: '1px solid rgba(10, 10, 10, 0.1)', width: '100%', height: maxHeight},
	        overlays:overlays,
	        content:contentBox,
	        onTouchStart:this.handleTouchStart,
	        onTouchMove:this.handleTouchMove,
	        onTouchEnd:this.handleTouchEnd}, 
	        React.DOM.div( {style:style, ref:"content"}, 
	          StaticContainer(null, 
	            React.DOM.ul(null, children)
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = GlassPage;

/***/ },

/***/ 2:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	require(26);

	var HomePage = React.createClass({displayName: 'HomePage',
	  render: function() {
	    return (
	      React.DOM.div( {className:"HomePage"}, 
	        React.DOM.h1(null, "What do ya want?"),
	        React.DOM.p(null, React.DOM.a( {href:"#glass"}, "Frosted glass")),
	        React.DOM.p(null, React.DOM.a( {href:"#justinbieber"}, "The Justin Bieber Experience"))
	      )
	    );
	  }
	});

	module.exports = HomePage;

/***/ },

/***/ 3:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);
	var Message = require(7);
	var Viewer = require(10);

	var isIPhone5 = require(9);

	var IS_IPHONE_5 = isIPhone5();

	var NUM_IMAGES = 10;

	var START_INDEX = 5;

	var ViewerPage = React.createClass({displayName: 'ViewerPage',
	  getInitialState: function() {
	    return {data: null, width: 0, height: 0, force: false};
	  },

	  handleClick: function() {
	    this.setState({force: true});
	  },

	  getUsername: function() {
	    return this.props.routeParams[0] || 'JustinBieber';
	  },

	  componentDidMount: function() {
	    this.setState({
	      width: document.documentElement.clientWidth,
	      height: document.documentElement.clientHeight
	    });

	    $.getJSON(
	      'http://graph.facebook.com/' + this.getUsername() + '/photos?fields=name,source&limit=100',
	      function(data) {
	        this.setState({data: data.data.slice(START_INDEX, START_INDEX + NUM_IMAGES)});
	      }.bind(this)
	    );
	  },

	  render: function() {
	    if (!IS_IPHONE_5 && !this.state.force) {
	      return (
	        Message(null, 
	" This demo peforms best on at least an iPhone 5 and iOS 7.",React.DOM.br(null ),
	          React.DOM.a( {href:"javascript:;", onClick:this.handleClick}, "Click here to live dangerously"),". "        )
	      );
	    }

	    if (!this.state.data) {
	      return Message(null, "Loading...");
	    }

	    return (
	      Viewer(
	        {width:this.state.width,
	        height:this.state.height,
	        images:this.state.data}
	      )
	    );
	  }
	});

	module.exports = ViewerPage;

/***/ },

/***/ 4:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule React
	 */

	"use strict";

	var ReactComponent = require(11);
	var ReactCompositeComponent = require(12);
	var ReactCurrentOwner = require(13);
	var ReactDOM = require(14);
	var ReactDOMComponent = require(15);
	var ReactDefaultInjection = require(16);
	var ReactInstanceHandles = require(17);
	var ReactMount = require(18);
	var ReactMultiChild = require(19);
	var ReactPerf = require(20);
	var ReactPropTypes = require(21);
	var ReactServerRendering = require(22);
	var ReactTextComponent = require(23);

	ReactDefaultInjection.inject();

	var React = {
	  DOM: ReactDOM,
	  PropTypes: ReactPropTypes,
	  initializeTouchEvents: function(shouldUseTouch) {
	    ReactMount.useTouchEvents = shouldUseTouch;
	  },
	  createClass: ReactCompositeComponent.createClass,
	  constructAndRenderComponent: ReactMount.constructAndRenderComponent,
	  constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
	  renderComponent: ReactPerf.measure(
	    'React',
	    'renderComponent',
	    ReactMount.renderComponent
	  ),
	  renderComponentToString: ReactServerRendering.renderComponentToString,
	  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
	  unmountAndReleaseReactRootNode: ReactMount.unmountAndReleaseReactRootNode,
	  isValidClass: ReactCompositeComponent.isValidClass,
	  isValidComponent: ReactComponent.isValidComponent,
	  __internals: {
	    Component: ReactComponent,
	    CurrentOwner: ReactCurrentOwner,
	    DOMComponent: ReactDOMComponent,
	    InstanceHandles: ReactInstanceHandles,
	    Mount: ReactMount,
	    MultiChild: ReactMultiChild,
	    TextComponent: ReactTextComponent
	  }
	};

	// Version exists only in the open-source version of React, not in Facebook's
	// internal version.
	React.version = '0.5.0';

	module.exports = React;


/***/ },

/***/ 5:
/***/ function(module, exports, require) {

	var ReactHack = require(28);
	var FetchingMixin = require(29);

	ReactHack.FetchingMixin = FetchingMixin;

	module.exports = ReactHack;

/***/ },

/***/ 6:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	var GlassViewport = require(31);
	var StyleKeys = require(140);


	function shallowCopy(x) {
	  var y = {};
	  for (var z in x) {
	    if (!x.hasOwnProperty(z)) {
	      continue;
	    }
	    y[z] = x[z];
	  }
	  return y;
	}

	function cloneChildren(children) {
	  if (React.isValidComponent(children)) {
	    return cloneComponent(children);
	  } else if (Array.isArray(children)) {
	    return children.map(cloneComponent);
	  } else if (!children) {
	    return null;
	  } else {
	    var r = {};
	    for (var k in children) {
	      if (!children.hasOwnProperty(k)) {
	        continue;
	      }
	      r[k] = cloneComponent(children[k]);
	    }
	    return r;
	  }
	}

	function cloneComponent(component) {
	  if (!React.isValidComponent(component)) {
	    // string or something
	    return component;
	  }
	  var newInstance = new component.constructor();
	  var newChildren = cloneChildren(component.props.children);
	  var newProps = shallowCopy(component.props);
	  delete newProps.children;
	  newInstance.construct(newProps, newChildren);
	  return newInstance;
	}

	var GlassContainer = React.createClass({displayName: 'GlassContainer',
	  getDefaultProps: function() {
	    return {style: {}, overlays: {}};
	  },

	  render: function() {
	    var viewports = [
	      GlassViewport(
	        {key:"content",
	        glassContent:this.props.children,
	        left:this.props.content.left,
	        top:this.props.content.top,
	        width:this.props.content.width,
	        height:this.props.content.height,
	        style:this.props.content.style}
	      )
	    ];

	    for (var key in this.props.overlays) {
	      var overlay = this.props.overlays[key];

	      // TODO: this is a hack!
	      var clonedChildren = cloneChildren(this.props.children);

	      clonedChildren.props = shallowCopy(clonedChildren.props);
	      clonedChildren.props.style = shallowCopy(clonedChildren.props.style || {});
	      clonedChildren.props.style[StyleKeys.FILTER] = 'blur(5px)';

	      viewports.push(
	        GlassViewport(
	          {key:key,
	          glassContent:clonedChildren,
	          left:overlay.left,
	          top:overlay.top,
	          width:overlay.width,
	          height:overlay.height,
	          style:overlay.style}, 
	          overlay.children
	        )
	      );
	    }

	    return this.transferPropsTo(
	      React.DOM.div( {style:{position: 'relative', overflow: 'hidden'}}, 
	        viewports
	      )
	    );
	  }
	});

	module.exports = GlassContainer;

/***/ },

/***/ 7:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	require(32);

	var Message = React.createClass({displayName: 'Message',
	  render: function() {
	    return React.DOM.div( {className:"Message"}, this.props.children);
	  }
	});

	module.exports = Message;

/***/ },

/***/ 8:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	var StaticContainer = React.createClass({displayName: 'StaticContainer',
	  shouldComponentUpdate: function() {
	    return false;
	  },
	  render: function() {
	    return this.props.children;
	  }
	});

	module.exports = StaticContainer;

/***/ },

/***/ 9:
/***/ function(module, exports, require) {

	// In the future if we use server rendering we'll need to defer this to the
	// function call or something since it references window.

	var IS_IPHONE_5 = Math.max(
	  window.screen.height,
	  window.screen.width
	) * window.devicePixelRatio === 1136 &&
	  window.navigator.userAgent.indexOf('iPhone OS 7') > -1;

	function isIPhone5() {
	  return IS_IPHONE_5;
	}

	module.exports = isIPhone5;

/***/ },

/***/ 10:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	// Implicit require of Scroller from Zynga
	var ImageCardContainer = require(34);
	var React = require(4);

	require(35);

	var Viewer = React.createClass({displayName: 'Viewer',
	  componentWillMount: function() {
	    this.scroller = new Scroller(this.handleScroll, {
	      snapping: true
	    });
	  },

	  componentDidMount: function() {
	    this.scroller.setDimensions(
	      this.props.width,
	      this.props.height,
	      this.props.width * this.props.images.length,
	      this.props.height
	    );
	    this.scroller.setSnapSize(this.props.width, this.props.height);
	  },

	  getInitialState: function() {
	    return {left: 0};
	  },

	  handleScroll: function(left, top, zoom) {
	    this.setState({left: left});
	  },

	  handleTouchStart: function(e) {
	    this.scroller.doTouchStart(e.touches, e.timeStamp);
	    e.preventDefault();
	  },

	  handleTouchMove: function(e) {
	    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
	    e.preventDefault();
	  },

	  handleTouchEnd: function(e) {
	    this.scroller.doTouchEnd(e.timeStamp);
	    e.preventDefault();
	  },

	  render: function() {
	    var images = this.props.images.map(function(image, i) {
	      if (this.state.left < (i - 1) * this.props.width || this.state.left > (i + 1) * this.props.width) {
	        return null;
	      }

	      // Find the highest resolution image
	      return (
	        ImageCardContainer(
	          {left:this.state.left,
	          key:i,
	          index:i,
	          url:image.source,
	          width:this.props.width,
	          height:this.props.height,
	          caption:image.name || 'Amazing Justin Bieber photo #' + (i + 1)}
	        )
	      );
	    }, this);

	    return (
	      React.DOM.div(
	        {className:"Viewer",
	        style:{width: this.props.width, height: this.props.height},
	        onTouchStart:this.handleTouchStart,
	        onTouchMove:this.handleTouchMove,
	        onTouchEnd:this.handleTouchEnd}, 
	        images
	      )
	    );
	  }
	});

	module.exports = Viewer;

/***/ },

/***/ 11:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponent
	 */

	"use strict";

	var ReactComponentEnvironment = require(37);
	var ReactCurrentOwner = require(13);
	var ReactOwner = require(38);
	var ReactUpdates = require(39);

	var invariant = require(40);
	var keyMirror = require(41);
	var merge = require(42);

	/**
	 * Every React component is in one of these life cycles.
	 */
	var ComponentLifeCycle = keyMirror({
	  /**
	   * Mounted components have a DOM node representation and are capable of
	   * receiving new props.
	   */
	  MOUNTED: null,
	  /**
	   * Unmounted components are inactive and cannot receive new props.
	   */
	  UNMOUNTED: null
	});

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children.
	 * This allows us to keep track of children between updates.
	 */

	var ownerHasWarned = {};

	/**
	 * Warn if the component doesn't have an explicit key assigned to it.
	 * This component is in an array. The array could grow and shrink or be
	 * reordered. All children, that hasn't already been validated, are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactComponent} component Component that requires a key.
	 */
	function validateExplicitKey(component) {
	  if (component.__keyValidated__ || component.props.key != null) {
	    return;
	  }
	  component.__keyValidated__ = true;

	  // We can't provide friendly warnings for top level components.
	  if (!ReactCurrentOwner.current) {
	    return;
	  }

	  // Name of the component whose render method tried to pass children.
	  var currentName = ReactCurrentOwner.current.constructor.displayName;
	  if (ownerHasWarned.hasOwnProperty(currentName)) {
	    return;
	  }
	  ownerHasWarned[currentName] = true;

	  var message = 'Each child in an array should have a unique "key" prop. ' +
	                'Check the render method of ' + currentName + '.';
	  if (!component.isOwnedBy(ReactCurrentOwner.current)) {
	    // Name of the component that originally created this child.
	    var childOwnerName =
	      component.props.__owner__ &&
	      component.props.__owner__.constructor.displayName;

	    // Usually the current owner is the offender, but if it accepts
	    // children as a property, it may be the creator of the child that's
	    // responsible for assigning it a key.
	    message += ' It was passed a child from ' + childOwnerName + '.';
	  }

	  console.warn(message);
	}

	/**
	 * Ensure that every component either is passed in a static location or, if
	 * if it's passed in an array, has an explicit key property defined.
	 *
	 * @internal
	 * @param {*} component Statically passed child of any type.
	 * @return {boolean}
	 */
	function validateChildKeys(component) {
	  if (Array.isArray(component)) {
	    for (var i = 0; i < component.length; i++) {
	      var child = component[i];
	      if (ReactComponent.isValidComponent(child)) {
	        validateExplicitKey(child);
	      }
	    }
	  } else if (ReactComponent.isValidComponent(component)) {
	    // This component was passed in a valid location.
	    component.__keyValidated__ = true;
	  }
	}

	/**
	 * Components are the basic units of composition in React.
	 *
	 * Every component accepts a set of keyed input parameters known as "props" that
	 * are initialized by the constructor. Once a component is mounted, the props
	 * can be mutated using `setProps` or `replaceProps`.
	 *
	 * Every component is capable of the following operations:
	 *
	 *   `mountComponent`
	 *     Initializes the component, renders markup, and registers event listeners.
	 *
	 *   `receiveProps`
	 *     Updates the rendered DOM nodes given a new set of props.
	 *
	 *   `unmountComponent`
	 *     Releases any resources allocated by this component.
	 *
	 * Components can also be "owned" by other components. Being owned by another
	 * component means being constructed by that component. This is different from
	 * being the child of a component, which means having a DOM representation that
	 * is a child of the DOM representation of that component.
	 *
	 * @class ReactComponent
	 */
	var ReactComponent = {

	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid component.
	   * @final
	   */
	  isValidComponent: function(object) {
	    return !!(
	      object &&
	      typeof object.mountComponentIntoNode === 'function' &&
	      typeof object.receiveProps === 'function'
	    );
	  },

	  /**
	   * Generate a key string that identifies a component within a set.
	   *
	   * @param {*} component A component that could contain a manual key.
	   * @param {number} index Index that is used if a manual key is not provided.
	   * @return {string}
	   * @internal
	   */
	  getKey: function(component, index) {
	    if (component && component.props && component.props.key != null) {
	      // Explicit key
	      return '{' + component.props.key + '}';
	    }
	    // Implicit key determined by the index in the set
	    return '[' + index + ']';
	  },

	  /**
	   * @internal
	   */
	  LifeCycle: ComponentLifeCycle,

	  /**
	   * Injected module that provides ability to mutate individual properties.
	   * Injected into the base class because many different subclasses need access
	   * to this.
	   *
	   * @internal
	   */
	  DOMIDOperations: ReactComponentEnvironment.DOMIDOperations,

	  /**
	   * Optionally injectable environment dependent cleanup hook. (server vs.
	   * browser etc). Example: A browser system caches DOM nodes based on component
	   * ID and must remove that cache entry when this instance is unmounted.
	   *
	   * @private
	   */
	  unmountIDFromEnvironment: ReactComponentEnvironment.unmountIDFromEnvironment,

	  /**
	   * The "image" of a component tree, is the platform specific (typically
	   * serialized) data that represents a tree of lower level UI building blocks.
	   * On the web, this "image" is HTML markup which describes a construction of
	   * low level `div` and `span` nodes. Other platforms may have different
	   * encoding of this "image". This must be injected.
	   *
	   * @private
	   */
	  mountImageIntoNode: ReactComponentEnvironment.mountImageIntoNode,

	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction:
	    ReactComponentEnvironment.ReactReconcileTransaction,

	  /**
	   * Base functionality for every ReactComponent constructor. Mixed into the
	   * `ReactComponent` prototype, but exposed statically for easy access.
	   *
	   * @lends {ReactComponent.prototype}
	   */
	  Mixin: merge(ReactComponentEnvironment.Mixin, {

	    /**
	     * Checks whether or not this component is mounted.
	     *
	     * @return {boolean} True if mounted, false otherwise.
	     * @final
	     * @protected
	     */
	    isMounted: function() {
	      return this._lifeCycleState === ComponentLifeCycle.MOUNTED;
	    },

	    /**
	     * Sets a subset of the props.
	     *
	     * @param {object} partialProps Subset of the next props.
	     * @param {?function} callback Called after props are updated.
	     * @final
	     * @public
	     */
	    setProps: function(partialProps, callback) {
	      // Merge with `_pendingProps` if it exists, otherwise with existing props.
	      this.replaceProps(
	        merge(this._pendingProps || this.props, partialProps),
	        callback
	      );
	    },

	    /**
	     * Replaces all of the props.
	     *
	     * @param {object} props New props.
	     * @param {?function} callback Called after props are updated.
	     * @final
	     * @public
	     */
	    replaceProps: function(props, callback) {
	      invariant(!this.props.__owner__);
	      invariant(this.isMounted());
	      this._pendingProps = props;
	      ReactUpdates.enqueueUpdate(this, callback);
	    },

	    /**
	     * Base constructor for all React component.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.construct.call(this, ...)`.
	     *
	     * @param {?object} initialProps
	     * @param {*} children
	     * @internal
	     */
	    construct: function(initialProps, children) {
	      this.props = initialProps || {};
	      // Record the component responsible for creating this component.
	      this.props.__owner__ = ReactCurrentOwner.current;
	      // All components start unmounted.
	      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;

	      this._pendingProps = null;
	      this._pendingCallbacks = null;

	      // Children can be more than one argument
	      var childrenLength = arguments.length - 1;
	      if (childrenLength === 1) {
	          this.props.children = children;
	      } else if (childrenLength > 1) {
	        var childArray = Array(childrenLength);
	        for (var i = 0; i < childrenLength; i++) {
	            childArray[i] = arguments[i + 1];
	        }
	        this.props.children = childArray;
	      }
	    },

	    /**
	     * Initializes the component, renders markup, and registers event listeners.
	     *
	     * NOTE: This does not insert any nodes into the DOM.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.mountComponent.call(this, ...)`.
	     *
	     * @param {string} rootID DOM ID of the root node.
	     * @param {ReactReconcileTransaction} transaction
	     * @param {number} mountDepth number of components in the owner hierarchy.
	     * @return {?string} Rendered markup to be inserted into the DOM.
	     * @internal
	     */
	    mountComponent: function(rootID, transaction, mountDepth) {
	      invariant(!this.isMounted());
	      var props = this.props;
	      if (props.ref != null) {
	        ReactOwner.addComponentAsRefTo(this, props.ref, props.__owner__);
	      }
	      this._rootNodeID = rootID;
	      this._lifeCycleState = ComponentLifeCycle.MOUNTED;
	      this._mountDepth = mountDepth;
	      // Effectively: return '';
	    },

	    /**
	     * Releases any resources allocated by `mountComponent`.
	     *
	     * NOTE: This does not remove any nodes from the DOM.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.unmountComponent.call(this)`.
	     *
	     * @internal
	     */
	    unmountComponent: function() {
	      invariant(this.isMounted());
	      var props = this.props;
	      if (props.ref != null) {
	        ReactOwner.removeComponentAsRefFrom(this, props.ref, props.__owner__);
	      }
	      ReactComponent.unmountIDFromEnvironment(this._rootNodeID);
	      this._rootNodeID = null;
	      this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
	    },

	    /**
	     * Updates the rendered DOM nodes given a new set of props.
	     *
	     * Subclasses that override this method should make sure to invoke
	     * `ReactComponent.Mixin.receiveProps.call(this, ...)`.
	     *
	     * @param {object} nextProps Next set of properties.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    receiveProps: function(nextProps, transaction) {
	      invariant(this.isMounted());
	      this._pendingProps = nextProps;
	      this._performUpdateIfNecessary(transaction);
	    },

	    /**
	     * Call `_performUpdateIfNecessary` within a new transaction.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    performUpdateIfNecessary: function() {
	      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
	      transaction.perform(this._performUpdateIfNecessary, this, transaction);
	      ReactComponent.ReactReconcileTransaction.release(transaction);
	    },

	    /**
	     * If `_pendingProps` is set, update the component.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    _performUpdateIfNecessary: function(transaction) {
	      if (this._pendingProps == null) {
	        return;
	      }
	      var prevProps = this.props;
	      this.props = this._pendingProps;
	      this._pendingProps = null;
	      this.updateComponent(transaction, prevProps);
	    },

	    /**
	     * Updates the component's currently mounted representation.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @param {object} prevProps
	     * @internal
	     */
	    updateComponent: function(transaction, prevProps) {
	      var props = this.props;
	      // If either the owner or a `ref` has changed, make sure the newest owner
	      // has stored a reference to `this`, and the previous owner (if different)
	      // has forgotten the reference to `this`.
	      if (props.__owner__ !== prevProps.__owner__ ||
	          props.ref !== prevProps.ref) {
	        if (prevProps.ref != null) {
	          ReactOwner.removeComponentAsRefFrom(
	            this, prevProps.ref, prevProps.__owner__
	          );
	        }
	        // Correct, even if the owner is the same, and only the ref has changed.
	        if (props.ref != null) {
	          ReactOwner.addComponentAsRefTo(this, props.ref, props.__owner__);
	        }
	      }
	    },

	    /**
	     * Mounts this component and inserts it into the DOM.
	     *
	     * @param {string} rootID DOM ID of the root node.
	     * @param {DOMElement} container DOM element to mount into.
	     * @param {boolean} shouldReuseMarkup If true, do not insert markup
	     * @final
	     * @internal
	     * @see {ReactMount.renderComponent}
	     */
	    mountComponentIntoNode: function(rootID, container, shouldReuseMarkup) {
	      var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
	      transaction.perform(
	        this._mountComponentIntoNode,
	        this,
	        rootID,
	        container,
	        transaction,
	        shouldReuseMarkup
	      );
	      ReactComponent.ReactReconcileTransaction.release(transaction);
	    },

	    /**
	     * @param {string} rootID DOM ID of the root node.
	     * @param {DOMElement} container DOM element to mount into.
	     * @param {ReactReconcileTransaction} transaction
	     * @param {boolean} shouldReuseMarkup If true, do not insert markup
	     * @final
	     * @private
	     */
	    _mountComponentIntoNode: function(
	        rootID,
	        container,
	        transaction,
	        shouldReuseMarkup) {
	      var markup = this.mountComponent(rootID, transaction, 0);
	      ReactComponent.mountImageIntoNode(markup, container, shouldReuseMarkup);
	    },

	    /**
	     * Checks if this component is owned by the supplied `owner` component.
	     *
	     * @param {ReactComponent} owner Component to check.
	     * @return {boolean} True if `owners` owns this component.
	     * @final
	     * @internal
	     */
	    isOwnedBy: function(owner) {
	      return this.props.__owner__ === owner;
	    },

	    /**
	     * Gets another component, that shares the same owner as this one, by ref.
	     *
	     * @param {string} ref of a sibling Component.
	     * @return {?ReactComponent} the actual sibling Component.
	     * @final
	     * @internal
	     */
	    getSiblingByRef: function(ref) {
	      var owner = this.props.__owner__;
	      if (!owner || !owner.refs) {
	        return null;
	      }
	      return owner.refs[ref];
	    }
	  })
	};

	module.exports = ReactComponent;


/***/ },

/***/ 12:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactCompositeComponent
	 */

	"use strict";

	var ReactComponent = require(11);
	var ReactCurrentOwner = require(13);
	var ReactOwner = require(38);
	var ReactPerf = require(20);
	var ReactPropTransferer = require(43);
	var ReactUpdates = require(39);

	var invariant = require(40);
	var keyMirror = require(41);
	var merge = require(42);
	var mixInto = require(44);
	var objMap = require(45);

	/**
	 * Policies that describe methods in `ReactCompositeComponentInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base ReactCompositeComponent class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactCompositeComponent`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactCompositeComponentInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will available on the prototype.
	 *
	 * @interface ReactCompositeComponentInterface
	 * @internal
	 */
	var ReactCompositeComponentInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_ONCE,



	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,



	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props and state.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props and state will not require a component update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState) {
	   *     return !equal(nextProps, this.props) || !equal(nextState, this.state);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props` and `this.state` to `nextProps` and `nextState`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,



	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared in the specification when defining classes
	 * using `React.createClass`, they will not be on the component's prototype.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function(Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function(Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  propTypes: function(Constructor, propTypes) {
	    Constructor.propTypes = propTypes;
	  }
	};

	function validateMethodOverride(proto, name) {
	  var specPolicy = ReactCompositeComponentInterface[name];

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
	    invariant(specPolicy === SpecPolicy.OVERRIDE_BASE);
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (proto.hasOwnProperty(name)) {
	    invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
	    specPolicy === SpecPolicy.DEFINE_MANY_MERGED);
	  }
	}


	function validateLifeCycleOnReplaceState(instance) {
	  var compositeLifeCycleState = instance._compositeLifeCycleState;
	  invariant(instance.isMounted() ||
	    compositeLifeCycleState === CompositeLifeCycle.MOUNTING);
	  invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
	  compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING);
	}

	/**
	 * Custom version of `mixInto` which handles policy validation and reserved
	 * specification keys when building `ReactCompositeComponent` classses.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  var proto = Constructor.prototype;
	  for (var name in spec) {
	    var property = spec[name];
	    if (!spec.hasOwnProperty(name) || !property) {
	      continue;
	    }
	    validateMethodOverride(proto, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactCompositeComponent methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isCompositeComponentMethod = name in ReactCompositeComponentInterface;
	      var isInherited = name in proto;
	      var markedDontBind = property.__reactDontBind;
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind =
	        isFunction &&
	        !isCompositeComponentMethod &&
	        !isInherited &&
	        !markedDontBind;

	      if (shouldAutoBind) {
	        if (!proto.__reactAutoBindMap) {
	          proto.__reactAutoBindMap = {};
	        }
	        proto.__reactAutoBindMap[name] = property;
	        proto[name] = property;
	      } else {
	        if (isInherited) {
	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property.
	          if (ReactCompositeComponentInterface[name] ===
	              SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	        }
	      }
	    }
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeObjectsWithNoDuplicateKeys(one, two) {
	  invariant(one && two && typeof one === 'object' && typeof two === 'object');

	  objMap(two, function(value, key) {
	    invariant(one[key] === undefined);
	    one[key] = value;
	  });
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    return mergeObjectsWithNoDuplicateKeys(
	      one.apply(this, arguments),
	      two.apply(this, arguments)
	    );
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * `ReactCompositeComponent` maintains an auxiliary life cycle state in
	 * `this._compositeLifeCycleState` (which can be null).
	 *
	 * This is different from the life cycle state maintained by `ReactComponent` in
	 * `this._lifeCycleState`. The following diagram shows how the states overlap in
	 * time. There are times when the CompositeLifeCycle is null - at those times it
	 * is only meaningful to look at ComponentLifeCycle alone.
	 *
	 * Top Row: ReactComponent.ComponentLifeCycle
	 * Low Row: ReactComponent.CompositeLifeCycle
	 *
	 * +-------+------------------------------------------------------+--------+
	 * |  UN   |                    MOUNTED                           |   UN   |
	 * |MOUNTED|                                                      | MOUNTED|
	 * +-------+------------------------------------------------------+--------+
	 * |       ^--------+   +------+   +------+   +------+   +--------^        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |    0--|MOUNTING|-0-|RECEIV|-0-|RECEIV|-0-|RECEIV|-0-|   UN   |--->0   |
	 * |       |        |   |PROPS |   | PROPS|   | STATE|   |MOUNTING|        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |       |        |   |      |   |      |   |      |   |        |        |
	 * |       +--------+   +------+   +------+   +------+   +--------+        |
	 * |       |                                                      |        |
	 * +-------+------------------------------------------------------+--------+
	 */
	var CompositeLifeCycle = keyMirror({
	  /**
	   * Components in the process of being mounted respond to state changes
	   * differently.
	   */
	  MOUNTING: null,
	  /**
	   * Components in the process of being unmounted are guarded against state
	   * changes.
	   */
	  UNMOUNTING: null,
	  /**
	   * Components that are mounted and receiving new props respond to state
	   * changes differently.
	   */
	  RECEIVING_PROPS: null,
	  /**
	   * Components that are mounted and receiving new state are guarded against
	   * additional state changes.
	   */
	  RECEIVING_STATE: null
	});

	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */
	var ReactCompositeComponentMixin = {

	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {?object} initialProps
	   * @param {*} children
	   * @final
	   * @internal
	   */
	  construct: function(initialProps, children) {
	    // Children can be either an array or more than one argument
	    ReactComponent.Mixin.construct.apply(this, arguments);
	    this.state = null;
	    this._pendingState = null;
	    this._compositeLifeCycleState = null;
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function() {
	    return ReactComponent.Mixin.isMounted.call(this) &&
	      this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING;
	  },

	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: ReactPerf.measure(
	    'ReactCompositeComponent',
	    'mountComponent',
	    function(rootID, transaction, mountDepth) {
	      ReactComponent.Mixin.mountComponent.call(
	        this,
	        rootID,
	        transaction,
	        mountDepth
	      );
	      this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;

	      this._defaultProps = this.getDefaultProps ? this.getDefaultProps() : null;
	      this._processProps(this.props);

	      if (this.__reactAutoBindMap) {
	        this._bindAutoBindMethods();
	      }

	      this.state = this.getInitialState ? this.getInitialState() : null;
	      this._pendingState = null;
	      this._pendingForceUpdate = false;

	      if (this.componentWillMount) {
	        this.componentWillMount();
	        // When mounting, calls to `setState` by `componentWillMount` will set
	        // `this._pendingState` without triggering a re-render.
	        if (this._pendingState) {
	          this.state = this._pendingState;
	          this._pendingState = null;
	        }
	      }

	      this._renderedComponent = this._renderValidatedComponent();

	      // Done with mounting, `setState` will now trigger UI changes.
	      this._compositeLifeCycleState = null;
	      var markup = this._renderedComponent.mountComponent(
	        rootID,
	        transaction,
	        mountDepth + 1
	      );
	      if (this.componentDidMount) {
	        transaction.getReactMountReady().enqueue(this, this.componentDidMount);
	      }
	      return markup;
	    }
	  ),

	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function() {
	    this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
	    if (this.componentWillUnmount) {
	      this.componentWillUnmount();
	    }
	    this._compositeLifeCycleState = null;

	    this._defaultProps = null;

	    ReactComponent.Mixin.unmountComponent.call(this);
	    this._renderedComponent.unmountComponent();
	    this._renderedComponent = null;

	    if (this.refs) {
	      this.refs = null;
	    }

	    // Some existing components rely on this.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: this.props = null;
	    // TODO: this.state = null;
	  },

	  /**
	   * Sets a subset of the state. Always use this or `replaceState` to mutate
	   * state. You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * There is no guarantee that calls to `setState` will run synchronously,
	   * as they may eventually be batched together.  You can provide an optional
	   * callback that will be executed when the call to setState is actually
	   * completed.
	   *
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after state is updated.
	   * @final
	   * @protected
	   */
	  setState: function(partialState, callback) {
	    // Merge with `_pendingState` if it exists, otherwise with existing state.
	    this.replaceState(
	      merge(this._pendingState || this.state, partialState),
	      callback
	    );
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {object} completeState Next state.
	   * @param {?function} callback Called after state is updated.
	   * @final
	   * @protected
	   */
	  replaceState: function(completeState, callback) {
	    validateLifeCycleOnReplaceState(this);
	    this._pendingState = completeState;
	    ReactUpdates.enqueueUpdate(this, callback);
	  },

	  /**
	   * Processes props by setting default values for unspecified props and
	   * asserting that the props are valid.
	   *
	   * @param {object} props
	   * @private
	   */
	  _processProps: function(props) {
	    var propName;
	    var defaultProps = this._defaultProps;
	    for (propName in defaultProps) {
	      if (!(propName in props)) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	    var propTypes = this.constructor.propTypes;
	    if (propTypes) {
	      var componentName = this.constructor.displayName;
	      for (propName in propTypes) {
	        var checkProp = propTypes[propName];
	        if (checkProp) {
	          checkProp(props, propName, componentName);
	        }
	      }
	    }
	  },

	  performUpdateIfNecessary: function() {
	    var compositeLifeCycleState = this._compositeLifeCycleState;
	    // Do not trigger a state transition if we are in the middle of mounting or
	    // receiving props because both of those will already be doing this.
	    if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING ||
	        compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
	      return;
	    }
	    ReactComponent.Mixin.performUpdateIfNecessary.call(this);
	  },

	  /**
	   * If any of `_pendingProps`, `_pendingState`, or `_pendingForceUpdate` is
	   * set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  _performUpdateIfNecessary: function(transaction) {
	    if (this._pendingProps == null &&
	        this._pendingState == null &&
	        !this._pendingForceUpdate) {
	      return;
	    }

	    var nextProps = this.props;
	    if (this._pendingProps != null) {
	      nextProps = this._pendingProps;
	      this._processProps(nextProps);
	      this._pendingProps = null;

	      this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
	      if (this.componentWillReceiveProps) {
	        this.componentWillReceiveProps(nextProps, transaction);
	      }
	    }

	    this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;

	    var nextState = this._pendingState || this.state;
	    this._pendingState = null;

	    if (this._pendingForceUpdate ||
	        !this.shouldComponentUpdate ||
	        this.shouldComponentUpdate(nextProps, nextState)) {
	      this._pendingForceUpdate = false;
	      // Will set `this.props` and `this.state`.
	      this._performComponentUpdate(nextProps, nextState, transaction);
	    } else {
	      // If it's determined that a component should not update, we still want
	      // to set props and state.
	      this.props = nextProps;
	      this.state = nextState;
	    }

	    this._compositeLifeCycleState = null;
	  },

	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {object} nextProps Next object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {ReactReconcileTransaction} transaction
	   * @private
	   */
	  _performComponentUpdate: function(nextProps, nextState, transaction) {
	    var prevProps = this.props;
	    var prevState = this.state;

	    if (this.componentWillUpdate) {
	      this.componentWillUpdate(nextProps, nextState, transaction);
	    }

	    this.props = nextProps;
	    this.state = nextState;

	    this.updateComponent(transaction, prevProps, prevState);

	    if (this.componentDidUpdate) {
	      transaction.getReactMountReady().enqueue(
	        this,
	        this.componentDidUpdate.bind(this, prevProps, prevState)
	      );
	    }
	  },

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @internal
	   * @overridable
	   */
	  updateComponent: ReactPerf.measure(
	    'ReactCompositeComponent',
	    'updateComponent',
	    function(transaction, prevProps, prevState) {
	      ReactComponent.Mixin.updateComponent.call(this, transaction, prevProps);
	      var currentComponent = this._renderedComponent;
	      var nextComponent = this._renderValidatedComponent();
	      if (currentComponent.constructor === nextComponent.constructor) {
	        currentComponent.receiveProps(nextComponent.props, transaction);
	      } else {
	        // These two IDs are actually the same! But nothing should rely on that.
	        var thisID = this._rootNodeID;
	        var currentComponentID = currentComponent._rootNodeID;
	        currentComponent.unmountComponent();
	        this._renderedComponent = nextComponent;
	        var nextMarkup = nextComponent.mountComponent(
	          thisID,
	          transaction,
	          this._mountDepth + 1
	        );
	        ReactComponent.DOMIDOperations.dangerouslyReplaceNodeWithMarkupByID(
	          currentComponentID,
	          nextMarkup
	        );
	      }
	    }
	  ),

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldUpdateComponent`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {?function} callback Called after update is complete.
	   * @final
	   * @protected
	   */
	  forceUpdate: function(callback) {
	    var compositeLifeCycleState = this._compositeLifeCycleState;
	    invariant(this.isMounted() ||
	      compositeLifeCycleState === CompositeLifeCycle.MOUNTING);
	    invariant(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE &&
	    compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING);
	    this._pendingForceUpdate = true;
	    ReactUpdates.enqueueUpdate(this, callback);
	  },

	  /**
	   * @private
	   */
	  _renderValidatedComponent: function() {
	    var renderedComponent;
	    ReactCurrentOwner.current = this;
	    try {
	      renderedComponent = this.render();
	    } catch (error) {
	      // IE8 requires `catch` in order to use `finally`.
	      throw error;
	    } finally {
	      ReactCurrentOwner.current = null;
	    }
	    invariant(ReactComponent.isValidComponent(renderedComponent));
	    return renderedComponent;
	  },

	  /**
	   * @private
	   */
	  _bindAutoBindMethods: function() {
	    for (var autoBindKey in this.__reactAutoBindMap) {
	      if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	        continue;
	      }
	      var method = this.__reactAutoBindMap[autoBindKey];
	      this[autoBindKey] = this._bindAutoBindMethod(method);
	    }
	  },

	  /**
	   * Binds a method to the component.
	   *
	   * @param {function} method Method to be bound.
	   * @private
	   */
	  _bindAutoBindMethod: function(method) {
	      var component = this;

	      var boundMethod = function() {
	        return method.apply(component, arguments);
	      };

	      return boundMethod;
	  }
	};

	var ReactCompositeComponentBase = function() {};
	mixInto(ReactCompositeComponentBase, ReactComponent.Mixin);
	mixInto(ReactCompositeComponentBase, ReactOwner.Mixin);
	mixInto(ReactCompositeComponentBase, ReactPropTransferer.Mixin);
	mixInto(ReactCompositeComponentBase, ReactCompositeComponentMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactCompositeComponent
	 * @extends ReactComponent
	 * @extends ReactOwner
	 * @extends ReactPropTransferer
	 */
	var ReactCompositeComponent = {

	  LifeCycle: CompositeLifeCycle,

	  Base: ReactCompositeComponentBase,

	  /**
	   * Creates a composite component class given a class specification.
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function(spec) {
	      var Constructor = function() {};
	      Constructor.prototype = new ReactCompositeComponentBase();
	      Constructor.prototype.constructor = Constructor;
	      mixSpecIntoComponent(Constructor, spec);
	      invariant(Constructor.prototype.render);

	      // Reduce time spent doing lookups by setting these on the prototype.
	      for (var methodName in ReactCompositeComponentInterface) {
	        if (!Constructor.prototype[methodName]) {
	          Constructor.prototype[methodName] = null;
	        }
	      }

	      var ConvenienceConstructor = function(props, children) {
	        var instance = new Constructor();
	        instance.construct.apply(instance, arguments);
	        return instance;
	      };

	      ConvenienceConstructor.componentConstructor = Constructor;
	      ConvenienceConstructor.originalSpec = spec;
	      return ConvenienceConstructor;
	  },

	  /**
	   * Checks if a value is a valid component constructor.
	   *
	   * @param {*}
	   * @return {boolean}
	   * @public
	   */
	  isValidClass: function(componentClass) {
	    return componentClass instanceof Function &&
	           'componentConstructor' in componentClass &&
	           componentClass.componentConstructor instanceof Function;
	  }
	};

	module.exports = ReactCompositeComponent;


/***/ },

/***/ 13:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	"use strict";

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;


/***/ },

/***/ 14:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOM
	 * @typechecks static-only
	 */

	"use strict";

	var ReactDOMComponent = require(15);

	var mergeInto = require(46);
	var objMapKeyVal = require(47);

	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @param {boolean} omitClose True if the close tag should be omitted.
	 * @private
	 */
	function createDOMComponentClass(tag, omitClose) {
	  var Constructor = function() {};
	  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
	  Constructor.prototype.constructor = Constructor;
	  Constructor.displayName = tag;

	  var ConvenienceConstructor = function(props, children) {
	    var instance = new Constructor();
	    instance.construct.apply(instance, arguments);
	    return instance;
	  };
	  ConvenienceConstructor.componentConstructor = Constructor;
	  return ConvenienceConstructor;
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOM = objMapKeyVal({
	  a: false,
	  abbr: false,
	  address: false,
	  area: false,
	  article: false,
	  aside: false,
	  audio: false,
	  b: false,
	  base: false,
	  bdi: false,
	  bdo: false,
	  big: false,
	  blockquote: false,
	  body: false,
	  br: true,
	  button: false,
	  canvas: false,
	  caption: false,
	  cite: false,
	  code: false,
	  col: true,
	  colgroup: false,
	  data: false,
	  datalist: false,
	  dd: false,
	  del: false,
	  details: false,
	  dfn: false,
	  div: false,
	  dl: false,
	  dt: false,
	  em: false,
	  embed: true,
	  fieldset: false,
	  figcaption: false,
	  figure: false,
	  footer: false,
	  form: false, // NOTE: Injected, see `ReactDOMForm`.
	  h1: false,
	  h2: false,
	  h3: false,
	  h4: false,
	  h5: false,
	  h6: false,
	  head: false,
	  header: false,
	  hr: true,
	  html: false,
	  i: false,
	  iframe: false,
	  img: true,
	  input: true,
	  ins: false,
	  kbd: false,
	  keygen: true,
	  label: false,
	  legend: false,
	  li: false,
	  link: false,
	  main: false,
	  map: false,
	  mark: false,
	  menu: false,
	  menuitem: false, // NOTE: Close tag should be omitted, but causes problems.
	  meta: true,
	  meter: false,
	  nav: false,
	  noscript: false,
	  object: false,
	  ol: false,
	  optgroup: false,
	  option: false,
	  output: false,
	  p: false,
	  param: true,
	  pre: false,
	  progress: false,
	  q: false,
	  rp: false,
	  rt: false,
	  ruby: false,
	  s: false,
	  samp: false,
	  script: false,
	  section: false,
	  select: false,
	  small: false,
	  source: false,
	  span: false,
	  strong: false,
	  style: false,
	  sub: false,
	  summary: false,
	  sup: false,
	  table: false,
	  tbody: false,
	  td: false,
	  textarea: false, // NOTE: Injected, see `ReactDOMTextarea`.
	  tfoot: false,
	  th: false,
	  thead: false,
	  time: false,
	  title: false,
	  tr: false,
	  track: true,
	  u: false,
	  ul: false,
	  'var': false,
	  video: false,
	  wbr: false,

	  // SVG
	  circle: false,
	  g: false,
	  line: false,
	  path: false,
	  polyline: false,
	  rect: false,
	  svg: false,
	  text: false
	}, createDOMComponentClass);

	var injection = {
	  injectComponentClasses: function(componentClasses) {
	    mergeInto(ReactDOM, componentClasses);
	  }
	};

	ReactDOM.injection = injection;

	module.exports = ReactDOM;


/***/ },

/***/ 15:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMComponent
	 * @typechecks static-only
	 */

	"use strict";

	var CSSPropertyOperations = require(48);
	var DOMProperty = require(49);
	var DOMPropertyOperations = require(50);
	var ReactComponent = require(11);
	var ReactEventEmitter = require(51);
	var ReactMultiChild = require(19);
	var ReactMount = require(18);
	var ReactPerf = require(20);

	var escapeTextForBrowser = require(52);
	var invariant = require(40);
	var keyOf = require(53);
	var merge = require(42);
	var mixInto = require(44);

	var putListener = ReactEventEmitter.putListener;
	var deleteListener = ReactEventEmitter.deleteListener;
	var registrationNames = ReactEventEmitter.registrationNames;

	// For quickly matching children type, to test if can be treated as content.
	var CONTENT_TYPES = {'string': true, 'number': true};

	var STYLE = keyOf({style: null});

	/**
	 * @param {?object} props
	 */
	function assertValidProps(props) {
	  if (!props) {
	    return;
	  }
	  // Note the use of `==` which checks for null or undefined.
	  invariant(props.children == null || props.dangerouslySetInnerHTML == null);
	  invariant(props.style == null || typeof props.style === 'object');
	}

	/**
	 * @constructor ReactDOMComponent
	 * @extends ReactComponent
	 * @extends ReactMultiChild
	 */
	function ReactDOMComponent(tag, omitClose) {
	  this._tagOpen = '<' + tag;
	  this._tagClose = omitClose ? '' : '</' + tag + '>';
	  this.tagName = tag.toUpperCase();
	}

	ReactDOMComponent.Mixin = {

	  /**
	   * Generates root tag markup then recurses. This method has side effects and
	   * is not idempotent.
	   *
	   * @internal
	   * @param {string} rootID The root DOM ID for this node.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {string} The computed markup.
	   */
	  mountComponent: ReactPerf.measure(
	    'ReactDOMComponent',
	    'mountComponent',
	    function(rootID, transaction, mountDepth) {
	      ReactComponent.Mixin.mountComponent.call(
	        this,
	        rootID,
	        transaction,
	        mountDepth
	      );
	      assertValidProps(this.props);
	      return (
	        this._createOpenTagMarkup() +
	        this._createContentMarkup(transaction) +
	        this._tagClose
	      );
	    }
	  ),

	  /**
	   * Creates markup for the open tag and all attributes.
	   *
	   * This method has side effects because events get registered.
	   *
	   * Iterating over object properties is faster than iterating over arrays.
	   * @see http://jsperf.com/obj-vs-arr-iteration
	   *
	   * @private
	   * @return {string} Markup of opening tag.
	   */
	  _createOpenTagMarkup: function() {
	    var props = this.props;
	    var ret = this._tagOpen;

	    for (var propKey in props) {
	      if (!props.hasOwnProperty(propKey)) {
	        continue;
	      }
	      var propValue = props[propKey];
	      if (propValue == null) {
	        continue;
	      }
	      if (registrationNames[propKey]) {
	        putListener(this._rootNodeID, propKey, propValue);
	      } else {
	        if (propKey === STYLE) {
	          if (propValue) {
	            propValue = props.style = merge(props.style);
	          }
	          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
	        }
	        var markup =
	          DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
	        if (markup) {
	          ret += ' ' + markup;
	        }
	      }
	    }

	    var escapedID = escapeTextForBrowser(this._rootNodeID);
	    return ret + ' ' + ReactMount.ATTR_NAME + '="' + escapedID + '">';
	  },

	  /**
	   * Creates markup for the content between the tags.
	   *
	   * @private
	   * @param {ReactReconcileTransaction} transaction
	   * @return {string} Content markup.
	   */
	  _createContentMarkup: function(transaction) {
	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = this.props.dangerouslySetInnerHTML;
	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        return innerHTML.__html;
	      }
	    } else {
	      var contentToUse =
	        CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
	      var childrenToUse = contentToUse != null ? null : this.props.children;
	      if (contentToUse != null) {
	        return escapeTextForBrowser(contentToUse);
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(
	          childrenToUse,
	          transaction
	        );
	        return mountImages.join('');
	      }
	    }
	    return '';
	  },

	  receiveProps: function(nextProps, transaction) {
	    assertValidProps(nextProps);
	    ReactComponent.Mixin.receiveProps.call(this, nextProps, transaction);
	  },

	  /**
	   * Updates a native DOM component after it has already been allocated and
	   * attached to the DOM. Reconciles the root DOM node, then recurses.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} prevProps
	   * @internal
	   * @overridable
	   */
	  updateComponent: ReactPerf.measure(
	    'ReactDOMComponent',
	    'updateComponent',
	    function(transaction, prevProps) {
	      ReactComponent.Mixin.updateComponent.call(this, transaction, prevProps);
	      this._updateDOMProperties(prevProps);
	      this._updateDOMChildren(prevProps, transaction);
	    }
	  ),

	  /**
	   * Reconciles the properties by detecting differences in property values and
	   * updating the DOM as necessary. This function is probably the single most
	   * critical path for performance optimization.
	   *
	   * TODO: Benchmark whether checking for changed values in memory actually
	   *       improves performance (especially statically positioned elements).
	   * TODO: Benchmark the effects of putting this at the top since 99% of props
	   *       do not change for a given reconciliation.
	   * TODO: Benchmark areas that can be improved with caching.
	   *
	   * @private
	   * @param {object} lastProps
	   */
	  _updateDOMProperties: function(lastProps) {
	    var nextProps = this.props;
	    var propKey;
	    var styleName;
	    var styleUpdates;
	    for (propKey in lastProps) {
	      if (nextProps.hasOwnProperty(propKey) ||
	         !lastProps.hasOwnProperty(propKey)) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        var lastStyle = lastProps[propKey];
	        for (styleName in lastStyle) {
	          if (lastStyle.hasOwnProperty(styleName)) {
	            styleUpdates = styleUpdates || {};
	            styleUpdates[styleName] = '';
	          }
	        }
	      } else if (registrationNames[propKey]) {
	        deleteListener(this._rootNodeID, propKey);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        ReactComponent.DOMIDOperations.deletePropertyByID(
	          this._rootNodeID,
	          propKey
	        );
	      }
	    }
	    for (propKey in nextProps) {
	      var nextProp = nextProps[propKey];
	      var lastProp = lastProps[propKey];
	      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        if (nextProp) {
	          nextProp = nextProps.style = merge(nextProp);
	        }
	        if (lastProp) {
	          // Unset styles on `lastProp` but not on `nextProp`.
	          for (styleName in lastProp) {
	            if (lastProp.hasOwnProperty(styleName) &&
	                !nextProp.hasOwnProperty(styleName)) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = '';
	            }
	          }
	          // Update styles that changed since `lastProp`.
	          for (styleName in nextProp) {
	            if (nextProp.hasOwnProperty(styleName) &&
	                lastProp[styleName] !== nextProp[styleName]) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = nextProp[styleName];
	            }
	          }
	        } else {
	          // Relies on `updateStylesByID` not mutating `styleUpdates`.
	          styleUpdates = nextProp;
	        }
	      } else if (registrationNames[propKey]) {
	        putListener(this._rootNodeID, propKey, nextProp);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        ReactComponent.DOMIDOperations.updatePropertyByID(
	          this._rootNodeID,
	          propKey,
	          nextProp
	        );
	      }
	    }
	    if (styleUpdates) {
	      ReactComponent.DOMIDOperations.updateStylesByID(
	        this._rootNodeID,
	        styleUpdates
	      );
	    }
	  },

	  /**
	   * Reconciles the children with the various properties that affect the
	   * children content.
	   *
	   * @param {object} lastProps
	   * @param {ReactReconcileTransaction} transaction
	   */
	  _updateDOMChildren: function(lastProps, transaction) {
	    var nextProps = this.props;

	    var lastContent =
	      CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
	    var nextContent =
	      CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

	    var lastHtml =
	      lastProps.dangerouslySetInnerHTML &&
	      lastProps.dangerouslySetInnerHTML.__html;
	    var nextHtml =
	      nextProps.dangerouslySetInnerHTML &&
	      nextProps.dangerouslySetInnerHTML.__html;

	    // Note the use of `!=` which checks for null or undefined.
	    var lastChildren = lastContent != null ? null : lastProps.children;
	    var nextChildren = nextContent != null ? null : nextProps.children;

	    // If we're switching from children to content/html or vice versa, remove
	    // the old content
	    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
	    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
	    if (lastChildren != null && nextChildren == null) {
	      this.updateChildren(null, transaction);
	    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
	      this.updateTextContent('');
	    }

	    if (nextContent != null) {
	      if (lastContent !== nextContent) {
	        this.updateTextContent('' + nextContent);
	      }
	    } else if (nextHtml != null) {
	      if (lastHtml !== nextHtml) {
	        ReactComponent.DOMIDOperations.updateInnerHTMLByID(
	          this._rootNodeID,
	          nextHtml
	        );
	      }
	    } else if (nextChildren != null) {
	      this.updateChildren(nextChildren, transaction);
	    }
	  },

	  /**
	   * Destroys all event registrations for this instance. Does not remove from
	   * the DOM. That must be done by the parent.
	   *
	   * @internal
	   */
	  unmountComponent: function() {
	    ReactEventEmitter.deleteAllListeners(this._rootNodeID);
	    ReactComponent.Mixin.unmountComponent.call(this);
	    this.unmountChildren();
	  }

	};

	mixInto(ReactDOMComponent, ReactComponent.Mixin);
	mixInto(ReactDOMComponent, ReactDOMComponent.Mixin);
	mixInto(ReactDOMComponent, ReactMultiChild.Mixin);

	module.exports = ReactDOMComponent;


/***/ },

/***/ 16:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultInjection
	 */

	"use strict";

	var ReactDOM = require(14);
	var ReactDOMButton = require(54);
	var ReactDOMForm = require(55);
	var ReactDOMInput = require(56);
	var ReactDOMOption = require(57);
	var ReactDOMSelect = require(58);
	var ReactDOMTextarea = require(59);
	var ReactEventEmitter = require(51);
	var ReactEventTopLevelCallback = require(60);
	var ReactPerf = require(20);

	var DefaultDOMPropertyConfig = require(61);
	var DOMProperty = require(49);

	var ChangeEventPlugin = require(62);
	var CompositionEventPlugin = require(63);
	var DefaultEventPluginOrder = require(64);
	var EnterLeaveEventPlugin = require(65);
	var EventPluginHub = require(66);
	var MobileSafariClickEventPlugin = require(67);
	var ReactInstanceHandles = require(17);
	var SelectEventPlugin = require(68);
	var SimpleEventPlugin = require(69);

	var ReactDefaultBatchingStrategy = require(70);
	var ReactUpdates = require(39);

	function inject() {
	    ReactEventEmitter.TopLevelCallbackCreator = ReactEventTopLevelCallback;

	    /**
	     * Inject module for resolving DOM hierarchy and plugin ordering.
	     */
	    EventPluginHub.injection.injectEventPluginOrder(DefaultEventPluginOrder);

	    EventPluginHub.injection.injectInstanceHandle(ReactInstanceHandles);

	    /**
	     * Some important event plugins included by default (without having to require
	     * them).
	     */
	    EventPluginHub.injection.injectEventPluginsByName({
	      SimpleEventPlugin: SimpleEventPlugin,
	      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
	      ChangeEventPlugin: ChangeEventPlugin,
	      CompositionEventPlugin: CompositionEventPlugin,
	      MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
	      SelectEventPlugin: SelectEventPlugin
	    });

	    ReactDOM.injection.injectComponentClasses({
	      button: ReactDOMButton,
	      form: ReactDOMForm,
	      input: ReactDOMInput,
	      option: ReactDOMOption,
	      select: ReactDOMSelect,
	      textarea: ReactDOMTextarea
	    });

	    DOMProperty.injection.injectDOMPropertyConfig(DefaultDOMPropertyConfig);

	    ReactUpdates.injection.injectBatchingStrategy(
	      ReactDefaultBatchingStrategy
	    );
	}

	module.exports = {
	  inject: inject
	};


/***/ },

/***/ 17:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactInstanceHandles
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = require(40);

	var SEPARATOR = '.';
	var SEPARATOR_LENGTH = SEPARATOR.length;

	/**
	 * Maximum depth of traversals before we consider the possibility of a bad ID.
	 */
	var MAX_TREE_DEPTH = 100;

	/**
	 * Size of the reactRoot ID space. We generate random numbers for React root
	 * IDs and if there's a collision the events and DOM update system will
	 * get confused. If we assume 100 React components per page, and a user
	 * loads 1 page per minute 24/7 for 50 years, with a mount point space of
	 * 9,999,999 the likelihood of never having a collision is 99.997%.
	 */
	var GLOBAL_MOUNT_POINT_MAX = 9999999;

	/**
	 * Creates a DOM ID prefix to use when mounting React components.
	 *
	 * @param {number} index A unique integer
	 * @return {string} React root ID.
	 * @internal
	 */
	function getReactRootIDString(index) {
	  return SEPARATOR + 'r[' + index.toString(36) + ']';
	}

	/**
	 * Checks if a character in the supplied ID is a separator or the end.
	 *
	 * @param {string} id A React DOM ID.
	 * @param {number} index Index of the character to check.
	 * @return {boolean} True if the character is a separator or end of the ID.
	 * @private
	 */
	function isBoundary(id, index) {
	  return id.charAt(index) === SEPARATOR || index === id.length;
	}

	/**
	 * Checks if the supplied string is a valid React DOM ID.
	 *
	 * @param {string} id A React DOM ID, maybe.
	 * @return {boolean} True if the string is a valid React DOM ID.
	 * @private
	 */
	function isValidID(id) {
	  return id === '' || (
	    id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
	  );
	}

	/**
	 * Checks if the first ID is an ancestor of or equal to the second ID.
	 *
	 * @param {string} ancestorID
	 * @param {string} descendantID
	 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
	 * @internal
	 */
	function isAncestorIDOf(ancestorID, descendantID) {
	  return (
	    descendantID.indexOf(ancestorID) === 0 &&
	    isBoundary(descendantID, ancestorID.length)
	  );
	}

	/**
	 * Gets the parent ID of the supplied React DOM ID, `id`.
	 *
	 * @param {string} id ID of a component.
	 * @return {string} ID of the parent, or an empty string.
	 * @private
	 */
	function getParentID(id) {
	  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
	}

	/**
	 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
	 * supplied `destinationID`. If they are equal, the ID is returned.
	 *
	 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
	 * @param {string} destinationID ID of the destination node.
	 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
	 * @private
	 */
	function getNextDescendantID(ancestorID, destinationID) {
	  invariant(isValidID(ancestorID) && isValidID(destinationID));
	  invariant(isAncestorIDOf(ancestorID, destinationID));
	  if (ancestorID === destinationID) {
	    return ancestorID;
	  }
	  // Skip over the ancestor and the immediate separator. Traverse until we hit
	  // another separator or we reach the end of `destinationID`.
	  var start = ancestorID.length + SEPARATOR_LENGTH;
	  for (var i = start; i < destinationID.length; i++) {
	    if (isBoundary(destinationID, i)) {
	      break;
	    }
	  }
	  return destinationID.substr(0, i);
	}

	/**
	 * Gets the nearest common ancestor ID of two IDs.
	 *
	 * Using this ID scheme, the nearest common ancestor ID is the longest common
	 * prefix of the two IDs that immediately preceded a "marker" in both strings.
	 *
	 * @param {string} oneID
	 * @param {string} twoID
	 * @return {string} Nearest common ancestor ID, or the empty string if none.
	 * @private
	 */
	function getFirstCommonAncestorID(oneID, twoID) {
	  var minLength = Math.min(oneID.length, twoID.length);
	  if (minLength === 0) {
	    return '';
	  }
	  var lastCommonMarkerIndex = 0;
	  // Use `<=` to traverse until the "EOL" of the shorter string.
	  for (var i = 0; i <= minLength; i++) {
	    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
	      lastCommonMarkerIndex = i;
	    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
	      break;
	    }
	  }
	  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
	  invariant(isValidID(longestCommonID));
	  return longestCommonID;
	}

	/**
	 * Traverses the parent path between two IDs (either up or down). The IDs must
	 * not be the same, and there must exist a parent path between them.
	 *
	 * @param {?string} start ID at which to start traversal.
	 * @param {?string} stop ID at which to end traversal.
	 * @param {function} cb Callback to invoke each ID with.
	 * @param {?boolean} skipFirst Whether or not to skip the first node.
	 * @param {?boolean} skipLast Whether or not to skip the last node.
	 * @private
	 */
	function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
	  start = start || '';
	  stop = stop || '';
	  invariant(start !== stop);
	  var traverseUp = isAncestorIDOf(stop, start);
	  invariant(traverseUp || isAncestorIDOf(start, stop));
	  // Traverse from `start` to `stop` one depth at a time.
	  var depth = 0;
	  var traverse = traverseUp ? getParentID : getNextDescendantID;
	  for (var id = start; /* until break */; id = traverse(id, stop)) {
	    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
	      cb(id, traverseUp, arg);
	    }
	    if (id === stop) {
	      // Only break //after// visiting `stop`.
	      break;
	    }
	    invariant(depth++ < MAX_TREE_DEPTH);
	  }
	}

	/**
	 * Manages the IDs assigned to DOM representations of React components. This
	 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
	 * order to simulate events).
	 *
	 * @internal
	 */
	var ReactInstanceHandles = {

	  createReactRootID: function() {
	    return getReactRootIDString(
	      Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX)
	    );
	  },

	  /**
	   * Constructs a React ID by joining a root ID with a name.
	   *
	   * @param {string} rootID Root ID of a parent component.
	   * @param {string} name A component's name (as flattened children).
	   * @return {string} A React ID.
	   * @internal
	   */
	  createReactID: function(rootID, name) {
	    return rootID + SEPARATOR + name;
	  },

	  /**
	   * Gets the DOM ID of the React component that is the root of the tree that
	   * contains the React component with the supplied DOM ID.
	   *
	   * @param {string} id DOM ID of a React component.
	   * @return {?string} DOM ID of the React component that is the root.
	   * @internal
	   */
	  getReactRootIDFromNodeID: function(id) {
	    var regexResult = /\.r\[[^\]]+\]/.exec(id);
	    return regexResult && regexResult[0];
	  },

	  /**
	   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
	   * should would receive a `mouseEnter` or `mouseLeave` event.
	   *
	   * NOTE: Does not invoke the callback on the nearest common ancestor because
	   * nothing "entered" or "left" that element.
	   *
	   * @param {string} leaveID ID being left.
	   * @param {string} enterID ID being entered.
	   * @param {function} cb Callback to invoke on each entered/left ID.
	   * @param {*} upArg Argument to invoke the callback with on left IDs.
	   * @param {*} downArg Argument to invoke the callback with on entered IDs.
	   * @internal
	   */
	  traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
	    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
	    if (ancestorID !== leaveID) {
	      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
	    }
	    if (ancestorID !== enterID) {
	      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
	    }
	  },

	  /**
	   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
	   *
	   * NOTE: This traversal happens on IDs without touching the DOM.
	   *
	   * @param {string} targetID ID of the target node.
	   * @param {function} cb Callback to invoke.
	   * @param {*} arg Argument to invoke the callback with.
	   * @internal
	   */
	  traverseTwoPhase: function(targetID, cb, arg) {
	    if (targetID) {
	      traverseParentPath('', targetID, cb, arg, true, false);
	      traverseParentPath(targetID, '', cb, arg, false, true);
	    }
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getFirstCommonAncestorID: getFirstCommonAncestorID,

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getNextDescendantID: getNextDescendantID,

	  isAncestorIDOf: isAncestorIDOf,

	  SEPARATOR: SEPARATOR

	};

	module.exports = ReactInstanceHandles;


/***/ },

/***/ 18:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMount
	 */

	"use strict";
	var ReactEventEmitter = require(51);
	var ReactInstanceHandles = require(17);
	var $ = require(71);
	var getReactRootElementInContainer = require(72);
	var invariant = require(40);
	var nodeContains = require(73);
	var SEPARATOR = ReactInstanceHandles.SEPARATOR;
	var ATTR_NAME = 'data-reactid';
	var nodeCache = {};
	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;

	/** Mapping from reactRootID to React component instance. */
	var instancesByReactRootID = {};

	/** Mapping from reactRootID to `container` nodes. */
	var containersByReactRootID = {};

	/**
	 * @param {DOMElement} container DOM element that may contain a React component.
	 * @return {?string} A "reactRoot" ID, if a React component is rendered.
	 */
	function getReactRootID(container) {
	  var rootElement = getReactRootElementInContainer(container);
	  return rootElement && ReactMount.getID(rootElement);
	}

	/**
	 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
	 * element can return its control whose name or ID equals ATTR_NAME. All
	 * DOM nodes support `getAttributeNode` but this can also get called on
	 * other objects so just return '' if we're given something other than a
	 * DOM node (such as window).
	 *
	 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
	 * @return {string} ID of the supplied `domNode`.
	 */
	function getID(node) {
	  var id = internalGetID(node);
	  if (id) {
	    if (nodeCache.hasOwnProperty(id)) {
	      var cached = nodeCache[id];
	      if (cached !== node) {
	        invariant(!isValid(cached, id));

	        nodeCache[id] = node;
	      }
	    } else {
	      nodeCache[id] = node;
	    }
	  }

	  return id;
	}

	function internalGetID(node) {
	  // If node is something like a window, document, or text node, none of
	  // which support attributes or a .getAttribute method, gracefully return
	  // the empty string, as if the attribute were missing.
	  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
	}

	/**
	 * Sets the React-specific ID of the given node.
	 *
	 * @param {DOMElement} node The DOM node whose ID will be set.
	 * @param {string} id The value of the ID attribute.
	 */
	function setID(node, id) {
	  var oldID = internalGetID(node);
	  if (oldID !== id) {
	    delete nodeCache[oldID];
	  }
	  node.setAttribute(ATTR_NAME, id);
	  nodeCache[id] = node;
	}

	/**
	 * Finds the node with the supplied React-generated DOM ID.
	 *
	 * @param {string} id A React-generated DOM ID.
	 * @return {DOMElement} DOM node with the suppled `id`.
	 * @internal
	 */
	function getNode(id) {
	  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
	    nodeCache[id] = ReactMount.findReactNodeByID(id);
	  }
	  return nodeCache[id];
	}

	/**
	 * A node is "valid" if it is contained by a currently mounted container.
	 *
	 * This means that the node does not have to be contained by a document in
	 * order to be considered valid.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @param {string} id The expected ID of the node.
	 * @return {boolean} Whether the node is contained by a mounted container.
	 */
	function isValid(node, id) {
	  if (node) {
	    invariant(internalGetID(node) === id);

	    var container = ReactMount.findReactContainerForID(id);
	    if (container && nodeContains(container, node)) {
	      return true;
	    }
	  }

	  return false;
	}

	/**
	 * Causes the cache to forget about one React-specific ID.
	 *
	 * @param {string} id The ID to forget.
	 */
	function purgeID(id) {
	  delete nodeCache[id];
	}

	/**
	 * Mounting is the process of initializing a React component by creatings its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.renderComponent(component, $('container'));
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".r[3]">           <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */
	var ReactMount = {
	  /**
	   * Safety guard to prevent accidentally rendering over the entire HTML tree.
	   */
	  allowFullPageRender: false,

	  /** Time spent generating markup. */
	  totalInstantiationTime: 0,

	  /** Time spent inserting markup into the DOM. */
	  totalInjectionTime: 0,

	  /** Whether support for touch events should be initialized. */
	  useTouchEvents: false,

	  /** Exposed for debugging purposes **/
	  _instancesByReactRootID: instancesByReactRootID,

	  /**
	   * This is a hook provided to support rendering React components while
	   * ensuring that the apparent scroll position of its `container` does not
	   * change.
	   *
	   * @param {DOMElement} container The `container` being rendered into.
	   * @param {function} renderCallback This must be called once to do the render.
	   */
	  scrollMonitor: function(container, renderCallback) {
	    renderCallback();
	  },

	  /**
	   * Ensures that the top-level event delegation listener is set up. This will
	   * be invoked some time before the first time any React component is rendered.
	   * @param {DOMElement} container container we're rendering into
	   *
	   * @private
	   */
	  prepareEnvironmentForDOM: function(container) {
	    invariant(container && (
	      container.nodeType === ELEMENT_NODE_TYPE ||
	      container.nodeType === DOC_NODE_TYPE
	    ));
	    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
	      container.ownerDocument :
	      container;
	    ReactEventEmitter.ensureListening(ReactMount.useTouchEvents, doc);
	  },

	  /**
	   * Take a component that's already mounted into the DOM and replace its props
	   * @param {ReactComponent} prevComponent component instance already in the DOM
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {?function} callback function triggered on completion
	   */
	  _updateRootComponent: function(
	      prevComponent,
	      nextComponent,
	      container,
	      callback) {
	      var nextProps = nextComponent.props;

	      ReactMount.scrollMonitor(container, function() {
	        prevComponent.replaceProps(nextProps, callback);
	      });

	      return prevComponent;
	  },

	  /**
	   * Register a component into the instance map and start the events system.
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @return {string} reactRoot ID prefix
	   */
	  _registerComponent: function(nextComponent, container) {
	    ReactMount.prepareEnvironmentForDOM(container);

	    var reactRootID = ReactMount.registerContainer(container);
	    instancesByReactRootID[reactRootID] = nextComponent;
	    return reactRootID;
	  },

	  /**
	   * Render a new component into the DOM.
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
	   * @return {ReactComponent} nextComponent
	   */
	  _renderNewRootComponent: function(
	      nextComponent,
	      container,
	      shouldReuseMarkup) {
	      var reactRootID = ReactMount._registerComponent(nextComponent, container);

	      nextComponent.mountComponentIntoNode(
	        reactRootID,
	        container,
	        shouldReuseMarkup
	      );

	      return nextComponent;
	  },

	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactComponent} nextComponent Component instance to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  renderComponent: function(nextComponent, container, callback) {
	    var registeredComponent = instancesByReactRootID[getReactRootID(container)];

	    if (registeredComponent) {
	      if (registeredComponent.constructor === nextComponent.constructor) {
	        return ReactMount._updateRootComponent(
	          registeredComponent,
	          nextComponent,
	          container,
	          callback
	        );
	      } else {
	        ReactMount.unmountComponentAtNode(container);
	      }
	    }

	    var reactRootElement = getReactRootElementInContainer(container);
	    var containerHasReactMarkup =
	      reactRootElement && ReactMount.isRenderedByReact(reactRootElement);

	    var shouldReuseMarkup = containerHasReactMarkup && !registeredComponent;

	    var component = ReactMount._renderNewRootComponent(
	      nextComponent,
	      container,
	      shouldReuseMarkup
	    );
	    callback && callback();
	    return component;
	  },

	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into the supplied `container`.
	   *
	   * @param {function} constructor React component constructor.
	   * @param {?object} props Initial props of the component instance.
	   * @param {DOMElement} container DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  constructAndRenderComponent: function(constructor, props, container) {
	    return ReactMount.renderComponent(constructor(props), container);
	  },

	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into a container node identified by supplied `id`.
	   *
	   * @param {function} componentConstructor React component constructor
	   * @param {?object} props Initial props of the component instance.
	   * @param {string} id ID of the DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in the container node.
	   */
	  constructAndRenderComponentByID: function(constructor, props, id) {
	    return ReactMount.constructAndRenderComponent(constructor, props, $(id));
	  },

	  /**
	   * Registers a container node into which React components will be rendered.
	   * This also creates the "reatRoot" ID that will be assigned to the element
	   * rendered within.
	   *
	   * @param {DOMElement} container DOM element to register as a container.
	   * @return {string} The "reactRoot" ID of elements rendered within.
	   */
	  registerContainer: function(container) {
	    var reactRootID = getReactRootID(container);
	    if (reactRootID) {
	      // If one exists, make sure it is a valid "reactRoot" ID.
	      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
	    }
	    if (!reactRootID) {
	      // No valid "reactRoot" ID found, create one.
	      reactRootID = ReactInstanceHandles.createReactRootID();
	    }
	    containersByReactRootID[reactRootID] = container;
	    return reactRootID;
	  },

	  /**
	   * Unmounts and destroys the React component rendered in the `container`.
	   *
	   * @param {DOMElement} container DOM element containing a React component.
	   * @return {boolean} True if a component was found in and unmounted from
	   *                   `container`
	   */
	  unmountComponentAtNode: function(container) {
	      var reactRootID = getReactRootID(container);
	      var component = instancesByReactRootID[reactRootID];

	      if (!component) {
	        return false;
	      }

	      ReactMount.unmountComponentFromNode(component, container);
	      delete instancesByReactRootID[reactRootID];
	      delete containersByReactRootID[reactRootID];
	      return true;
	  },

	  /**
	   * @deprecated
	   */
	  unmountAndReleaseReactRootNode: function() {
	      return ReactMount.unmountComponentAtNode.apply(this, arguments);
	  },

	  /**
	   * Unmounts a component and removes it from the DOM.
	   *
	   * @param {ReactComponent} instance React component instance.
	   * @param {DOMElement} container DOM element to unmount from.
	   * @final
	   * @internal
	   * @see {ReactMount.unmountComponentAtNode}
	   */
	  unmountComponentFromNode: function(instance, container) {
	    instance.unmountComponent();

	    // http://jsperf.com/emptying-a-node
	    while (container.lastChild) {
	      container.removeChild(container.lastChild);
	    }
	  },

	  /**
	   * Finds the container DOM element that contains React component to which the
	   * supplied DOM `id` belongs.
	   *
	   * @param {string} id The ID of an element rendered by a React component.
	   * @return {?DOMElement} DOM element that contains the `id`.
	   */
	  findReactContainerForID: function(id) {
	      var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
	      var container = containersByReactRootID[reactRootID];
	      return container;
	  },

	  /**
	   * Finds an element rendered by React with the supplied ID.
	   *
	   * @param {string} id ID of a DOM node in the React component.
	   * @return {DOMElement} Root DOM node of the React component.
	   */
	  findReactNodeByID: function(id) {
	    var reactRoot = ReactMount.findReactContainerForID(id);
	    return ReactMount.findComponentRoot(reactRoot, id);
	  },

	  /**
	   * True if the supplied `node` is rendered by React.
	   *
	   * @param {*} node DOM Element to check.
	   * @return {boolean} True if the DOM Element appears to be rendered by React.
	   * @internal
	   */
	  isRenderedByReact: function(node) {
	    if (node.nodeType !== 1) {
	      // Not a DOMElement, therefore not a React component
	      return false;
	    }
	    var id = ReactMount.getID(node);
	    return id ? id.charAt(0) === SEPARATOR : false;
	  },

	  /**
	   * Traverses up the ancestors of the supplied node to find a node that is a
	   * DOM representation of a React component.
	   *
	   * @param {*} node
	   * @return {?DOMEventTarget}
	   * @internal
	   */
	  getFirstReactDOM: function(node) {
	    var current = node;
	    while (current && current.parentNode !== current) {
	      if (ReactMount.isRenderedByReact(current)) {
	        return current;
	      }
	      current = current.parentNode;
	    }
	    return null;
	  },

	  /**
	   * Finds a node with the supplied `id` inside of the supplied `ancestorNode`.
	   * Exploits the ID naming scheme to perform the search quickly.
	   *
	   * @param {DOMEventTarget} ancestorNode Search from this root.
	   * @pararm {string} id ID of the DOM representation of the component.
	   * @return {DOMEventTarget} DOM node with the supplied `id`.
	   * @internal
	   */
	  findComponentRoot: function(ancestorNode, id) {
	      var firstChildren = [ancestorNode.firstChild];
	      var childIndex = 0;

	      while (childIndex < firstChildren.length) {
	        var child = firstChildren[childIndex++];
	        while (child) {
	          var childID = ReactMount.getID(child);
	          if (childID) {
	            if (id === childID) {
	              return child;
	            } else if (ReactInstanceHandles.isAncestorIDOf(childID, id)) {
	              // If we find a child whose ID is an ancestor of the given ID,
	              // then we can be sure that we only want to search the subtree
	              // rooted at this child, so we can throw out the rest of the
	              // search state.
	              firstChildren.length = childIndex = 0;
	              firstChildren.push(child.firstChild);
	              break;
	            } else {
	              // TODO This should not be necessary if the ID hierarchy is
	              // correct, but is occasionally necessary if the DOM has been
	              // modified in unexpected ways.
	              firstChildren.push(child.firstChild);
	            }
	          } else {
	            // If this child had no ID, then there's a chance that it was
	            // injected automatically by the browser, as when a `<table>`
	            // element sprouts an extra `<tbody>` child as a side effect of
	            // `.innerHTML` parsing. Optimistically continue down this
	            // branch, but not before examining the other siblings.
	            firstChildren.push(child.firstChild);
	          }
	          child = child.nextSibling;
	        }
	      }

	      invariant(false);
	  },


	  /**
	   * React ID utilities.
	   */

	  ATTR_NAME: ATTR_NAME,

	  getID: getID,

	  setID: setID,

	  getNode: getNode,

	  purgeID: purgeID,

	  injection: {}
	};

	module.exports = ReactMount;


/***/ },

/***/ 19:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMultiChild
	 * @typechecks static-only
	 */

	"use strict";

	var ReactComponent = require(11);
	var ReactMultiChildUpdateTypes = require(74);

	var flattenChildren = require(75);

	/**
	 * Given a `curChild` and `newChild`, determines if `curChild` should be
	 * updated as opposed to being destroyed or replaced.
	 *
	 * @param {?ReactComponent} curChild
	 * @param {?ReactComponent} newChild
	 * @return {boolean} True if `curChild` should be updated with `newChild`.
	 * @protected
	 */
	function shouldUpdateChild(curChild, newChild) {
	  return curChild && newChild && curChild.constructor === newChild.constructor;
	}

	/**
	 * Updating children of a component may trigger recursive updates. The depth is
	 * used to batch recursive updates to render markup more efficiently.
	 *
	 * @type {number}
	 * @private
	 */
	var updateDepth = 0;

	/**
	 * Queue of update configuration objects.
	 *
	 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
	 *
	 * @type {array<object>}
	 * @private
	 */
	var updateQueue = [];

	/**
	 * Queue of markup to be rendered.
	 *
	 * @type {array<string>}
	 * @private
	 */
	var markupQueue = [];

	/**
	 * Enqueues markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */
	function enqueueMarkup(parentID, markup, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
	    markupIndex: markupQueue.push(markup) - 1,
	    fromIndex: null,
	    textContent: null,
	    toIndex: toIndex
	  });
	}

	/**
	 * Enqueues moving an existing element to another index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */
	function enqueueMove(parentID, fromIndex, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: toIndex
	  });
	}

	/**
	 * Enqueues removing an element at an index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */
	function enqueueRemove(parentID, fromIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: null
	  });
	}

	/**
	 * Enqueues setting the text content.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} textContent Text content to set.
	 * @private
	 */
	function enqueueTextContent(parentID, textContent) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
	    markupIndex: null,
	    textContent: textContent,
	    fromIndex: null,
	    toIndex: null
	  });
	}

	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */
	function processQueue() {
	  if (updateQueue.length) {
	    ReactComponent.DOMIDOperations.dangerouslyProcessChildrenUpdates(
	      updateQueue,
	      markupQueue
	    );
	    clearQueue();
	  }
	}

	/**
	 * Clears any enqueued updates.
	 *
	 * @private
	 */
	function clearQueue() {
	  updateQueue.length = 0;
	  markupQueue.length = 0;
	}

	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */
	var ReactMultiChild = {

	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {

	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function(nestedChildren, transaction) {
	      var children = flattenChildren(nestedChildren);
	      var mountImages = [];
	      var index = 0;
	      this._renderedChildren = children;
	      for (var name in children) {
	        var child = children[name];
	        if (children.hasOwnProperty(name) && child) {
	          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	          var rootID = this._rootNodeID + '.' + name;
	          var mountImage = child.mountComponent(
	            rootID,
	            transaction,
	            this._mountDepth + 1
	          );
	          child._mountImage = mountImage;
	          child._mountIndex = index;
	          mountImages.push(mountImage);
	          index++;
	        }
	      }
	      return mountImages;
	    },

	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function(nextContent) {
	      updateDepth++;
	      try {
	        var prevChildren = this._renderedChildren;
	        // Remove any rendered children.
	        for (var name in prevChildren) {
	          if (prevChildren.hasOwnProperty(name) &&
	              prevChildren[name]) {
	            this._unmountChildByName(prevChildren[name], name);
	          }
	        }
	        // Set new text content.
	        this.setTextContent(nextContent);
	      } catch (error) {
	        updateDepth--;
	        updateDepth || clearQueue();
	        throw error;
	      }
	      updateDepth--;
	      updateDepth || processQueue();
	    },

	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function(nextNestedChildren, transaction) {
	      updateDepth++;
	      try {
	        this._updateChildren(nextNestedChildren, transaction);
	      } catch (error) {
	        updateDepth--;
	        updateDepth || clearQueue();
	        throw error;
	      }
	      updateDepth--;
	      updateDepth || processQueue();
	    },

	    /**
	     * Improve performance by isolating this hot code path from the try/catch
	     * block in `updateChildren`.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function(nextNestedChildren, transaction) {
	      var nextChildren = flattenChildren(nextNestedChildren);
	      var prevChildren = this._renderedChildren;
	      if (!nextChildren && !prevChildren) {
	        return;
	      }
	      var name;
	      // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.
	      var lastIndex = 0;
	      var nextIndex = 0;
	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }
	        var prevChild = prevChildren && prevChildren[name];
	        var nextChild = nextChildren[name];
	        if (shouldUpdateChild(prevChild, nextChild)) {
	          this.moveChild(prevChild, nextIndex, lastIndex);
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild.receiveProps(nextChild.props, transaction);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	            this._unmountChildByName(prevChild, name);
	          }
	          if (nextChild) {
	            this._mountChildByNameAtIndex(
	              nextChild, name, nextIndex, transaction
	            );
	          }
	        }
	        if (nextChild) {
	          nextIndex++;
	        }
	      }
	      // Remove children that are no longer present.
	      for (name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name) &&
	            prevChildren[name] &&
	            !(nextChildren && nextChildren[name])) {
	          this._unmountChildByName(prevChildren[name], name);
	        }
	      }
	    },

	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted.
	     *
	     * @internal
	     */
	    unmountChildren: function() {
	      var renderedChildren = this._renderedChildren;
	      for (var name in renderedChildren) {
	        var renderedChild = renderedChildren[name];
	        if (renderedChild && renderedChild.unmountComponent) {
	          renderedChild.unmountComponent();
	        }
	      }
	      this._renderedChildren = null;
	    },

	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function(child, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
	      }
	    },

	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @protected
	     */
	    createChild: function(child) {
	      enqueueMarkup(this._rootNodeID, child._mountImage, child._mountIndex);
	    },

	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function(child) {
	      enqueueRemove(this._rootNodeID, child._mountIndex);
	    },

	    /**
	     * Sets this text content string.
	     *
	     * @param {string} textContent Text content to set.
	     * @protected
	     */
	    setTextContent: function(textContent) {
	      enqueueTextContent(this._rootNodeID, textContent);
	    },

	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildByNameAtIndex: function(child, name, index, transaction) {
	      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	      var rootID = this._rootNodeID + '.' + name;
	      var mountImage = child.mountComponent(
	        rootID,
	        transaction,
	        this._mountDepth + 1
	      );
	      child._mountImage = mountImage;
	      child._mountIndex = index;
	      this.createChild(child);
	      this._renderedChildren = this._renderedChildren || {};
	      this._renderedChildren[name] = child;
	    },

	    /**
	     * Unmounts a rendered child by name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @param {string} name Name of the child in `this._renderedChildren`.
	     * @private
	     */
	    _unmountChildByName: function(child, name) {
	      if (ReactComponent.isValidComponent(child)) {
	        this.removeChild(child);
	        child._mountImage = null;
	        child._mountIndex = null;
	        child.unmountComponent();
	        delete this._renderedChildren[name];
	      }
	    }

	  }

	};

	module.exports = ReactMultiChild;


/***/ },

/***/ 20:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPerf
	 * @typechecks static-only
	 */

	"use strict";

	var ReactPerf = {
	  /**
	   * Boolean to enable/disable measurement. Set to false by default to prevent
	   * accidental logging and perf loss.
	   */
	  enableMeasure: false,

	  /**
	   * Holds onto the measure function in use. By default, don't measure
	   * anything, but we'll override this if we inject a measure function.
	   */
	  storedMeasure: _noMeasure,

	  /**
	   * Use this to wrap methods you want to measure.
	   *
	   * @param {string} objName
	   * @param {string} fnName
	   * @param {function} func
	   * @return {function}
	   */
	  measure: function(objName, fnName, func) {
	      return func;
	  },

	  injection: {
	    /**
	     * @param {function} measure
	     */
	    injectMeasure: function(measure) {
	      ReactPerf.storedMeasure = measure;
	    }
	  }
	};

	/**
	 * Simply passes through the measured function, without measuring it.
	 *
	 * @param {string} objName
	 * @param {string} fnName
	 * @param {function} func
	 * @return {function}
	 */
	function _noMeasure(objName, fnName, func) {
	  return func;
	}

	module.exports = ReactPerf;


/***/ },

/***/ 21:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTypes
	 */

	"use strict";

	var createObjectFrom = require(76);
	var invariant = require(40);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyLink = React.createClass({
	 *     propTypes: {
	 *       // An optional string or URI prop named "href".
	 *       href: function(props, propName, componentName) {
	 *         var propValue = props[propName];
	 *         invariant(
	 *           propValue == null ||
	 *           typeof propValue === 'string' ||
	 *           propValue instanceof URI,
	 *           'Invalid `%s` supplied to `%s`, expected string or URI.',
	 *           propName,
	 *           componentName
	 *         );
	 *       }
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * @internal
	 */
	var Props = {

	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  oneOf: createEnumTypeChecker,

	  instanceOf: createInstanceTypeChecker

	};

	var ANONYMOUS = '<<anonymous>>';

	function createPrimitiveTypeChecker(expectedType) {
	  function validatePrimitiveType(propValue, propName, componentName) {
	    var propType = typeof propValue;
	    if (propType === 'object' && Array.isArray(propValue)) {
	      propType = 'array';
	    }
	    invariant(propType === expectedType);
	  }
	  return createChainableTypeChecker(validatePrimitiveType);
	}

	function createEnumTypeChecker(expectedValues) {
	  var expectedEnum = createObjectFrom(expectedValues);
	  function validateEnumType(propValue, propName, componentName) {
	    invariant(expectedEnum[propValue]);
	  }
	  return createChainableTypeChecker(validateEnumType);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validateInstanceType(propValue, propName, componentName) {
	    invariant(propValue instanceof expectedClass);
	  }
	  return createChainableTypeChecker(validateInstanceType);
	}

	function createChainableTypeChecker(validate) {
	  function createTypeChecker(isRequired) {
	    function checkType(props, propName, componentName) {
	      var propValue = props[propName];
	      if (propValue != null) {
	        // Only validate if there is a value to check.
	        validate(propValue, propName, componentName || ANONYMOUS);
	      } else {
	        invariant(!isRequired);
	      }
	    }
	    if (!isRequired) {
	      checkType.isRequired = createTypeChecker(true);
	    }
	    return checkType;
	  }
	  return createTypeChecker(false);
	}

	module.exports = Props;


/***/ },

/***/ 22:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks static-only
	 * @providesModule ReactServerRendering
	 */
	"use strict";

	var ReactMarkupChecksum = require(77);
	var ReactReconcileTransaction = require(78);
	var ReactInstanceHandles = require(17);

	/**
	 * @param {object} component
	 * @param {function} callback
	 */
	function renderComponentToString(component, callback) {
	  // We use a callback API to keep the API async in case in the future we ever
	  // need it, but in reality this is a synchronous operation.
	  var id = ReactInstanceHandles.createReactRootID();
	  var transaction = ReactReconcileTransaction.getPooled();
	  transaction.reinitializeTransaction();
	  try {
	    transaction.perform(function() {
	      var markup = component.mountComponent(id, transaction, 0);
	      markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
	      callback(markup);
	    }, null);
	  } finally {
	    ReactReconcileTransaction.release(transaction);
	  }
	}

	module.exports = {
	  renderComponentToString: renderComponentToString
	};


/***/ },

/***/ 23:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactTextComponent
	 * @typechecks static-only
	 */

	"use strict";

	var ReactComponent = require(11);
	var ReactMount = require(18);

	var escapeTextForBrowser = require(52);
	var mixInto = require(44);

	/**
	 * Text nodes violate a couple assumptions that React makes about components:
	 *
	 *  - When mounting text into the DOM, adjacent text nodes are merged.
	 *  - Text nodes cannot be assigned a React root ID.
	 *
	 * This component is used to wrap strings in elements so that they can undergo
	 * the same reconciliation that is applied to elements.
	 *
	 * TODO: Investigate representing React components in the DOM with text nodes.
	 *
	 * @class ReactTextComponent
	 * @extends ReactComponent
	 * @internal
	 */
	var ReactTextComponent = function(initialText) {
	  this.construct({text: initialText});
	};

	mixInto(ReactTextComponent, ReactComponent.Mixin);
	mixInto(ReactTextComponent, {

	  /**
	   * Creates the markup for this text node. This node is not intended to have
	   * any features besides containing text content.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {number} mountDepth number of components in the owner hierarchy
	   * @return {string} Markup for this text node.
	   * @internal
	   */
	  mountComponent: function(rootID, transaction, mountDepth) {
	    ReactComponent.Mixin.mountComponent.call(
	      this,
	      rootID,
	      transaction,
	      mountDepth
	    );
	    return (
	      '<span ' + ReactMount.ATTR_NAME + '="' + rootID + '">' +
	        escapeTextForBrowser(this.props.text) +
	      '</span>'
	    );
	  },

	  /**
	   * Updates this component by updating the text content.
	   *
	   * @param {object} nextProps Contains the next text content.
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  receiveProps: function(nextProps, transaction) {
	    if (nextProps.text !== this.props.text) {
	      this.props.text = nextProps.text;
	      ReactComponent.DOMIDOperations.updateTextContentByID(
	        this._rootNodeID,
	        nextProps.text
	      );
	    }
	  }

	});

	module.exports = ReactTextComponent;


/***/ },

/***/ 24:
/***/ function(module, exports, require) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = require(30)
		// The css code:
		(require(25))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },

/***/ 25:
/***/ function(module, exports, require) {

	module.exports =
		"* {\n  box-sizing: border-box;\n}\n\n.GlassPage-header,\n.GlassPage-footer {\n  font-family: sans-serif;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 40px;\n  text-align: center;\n}";

/***/ },

/***/ 26:
/***/ function(module, exports, require) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = require(30)
		// The css code:
		(require(27))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },

/***/ 27:
/***/ function(module, exports, require) {

	module.exports =
		".HomePage {\n  background: rgba(250, 250, 250, 0.5);\n  font-family: sans-serif;\n  padding: 10px;\n}";

/***/ },

/***/ 28:
/***/ function(module, exports, require) {

	var React = require(4);
	var Parse = require(127).Parse;

	var container = document.getElementById('react-root');

	function handleRouteChange(component) {
	  var routeParams = Array.prototype.slice.call(arguments, 1);
	  React.renderComponent(
	    component({routeParams: routeParams}, null),
	    container
	  );
	}

	var router = null;

	// TODO: use pushState for everything.

	var ReactHack = {
	  start: function(routes, pushState) {
	    if (router) {
	      throw new Error('Already started ReactHack');
	    }

	    var idseed = 0;
	    var backboneRoutes = {};
	    var backboneMethods = {};

	    for (var route in routes) {
	      if (!routes.hasOwnProperty(route)) {
	        continue;
	      }

	      var routeComponentClass = routes[route];
	      var routeName = 'route' + (idseed++);

	      backboneRoutes[route] = routeName;
	      backboneMethods[routeName] = handleRouteChange.bind(this, routeComponentClass);
	    }

	    // Set up default (error) route
	    backboneRoutes['*default'] = 'fourohfour';
	    backboneMethods['fourohfour'] = function() {
	      React.renderComponent(React.DOM.h1(null, 'ReactHack route not found.'), container);
	    };

	    backboneMethods.routes = backboneRoutes;

	    var AppRouter = Parse.Router.extend(backboneMethods);
	    router = new AppRouter();
	    Parse.history.start({pushState: !!pushState});
	  }
	};

	module.exports = ReactHack;

/***/ },

/***/ 29:
/***/ function(module, exports, require) {

	var Parse = require(127).Parse;

	// TODO: make this work out-of-the-box for Backbone by replacing
	// Parse.Object -> Backbone.Model
	// Parse.Collection -> Backbone.Collection

	var FetchingMixin = {
	  /**
	   * Helper that's useful with Parse.
	   */
	  stateSetter: function(key) {
	    return function(value) {
	      var newState = {};
	      newState[key] = value;
	      this.setState(newState);
	    }.bind(this);
	  },

	  _isModel: function(model) {
	    return (model && model instanceof Parse.Object || model instanceof Parse.Collection);
	  },

	  _subscribe: function(model) {
	    if (!this._isModel(model)) {
	      return;
	    }
	    // Detect if it's a collection
	    if (model instanceof Parse.Collection) {
	      model.on('add remove reset sort', function () { this.forceUpdate(); }, this);
	    } else if (model) {
	      var changeOptions = this.changeOptions || 'change';
	      model.on(changeOptions, (this.onModelChange || function () { this.forceUpdate(); }), this);
	    }
	  },

	  _unsubscribe: function(model) {
	    if (!this._isModel(model)) {
	      return;
	    }
	    model.off(null, null, this);
	  },

	  _subscribeAll: function(state) {
	    this.modelState.forEach(function(key) {
	      this._subscribe(state[key]);
	    }.bind(this));
	  },

	  _unsubscribeAll: function(state) {
	    this.modelState.forEach(function(key) {
	      this._unsubscribe(state[key]);
	    }.bind(this));
	  },

	  componentWillMount: function() {
	    if (!Array.isArray(this.modelState)) {
	      throw new Error('FetchingMixin requires a modelState array attribute');
	    }

	    if (typeof this.fetchData !== 'function') {
	      throw new Error('FetchingMixin requires a fetchData() method');
	    }
	  },

	  componentDidMount: function() {
	    // Whenever there may be a change in the Backbone data, trigger a reconcile.
	    this._subscribeAll(this.state);

	    this.fetchData();

	    this._interval = null;
	    if (this.fetchPollInterval) {
	      this._interval = setInterval(this.fetchData, this.fetchPollInterval);
	    }
	  },

	  componentDidUpdate: function(prevProps, prevState) {
	    this._unsubscribeAll(prevState);
	    this._subscribeAll(this.state);

	    if (this.shouldRefreshData && this.shouldRefreshData(prevProps)) {
	      this.fetchData();
	    }
	  },

	  componentWillUnmount: function() {
	    // Ensure that we clean up any dangling references when the component is destroyed.
	    this._unsubscribeAll(this.state);
	    if (this._interval) {
	      clearInterval(this.interval);
	    }
	  }
	};

	module.exports = FetchingMixin;

/***/ },

/***/ 30:
/***/ function(module, exports, require) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(cssCode) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		return function() {
			head.removeChild(styleElement);
		};
	}

/***/ },

/***/ 31:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	var GlassViewport = React.createClass({displayName: 'GlassViewport',
	  getDefaultProps: function() {
	    return {glassStyle: {}};
	  },

	  render: function() {
	    var style = {
	      position: 'absolute',
	      left: this.props.left,
	      top: this.props.top,
	      width: this.props.width,
	      height: this.props.height,
	      overflow: 'hidden'
	    };

	    var glassStyle = this.props.glassStyle || {};
	    glassStyle.position = 'absolute';
	    // TODO: this won't animate well. Not sure if compositing will
	    // make things better or worse...
	    glassStyle.left = -this.props.left;
	    glassStyle.top = -this.props.top;

	    var contentStyle = {
	      bottom: 0,
	      left: 0,
	      position: 'absolute',
	      right: 0,
	      top: 0
	    };

	    return this.transferPropsTo(
	      React.DOM.div( {style:style}, 
	        React.DOM.div( {style:glassStyle}, 
	          this.props.glassContent
	        ),
	        React.DOM.div( {style:contentStyle}, 
	          this.props.children
	        )
	      )
	    );
	  }
	});

	module.exports = GlassViewport;

/***/ },

/***/ 32:
/***/ function(module, exports, require) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = require(30)
		// The css code:
		(require(33))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },

/***/ 33:
/***/ function(module, exports, require) {

	module.exports =
		".Message {\n  bottom: 0;\n  font-family: sans-serif;\n  font-size: 12px;\n  left: 0;\n  margin-top: -6px;\n  position: absolute;\n  right: 0;\n  text-align: center;\n  top: 50%;\n}\n\n.Message,\n.Message a {\n  color: gray;\n}";

/***/ },

/***/ 34:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var EasingFunctions = require(80);
	var ImageCard = require(79);
	var React = require(4);
	var StyleKeys = require(140);

	require(81);

	var ImageCardContainer = React.createClass({displayName: 'ImageCardContainer',
	  render: function() {
	    var card = this.transferPropsTo(ImageCard(null ));
	    var pct = (this.props.left - (this.props.index * this.props.width)) / this.props.width;
	    var x = this.props.index * this.props.width - this.props.left;
	    var y = 0;
	    var z = Math.abs(pct * 200) * -1;
	    var yAxis = this.props.left > this.props.index * this.props.width ? 1 : -1;
	    var deg = Math.abs(pct * 69);

	    var style = {
	      opacity: EasingFunctions.easeOutCubic(1 - Math.abs(pct))
	    };

	    style[StyleKeys.TRANSFORM] = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) rotate3d(0, ' + yAxis + ', 0, ' + deg + 'deg)';
	    return React.DOM.div( {style:style, className:"ImageCardContainer"}, card);
	  }
	});

	module.exports = ImageCardContainer;

/***/ },

/***/ 35:
/***/ function(module, exports, require) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = require(30)
		// The css code:
		(require(36))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },

/***/ 36:
/***/ function(module, exports, require) {

	module.exports =
		".Viewer {\n  overflow: hidden;\n  perspective: 500px;\n  -webkit-perspective: 500px;\n  -moz-perspective: 500px;\n}";

/***/ },

/***/ 37:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponentEnvironment
	 */

	var ReactComponentBrowserEnvironment =
	  require(83);

	var ReactComponentEnvironment = ReactComponentBrowserEnvironment;

	module.exports = ReactComponentEnvironment;


/***/ },

/***/ 38:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactOwner
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {

	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid owner.
	   * @final
	   */
	  isValidOwner: function(object) {
	    return !!(
	      object &&
	      typeof object.attachRef === 'function' &&
	      typeof object.detachRef === 'function'
	    );
	  },

	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function(component, ref, owner) {
	    invariant(ReactOwner.isValidOwner(owner));
	    owner.attachRef(ref, component);
	  },

	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function(component, ref, owner) {
	    invariant(ReactOwner.isValidOwner(owner));
	    // Check that `component` is still the current ref because we do not want to
	    // detach the ref if another component stole it.
	    if (owner.refs[ref] === component) {
	      owner.detachRef(ref);
	    }
	  },

	  /**
	   * A ReactComponent must mix this in to have refs.
	   *
	   * @lends {ReactOwner.prototype}
	   */
	  Mixin: {

	    /**
	     * Lazily allocates the refs object and stores `component` as `ref`.
	     *
	     * @param {string} ref Reference name.
	     * @param {component} component Component to store as `ref`.
	     * @final
	     * @private
	     */
	    attachRef: function(ref, component) {
	      invariant(component.isOwnedBy(this));
	      var refs = this.refs || (this.refs = {});
	      refs[ref] = component;
	    },

	    /**
	     * Detaches a reference name.
	     *
	     * @param {string} ref Name to dereference.
	     * @final
	     * @private
	     */
	    detachRef: function(ref) {
	      delete this.refs[ref];
	    }

	  }

	};

	module.exports = ReactOwner;


/***/ },

/***/ 39:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactUpdates
	 */

	"use strict";

	var invariant = require(40);

	var dirtyComponents = [];

	var batchingStrategy = null;

	function ensureBatchingStrategy() {
	  invariant(batchingStrategy);
	}

	function batchedUpdates(callback, param) {
	  ensureBatchingStrategy();
	  batchingStrategy.batchedUpdates(callback, param);
	}

	/**
	 * Array comparator for ReactComponents by owner depth
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountDepthComparator(c1, c2) {
	  return c1._mountDepth - c2._mountDepth;
	}

	function runBatchedUpdates() {
	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.

	  dirtyComponents.sort(mountDepthComparator);

	  for (var i = 0; i < dirtyComponents.length; i++) {
	    // If a component is unmounted before pending changes apply, ignore them
	    // TODO: Queue unmounts in the same list to avoid this happening at all
	    var component = dirtyComponents[i];
	    if (component.isMounted()) {
	      // If performUpdateIfNecessary happens to enqueue any new updates, we
	      // shouldn't execute the callbacks until the next render happens, so
	      // stash the callbacks first
	      var callbacks = component._pendingCallbacks;
	      component._pendingCallbacks = null;
	      component.performUpdateIfNecessary();
	      if (callbacks) {
	        for (var j = 0; j < callbacks.length; j++) {
	          callbacks[j].call(component);
	        }
	      }
	    }
	  }
	}

	function clearDirtyComponents() {
	  dirtyComponents.length = 0;
	}

	function flushBatchedUpdates() {
	  // Run these in separate functions so the JIT can optimize
	  try {
	    runBatchedUpdates();
	  } catch (e) {
	    // IE 8 requires catch to use finally.
	    throw e;
	  } finally {
	    clearDirtyComponents();
	  }
	}

	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component, callback) {
	  invariant(!callback || typeof callback === "function");
	  ensureBatchingStrategy();

	  if (!batchingStrategy.isBatchingUpdates) {
	    component.performUpdateIfNecessary();
	    callback && callback();
	    return;
	  }

	  dirtyComponents.push(component);

	  if (callback) {
	    if (component._pendingCallbacks) {
	      component._pendingCallbacks.push(callback);
	    } else {
	      component._pendingCallbacks = [callback];
	    }
	  }
	}

	var ReactUpdatesInjection = {
	  injectBatchingStrategy: function(_batchingStrategy) {
	    invariant(_batchingStrategy);
	    invariant(typeof _batchingStrategy.batchedUpdates === 'function');
	    invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean');
	    batchingStrategy = _batchingStrategy;
	  }
	};

	var ReactUpdates = {
	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection
	};

	module.exports = ReactUpdates;


/***/ },

/***/ 40:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule invariant
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf style format and arguments to provide information about
	 * what broke and what you were expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition) {
	  if (!condition) {
	    throw new Error('Invariant Violation');
	  }
	}

	module.exports = invariant;


/***/ },

/***/ 41:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  invariant(obj instanceof Object && !Array.isArray(obj));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },

/***/ 42:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule merge
	 */

	"use strict";

	var mergeInto = require(46);

	/**
	 * Shallow merges two structures into a return value, without mutating either.
	 *
	 * @param {?object} one Optional object with properties to merge from.
	 * @param {?object} two Optional object with properties to merge from.
	 * @return {object} The shallow extension of one by two.
	 */
	var merge = function(one, two) {
	  var result = {};
	  mergeInto(result, one);
	  mergeInto(result, two);
	  return result;
	};

	module.exports = merge;


/***/ },

/***/ 43:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactPropTransferer
	 */

	"use strict";

	var emptyFunction = require(84);
	var invariant = require(40);
	var joinClasses = require(85);
	var merge = require(42);

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Never transfer the `ref` prop.
	   */
	  ref: emptyFunction,
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: createTransferStrategy(merge)
	};

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  TransferStrategies: TransferStrategies,

	  /**
	   * @lends {ReactPropTransferer.prototype}
	   */
	  Mixin: {

	    /**
	     * Transfer props from this component to a target component.
	     *
	     * Props that do not have an explicit transfer strategy will be transferred
	     * only if the target component does not already have the prop set.
	     *
	     * This is usually used to pass down props to a returned root component.
	     *
	     * @param {ReactComponent} component Component receiving the properties.
	     * @return {ReactComponent} The supplied `component`.
	     * @final
	     * @protected
	     */
	    transferPropsTo: function(component) {
	      invariant(component.props.__owner__ === this);

	      var props = {};
	      for (var thatKey in component.props) {
	        if (component.props.hasOwnProperty(thatKey)) {
	          props[thatKey] = component.props[thatKey];
	        }
	      }
	      for (var thisKey in this.props) {
	        if (!this.props.hasOwnProperty(thisKey)) {
	          continue;
	        }
	        var transferStrategy = TransferStrategies[thisKey];
	        if (transferStrategy) {
	          transferStrategy(props, thisKey, this.props[thisKey]);
	        } else if (!props.hasOwnProperty(thisKey)) {
	          props[thisKey] = this.props[thisKey];
	        }
	      }
	      component.props = props;
	      return component;
	    }

	  }

	};

	module.exports = ReactPropTransferer;


/***/ },

/***/ 44:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mixInto
	 */

	"use strict";

	/**
	 * Simply copies properties to the prototype.
	 */
	var mixInto = function(constructor, methodBag) {
	  var methodName;
	  for (methodName in methodBag) {
	    if (!methodBag.hasOwnProperty(methodName)) {
	      continue;
	    }
	    constructor.prototype[methodName] = methodBag[methodName];
	  }
	};

	module.exports = mixInto;


/***/ },

/***/ 45:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule objMap
	 */

	"use strict";

	/**
	 * For each key/value pair, invokes callback func and constructs a resulting
	 * object which contains, for every key in obj, values that are the result of
	 * of invoking the function:
	 *
	 *   func(value, key, iteration)
	 *
	 * @param {?object} obj Object to map keys over
	 * @param {function} func Invoked for each key/val pair.
	 * @param {?*} context
	 * @return {?object} Result of mapping or null if obj is falsey
	 */
	function objMap(obj, func, context) {
	  if (!obj) {
	    return null;
	  }
	  var i = 0;
	  var ret = {};
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      ret[key] = func.call(context, obj[key], key, i++);
	    }
	  }
	  return ret;
	}

	module.exports = objMap;


/***/ },

/***/ 46:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mergeInto
	 * @typechecks static-only
	 */

	"use strict";

	var mergeHelpers = require(86);

	var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;

	/**
	 * Shallow merges two structures by mutating the first parameter.
	 *
	 * @param {object} one Object to be merged into.
	 * @param {?object} two Optional object with properties to merge from.
	 */
	function mergeInto(one, two) {
	  checkMergeObjectArg(one);
	  if (two != null) {
	    checkMergeObjectArg(two);
	    for (var key in two) {
	      if (!two.hasOwnProperty(key)) {
	        continue;
	      }
	      one[key] = two[key];
	    }
	  }
	}

	module.exports = mergeInto;


/***/ },

/***/ 47:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule objMapKeyVal
	 */

	"use strict";

	/**
	 * Behaves the same as `objMap` but invokes func with the key first, and value
	 * second. Use `objMap` unless you need this special case.
	 * Invokes func as:
	 *
	 *   func(key, value, iteration)
	 *
	 * @param {?object} obj Object to map keys over
	 * @param {!function} func Invoked for each key/val pair.
	 * @param {?*} context
	 * @return {?object} Result of mapping or null if obj is falsey
	 */
	function objMapKeyVal(obj, func, context) {
	  if (!obj) {
	    return null;
	  }
	  var i = 0;
	  var ret = {};
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      ret[key] = func.call(context, key, obj[key], i++);
	    }
	  }
	  return ret;
	}

	module.exports = objMapKeyVal;


/***/ },

/***/ 48:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */

	"use strict";

	var CSSProperty = require(87);

	var dangerousStyleValue = require(88);
	var escapeTextForBrowser = require(52);
	var hyphenate = require(89);
	var memoizeStringOnly = require(90);

	var processStyleName = memoizeStringOnly(function(styleName) {
	  return escapeTextForBrowser(hyphenate(styleName));
	});

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function(styles) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue) + ';';
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function(node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }

	};

	module.exports = CSSPropertyOperations;


/***/ },

/***/ 49:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMProperty
	 * @typechecks static-only
	 */

	/*jslint bitwise: true */

	"use strict";

	var invariant = require(40);

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_ATTRIBUTE: 0x1,
	  MUST_USE_PROPERTY:  0x2,
	  HAS_BOOLEAN_VALUE:  0x4,
	  HAS_SIDE_EFFECTS:   0x8,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function(domPropertyConfig) {
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(
	        domPropertyConfig.isCustomAttribute
	      );
	    }

	    for (var propName in Properties) {
	      invariant(!DOMProperty.isStandardName[propName]);

	      DOMProperty.isStandardName[propName] = true;

	      var lowerCased = propName.toLowerCase();
	      DOMProperty.getPossibleStandardName[lowerCased] = propName;

	      var attributeName = DOMAttributeNames[propName];
	      if (attributeName) {
	        DOMProperty.getPossibleStandardName[attributeName] = propName;
	      }

	      DOMProperty.getAttributeName[propName] = attributeName || lowerCased;

	      DOMProperty.getPropertyName[propName] =
	        DOMPropertyNames[propName] || propName;

	      var mutationMethod = DOMMutationMethods[propName];
	      if (mutationMethod) {
	        DOMProperty.getMutationMethod[propName] = mutationMethod;
	      }

	      var propConfig = Properties[propName];
	      DOMProperty.mustUseAttribute[propName] =
	        propConfig & DOMPropertyInjection.MUST_USE_ATTRIBUTE;
	      DOMProperty.mustUseProperty[propName] =
	        propConfig & DOMPropertyInjection.MUST_USE_PROPERTY;
	      DOMProperty.hasBooleanValue[propName] =
	        propConfig & DOMPropertyInjection.HAS_BOOLEAN_VALUE;
	      DOMProperty.hasSideEffects[propName] =
	        propConfig & DOMPropertyInjection.HAS_SIDE_EFFECTS;

	      invariant(!DOMProperty.mustUseAttribute[propName] ||
	        !DOMProperty.mustUseProperty[propName]);
	      invariant(DOMProperty.mustUseProperty[propName] ||
	        !DOMProperty.hasSideEffects[propName]);
	    }
	  }
	};
	var defaultValueCache = {};

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {

	  /**
	   * Checks whether a property name is a standard property.
	   * @type {Object}
	   */
	  isStandardName: {},

	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties.
	   * @type {Object}
	   */
	  getPossibleStandardName: {},

	  /**
	   * Mapping from normalized names to attribute names that differ. Attribute
	   * names are used when rendering markup or with `*Attribute()`.
	   * @type {Object}
	   */
	  getAttributeName: {},

	  /**
	   * Mapping from normalized names to properties on DOM node instances.
	   * (This includes properties that mutate due to external factors.)
	   * @type {Object}
	   */
	  getPropertyName: {},

	  /**
	   * Mapping from normalized names to mutation methods. This will only exist if
	   * mutation cannot be set simply by the property or `setAttribute()`.
	   * @type {Object}
	   */
	  getMutationMethod: {},

	  /**
	   * Whether the property must be accessed and mutated as an object property.
	   * @type {Object}
	   */
	  mustUseAttribute: {},

	  /**
	   * Whether the property must be accessed and mutated using `*Attribute()`.
	   * (This includes anything that fails `<propName> in <element>`.)
	   * @type {Object}
	   */
	  mustUseProperty: {},

	  /**
	   * Whether the property should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasBooleanValue: {},

	  /**
	   * Whether or not setting a value causes side effects such as triggering
	   * resources to be loaded or text selection changes. We must ensure that
	   * the value is only set if it has changed.
	   * @type {Object}
	   */
	  hasSideEffects: {},

	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],

	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function(attributeName) {
	    return DOMProperty._isCustomAttributeFunctions.some(
	      function(isCustomAttributeFn) {
	        return isCustomAttributeFn.call(null, attributeName);
	      }
	    );
	  },

	  /**
	   * Returns the default property value for a DOM property (i.e., not an
	   * attribute). Most default values are '' or false, but not all. Worse yet,
	   * some (in particular, `type`) vary depending on the type of element.
	   *
	   * TODO: Is it better to grab all the possible properties when creating an
	   * element to avoid having to create the same element twice?
	   */
	  getDefaultValueForProperty: function(nodeName, prop) {
	    var nodeDefaults = defaultValueCache[nodeName];
	    var testElement;
	    if (!nodeDefaults) {
	      defaultValueCache[nodeName] = nodeDefaults = {};
	    }
	    if (!(prop in nodeDefaults)) {
	      testElement = document.createElement(nodeName);
	      nodeDefaults[prop] = testElement[prop];
	    }
	    return nodeDefaults[prop];
	  },

	  injection: DOMPropertyInjection
	};

	module.exports = DOMProperty;


/***/ },

/***/ 50:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMPropertyOperations
	 * @typechecks static-only
	 */

	"use strict";
	var DOMProperty = require(49);
	var escapeTextForBrowser = require(52);
	var memoizeStringOnly = require(90);

	var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
	  return escapeTextForBrowser(name) + '="';
	});

	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMPropertyOperations = {

	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function(name, value) {
	    if (DOMProperty.isStandardName[name]) {
	      if (value == null || DOMProperty.hasBooleanValue[name] && !value) {
	        return '';
	      }
	      var attributeName = DOMProperty.getAttributeName[name];
	      return processAttributeNameAndPrefix(attributeName) +
	        escapeTextForBrowser(value) + '"';
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        return '';
	      }
	      return processAttributeNameAndPrefix(name) +
	        escapeTextForBrowser(value) + '"';
	    }
	    return null;
	  },

	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  setValueForProperty: function(node, name, value) {
	    if (DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, value);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        if (DOMProperty.hasBooleanValue[name] && !value) {
	          node.removeAttribute(DOMProperty.getAttributeName[name]);
	        } else {
	          node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
	        }
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        if (!DOMProperty.hasSideEffects[name] || node[propName] !== value) {
	          node[propName] = value;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      node.setAttribute(name, '' + value);
	    }
	  },

	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForProperty: function(node, name) {
	    if (DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, undefined);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        node.removeAttribute(DOMProperty.getAttributeName[name]);
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        node[propName] = DOMProperty.getDefaultValueForProperty(
	          node.nodeName,
	          name
	        );
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      node.removeAttribute(name);
	    }
	  }

	};

	module.exports = DOMPropertyOperations;


/***/ },

/***/ 51:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEventEmitter
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = require(91);
	var EventListener = require(92);
	var EventPluginHub = require(66);
	var ExecutionEnvironment = require(93);
	var ReactEventEmitterMixin = require(94);
	var ViewportMetrics = require(95);

	var invariant = require(40);
	var isEventSupported = require(96);
	var merge = require(42);

	/**
	 * Summary of `ReactEventEmitter` event handling:
	 *
	 *  - Top-level delegation is used to trap native browser events. We normalize
	 *    and de-duplicate events to account for browser quirks.
	 *
	 *  - Forward these native events (with the associated top-level type used to
	 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
	 *    to extract any synthetic events.
	 *
	 *  - The `EventPluginHub` will then process each event by annotating them with
	 *    "dispatches", a sequence of listeners and IDs that care about that event.
	 *
	 *  - The `EventPluginHub` then dispatches the events.
	 *
	 * Overview of React and the event system:
	 *
	 *                   .
	 * +------------+    .
	 * |    DOM     |    .
	 * +------------+    .                         +-----------+
	 *       +           .               +--------+|SimpleEvent|
	 *       |           .               |         |Plugin     |
	 * +-----|------+    .               v         +-----------+
	 * |     |      |    .    +--------------+                    +------------+
	 * |     +-----------.--->|EventPluginHub|                    |    Event   |
	 * |            |    .    |              |     +-----------+  | Propagators|
	 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
	 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
	 * |            |    .    |              |     +-----------+  |  utilities |
	 * |     +-----------.---------+         |                    +------------+
	 * |     |      |    .    +----|---------+
	 * +-----|------+    .         |      ^        +-----------+
	 *       |           .         |      |        |Enter/Leave|
	 *       +           .         |      +-------+|Plugin     |
	 * +-------------+   .         v               +-----------+
	 * | application |   .    +----------+
	 * |-------------|   .    | callback |
	 * |             |   .    | registry |
	 * |             |   .    +----------+
	 * +-------------+   .
	 *                   .
	 *    React Core     .  General Purpose Event Plugin System
	 */

	/**
	 * Traps top-level events by using event bubbling.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {string} handlerBaseName Event name (e.g. "click").
	 * @param {DOMEventTarget} element Element on which to attach listener.
	 * @internal
	 */
	function trapBubbledEvent(topLevelType, handlerBaseName, element) {
	  EventListener.listen(
	    element,
	    handlerBaseName,
	    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
	      topLevelType
	    )
	  );
	}

	/**
	 * Traps a top-level event by using event capturing.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {string} handlerBaseName Event name (e.g. "click").
	 * @param {DOMEventTarget} element Element on which to attach listener.
	 * @internal
	 */
	function trapCapturedEvent(topLevelType, handlerBaseName, element) {
	  EventListener.capture(
	    element,
	    handlerBaseName,
	    ReactEventEmitter.TopLevelCallbackCreator.createTopLevelCallback(
	      topLevelType
	    )
	  );
	}

	/**
	 * Listens to window scroll and resize events. We cache scroll values so that
	 * application code can access them without triggering reflows.
	 *
	 * NOTE: Scroll events do not bubble.
	 *
	 * @private
	 * @see http://www.quirksmode.org/dom/events/scroll.html
	 */
	function registerScrollValueMonitoring() {
	  var refresh = ViewportMetrics.refreshScrollValues;
	  EventListener.listen(window, 'scroll', refresh);
	  EventListener.listen(window, 'resize', refresh);
	}

	/**
	 * `ReactEventEmitter` is used to attach top-level event listeners. For example:
	 *
	 *   ReactEventEmitter.putListener('myID', 'onClick', myFunction);
	 *
	 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
	 *
	 * @internal
	 */
	var ReactEventEmitter = merge(ReactEventEmitterMixin, {

	  /**
	   * React references `ReactEventTopLevelCallback` using this property in order
	   * to allow dependency injection.
	   */
	  TopLevelCallbackCreator: null,

	  /**
	   * Ensures that top-level event delegation listeners are installed.
	   *
	   * There are issues with listening to both touch events and mouse events on
	   * the top-level, so we make the caller choose which one to listen to. (If
	   * there's a touch top-level listeners, anchors don't receive clicks for some
	   * reason, and only in some cases).
	   *
	   * @param {boolean} touchNotMouse Listen to touch events instead of mouse.
	   * @param {DOMDocument} contentDocument DOM document to listen on
	   */
	  ensureListening: function(touchNotMouse, contentDocument) {
	    invariant(ExecutionEnvironment.canUseDOM);
	    invariant(ReactEventEmitter.TopLevelCallbackCreator);
	    // Call out to base implementation.
	    ReactEventEmitterMixin.ensureListening.call(
	      ReactEventEmitter,
	      {
	        touchNotMouse: touchNotMouse,
	        contentDocument: contentDocument
	      }
	    );
	  },

	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function(enabled) {
	    invariant(ExecutionEnvironment.canUseDOM);
	    if (ReactEventEmitter.TopLevelCallbackCreator) {
	      ReactEventEmitter.TopLevelCallbackCreator.setEnabled(enabled);
	    }
	  },

	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function() {
	    return !!(
	      ReactEventEmitter.TopLevelCallbackCreator &&
	      ReactEventEmitter.TopLevelCallbackCreator.isEnabled()
	    );
	  },

	  /**
	   * We listen for bubbled touch events on the document object.
	   *
	   * Firefox v8.01 (and possibly others) exhibited strange behavior when
	   * mounting `onmousemove` events at some node that was not the document
	   * element. The symptoms were that if your mouse is not moving over something
	   * contained within that mount point (for example on the background) the
	   * top-level listeners for `onmousemove` won't be called. However, if you
	   * register the `mousemove` on the document object, then it will of course
	   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
	   * top-level listeners to the document object only, at least for these
	   * movement types of events and possibly all events.
	   *
	   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	   *
	   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
	   * they bubble to document.
	   *
	   * @param {boolean} touchNotMouse Listen to touch events instead of mouse.
	   * @param {DOMDocument} contentDocument Document which owns the container
	   * @private
	   * @see http://www.quirksmode.org/dom/events/keys.html.
	   */
	  listenAtTopLevel: function(touchNotMouse, contentDocument) {
	    invariant(!contentDocument._isListening);
	    var topLevelTypes = EventConstants.topLevelTypes;
	    var mountAt = contentDocument;

	    registerScrollValueMonitoring();
	    trapBubbledEvent(topLevelTypes.topMouseOver, 'mouseover', mountAt);
	    trapBubbledEvent(topLevelTypes.topMouseDown, 'mousedown', mountAt);
	    trapBubbledEvent(topLevelTypes.topMouseUp, 'mouseup', mountAt);
	    trapBubbledEvent(topLevelTypes.topMouseMove, 'mousemove', mountAt);
	    trapBubbledEvent(topLevelTypes.topMouseOut, 'mouseout', mountAt);
	    trapBubbledEvent(topLevelTypes.topClick, 'click', mountAt);
	    trapBubbledEvent(topLevelTypes.topDoubleClick, 'dblclick', mountAt);
	    if (touchNotMouse) {
	      trapBubbledEvent(topLevelTypes.topTouchStart, 'touchstart', mountAt);
	      trapBubbledEvent(topLevelTypes.topTouchEnd, 'touchend', mountAt);
	      trapBubbledEvent(topLevelTypes.topTouchMove, 'touchmove', mountAt);
	      trapBubbledEvent(topLevelTypes.topTouchCancel, 'touchcancel', mountAt);
	    }
	    trapBubbledEvent(topLevelTypes.topKeyUp, 'keyup', mountAt);
	    trapBubbledEvent(topLevelTypes.topKeyPress, 'keypress', mountAt);
	    trapBubbledEvent(topLevelTypes.topKeyDown, 'keydown', mountAt);
	    trapBubbledEvent(topLevelTypes.topInput, 'input', mountAt);
	    trapBubbledEvent(topLevelTypes.topChange, 'change', mountAt);
	    trapBubbledEvent(
	      topLevelTypes.topSelectionChange,
	      'selectionchange',
	      mountAt
	    );

	    trapBubbledEvent(
	      topLevelTypes.topCompositionEnd,
	      'compositionend',
	      mountAt
	    );
	    trapBubbledEvent(
	      topLevelTypes.topCompositionStart,
	      'compositionstart',
	      mountAt
	    );
	    trapBubbledEvent(
	      topLevelTypes.topCompositionUpdate,
	      'compositionupdate',
	      mountAt
	    );

	    if (isEventSupported('drag')) {
	      trapBubbledEvent(topLevelTypes.topDrag, 'drag', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragEnd, 'dragend', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragEnter, 'dragenter', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragExit, 'dragexit', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragLeave, 'dragleave', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragOver, 'dragover', mountAt);
	      trapBubbledEvent(topLevelTypes.topDragStart, 'dragstart', mountAt);
	      trapBubbledEvent(topLevelTypes.topDrop, 'drop', mountAt);
	    }

	    if (isEventSupported('wheel')) {
	      trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
	    } else if (isEventSupported('mousewheel')) {
	      trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
	    } else {
	      // Firefox needs to capture a different mouse scroll event.
	      // @see http://www.quirksmode.org/dom/events/tests/scroll.html
	      trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
	    }

	    // IE<9 does not support capturing so just trap the bubbled event there.
	    if (isEventSupported('scroll', true)) {
	      trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
	    } else {
	      trapBubbledEvent(topLevelTypes.topScroll, 'scroll', window);
	    }

	    if (isEventSupported('focus', true)) {
	      trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
	      trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
	    } else if (isEventSupported('focusin')) {
	      // IE has `focusin` and `focusout` events which bubble.
	      // @see
	      // http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	      trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
	      trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
	    }

	    if (isEventSupported('copy')) {
	      trapBubbledEvent(topLevelTypes.topCopy, 'copy', mountAt);
	      trapBubbledEvent(topLevelTypes.topCut, 'cut', mountAt);
	      trapBubbledEvent(topLevelTypes.topPaste, 'paste', mountAt);
	    }
	  },

	  registrationNames: EventPluginHub.registrationNames,

	  putListener: EventPluginHub.putListener,

	  getListener: EventPluginHub.getListener,

	  deleteListener: EventPluginHub.deleteListener,

	  deleteAllListeners: EventPluginHub.deleteAllListeners,

	  trapBubbledEvent: trapBubbledEvent,

	  trapCapturedEvent: trapCapturedEvent

	});


	module.exports = ReactEventEmitter;


/***/ },

/***/ 52:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule escapeTextForBrowser
	 * @typechecks static-only
	 */

	"use strict";

	var ESCAPE_LOOKUP = {
	  "&": "&amp;",
	  ">": "&gt;",
	  "<": "&lt;",
	  "\"": "&quot;",
	  "'": "&#x27;",
	  "/": "&#x2f;"
	};

	var ESCAPE_REGEX = /[&><"'\/]/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextForBrowser;


/***/ },

/***/ 53:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },

/***/ 54:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMButton
	 */

	"use strict";

	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);

	var keyMirror = require(41);

	// Store a reference to the <button> `ReactDOMComponent`.
	var button = ReactDOM.button;

	var mouseListenerNames = keyMirror({
	  onClick: true,
	  onDoubleClick: true,
	  onMouseDown: true,
	  onMouseMove: true,
	  onMouseUp: true,
	  onClickCapture: true,
	  onDoubleClickCapture: true,
	  onMouseDownCapture: true,
	  onMouseMoveCapture: true,
	  onMouseUpCapture: true
	});

	/**
	 * Implements a <button> native component that does not receive mouse events
	 * when `disabled` is set.
	 */
	var ReactDOMButton = ReactCompositeComponent.createClass({

	  render: function() {
	    var props = {};

	    // Copy the props; except the mouse listeners if we're disabled
	    for (var key in this.props) {
	      if (this.props.hasOwnProperty(key) &&
	          (!this.props.disabled || !mouseListenerNames[key])) {
	        props[key] = this.props[key];
	      }
	    }

	    return button(props, this.props.children);
	  }

	});

	module.exports = ReactDOMButton;


/***/ },

/***/ 55:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMForm
	 */

	"use strict";

	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);
	var ReactEventEmitter = require(51);
	var EventConstants = require(91);

	// Store a reference to the <form> `ReactDOMComponent`.
	var form = ReactDOM.form;

	/**
	 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
	 * to capture it on the <form> element itself. There are lots of hacks we could
	 * do to accomplish this, but the most reliable is to make <form> a
	 * composite component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMForm = ReactCompositeComponent.createClass({
	  render: function() {
	    // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
	    // `jshint` fails to parse JSX so in order for linting to work in the open
	    // source repo, we need to just use `ReactDOM.form`.
	    return this.transferPropsTo(form(null, this.props.children));
	  },

	  componentDidMount: function(node) {
	    ReactEventEmitter.trapBubbledEvent(
	      EventConstants.topLevelTypes.topSubmit,
	      'submit',
	      node
	    );
	  }
	});

	module.exports = ReactDOMForm;


/***/ },

/***/ 56:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMInput
	 */

	"use strict";

	var DOMPropertyOperations = require(50);
	var LinkedValueMixin = require(97);
	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);
	var ReactMount = require(18);

	var invariant = require(40);
	var merge = require(42);

	// Store a reference to the <input> `ReactDOMComponent`.
	var input = ReactDOM.input;

	var instancesByReactID = {};

	/**
	 * Implements an <input> native component that allows setting these optional
	 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
	 *
	 * If `checked` or `value` are not supplied (or null/undefined), user actions
	 * that affect the checked state or value will trigger updates to the element.
	 *
	 * If they are supplied (and not null/undefined), the rendered element will not
	 * trigger updates to the element. Instead, the props must change in order for
	 * the rendered element to be updated.
	 *
	 * The rendered element will be initialized as unchecked (or `defaultChecked`)
	 * with an empty value (or `defaultValue`).
	 *
	 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
	 */
	var ReactDOMInput = ReactCompositeComponent.createClass({
	  mixins: [LinkedValueMixin],

	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    return {
	      checked: this.props.defaultChecked || false,
	      value: defaultValue != null ? defaultValue : ''
	    };
	  },

	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);

	    props.defaultChecked = null;
	    props.defaultValue = null;
	    props.checked =
	      this.props.checked != null ? this.props.checked : this.state.checked;

	    var value = this.getValue();
	    props.value = value != null ? value : this.state.value;

	    props.onChange = this._handleChange;

	    return input(props, this.props.children);
	  },

	  componentDidMount: function(rootNode) {
	    var id = ReactMount.getID(rootNode);
	    instancesByReactID[id] = this;
	  },

	  componentWillUnmount: function() {
	    var rootNode = this.getDOMNode();
	    var id = ReactMount.getID(rootNode);
	    delete instancesByReactID[id];
	  },

	  componentDidUpdate: function(prevProps, prevState, rootNode) {
	    if (this.props.checked != null) {
	      DOMPropertyOperations.setValueForProperty(
	        rootNode,
	        'checked',
	        this.props.checked || false
	      );
	    }

	    var value = this.getValue();
	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = this.getOnChange();
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange(event);
	      this._isChanging = false;
	    }
	    this.setState({
	      checked: event.target.checked,
	      value: event.target.value
	    });

	    var name = this.props.name;
	    if (this.props.type === 'radio' && name != null) {
	      var rootNode = this.getDOMNode();
	      // If `rootNode.form` was non-null, then we could try `form.elements`,
	      // but that sometimes behaves strangely in IE8. We could also try using
	      // `form.getElementsByName`, but that will only return direct children
	      // and won't include inputs that use the HTML5 `form=` attribute. Since
	      // the input might not even be in a form, let's just use the global
	      // `getElementsByName` to ensure we don't miss anything.
	      var group = document.getElementsByName(name);
	      for (var i = 0, groupLen = group.length; i < groupLen; i++) {
	        var otherNode = group[i];
	        if (otherNode === rootNode ||
	            otherNode.nodeName !== 'INPUT' || otherNode.type !== 'radio' ||
	            otherNode.form !== rootNode.form) {
	          continue;
	        }
	        var otherID = ReactMount.getID(otherNode);
	        invariant(otherID);
	        var otherInstance = instancesByReactID[otherID];
	        invariant(otherInstance);
	        // In some cases, this will actually change the `checked` state value.
	        // In other cases, there's no change but this forces a reconcile upon
	        // which componentDidUpdate will reset the DOM property to whatever it
	        // should be.
	        otherInstance.setState({
	          checked: false
	        });
	      }
	    }

	    return returnValue;
	  }

	});

	module.exports = ReactDOMInput;


/***/ },

/***/ 57:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMOption
	 */

	"use strict";

	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);

	// Store a reference to the <option> `ReactDOMComponent`.
	var option = ReactDOM.option;

	/**
	 * Implements an <option> native component that warns when `selected` is set.
	 */
	var ReactDOMOption = ReactCompositeComponent.createClass({

	  componentWillMount: function() {
	    // TODO (yungsters): Remove support for `selected` in <option>.
	    if (this.props.selected != null) {}
	  },

	  render: function() {
	    return option(this.props, this.props.children);
	  }

	});

	module.exports = ReactDOMOption;


/***/ },

/***/ 58:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMSelect
	 */

	"use strict";

	var LinkedValueMixin = require(97);
	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);

	var invariant = require(40);
	var merge = require(42);

	// Store a reference to the <select> `ReactDOMComponent`.
	var select = ReactDOM.select;

	/**
	 * Validation function for `value` and `defaultValue`.
	 * @private
	 */
	function selectValueType(props, propName, componentName) {
	  if (props[propName] == null) {
	    return;
	  }
	  if (props.multiple) {
	    invariant(Array.isArray(props[propName]));
	  } else {
	    invariant(!Array.isArray(props[propName]));
	  }
	}

	/**
	 * If `value` is supplied, updates <option> elements on mount and update.
	 * @private
	 */
	function updateOptions() {
	  /*jshint validthis:true */
	  var propValue = this.getValue();
	  var value = propValue != null ? propValue : this.state.value;
	  var options = this.getDOMNode().options;
	  var selectedValue = '' + value;

	  for (var i = 0, l = options.length; i < l; i++) {
	    var selected = this.props.multiple ?
	      selectedValue.indexOf(options[i].value) >= 0 :
	      selected = options[i].value === selectedValue;

	    if (selected !== options[i].selected) {
	      options[i].selected = selected;
	    }
	  }
	}

	/**
	 * Implements a <select> native component that allows optionally setting the
	 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
	 * string. If `multiple` is true, the prop must be an array of strings.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that change the
	 * selected option will trigger updates to the rendered options.
	 *
	 * If it is supplied (and not null/undefined), the rendered options will not
	 * update in response to user actions. Instead, the `value` prop must change in
	 * order for the rendered options to update.
	 *
	 * If `defaultValue` is provided, any options with the supplied values will be
	 * selected.
	 */
	var ReactDOMSelect = ReactCompositeComponent.createClass({
	  mixins: [LinkedValueMixin],

	  propTypes: {
	    defaultValue: selectValueType,
	    value: selectValueType
	  },

	  getInitialState: function() {
	    return {value: this.props.defaultValue || (this.props.multiple ? [] : '')};
	  },

	  componentWillReceiveProps: function(nextProps) {
	    if (!this.props.multiple && nextProps.multiple) {
	      this.setState({value: [this.state.value]});
	    } else if (this.props.multiple && !nextProps.multiple) {
	      this.setState({value: this.state.value[0]});
	    }
	  },

	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);

	    props.onChange = this._handleChange;
	    props.value = null;

	    return select(props, this.props.children);
	  },

	  componentDidMount: updateOptions,

	  componentDidUpdate: updateOptions,

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = this.getOnChange();
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange(event);
	      this._isChanging = false;
	    }

	    var selectedValue;
	    if (this.props.multiple) {
	      selectedValue = [];
	      var options = event.target.options;
	      for (var i = 0, l = options.length; i < l; i++) {
	        if (options[i].selected) {
	          selectedValue.push(options[i].value);
	        }
	      }
	    } else {
	      selectedValue = event.target.value;
	    }

	    this.setState({value: selectedValue});
	    return returnValue;
	  }

	});

	module.exports = ReactDOMSelect;


/***/ },

/***/ 59:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMTextarea
	 */

	"use strict";

	var DOMPropertyOperations = require(50);
	var LinkedValueMixin = require(97);
	var ReactCompositeComponent = require(12);
	var ReactDOM = require(14);

	var invariant = require(40);
	var merge = require(42);

	// Store a reference to the <textarea> `ReactDOMComponent`.
	var textarea = ReactDOM.textarea;

	/**
	 * Implements a <textarea> native component that allows setting `value`, and
	 * `defaultValue`. This differs from the traditional DOM API because value is
	 * usually set as PCDATA children.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that affect the
	 * value will trigger updates to the element.
	 *
	 * If `value` is supplied (and not null/undefined), the rendered element will
	 * not trigger updates to the element. Instead, the `value` prop must change in
	 * order for the rendered element to be updated.
	 *
	 * The rendered element will be initialized with an empty value, the prop
	 * `defaultValue` if specified, or the children content (deprecated).
	 */
	var ReactDOMTextarea = ReactCompositeComponent.createClass({
	  mixins: [LinkedValueMixin],

	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    // TODO (yungsters): Remove support for children content in <textarea>.
	    var children = this.props.children;
	    if (children != null) {
	        invariant(defaultValue == null);

	        if (Array.isArray(children)) {
	          invariant(children.length <= 1);
	          children = children[0];
	        }

	        defaultValue = '' + children;
	    }
	    if (defaultValue == null) {
	      defaultValue = '';
	    }
	    var value = this.getValue();
	    return {
	      // We save the initial value so that `ReactDOMComponent` doesn't update
	      // `textContent` (unnecessary since we update value).
	      // The initial value can be a boolean or object so that's why it's
	      // forced to be a string.
	      initialValue: '' + (value != null ? value : defaultValue),
	      value: defaultValue
	    };
	  },

	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onChange` handler.
	    return !this._isChanging;
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = merge(this.props);
	    var value = this.getValue();

	    invariant(props.dangerouslySetInnerHTML == null);

	    props.defaultValue = null;
	    props.value = value != null ? value : this.state.value;
	    props.onChange = this._handleChange;

	    // Always set children to the same thing. In IE9, the selection range will
	    // get reset if `textContent` is mutated.
	    return textarea(props, this.state.initialValue);
	  },

	  componentDidUpdate: function(prevProps, prevState, rootNode) {
	    var value = this.getValue();
	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = this.getOnChange();
	    if (onChange) {
	      this._isChanging = true;
	      returnValue = onChange(event);
	      this._isChanging = false;
	    }
	    this.setState({value: event.target.value});
	    return returnValue;
	  }

	});

	module.exports = ReactDOMTextarea;


/***/ },

/***/ 60:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEventTopLevelCallback
	 * @typechecks static-only
	 */

	"use strict";

	var ReactEventEmitter = require(51);
	var ReactMount = require(18);

	var getEventTarget = require(98);

	/**
	 * @type {boolean}
	 * @private
	 */
	var _topLevelListenersEnabled = true;

	/**
	 * Top-level callback creator used to implement event handling using delegation.
	 * This is used via dependency injection.
	 */
	var ReactEventTopLevelCallback = {

	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function(enabled) {
	    _topLevelListenersEnabled = !!enabled;
	  },

	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function() {
	    return _topLevelListenersEnabled;
	  },

	  /**
	   * Creates a callback for the supplied `topLevelType` that could be added as
	   * a listener to the document. The callback computes a `topLevelTarget` which
	   * should be the root node of a mounted React component where the listener
	   * is attached.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @return {function} Callback for handling top-level events.
	   */
	  createTopLevelCallback: function(topLevelType) {
	    return function(nativeEvent) {
	      if (!_topLevelListenersEnabled) {
	        return;
	      }
	      // TODO: Remove when synthetic events are ready, this is for IE<9.
	      if (nativeEvent.srcElement &&
	          nativeEvent.srcElement !== nativeEvent.target) {
	        nativeEvent.target = nativeEvent.srcElement;
	      }
	      var topLevelTarget = ReactMount.getFirstReactDOM(
	        getEventTarget(nativeEvent)
	      ) || window;
	      var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
	      ReactEventEmitter.handleTopLevel(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID,
	        nativeEvent
	      );
	    };
	  }

	};

	module.exports = ReactEventTopLevelCallback;


/***/ },

/***/ 61:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DefaultDOMPropertyConfig
	 */

	/*jslint bitwise: true*/

	"use strict";

	var DOMProperty = require(49);

	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
	var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
	var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;

	var DefaultDOMPropertyConfig = {
	  isCustomAttribute: RegExp.prototype.test.bind(
	    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
	  ),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: null,
	    accessKey: null,
	    action: null,
	    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    allowTransparency: MUST_USE_ATTRIBUTE,
	    alt: null,
	    autoComplete: null,
	    autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    cellPadding: null,
	    cellSpacing: null,
	    charSet: MUST_USE_ATTRIBUTE,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    className: MUST_USE_PROPERTY,
	    colSpan: null,
	    content: null,
	    contentEditable: null,
	    contextMenu: MUST_USE_ATTRIBUTE,
	    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    data: null, // For `<object />` acts as `src`.
	    dateTime: MUST_USE_ATTRIBUTE,
	    dir: null,
	    disabled: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    draggable: null,
	    encType: null,
	    form: MUST_USE_ATTRIBUTE,
	    frameBorder: MUST_USE_ATTRIBUTE,
	    height: MUST_USE_ATTRIBUTE,
	    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    href: null,
	    htmlFor: null,
	    httpEquiv: null,
	    icon: null,
	    id: MUST_USE_PROPERTY,
	    label: null,
	    lang: null,
	    list: null,
	    max: null,
	    maxLength: MUST_USE_ATTRIBUTE,
	    method: null,
	    min: null,
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: null,
	    pattern: null,
	    placeholder: null,
	    poster: null,
	    preload: null,
	    radioGroup: null,
	    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    rel: null,
	    required: HAS_BOOLEAN_VALUE,
	    role: MUST_USE_ATTRIBUTE,
	    rowSpan: null,
	    scrollLeft: MUST_USE_PROPERTY,
	    scrollTop: MUST_USE_PROPERTY,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    size: null,
	    spellCheck: null,
	    src: null,
	    step: null,
	    style: null,
	    tabIndex: null,
	    target: null,
	    title: null,
	    type: null,
	    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
	    width: MUST_USE_ATTRIBUTE,
	    wmode: MUST_USE_ATTRIBUTE,

	    /**
	     * Non-standard Properties
	     */
	    autoCapitalize: null, // Supported in Mobile Safari for keyboard hints

	    /**
	     * SVG Properties
	     */
	    cx: MUST_USE_ATTRIBUTE,
	    cy: MUST_USE_ATTRIBUTE,
	    d: MUST_USE_ATTRIBUTE,
	    fill: MUST_USE_ATTRIBUTE,
	    fx: MUST_USE_ATTRIBUTE,
	    fy: MUST_USE_ATTRIBUTE,
	    gradientTransform: MUST_USE_ATTRIBUTE,
	    gradientUnits: MUST_USE_ATTRIBUTE,
	    offset: MUST_USE_ATTRIBUTE,
	    points: MUST_USE_ATTRIBUTE,
	    r: MUST_USE_ATTRIBUTE,
	    rx: MUST_USE_ATTRIBUTE,
	    ry: MUST_USE_ATTRIBUTE,
	    spreadMethod: MUST_USE_ATTRIBUTE,
	    stopColor: MUST_USE_ATTRIBUTE,
	    stopOpacity: MUST_USE_ATTRIBUTE,
	    stroke: MUST_USE_ATTRIBUTE,
	    strokeLinecap: MUST_USE_ATTRIBUTE,
	    strokeWidth: MUST_USE_ATTRIBUTE,
	    transform: MUST_USE_ATTRIBUTE,
	    version: MUST_USE_ATTRIBUTE,
	    viewBox: MUST_USE_ATTRIBUTE,
	    x1: MUST_USE_ATTRIBUTE,
	    x2: MUST_USE_ATTRIBUTE,
	    x: MUST_USE_ATTRIBUTE,
	    y1: MUST_USE_ATTRIBUTE,
	    y2: MUST_USE_ATTRIBUTE,
	    y: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    className: 'class',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    htmlFor: 'for',
	    spreadMethod: 'spreadMethod',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strokeLinecap: 'stroke-linecap',
	    strokeWidth: 'stroke-width',
	    viewBox: 'viewBox'
	  },
	  DOMPropertyNames: {
	    autoCapitalize: 'autocapitalize',
	    autoComplete: 'autocomplete',
	    autoFocus: 'autofocus',
	    autoPlay: 'autoplay',
	    encType: 'enctype',
	    radioGroup: 'radiogroup',
	    spellCheck: 'spellcheck'
	  },
	  DOMMutationMethods: {
	    /**
	     * Setting `className` to null may cause it to be set to the string "null".
	     *
	     * @param {DOMElement} node
	     * @param {*} value
	     */
	    className: function(node, value) {
	      node.className = value || '';
	    }
	  }
	};

	module.exports = DefaultDOMPropertyConfig;


/***/ },

/***/ 62:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ChangeEventPlugin
	 */

	"use strict";

	var EventConstants = require(91);
	var EventPluginHub = require(66);
	var EventPropagators = require(99);
	var ExecutionEnvironment = require(93);
	var SyntheticEvent = require(100);

	var isEventSupported = require(96);
	var isTextInputElement = require(101);
	var keyOf = require(53);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onChange: null}),
	      captured: keyOf({onChangeCapture: null})
	    }
	  }
	};

	/**
	 * For IE shims
	 */
	var activeElement = null;
	var activeElementID = null;
	var activeElementValue = null;
	var activeElementValueProp = null;

	/**
	 * SECTION: handle `change` event
	 */
	function shouldUseChangeEvent(elem) {
	  return (
	    elem.nodeName === 'SELECT' ||
	    (elem.nodeName === 'INPUT' && elem.type === 'file')
	  );
	}

	var doesChangeEventBubble = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // See `handleChange` comment below
	  doesChangeEventBubble = isEventSupported('change') && (
	    !('documentMode' in document) || document.documentMode > 8
	  );
	}

	function manualDispatchChangeEvent(nativeEvent) {
	  var event = SyntheticEvent.getPooled(
	    eventTypes.change,
	    activeElementID,
	    nativeEvent
	  );
	  EventPropagators.accumulateTwoPhaseDispatches(event);

	  // If change bubbled, we'd just bind to it like all the other events
	  // and have it go through ReactEventTopLevelCallback. Since it doesn't, we
	  // manually listen for the change event and so we have to enqueue and
	  // process the abstract event manually.
	  EventPluginHub.enqueueEvents(event);
	  EventPluginHub.processEventQueue();
	}

	function startWatchingForChangeEventIE8(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
	}

	function stopWatchingForChangeEventIE8() {
	  if (!activeElement) {
	    return;
	  }
	  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
	  activeElement = null;
	  activeElementID = null;
	}

	function getTargetIDForChangeEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topChange) {
	    return topLevelTargetID;
	  }
	}
	function handleEventsForChangeEventIE8(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForChangeEventIE8();
	    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForChangeEventIE8();
	  }
	}


	/**
	 * SECTION: handle `input` event
	 */
	var isInputEventSupported = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // IE9 claims to support the input event but fails to trigger it when
	  // deleting text, so we ignore its input events
	  isInputEventSupported = isEventSupported('input') && (
	    !('documentMode' in document) || document.documentMode > 9
	  );
	}

	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that gets
	 * set on the active element.
	 */
	var newValueProp =  {
	  get: function() {
	    return activeElementValueProp.get.call(this);
	  },
	  set: function(val) {
	    // Cast to a string so we can do equality checks.
	    activeElementValue = '' + val;
	    activeElementValueProp.set.call(this, val);
	  }
	};

	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	function startWatchingForValueChange(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElementValue = target.value;
	  activeElementValueProp = Object.getOwnPropertyDescriptor(
	    target.constructor.prototype,
	    'value'
	  );

	  Object.defineProperty(activeElement, 'value', newValueProp);
	  activeElement.attachEvent('onpropertychange', handlePropertyChange);
	}

	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked element,
	 * if any exists.
	 */
	function stopWatchingForValueChange() {
	  if (!activeElement) {
	    return;
	  }

	  // delete restores the original property definition
	  delete activeElement.value;
	  activeElement.detachEvent('onpropertychange', handlePropertyChange);

	  activeElement = null;
	  activeElementID = null;
	  activeElementValue = null;
	  activeElementValueProp = null;
	}

	/**
	 * (For old IE.) Handles a propertychange event, sending a `change` event if
	 * the value of the active element has changed.
	 */
	function handlePropertyChange(nativeEvent) {
	  if (nativeEvent.propertyName !== 'value') {
	    return;
	  }
	  var value = nativeEvent.srcElement.value;
	  if (value === activeElementValue) {
	    return;
	  }
	  activeElementValue = value;

	  manualDispatchChangeEvent(nativeEvent);
	}

	/**
	 * If a `change` event should be fired, returns the target's ID.
	 */
	function getTargetIDForInputEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topInput) {
	    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
	    // what we want so fall through here and trigger an abstract event
	    return topLevelTargetID;
	  }
	}

	// For IE8 and IE9.
	function handleEventsForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // In IE8, we can capture almost all .value changes by adding a
	    // propertychange handler and looking for events with propertyName
	    // equal to 'value'
	    // In IE9, propertychange fires for most input events but is buggy and
	    // doesn't fire when text is deleted, but conveniently, selectionchange
	    // appears to fire in all of the remaining cases so we catch those and
	    // forward the event if the value has changed
	    // In either case, we don't want to call the event handler if the value
	    // is changed from JS so we redefine a setter for `.value` that updates
	    // our activeElementValue variable, allowing us to ignore those changes
	    //
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForValueChange();
	    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForValueChange();
	  }
	}

	// For IE8 and IE9.
	function getTargetIDForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topSelectionChange ||
	      topLevelType === topLevelTypes.topKeyUp ||
	      topLevelType === topLevelTypes.topKeyDown) {
	    // On the selectionchange event, the target is just document which isn't
	    // helpful for us so just check activeElement instead.
	    //
	    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
	    // propertychange on the first input event after setting `value` from a
	    // script and fires only keydown, keypress, keyup. Catching keyup usually
	    // gets it and catching keydown lets us fire an event for the first
	    // keystroke if user does a key repeat (it'll be a little delayed: right
	    // before the second keystroke). Other input methods (e.g., paste) seem to
	    // fire selectionchange normally.
	    if (activeElement && activeElement.value !== activeElementValue) {
	      activeElementValue = activeElement.value;
	      return activeElementID;
	    }
	  }
	}


	/**
	 * SECTION: handle `click` event
	 */
	function shouldUseClickEvent(elem) {
	  // Use the `click` event to detect changes to checkbox and radio inputs.
	  // This approach works across all browsers, whereas `change` does not fire
	  // until `blur` in IE8.
	  return (
	    elem.nodeName === 'INPUT' &&
	    (elem.type === 'checkbox' || elem.type === 'radio')
	  );
	}

	function getTargetIDForClickEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topClick) {
	    return topLevelTargetID;
	  }
	}

	/**
	 * This plugin creates an `onChange` event that normalizes change events
	 * across form elements. This event fires at a time when it's possible to
	 * change the element's value without seeing a flicker.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - select
	 */
	var ChangeEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    var getTargetIDFunc, handleEventFunc;
	    if (shouldUseChangeEvent(topLevelTarget)) {
	      if (doesChangeEventBubble) {
	        getTargetIDFunc = getTargetIDForChangeEvent;
	      } else {
	        handleEventFunc = handleEventsForChangeEventIE8;
	      }
	    } else if (isTextInputElement(topLevelTarget)) {
	      if (isInputEventSupported) {
	        getTargetIDFunc = getTargetIDForInputEvent;
	      } else {
	        getTargetIDFunc = getTargetIDForInputEventIE;
	        handleEventFunc = handleEventsForInputEventIE;
	      }
	    } else if (shouldUseClickEvent(topLevelTarget)) {
	      getTargetIDFunc = getTargetIDForClickEvent;
	    }

	    if (getTargetIDFunc) {
	      var targetID = getTargetIDFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	      if (targetID) {
	        var event = SyntheticEvent.getPooled(
	          eventTypes.change,
	          targetID,
	          nativeEvent
	        );
	        EventPropagators.accumulateTwoPhaseDispatches(event);
	        return event;
	      }
	    }

	    if (handleEventFunc) {
	      handleEventFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	    }
	  }

	};

	module.exports = ChangeEventPlugin;


/***/ },

/***/ 63:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CompositionEventPlugin
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = require(91);
	var EventPropagators = require(99);
	var ExecutionEnvironment = require(93);
	var ReactInputSelection = require(102);
	var SyntheticCompositionEvent = require(103);

	var getTextContentAccessor = require(104);
	var keyOf = require(53);

	var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
	var START_KEYCODE = 229;

	var useCompositionEvent = ExecutionEnvironment.canUseDOM &&
	  'CompositionEvent' in window;
	var topLevelTypes = EventConstants.topLevelTypes;
	var currentComposition = null;

	// Events and their corresponding property names.
	var eventTypes = {
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionEnd: null}),
	      captured: keyOf({onCompositionEndCapture: null})
	    }
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionStart: null}),
	      captured: keyOf({onCompositionStartCapture: null})
	    }
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionUpdate: null}),
	      captured: keyOf({onCompositionUpdateCapture: null})
	    }
	  }
	};

	/**
	 * Translate native top level events into event types.
	 *
	 * @param {string} topLevelType
	 * @return {object}
	 */
	function getCompositionEventType(topLevelType) {
	  switch (topLevelType) {
	    case topLevelTypes.topCompositionStart:
	      return eventTypes.compositionStart;
	    case topLevelTypes.topCompositionEnd:
	      return eventTypes.compositionEnd;
	    case topLevelTypes.topCompositionUpdate:
	      return eventTypes.compositionUpdate;
	  }
	}

	/**
	 * Does our fallback best-guess model think this event signifies that
	 * composition has begun?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackStart(topLevelType, nativeEvent) {
	  return (
	    topLevelType === topLevelTypes.topKeyDown &&
	    nativeEvent.keyCode === START_KEYCODE
	  );
	}

	/**
	 * Does our fallback mode think that this event is the end of composition?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackEnd(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case topLevelTypes.topKeyUp:
	      // Command keys insert or clear IME input.
	      return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
	    case topLevelTypes.topKeyDown:
	      // Expect IME keyCode on each keydown. If we get any other
	      // code we must have exited earlier.
	      return (nativeEvent.keyCode !== START_KEYCODE);
	    case topLevelTypes.topKeyPress:
	    case topLevelTypes.topMouseDown:
	    case topLevelTypes.topBlur:
	      // Events are not possible without cancelling IME.
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Helper class stores information about selection and document state
	 * so we can figure out what changed at a later date.
	 *
	 * @param {DOMEventTarget} root
	 */
	function FallbackCompositionState(root) {
	  this.root = root;
	  this.startSelection = ReactInputSelection.getSelection(root);
	  this.startValue = this.getText();
	}

	/**
	 * Get current text of input.
	 *
	 * @return {string}
	 */
	FallbackCompositionState.prototype.getText = function() {
	  return this.root.value || this.root[getTextContentAccessor()];
	};

	/**
	 * Text that has changed since the start of composition.
	 *
	 * @return {string}
	 */
	FallbackCompositionState.prototype.getData = function() {
	  var endValue = this.getText();
	  var prefixLength = this.startSelection.start;
	  var suffixLength = this.startValue.length - this.startSelection.end;

	  return endValue.substr(
	    prefixLength,
	    endValue.length - suffixLength - prefixLength
	  );
	};

	/**
	 * This plugin creates `onCompositionStart`, `onCompositionUpdate` and
	 * `onCompositionEnd` events on inputs, textareas and contentEditable
	 * nodes.
	 */
	var CompositionEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    var eventType;
	    var data;

	    if (useCompositionEvent) {
	      eventType = getCompositionEventType(topLevelType);
	    } else if (!currentComposition) {
	      if (isFallbackStart(topLevelType, nativeEvent)) {
	        eventType = eventTypes.start;
	        currentComposition = new FallbackCompositionState(topLevelTarget);
	      }
	    } else if (isFallbackEnd(topLevelType, nativeEvent)) {
	      eventType = eventTypes.compositionEnd;
	      data = currentComposition.getData();
	      currentComposition = null;
	    }

	    if (eventType) {
	      var event = SyntheticCompositionEvent.getPooled(
	        eventType,
	        topLevelTargetID,
	        nativeEvent
	      );
	      if (data) {
	        // Inject data generated from fallback path into the synthetic event.
	        // This matches the property of native CompositionEventInterface.
	        event.data = data;
	      }
	      EventPropagators.accumulateTwoPhaseDispatches(event);
	      return event;
	    }
	  }
	};

	module.exports = CompositionEventPlugin;


/***/ },

/***/ 64:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DefaultEventPluginOrder
	 */

	"use strict";

	 var keyOf = require(53);

	/**
	 * Module that is injectable into `EventPluginHub`, that specifies a
	 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
	 * plugins, without having to package every one of them. This is better than
	 * having plugins be ordered in the same order that they are injected because
	 * that ordering would be influenced by the packaging order.
	 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
	 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
	 */
	var DefaultEventPluginOrder = [
	  keyOf({ResponderEventPlugin: null}),
	  keyOf({SimpleEventPlugin: null}),
	  keyOf({TapEventPlugin: null}),
	  keyOf({EnterLeaveEventPlugin: null}),
	  keyOf({ChangeEventPlugin: null}),
	  keyOf({SelectEventPlugin: null}),
	  keyOf({CompositionEventPlugin: null}),
	  keyOf({AnalyticsEventPlugin: null}),
	  keyOf({MobileSafariClickEventPlugin: null})
	];

	module.exports = DefaultEventPluginOrder;


/***/ },

/***/ 65:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EnterLeaveEventPlugin
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = require(91);
	var EventPropagators = require(99);
	var SyntheticMouseEvent = require(105);

	var ReactMount = require(18);
	var keyOf = require(53);

	var topLevelTypes = EventConstants.topLevelTypes;
	var getFirstReactDOM = ReactMount.getFirstReactDOM;

	var eventTypes = {
	  mouseEnter: {registrationName: keyOf({onMouseEnter: null})},
	  mouseLeave: {registrationName: keyOf({onMouseLeave: null})}
	};

	var extractedEvents = [null, null];

	var EnterLeaveEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * For almost every interaction we care about, there will be both a top-level
	   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
	   * we do not extract duplicate events. However, moving the mouse into the
	   * browser from outside will not fire a `mouseout` event. In this case, we use
	   * the `mouseover` top-level event.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topMouseOver &&
	        (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
	      return null;
	    }
	    if (topLevelType !== topLevelTypes.topMouseOut &&
	        topLevelType !== topLevelTypes.topMouseOver) {
	      // Must not be a mouse in or mouse out - ignoring.
	      return null;
	    }

	    var from, to;
	    if (topLevelType === topLevelTypes.topMouseOut) {
	      from = topLevelTarget;
	      to =
	        getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
	        window;
	    } else {
	      from = window;
	      to = topLevelTarget;
	    }

	    if (from === to) {
	      // Nothing pertains to our managed components.
	      return null;
	    }

	    var fromID = from ? ReactMount.getID(from) : '';
	    var toID = to ? ReactMount.getID(to) : '';

	    var leave = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseLeave,
	      fromID,
	      nativeEvent
	    );
	    var enter = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseEnter,
	      toID,
	      nativeEvent
	    );

	    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

	    extractedEvents[0] = leave;
	    extractedEvents[1] = enter;

	    return extractedEvents;
	  }

	};

	module.exports = EnterLeaveEventPlugin;


/***/ },

/***/ 66:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginHub
	 */

	"use strict";

	var CallbackRegistry = require(106);
	var EventPluginRegistry = require(107);
	var EventPluginUtils = require(108);
	var EventPropagators = require(99);
	var ExecutionEnvironment = require(93);

	var accumulate = require(109);
	var forEachAccumulated = require(110);
	var invariant = require(40);

	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */
	var eventQueue = null;

	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @private
	 */
	var executeDispatchesAndRelease = function(event) {
	  if (event) {
	    var executeDispatch = EventPluginUtils.executeDispatch;
	    // Plugins can provide custom behavior when dispatching events.
	    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
	    if (PluginModule && PluginModule.executeDispatch) {
	      executeDispatch = PluginModule.executeDispatch;
	    }
	    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};

	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */
	var EventPluginHub = {

	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {

	    /**
	     * @param {object} InjectedInstanceHandle
	     * @public
	     */
	    injectInstanceHandle: EventPropagators.injection.injectInstanceHandle,

	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

	  },

	  registrationNames: EventPluginRegistry.registrationNames,

	  putListener: CallbackRegistry.putListener,

	  getListener: CallbackRegistry.getListener,

	  deleteListener: CallbackRegistry.deleteListener,

	  deleteAllListeners: CallbackRegistry.deleteAllListeners,

	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events;
	    var plugins = EventPluginRegistry.plugins;
	    for (var i = 0, l = plugins.length; i < l; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];
	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(
	          topLevelType,
	          topLevelTarget,
	          topLevelTargetID,
	          nativeEvent
	        );
	        if (extractedEvents) {
	          events = accumulate(events, extractedEvents);
	        }
	      }
	    }
	    return events;
	  },

	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function(events) {
	    if (events) {
	      eventQueue = accumulate(eventQueue, events);
	    }
	  },

	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function() {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;
	    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
	    invariant(!eventQueue);
	  }

	};

	if (ExecutionEnvironment.canUseDOM) {
	  window.EventPluginHub = EventPluginHub;
	}

	module.exports = EventPluginHub;


/***/ },

/***/ 67:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule MobileSafariClickEventPlugin
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = require(91);

	var emptyFunction = require(84);

	var topLevelTypes = EventConstants.topLevelTypes;

	/**
	 * Mobile Safari does not fire properly bubble click events on non-interactive
	 * elements, which means delegated click listeners do not fire. The workaround
	 * for this bug involves attaching an empty click listener on the target node.
	 *
	 * This particular plugin works around the bug by attaching an empty click
	 * listener on `touchstart` (which does fire on every element).
	 */
	var MobileSafariClickEventPlugin = {

	  eventTypes: null,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topTouchStart) {
	      var target = nativeEvent.target;
	      if (target && !target.onclick) {
	        target.onclick = emptyFunction;
	      }
	    }
	  }

	};

	module.exports = MobileSafariClickEventPlugin;


/***/ },

/***/ 68:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SelectEventPlugin
	 */

	"use strict";

	var EventConstants = require(91);
	var EventPluginHub = require(66);
	var EventPropagators = require(99);
	var ExecutionEnvironment = require(93);
	var SyntheticEvent = require(100);

	var getActiveElement = require(117);
	var isEventSupported = require(96);
	var isTextInputElement = require(101);
	var keyOf = require(53);
	var shallowEqual = require(118);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSelect: null}),
	      captured: keyOf({onSelectCapture: null})
	    }
	  }
	};

	var useSelectionChange = false;
	var useSelect = false;

	if (ExecutionEnvironment.canUseDOM) {
	  useSelectionChange = 'onselectionchange' in document;
	  useSelect = isEventSupported('select');
	}

	var activeElement = null;
	var activeElementID = null;
	var activeNativeEvent = null;
	var lastSelection = null;
	var mouseDown = false;

	/**
	 * Get an object which is a unique representation of the current selection.
	 *
	 * The return value will not be consistent across nodes or browsers, but
	 * two identical selections on the same node will return identical objects.
	 *
	 * @param {DOMElement} node
	 * @param {object}
	 */
	function getSelection(node) {
	  if ('selectionStart' in node) {
	    return {
	      start: node.selectionStart,
	      end: node.selectionEnd
	    };
	  } else if (document.selection) {
	    var range = document.selection.createRange();
	    return {
	      parentElement: range.parentElement(),
	      text: range.text,
	      top: range.boundingTop,
	      left: range.boundingLeft
	    };
	  } else {
	    var selection = window.getSelection();
	    return {
	      anchorNode: selection.anchorNode,
	      anchorOffset: selection.anchorOffset,
	      focusNode: selection.focusNode,
	      focusOffset: selection.focusOffset
	    };
	  }
	}

	/**
	 * Poll selection to see whether it's changed.
	 *
	 * @param {object} nativeEvent
	 * @return {?SyntheticEvent}
	 */
	function constructSelectEvent(nativeEvent) {
	  // Ensure we have the right element, and that the user is not dragging a
	  // selection (this matches native `select` event behavior).
	  if (mouseDown || activeElement != getActiveElement()) {
	    return;
	  }

	  // Only fire when selection has actually changed.
	  var currentSelection = getSelection(activeElement);
	  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
	    lastSelection = currentSelection;

	    var syntheticEvent = SyntheticEvent.getPooled(
	      eventTypes.select,
	      activeElementID,
	      nativeEvent
	    );

	    syntheticEvent.type = 'select';
	    syntheticEvent.target = activeElement;

	    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

	    return syntheticEvent;
	  }
	}

	/**
	 * Handle deferred event. And manually dispatch synthetic events.
	 */
	function dispatchDeferredSelectEvent() {
	  if (!activeNativeEvent) {
	    return;
	  }

	  var syntheticEvent = constructSelectEvent(activeNativeEvent);
	  activeNativeEvent = null;

	  // Enqueue and process the abstract event manually.
	  if (syntheticEvent) {
	    EventPluginHub.enqueueEvents(syntheticEvent);
	    EventPluginHub.processEventQueue();
	  }
	}

	/**
	 * This plugin creates an `onSelect` event that normalizes select events
	 * across form elements.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - contentEditable
	 *
	 * This differs from native browser implementations in the following ways:
	 * - Fires on contentEditable fields as well as inputs.
	 * - Fires for collapsed selection.
	 * - Fires after user input.
	 */
	var SelectEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    switch (topLevelType) {
	      // Track the input node that has focus.
	      case topLevelTypes.topFocus:
	        if (isTextInputElement(topLevelTarget) ||
	            topLevelTarget.contentEditable === 'true') {
	          activeElement = topLevelTarget;
	          activeElementID = topLevelTargetID;
	          lastSelection = null;
	          mouseDown = false;
	        }
	        break;
	      case topLevelTypes.topBlur:
	        activeElement = null;
	        activeElementID = null;
	        lastSelection = null;
	        mouseDown = false;
	        break;

	      // Don't fire the event while the user is dragging. This matches the
	      // semantics of the native select event.
	      case topLevelTypes.topMouseDown:
	        mouseDown = true;
	        break;
	      case topLevelTypes.topMouseUp:
	        mouseDown = false;
	        return constructSelectEvent(nativeEvent);

	      // Chrome and IE fire non-standard event when selection is changed (and
	      // sometimes when it hasn't).
	      case topLevelTypes.topSelectionChange:
	        return constructSelectEvent(nativeEvent);

	      // Firefox doesn't support selectionchange, so check selection status
	      // after each key entry.
	      case topLevelTypes.topKeyDown:
	        if (!useSelectionChange) {
	          activeNativeEvent = nativeEvent;
	          setTimeout(dispatchDeferredSelectEvent, 0);
	        }
	        break;
	    }
	  }
	};

	module.exports = SelectEventPlugin;


/***/ },

/***/ 69:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SimpleEventPlugin
	 */

	"use strict";

	var EventConstants = require(91);
	var EventPropagators = require(99);
	var SyntheticClipboardEvent = require(111);
	var SyntheticEvent = require(100);
	var SyntheticFocusEvent = require(112);
	var SyntheticKeyboardEvent = require(113);
	var SyntheticMouseEvent = require(105);
	var SyntheticTouchEvent = require(114);
	var SyntheticUIEvent = require(115);
	var SyntheticWheelEvent = require(116);

	var invariant = require(40);
	var keyOf = require(53);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  blur: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onBlur: true}),
	      captured: keyOf({onBlurCapture: true})
	    }
	  },
	  click: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onClick: true}),
	      captured: keyOf({onClickCapture: true})
	    }
	  },
	  copy: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCopy: true}),
	      captured: keyOf({onCopyCapture: true})
	    }
	  },
	  cut: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCut: true}),
	      captured: keyOf({onCutCapture: true})
	    }
	  },
	  doubleClick: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDoubleClick: true}),
	      captured: keyOf({onDoubleClickCapture: true})
	    }
	  },
	  drag: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrag: true}),
	      captured: keyOf({onDragCapture: true})
	    }
	  },
	  dragEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnd: true}),
	      captured: keyOf({onDragEndCapture: true})
	    }
	  },
	  dragEnter: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnter: true}),
	      captured: keyOf({onDragEnterCapture: true})
	    }
	  },
	  dragExit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragExit: true}),
	      captured: keyOf({onDragExitCapture: true})
	    }
	  },
	  dragLeave: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragLeave: true}),
	      captured: keyOf({onDragLeaveCapture: true})
	    }
	  },
	  dragOver: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragOver: true}),
	      captured: keyOf({onDragOverCapture: true})
	    }
	  },
	  dragStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragStart: true}),
	      captured: keyOf({onDragStartCapture: true})
	    }
	  },
	  drop: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrop: true}),
	      captured: keyOf({onDropCapture: true})
	    }
	  },
	  focus: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onFocus: true}),
	      captured: keyOf({onFocusCapture: true})
	    }
	  },
	  input: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onInput: true}),
	      captured: keyOf({onInputCapture: true})
	    }
	  },
	  keyDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyDown: true}),
	      captured: keyOf({onKeyDownCapture: true})
	    }
	  },
	  keyPress: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyPress: true}),
	      captured: keyOf({onKeyPressCapture: true})
	    }
	  },
	  keyUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyUp: true}),
	      captured: keyOf({onKeyUpCapture: true})
	    }
	  },
	  // Note: We do not allow listening to mouseOver events. Instead, use the
	  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
	  mouseDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseDown: true}),
	      captured: keyOf({onMouseDownCapture: true})
	    }
	  },
	  mouseMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseMove: true}),
	      captured: keyOf({onMouseMoveCapture: true})
	    }
	  },
	  mouseUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseUp: true}),
	      captured: keyOf({onMouseUpCapture: true})
	    }
	  },
	  paste: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onPaste: true}),
	      captured: keyOf({onPasteCapture: true})
	    }
	  },
	  scroll: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onScroll: true}),
	      captured: keyOf({onScrollCapture: true})
	    }
	  },
	  submit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSubmit: true}),
	      captured: keyOf({onSubmitCapture: true})
	    }
	  },
	  touchCancel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchCancel: true}),
	      captured: keyOf({onTouchCancelCapture: true})
	    }
	  },
	  touchEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchEnd: true}),
	      captured: keyOf({onTouchEndCapture: true})
	    }
	  },
	  touchMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchMove: true}),
	      captured: keyOf({onTouchMoveCapture: true})
	    }
	  },
	  touchStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchStart: true}),
	      captured: keyOf({onTouchStartCapture: true})
	    }
	  },
	  wheel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onWheel: true}),
	      captured: keyOf({onWheelCapture: true})
	    }
	  }
	};

	var topLevelEventsToDispatchConfig = {
	  topBlur:        eventTypes.blur,
	  topClick:       eventTypes.click,
	  topCopy:        eventTypes.copy,
	  topCut:         eventTypes.cut,
	  topDoubleClick: eventTypes.doubleClick,
	  topDrag:        eventTypes.drag,
	  topDragEnd:     eventTypes.dragEnd,
	  topDragEnter:   eventTypes.dragEnter,
	  topDragExit:    eventTypes.dragExit,
	  topDragLeave:   eventTypes.dragLeave,
	  topDragOver:    eventTypes.dragOver,
	  topDragStart:   eventTypes.dragStart,
	  topDrop:        eventTypes.drop,
	  topFocus:       eventTypes.focus,
	  topInput:       eventTypes.input,
	  topKeyDown:     eventTypes.keyDown,
	  topKeyPress:    eventTypes.keyPress,
	  topKeyUp:       eventTypes.keyUp,
	  topMouseDown:   eventTypes.mouseDown,
	  topMouseMove:   eventTypes.mouseMove,
	  topMouseUp:     eventTypes.mouseUp,
	  topPaste:       eventTypes.paste,
	  topScroll:      eventTypes.scroll,
	  topSubmit:      eventTypes.submit,
	  topTouchCancel: eventTypes.touchCancel,
	  topTouchEnd:    eventTypes.touchEnd,
	  topTouchMove:   eventTypes.touchMove,
	  topTouchStart:  eventTypes.touchStart,
	  topWheel:       eventTypes.wheel
	};

	var SimpleEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * Same as the default implementation, except cancels the event when return
	   * value is false.
	   *
	   * @param {object} Event to be dispatched.
	   * @param {function} Application-level callback.
	   * @param {string} domID DOM ID to pass to the callback.
	   */
	  executeDispatch: function(event, listener, domID) {
	    var returnValue = listener(event, domID);
	    if (returnValue === false) {
	      event.stopPropagation();
	      event.preventDefault();
	    }
	  },

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
	    if (!dispatchConfig) {
	      return null;
	    }
	    var EventConstructor;
	    switch(topLevelType) {
	      case topLevelTypes.topInput:
	      case topLevelTypes.topSubmit:
	        // HTML Events
	        // @see http://www.w3.org/TR/html5/index.html#events-0
	        EventConstructor = SyntheticEvent;
	        break;
	      case topLevelTypes.topKeyDown:
	      case topLevelTypes.topKeyPress:
	      case topLevelTypes.topKeyUp:
	        EventConstructor = SyntheticKeyboardEvent;
	        break;
	      case topLevelTypes.topBlur:
	      case topLevelTypes.topFocus:
	        EventConstructor = SyntheticFocusEvent;
	        break;
	      case topLevelTypes.topClick:
	        // Firefox creates a click event on right mouse clicks. This removes the
	        // unwanted click events.
	        if (nativeEvent.button === 2) {
	          return null;
	        }
	        /* falls through */
	      case topLevelTypes.topDoubleClick:
	      case topLevelTypes.topDrag:
	      case topLevelTypes.topDragEnd:
	      case topLevelTypes.topDragEnter:
	      case topLevelTypes.topDragExit:
	      case topLevelTypes.topDragLeave:
	      case topLevelTypes.topDragOver:
	      case topLevelTypes.topDragStart:
	      case topLevelTypes.topDrop:
	      case topLevelTypes.topMouseDown:
	      case topLevelTypes.topMouseMove:
	      case topLevelTypes.topMouseUp:
	        EventConstructor = SyntheticMouseEvent;
	        break;
	      case topLevelTypes.topTouchCancel:
	      case topLevelTypes.topTouchEnd:
	      case topLevelTypes.topTouchMove:
	      case topLevelTypes.topTouchStart:
	        EventConstructor = SyntheticTouchEvent;
	        break;
	      case topLevelTypes.topScroll:
	        EventConstructor = SyntheticUIEvent;
	        break;
	      case topLevelTypes.topWheel:
	        EventConstructor = SyntheticWheelEvent;
	        break;
	      case topLevelTypes.topCopy:
	      case topLevelTypes.topCut:
	      case topLevelTypes.topPaste:
	        EventConstructor = SyntheticClipboardEvent;
	        break;
	    }
	    invariant(EventConstructor);
	    var event = EventConstructor.getPooled(
	      dispatchConfig,
	      topLevelTargetID,
	      nativeEvent
	    );
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }

	};

	module.exports = SimpleEventPlugin;


/***/ },

/***/ 70:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDefaultBatchingStrategy
	 */

	"use strict";

	var ReactUpdates = require(39);
	var Transaction = require(119);

	var emptyFunction = require(84);
	var mixInto = require(44);

	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: function() {
	    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	  }
	};

	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
	};

	var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}

	mixInto(ReactDefaultBatchingStrategyTransaction, Transaction.Mixin);
	mixInto(ReactDefaultBatchingStrategyTransaction, {
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  }
	});

	var transaction = new ReactDefaultBatchingStrategyTransaction();

	var ReactDefaultBatchingStrategy = {
	  isBatchingUpdates: false,

	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function(callback, param) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

	    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

	    // The code is written this way to avoid extra allocations
	    if (alreadyBatchingUpdates) {
	      callback(param);
	    } else {
	      transaction.perform(callback, null, param);
	    }
	  }
	};

	module.exports = ReactDefaultBatchingStrategy;


/***/ },

/***/ 71:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule $
	 * @typechecks
	 */

	var ge = require(120);
	var ex = require(121);

	/**
	 * Find a node by ID.
	 *
	 * If your application code depends on the existence of the element, use $,
	 * which will throw if the element doesn't exist.
	 *
	 * If you're not sure whether or not the element exists, use ge instead, and
	 * manually check for the element's existence in your application code.
	 *
	 * @param {string|DOMDocument|DOMElement|DOMTextNode|Comment} id
	 * @return {DOMDocument|DOMElement|DOMTextNode|Comment}
	 */
	function $(id) {
	  var element = ge(id);
	  if (!element) {
	    throw new Error(ex(
	      'Tried to get element with id of "%s" but it is not present on the page.',
	      id
	    ));
	  }
	  return element;
	}

	module.exports = $;


/***/ },

/***/ 72:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getReactRootElementInContainer
	 */

	"use strict";

	/**
	 * @param {DOMElement} container DOM element that may contain a React component
	 * @return {?*} DOM element that may have the reactRoot ID, or null.
	 */
	function getReactRootElementInContainer(container) {
	  return container && container.firstChild;
	}

	module.exports = getReactRootElementInContainer;


/***/ },

/***/ 73:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule nodeContains
	 * @typechecks
	 */

	var isTextNode = require(122);

	/*jslint bitwise:true */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 *
	 * @param {?DOMNode} outerNode Outer DOM node.
	 * @param {?DOMNode} innerNode Inner DOM node.
	 * @return {boolean} True if `outerNode` contains or is `innerNode`.
	 */
	function nodeContains(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return nodeContains(outerNode, innerNode.parentNode);
	  } else if (outerNode.contains) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	module.exports = nodeContains;


/***/ },

/***/ 74:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMultiChildUpdateTypes
	 */

	var keyMirror = require(41);

	/**
	 * When a component's children are updated, a series of update configuration
	 * objects are created in order to batch and serialize the required changes.
	 *
	 * Enumerates all the possible types of update configurations.
	 *
	 * @internal
	 */
	var ReactMultiChildUpdateTypes = keyMirror({
	  INSERT_MARKUP: null,
	  MOVE_EXISTING: null,
	  REMOVE_NODE: null,
	  TEXT_CONTENT: null
	});

	module.exports = ReactMultiChildUpdateTypes;


/***/ },

/***/ 75:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule flattenChildren
	 */

	"use strict";

	var invariant = require(40);
	var traverseAllChildren = require(123);

	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 */
	function flattenSingleChildIntoContext(traverseContext, child, name) {
	  // We found a component instance.
	  var result = traverseContext;
	  invariant(!result.hasOwnProperty(name));
	  result[name] = child;
	}

	/**
	 * Flattens children that are typically specified as `props.children`.
	 * @return {!object} flattened children keyed by name.
	 */
	function flattenChildren(children) {
	  if (children == null) {
	    return children;
	  }
	  var result = {};
	  traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  return result;
	}

	module.exports = flattenChildren;


/***/ },

/***/ 76:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createObjectFrom
	 */

	/**
	 * Construct an object from an array of keys
	 * and optionally specified value or list of values.
	 *
	 *  >>> createObjectFrom(['a','b','c']);
	 *  {a: true, b: true, c: true}
	 *
	 *  >>> createObjectFrom(['a','b','c'], false);
	 *  {a: false, b: false, c: false}
	 *
	 *  >>> createObjectFrom(['a','b','c'], 'monkey');
	 *  {c:'monkey', b:'monkey' c:'monkey'}
	 *
	 *  >>> createObjectFrom(['a','b','c'], [1,2,3]);
	 *  {a: 1, b: 2, c: 3}
	 *
	 *  >>> createObjectFrom(['women', 'men'], [true, false]);
	 *  {women: true, men: false}
	 *
	 * @param   Array   list of keys
	 * @param   mixed   optional value or value array.  defaults true.
	 * @returns object
	 */
	function createObjectFrom(keys, values /* = true */) {
	    var object = {};
	    var isArray = Array.isArray(values);

	    if (typeof values == 'undefined') {
	      values = true;
	    }

	    for (var ii = keys.length; ii--;) {
	      object[keys[ii]] = isArray ? values[ii] : values;
	    }

	    return object;
	}

	module.exports = createObjectFrom;


/***/ },

/***/ 77:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMarkupChecksum
	 */

	"use strict";

	var adler32 = require(124);

	var ReactMarkupChecksum = {
	  CHECKSUM_ATTR_NAME: 'data-react-checksum',

	  /**
	   * @param {string} markup Markup string
	   * @return {string} Markup string with checksum attribute attached
	   */
	  addChecksumToMarkup: function(markup) {
	    var checksum = adler32(markup);
	    return markup.replace(
	      '>',
	      ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
	    );
	  },

	  /**
	   * @param {string} markup to use
	   * @param {DOMElement} element root React element
	   * @returns {boolean} whether or not the markup is the same
	   */
	  canReuseMarkup: function(markup, element) {
	    var existingChecksum = element.getAttribute(
	      ReactMarkupChecksum.CHECKSUM_ATTR_NAME
	    );
	    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
	    var markupChecksum = adler32(markup);
	    return markupChecksum === existingChecksum;
	  }
	};

	module.exports = ReactMarkupChecksum;


/***/ },

/***/ 78:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactReconcileTransaction
	 * @typechecks static-only
	 */

	"use strict";

	var ExecutionEnvironment = require(93);
	var PooledClass = require(125);
	var ReactEventEmitter = require(51);
	var ReactInputSelection = require(102);
	var ReactMountReady = require(126);
	var Transaction = require(119);

	var mixInto = require(44);

	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */
	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection.getSelectionInformation,
	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection.restoreSelection
	};

	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */
	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactEventEmitter` before the
	   * reconciliation.
	   */
	  initialize: function() {
	    var currentlyEnabled = ReactEventEmitter.isEnabled();
	    ReactEventEmitter.setEnabled(false);
	    return currentlyEnabled;
	  },

	  /**
	   * @param {boolean} previouslyEnabled Enabled status of `ReactEventEmitter`
	   *   before the reconciliation occured. `close` restores the previous value.
	   */
	  close: function(previouslyEnabled) {
	    ReactEventEmitter.setEnabled(previouslyEnabled);
	  }
	};

	/**
	 * Provides a `ReactMountReady` queue for collecting `onDOMReady` callbacks
	 * during the performing of the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },

	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function() {
	    this.reactMountReady.notifyAll();
	  }
	};

	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  SELECTION_RESTORATION,
	  EVENT_SUPPRESSION,
	  ON_DOM_READY_QUEUEING
	];

	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */
	function ReactReconcileTransaction() {
	  this.reinitializeTransaction();
	  this.reactMountReady = ReactMountReady.getPooled(null);
	}

	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap proceedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function() {
	    if (ExecutionEnvironment.canUseDOM) {
	      return TRANSACTION_WRAPPERS;
	    } else {
	      return [];
	    }
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   *   TODO: convert to ReactMountReady
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    ReactMountReady.release(this.reactMountReady);
	    this.reactMountReady = null;
	  }
	};


	mixInto(ReactReconcileTransaction, Transaction.Mixin);
	mixInto(ReactReconcileTransaction, Mixin);

	PooledClass.addPoolingTo(ReactReconcileTransaction);

	module.exports = ReactReconcileTransaction;


/***/ },

/***/ 79:
/***/ function(module, exports, require) {

	/** @jsx React.DOM */

	var React = require(4);

	var STYLE_LOADING = {
	  color: 'gray',
	  fontFamily: 'sans-serif',
	  fontSize: '12px',
	  left: 0,
	  marginTop: -6,
	  position: 'absolute',
	  right: 0,
	  textAlign: 'center',
	  top: '50%',
	};

	var STYLE_CAPTION = {
	  background: 'rgba(16, 16, 16, 0.5)',
	  bottom: 0,
	  color: 'white',
	  fontFamily: 'sans-serif',
	  fontSize: '16px',
	  lineHeight: '48px',
	  left: 0,
	  position: 'absolute',
	  right: 0,
	  textAlign: 'center'
	};

	var ImageCard = React.createClass({displayName: 'ImageCard',
	  shouldComponentUpdate: function() {
	    return false;
	  },

	  render: function() {
	    var imgStyle = {
	      backgroundImage: 'url(' + this.props.url + ')',
	      backgroundSize: '100% auto',
	      backgroundRepeat: 'no-repeat',
	      backgroundPosition: 'center',
	      height: this.props.height,
	      left: 0,
	      position: 'absolute',
	      top: 0,
	      width: this.props.width
	    };

	    var outerStyle = {
	      height: this.props.height,
	      position: 'relative',
	      width: this.props.width
	    };

	    // The loading text is composited behind the image so it's hidden
	    // when the image is loaded. Normally you'd use Image.onload, but
	    // that only tells you when the bytes are ready, not when the paint
	    // is done.

	    return (
	      React.DOM.div( {style:outerStyle}, 
	        React.DOM.div( {style:STYLE_LOADING}, "Loading..."),
	        React.DOM.div( {style:imgStyle}, 
	          React.DOM.span( {style:STYLE_CAPTION}, this.props.caption)
	        )
	      )
	    );
	  }
	});

	module.exports = ImageCard;

/***/ },

/***/ 80:
/***/ function(module, exports, require) {

	/*
	 * Easing Functions - inspired from http://gizma.com/easing/
	 * only considering the t value for the range [0, 1] => [0, 1]
	 *
	 * Taken from: https://gist.github.com/gre/1650294
	 *
	 * No license attached to gist; assumed MIT based on
	 * http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
	 */
	var EasingFunctions = {
	  // no easing, no acceleration
	  linear: function (t) { return t },
	  // accelerating from zero velocity
	  easeInQuad: function (t) { return t*t },
	  // decelerating to zero velocity
	  easeOutQuad: function (t) { return t*(2-t) },
	  // acceleration until halfway, then deceleration
	  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	  // accelerating from zero velocity
	  easeInCubic: function (t) { return t*t*t },
	  // decelerating to zero velocity
	  easeOutCubic: function (t) { return (--t)*t*t+1 },
	  // acceleration until halfway, then deceleration
	  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	  // accelerating from zero velocity
	  easeInQuart: function (t) { return t*t*t*t },
	  // decelerating to zero velocity
	  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	  // acceleration until halfway, then deceleration
	  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	  // accelerating from zero velocity
	  easeInQuint: function (t) { return t*t*t*t*t },
	  // decelerating to zero velocity
	  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	  // acceleration until halfway, then deceleration
	  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	};

	module.exports = EasingFunctions;

/***/ },

/***/ 81:
/***/ function(module, exports, require) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = require(30)
		// The css code:
		(require(82))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },

/***/ 82:
/***/ function(module, exports, require) {

	module.exports =
		".ImageCardContainer {\n   left: 0;\n   position: absolute;\n   top: 0;\n}\n";

/***/ },

/***/ 83:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactComponentBrowserEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var ReactDOMIDOperations = require(128);
	var ReactMarkupChecksum = require(77);
	var ReactMount = require(18);
	var ReactReconcileTransaction = require(78);

	var getReactRootElementInContainer = require(72);
	var invariant = require(40);
	var mutateHTMLNodeWithMarkup = require(129);


	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;


	/**
	 * Abstracts away all functionality of `ReactComponent` requires knowledge of
	 * the browser context.
	 */
	var ReactComponentBrowserEnvironment = {
	  /**
	   * Mixed into every component instance.
	   */
	  Mixin: {
	    /**
	     * Returns the DOM node rendered by this component.
	     *
	     * @return {DOMElement} The root node of this component.
	     * @final
	     * @protected
	     */
	    getDOMNode: function() {
	      invariant(this.isMounted());
	      return ReactMount.getNode(this._rootNodeID);
	    }
	  },

	  ReactReconcileTransaction: ReactReconcileTransaction,

	  DOMIDOperations: ReactDOMIDOperations,

	  /**
	   * If a particular environment requires that some resources be cleaned up,
	   * specify this in the injected Mixin. In the DOM, we would likely want to
	   * purge any cached node ID lookups.
	   *
	   * @private
	   */
	  unmountIDFromEnvironment: function(rootNodeID) {
	    ReactMount.purgeID(rootNodeID);
	  },

	  /**
	   * @param {string} markup Markup string to place into the DOM Element.
	   * @param {DOMElement} container DOM Element to insert markup into.
	   * @param {boolean} shouldReuseMarkup Should reuse the existing markup in the
	   * container if possible.
	   */
	  mountImageIntoNode: function(markup, container, shouldReuseMarkup) {
	    invariant(container && (
	      container.nodeType === ELEMENT_NODE_TYPE ||
	      container.nodeType === DOC_NODE_TYPE && ReactMount.allowFullPageRender
	    ));
	    if (shouldReuseMarkup) {
	      if (ReactMarkupChecksum.canReuseMarkup(
	            markup,
	            getReactRootElementInContainer(container))) {
	        return;
	      } else {}
	    }

	    // You can't naively set the innerHTML of the entire document. You need
	    // to mutate documentElement which requires doing some crazy tricks. See
	    // mutateHTMLNodeWithMarkup()
	    if (container.nodeType === DOC_NODE_TYPE) {
	      mutateHTMLNodeWithMarkup(container.documentElement, markup);
	      return;
	    }

	    // Asynchronously inject markup by ensuring that the container is not in
	    // the document when settings its `innerHTML`.
	    var parent = container.parentNode;
	    if (parent) {
	      var next = container.nextSibling;
	      parent.removeChild(container);
	      container.innerHTML = markup;
	      if (next) {
	        parent.insertBefore(container, next);
	      } else {
	        parent.appendChild(container);
	      }
	    } else {
	      container.innerHTML = markup;
	    }
	  }
	};

	module.exports = ReactComponentBrowserEnvironment;


/***/ },

/***/ 84:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */

	var copyProperties = require(130);

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});

	module.exports = emptyFunction;


/***/ },

/***/ 85:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      nextClass && (className += ' ' + nextClass);
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },

/***/ 86:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mergeHelpers
	 *
	 * requiresPolyfills: Array.isArray
	 */

	"use strict";

	var invariant = require(40);
	var keyMirror = require(41);

	/**
	 * Maximum number of levels to traverse. Will catch circular structures.
	 * @const
	 */
	var MAX_MERGE_DEPTH = 36;

	/**
	 * We won't worry about edge cases like new String('x') or new Boolean(true).
	 * Functions are considered terminals, and arrays are not.
	 * @param {*} o The item/object/value to test.
	 * @return {boolean} true iff the argument is a terminal.
	 */
	var isTerminal = function(o) {
	  return typeof o !== 'object' || o === null;
	};

	var mergeHelpers = {

	  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

	  isTerminal: isTerminal,

	  /**
	   * Converts null/undefined values into empty object.
	   *
	   * @param {?Object=} arg Argument to be normalized (nullable optional)
	   * @return {!Object}
	   */
	  normalizeMergeArg: function(arg) {
	    return arg === undefined || arg === null ? {} : arg;
	  },

	  /**
	   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
	   * likely the caller's fault. If this function is ever called with anything
	   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
	   *
	   * @param {*} one Array to merge into.
	   * @param {*} two Array to merge from.
	   */
	  checkMergeArrayArgs: function(one, two) {
	    invariant(Array.isArray(one) && Array.isArray(two));
	  },

	  /**
	   * @param {*} one Object to merge into.
	   * @param {*} two Object to merge from.
	   */
	  checkMergeObjectArgs: function(one, two) {
	    mergeHelpers.checkMergeObjectArg(one);
	    mergeHelpers.checkMergeObjectArg(two);
	  },

	  /**
	   * @param {*} arg
	   */
	  checkMergeObjectArg: function(arg) {
	    invariant(!isTerminal(arg) && !Array.isArray(arg));
	  },

	  /**
	   * Checks that a merge was not given a circular object or an object that had
	   * too great of depth.
	   *
	   * @param {number} Level of recursion to validate against maximum.
	   */
	  checkMergeLevel: function(level) {
	    invariant(level < MAX_MERGE_DEPTH);
	  },

	  /**
	   * Checks that the supplied merge strategy is valid.
	   *
	   * @param {string} Array merge strategy.
	   */
	  checkArrayStrategy: function(strategy) {
	    invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies);
	  },

	  /**
	   * Set of possible behaviors of merge algorithms when encountering two Arrays
	   * that must be merged together.
	   * - `clobber`: The left `Array` is ignored.
	   * - `indexByIndex`: The result is achieved by recursively deep merging at
	   *   each index. (not yet supported.)
	   */
	  ArrayStrategies: keyMirror({
	    Clobber: true,
	    IndexByIndex: true
	  })

	};

	module.exports = mergeHelpers;


/***/ },

/***/ 87:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CSSProperty
	 */

	"use strict";

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  fillOpacity: true,
	  fontWeight: true,
	  lineHeight: true,
	  opacity: true,
	  orphans: true,
	  zIndex: true,
	  zoom: true
	};

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundImage: true,
	    backgroundPosition: true,
	    backgroundRepeat: true,
	    backgroundColor: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;


/***/ },

/***/ 88:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */

	"use strict";

	var CSSProperty = require(87);

	/**
	 * Convert a value into the proper css writable value. The `styleName` name
	 * name should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} styleName CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(styleName, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 || CSSProperty.isUnitlessNumber[styleName]) {
	    return '' + value; // cast to string
	  }

	  return value + 'px';
	}

	module.exports = dangerousStyleValue;


/***/ },

/***/ 89:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;


/***/ },

/***/ 90:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function(string) {
	    if (cache.hasOwnProperty(string)) {
	      return cache[string];
	    } else {
	      return cache[string] = callback.call(this, string);
	    }
	  };
	}

	module.exports = memoizeStringOnly;


/***/ },

/***/ 91:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventConstants
	 */

	"use strict";

	var keyMirror = require(41);

	var PropagationPhases = keyMirror({bubbled: null, captured: null});

	/**
	 * Types of raw signals from the browser caught at the top level.
	 */
	var topLevelTypes = keyMirror({
	  topBlur: null,
	  topChange: null,
	  topClick: null,
	  topCompositionEnd: null,
	  topCompositionStart: null,
	  topCompositionUpdate: null,
	  topCopy: null,
	  topCut: null,
	  topDoubleClick: null,
	  topDrag: null,
	  topDragEnd: null,
	  topDragEnter: null,
	  topDragExit: null,
	  topDragLeave: null,
	  topDragOver: null,
	  topDragStart: null,
	  topDrop: null,
	  topFocus: null,
	  topInput: null,
	  topKeyDown: null,
	  topKeyPress: null,
	  topKeyUp: null,
	  topMouseDown: null,
	  topMouseMove: null,
	  topMouseOut: null,
	  topMouseOver: null,
	  topMouseUp: null,
	  topPaste: null,
	  topScroll: null,
	  topSelectionChange: null,
	  topSubmit: null,
	  topTouchCancel: null,
	  topTouchEnd: null,
	  topTouchMove: null,
	  topTouchStart: null,
	  topWheel: null
	});

	var EventConstants = {
	  topLevelTypes: topLevelTypes,
	  PropagationPhases: PropagationPhases
	};

	module.exports = EventConstants;


/***/ },

/***/ 92:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventListener
	 */

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listens to bubbled events on a DOM node.
	   *
	   * @param {Element} el DOM element to register listener on.
	   * @param {string} handlerBaseName 'click'/'mouseover'
	   * @param {Function!} cb Callback function
	   */
	  listen: function(el, handlerBaseName, cb) {
	    if (el.addEventListener) {
	      el.addEventListener(handlerBaseName, cb, false);
	    } else if (el.attachEvent) {
	      el.attachEvent('on' + handlerBaseName, cb);
	    }
	  },

	  /**
	   * Listens to captured events on a DOM node.
	   *
	   * @see `EventListener.listen` for params.
	   * @throws Exception if addEventListener is not supported.
	   */
	  capture: function(el, handlerBaseName, cb) {
	    if (!el.addEventListener) {
	        return;
	    } else {
	      el.addEventListener(handlerBaseName, cb, true);
	    }
	  }
	};

	module.exports = EventListener;


/***/ },

/***/ 93:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var canUseDOM = typeof window !== 'undefined';

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;


/***/ },

/***/ 94:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactEventEmitterMixin
	 */

	"use strict";

	var EventPluginHub = require(66);
	var ReactUpdates = require(39);

	function runEventQueueInBatch(events) {
	  EventPluginHub.enqueueEvents(events);
	  EventPluginHub.processEventQueue();
	}

	var ReactEventEmitterMixin = {
	  /**
	   * Whether or not `ensureListening` has been invoked.
	   * @type {boolean}
	   * @private
	   */
	  _isListening: false,

	  /**
	   * Function, must be implemented. Listens to events on the top level of the
	   * application.
	   *
	   * @abstract
	   *
	   * listenAtTopLevel: null,
	   */

	  /**
	   * Ensures that top-level event delegation listeners are installed.
	   *
	   * There are issues with listening to both touch events and mouse events on
	   * the top-level, so we make the caller choose which one to listen to. (If
	   * there's a touch top-level listeners, anchors don't receive clicks for some
	   * reason, and only in some cases).
	   *
	   * @param {*} config Configuration passed through to `listenAtTopLevel`.
	   */
	  ensureListening: function(config) {
	    if (!config.contentDocument._reactIsListening) {
	      this.listenAtTopLevel(config.touchNotMouse, config.contentDocument);
	      config.contentDocument._reactIsListening = true;
	    }
	  },

	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {object} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native environment event.
	   */
	  handleTopLevel: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events = EventPluginHub.extractEvents(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent
	    );

	    // Event queue being processed in the same cycle allows `preventDefault`.
	    ReactUpdates.batchedUpdates(runEventQueueInBatch, events);
	  }
	};

	module.exports = ReactEventEmitterMixin;


/***/ },

/***/ 95:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ViewportMetrics
	 */

	"use strict";

	var ViewportMetrics = {

	  currentScrollLeft: 0,

	  currentScrollTop: 0,

	  refreshScrollValues: function() {
	    ViewportMetrics.currentScrollLeft =
	      document.body.scrollLeft + document.documentElement.scrollLeft;
	    ViewportMetrics.currentScrollTop =
	      document.body.scrollTop + document.documentElement.scrollTop;
	  }

	};

	module.exports = ViewportMetrics;


/***/ },

/***/ 96:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isEventSupported
	 */

	"use strict";

	var ExecutionEnvironment = require(93);

	var testNode, useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  testNode = document.createElement('div');
	  useHasFeature =
	    document.implementation &&
	    document.implementation.hasFeature &&
	    // `hasFeature` always returns true in Firefox 19+.
	    document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!testNode || (capture && !testNode.addEventListener)) {
	    return false;
	  }
	  var element = document.createElement('div');

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in element;

	  if (!isSupported) {
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	    if (typeof element[eventName] !== 'undefined') {
	      element[eventName] = undefined;
	    }
	    element.removeAttribute(eventName);
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  element = null;
	  return isSupported;
	}

	module.exports = isEventSupported;


/***/ },

/***/ 97:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule LinkedValueMixin
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */
	var LinkedValueMixin = {
	  _assertLink: function() {
	    invariant(this.props.value == null && this.props.onChange == null);
	  },

	  /**
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function() {
	    if (this.props.valueLink) {
	      this._assertLink();
	      return this.props.valueLink.value;
	    }
	    return this.props.value;
	  },

	  /**
	   * @return {function} change callback either from onChange prop or link.
	   */
	  getOnChange: function() {
	    if (this.props.valueLink) {
	      this._assertLink();
	      return this._handleLinkedValueChange;
	    }
	    return this.props.onChange;
	  },

	  /**
	   * @param {SyntheticEvent} e change event to handle
	   */
	  _handleLinkedValueChange: function(e) {
	    this.props.valueLink.requestChange(e.target.value);
	  }
	};

	module.exports = LinkedValueMixin;


/***/ },

/***/ 98:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getEventTarget
	 * @typechecks static-only
	 */

	"use strict";

	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */
	function getEventTarget(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window;
	  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html
	  return target.nodeType === 3 ? target.parentNode : target;
	}

	module.exports = getEventTarget;


/***/ },

/***/ 99:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPropagators
	 */

	"use strict";

	var CallbackRegistry = require(106);
	var EventConstants = require(91);

	var accumulate = require(109);
	var forEachAccumulated = require(110);
	var getListener = CallbackRegistry.getListener;
	var PropagationPhases = EventConstants.PropagationPhases;

	/**
	 * Injected dependencies:
	 */

	/**
	 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
	 *   hierarchy given ids of the logical DOM elements involved.
	 */
	var injection = {
	  InstanceHandle: null,
	  injectInstanceHandle: function(InjectedInstanceHandle) {
	      injection.InstanceHandle = InjectedInstanceHandle;
	  },
	  validate: function() {
	    var invalid = !injection.InstanceHandle||
	      !injection.InstanceHandle.traverseTwoPhase ||
	      !injection.InstanceHandle.traverseEnterLeave;
	    if (invalid) {
	      throw new Error('InstanceHandle not injected before use!');
	    }
	  }
	};

	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */
	function listenerAtPhase(id, event, propagationPhase) {
	  var registrationName =
	    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(id, registrationName);
	}

	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */
	function accumulateDirectionalDispatches(domID, upwards, event) {
	    var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
	    var listener = listenerAtPhase(domID, event, phase);

	    if (listener) {
	      event._dispatchListeners = accumulate(event._dispatchListeners, listener);
	      event._dispatchIDs = accumulate(event._dispatchIDs, domID);
	    }
	}

	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We can not perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */
	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    injection.InstanceHandle.traverseTwoPhase(
	      event.dispatchMarker,
	      accumulateDirectionalDispatches,
	      event
	    );
	  }
	}


	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */
	function accumulateDispatches(id, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(id, registrationName);
	    if (listener) {
	      event._dispatchListeners = accumulate(event._dispatchListeners, listener);
	      event._dispatchIDs = accumulate(event._dispatchIDs, id);
	    }
	  }
	}

	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */
	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event.dispatchMarker, null, event);
	  }
	}

	function accumulateTwoPhaseDispatches(events) {
	    forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}

	function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
	    injection.InstanceHandle.traverseEnterLeave(
	      fromID,
	      toID,
	      accumulateDispatches,
	      leave,
	      enter
	    );
	}


	function accumulateDirectDispatches(events) {
	    forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}



	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */
	var EventPropagators = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
	  injection: injection
	};

	module.exports = EventPropagators;


/***/ },

/***/ 100:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticEvent
	 * @typechecks static-only
	 */

	"use strict";

	var PooledClass = require(125);

	var emptyFunction = require(84);
	var getEventTarget = require(98);
	var merge = require(42);
	var mergeInto = require(46);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var EventInterface = {
	  type: null,
	  target: getEventTarget,
	  currentTarget: null,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function(event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};

	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 */
	function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  this.dispatchConfig = dispatchConfig;
	  this.dispatchMarker = dispatchMarker;
	  this.nativeEvent = nativeEvent;

	  var Interface = this.constructor.Interface;
	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }
	    var normalize = Interface[propName];
	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      this[propName] = nativeEvent[propName];
	    }
	  }

	  if (nativeEvent.defaultPrevented || nativeEvent.returnValue === false) {
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
	  }
	  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
	}

	mergeInto(SyntheticEvent.prototype, {

	  preventDefault: function() {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  },

	  stopPropagation: function() {
	    var event = this.nativeEvent;
	    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function() {
	    this.isPersistent = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction.thatReturnsFalse,

	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function() {
	    var Interface = this.constructor.Interface;
	    for (var propName in Interface) {
	      this[propName] = null;
	    }
	    this.dispatchConfig = null;
	    this.dispatchMarker = null;
	    this.nativeEvent = null;
	  }

	});

	SyntheticEvent.Interface = EventInterface;

	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */
	SyntheticEvent.augmentClass = function(Class, Interface) {
	  var Super = this;

	  var prototype = Object.create(Super.prototype);
	  mergeInto(prototype, Class.prototype);
	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;

	  Class.Interface = merge(Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;

	  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
	};

	PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

	module.exports = SyntheticEvent;


/***/ },

/***/ 101:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isTextInputElement
	 */

	"use strict";

	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */
	var supportedInputTypes = {
	  'color': true,
	  'date': true,
	  'datetime': true,
	  'datetime-local': true,
	  'email': true,
	  'month': true,
	  'number': true,
	  'password': true,
	  'range': true,
	  'search': true,
	  'tel': true,
	  'text': true,
	  'time': true,
	  'url': true,
	  'week': true
	};

	function isTextInputElement(elem) {
	  return elem && (
	    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) ||
	    elem.nodeName === 'TEXTAREA'
	  );
	}

	module.exports = isTextInputElement;


/***/ },

/***/ 102:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactInputSelection
	 */

	"use strict";

	var ReactDOMSelection = require(131);

	var getActiveElement = require(117);
	var nodeContains = require(73);

	function isInDocument(node) {
	  return nodeContains(document.documentElement, node);
	}

	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */
	var ReactInputSelection = {

	  hasSelectionCapabilities: function(elem) {
	    return elem && (
	      (elem.nodeName === 'INPUT' && elem.type === 'text') ||
	      elem.nodeName === 'TEXTAREA' ||
	      elem.contentEditable === 'true'
	    );
	  },

	  getSelectionInformation: function() {
	    var focusedElem = getActiveElement();
	    return {
	      focusedElem: focusedElem,
	      selectionRange:
	          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
	          ReactInputSelection.getSelection(focusedElem) :
	          null
	    };
	  },

	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function(priorSelectionInformation) {
	    var curFocusedElem = getActiveElement();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;
	    if (curFocusedElem !== priorFocusedElem &&
	        isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection.setSelection(
	          priorFocusedElem,
	          priorSelectionRange
	        );
	      }
	      priorFocusedElem.focus();
	    }
	  },

	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function(input) {
	    var selection;

	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      // IE8 input.
	      var range = document.selection.createRange();
	      // There can only be one selection per document in IE, so it must
	      // be in our element.
	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }

	    return selection || {start: 0, end: 0};
	  },

	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function(input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;
	    if (typeof end === 'undefined') {
	      end = start;
	    }

	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};

	module.exports = ReactInputSelection;


/***/ },

/***/ 103:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticCompositionEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = require(100);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */
	var CompositionEventInterface = {
	  data: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticCompositionEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(
	  SyntheticCompositionEvent,
	  CompositionEventInterface
	);

	module.exports = SyntheticCompositionEvent;



/***/ },

/***/ 104:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getTextContentAccessor
	 */

	"use strict";

	var ExecutionEnvironment = require(93);

	var contentKey = null;

	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */
	function getTextContentAccessor() {
	  if (!contentKey && ExecutionEnvironment.canUseDOM) {
	    contentKey = 'innerText' in document.createElement('div') ?
	      'innerText' :
	      'textContent';
	  }
	  return contentKey;
	}

	module.exports = getTextContentAccessor;


/***/ },

/***/ 105:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticMouseEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = require(115);
	var ViewportMetrics = require(95);

	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  button: function(event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;
	    if ('which' in event) {
	      return button;
	    }
	    // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)
	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function(event) {
	    return event.relatedTarget || (
	      event.fromElement === event.srcElement ?
	        event.toElement :
	        event.fromElement
	    );
	  },
	  // "Proprietary" Interface.
	  pageX: function(event) {
	    return 'pageX' in event ?
	      event.pageX :
	      event.clientX + ViewportMetrics.currentScrollLeft;
	  },
	  pageY: function(event) {
	    return 'pageY' in event ?
	      event.pageY :
	      event.clientY + ViewportMetrics.currentScrollTop;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

	module.exports = SyntheticMouseEvent;


/***/ },

/***/ 106:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CallbackRegistry
	 * @typechecks static-only
	 */

	"use strict";

	var listenerBank = {};

	/**
	 * Stores "listeners" by `registrationName`/`id`. There should be at most one
	 * "listener" per `registrationName`/`id` in the `listenerBank`.
	 *
	 * Access listeners via `listenerBank[registrationName][id]`.
	 *
	 * @class CallbackRegistry
	 * @internal
	 */
	var CallbackRegistry = {

	  /**
	   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {?function} listener The callback to store.
	   */
	  putListener: function(id, registrationName, listener) {
	    var bankForRegistrationName =
	      listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[id] = listener;
	  },

	  /**
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    return bankForRegistrationName && bankForRegistrationName[id];
	  },

	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    if (bankForRegistrationName) {
	      delete bankForRegistrationName[id];
	    }
	  },

	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {string} id ID of the DOM element.
	   */
	  deleteAllListeners: function(id) {
	    for (var registrationName in listenerBank) {
	      delete listenerBank[registrationName][id];
	    }
	  },

	  /**
	   * This is needed for tests only. Do not use!
	   */
	  __purge: function() {
	    listenerBank = {};
	  }

	};

	module.exports = CallbackRegistry;


/***/ },

/***/ 107:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginRegistry
	 * @typechecks static-only
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * Injectable ordering of event plugins.
	 */
	var EventPluginOrder = null;

	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};

	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!EventPluginOrder) {
	    // Wait until an `EventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var PluginModule = namesToPlugins[pluginName];
	    var pluginIndex = EventPluginOrder.indexOf(pluginName);
	    invariant(pluginIndex > -1);
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    invariant(PluginModule.extractEvents);
	    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
	    var publishedEvents = PluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule));
	    }
	  }
	}

	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, PluginModule) {
	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(phasedRegistrationName, PluginModule);
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(dispatchConfig.registrationName, PluginModule);
	    return true;
	  }
	  return false;
	}

	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, PluginModule) {
	  invariant(!EventPluginRegistry.registrationNames[registrationName]);
	  EventPluginRegistry.registrationNames[registrationName] = PluginModule;
	  EventPluginRegistry.registrationNamesKeys.push(registrationName);
	}

	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {

	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],

	  /**
	   * Mapping from registration names to plugin modules.
	   */
	  registrationNames: {},

	  /**
	   * The keys of `registrationNames`.
	   */
	  registrationNamesKeys: [],

	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function(InjectedEventPluginOrder) {
	    invariant(!EventPluginOrder);
	    // Clone the ordering so it cannot be dynamically mutated.
	    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
	    recomputePluginOrdering();
	  },

	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function(injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var PluginModule = injectedNamesToPlugins[pluginName];
	      if (namesToPlugins[pluginName] !== PluginModule) {
	        invariant(!namesToPlugins[pluginName]);
	        namesToPlugins[pluginName] = PluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },

	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function(event) {
	    var dispatchConfig = event.dispatchConfig;
	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry.registrationNames[
	        dispatchConfig.registrationName
	      ] || null;
	    }
	    for (var phase in dispatchConfig.phasedRegistrationNames) {
	      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
	        continue;
	      }
	      var PluginModule = EventPluginRegistry.registrationNames[
	        dispatchConfig.phasedRegistrationNames[phase]
	      ];
	      if (PluginModule) {
	        return PluginModule;
	      }
	    }
	    return null;
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function() {
	    EventPluginOrder = null;
	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }
	    EventPluginRegistry.plugins.length = 0;
	    var registrationNames = EventPluginRegistry.registrationNames;
	    for (var registrationName in registrationNames) {
	      if (registrationNames.hasOwnProperty(registrationName)) {
	        delete registrationNames[registrationName];
	      }
	    }
	    EventPluginRegistry.registrationNamesKeys.length = 0;
	  }

	};

	module.exports = EventPluginRegistry;


/***/ },

/***/ 108:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventPluginUtils
	 */

	"use strict";
	var EventConstants = require(91);
	var invariant = require(40);
	var topLevelTypes = EventConstants.topLevelTypes;

	function isEndish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseUp ||
	         topLevelType === topLevelTypes.topTouchEnd ||
	         topLevelType === topLevelTypes.topTouchCancel;
	}

	function isMoveish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseMove ||
	         topLevelType === topLevelTypes.topTouchMove;
	}

	function isStartish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseDown ||
	         topLevelType === topLevelTypes.topTouchStart;
	}

	var validateEventDispatches;

	/**
	 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
	 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
	 * kept separate to conserve memory.
	 */
	function forEachEventDispatch(event, cb) {
	    var dispatchListeners = event._dispatchListeners;
	    var dispatchIDs = event._dispatchIDs;

	    if (Array.isArray(dispatchListeners)) {
	      for (var i = 0; i < dispatchListeners.length; i++) {
	        if (event.isPropagationStopped()) {
	          break;
	        }
	        // Listeners and IDs are two parallel arrays that are always in sync.
	        cb(event, dispatchListeners[i], dispatchIDs[i]);
	      }
	    } else if (dispatchListeners) {
	      cb(event, dispatchListeners, dispatchIDs);
	    }
	}

	/**
	 * Default implementation of PluginModule.executeDispatch().
	 * @param {SyntheticEvent} SyntheticEvent to handle
	 * @param {function} Application-level callback
	 * @param {string} domID DOM id to pass to the callback.
	 */
	function executeDispatch(event, listener, domID) {
	  listener(event, domID);
	}

	/**
	 * Standard/simple iteration through an event's collected dispatches.
	 */
	function executeDispatchesInOrder(event, executeDispatch) {
	  forEachEventDispatch(event, executeDispatch);
	  event._dispatchListeners = null;
	  event._dispatchIDs = null;
	}

	/**
	 * Standard/simple iteration through an event's collected dispatches, but stops
	 * at the first dispatch execution returning true, and returns that id.
	 *
	 * @return id of the first dispatch execution who's listener returns true, or
	 * null if no listener returned true.
	 */
	function executeDispatchesInOrderStopAtTrue(event) {
	    var dispatchListeners = event._dispatchListeners;
	    var dispatchIDs = event._dispatchIDs;

	    if (Array.isArray(dispatchListeners)) {
	      for (var i = 0; i < dispatchListeners.length; i++) {
	        if (event.isPropagationStopped()) {
	          break;
	        }
	        // Listeners and IDs are two parallel arrays that are always in sync.
	        if (dispatchListeners[i](event, dispatchIDs[i])) {
	          return dispatchIDs[i];
	        }
	      }
	    } else if (dispatchListeners) {
	      if (dispatchListeners(event, dispatchIDs)) {
	        return dispatchIDs;
	      }
	    }

	    return null;
	}

	/**
	 * Execution of a "direct" dispatch - there must be at most one dispatch
	 * accumulated on the event or it is considered an error. It doesn't really make
	 * sense for an event with multiple dispatches (bubbled) to keep track of the
	 * return values at each dispatch execution, but it does tend to make sense when
	 * dealing with "direct" dispatches.
	 *
	 * @return The return value of executing the single dispatch.
	 */
	function executeDirectDispatch(event) {
	    var dispatchListener = event._dispatchListeners;
	    var dispatchID = event._dispatchIDs;
	    invariant(!Array.isArray(dispatchListener));

	    var res = dispatchListener ?
	      dispatchListener(event, dispatchID) :
	      null;

	    event._dispatchListeners = null;
	    event._dispatchIDs = null;
	    return res;
	}

	/**
	 * @param {SyntheticEvent} event
	 * @return {bool} True iff number of dispatches accumulated is greater than 0.
	 */
	function hasDispatches(event) {
	  return !!event._dispatchListeners;
	}

	/**
	 * General utilities that are useful in creating custom Event Plugins.
	 */
	var EventPluginUtils = {
	  isEndish: isEndish,
	  isMoveish: isMoveish,
	  isStartish: isStartish,
	  executeDispatchesInOrder: executeDispatchesInOrder,
	  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
	  executeDirectDispatch: executeDirectDispatch,
	  hasDispatches: hasDispatches,
	  executeDispatch: executeDispatch
	};

	module.exports = EventPluginUtils;


/***/ },

/***/ 109:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule accumulate
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * Accumulates items that must not be null or undefined.
	 *
	 * This is used to conserve memory by avoiding array allocations.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */
	function accumulate(current, next) {
	  invariant(next != null);
	  if (current == null) {
	    return next;
	  } else {
	    // Both are not empty. Warning: Never call x.concat(y) when you are not
	    // certain that x is an Array (x could be a string with concat method).
	    var currentIsArray = Array.isArray(current);
	    var nextIsArray = Array.isArray(next);
	    if (currentIsArray) {
	      return current.concat(next);
	    } else {
	      if (nextIsArray) {
	        return [current].concat(next);
	      } else {
	        return [current, next];
	      }
	    }
	  }
	}

	module.exports = accumulate;


/***/ },

/***/ 110:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule forEachAccumulated
	 */

	"use strict";

	/**
	 * @param {array} an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */
	var forEachAccumulated = function(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	};

	module.exports = forEachAccumulated;


/***/ },

/***/ 111:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticClipboardEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = require(100);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */
	var ClipboardEventInterface = {
	  clipboardData: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

	module.exports = SyntheticClipboardEvent;



/***/ },

/***/ 112:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticFocusEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = require(115);

	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var FocusEventInterface = {
	  relatedTarget: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

	module.exports = SyntheticFocusEvent;


/***/ },

/***/ 113:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticKeyboardEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = require(115);

	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var KeyboardEventInterface = {
	  'char': null,
	  key: null,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  // Legacy Interface
	  charCode: null,
	  keyCode: null,
	  which: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

	module.exports = SyntheticKeyboardEvent;


/***/ },

/***/ 114:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticTouchEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticUIEvent = require(115);

	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */
	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

	module.exports = SyntheticTouchEvent;


/***/ },

/***/ 115:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticUIEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticEvent = require(100);

	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var UIEventInterface = {
	  view: null,
	  detail: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

	module.exports = SyntheticUIEvent;


/***/ },

/***/ 116:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule SyntheticWheelEvent
	 * @typechecks static-only
	 */

	"use strict";

	var SyntheticMouseEvent = require(105);

	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var WheelEventInterface = {
	  deltaX: function(event) {
	    // NOTE: IE<9 does not support x-axis delta.
	    return (
	      'deltaX' in event ? event.deltaX :
	      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
	    );
	  },
	  deltaY: function(event) {
	    return (
	      // Normalize (up is positive).
	      'deltaY' in event ? -event.deltaY :
	      // Fallback to `wheelDeltaY` for Webkit.
	      'wheelDeltaY' in event ? event.wheelDeltaY :
	      // Fallback to `wheelDelta` for IE<9.
	      'wheelDelta' in event ? event.wheelData : 0
	    );
	  },
	  deltaZ: null,
	  deltaMode: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */
	function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

	module.exports = SyntheticWheelEvent;


/***/ },

/***/ 117:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getActiveElement
	 * @typechecks
	 */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 */
	function getActiveElement() /*?DOMElement*/ {
	  try {
	    return document.activeElement;
	  } catch (e) {
	    return null;
	  }
	}

	module.exports = getActiveElement;



/***/ },

/***/ 118:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule shallowEqual
	 */

	"use strict";

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B'a keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;


/***/ },

/***/ 119:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule Transaction
	 */

	"use strict";

	var invariant = require(40);

	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be ran while it is already being ran. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Bonus:
	 * - Reports timing metrics by method name and wrapper index.
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidRender` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM upates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var Mixin = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function() {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (!this.wrapperInitData) {
	      this.wrapperInitData = [];
	    } else {
	      this.wrapperInitData.length = 0;
	    }
	    if (!this.timingMetrics) {
	      this.timingMetrics = {};
	    }
	    this.timingMetrics.methodInvocationTime = 0;
	    if (!this.timingMetrics.wrapperInitTimes) {
	      this.timingMetrics.wrapperInitTimes = [];
	    } else {
	      this.timingMetrics.wrapperInitTimes.length = 0;
	    }
	    if (!this.timingMetrics.wrapperCloseTimes) {
	      this.timingMetrics.wrapperCloseTimes = [];
	    } else {
	      this.timingMetrics.wrapperCloseTimes.length = 0;
	    }
	    this._isInTransaction = false;
	  },

	  _isInTransaction: false,

	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,

	  isInTransaction: function() {
	    return !!this._isInTransaction;
	  },

	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} args... Arguments to pass to the method (optional).
	   *                           Helps prevent need to bind in many cases.
	   * @return Return value from `method`.
	   */
	  perform: function(method, scope, a, b, c, d, e, f) {
	    invariant(!this.isInTransaction());
	    var memberStart = Date.now();
	    var errorToThrow = null;
	    var ret;
	    try {
	      this.initializeAll();
	      ret = method.call(scope, a, b, c, d, e, f);
	    } catch (error) {
	      // IE8 requires `catch` in order to use `finally`.
	      errorToThrow = error;
	    } finally {
	      var memberEnd = Date.now();
	      this.methodInvocationTime += (memberEnd - memberStart);
	      try {
	        this.closeAll();
	      } catch (closeError) {
	        // If `method` throws, prefer to show that stack trace over any thrown
	        // by invoking `closeAll`.
	        errorToThrow = errorToThrow || closeError;
	      }
	    }
	    if (errorToThrow) {
	      throw errorToThrow;
	    }
	    return ret;
	  },

	  initializeAll: function() {
	    this._isInTransaction = true;
	    var transactionWrappers = this.transactionWrappers;
	    var wrapperInitTimes = this.timingMetrics.wrapperInitTimes;
	    var errorToThrow = null;
	    for (var i = 0; i < transactionWrappers.length; i++) {
	      var initStart = Date.now();
	      var wrapper = transactionWrappers[i];
	      try {
	        this.wrapperInitData[i] = wrapper.initialize ?
	          wrapper.initialize.call(this) :
	          null;
	      } catch (initError) {
	        // Prefer to show the stack trace of the first error.
	        errorToThrow = errorToThrow || initError;
	        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
	      } finally {
	        var curInitTime = wrapperInitTimes[i];
	        var initEnd = Date.now();
	        wrapperInitTimes[i] = (curInitTime || 0) + (initEnd - initStart);
	      }
	    }
	    if (errorToThrow) {
	      throw errorToThrow;
	    }
	  },

	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function() {
	    invariant(this.isInTransaction());
	    var transactionWrappers = this.transactionWrappers;
	    var wrapperCloseTimes = this.timingMetrics.wrapperCloseTimes;
	    var errorToThrow = null;
	    for (var i = 0; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var closeStart = Date.now();
	      var initData = this.wrapperInitData[i];
	      try {
	        if (initData !== Transaction.OBSERVED_ERROR) {
	          wrapper.close && wrapper.close.call(this, initData);
	        }
	      } catch (closeError) {
	        // Prefer to show the stack trace of the first error.
	        errorToThrow = errorToThrow || closeError;
	      } finally {
	        var closeEnd = Date.now();
	        var curCloseTime = wrapperCloseTimes[i];
	        wrapperCloseTimes[i] = (curCloseTime || 0) + (closeEnd - closeStart);
	      }
	    }
	    this.wrapperInitData.length = 0;
	    this._isInTransaction = false;
	    if (errorToThrow) {
	      throw errorToThrow;
	    }
	  }
	};

	var Transaction = {

	  Mixin: Mixin,

	  /**
	   * Token to look for to determine if an error occured.
	   */
	  OBSERVED_ERROR: {}

	};

	module.exports = Transaction;


/***/ },

/***/ 120:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ge
	 */

	/**
	 * Find a node by ID.  Optionally search a sub-tree outside of the document
	 *
	 * Use ge if you're not sure whether or not the element exists. You can test
	 * for existence yourself in your application code.
	 *
	 * If your application code depends on the existence of the element, use $
	 * instead, which will throw in DEV if the element doesn't exist.
	 */
	function ge(arg, root, tag) {
	  return typeof arg != 'string' ? arg :
	    !root ? document.getElementById(arg) :
	    _geFromSubtree(arg, root, tag);
	}

	function _geFromSubtree(id, root, tag) {
	  var elem, children, ii;

	  if (_getNodeID(root) == id) {
	    return root;
	  } else if (root.getElementsByTagName) {
	    // All Elements implement this, which does an iterative DFS, which is
	    // faster than recursion and doesn't run into stack depth issues.
	    children = root.getElementsByTagName(tag || '*');
	    for (ii = 0; ii < children.length; ii++) {
	      if (_getNodeID(children[ii]) == id) {
	        return children[ii];
	      }
	    }
	  } else {
	    // DocumentFragment does not implement getElementsByTagName, so
	    // recurse over its children. Its children must be Elements, so
	    // each child will use the getElementsByTagName case instead.
	    children = root.childNodes;
	    for (ii = 0; ii < children.length; ii++) {
	      elem = _geFromSubtree(id, children[ii]);
	      if (elem) {
	        return elem;
	      }
	    }
	  }

	  return null;
	}

	/**
	 * Return the ID value for a given node. This allows us to avoid issues
	 * with forms that contain inputs with name="id".
	 *
	 * @return string (null if attribute not set)
	 */
	function _getNodeID(node) {
	  // #document and #document-fragment do not have getAttributeNode.
	  var id = node.getAttributeNode && node.getAttributeNode('id');
	  return id ? id.value : null;
	}

	module.exports = ge;


/***/ },

/***/ 121:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ex
	 * @typechecks
	 * @nostacktrace
	 */

	/**
	 * This function transforms error message with arguments into plain text error
	 * message, so that it can be passed to window.onerror without losing anything.
	 * It can then be transformed back by `erx()` function.
	 *
	 * Usage:
	 *   throw new Error(ex('Error %s from %s', errorCode, userID));
	 *
	 * @param {string} errorMessage
	 */

	var ex = function(errorMessage/*, arg1, arg2, ...*/) {
	  var args = Array.prototype.slice.call(arguments).map(function(arg) {
	    return String(arg);
	  });
	  var expectedLength = errorMessage.split('%s').length - 1;

	  if (expectedLength !== args.length - 1) {
	    // something wrong with the formatting string
	    return ex('ex args number mismatch: %s', JSON.stringify(args));
	  }

	  return ex._prefix + JSON.stringify(args) + ex._suffix;
	};

	ex._prefix = '<![EX[';
	ex._suffix = ']]>';

	module.exports = ex;


/***/ },

/***/ 122:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isTextNode
	 * @typechecks
	 */

	var isNode = require(132);

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	module.exports = isTextNode;


/***/ },

/***/ 123:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule traverseAllChildren
	 */

	"use strict";

	var ReactComponent = require(11);
	var ReactTextComponent = require(23);

	var invariant = require(40);

	/**
	 * TODO: Test that:
	 * 1. `mapChildren` transforms strings and numbers into `ReactTextComponent`.
	 * 2. it('should fail when supplied duplicate key', function() {
	 * 3. That a single child and an array with one item have the same key pattern.
	 * });
	 */

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!number} indexSoFar Number of children encountered until this point.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	var traverseAllChildrenImpl =
	  function(children, nameSoFar, indexSoFar, callback, traverseContext) {
	    var subtreeCount = 0;  // Count of children found in the current subtree.
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        var nextName = nameSoFar + ReactComponent.getKey(child, i);
	        var nextIndex = indexSoFar + subtreeCount;
	        subtreeCount += traverseAllChildrenImpl(
	          child,
	          nextName,
	          nextIndex,
	          callback,
	          traverseContext
	        );
	      }
	    } else {
	      var type = typeof children;
	      var isOnlyChild = nameSoFar === '';
	      // If it's the only child, treat the name as if it was wrapped in an array
	      // so that it's consistent if the number of children grows
	      var storageName = isOnlyChild ?
	        ReactComponent.getKey(children, 0):
	        nameSoFar;
	      if (children === null || children === undefined || type === 'boolean') {
	        // All of the above are perceived as null.
	        callback(traverseContext, null, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else if (children.mountComponentIntoNode) {
	        callback(traverseContext, children, storageName, indexSoFar);
	        subtreeCount = 1;
	      } else {
	        if (type === 'object') {
	          invariant(!children || children.nodeType !== 1);
	          for (var key in children) {
	            if (children.hasOwnProperty(key)) {
	              subtreeCount += traverseAllChildrenImpl(
	                children[key],
	                nameSoFar + '{' + key + '}',
	                indexSoFar + subtreeCount,
	                callback,
	                traverseContext
	              );
	            }
	          }
	        } else if (type === 'string') {
	          var normalizedText = new ReactTextComponent(children);
	          callback(traverseContext, normalizedText, storageName, indexSoFar);
	          subtreeCount += 1;
	        } else if (type === 'number') {
	          var normalizedNumber = new ReactTextComponent('' + children);
	          callback(traverseContext, normalizedNumber, storageName, indexSoFar);
	          subtreeCount += 1;
	        }
	      }
	    }
	    return subtreeCount;
	  };

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children !== null && children !== undefined) {
	    traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
	  }
	}

	module.exports = traverseAllChildren;


/***/ },

/***/ 124:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule adler32
	 */

	/* jslint bitwise:true */

	"use strict";

	var MOD = 65521;

	// This is a clean-room implementation of adler32 designed for detecting
	// if markup is not what we expect it to be. It does not need to be
	// cryptographically strong, only reasonable good at detecting if markup
	// generated on the server is different than that on the client.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  for (var i = 0; i < data.length; i++) {
	    a = (a + data.charCodeAt(i)) % MOD;
	    b = (b + a) % MOD;
	  }
	  return a | (b << 16);
	}

	module.exports = adler32;


/***/ },

/***/ 125:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule PooledClass
	 */

	"use strict";

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function(a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function(a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function(instance) {
	  var Klass = this;
	  if (instance.destructor) {
	    instance.destructor();
	  }
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function(CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;


/***/ },

/***/ 126:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactMountReady
	 */

	"use strict";

	var PooledClass = require(125);

	var mixInto = require(44);

	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `ReactMountReady.getPooled()`.
	 *
	 * @param {?array<function>} initialCollection
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	function ReactMountReady(initialCollection) {
	  this._queue = initialCollection || null;
	}

	mixInto(ReactMountReady, {

	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked. This is used
	   * to enqueue calls to `componentDidMount` and `componentDidUpdate`.
	   *
	   * @param {ReactComponent} component Component being rendered.
	   * @param {function(DOMElement)} callback Invoked when `notifyAll` is invoked.
	   * @internal
	   */
	  enqueue: function(component, callback) {
	    this._queue = this._queue || [];
	    this._queue.push({component: component, callback: callback});
	  },

	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	  notifyAll: function() {
	    var queue = this._queue;
	    if (queue) {
	      this._queue = null;
	      for (var i = 0, l = queue.length; i < l; i++) {
	        var component = queue[i].component;
	        var callback = queue[i].callback;
	        callback.call(component, component.getDOMNode());
	      }
	      queue.length = 0;
	    }
	  },

	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	  reset: function() {
	    this._queue = null;
	  },

	  /**
	   * `PooledClass` looks for this.
	   */
	  destructor: function() {
	    this.reset();
	  }

	});

	PooledClass.addPoolingTo(ReactMountReady);

	module.exports = ReactMountReady;


/***/ },

/***/ 127:
/***/ function(module, exports, require) {

	/*!
	 * Parse JavaScript SDK
	 * Version: 1.2.8
	 * Built: Fri Jul 05 2013 15:50:53
	 * http://parse.com
	 *
	 * Copyright 2013 Parse, Inc.
	 * The Parse JavaScript SDK is freely distributable under the MIT license.
	 *
	 * Includes: Underscore.js
	 * Copyright 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
	 * Released under the MIT license.
	 */
	(function(root) {
	  root.Parse = root.Parse || {};
	  root.Parse.VERSION = "js1.2.8";
	}(this));
	//     Underscore.js 1.4.4
	//     http://underscorejs.org
	//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `global` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Establish the object that gets returned to break out of a loop iteration.
	  var breaker = {};

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push             = ArrayProto.push,
	      slice            = ArrayProto.slice,
	      concat           = ArrayProto.concat,
	      toString         = ObjProto.toString,
	      hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeForEach      = ArrayProto.forEach,
	    nativeMap          = ArrayProto.map,
	    nativeReduce       = ArrayProto.reduce,
	    nativeReduceRight  = ArrayProto.reduceRight,
	    nativeFilter       = ArrayProto.filter,
	    nativeEvery        = ArrayProto.every,
	    nativeSome         = ArrayProto.some,
	    nativeIndexOf      = ArrayProto.indexOf,
	    nativeLastIndexOf  = ArrayProto.lastIndexOf,
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object via a string identifier,
	  // for Closure Compiler "advanced" mode.
	  if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.4.4';

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles objects with the built-in `forEach`, arrays, and raw objects.
	  // Delegates to **ECMAScript 5**'s native `forEach` if available.
	  var each = _.each = _.forEach = function(obj, iterator, context) {
	    if (obj == null) return;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } else if (obj.length === +obj.length) {
	      for (var i = 0, l = obj.length; i < l; i++) {
	        if (iterator.call(context, obj[i], i, obj) === breaker) return;
	      }
	    } else {
	      for (var key in obj) {
	        if (_.has(obj, key)) {
	          if (iterator.call(context, obj[key], key, obj) === breaker) return;
	        }
	      }
	    }
	  };

	  // Return the results of applying the iterator to each element.
	  // Delegates to **ECMAScript 5**'s native `map` if available.
	  _.map = _.collect = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	    each(obj, function(value, index, list) {
	      results[results.length] = iterator.call(context, value, index, list);
	    });
	    return results;
	  };

	  var reduceError = 'Reduce of empty array with no initial value';

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
	  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
	    var initial = arguments.length > 2;
	    if (obj == null) obj = [];
	    if (nativeReduce && obj.reduce === nativeReduce) {
	      if (context) iterator = _.bind(iterator, context);
	      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
	    }
	    each(obj, function(value, index, list) {
	      if (!initial) {
	        memo = value;
	        initial = true;
	      } else {
	        memo = iterator.call(context, memo, value, index, list);
	      }
	    });
	    if (!initial) throw new TypeError(reduceError);
	    return memo;
	  };

	  // The right-associative version of reduce, also known as `foldr`.
	  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
	  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
	    var initial = arguments.length > 2;
	    if (obj == null) obj = [];
	    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
	      if (context) iterator = _.bind(iterator, context);
	      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
	    }
	    var length = obj.length;
	    if (length !== +length) {
	      var keys = _.keys(obj);
	      length = keys.length;
	    }
	    each(obj, function(value, index, list) {
	      index = keys ? keys[--length] : --length;
	      if (!initial) {
	        memo = obj[index];
	        initial = true;
	      } else {
	        memo = iterator.call(context, memo, obj[index], index, list);
	      }
	    });
	    if (!initial) throw new TypeError(reduceError);
	    return memo;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, iterator, context) {
	    var result;
	    any(obj, function(value, index, list) {
	      if (iterator.call(context, value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Delegates to **ECMAScript 5**'s native `filter` if available.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
	    each(obj, function(value, index, list) {
	      if (iterator.call(context, value, index, list)) results[results.length] = value;
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, iterator, context) {
	    return _.filter(obj, function(value, index, list) {
	      return !iterator.call(context, value, index, list);
	    }, context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Delegates to **ECMAScript 5**'s native `every` if available.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, iterator, context) {
	    iterator || (iterator = _.identity);
	    var result = true;
	    if (obj == null) return result;
	    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
	    each(obj, function(value, index, list) {
	      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
	    });
	    return !!result;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Delegates to **ECMAScript 5**'s native `some` if available.
	  // Aliased as `any`.
	  var any = _.some = _.any = function(obj, iterator, context) {
	    iterator || (iterator = _.identity);
	    var result = false;
	    if (obj == null) return result;
	    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
	    each(obj, function(value, index, list) {
	      if (result || (result = iterator.call(context, value, index, list))) return breaker;
	    });
	    return !!result;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
	    return any(obj, function(value) {
	      return value === target;
	    });
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, function(value){ return value[key]; });
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs, first) {
	    if (_.isEmpty(attrs)) return first ? null : [];
	    return _[first ? 'find' : 'filter'](obj, function(value) {
	      for (var key in attrs) {
	        if (attrs[key] !== value[key]) return false;
	      }
	      return true;
	    });
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.where(obj, attrs, true);
	  };

	  // Return the maximum element or (element-based computation).
	  // Can't optimize arrays of integers longer than 65,535 elements.
	  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
	  _.max = function(obj, iterator, context) {
	    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
	      return Math.max.apply(Math, obj);
	    }
	    if (!iterator && _.isEmpty(obj)) return -Infinity;
	    var result = {computed : -Infinity, value: -Infinity};
	    each(obj, function(value, index, list) {
	      var computed = iterator ? iterator.call(context, value, index, list) : value;
	      computed >= result.computed && (result = {value : value, computed : computed});
	    });
	    return result.value;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iterator, context) {
	    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
	      return Math.min.apply(Math, obj);
	    }
	    if (!iterator && _.isEmpty(obj)) return Infinity;
	    var result = {computed : Infinity, value: Infinity};
	    each(obj, function(value, index, list) {
	      var computed = iterator ? iterator.call(context, value, index, list) : value;
	      computed < result.computed && (result = {value : value, computed : computed});
	    });
	    return result.value;
	  };

	  // Shuffle an array.
	  _.shuffle = function(obj) {
	    var rand;
	    var index = 0;
	    var shuffled = [];
	    each(obj, function(value) {
	      rand = _.random(index++);
	      shuffled[index - 1] = shuffled[rand];
	      shuffled[rand] = value;
	    });
	    return shuffled;
	  };

	  // An internal function to generate lookup iterators.
	  var lookupIterator = function(value) {
	    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
	  };

	  // Sort the object's values by a criterion produced by an iterator.
	  _.sortBy = function(obj, value, context) {
	    var iterator = lookupIterator(value);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value : value,
	        index : index,
	        criteria : iterator.call(context, value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index < right.index ? -1 : 1;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(obj, value, context, behavior) {
	    var result = {};
	    var iterator = lookupIterator(value || _.identity);
	    each(obj, function(value, index) {
	      var key = iterator.call(context, value, index, obj);
	      behavior(result, key, value);
	    });
	    return result;
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = function(obj, value, context) {
	    return group(obj, value, context, function(result, key, value) {
	      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
	    });
	  };

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = function(obj, value, context) {
	    return group(obj, value, context, function(result, key) {
	      if (!_.has(result, key)) result[key] = 0;
	      result[key]++;
	    });
	  };

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iterator, context) {
	    iterator = iterator == null ? _.identity : lookupIterator(iterator);
	    var value = iterator.call(context, obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = (low + high) >>> 1;
	      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
	    }
	    return low;
	  };

	  // Safely convert anything iterable into a real, live array.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if ((n != null) && !guard) {
	      return slice.call(array, Math.max(array.length - n, 0));
	    } else {
	      return array[array.length - 1];
	    }
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, (n == null) || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, output) {
	    each(input, function(value) {
	      if (_.isArray(value)) {
	        shallow ? push.apply(output, value) : flatten(value, shallow, output);
	      } else {
	        output.push(value);
	      }
	    });
	    return output;
	  };

	  // Return a completely flattened version of an array.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, []);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iterator, context) {
	    if (_.isFunction(isSorted)) {
	      context = iterator;
	      iterator = isSorted;
	      isSorted = false;
	    }
	    var initial = iterator ? _.map(array, iterator, context) : array;
	    var results = [];
	    var seen = [];
	    each(initial, function(value, index) {
	      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
	        seen.push(value);
	        results.push(array[index]);
	      }
	    });
	    return results;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(concat.apply(ArrayProto, arguments));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var rest = slice.call(arguments, 1);
	    return _.filter(_.uniq(array), function(item) {
	      return _.every(rest, function(other) {
	        return _.indexOf(other, item) >= 0;
	      });
	    });
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
	    return _.filter(array, function(value){ return !_.contains(rest, value); });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    var args = slice.call(arguments);
	    var length = _.max(_.pluck(args, 'length'));
	    var results = new Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(args, "" + i);
	    }
	    return results;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
	  // we need this function. Return the position of the first occurrence of an
	  // item in an array, or -1 if the item is not included in the array.
	  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, l = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
	    for (; i < l; i++) if (array[i] === item) return i;
	    return -1;
	  };

	  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var hasIndex = from != null;
	    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
	      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
	    }
	    var i = (hasIndex ? from : array.length);
	    while (i--) if (array[i] === item) return i;
	    return -1;
	  };

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = arguments[2] || 1;

	    var len = Math.max(Math.ceil((stop - start) / step), 0);
	    var idx = 0;
	    var range = new Array(len);

	    while(idx < len) {
	      range[idx++] = start;
	      start += step;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    var args = slice.call(arguments, 2);
	    return function() {
	      return func.apply(context, args.concat(slice.call(arguments)));
	    };
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context.
	  _.partial = function(func) {
	    var args = slice.call(arguments, 1);
	    return function() {
	      return func.apply(this, args.concat(slice.call(arguments)));
	    };
	  };

	  // Bind all of an object's methods to that object. Useful for ensuring that
	  // all callbacks defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var funcs = slice.call(arguments, 1);
	    if (funcs.length === 0) funcs = _.functions(obj);
	    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memo = {};
	    hasher || (hasher = _.identity);
	    return function() {
	      var key = hasher.apply(this, arguments);
	      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
	    };
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){ return func.apply(null, args); }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time.
	  _.throttle = function(func, wait) {
	    var context, args, timeout, result;
	    var previous = 0;
	    var later = function() {
	      previous = new Date;
	      timeout = null;
	      result = func.apply(context, args);
	    };
	    return function() {
	      var now = new Date;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	      } else if (!timeout) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, result;
	    return function() {
	      var context = this, args = arguments;
	      var later = function() {
	        timeout = null;
	        if (!immediate) result = func.apply(context, args);
	      };
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if (callNow) result = func.apply(context, args);
	      return result;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = function(func) {
	    var ran = false, memo;
	    return function() {
	      if (ran) return memo;
	      ran = true;
	      memo = func.apply(this, arguments);
	      func = null;
	      return memo;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return function() {
	      var args = [func];
	      push.apply(args, arguments);
	      return wrapper.apply(this, args);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var funcs = arguments;
	    return function() {
	      var args = arguments;
	      for (var i = funcs.length - 1; i >= 0; i--) {
	        args = [funcs[i].apply(this, args)];
	      }
	      return args[0];
	    };
	  };

	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    if (times <= 0) return func();
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Object Functions
	  // ----------------

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = nativeKeys || function(obj) {
	    if (obj !== Object(obj)) throw new TypeError('Invalid object');
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var values = [];
	    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
	    return values;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var pairs = [];
	    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    each(slice.call(arguments, 1), function(source) {
	      if (source) {
	        for (var prop in source) {
	          obj[prop] = source[prop];
	        }
	      }
	    });
	    return obj;
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj) {
	    var copy = {};
	    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
	    each(keys, function(key) {
	      if (key in obj) copy[key] = obj[key];
	    });
	    return copy;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj) {
	    var copy = {};
	    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
	    for (var key in obj) {
	      if (!_.contains(keys, key)) copy[key] = obj[key];
	    }
	    return copy;
	  };

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    each(slice.call(arguments, 1), function(source) {
	      if (source) {
	        for (var prop in source) {
	          if (obj[prop] == null) obj[prop] = source[prop];
	        }
	      }
	    });
	    return obj;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, dates, and booleans are compared by value.
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return a == String(b);
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	        // other numeric values.
	        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a == +b;
	      // RegExps are compared by their source patterns and flags.
	      case '[object RegExp]':
	        return a.source == b.source &&
	               a.global == b.global &&
	               a.multiline == b.multiline &&
	               a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] == a) return bStack[length] == b;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0, result = true;
	    // Recursively compare objects and arrays.
	    if (className == '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size == b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Objects with different constructors are not equivalent, but `Object`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
	                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
	        return false;
	      }
	      // Deep compare objects.
	      for (var key in a) {
	        if (_.has(a, key)) {
	          // Count the expected number of properties.
	          size++;
	          // Deep compare each member.
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	      // Ensure that both objects contain the same number of properties.
	      if (result) {
	        for (key in b) {
	          if (_.has(b, key) && !(size--)) break;
	        }
	        result = !size;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) == '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    return obj === Object(obj);
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) == '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return !!(obj && _.has(obj, 'callee'));
	    };
	  }

	  // Optimize `isFunction` if appropriate.
	  if (typeof (/./) !== 'function') {
	    _.isFunction = function(obj) {
	      return typeof obj === 'function';
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj != +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iterators.
	  _.identity = function(value) {
	    return value;
	  };

	  // Run a function **n** times.
	  _.times = function(n, iterator, context) {
	    var accum = Array(n);
	    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // List of HTML entities for escaping.
	  var entityMap = {
	    escape: {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#x27;',
	      '/': '&#x2F;'
	    }
	  };
	  entityMap.unescape = _.invert(entityMap.escape);

	  // Regexes containing the keys and values listed immediately above.
	  var entityRegexes = {
	    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
	    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
	  };

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  _.each(['escape', 'unescape'], function(method) {
	    _[method] = function(string) {
	      if (string == null) return '';
	      return ('' + string).replace(entityRegexes[method], function(match) {
	        return entityMap[method][match];
	      });
	    };
	  });

	  // If the value of the named property is a function then invoke it;
	  // otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return null;
	    var value = object[property];
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    each(_.functions(obj), function(name){
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\t':     't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  _.template = function(text, data, settings) {
	    var render;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = new RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset)
	        .replace(escaper, function(match) { return '\\' + escapes[match]; });

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      }
	      if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      }
	      if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	      index = offset + match.length;
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + "return __p;\n";

	    try {
	      render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    if (data) return render(data, _);
	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled function source as a convenience for precompilation.
	    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function, which will delegate to the wrapper.
	  _.chain = function(obj) {
	    return _(obj).chain();
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  _.extend(_.prototype, {

	    // Start chaining a wrapped Underscore object.
	    chain: function() {
	      this._chain = true;
	      return this;
	    },

	    // Extracts the result from a wrapped and chained object.
	    value: function() {
	      return this._wrapped;
	    }

	  });

	}).call(this);

	/*global _: false, $: false, localStorage: false, process: true,
	  XMLHttpRequest: false, XDomainRequest: false, exports: false,
	  evil: true,
	  require: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  /**
	   * Contains all Parse API classes and functions.
	   * @name Parse
	   * @namespace
	   *
	   * Contains all Parse API classes and functions.
	   */
	  var Parse = root.Parse;

	  // Import Parse's local copy of underscore.
	  if (typeof(exports) !== "undefined" && exports._) {
	    // We're running in Node.js.  Pull in the dependencies.
	    Parse._ = exports._.noConflict();
	    if (typeof window === 'undefined') {
	      Parse.localStorage = eval('require')('localStorage');
	      Parse.XMLHttpRequest = eval('require')('xmlhttprequest').XMLHttpRequest;
	    } else {
	      Parse.localStorage = localStorage;
	      Parse.XMLHttpRequest = XMLHttpRequest;
	      _ = Parse._;
	    }
	    exports.Parse = Parse;
	  } else {
	    Parse._ = _.noConflict();
	    if (typeof(localStorage) !== "undefined") {
	      Parse.localStorage = localStorage;
	    }
	    if (typeof(XMLHttpRequest) !== "undefined") {
	      Parse.XMLHttpRequest = XMLHttpRequest;
	    }
	  }

	  // If jQuery or Zepto has been included, grab a reference to it.
	  if (typeof($) !== "undefined") {
	    Parse.$ = $;
	  }

	  // Helpers
	  // -------

	  // Shared empty constructor function to aid in prototype-chain creation.
	  var EmptyConstructor = function() {};

	  // TODO: fix this so that ParseObjects aren't all called "child" in debugger.
	  // Helper function to correctly set up the prototype chain, for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var inherits = function(parent, protoProps, staticProps) {
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent's constructor.
	    if (protoProps && protoProps.hasOwnProperty('constructor')) {
	      child = protoProps.constructor;
	    } else {
	      /** @ignore */
	      child = function(){ parent.apply(this, arguments); };
	    }

	    // Inherit class (static) properties from parent.
	    Parse._.extend(child, parent);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    EmptyConstructor.prototype = parent.prototype;
	    child.prototype = new EmptyConstructor();

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) {
	      Parse._.extend(child.prototype, protoProps);
	    }

	    // Add static properties to the constructor function, if supplied.
	    if (staticProps) {
	      Parse._.extend(child, staticProps);
	    }

	    // Correctly set child's `prototype.constructor`.
	    child.prototype.constructor = child;

	    // Set a convenience property in case the parent's prototype is
	    // needed later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set the server for Parse to talk to.
	  Parse.serverURL = "https://api.parse.com";

	  // Check whether we are running in Node.js.
	  if (typeof(process) !== "undefined" &&
	      process.versions &&
	      process.versions.node) {
	    Parse._isNode = true;
	  }

	  /**
	   * Call this method first to set up your authentication tokens for Parse.
	   * You can get your keys from the Data Browser on parse.com.
	   * @param {String} applicationId Your Parse Application ID.
	   * @param {String} javaScriptKey Your Parse JavaScript Key.
	   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
	   */
	  Parse.initialize = function(applicationId, javaScriptKey, masterKey) {
	    if (masterKey) {
	      throw "Parse.initialize() was passed a Master Key, which is only " +
	        "allowed from within Node.js.";
	    }
	    Parse._initialize(applicationId, javaScriptKey);
	  };

	  /**
	   * Call this method first to set up master authentication tokens for Parse.
	   * This method is for Parse's own private use.
	   * @param {String} applicationId Your Parse Application ID.
	   * @param {String} javaScriptKey Your Parse JavaScript Key.
	   * @param {String} masterKey Your Parse Master Key.
	   */
	  Parse._initialize = function(applicationId, javaScriptKey, masterKey) {
	    Parse.applicationId = applicationId;
	    Parse.javaScriptKey = javaScriptKey;
	    Parse.masterKey = masterKey;
	    Parse._useMasterKey = false;
	  };

	  // If we're running in node.js, allow using the master key.
	  if (Parse._isNode) {
	    Parse.initialize = Parse._initialize;

	    Parse.Cloud = Parse.Cloud || {};
	    /**
	     * Switches the Parse SDK to using the Master key.  The Master key grants
	     * priveleged access to the data in Parse and can be used to bypass ACLs and
	     * other restrictions that are applied to the client SDKs.
	     * <p><strong><em>Available in Cloud Code and Node.js only.</em></strong>
	     * </p>
	     */
	    Parse.Cloud.useMasterKey = function() {
	      Parse._useMasterKey = true;
	    };
	  }

	  /**
	   * Returns prefix for localStorage keys used by this instance of Parse.
	   * @param {String} path The relative suffix to append to it.
	   *     null or undefined is treated as the empty string.
	   * @return {String} The full key name.
	   */
	  Parse._getParsePath = function(path) {
	    if (!Parse.applicationId) {
	      throw "You need to call Parse.initialize before using Parse.";
	    }
	    if (!path) {
	      path = "";
	    }
	    if (!Parse._.isString(path)) {
	      throw "Tried to get a localStorage path that wasn't a String.";
	    }
	    if (path[0] === "/") {
	      path = path.substring(1);
	    }
	    return "Parse/" + Parse.applicationId + "/" + path;
	  };

	  /**
	   * Returns the unique string for this app on this machine.
	   * Gets reset when localStorage is cleared.
	   */
	  Parse._installationId = null;
	  Parse._getInstallationId = function() {
	    // See if it's cached in RAM.
	    if (Parse._installationId) {
	      return Parse._installationId;
	    }

	    // Try to get it from localStorage.
	    var path = Parse._getParsePath("installationId");
	    Parse._installationId = Parse.localStorage.getItem(path);

	    if (!Parse._installationId || Parse._installationId === "") {
	      // It wasn't in localStorage, so create a new one.
	      var hexOctet = function() {
	        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
	      };
	      Parse._installationId = (
	        hexOctet() + hexOctet() + "-" +
	        hexOctet() + "-" +
	        hexOctet() + "-" +
	        hexOctet() + "-" +
	        hexOctet() + hexOctet() + hexOctet());
	      Parse.localStorage.setItem(path, Parse._installationId);
	    }

	    return Parse._installationId;
	  };

	  Parse._parseDate = function(iso8601) {
	    var regexp = new RegExp(
	      "^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})" + "T" +
	      "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})" +
	      "(.([0-9]+))?" + "Z$");
	    var match = regexp.exec(iso8601);
	    if (!match) {
	      return null;
	    }

	    var year = match[1] || 0;
	    var month = (match[2] || 1) - 1;
	    var day = match[3] || 0;
	    var hour = match[4] || 0;
	    var minute = match[5] || 0;
	    var second = match[6] || 0;
	    var milli = match[8] || 0;

	    return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
	  };

	  Parse._ajaxIE8 = function(method, url, data) {
	    var promise = new Parse.Promise();
	    var xdr = new XDomainRequest();
	    xdr.onload = function() {
	      var response;
	      try {
	        response = JSON.parse(xdr.responseText);
	      } catch (e) {
	        promise.reject(e);
	      }
	      if (response) {
	        promise.resolve(response);
	      }
	    };
	    xdr.onerror = xdr.ontimeout = function() {
	      promise.reject(xdr);
	    };
	    xdr.onprogress = function() {};
	    xdr.open(method, url);
	    xdr.send(data);
	    return promise;
	  };

	  // TODO(klimt): Get rid of success/error usage in website.
	  Parse._ajax = function(method, url, data, success, error) {
	    var options = {
	      success: success,
	      error: error
	    };

	    if (typeof(XDomainRequest) !== "undefined") {
	      return Parse._ajaxIE8(method, url, data)._thenRunCallbacks(options);
	    }

	    var promise = new Parse.Promise();
	    var handled = false;

	    var xhr = new Parse.XMLHttpRequest();
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState === 4) {
	        if (handled) {
	          return;
	        }
	        handled = true;

	        if (xhr.status >= 200 && xhr.status < 300) {
	          var response;
	          try {
	            response = JSON.parse(xhr.responseText);
	          } catch (e) {
	            promise.reject(e);
	          }
	          if (response) {
	            promise.resolve(response, xhr.status, xhr);
	          }
	        } else {
	          promise.reject(xhr);
	        }
	      }
	    };
	    xhr.open(method, url, true);
	    xhr.setRequestHeader("Content-Type", "text/plain");  // avoid pre-flight.
	    if (Parse._isNode) {
	      // Add a special user agent just for request from node.js.
	      xhr.setRequestHeader("User-Agent",
	                           "Parse/" + Parse.VERSION +
	                           " (NodeJS " + process.versions.node + ")");
	    }
	    xhr.send(data);
	    return promise._thenRunCallbacks(options);
	  };

	  // A self-propagating extend function.
	  Parse._extend = function(protoProps, classProps) {
	    var child = inherits(this, protoProps, classProps);
	    child.extend = this.extend;
	    return child;
	  };

	  /**
	   * route is classes, users, login, etc.
	   * objectId is null if there is no associated objectId.
	   * method is the http method for the REST API.
	   * dataObject is the payload as an object, or null if there is none.
	   * @ignore
	   */
	  Parse._request = function(route, className, objectId, method, dataObject) {
	    if (!Parse.applicationId) {
	      throw "You must specify your applicationId using Parse.initialize";
	    }

	    if (!Parse.javaScriptKey && !Parse.masterKey) {
	      throw "You must specify a key using Parse.initialize";
	    }

	    // TODO: We can remove this check later, but it's useful for development.
	    if (route !== "batch" &&
	        route !== "classes" &&
	        route !== "files" &&
	        route !== "functions" &&
	        route !== "login" &&
	        route !== "push" &&
	        route !== "requestPasswordReset" &&
	        route !== "users") {
	      throw "Bad route: '" + route + "'.";
	    }

	    var url = Parse.serverURL;
	    if (url.charAt(url.length - 1) !== "/") {
	      url += "/";
	    }
	    url += "1/" + route;
	    if (className) {
	      url += "/" + className;
	    }
	    if (objectId) {
	      url += "/" + objectId;
	    }

	    dataObject = Parse._.clone(dataObject || {});
	    if (method !== "POST") {
	      dataObject._method = method;
	      method = "POST";
	    }

	    dataObject._ApplicationId = Parse.applicationId;
	    if (!Parse._useMasterKey) {
	      dataObject._JavaScriptKey = Parse.javaScriptKey;
	    } else {
	      dataObject._MasterKey = Parse.masterKey;
	    }

	    dataObject._ClientVersion = Parse.VERSION;
	    dataObject._InstallationId = Parse._getInstallationId();
	    // Pass the session token on every request.
	    var currentUser = Parse.User.current();
	    if (currentUser && currentUser._sessionToken) {
	      dataObject._SessionToken = currentUser._sessionToken;
	    }
	    var data = JSON.stringify(dataObject);

	    return Parse._ajax(method, url, data).then(null, function(response) {
	      // Transform the error into an instance of Parse.Error by trying to parse
	      // the error string as JSON.
	      var error;
	      if (response && response.responseText) {
	        try {
	          var errorJSON = JSON.parse(response.responseText);
	          if (errorJSON) {
	            error = new Parse.Error(errorJSON.code, errorJSON.error);
	          }
	        } catch (e) {
	          // If we fail to parse the error text, that's okay.
	        }
	      }
	      error = error || new Parse.Error(-1, response.responseText);
	      // By explicitly returning a rejected Promise, this will work with
	      // either jQuery or Promises/A semantics.
	      return Parse.Promise.error(error);
	    });
	  };

	  // Helper function to get a value from a Backbone object as a property
	  // or as a function.
	  Parse._getValue = function(object, prop) {
	    if (!(object && object[prop])) {
	      return null;
	    }
	    return Parse._.isFunction(object[prop]) ? object[prop]() : object[prop];
	  };

	  /**
	   * Converts a value in a Parse Object into the appropriate representation.
	   * This is the JS equivalent of Java's Parse.maybeReferenceAndEncode(Object)
	   * if seenObjects is falsey. Otherwise any Parse.Objects not in
	   * seenObjects will be fully embedded rather than encoded
	   * as a pointer.  This array will be used to prevent going into an infinite
	   * loop because we have circular references.  If seenObjects
	   * is set, then none of the Parse Objects that are serialized can be dirty.
	   */
	  Parse._encode = function(value, seenObjects, disallowObjects) {
	    var _ = Parse._;
	    if (value instanceof Parse.Object) {
	      if (disallowObjects) {
	        throw "Parse.Objects not allowed here";
	      }
	      if (!seenObjects || _.include(seenObjects, value) || !value._hasData) {
	        return value._toPointer();
	      }
	      if (!value.dirty()) {
	        seenObjects = seenObjects.concat(value);
	        return Parse._encode(value._toFullJSON(seenObjects),
	                             seenObjects,
	                             disallowObjects);
	      }
	      throw "Tried to save an object with a pointer to a new, unsaved object.";
	    }
	    if (value instanceof Parse.ACL) {
	      return value.toJSON();
	    }
	    if (_.isDate(value)) {
	      return { "__type": "Date", "iso": value.toJSON() };
	    }
	    if (value instanceof Parse.GeoPoint) {
	      return value.toJSON();
	    }
	    if (_.isArray(value)) {
	      return _.map(value, function(x) {
	        return Parse._encode(x, seenObjects, disallowObjects);
	      });
	    }
	    if (_.isRegExp(value)) {
	      return value.source;
	    }
	    if (value instanceof Parse.Relation) {
	      return value.toJSON();
	    }
	    if (value instanceof Parse.Op) {
	      return value.toJSON();
	    }
	    if (value instanceof Parse.File) {
	      if (!value.url()) {
	        throw "Tried to save an object containing an unsaved file.";
	      }
	      return {
	        __type: "File",
	        name: value.name(),
	        url: value.url()
	      };
	    }
	    if (_.isObject(value)) {
	      var output = {};
	      Parse._objectEach(value, function(v, k) {
	        output[k] = Parse._encode(v, seenObjects, disallowObjects);
	      });
	      return output;
	    }
	    return value;
	  };

	  /**
	   * The inverse function of Parse._encode.
	   * TODO: make decode not mutate value.
	   */
	  Parse._decode = function(key, value) {
	    var _ = Parse._;
	    if (!_.isObject(value)) {
	      return value;
	    }
	    if (_.isArray(value)) {
	      Parse._arrayEach(value, function(v, k) {
	        value[k] = Parse._decode(k, v);
	      });
	      return value;
	    }
	    if (value instanceof Parse.Object) {
	      return value;
	    }
	    if (value instanceof Parse.File) {
	      return value;
	    }
	    if (value instanceof Parse.Op) {
	      return value;
	    }
	    if (value.__op) {
	      return Parse.Op._decode(value);
	    }
	    if (value.__type === "Pointer") {
	      var pointer = Parse.Object._create(value.className);
	      pointer._finishFetch({ objectId: value.objectId }, false);
	      return pointer;
	    }
	    if (value.__type === "Object") {
	      // It's an Object included in a query result.
	      var className = value.className;
	      delete value.__type;
	      delete value.className;
	      var object = Parse.Object._create(className);
	      object._finishFetch(value, true);
	      return object;
	    }
	    if (value.__type === "Date") {
	      return Parse._parseDate(value.iso);
	    }
	    if (value.__type === "GeoPoint") {
	      return new Parse.GeoPoint({
	        latitude: value.latitude,
	        longitude: value.longitude
	      });
	    }
	    if (key === "ACL") {
	      if (value instanceof Parse.ACL) {
	        return value;
	      }
	      return new Parse.ACL(value);
	    }
	    if (value.__type === "Relation") {
	      var relation = new Parse.Relation(null, key);
	      relation.targetClassName = value.className;
	      return relation;
	    }
	    if (value.__type === "File") {
	      var file = new Parse.File(value.name);
	      file._url = value.url;
	      return file;
	    }
	    Parse._objectEach(value, function(v, k) {
	      value[k] = Parse._decode(k, v);
	    });
	    return value;
	  };

	  Parse._arrayEach = Parse._.each;

	  /**
	   * Does a deep traversal of every item in object, calling func on every one.
	   * @param {Object} object The object or array to traverse deeply.
	   * @param {Function} func The function to call for every item. It will
	   *     be passed the item as an argument. If it returns a truthy value, that
	   *     value will replace the item in its parent container.
	   * @returns {} the result of calling func on the top-level object itself.
	   */
	  Parse._traverse = function(object, func, seen) {
	    if (object instanceof Parse.Object) {
	      seen = seen || [];
	      if (Parse._.indexOf(seen, object) >= 0) {
	        // We've already visited this object in this call.
	        return;
	      }
	      seen.push(object);
	      Parse._traverse(object.attributes, func, seen);
	      return func(object);
	    }
	    if (object instanceof Parse.Relation || object instanceof Parse.File) {
	      // Nothing needs to be done, but we don't want to recurse into the
	      // object's parent infinitely, so we catch this case.
	      return func(object);
	    }
	    if (Parse._.isArray(object)) {
	      Parse._.each(object, function(child, index) {
	        var newChild = Parse._traverse(child, func, seen);
	        if (newChild) {
	          object[index] = newChild;
	        }
	      });
	      return func(object);
	    }
	    if (Parse._.isObject(object)) {
	      Parse._each(object, function(child, key) {
	        var newChild = Parse._traverse(child, func, seen);
	        if (newChild) {
	          object[key] = newChild;
	        }
	      });
	      return func(object);
	    }
	    return func(object);
	  };

	  /**
	   * This is like _.each, except:
	   * * it doesn't work for so-called array-like objects,
	   * * it does work for dictionaries with a "length" attribute.
	   */
	  Parse._objectEach = Parse._each = function(obj, callback) {
	    var _ = Parse._;
	    if (_.isObject(obj)) {
	      _.each(_.keys(obj), function(key) {
	        callback(obj[key], key);
	      });
	    } else {
	      _.each(obj, callback);
	    }
	  };

	  // Helper function to check null or undefined.
	  Parse._isNullOrUndefined = function(x) {
	    return Parse._.isNull(x) || Parse._.isUndefined(x);
	  };
	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Constructs a new Parse.Error object with the given code and message.
	   * @param {Number} code An error code constant from <code>Parse.Error</code>.
	   * @param {String} message A detailed description of the error.
	   * @class
	   *
	   * <p>Class used for all objects passed to error callbacks.</p>
	   */
	  Parse.Error = function(code, message) {
	    this.code = code;
	    this.message = message;
	  };

	  _.extend(Parse.Error, /** @lends Parse.Error */ {
	    /**
	     * Error code indicating some error other than those enumerated here.
	     * @constant
	     */
	    OTHER_CAUSE: -1,

	    /**
	     * Error code indicating that something has gone wrong with the server.
	     * If you get this error code, it is Parse's fault. Contact us at
	     * https://parse.com/help
	     * @constant
	     */
	    INTERNAL_SERVER_ERROR: 1,

	    /**
	     * Error code indicating the connection to the Parse servers failed.
	     * @constant
	     */
	    CONNECTION_FAILED: 100,

	    /**
	     * Error code indicating the specified object doesn't exist.
	     * @constant
	     */
	    OBJECT_NOT_FOUND: 101,

	    /**
	     * Error code indicating you tried to query with a datatype that doesn't
	     * support it, like exact matching an array or object.
	     * @constant
	     */
	    INVALID_QUERY: 102,

	    /**
	     * Error code indicating a missing or invalid classname. Classnames are
	     * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
	     * only valid characters.
	     * @constant
	     */
	    INVALID_CLASS_NAME: 103,

	    /**
	     * Error code indicating an unspecified object id.
	     * @constant
	     */
	    MISSING_OBJECT_ID: 104,

	    /**
	     * Error code indicating an invalid key name. Keys are case-sensitive. They
	     * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
	     * @constant
	     */
	    INVALID_KEY_NAME: 105,

	    /**
	     * Error code indicating a malformed pointer. You should not see this unless
	     * you have been mucking about changing internal Parse code.
	     * @constant
	     */
	    INVALID_POINTER: 106,

	    /**
	     * Error code indicating that badly formed JSON was received upstream. This
	     * either indicates you have done something unusual with modifying how
	     * things encode to JSON, or the network is failing badly.
	     * @constant
	     */
	    INVALID_JSON: 107,

	    /**
	     * Error code indicating that the feature you tried to access is only
	     * available internally for testing purposes.
	     * @constant
	     */
	    COMMAND_UNAVAILABLE: 108,

	    /**
	     * You must call Parse.initialize before using the Parse library.
	     * @constant
	     */
	    NOT_INITIALIZED: 109,

	    /**
	     * Error code indicating that a field was set to an inconsistent type.
	     * @constant
	     */
	    INCORRECT_TYPE: 111,

	    /**
	     * Error code indicating an invalid channel name. A channel name is either
	     * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
	     * characters and starts with a letter.
	     * @constant
	     */
	    INVALID_CHANNEL_NAME: 112,

	    /**
	     * Error code indicating that push is misconfigured.
	     * @constant
	     */
	    PUSH_MISCONFIGURED: 115,

	    /**
	     * Error code indicating that the object is too large.
	     * @constant
	     */
	    OBJECT_TOO_LARGE: 116,

	    /**
	     * Error code indicating that the operation isn't allowed for clients.
	     * @constant
	     */
	    OPERATION_FORBIDDEN: 119,

	    /**
	     * Error code indicating the result was not found in the cache.
	     * @constant
	     */
	    CACHE_MISS: 120,

	    /**
	     * Error code indicating that an invalid key was used in a nested
	     * JSONObject.
	     * @constant
	     */
	    INVALID_NESTED_KEY: 121,

	    /**
	     * Error code indicating that an invalid filename was used for ParseFile.
	     * A valid file name contains only a-zA-Z0-9_. characters and is between 1
	     * and 128 characters.
	     * @constant
	     */
	    INVALID_FILE_NAME: 122,

	    /**
	     * Error code indicating an invalid ACL was provided.
	     * @constant
	     */
	    INVALID_ACL: 123,

	    /**
	     * Error code indicating that the request timed out on the server. Typically
	     * this indicates that the request is too expensive to run.
	     * @constant
	     */
	    TIMEOUT: 124,

	    /**
	     * Error code indicating that the email address was invalid.
	     * @constant
	     */
	    INVALID_EMAIL_ADDRESS: 125,

	    /**
	     * Error code indicating a missing content type.
	     * @constant
	     */
	    MISSING_CONTENT_TYPE: 126,

	    /**
	     * Error code indicating a missing content length.
	     * @constant
	     */
	    MISSING_CONTENT_LENGTH: 127,

	    /**
	     * Error code indicating an invalid content length.
	     * @constant
	     */
	    INVALID_CONTENT_LENGTH: 128,

	    /**
	     * Error code indicating a file that was too large.
	     * @constant
	     */
	    FILE_TOO_LARGE: 129,

	    /**
	     * Error code indicating an error saving a file.
	     * @constant
	     */
	    FILE_SAVE_ERROR: 130,

	    /**
	     * Error code indicating an error deleting a file.
	     * @constant
	     */
	    FILE_DELETE_ERROR: 153,

	    /**
	     * Error code indicating that a unique field was given a value that is
	     * already taken.
	     * @constant
	     */
	    DUPLICATE_VALUE: 137,

	    /**
	     * Error code indicating that a role's name is invalid.
	     * @constant
	     */
	    INVALID_ROLE_NAME: 139,

	    /**
	     * Error code indicating that an application quota was exceeded.  Upgrade to
	     * resolve.
	     * @constant
	     */
	    EXCEEDED_QUOTA: 140,

	    /**
	     * Error code indicating that a Cloud Code script failed.
	     * @constant
	     */
	    SCRIPT_FAILED: 141,

	    /**
	     * Error code indicating that a Cloud Code validation failed.
	     * @constant
	     */
	    VALIDATION_ERROR: 142,

	    /**
	     * Error code indicating that invalid image data was provided.
	     * @constant
	     */
	    INVALID_IMAGE_DATA: 150,

	    /**
	     * Error code indicating an unsaved file.
	     * @constant
	     */
	    UNSAVED_FILE_ERROR: 151,

	    /**
	     * Error code indicating an invalid push time.
	     */
	    INVALID_PUSH_TIME_ERROR: 152,

	    /**
	     * Error code indicating that the username is missing or empty.
	     * @constant
	     */
	    USERNAME_MISSING: 200,

	    /**
	     * Error code indicating that the password is missing or empty.
	     * @constant
	     */
	    PASSWORD_MISSING: 201,

	    /**
	     * Error code indicating that the username has already been taken.
	     * @constant
	     */
	    USERNAME_TAKEN: 202,

	    /**
	     * Error code indicating that the email has already been taken.
	     * @constant
	     */
	    EMAIL_TAKEN: 203,

	    /**
	     * Error code indicating that the email is missing, but must be specified.
	     * @constant
	     */
	    EMAIL_MISSING: 204,

	    /**
	     * Error code indicating that a user with the specified email was not found.
	     * @constant
	     */
	    EMAIL_NOT_FOUND: 205,

	    /**
	     * Error code indicating that a user object without a valid session could
	     * not be altered.
	     * @constant
	     */
	    SESSION_MISSING: 206,

	    /**
	     * Error code indicating that a user can only be created through signup.
	     * @constant
	     */
	    MUST_CREATE_USER_THROUGH_SIGNUP: 207,

	    /**
	     * Error code indicating that an an account being linked is already linked
	     * to another user.
	     * @constant
	     */
	    ACCOUNT_ALREADY_LINKED: 208,

	    /**
	     * Error code indicating that a user cannot be linked to an account because
	     * that account's id could not be found.
	     * @constant
	     */
	    LINKED_ID_MISSING: 250,

	    /**
	     * Error code indicating that a user with a linked (e.g. Facebook) account
	     * has an invalid session.
	     * @constant
	     */
	    INVALID_LINKED_SESSION: 251,

	    /**
	     * Error code indicating that a service being linked (e.g. Facebook or
	     * Twitter) is unsupported.
	     * @constant
	     */
	    UNSUPPORTED_SERVICE: 252
	  });

	}(this));

	/*global _: false */
	(function() {
	  var root = this;
	  var Parse = (root.Parse || (root.Parse = {}));
	  var eventSplitter = /\s+/;
	  var slice = Array.prototype.slice;

	  /**
	   * @class
	   *
	   * <p>Parse.Events is a fork of Backbone's Events module, provided for your
	   * convenience.</p>
	   *
	   * <p>A module that can be mixed in to any object in order to provide
	   * it with custom events. You may bind callback functions to an event
	   * with `on`, or remove these functions with `off`.
	   * Triggering an event fires all callbacks in the order that `on` was
	   * called.
	   *
	   * <pre>
	   *     var object = {};
	   *     _.extend(object, Parse.Events);
	   *     object.on('expand', function(){ alert('expanded'); });
	   *     object.trigger('expand');</pre></p>
	   *
	   * <p>For more information, see the
	   * <a href="http://documentcloud.github.com/backbone/#Events">Backbone
	   * documentation</a>.</p>
	   */
	  Parse.Events = {
	    /**
	     * Bind one or more space separated events, `events`, to a `callback`
	     * function. Passing `"all"` will bind the callback to all events fired.
	     */
	    on: function(events, callback, context) {

	      var calls, event, node, tail, list;
	      if (!callback) {
	        return this;
	      }
	      events = events.split(eventSplitter);
	      calls = this._callbacks || (this._callbacks = {});

	      // Create an immutable callback list, allowing traversal during
	      // modification.  The tail is an empty object that will always be used
	      // as the next node.
	      event = events.shift();
	      while (event) {
	        list = calls[event];
	        node = list ? list.tail : {};
	        node.next = tail = {};
	        node.context = context;
	        node.callback = callback;
	        calls[event] = {tail: tail, next: list ? list.next : node};
	        event = events.shift();
	      }

	      return this;
	    },

	    /**
	     * Remove one or many callbacks. If `context` is null, removes all callbacks
	     * with that function. If `callback` is null, removes all callbacks for the
	     * event. If `events` is null, removes all bound callbacks for all events.
	     */
	    off: function(events, callback, context) {
	      var event, calls, node, tail, cb, ctx;

	      // No events, or removing *all* events.
	      if (!(calls = this._callbacks)) {
	        return;
	      }
	      if (!(events || callback || context)) {
	        delete this._callbacks;
	        return this;
	      }

	      // Loop through the listed events and contexts, splicing them out of the
	      // linked list of callbacks if appropriate.
	      events = events ? events.split(eventSplitter) : _.keys(calls);
	      event = events.shift();
	      while (event) {
	        node = calls[event];
	        delete calls[event];
	        if (!node || !(callback || context)) {
	          continue;
	        }
	        // Create a new list, omitting the indicated callbacks.
	        tail = node.tail;
	        node = node.next;
	        while (node !== tail) {
	          cb = node.callback;
	          ctx = node.context;
	          if ((callback && cb !== callback) || (context && ctx !== context)) {
	            this.on(event, cb, ctx);
	          }
	          node = node.next;
	        }
	        event = events.shift();
	      }

	      return this;
	    },

	    /**
	     * Trigger one or many events, firing all bound callbacks. Callbacks are
	     * passed the same arguments as `trigger` is, apart from the event name
	     * (unless you're listening on `"all"`, which will cause your callback to
	     * receive the true name of the event as the first argument).
	     */
	    trigger: function(events) {
	      var event, node, calls, tail, args, all, rest;
	      if (!(calls = this._callbacks)) {
	        return this;
	      }
	      all = calls.all;
	      events = events.split(eventSplitter);
	      rest = slice.call(arguments, 1);

	      // For each event, walk through the linked list of callbacks twice,
	      // first to trigger the event, then to trigger any `"all"` callbacks.
	      event = events.shift();
	      while (event) {
	        node = calls[event];
	        if (node) {
	          tail = node.tail;
	          while ((node = node.next) !== tail) {
	            node.callback.apply(node.context || this, rest);
	          }
	        }
	        node = all;
	        if (node) {
	          tail = node.tail;
	          args = [event].concat(rest);
	          while ((node = node.next) !== tail) {
	            node.callback.apply(node.context || this, args);
	          }
	        }
	        event = events.shift();
	      }

	      return this;
	    }
	  };

	  /**
	   * @function
	   */
	  Parse.Events.bind = Parse.Events.on;

	  /**
	   * @function
	   */
	  Parse.Events.unbind = Parse.Events.off;
	}.call(this));


	/*global navigator: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creates a new GeoPoint with any of the following forms:<br>
	   *   <pre>
	   *   new GeoPoint(otherGeoPoint)
	   *   new GeoPoint(30, 30)
	   *   new GeoPoint([30, 30])
	   *   new GeoPoint({latitude: 30, longitude: 30})
	   *   new GeoPoint()  // defaults to (0, 0)
	   *   </pre>
	   * @class
	   *
	   * <p>Represents a latitude / longitude point that may be associated
	   * with a key in a ParseObject or used as a reference point for geo queries.
	   * This allows proximity-based queries on the key.</p>
	   *
	   * <p>Only one key in a class may contain a GeoPoint.</p>
	   *
	   * <p>Example:<pre>
	   *   var point = new Parse.GeoPoint(30.0, -20.0);
	   *   var object = new Parse.Object("PlaceObject");
	   *   object.set("location", point);
	   *   object.save();</pre></p>
	   */
	  Parse.GeoPoint = function(arg1, arg2) {
	    if (_.isArray(arg1)) {
	      Parse.GeoPoint._validate(arg1[0], arg1[1]);
	      this.latitude = arg1[0];
	      this.longitude = arg1[1];
	    } else if (_.isObject(arg1)) {
	      Parse.GeoPoint._validate(arg1.latitude, arg1.longitude);
	      this.latitude = arg1.latitude;
	      this.longitude = arg1.longitude;
	    } else if (_.isNumber(arg1) && _.isNumber(arg2)) {
	      Parse.GeoPoint._validate(arg1, arg2);
	      this.latitude = arg1;
	      this.longitude = arg2;
	    } else {
	      this.latitude = 0;
	      this.longitude = 0;
	    }

	    // Add properties so that anyone using Webkit or Mozilla will get an error
	    // if they try to set values that are out of bounds.
	    var self = this;
	    if (this.__defineGetter__ && this.__defineSetter__) {
	      // Use _latitude and _longitude to actually store the values, and add
	      // getters and setters for latitude and longitude.
	      this._latitude = this.latitude;
	      this._longitude = this.longitude;
	      this.__defineGetter__("latitude", function() {
	        return self._latitude;
	      });
	      this.__defineGetter__("longitude", function() {
	        return self._longitude;
	      });
	      this.__defineSetter__("latitude", function(val) {
	        Parse.GeoPoint._validate(val, self.longitude);
	        self._latitude = val;
	      });
	      this.__defineSetter__("longitude", function(val) {
	        Parse.GeoPoint._validate(self.latitude, val);
	        self._longitude = val;
	      });
	    }
	  };

	  /**
	   * @lends Parse.GeoPoint.prototype
	   * @property {float} latitude North-south portion of the coordinate, in range
	   *   [-90, 90].  Throws an exception if set out of range in a modern browser.
	   * @property {float} longitude East-west portion of the coordinate, in range
	   *   [-180, 180].  Throws if set out of range in a modern browser.
	   */

	  /**
	   * Throws an exception if the given lat-long is out of bounds.
	   */
	  Parse.GeoPoint._validate = function(latitude, longitude) {
	    if (latitude < -90.0) {
	      throw "Parse.GeoPoint latitude " + latitude + " < -90.0.";
	    }
	    if (latitude > 90.0) {
	      throw "Parse.GeoPoint latitude " + latitude + " > 90.0.";
	    }
	    if (longitude < -180.0) {
	      throw "Parse.GeoPoint longitude " + longitude + " < -180.0.";
	    }
	    if (longitude > 180.0) {
	      throw "Parse.GeoPoint longitude " + longitude + " > 180.0.";
	    }
	  };

	  /**
	   * Creates a GeoPoint with the user's current location, if available.
	   * Calls options.success with a new GeoPoint instance or calls options.error.
	   * @param {Object} options An object with success and error callbacks.
	   */
	  Parse.GeoPoint.current = function(options) {
	    var promise = new Parse.Promise();
	    navigator.geolocation.getCurrentPosition(function(location) {
	      promise.resolve(new Parse.GeoPoint({
	        latitude: location.coords.latitude,
	        longitude: location.coords.longitude
	      }));

	    }, function(error) {
	      promise.reject(error);
	    });

	    return promise._thenRunCallbacks(options);
	  };

	  Parse.GeoPoint.prototype = {
	    /**
	     * Returns a JSON representation of the GeoPoint, suitable for Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      Parse.GeoPoint._validate(this.latitude, this.longitude);
	      return {
	        "__type": "GeoPoint",
	        latitude: this.latitude,
	        longitude: this.longitude
	      };
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in radians.
	     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	     * @return {Number}
	     */
	    radiansTo: function(point) {
	      var d2r = Math.PI / 180.0;
	      var lat1rad = this.latitude * d2r;
	      var long1rad = this.longitude * d2r;
	      var lat2rad = point.latitude * d2r;
	      var long2rad = point.longitude * d2r;
	      var deltaLat = lat1rad - lat2rad;
	      var deltaLong = long1rad - long2rad;
	      var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
	      var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
	      // Square of half the straight line chord distance between both points.
	      var a = ((sinDeltaLatDiv2 * sinDeltaLatDiv2) +
	               (Math.cos(lat1rad) * Math.cos(lat2rad) *
	                sinDeltaLongDiv2 * sinDeltaLongDiv2));
	      a = Math.min(1.0, a);
	      return 2 * Math.asin(Math.sqrt(a));
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in kilometers.
	     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	     * @return {Number}
	     */
	    kilometersTo: function(point) {
	      return this.radiansTo(point) * 6371.0;
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in miles.
	     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
	     * @return {Number}
	     */
	    milesTo: function(point) {
	      return this.radiansTo(point) * 3958.8;
	    }
	  };
	}(this));

	/*global navigator: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  var PUBLIC_KEY = "*";

	  /**
	   * Creates a new ACL.
	   * If no argument is given, the ACL has no permissions for anyone.
	   * If the argument is a Parse.User, the ACL will have read and write
	   *   permission for only that user.
	   * If the argument is any other JSON object, that object will be interpretted
	   *   as a serialized ACL created with toJSON().
	   * @see Parse.Object#setACL
	   * @class
	   *
	   * <p>An ACL, or Access Control List can be added to any
	   * <code>Parse.Object</code> to restrict access to only a subset of users
	   * of your application.</p>
	   */
	  Parse.ACL = function(arg1) {
	    var self = this;
	    self.permissionsById = {};
	    if (_.isObject(arg1)) {
	      if (arg1 instanceof Parse.User) {
	        self.setReadAccess(arg1, true);
	        self.setWriteAccess(arg1, true);
	      } else {
	        if (_.isFunction(arg1)) {
	          throw "Parse.ACL() called with a function.  Did you forget ()?";
	        }
	        Parse._objectEach(arg1, function(accessList, userId) {
	          if (!_.isString(userId)) {
	            throw "Tried to create an ACL with an invalid userId.";
	          }
	          self.permissionsById[userId] = {};
	          Parse._objectEach(accessList, function(allowed, permission) {
	            if (permission !== "read" && permission !== "write") {
	              throw "Tried to create an ACL with an invalid permission type.";
	            }
	            if (!_.isBoolean(allowed)) {
	              throw "Tried to create an ACL with an invalid permission value.";
	            }
	            self.permissionsById[userId][permission] = allowed;
	          });
	        });
	      }
	    }
	  };

	  /**
	   * Returns a JSON-encoded version of the ACL.
	   * @return {Object}
	   */
	  Parse.ACL.prototype.toJSON = function() {
	    return _.clone(this.permissionsById);
	  };

	  Parse.ACL.prototype._setAccess = function(accessType, userId, allowed) {
	    if (userId instanceof Parse.User) {
	      userId = userId.id;
	    } else if (userId instanceof Parse.Role) {
	      userId = "role:" + userId.getName();
	    }
	    if (!_.isString(userId)) {
	      throw "userId must be a string.";
	    }
	    if (!_.isBoolean(allowed)) {
	      throw "allowed must be either true or false.";
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      if (!allowed) {
	        // The user already doesn't have this permission, so no action needed.
	        return;
	      } else {
	        permissions = {};
	        this.permissionsById[userId] = permissions;
	      }
	    }

	    if (allowed) {
	      this.permissionsById[userId][accessType] = true;
	    } else {
	      delete permissions[accessType];
	      if (_.isEmpty(permissions)) {
	        delete permissions[userId];
	      }
	    }
	  };

	  Parse.ACL.prototype._getAccess = function(accessType, userId) {
	    if (userId instanceof Parse.User) {
	      userId = userId.id;
	    } else if (userId instanceof Parse.Role) {
	      userId = "role:" + userId.getName();
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      return false;
	    }
	    return permissions[accessType] ? true : false;
	  };

	  /**
	   * Set whether the given user is allowed to read this object.
	   * @param userId An instance of Parse.User or its objectId.
	   * @param {Boolean} allowed Whether that user should have read access.
	   */
	  Parse.ACL.prototype.setReadAccess = function(userId, allowed) {
	    this._setAccess("read", userId, allowed);
	  };

	  /**
	   * Get whether the given user id is *explicitly* allowed to read this object.
	   * Even if this returns false, the user may still be able to access it if
	   * getPublicReadAccess returns true or a role that the user belongs to has
	   * write access.
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
	   * @return {Boolean}
	   */
	  Parse.ACL.prototype.getReadAccess = function(userId) {
	    return this._getAccess("read", userId);
	  };

	  /**
	   * Set whether the given user id is allowed to write this object.
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
	   * @param {Boolean} allowed Whether that user should have write access.
	   */
	  Parse.ACL.prototype.setWriteAccess = function(userId, allowed) {
	    this._setAccess("write", userId, allowed);
	  };

	  /**
	   * Get whether the given user id is *explicitly* allowed to write this object.
	   * Even if this returns false, the user may still be able to write it if
	   * getPublicWriteAccess returns true or a role that the user belongs to has
	   * write access.
	   * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
	   * @return {Boolean}
	   */
	  Parse.ACL.prototype.getWriteAccess = function(userId) {
	    return this._getAccess("write", userId);
	  };

	  /**
	   * Set whether the public is allowed to read this object.
	   * @param {Boolean} allowed
	   */
	  Parse.ACL.prototype.setPublicReadAccess = function(allowed) {
	    this.setReadAccess(PUBLIC_KEY, allowed);
	  };

	  /**
	   * Get whether the public is allowed to read this object.
	   * @return {Boolean}
	   */
	  Parse.ACL.prototype.getPublicReadAccess = function() {
	    return this.getReadAccess(PUBLIC_KEY);
	  };

	  /**
	   * Set whether the public is allowed to write this object.
	   * @param {Boolean} allowed
	   */
	  Parse.ACL.prototype.setPublicWriteAccess = function(allowed) {
	    this.setWriteAccess(PUBLIC_KEY, allowed);
	  };

	  /**
	   * Get whether the public is allowed to write this object.
	   * @return {Boolean}
	   */
	  Parse.ACL.prototype.getPublicWriteAccess = function() {
	    return this.getWriteAccess(PUBLIC_KEY);
	  };

	  /**
	   * Get whether users belonging to the given role are allowed
	   * to read this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has read access.
	   *
	   * @param role The name of the role, or a Parse.Role object.
	   * @return {Boolean} true if the role has read access. false otherwise.
	   * @throws {String} If role is neither a Parse.Role nor a String.
	   */
	  Parse.ACL.prototype.getRoleReadAccess = function(role) {
	    if (role instanceof Parse.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      return this.getReadAccess("role:" + role);
	    }
	    throw "role must be a Parse.Role or a String";
	  };

	  /**
	   * Get whether users belonging to the given role are allowed
	   * to write this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has write access.
	   *
	   * @param role The name of the role, or a Parse.Role object.
	   * @return {Boolean} true if the role has write access. false otherwise.
	   * @throws {String} If role is neither a Parse.Role nor a String.
	   */
	  Parse.ACL.prototype.getRoleWriteAccess = function(role) {
	    if (role instanceof Parse.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      return this.getWriteAccess("role:" + role);
	    }
	    throw "role must be a Parse.Role or a String";
	  };

	  /**
	   * Set whether users belonging to the given role are allowed
	   * to read this object.
	   *
	   * @param role The name of the role, or a Parse.Role object.
	   * @param {Boolean} allowed Whether the given role can read this object.
	   * @throws {String} If role is neither a Parse.Role nor a String.
	   */
	  Parse.ACL.prototype.setRoleReadAccess = function(role, allowed) {
	    if (role instanceof Parse.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      this.setReadAccess("role:" + role, allowed);
	      return;
	    }
	    throw "role must be a Parse.Role or a String";
	  };

	  /**
	   * Set whether users belonging to the given role are allowed
	   * to write this object.
	   *
	   * @param role The name of the role, or a Parse.Role object.
	   * @param {Boolean} allowed Whether the given role can write this object.
	   * @throws {String} If role is neither a Parse.Role nor a String.
	   */
	  Parse.ACL.prototype.setRoleWriteAccess = function(role, allowed) {
	    if (role instanceof Parse.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      this.setWriteAccess("role:" + role, allowed);
	      return;
	    }
	    throw "role must be a Parse.Role or a String";
	  };

	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * @class
	   * A Parse.Op is an atomic operation that can be applied to a field in a
	   * Parse.Object. For example, calling <code>object.set("foo", "bar")</code>
	   * is an example of a Parse.Op.Set. Calling <code>object.unset("foo")</code>
	   * is a Parse.Op.Unset. These operations are stored in a Parse.Object and
	   * sent to the server as part of <code>object.save()</code> operations.
	   * Instances of Parse.Op should be immutable.
	   *
	   * You should not create subclasses of Parse.Op or instantiate Parse.Op
	   * directly.
	   */
	  Parse.Op = function() {
	    this._initialize.apply(this, arguments);
	  };

	  Parse.Op.prototype = {
	    _initialize: function() {}
	  };

	  _.extend(Parse.Op, {
	    /**
	     * To create a new Op, call Parse.Op._extend();
	     */
	    _extend: Parse._extend,

	    // A map of __op string to decoder function.
	    _opDecoderMap: {},

	    /**
	     * Registers a function to convert a json object with an __op field into an
	     * instance of a subclass of Parse.Op.
	     */
	    _registerDecoder: function(opName, decoder) {
	      Parse.Op._opDecoderMap[opName] = decoder;
	    },

	    /**
	     * Converts a json object into an instance of a subclass of Parse.Op.
	     */
	    _decode: function(json) {
	      var decoder = Parse.Op._opDecoderMap[json.__op];
	      if (decoder) {
	        return decoder(json);
	      } else {
	        return undefined;
	      }
	    }
	  });

	  /*
	   * Add a handler for Batch ops.
	   */
	  Parse.Op._registerDecoder("Batch", function(json) {
	    var op = null;
	    Parse._arrayEach(json.ops, function(nextOp) {
	      nextOp = Parse.Op._decode(nextOp);
	      op = nextOp._mergeWithPrevious(op);
	    });
	    return op;
	  });

	  /**
	   * @class
	   * A Set operation indicates that either the field was changed using
	   * Parse.Object.set, or it is a mutable container that was detected as being
	   * changed.
	   */
	  Parse.Op.Set = Parse.Op._extend(/** @lends Parse.Op.Set.prototype */ {
	    _initialize: function(value) {
	      this._value = value;
	    },

	    /**
	     * Returns the new value of this field after the set.
	     */
	    value: function() {
	      return this._value;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return Parse._encode(this.value());
	    },

	    _mergeWithPrevious: function(previous) {
	      return this;
	    },

	    _estimate: function(oldValue) {
	      return this.value();
	    }
	  });

	  /**
	   * A sentinel value that is returned by Parse.Op.Unset._estimate to
	   * indicate the field should be deleted. Basically, if you find _UNSET as a
	   * value in your object, you should remove that key.
	   */
	  Parse.Op._UNSET = {};

	  /**
	   * @class
	   * An Unset operation indicates that this field has been deleted from the
	   * object.
	   */
	  Parse.Op.Unset = Parse.Op._extend(/** @lends Parse.Op.Unset.prototype */ {
	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { __op: "Delete" };
	    },

	    _mergeWithPrevious: function(previous) {
	      return this;
	    },

	    _estimate: function(oldValue) {
	      return Parse.Op._UNSET;
	    }
	  });

	  Parse.Op._registerDecoder("Delete", function(json) {
	    return new Parse.Op.Unset();
	  });

	  /**
	   * @class
	   * An Increment is an atomic operation where the numeric value for the field
	   * will be increased by a given amount.
	   */
	  Parse.Op.Increment = Parse.Op._extend(
	      /** @lends Parse.Op.Increment.prototype */ {

	    _initialize: function(amount) {
	      this._amount = amount;
	    },

	    /**
	     * Returns the amount to increment by.
	     * @return {Number} the amount to increment by.
	     */
	    amount: function() {
	      return this._amount;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { __op: "Increment", amount: this._amount };
	    },

	    _mergeWithPrevious: function(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof Parse.Op.Unset) {
	        return new Parse.Op.Set(this.amount());
	      } else if (previous instanceof Parse.Op.Set) {
	        return new Parse.Op.Set(previous.value() + this.amount());
	      } else if (previous instanceof Parse.Op.Increment) {
	        return new Parse.Op.Increment(this.amount() + previous.amount());
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    },

	    _estimate: function(oldValue) {
	      if (!oldValue) {
	        return this.amount();
	      }
	      return oldValue + this.amount();
	    }
	  });

	  Parse.Op._registerDecoder("Increment", function(json) {
	    return new Parse.Op.Increment(json.amount);
	  });

	  /**
	   * @class
	   * Add is an atomic operation where the given objects will be appended to the
	   * array that is stored in this field.
	   */
	  Parse.Op.Add = Parse.Op._extend(/** @lends Parse.Op.Add.prototype */ {
	    _initialize: function(objects) {
	      this._objects = objects;
	    },

	    /**
	     * Returns the objects to be added to the array.
	     * @return {Array} The objects to be added to the array.
	     */
	    objects: function() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { __op: "Add", objects: Parse._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof Parse.Op.Unset) {
	        return new Parse.Op.Set(this.objects());
	      } else if (previous instanceof Parse.Op.Set) {
	        return new Parse.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof Parse.Op.Add) {
	        return new Parse.Op.Add(previous.objects().concat(this.objects()));
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    },

	    _estimate: function(oldValue) {
	      if (!oldValue) {
	        return _.clone(this.objects());
	      } else {
	        return oldValue.concat(this.objects());
	      }
	    }
	  });

	  Parse.Op._registerDecoder("Add", function(json) {
	    return new Parse.Op.Add(Parse._decode(undefined, json.objects));
	  });

	  /**
	   * @class
	   * AddUnique is an atomic operation where the given items will be appended to
	   * the array that is stored in this field only if they were not already
	   * present in the array.
	   */
	  Parse.Op.AddUnique = Parse.Op._extend(
	      /** @lends Parse.Op.AddUnique.prototype */ {

	    _initialize: function(objects) {
	      this._objects = _.uniq(objects);
	    },

	    /**
	     * Returns the objects to be added to the array.
	     * @return {Array} The objects to be added to the array.
	     */
	    objects: function() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { __op: "AddUnique", objects: Parse._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof Parse.Op.Unset) {
	        return new Parse.Op.Set(this.objects());
	      } else if (previous instanceof Parse.Op.Set) {
	        return new Parse.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof Parse.Op.AddUnique) {
	        return new Parse.Op.AddUnique(this._estimate(previous.objects()));
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    },

	    _estimate: function(oldValue) {
	      if (!oldValue) {
	        return _.clone(this.objects());
	      } else {
	        // We can't just take the _.uniq(_.union(...)) of oldValue and
	        // this.objects, because the uniqueness may not apply to oldValue
	        // (especially if the oldValue was set via .set())
	        var newValue = _.clone(oldValue);
	        Parse._arrayEach(this.objects(), function(obj) {
	          if (obj instanceof Parse.Object && obj.id) {
	            var matchingObj = _.find(newValue, function(anObj) {
	              return (anObj instanceof Parse.Object) && (anObj.id === obj.id);
	            });
	            if (!matchingObj) {
	              newValue.push(obj);
	            } else {
	              var index = _.indexOf(newValue, matchingObj);
	              newValue[index] = obj;
	            }
	          } else if (!_.contains(newValue, obj)) {
	            newValue.push(obj);
	          }
	        });
	        return newValue;
	      }
	    }
	  });

	  Parse.Op._registerDecoder("AddUnique", function(json) {
	    return new Parse.Op.AddUnique(Parse._decode(undefined, json.objects));
	  });

	  /**
	   * @class
	   * Remove is an atomic operation where the given objects will be removed from
	   * the array that is stored in this field.
	   */
	  Parse.Op.Remove = Parse.Op._extend(/** @lends Parse.Op.Remove.prototype */ {
	    _initialize: function(objects) {
	      this._objects = _.uniq(objects);
	    },

	    /**
	     * Returns the objects to be removed from the array.
	     * @return {Array} The objects to be removed from the array.
	     */
	    objects: function() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { __op: "Remove", objects: Parse._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof Parse.Op.Unset) {
	        return previous;
	      } else if (previous instanceof Parse.Op.Set) {
	        return new Parse.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof Parse.Op.Remove) {
	        return new Parse.Op.Remove(_.union(previous.objects(), this.objects()));
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    },

	    _estimate: function(oldValue) {
	      if (!oldValue) {
	        return [];
	      } else {
	        var newValue = _.difference(oldValue, this.objects());
	        // If there are saved Parse Objects being removed, also remove them.
	        Parse._arrayEach(this.objects(), function(obj) {
	          if (obj instanceof Parse.Object && obj.id) {
	            newValue = _.reject(newValue, function(other) {
	              return (other instanceof Parse.Object) && (other.id === obj.id);
	            });
	          }
	        });
	        return newValue;
	      }
	    }
	  });

	  Parse.Op._registerDecoder("Remove", function(json) {
	    return new Parse.Op.Remove(Parse._decode(undefined, json.objects));
	  });

	  /**
	   * @class
	   * A Relation operation indicates that the field is an instance of
	   * Parse.Relation, and objects are being added to, or removed from, that
	   * relation.
	   */
	  Parse.Op.Relation = Parse.Op._extend(
	      /** @lends Parse.Op.Relation.prototype */ {

	    _initialize: function(adds, removes) {
	      this._targetClassName = null;

	      var self = this;

	      var pointerToId = function(object) {
	        if (object instanceof Parse.Object) {
	          if (!object.id) {
	            throw "You can't add an unsaved Parse.Object to a relation.";
	          }
	          if (!self._targetClassName) {
	            self._targetClassName = object.className;
	          }
	          if (self._targetClassName !== object.className) {
	            throw "Tried to create a Parse.Relation with 2 different types: " +
	                  self._targetClassName + " and " + object.className + ".";
	          }
	          return object.id;
	        }
	        return object;
	      };

	      this.relationsToAdd = _.uniq(_.map(adds, pointerToId));
	      this.relationsToRemove = _.uniq(_.map(removes, pointerToId));
	    },

	    /**
	     * Returns an array of unfetched Parse.Object that are being added to the
	     * relation.
	     * @return {Array}
	     */
	    added: function() {
	      var self = this;
	      return _.map(this.relationsToAdd, function(objectId) {
	        var object = Parse.Object._create(self._targetClassName);
	        object.id = objectId;
	        return object;
	      });
	    },

	    /**
	     * Returns an array of unfetched Parse.Object that are being removed from
	     * the relation.
	     * @return {Array}
	     */
	    removed: function() {
	      var self = this;
	      return _.map(this.relationsToRemove, function(objectId) {
	        var object = Parse.Object._create(self._targetClassName);
	        object.id = objectId;
	        return object;
	      });
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      var adds = null;
	      var removes = null;
	      var self = this;
	      var idToPointer = function(id) {
	        return { __type: 'Pointer',
	                 className: self._targetClassName,
	                 objectId: id };
	      };
	      var pointers = null;
	      if (this.relationsToAdd.length > 0) {
	        pointers = _.map(this.relationsToAdd, idToPointer);
	        adds = { "__op": "AddRelation", "objects": pointers };
	      }

	      if (this.relationsToRemove.length > 0) {
	        pointers = _.map(this.relationsToRemove, idToPointer);
	        removes = { "__op": "RemoveRelation", "objects": pointers };
	      }

	      if (adds && removes) {
	        return { "__op": "Batch", "ops": [adds, removes]};
	      }

	      return adds || removes || {};
	    },

	    _mergeWithPrevious: function(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof Parse.Op.Unset) {
	        throw "You can't modify a relation after deleting it.";
	      } else if (previous instanceof Parse.Op.Relation) {
	        if (previous._targetClassName &&
	            previous._targetClassName !== this._targetClassName) {
	          throw "Related object must be of class " + previous._targetClassName +
	              ", but " + this._targetClassName + " was passed in.";
	        }
	        var newAdd = _.union(_.difference(previous.relationsToAdd,
	                                          this.relationsToRemove),
	                             this.relationsToAdd);
	        var newRemove = _.union(_.difference(previous.relationsToRemove,
	                                             this.relationsToAdd),
	                                this.relationsToRemove);

	        var newRelation = new Parse.Op.Relation(newAdd, newRemove);
	        newRelation._targetClassName = this._targetClassName;
	        return newRelation;
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    },

	    _estimate: function(oldValue, object, key) {
	      if (!oldValue) {
	        var relation = new Parse.Relation(object, key);
	        relation.targetClassName = this._targetClassName;
	      } else if (oldValue instanceof Parse.Relation) {
	        if (this._targetClassName) {
	          if (oldValue.targetClassName) {
	            if (oldValue.targetClassName !== this._targetClassName) {
	              throw "Related object must be a " + oldValue.targetClassName +
	                  ", but a " + this._targetClassName + " was passed in.";
	            }
	          } else {
	            oldValue.targetClassName = this._targetClassName;
	          }
	        }
	        return oldValue;
	      } else {
	        throw "Op is invalid after previous op.";
	      }
	    }
	  });

	  Parse.Op._registerDecoder("AddRelation", function(json) {
	    return new Parse.Op.Relation(Parse._decode(undefined, json.objects), []);
	  });
	  Parse.Op._registerDecoder("RemoveRelation", function(json) {
	    return new Parse.Op.Relation([], Parse._decode(undefined, json.objects));
	  });

	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creates a new Relation for the given parent object and key. This
	   * constructor should rarely be used directly, but rather created by
	   * Parse.Object.relation.
	   * @param {Parse.Object} parent The parent of this relation.
	   * @param {String} key The key for this relation on the parent.
	   * @see Parse.Object#relation
	   * @class
	   *
	   * <p>
	   * A class that is used to access all of the children of a many-to-many
	   * relationship.  Each instance of Parse.Relation is associated with a
	   * particular parent object and key.
	   * </p>
	   */
	  Parse.Relation = function(parent, key) {
	    this.parent = parent;
	    this.key = key;
	    this.targetClassName = null;
	  };

	  Parse.Relation.prototype = {
	    /**
	     * Makes sure that this relation has the right parent and key.
	     */
	    _ensureParentAndKey: function(parent, key) {
	      this.parent = this.parent || parent;
	      this.key = this.key || key;
	      if (this.parent !== parent) {
	        throw "Internal Error. Relation retrieved from two different Objects.";
	      }
	      if (this.key !== key) {
	        throw "Internal Error. Relation retrieved from two different keys.";
	      }
	    },

	    /**
	     * Adds a Parse.Object or an array of Parse.Objects to the relation.
	     * @param {} objects The item or items to add.
	     */
	    add: function(objects) {
	      if (!_.isArray(objects)) {
	        objects = [objects];
	      }

	      var change = new Parse.Op.Relation(objects, []);
	      this.parent.set(this.key, change);
	      this.targetClassName = change._targetClassName;
	    },

	    /**
	     * Removes a Parse.Object or an array of Parse.Objects from this relation.
	     * @param {} objects The item or items to remove.
	     */
	    remove: function(objects) {
	      if (!_.isArray(objects)) {
	        objects = [objects];
	      }

	      var change = new Parse.Op.Relation([], objects);
	      this.parent.set(this.key, change);
	      this.targetClassName = change._targetClassName;
	    },

	    /**
	     * Returns a JSON version of the object suitable for saving to disk.
	     * @return {Object}
	     */
	    toJSON: function() {
	      return { "__type": "Relation", "className": this.targetClassName };
	    },

	    /**
	     * Returns a Parse.Query that is limited to objects in this
	     * relation.
	     * @return {Parse.Query}
	     */
	    query: function() {
	      var targetClass;
	      var query;
	      if (!this.targetClassName) {
	        targetClass = Parse.Object._getSubclass(this.parent.className);
	        query = new Parse.Query(targetClass);
	        query._extraOptions.redirectClassNameForKey = this.key;
	      } else {
	        targetClass = Parse.Object._getSubclass(this.targetClassName);
	        query = new Parse.Query(targetClass);
	      }
	      query._addCondition("$relatedTo", "object", this.parent._toPointer());
	      query._addCondition("$relatedTo", "key", this.key);

	      return query;
	    }
	  };
	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * A Promise is returned by async methods as a hook to provide callbacks to be
	   * called when the async task is fulfilled.
	   *
	   * <p>Typical usage would be like:<pre>
	   *    query.findAsync().then(function(results) {
	   *      results[0].set("foo", "bar");
	   *      return results[0].saveAsync();
	   *    }).then(function(result) {
	   *      console.log("Updated " + result.id);
	   *    });
	   * </pre></p>
	   *
	   * @see Parse.Promise.prototype.next
	   * @class
	   */
	  Parse.Promise = function() {
	    this._resolved = false;
	    this._rejected = false;
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	  };

	  _.extend(Parse.Promise, /** @lends Parse.Promise */ {

	    /**
	     * Returns true iff the given object fulfils the Promise interface.
	     * @return {Boolean}
	     */
	    is: function(promise) {
	      return promise && promise.then && _.isFunction(promise.then);
	    },

	    /**
	     * Returns a new promise that is resolved with a given value.
	     * @return {Parse.Promise} the new promise.
	     */
	    as: function() {
	      var promise = new Parse.Promise();
	      promise.resolve.apply(promise, arguments);
	      return promise;
	    },

	    /**
	     * Returns a new promise that is rejected with a given error.
	     * @return {Parse.Promise} the new promise.
	     */
	    error: function() {
	      var promise = new Parse.Promise();
	      promise.reject.apply(promise, arguments);
	      return promise;
	    },

	    /**
	     * Returns a new promise that is fulfilled when all of the input promises
	     * are resolved. If any promise in the list fails, then the returned promise
	     * will fail with the last error. If they all succeed, then the returned
	     * promise will succeed, with the result being an array with the results of
	     * all the input promises.
	     * @param {Array} promises a list of promises to wait for.
	     * @return {Parse.Promise} the new promise.
	     */
	    when: function(promises) {
	      // Allow passing in Promises as separate arguments instead of an Array.
	      var objects;
	      if (promises && Parse._isNullOrUndefined(promises.length)) {
	        objects = arguments;
	      } else {
	        objects = promises;
	      }

	      var total = objects.length;
	      var hadError = false;
	      var results = [];
	      var errors = [];
	      results.length = objects.length;
	      errors.length = objects.length;

	      if (total === 0) {
	        return Parse.Promise.as.apply(this, results);
	      }

	      var promise = new Parse.Promise();

	      var resolveOne = function() {
	        total = total - 1;
	        if (total === 0) {
	          if (hadError) {
	            promise.reject(errors);
	          } else {
	            promise.resolve.apply(promise, results);
	          }
	        }
	      };

	      Parse._arrayEach(objects, function(object, i) {
	        if (Parse.Promise.is(object)) {
	          object.then(function(result) {
	            results[i] = result;
	            resolveOne();
	          }, function(error) {
	            errors[i] = error;
	            hadError = true;
	            resolveOne();
	          });
	        } else {
	          results[i] = object;
	          resolveOne();
	        }
	      });

	      return promise;
	    },

	    /**
	     * Runs the given asyncFunction repeatedly, as long as the predicate
	     * function returns a truthy value. Stops repeating if asyncFunction returns
	     * a rejected promise.
	     * @param {Function} predicate should return false when ready to stop.
	     * @param {Function} asyncFunction should return a Promise.
	     */
	    _continueWhile: function(predicate, asyncFunction) {
	      if (predicate()) {
	        return asyncFunction().then(function() {
	          return Parse.Promise._continueWhile(predicate, asyncFunction);
	        });
	      }
	      return Parse.Promise.as();
	    }
	  });

	  _.extend(Parse.Promise.prototype, /** @lends Parse.Promise.prototype */ {

	    /**
	     * Marks this promise as fulfilled, firing any callbacks waiting on it.
	     * @param {Object} result the result to pass to the callbacks.
	     */
	    resolve: function(result) {
	      if (this._resolved || this._rejected) {
	        throw "A promise was resolved even though it had already been " +
	          (this._resolved ? "resolved" : "rejected") + ".";
	      }
	      this._resolved = true;
	      this._result = arguments;
	      var results = arguments;
	      Parse._arrayEach(this._resolvedCallbacks, function(resolvedCallback) {
	        resolvedCallback.apply(this, results);
	      });
	      this._resolvedCallbacks = [];
	      this._rejectedCallbacks = [];
	    },

	    /**
	     * Marks this promise as fulfilled, firing any callbacks waiting on it.
	     * @param {Object} error the error to pass to the callbacks.
	     */
	    reject: function(error) {
	      if (this._resolved || this._rejected) {
	        throw "A promise was rejected even though it had already been " +
	          (this._resolved ? "resolved" : "rejected") + ".";
	      }
	      this._rejected = true;
	      this._error = error;
	      Parse._arrayEach(this._rejectedCallbacks, function(rejectedCallback) {
	        rejectedCallback(error);
	      });
	      this._resolvedCallbacks = [];
	      this._rejectedCallbacks = [];
	    },

	    /**
	     * Adds callbacks to be called when this promise is fulfilled. Returns a new
	     * Promise that will be fulfilled when the callback is complete. It allows
	     * chaining. If the callback itself returns a Promise, then the one returned
	     * by "then" will not be fulfilled until that one returned by the callback
	     * is fulfilled.
	     * @param {Function} resolvedCallback Function that is called when this
	     * Promise is resolved. Once the callback is complete, then the Promise
	     * returned by "then" will also be fulfilled.
	     * @param {Function} rejectedCallback Function that is called when this
	     * Promise is rejected with an error. Once the callback is complete, then
	     * the promise returned by "then" with be resolved successfully. If
	     * rejectedCallback is null, or it returns a rejected Promise, then the
	     * Promise returned by "then" will be rejected with that error.
	     * @return {Parse.Promise} A new Promise that will be fulfilled after this
	     * Promise is fulfilled and either callback has completed. If the callback
	     * returned a Promise, then this Promise will not be fulfilled until that
	     * one is.
	     */
	    then: function(resolvedCallback, rejectedCallback) {
	      var promise = new Parse.Promise();

	      var wrappedResolvedCallback = function() {
	        var result = arguments;
	        if (resolvedCallback) {
	          result = [resolvedCallback.apply(this, result)];
	        }
	        if (result.length === 1 && Parse.Promise.is(result[0])) {
	          result[0].then(function() {
	            promise.resolve.apply(promise, arguments);
	          }, function(error) {
	            promise.reject(error);
	          });
	        } else {
	          promise.resolve.apply(promise, result);
	        }
	      };

	      var wrappedRejectedCallback = function(error) {
	        var result = [];
	        if (rejectedCallback) {
	          result = [rejectedCallback(error)];
	          if (result.length === 1 && Parse.Promise.is(result[0])) {
	            result[0].then(function() {
	              promise.resolve.apply(promise, arguments);
	            }, function(error) {
	              promise.reject(error);
	            });
	          } else {
	            // A Promises/A+ compliant implementation would call:
	            // promise.resolve.apply(promise, result);
	            promise.reject(result[0]);
	          }
	        } else {
	          promise.reject(error);
	        }
	      };

	      if (this._resolved) {
	        wrappedResolvedCallback.apply(this, this._result);
	      } else if (this._rejected) {
	        wrappedRejectedCallback(this._error);
	      } else {
	        this._resolvedCallbacks.push(wrappedResolvedCallback);
	        this._rejectedCallbacks.push(wrappedRejectedCallback);
	      }

	      return promise;
	    },

	    /**
	     * Run the given callbacks after this promise is fulfilled.
	     * @param optionsOrCallback {} A Backbone-style options callback, or a
	     * callback function. If this is an options object and contains a "model"
	     * attributes, that will be passed to error callbacks as the first argument.
	     * @param model {} If truthy, this will be passed as the first result of
	     * error callbacks. This is for Backbone-compatability.
	     * @return {Parse.Promise} A promise that will be resolved after the
	     * callbacks are run, with the same result as this.
	     */
	    _thenRunCallbacks: function(optionsOrCallback, model) {
	      var options;
	      if (_.isFunction(optionsOrCallback)) {
	        var callback = optionsOrCallback;
	        options = {
	          success: function(result) {
	            callback(result, null);
	          },
	          error: function(error) {
	            callback(null, error);
	          }
	        };
	      } else {
	        options = _.clone(optionsOrCallback);
	      }
	      options = options || {};

	      return this.then(function(result) {
	        if (options.success) {
	          options.success.apply(this, arguments);
	        } else if (model) {
	          // When there's no callback, a sync event should be triggered.
	          model.trigger('sync', model, result, options);
	        }
	        return Parse.Promise.as.apply(Parse.Promise, arguments);
	      }, function(error) {
	        if (options.error) {
	          if (!_.isUndefined(model)) {
	            options.error(model, error);
	          } else {
	            options.error(error);
	          }
	        } else if (model) {
	          // When there's no error callback, an error event should be triggered.
	          model.trigger('error', model, error, options);
	        }
	        // By explicitly returning a rejected Promise, this will work with
	        // either jQuery or Promises/A semantics.
	        return Parse.Promise.error(error);
	      });
	    },

	    /**
	     * Adds a callback function that should be called regardless of whether
	     * this promise failed or succeeded. The callback will be given either the
	     * array of results for its first argument, or the error as its second,
	     * depending on whether this Promise was rejected or resolved. Returns a
	     * new Promise, like "then" would.
	     * @param {Function} continuation the callback.
	     */
	    _continueWith: function(continuation) {
	      return this.then(function() {
	        return continuation(arguments, null);
	      }, function(error) {
	        return continuation(null, error);
	      });
	    }

	  });

	}(this));

	/*jshint bitwise:false *//*global FileReader: true, File: true */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  var b64Digit = function(number) {
	    if (number < 26) {
	      return String.fromCharCode(65 + number);
	    }
	    if (number < 52) {
	      return String.fromCharCode(97 + (number - 26));
	    }
	    if (number < 62) {
	      return String.fromCharCode(48 + (number - 52));
	    }
	    if (number === 62) {
	      return "+";
	    }
	    if (number === 63) {
	      return "/";
	    }
	    throw "Tried to encode large digit " + number + " in base64.";
	  };

	  var encodeBase64 = function(array) {
	    var chunks = [];
	    chunks.length = Math.ceil(array.length / 3);
	    _.times(chunks.length, function(i) {
	      var b1 = array[i * 3];
	      var b2 = array[i * 3 + 1] || 0;
	      var b3 = array[i * 3 + 2] || 0;

	      var has2 = (i * 3 + 1) < array.length;
	      var has3 = (i * 3 + 2) < array.length;

	      chunks[i] = [
	        b64Digit((b1 >> 2) & 0x3F),
	        b64Digit(((b1 << 4) & 0x30) | ((b2 >> 4) & 0x0F)),
	        has2 ? b64Digit(((b2 << 2) & 0x3C) | ((b3 >> 6) & 0x03)) : "=",
	        has3 ? b64Digit(b3 & 0x3F) : "="
	      ].join("");
	    });
	    return chunks.join("");
	  };

	  // TODO(klimt): Move this list to the server.
	  // A list of file extensions to mime types as found here:
	  // http://stackoverflow.com/questions/58510/using-net-how-can-you-find-the-
	  //     mime-type-of-a-file-based-on-the-file-signature
	  var mimeTypes = {
	    ai: "application/postscript",
	    aif: "audio/x-aiff",
	    aifc: "audio/x-aiff",
	    aiff: "audio/x-aiff",
	    asc: "text/plain",
	    atom: "application/atom+xml",
	    au: "audio/basic",
	    avi: "video/x-msvideo",
	    bcpio: "application/x-bcpio",
	    bin: "application/octet-stream",
	    bmp: "image/bmp",
	    cdf: "application/x-netcdf",
	    cgm: "image/cgm",
	    "class": "application/octet-stream",
	    cpio: "application/x-cpio",
	    cpt: "application/mac-compactpro",
	    csh: "application/x-csh",
	    css: "text/css",
	    dcr: "application/x-director",
	    dif: "video/x-dv",
	    dir: "application/x-director",
	    djv: "image/vnd.djvu",
	    djvu: "image/vnd.djvu",
	    dll: "application/octet-stream",
	    dmg: "application/octet-stream",
	    dms: "application/octet-stream",
	    doc: "application/msword",
	    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml." +
	          "document",
	    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml." +
	          "template",
	    docm: "application/vnd.ms-word.document.macroEnabled.12",
	    dotm: "application/vnd.ms-word.template.macroEnabled.12",
	    dtd: "application/xml-dtd",
	    dv: "video/x-dv",
	    dvi: "application/x-dvi",
	    dxr: "application/x-director",
	    eps: "application/postscript",
	    etx: "text/x-setext",
	    exe: "application/octet-stream",
	    ez: "application/andrew-inset",
	    gif: "image/gif",
	    gram: "application/srgs",
	    grxml: "application/srgs+xml",
	    gtar: "application/x-gtar",
	    hdf: "application/x-hdf",
	    hqx: "application/mac-binhex40",
	    htm: "text/html",
	    html: "text/html",
	    ice: "x-conference/x-cooltalk",
	    ico: "image/x-icon",
	    ics: "text/calendar",
	    ief: "image/ief",
	    ifb: "text/calendar",
	    iges: "model/iges",
	    igs: "model/iges",
	    jnlp: "application/x-java-jnlp-file",
	    jp2: "image/jp2",
	    jpe: "image/jpeg",
	    jpeg: "image/jpeg",
	    jpg: "image/jpeg",
	    js: "application/x-javascript",
	    kar: "audio/midi",
	    latex: "application/x-latex",
	    lha: "application/octet-stream",
	    lzh: "application/octet-stream",
	    m3u: "audio/x-mpegurl",
	    m4a: "audio/mp4a-latm",
	    m4b: "audio/mp4a-latm",
	    m4p: "audio/mp4a-latm",
	    m4u: "video/vnd.mpegurl",
	    m4v: "video/x-m4v",
	    mac: "image/x-macpaint",
	    man: "application/x-troff-man",
	    mathml: "application/mathml+xml",
	    me: "application/x-troff-me",
	    mesh: "model/mesh",
	    mid: "audio/midi",
	    midi: "audio/midi",
	    mif: "application/vnd.mif",
	    mov: "video/quicktime",
	    movie: "video/x-sgi-movie",
	    mp2: "audio/mpeg",
	    mp3: "audio/mpeg",
	    mp4: "video/mp4",
	    mpe: "video/mpeg",
	    mpeg: "video/mpeg",
	    mpg: "video/mpeg",
	    mpga: "audio/mpeg",
	    ms: "application/x-troff-ms",
	    msh: "model/mesh",
	    mxu: "video/vnd.mpegurl",
	    nc: "application/x-netcdf",
	    oda: "application/oda",
	    ogg: "application/ogg",
	    pbm: "image/x-portable-bitmap",
	    pct: "image/pict",
	    pdb: "chemical/x-pdb",
	    pdf: "application/pdf",
	    pgm: "image/x-portable-graymap",
	    pgn: "application/x-chess-pgn",
	    pic: "image/pict",
	    pict: "image/pict",
	    png: "image/png",
	    pnm: "image/x-portable-anymap",
	    pnt: "image/x-macpaint",
	    pntg: "image/x-macpaint",
	    ppm: "image/x-portable-pixmap",
	    ppt: "application/vnd.ms-powerpoint",
	    pptx: "application/vnd.openxmlformats-officedocument.presentationml." +
	          "presentation",
	    potx: "application/vnd.openxmlformats-officedocument.presentationml." +
	          "template",
	    ppsx: "application/vnd.openxmlformats-officedocument.presentationml." +
	          "slideshow",
	    ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
	    pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
	    potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
	    ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
	    ps: "application/postscript",
	    qt: "video/quicktime",
	    qti: "image/x-quicktime",
	    qtif: "image/x-quicktime",
	    ra: "audio/x-pn-realaudio",
	    ram: "audio/x-pn-realaudio",
	    ras: "image/x-cmu-raster",
	    rdf: "application/rdf+xml",
	    rgb: "image/x-rgb",
	    rm: "application/vnd.rn-realmedia",
	    roff: "application/x-troff",
	    rtf: "text/rtf",
	    rtx: "text/richtext",
	    sgm: "text/sgml",
	    sgml: "text/sgml",
	    sh: "application/x-sh",
	    shar: "application/x-shar",
	    silo: "model/mesh",
	    sit: "application/x-stuffit",
	    skd: "application/x-koan",
	    skm: "application/x-koan",
	    skp: "application/x-koan",
	    skt: "application/x-koan",
	    smi: "application/smil",
	    smil: "application/smil",
	    snd: "audio/basic",
	    so: "application/octet-stream",
	    spl: "application/x-futuresplash",
	    src: "application/x-wais-source",
	    sv4cpio: "application/x-sv4cpio",
	    sv4crc: "application/x-sv4crc",
	    svg: "image/svg+xml",
	    swf: "application/x-shockwave-flash",
	    t: "application/x-troff",
	    tar: "application/x-tar",
	    tcl: "application/x-tcl",
	    tex: "application/x-tex",
	    texi: "application/x-texinfo",
	    texinfo: "application/x-texinfo",
	    tif: "image/tiff",
	    tiff: "image/tiff",
	    tr: "application/x-troff",
	    tsv: "text/tab-separated-values",
	    txt: "text/plain",
	    ustar: "application/x-ustar",
	    vcd: "application/x-cdlink",
	    vrml: "model/vrml",
	    vxml: "application/voicexml+xml",
	    wav: "audio/x-wav",
	    wbmp: "image/vnd.wap.wbmp",
	    wbmxl: "application/vnd.wap.wbxml",
	    wml: "text/vnd.wap.wml",
	    wmlc: "application/vnd.wap.wmlc",
	    wmls: "text/vnd.wap.wmlscript",
	    wmlsc: "application/vnd.wap.wmlscriptc",
	    wrl: "model/vrml",
	    xbm: "image/x-xbitmap",
	    xht: "application/xhtml+xml",
	    xhtml: "application/xhtml+xml",
	    xls: "application/vnd.ms-excel",
	    xml: "application/xml",
	    xpm: "image/x-xpixmap",
	    xsl: "application/xml",
	    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml." +
	          "template",
	    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
	    xltm: "application/vnd.ms-excel.template.macroEnabled.12",
	    xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
	    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
	    xslt: "application/xslt+xml",
	    xul: "application/vnd.mozilla.xul+xml",
	    xwd: "image/x-xwindowdump",
	    xyz: "chemical/x-xyz",
	    zip: "application/zip"
	  };

	  /**
	   * Reads a File using a FileReader.
	   * @param file {File} the File to read.
	   * @param type {String} (optional) the mimetype to override with.
	   * @return {Parse.Promise} A Promise that will be fulfilled with a
	   *     base64-encoded string of the data and its mime type.
	   */
	  var readAsync = function(file, type) {
	    var promise = new Parse.Promise();

	    if (typeof(FileReader) === "undefined") {
	      return Parse.Promise.error(new Parse.Error(
	          -1, "Attempted to use a FileReader on an unsupported browser."));
	    }

	    var reader = new FileReader();
	    reader.onloadend = function() {
	      if (reader.readyState !== 2) {
	        promise.reject(new Parse.Error(-1, "Error reading file."));
	        return;
	      }

	      var dataURL = reader.result;
	      var matches = /^data:([^;]*);base64,(.*)$/.exec(dataURL);
	      if (!matches) {
	        promise.reject(
	            new Parse.Error(-1, "Unable to interpret data URL: " + dataURL));
	        return;
	      }

	      promise.resolve(matches[2], type || matches[1]);
	    };
	    reader.readAsDataURL(file);
	    return promise;
	  };

	  /**
	   * A Parse.File is a local representation of a file that is saved to the Parse
	   * cloud.
	   * @param name {String} The file's name. This will change to a unique value
	   *     once the file has finished saving.
	   * @param data {Array} The data for the file, as either:
	   *     1. an Array of byte value Numbers, or
	   *     2. an Object like { base64: "..." } with a base64-encoded String.
	   *     3. a File object selected with a file upload control. (3) only works
	   *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
	   *        For example:<pre>
	   * var fileUploadControl = $("#profilePhotoFileUpload")[0];
	   * if (fileUploadControl.files.length > 0) {
	   *   var file = fileUploadControl.files[0];
	   *   var name = "photo.jpg";
	   *   var parseFile = new Parse.File(name, file);
	   *   parseFile.save().then(function() {
	   *     // The file has been saved to Parse.
	   *   }, function(error) {
	   *     // The file either could not be read, or could not be saved to Parse.
	   *   });
	   * }</pre>
	   * @param type {String} Optional Content-Type header to use for the file. If
	   *     this is omitted, the content type will be inferred from the name's
	   *     extension.
	   */
	  Parse.File = function(name, data, type) {
	    this._name = name;

	    // Guess the content type from the extension if we need to.
	    var extension = /\.([^.]*)$/.exec(name);
	    if (extension) {
	      extension = extension[1].toLowerCase();
	    }
	    var guessedType = type || mimeTypes[extension] || "text/plain";

	    if (_.isArray(data)) {
	      this._source = Parse.Promise.as(encodeBase64(data), guessedType);
	    } else if (data && data.base64) {
	      this._source = Parse.Promise.as(data.base64, guessedType);
	    } else if (typeof(File) !== "undefined" && data instanceof File) {
	      this._source = readAsync(data, type);
	    } else if (_.isString(data)) {
	      throw "Creating a Parse.File from a String is not yet supported.";
	    }
	  };

	  Parse.File.prototype = {

	    /**
	     * Gets the name of the file. Before save is called, this is the filename
	     * given by the user. After save is called, that name gets prefixed with a
	     * unique identifier.
	     */
	    name: function() {
	      return this._name;
	    },

	    /**
	     * Gets the url of the file. It is only available after you save the file or
	     * after you get the file from a Parse.Object.
	     * @return {String}
	     */
	    url: function() {
	      return this._url;
	    },

	    /**
	     * Saves the file to the Parse cloud.
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} Promise that is resolved when the save finishes.
	     */
	    save: function(options) {
	      var self = this;
	      if (!self._previousSave) {
	        self._previousSave = self._source.then(function(base64, type) {
	          var data = {
	            base64: base64,
	            _ContentType: type
	          };
	          return Parse._request("files", self._name, null, 'POST', data);

	        }).then(function(response) {
	          self._name = response.name;
	          self._url = response.url;
	          return self;
	        });
	      }
	      return self._previousSave._thenRunCallbacks(options);
	    }
	  };

	}(this));

	// Parse.Object is analogous to the Java ParseObject.
	// It also implements the same interface as a Backbone model.
	// TODO: multiple dispatch for callbacks
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creates a new model with defined attributes. A client id (cid) is
	   * automatically generated and assigned for you.
	   *
	   * <p>You won't normally call this method directly.  It is recommended that
	   * you use a subclass of <code>Parse.Object</code> instead, created by calling
	   * <code>extend</code>.</p>
	   *
	   * <p>However, if you don't want to use a subclass, or aren't sure which
	   * subclass is appropriate, you can use this form:<pre>
	   *     var object = new Parse.Object("ClassName");
	   * </pre>
	   * That is basically equivalent to:<pre>
	   *     var MyClass = Parse.Object.extend("ClassName");
	   *     var object = new MyClass();
	   * </pre></p>
	   *
	   * @param {Object} attributes The initial set of data to store in the object.
	   * @param {Object} options A set of Backbone-like options for creating the
	   *     object.  The only option currently supported is "collection".
	   * @see Parse.Object.extend
	   *
	   * @class
	   *
	   * <p>The fundamental unit of Parse data, which implements the Backbone Model
	   * interface.</p>
	   */
	  Parse.Object = function(attributes, options) {
	    // Allow new Parse.Object("ClassName") as a shortcut to _create.
	    if (_.isString(attributes)) {
	      return Parse.Object._create.apply(this, arguments);
	    }

	    attributes = attributes || {};
	    if (options && options.parse) {
	      attributes = this.parse(attributes);
	    }
	    var defaults = Parse._getValue(this, 'defaults');
	    if (defaults) {
	      attributes = _.extend({}, defaults, attributes);
	    }
	    if (options && options.collection) {
	      this.collection = options.collection;
	    }

	    this._serverData = {};  // The last known data for this object from cloud.
	    this._opSetQueue = [{}];  // List of sets of changes to the data.
	    this.attributes = {};  // The best estimate of this's current data.

	    this._hashedJSON = {};  // Hash of values of containers at last save.
	    this._escapedAttributes = {};
	    this.cid = _.uniqueId('c');
	    this.changed = {};
	    this._silent = {};
	    this._pending = {};
	    if (!this.set(attributes, {silent: true})) {
	      throw new Error("Can't create an invalid Parse.Object");
	    }
	    this.changed = {};
	    this._silent = {};
	    this._pending = {};
	    this._hasData = true;
	    this._previousAttributes = _.clone(this.attributes);
	    this.initialize.apply(this, arguments);
	  };

	  /**
	   * @lends Parse.Object.prototype
	   * @property {String} id The objectId of the Parse Object.
	   */

	  /**
	   * Saves the given list of Parse.Object.
	   * If any error is encountered, stops and calls the error handler.
	   * There are two ways you can call this function.
	   *
	   * The Backbone way:<pre>
	   *   Parse.Object.saveAll([object1, object2, ...], {
	   *     success: function(list) {
	   *       // All the objects were saved.
	   *     },
	   *     error: function(error) {
	   *       // An error occurred while saving one of the objects.
	   *     },
	   *   });
	   * </pre>
	   * A simplified syntax:<pre>
	   *   Parse.Object.saveAll([object1, object2, ...], function(list, error) {
	   *     if (list) {
	   *       // All the objects were saved.
	   *     } else {
	   *       // An error occurred.
	   *     }
	   *   });
	   * </pre>
	   *
	   * @param {Array} list A list of <code>Parse.Object</code>.
	   * @param {Object} options A Backbone-style callback object.
	   */
	  Parse.Object.saveAll = function(list, options) {
	    return Parse.Object._deepSaveAsync(list)._thenRunCallbacks(options);
	  };

	  // Attach all inheritable methods to the Parse.Object prototype.
	  _.extend(Parse.Object.prototype, Parse.Events,
	           /** @lends Parse.Object.prototype */ {
	    _existed: false,

	    /**
	     * Initialize is an empty function by default. Override it with your own
	     * initialization logic.
	     */
	    initialize: function(){},

	    /**
	     * Returns a JSON version of the object suitable for saving to Parse.
	     * @return {Object}
	     */
	    toJSON: function() {
	      var json = this._toFullJSON();
	      Parse._arrayEach(["__type", "className"],
	                       function(key) { delete json[key]; });
	      return json;
	    },

	    _toFullJSON: function(seenObjects) {
	      var json = _.clone(this.attributes);
	      Parse._objectEach(json, function(val, key) {
	        json[key] = Parse._encode(val, seenObjects);
	      });
	      Parse._objectEach(this._operations, function(val, key) {
	        json[key] = val;
	      });

	      if (_.has(this, "id")) {
	        json.objectId = this.id;
	      }
	      if (_.has(this, "createdAt")) {
	        if (_.isDate(this.createdAt)) {
	          json.createdAt = this.createdAt.toJSON();
	        } else {
	          json.createdAt = this.createdAt;
	        }
	      }

	      if (_.has(this, "updatedAt")) {
	        if (_.isDate(this.updatedAt)) {
	          json.updatedAt = this.updatedAt.toJSON();
	        } else {
	          json.updatedAt = this.updatedAt;
	        }
	      }
	      json.__type = "Object";
	      json.className = this.className;
	      return json;
	    },

	    /**
	     * Updates _hashedJSON to reflect the current state of this object.
	     * Adds any changed hash values to the set of pending changes.
	     */
	    _refreshCache: function() {
	      var self = this;
	      if (self._refreshingCache) {
	        return;
	      }
	      self._refreshingCache = true;
	      Parse._objectEach(this.attributes, function(value, key) {
	        if (value instanceof Parse.Object) {
	          value._refreshCache();
	        } else if (_.isObject(value)) {
	          if (self._resetCacheForKey(key)) {
	            self.set(key, new Parse.Op.Set(value), { silent: true });
	          }
	        }
	      });
	      delete self._refreshingCache;
	    },

	    /**
	     * Returns true if this object has been modified since its last
	     * save/refresh.  If an attribute is specified, it returns true only if that
	     * particular attribute has been modified since the last save/refresh.
	     * @param {String} attr An attribute name (optional).
	     * @return {Boolean}
	     */
	    dirty: function(attr) {
	      this._refreshCache();

	      var currentChanges = _.last(this._opSetQueue);

	      if (attr) {
	        return (currentChanges[attr] ? true : false);
	      }
	      if (!this.id) {
	        return true;
	      }
	      if (_.keys(currentChanges).length > 0) {
	        return true;
	      }
	      return false;
	    },

	    /**
	     * Gets a Pointer referencing this Object.
	     */
	    _toPointer: function() {
	      if (!this.id) {
	        throw new Error("Can't serialize an unsaved Parse.Object");
	      }
	      return { __type: "Pointer",
	               className: this.className,
	               objectId: this.id };
	    },

	    /**
	     * Gets the value of an attribute.
	     * @param {String} attr The string name of an attribute.
	     */
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    /**
	     * Gets a relation on the given class for the attribute.
	     * @param String attr The attribute to get the relation for.
	     */
	    relation: function(attr) {
	      var value = this.get(attr);
	      if (value) {
	        if (!(value instanceof Parse.Relation)) {
	          throw "Called relation() on non-relation field " + attr;
	        }
	        value._ensureParentAndKey(this, attr);
	        return value;
	      } else {
	        return new Parse.Relation(this, attr);
	      }
	    },

	    /**
	     * Gets the HTML-escaped value of an attribute.
	     */
	    escape: function(attr) {
	      var html = this._escapedAttributes[attr];
	      if (html) {
	        return html;
	      }
	      var val = this.attributes[attr];
	      var escaped;
	      if (Parse._isNullOrUndefined(val)) {
	        escaped = '';
	      } else {
	        escaped = _.escape(val.toString());
	      }
	      this._escapedAttributes[attr] = escaped;
	      return escaped;
	    },

	    /**
	     * Returns <code>true</code> if the attribute contains a value that is not
	     * null or undefined.
	     * @param {String} attr The string name of the attribute.
	     * @return {Boolean}
	     */
	    has: function(attr) {
	      return !Parse._isNullOrUndefined(this.attributes[attr]);
	    },

	    /**
	     * Pulls "special" fields like objectId, createdAt, etc. out of attrs
	     * and puts them on "this" directly.  Removes them from attrs.
	     * @param attrs - A dictionary with the data for this Parse.Object.
	     */
	    _mergeMagicFields: function(attrs) {
	      // Check for changes of magic fields.
	      var model = this;
	      var specialFields = ["id", "objectId", "createdAt", "updatedAt"];
	      Parse._arrayEach(specialFields, function(attr) {
	        if (attrs[attr]) {
	          if (attr === "objectId") {
	            model.id = attrs[attr];
	          } else if ((attr === "createdAt" || attr === "updatedAt") &&
	                     !_.isDate(attrs[attr])) {
	            model[attr] = Parse._parseDate(attrs[attr]);
	          } else {
	            model[attr] = attrs[attr];
	          }
	          delete attrs[attr];
	        }
	      });
	    },

	    /**
	     * Returns the json to be sent to the server.
	     */
	    _startSave: function() {
	      this._opSetQueue.push({});
	    },

	    /**
	     * Called when a save fails because of an error. Any changes that were part
	     * of the save need to be merged with changes made after the save. This
	     * might throw an exception is you do conflicting operations. For example,
	     * if you do:
	     *   object.set("foo", "bar");
	     *   object.set("invalid field name", "baz");
	     *   object.save();
	     *   object.increment("foo");
	     * then this will throw when the save fails and the client tries to merge
	     * "bar" with the +1.
	     */
	    _cancelSave: function() {
	      var self = this;
	      var failedChanges = _.first(this._opSetQueue);
	      this._opSetQueue = _.rest(this._opSetQueue);
	      var nextChanges = _.first(this._opSetQueue);
	      Parse._objectEach(failedChanges, function(op, key) {
	        var op1 = failedChanges[key];
	        var op2 = nextChanges[key];
	        if (op1 && op2) {
	          nextChanges[key] = op2._mergeWithPrevious(op1);
	        } else if (op1) {
	          nextChanges[key] = op1;
	        }
	      });
	      this._saving = this._saving - 1;
	    },

	    /**
	     * Called when a save completes successfully. This merges the changes that
	     * were saved into the known server data, and overrides it with any data
	     * sent directly from the server.
	     */
	    _finishSave: function(serverData) {
	      // Grab a copy of any object referenced by this object. These instances
	      // may have already been fetched, and we don't want to lose their data.
	      // Note that doing it like this means we will unify separate copies of the
	      // same object, but that's a risk we have to take.
	      var fetchedObjects = {};
	      Parse._traverse(this.attributes, function(object) {
	        if (object instanceof Parse.Object && object.id && object._hasData) {
	          fetchedObjects[object.id] = object;
	        }
	      });

	      var savedChanges = _.first(this._opSetQueue);
	      this._opSetQueue = _.rest(this._opSetQueue);
	      this._applyOpSet(savedChanges, this._serverData);
	      this._mergeMagicFields(serverData);
	      var self = this;
	      Parse._objectEach(serverData, function(value, key) {
	        self._serverData[key] = Parse._decode(key, value);

	        // Look for any objects that might have become unfetched and fix them
	        // by replacing their values with the previously observed values.
	        var fetched = Parse._traverse(self._serverData[key], function(object) {
	          if (object instanceof Parse.Object && fetchedObjects[object.id]) {
	            return fetchedObjects[object.id];
	          }
	        });
	        if (fetched) {
	          self._serverData[key] = fetched;
	        }
	      });
	      this._rebuildAllEstimatedData();
	      this._saving = this._saving - 1;
	    },

	    /**
	     * Called when a fetch or login is complete to set the known server data to
	     * the given object.
	     */
	    _finishFetch: function(serverData, hasData) {
	      // Clear out any changes the user might have made previously.
	      this._opSetQueue = [{}];

	      // Bring in all the new server data.
	      this._mergeMagicFields(serverData);
	      var self = this;
	      Parse._objectEach(serverData, function(value, key) {
	        self._serverData[key] = Parse._decode(key, value);
	      });

	      // Refresh the attributes.
	      this._rebuildAllEstimatedData();

	      // Clear out the cache of mutable containers.
	      this._refreshCache();
	      this._opSetQueue = [{}];

	      this._hasData = hasData;
	    },

	    /**
	     * Applies the set of Parse.Op in opSet to the object target.
	     */
	    _applyOpSet: function(opSet, target) {
	      var self = this;
	      Parse._objectEach(opSet, function(change, key) {
	        target[key] = change._estimate(target[key], self, key);
	        if (target[key] === Parse.Op._UNSET) {
	          delete target[key];
	        }
	      });
	    },

	    /**
	     * Replaces the cached value for key with the current value.
	     * Returns true if the new value is different than the old value.
	     */
	    _resetCacheForKey: function(key) {
	      var value = this.attributes[key];
	      if (_.isObject(value) &&
	          !(value instanceof Parse.Object) &&
	          !(value instanceof Parse.File)) {
	        value = value.toJSON ? value.toJSON() : value;
	        var json = JSON.stringify(value);
	        if (this._hashedJSON[key] !== json) {
	          this._hashedJSON[key] = json;
	          return true;
	        }
	      }
	      return false;
	    },

	    /**
	     * Populates attributes[key] by starting with the last known data from the
	     * server, and applying all of the local changes that have been made to that
	     * key since then.
	     */
	    _rebuildEstimatedDataForKey: function(key) {
	      var self = this;
	      delete this.attributes[key];
	      if (this._serverData[key]) {
	        this.attributes[key] = this._serverData[key];
	      }
	      Parse._arrayEach(this._opSetQueue, function(opSet) {
	        var op = opSet[key];
	        if (op) {
	          self.attributes[key] = op._estimate(self.attributes[key], self, key);
	          if (self.attributes[key] === Parse.Op._UNSET) {
	            delete self.attributes[key];
	          } else {
	            self._resetCacheForKey(key);
	          }
	        }
	      });
	    },

	    /**
	     * Populates attributes by starting with the last known data from the
	     * server, and applying all of the local changes that have been made since
	     * then.
	     */
	    _rebuildAllEstimatedData: function() {
	      var self = this;

	      var previousAttributes = _.clone(this.attributes);

	      this.attributes = _.clone(this._serverData);
	      Parse._arrayEach(this._opSetQueue, function(opSet) {
	        self._applyOpSet(opSet, self.attributes);
	        Parse._objectEach(opSet, function(op, key) {
	          self._resetCacheForKey(key);
	        });
	      });

	      // Trigger change events for anything that changed because of the fetch.
	      Parse._objectEach(previousAttributes, function(oldValue, key) {
	        if (self.attributes[key] !== oldValue) {
	          self.trigger('change:' + key, self, self.attributes[key], {});
	        }
	      });
	      Parse._objectEach(this.attributes, function(newValue, key) {
	        if (!_.has(previousAttributes, key)) {
	          self.trigger('change:' + key, self, newValue, {});
	        }
	      });
	    },

	    /**
	     * Sets a hash of model attributes on the object, firing
	     * <code>"change"</code> unless you choose to silence it.
	     *
	     * <p>You can call it with an object containing keys and values, or with one
	     * key and value.  For example:<pre>
	     *   gameTurn.set({
	     *     player: player1,
	     *     diceRoll: 2
	     *   }, {
	     *     error: function(gameTurnAgain, error) {
	     *       // The set failed validation.
	     *     }
	     *   });
	     *
	     *   game.set("currentPlayer", player2, {
	     *     error: function(gameTurnAgain, error) {
	     *       // The set failed validation.
	     *     }
	     *   });
	     *
	     *   game.set("finished", true);</pre></p>
	     *
	     * @param {String} key The key to set.
	     * @param {} value The value to give it.
	     * @param {Object} options A set of Backbone-like options for the set.
	     *     The only supported options are <code>silent</code>,
	     *     <code>error</code>, and <code>promise</code>.
	     * @return {Boolean} true if the set succeeded.
	     * @see Parse.Object#validate
	     * @see Parse.Error
	     */
	    set: function(key, value, options) {
	      var attrs, attr;
	      if (_.isObject(key) || Parse._isNullOrUndefined(key)) {
	        attrs = key;
	        Parse._objectEach(attrs, function(v, k) {
	          attrs[k] = Parse._decode(k, v);
	        });
	        options = value;
	      } else {
	        attrs = {};
	        attrs[key] = Parse._decode(key, value);
	      }

	      // Extract attributes and options.
	      options = options || {};
	      if (!attrs) {
	        return this;
	      }
	      if (attrs instanceof Parse.Object) {
	        attrs = attrs.attributes;
	      }

	      // If the unset option is used, every attribute should be a Unset.
	      if (options.unset) {
	        Parse._objectEach(attrs, function(unused_value, key) {
	          attrs[key] = new Parse.Op.Unset();
	        });
	      }

	      // Apply all the attributes to get the estimated values.
	      var dataToValidate = _.clone(attrs);
	      var self = this;
	      Parse._objectEach(dataToValidate, function(value, key) {
	        if (value instanceof Parse.Op) {
	          dataToValidate[key] = value._estimate(self.attributes[key],
	                                                self, key);
	          if (dataToValidate[key] === Parse.Op._UNSET) {
	            delete dataToValidate[key];
	          }
	        }
	      });

	      // Run validation.
	      if (!this._validate(attrs, options)) {
	        return false;
	      }

	      this._mergeMagicFields(attrs);

	      options.changes = {};
	      var escaped = this._escapedAttributes;
	      var prev = this._previousAttributes || {};

	      // Update attributes.
	      Parse._arrayEach(_.keys(attrs), function(attr) {
	        var val = attrs[attr];

	        // If this is a relation object we need to set the parent correctly,
	        // since the location where it was parsed does not have access to
	        // this object.
	        if (val instanceof Parse.Relation) {
	          val.parent = self;
	        }

	        if (!(val instanceof Parse.Op)) {
	          val = new Parse.Op.Set(val);
	        }

	        // See if this change will actually have any effect.
	        var isRealChange = true;
	        if (val instanceof Parse.Op.Set &&
	            _.isEqual(self.attributes[attr], val.value)) {
	          isRealChange = false;
	        }

	        if (isRealChange) {
	          delete escaped[attr];
	          if (options.silent) {
	            self._silent[attr] = true;
	          } else {
	            options.changes[attr] = true;
	          }
	        }

	        var currentChanges = _.last(self._opSetQueue);
	        currentChanges[attr] = val._mergeWithPrevious(currentChanges[attr]);
	        self._rebuildEstimatedDataForKey(attr);

	        if (isRealChange) {
	          self.changed[attr] = self.attributes[attr];
	          if (!options.silent) {
	            self._pending[attr] = true;
	          }
	        } else {
	          delete self.changed[attr];
	          delete self._pending[attr];
	        }
	      });

	      if (!options.silent) {
	        this.change(options);
	      }
	      return this;
	    },

	    /**
	     * Remove an attribute from the model, firing <code>"change"</code> unless
	     * you choose to silence it. This is a noop if the attribute doesn't
	     * exist.
	     */
	    unset: function(attr, options) {
	      options = options || {};
	      options.unset = true;
	      return this.set(attr, null, options);
	    },

	    /**
	     * Atomically increments the value of the given attribute the next time the
	     * object is saved. If no amount is specified, 1 is used by default.
	     *
	     * @param attr {String} The key.
	     * @param amount {Number} The amount to increment by.
	     */
	    increment: function(attr, amount) {
	      if (_.isUndefined(amount) || _.isNull(amount)) {
	        amount = 1;
	      }
	      return this.set(attr, new Parse.Op.Increment(amount));
	    },

	    /**
	     * Atomically add an object to the end of the array associated with a given
	     * key.
	     * @param attr {String} The key.
	     * @param item {} The item to add.
	     */
	    add: function(attr, item) {
	      return this.set(attr, new Parse.Op.Add([item]));
	    },

	    /**
	     * Atomically add an object to the array associated with a given key, only
	     * if it is not already present in the array. The position of the insert is
	     * not guaranteed.
	     *
	     * @param attr {String} The key.
	     * @param item {} The object to add.
	     */
	    addUnique: function(attr, item) {
	      return this.set(attr, new Parse.Op.AddUnique([item]));
	    },

	    /**
	     * Atomically remove all instances of an object from the array associated
	     * with a given key.
	     *
	     * @param attr {String} The key.
	     * @param item {} The object to remove.
	     */
	    remove: function(attr, item) {
	      return this.set(attr, new Parse.Op.Remove([item]));
	    },

	    /**
	     * Returns an instance of a subclass of Parse.Op describing what kind of
	     * modification has been performed on this field since the last time it was
	     * saved. For example, after calling object.increment("x"), calling
	     * object.op("x") would return an instance of Parse.Op.Increment.
	     *
	     * @param attr {String} The key.
	     * @returns {Parse.Op} The operation, or undefined if none.
	     */
	    op: function(attr) {
	      return _.last(this._opSetQueue)[attr];
	    },

	    /**
	     * Clear all attributes on the model, firing <code>"change"</code> unless
	     * you choose to silence it.
	     */
	    clear: function(options) {
	      options = options || {};
	      options.unset = true;
	      var keysToClear = _.extend(this.attributes, this._operations);
	      return this.set(keysToClear, options);
	    },

	    /**
	     * Returns a JSON-encoded set of operations to be sent with the next save
	     * request.
	     */
	    _getSaveJSON: function() {
	      var json = _.clone(_.first(this._opSetQueue));
	      Parse._objectEach(json, function(op, key) {
	        json[key] = op.toJSON();
	      });
	      return json;
	    },

	    /**
	     * Returns true if this object can be serialized for saving.
	     */
	    _canBeSerialized: function() {
	      return Parse.Object._canBeSerializedAsValue(this.attributes);
	    },

	    /**
	     * Fetch the model from the server. If the server's representation of the
	     * model differs from its current attributes, they will be overriden,
	     * triggering a <code>"change"</code> event.
	     * @return {Parse.Promise} A promise that is fulfilled when the fetch
	     *     completes.
	     */
	    fetch: function(options) {
	      var self = this;
	      var request = Parse._request("classes", this.className, this.id, 'GET');
	      return request.then(function(response, status, xhr) {
	        self._finishFetch(self.parse(response, status, xhr), true);
	        return self;
	      })._thenRunCallbacks(options, this);
	    },

	    /**
	     * Set a hash of model attributes, and save the model to the server.
	     * updatedAt will be updated when the request returns.
	     * You can either call it as:<pre>
	     *   object.save();</pre>
	     * or<pre>
	     *   object.save(null, options);</pre>
	     * or<pre>
	     *   object.save(attrs, options);</pre>
	     * or<pre>
	     *   object.save(key, value, options);</pre>
	     *
	     * For example, <pre>
	     *   gameTurn.save({
	     *     player: "Jake Cutter",
	     *     diceRoll: 2
	     *   }, {
	     *     success: function(gameTurnAgain) {
	     *       // The save was successful.
	     *     },
	     *     error: function(gameTurnAgain, error) {
	     *       // The save failed.  Error is an instance of Parse.Error.
	     *     }
	     *   });</pre>
	     * or with promises:<pre>
	     *   gameTurn.save({
	     *     player: "Jake Cutter",
	     *     diceRoll: 2
	     *   }).then(function(gameTurnAgain) {
	     *     // The save was successful.
	     *   }, function(error) {
	     *     // The save failed.  Error is an instance of Parse.Error.
	     *   });</pre>
	     *
	     * @return {Parse.Promise} A promise that is fulfilled when the save
	     *     completes.
	     * @see Parse.Error
	     */
	    save: function(arg1, arg2, arg3) {
	      var i, attrs, current, options, saved;
	      if (_.isObject(arg1) || Parse._isNullOrUndefined(arg1)) {
	        attrs = arg1;
	        options = arg2;
	      } else {
	        attrs = {};
	        attrs[arg1] = arg2;
	        options = arg3;
	      }

	      // Make save({ success: function() {} }) work.
	      if (!options && attrs) {
	        var extra_keys = _.reject(attrs, function(value, key) {
	          return _.include(["success", "error", "wait"], key);
	        });
	        if (extra_keys.length === 0) {
	          var all_functions = true;
	          if (_.has(attrs, "success") && !_.isFunction(attrs.success)) {
	            all_functions = false;
	          }
	          if (_.has(attrs, "error") && !_.isFunction(attrs.error)) {
	            all_functions = false;
	          }
	          if (all_functions) {
	            // This attrs object looks like it's really an options object,
	            // and there's no other options object, so let's just use it.
	            return this.save(null, attrs);
	          }
	        }
	      }

	      options = _.clone(options) || {};
	      if (options.wait) {
	        current = _.clone(this.attributes);
	      }

	      var setOptions = _.clone(options) || {};
	      if (setOptions.wait) {
	        setOptions.silent = true;
	      }
	      var setError;
	      setOptions.error = function(model, error) {
	        setError = error;
	      };
	      if (attrs && !this.set(attrs, setOptions)) {
	        return Parse.Promise.error(setError)._thenRunCallbacks(options, this);
	      }

	      var model = this;

	      // If there is any unsaved child, save it first.
	      model._refreshCache();

	      // TODO(klimt): Refactor this so that the save starts now, not later.

	      var unsavedChildren = [];
	      var unsavedFiles = [];
	      Parse.Object._findUnsavedChildren(model.attributes,
	                                        unsavedChildren,
	                                        unsavedFiles);
	      if (unsavedChildren.length + unsavedFiles.length > 0) {
	        return Parse.Object._deepSaveAsync(this.attributes).then(function() {
	          return model.save(null, options);
	        }, function(error) {
	          return Parse.Promise.error(error)._thenRunCallbacks(options, model);
	        });
	      }

	      this._startSave();
	      this._saving = (this._saving || 0) + 1;

	      this._allPreviousSaves = this._allPreviousSaves || Parse.Promise.as();
	      this._allPreviousSaves = this._allPreviousSaves._continueWith(function() {
	        var method = model.id ? 'PUT' : 'POST';

	        var json = model._getSaveJSON();

	        var route = "classes";
	        var className = model.className;
	        if (model.className === "_User" && !model.id) {
	          // Special-case user sign-up.
	          route = "users";
	          className = null;
	        }
	        var request = Parse._request(route, className, model.id, method, json);

	        request = request.then(function(resp, status, xhr) {
	          var serverAttrs = model.parse(resp, status, xhr);
	          if (options.wait) {
	            serverAttrs = _.extend(attrs || {}, serverAttrs);
	          }
	          model._finishSave(serverAttrs);
	          if (options.wait) {
	            model.set(current, setOptions);
	          }
	          return model;

	        }, function(error) {
	          model._cancelSave();
	          return Parse.Promise.error(error);

	        })._thenRunCallbacks(options, model);

	        return request;
	      });
	      return this._allPreviousSaves;
	    },

	    /**
	     * Destroy this model on the server if it was already persisted.
	     * Optimistically removes the model from its collection, if it has one.
	     * If `wait: true` is passed, waits for the server to respond
	     * before removal.
	     *
	     * @return {Parse.Promise} A promise that is fulfilled when the destroy
	     *     completes.
	     */
	    destroy: function(options) {
	      options = options || {};
	      var model = this;

	      var triggerDestroy = function() {
	        model.trigger('destroy', model, model.collection, options);
	      };

	      if (!this.id) {
	        return triggerDestroy();
	      }

	      if (!options.wait) {
	        triggerDestroy();
	      }

	      var request =
	          Parse._request("classes", this.className, this.id, 'DELETE');
	      return request.then(function() {
	        if (options.wait) {
	          triggerDestroy();
	        }
	        return model;
	      })._thenRunCallbacks(options, this);
	    },

	    /**
	     * Converts a response into the hash of attributes to be set on the model.
	     * @ignore
	     */
	    parse: function(resp, status, xhr) {
	      var output = _.clone(resp);
	      _(["createdAt", "updatedAt"]).each(function(key) {
	        if (output[key]) {
	          output[key] = Parse._parseDate(output[key]);
	        }
	      });
	      if (!output.updatedAt) {
	        output.updatedAt = output.createdAt;
	      }
	      if (status) {
	        this._existed = (status !== 201);
	      }
	      return output;
	    },

	    /**
	     * Creates a new model with identical attributes to this one.
	     * @return {Parse.Object}
	     */
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    /**
	     * Returns true if this object has never been saved to Parse.
	     * @return {Boolean}
	     */
	    isNew: function() {
	      return !this.id;
	    },

	    /**
	     * Call this method to manually fire a `"change"` event for this model and
	     * a `"change:attribute"` event for each changed attribute.
	     * Calling this will cause all objects observing the model to update.
	     */
	    change: function(options) {
	      options = options || {};
	      var changing = this._changing;
	      this._changing = true;

	      // Silent changes become pending changes.
	      var self = this;
	      Parse._objectEach(this._silent, function(attr) {
	        self._pending[attr] = true;
	      });

	      // Silent changes are triggered.
	      var changes = _.extend({}, options.changes, this._silent);
	      this._silent = {};
	      Parse._objectEach(changes, function(unused_value, attr) {
	        self.trigger('change:' + attr, self, self.get(attr), options);
	      });
	      if (changing) {
	        return this;
	      }

	      // This is to get around lint not letting us make a function in a loop.
	      var deleteChanged = function(value, attr) {
	        if (!self._pending[attr] && !self._silent[attr]) {
	          delete self.changed[attr];
	        }
	      };

	      // Continue firing `"change"` events while there are pending changes.
	      while (!_.isEmpty(this._pending)) {
	        this._pending = {};
	        this.trigger('change', this, options);
	        // Pending and silent changes still remain.
	        Parse._objectEach(this.changed, deleteChanged);
	        self._previousAttributes = _.clone(this.attributes);
	      }

	      this._changing = false;
	      return this;
	    },

	    /**
	     * Returns true if this object was created by the Parse server when the
	     * object might have already been there (e.g. in the case of a Facebook
	     * login)
	     */
	    existed: function() {
	      return this._existed;
	    },

	    /**
	     * Determine if the model has changed since the last <code>"change"</code>
	     * event.  If you specify an attribute name, determine if that attribute
	     * has changed.
	     * @param {String} attr Optional attribute name
	     * @return {Boolean}
	     */
	    hasChanged: function(attr) {
	      if (!arguments.length) {
	        return !_.isEmpty(this.changed);
	      }
	      return this.changed && _.has(this.changed, attr);
	    },

	    /**
	     * Returns an object containing all the attributes that have changed, or
	     * false if there are no changed attributes. Useful for determining what
	     * parts of a view need to be updated and/or what attributes need to be
	     * persisted to the server. Unset attributes will be set to undefined.
	     * You can also pass an attributes object to diff against the model,
	     * determining if there *would be* a change.
	     */
	    changedAttributes: function(diff) {
	      if (!diff) {
	        return this.hasChanged() ? _.clone(this.changed) : false;
	      }
	      var changed = {};
	      var old = this._previousAttributes;
	      Parse._objectEach(diff, function(diffVal, attr) {
	        if (!_.isEqual(old[attr], diffVal)) {
	          changed[attr] = diffVal;
	        }
	      });
	      return changed;
	    },

	    /**
	     * Gets the previous value of an attribute, recorded at the time the last
	     * <code>"change"</code> event was fired.
	     * @param {String} attr Name of the attribute to get.
	     */
	    previous: function(attr) {
	      if (!arguments.length || !this._previousAttributes) {
	        return null;
	      }
	      return this._previousAttributes[attr];
	    },

	    /**
	     * Gets all of the attributes of the model at the time of the previous
	     * <code>"change"</code> event.
	     * @return {Object}
	     */
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    /**
	     * Checks if the model is currently in a valid state. It's only possible to
	     * get into an *invalid* state if you're using silent changes.
	     * @return {Boolean}
	     */
	    isValid: function() {
	      return !this.validate(this.attributes);
	    },

	    /**
	     * You should not call this function directly unless you subclass
	     * <code>Parse.Object</code>, in which case you can override this method
	     * to provide additional validation on <code>set</code> and
	     * <code>save</code>.  Your implementation should return
	     *
	     * @param {Object} attrs The current data to validate.
	     * @param {Object} options A Backbone-like options object.
	     * @return {} False if the data is valid.  An error object otherwise.
	     * @see Parse.Object#set
	     */
	    validate: function(attrs, options) {
	      if (_.has(attrs, "ACL") && !(attrs.ACL instanceof Parse.ACL)) {
	        return new Parse.Error(Parse.Error.OTHER_CAUSE,
	                               "ACL must be a Parse.ACL.");
	      }
	      return false;
	    },

	    /**
	     * Run validation against a set of incoming attributes, returning `true`
	     * if all is well. If a specific `error` callback has been passed,
	     * call that instead of firing the general `"error"` event.
	     */
	    _validate: function(attrs, options) {
	      if (options.silent || !this.validate) {
	        return true;
	      }
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validate(attrs, options);
	      if (!error) {
	        return true;
	      }
	      if (options && options.error) {
	        options.error(this, error, options);
	      } else {
	        this.trigger('error', this, error, options);
	      }
	      return false;
	    },

	    /**
	     * Returns the ACL for this object.
	     * @returns {Parse.ACL} An instance of Parse.ACL.
	     * @see Parse.Object#get
	     */
	    getACL: function() {
	      return this.get("ACL");
	    },

	    /**
	     * Sets the ACL to be used for this object.
	     * @param {Parse.ACL} acl An instance of Parse.ACL.
	     * @param {Object} options Optional Backbone-like options object to be
	     *     passed in to set.
	     * @return {Boolean} Whether the set passed validation.
	     * @see Parse.Object#set
	     */
	    setACL: function(acl, options) {
	      return this.set("ACL", acl, options);
	    }

	  });

	  /**
	   * Returns the appropriate subclass for making new instances of the given
	   * className string.
	   */
	  Parse.Object._getSubclass = function(className) {
	    if (!_.isString(className)) {
	      throw "Parse.Object._getSubclass requires a string argument.";
	    }
	    var ObjectClass = Parse.Object._classMap[className];
	    if (!ObjectClass) {
	      ObjectClass = Parse.Object.extend(className);
	      Parse.Object._classMap[className] = ObjectClass;
	    }
	    return ObjectClass;
	  };

	  /**
	   * Creates an instance of a subclass of Parse.Object for the given classname.
	   */
	  Parse.Object._create = function(className, attributes, options) {
	    var ObjectClass = Parse.Object._getSubclass(className);
	    return new ObjectClass(attributes, options);
	  };

	  // Set up a map of className to class so that we can create new instances of
	  // Parse Objects from JSON automatically.
	  Parse.Object._classMap = {};

	  Parse.Object._extend = Parse._extend;

	  /**
	   * Creates a new subclass of Parse.Object for the given Parse class name.
	   *
	   * <p>Every extension of a Parse class will inherit from the most recent
	   * previous extension of that class. When a Parse.Object is automatically
	   * created by parsing JSON, it will use the most recent extension of that
	   * class.</p>
	   *
	   * <p>You should call either:<pre>
	   *     var MyClass = Parse.Object.extend("MyClass", {
	   *         <i>Instance properties</i>
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre>
	   * or, for Backbone compatibility:<pre>
	   *     var MyClass = Parse.Object.extend({
	   *         className: "MyClass",
	   *         <i>Other instance properties</i>
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre></p>
	   *
	   * @param {String} className The name of the Parse class backing this model.
	   * @param {Object} protoProps Instance properties to add to instances of the
	   *     class returned from this method.
	   * @param {Object} classProps Class properties to add the class returned from
	   *     this method.
	   * @return {Class} A new subclass of Parse.Object.
	   */
	  Parse.Object.extend = function(className, protoProps, classProps) {
	    // Handle the case with only two args.
	    if (!_.isString(className)) {
	      if (className && _.has(className, "className")) {
	        return Parse.Object.extend(className.className, className, protoProps);
	      } else {
	        throw new Error(
	            "Parse.Object.extend's first argument should be the className.");
	      }
	    }

	    // If someone tries to subclass "User", coerce it to the right type.
	    if (className === "User") {
	      className = "_User";
	    }

	    var NewClassObject = null;
	    if (_.has(Parse.Object._classMap, className)) {
	      var OldClassObject = Parse.Object._classMap[className];
	      // This new subclass has been told to extend both from "this" and from
	      // OldClassObject. This is multiple inheritance, which isn't supported.
	      // For now, let's just pick one.
	      NewClassObject = OldClassObject._extend(protoProps, classProps);
	    } else {
	      protoProps = protoProps || {};
	      protoProps.className = className;
	      NewClassObject = this._extend(protoProps, classProps);
	    }
	    // Extending a subclass should reuse the classname automatically.
	    NewClassObject.extend = function(arg0) {
	      if (_.isString(arg0) || (arg0 && _.has(arg0, "className"))) {
	        return Parse.Object.extend.apply(NewClassObject, arguments);
	      }
	      var newArguments = [className].concat(Parse._.toArray(arguments));
	      return Parse.Object.extend.apply(NewClassObject, newArguments);
	    };
	    Parse.Object._classMap[className] = NewClassObject;
	    return NewClassObject;
	  };

	  Parse.Object._findUnsavedChildren = function(object, children, files) {
	    Parse._traverse(object, function(object) {
	      if (object instanceof Parse.Object) {
	        object._refreshCache();
	        if (object.dirty()) {
	          children.push(object);
	        }
	        return;
	      }

	      if (object instanceof Parse.File) {
	        if (!object.url()) {
	          files.push(object);
	        }
	        return;
	      }
	    });
	  };

	  Parse.Object._canBeSerializedAsValue = function(object) {
	    var canBeSerializedAsValue = true;

	    if (object instanceof Parse.Object) {
	      canBeSerializedAsValue = !!object.id;

	    } else if (_.isArray(object)) {
	      Parse._arrayEach(object, function(child) {
	        if (!Parse.Object._canBeSerializedAsValue(child)) {
	          canBeSerializedAsValue = false;
	        }
	      });

	    } else if (_.isObject(object)) {
	      Parse._objectEach(object, function(child) {
	        if (!Parse.Object._canBeSerializedAsValue(child)) {
	          canBeSerializedAsValue = false;
	        }
	      });
	    }

	    return canBeSerializedAsValue;
	  };

	  Parse.Object._deepSaveAsync = function(object) {
	    var unsavedChildren = [];
	    var unsavedFiles = [];
	    Parse.Object._findUnsavedChildren(object, unsavedChildren, unsavedFiles);

	    var promise = Parse.Promise.as();
	    _.each(unsavedFiles, function(file) {
	      promise = promise.then(function() {
	        return file.save();
	      });
	    });

	    var objects = _.uniq(unsavedChildren);
	    var remaining = _.uniq(objects);

	    return promise.then(function() {
	      return Parse.Promise._continueWhile(function() {
	        return remaining.length > 0;
	      }, function() {

	        // Gather up all the objects that can be saved in this batch.
	        var batch = [];
	        var newRemaining = [];
	        Parse._arrayEach(remaining, function(object) {
	          // Limit batches to 20 objects.
	          if (batch.length > 20) {
	            newRemaining.push(object);
	            return;
	          }

	          if (object._canBeSerialized()) {
	            batch.push(object);
	          } else {
	            newRemaining.push(object);
	          }
	        });
	        remaining = newRemaining;

	        // If we can't save any objects, there must be a circular reference.
	        if (batch.length === 0) {
	          return Parse.Promise.error(
	            new Parse.Error(Parse.Error.OTHER_CAUSE,
	                            "Tried to save a batch with a cycle."));
	        }

	        // Reserve a spot in every object's save queue.
	        var readyToStart = Parse.Promise.when(_.map(batch, function(object) {
	          return object._allPreviousSaves || Parse.Promise.as();
	        }));
	        var batchFinished = new Parse.Promise();
	        Parse._arrayEach(batch, function(object) {
	          object._allPreviousSaves = batchFinished;
	        });

	        // Save a single batch, whether previous saves succeeded or failed.
	        return readyToStart._continueWith(function() {
	          return Parse._request("batch", null, null, "POST", {
	            requests: _.map(batch, function(object) {
	              var json = object._getSaveJSON();
	              var method = "POST";

	              var path = "/1/classes/" + object.className;
	              if (object.id) {
	                path = path + "/" + object.id;
	                method = "PUT";
	              }

	              object._startSave();

	              return {
	                method: method,
	                path: path,
	                body: json
	              };
	            })

	          }).then(function(response, status, xhr) {
	            var error;
	            Parse._arrayEach(batch, function(object, i) {
	              if (response[i].success) {
	                object._finishSave(
	                  object.parse(response[i].success, status, xhr));
	              } else {
	                error = error || response[i].error;
	                object._cancelSave();
	              }
	            });
	            if (error) {
	              return Parse.Promise.error(
	                new Parse.Error(error.code, error.error));
	            }

	          }).then(function(results) {
	            batchFinished.resolve(results);
	            return results;
	          }, function(error) {
	            batchFinished.reject(error);
	            return Parse.Promise.error(error);
	          });
	        });
	      });
	    }).then(function() {
	      return object;
	    });
	  };

	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Represents a Role on the Parse server. Roles represent groupings of
	   * Users for the purposes of granting permissions (e.g. specifying an ACL
	   * for an Object). Roles are specified by their sets of child users and
	   * child roles, all of which are granted any permissions that the parent
	   * role has.
	   *
	   * <p>Roles must have a name (which cannot be changed after creation of the
	   * role), and must specify an ACL.</p>
	   * @class
	   * A Parse.Role is a local representation of a role persisted to the Parse
	   * cloud.
	   */
	  Parse.Role = Parse.Object.extend("_Role", /** @lends Parse.Role.prototype */ {
	    // Instance Methods

	    /**
	     * Constructs a new ParseRole with the given name and ACL.
	     *
	     * @param {String} name The name of the Role to create.
	     * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
	     */
	    constructor: function(name, acl) {
	      if (_.isString(name) && (acl instanceof Parse.ACL)) {
	        Parse.Object.prototype.constructor.call(this, null, null);
	        this.setName(name);
	        this.setACL(acl);
	      } else {
	        Parse.Object.prototype.constructor.call(this, name, acl);
	      }
	    },

	    /**
	     * Gets the name of the role.  You can alternatively call role.get("name")
	     *
	     * @return {String} the name of the role.
	     */
	    getName: function() {
	      return this.get("name");
	    },

	    /**
	     * Sets the name for a role. This value must be set before the role has
	     * been saved to the server, and cannot be set once the role has been
	     * saved.
	     *
	     * <p>
	     *   A role's name can only contain alphanumeric characters, _, -, and
	     *   spaces.
	     * </p>
	     *
	     * <p>This is equivalent to calling role.set("name", name)</p>
	     *
	     * @param {String} name The name of the role.
	     * @param {Object} options Standard options object with success and error
	     *     callbacks.
	     */
	    setName: function(name, options) {
	      return this.set("name", name, options);
	    },

	    /**
	     * Gets the Parse.Relation for the Parse.Users that are direct
	     * children of this role. These users are granted any privileges that this
	     * role has been granted (e.g. read or write access through ACLs). You can
	     * add or remove users from the role through this relation.
	     *
	     * <p>This is equivalent to calling role.relation("users")</p>
	     *
	     * @return {Parse.Relation} the relation for the users belonging to this
	     *     role.
	     */
	    getUsers: function() {
	      return this.relation("users");
	    },

	    /**
	     * Gets the Parse.Relation for the Parse.Roles that are direct
	     * children of this role. These roles' users are granted any privileges that
	     * this role has been granted (e.g. read or write access through ACLs). You
	     * can add or remove child roles from this role through this relation.
	     *
	     * <p>This is equivalent to calling role.relation("roles")</p>
	     *
	     * @return {Parse.Relation} the relation for the roles belonging to this
	     *     role.
	     */
	    getRoles: function() {
	      return this.relation("roles");
	    },

	    /**
	     * @ignore
	     */
	    validate: function(attrs, options) {
	      if ("name" in attrs && attrs.name !== this.getName()) {
	        var newName = attrs.name;
	        if (this.id && this.id !== attrs.objectId) {
	          // Check to see if the objectId being set matches this.id.
	          // This happens during a fetch -- the id is set before calling fetch.
	          // Let the name be set in this case.
	          return new Parse.Error(Parse.Error.OTHER_CAUSE,
	              "A role's name can only be set before it has been saved.");
	        }
	        if (!_.isString(newName)) {
	          return new Parse.Error(Parse.Error.OTHER_CAUSE,
	              "A role's name must be a String.");
	        }
	        if (!(/^[0-9a-zA-Z\-_ ]+$/).test(newName)) {
	          return new Parse.Error(Parse.Error.OTHER_CAUSE,
	              "A role's name can only contain alphanumeric characters, _," +
	              " -, and spaces.");
	        }
	      }
	      if (Parse.Object.prototype.validate) {
	        return Parse.Object.prototype.validate.call(this, attrs, options);
	      }
	      return false;
	    }
	  });
	}(this));


	/*global _: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creates a new instance with the given models and options.  Typically, you
	   * will not call this method directly, but will instead make a subclass using
	   * <code>Parse.Collection.extend</code>.
	   *
	   * @param {Array} models An array of instances of <code>Parse.Object</code>.
	   *
	   * @param {Object} options An optional object with Backbone-style options.
	   * Valid options are:<ul>
	   *   <li>model: The Parse.Object subclass that this collection contains.
	   *   <li>query: An instance of Parse.Query to use when fetching items.
	   *   <li>comparator: A string property name or function to sort by.
	   * </ul>
	   *
	   * @see Parse.Collection.extend
	   *
	   * @class
	   *
	   * <p>Provides a standard collection class for our sets of models, ordered
	   * or unordered.  For more information, see the
	   * <a href="http://documentcloud.github.com/backbone/#Collection">Backbone
	   * documentation</a>.</p>
	   */
	  Parse.Collection = function(models, options) {
	    options = options || {};
	    if (options.comparator) {
	      this.comparator = options.comparator;
	    }
	    if (options.model) {
	      this.model = options.model;
	    }
	    if (options.query) {
	      this.query = options.query;
	    }
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) {
	      this.reset(models, {silent: true, parse: options.parse});
	    }
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Parse.Collection.prototype, Parse.Events,
	      /** @lends Parse.Collection.prototype */ {

	    // The default model for a collection is just a Parse.Object.
	    // This should be overridden in most cases.
	    // TODO: think harder. this is likely to be weird.
	    model: Parse.Object,

	    /**
	     * Initialize is an empty function by default. Override it with your own
	     * initialization logic.
	     */
	    initialize: function(){},

	    /**
	     * The JSON representation of a Collection is an array of the
	     * models' attributes.
	     */
	    toJSON: function() {
	      return this.map(function(model){ return model.toJSON(); });
	    },

	    /**
	     * Add a model, or list of models to the set. Pass **silent** to avoid
	     * firing the `add` event for every new model.
	     */
	    add: function(models, options) {
	      var i, index, length, model, cid, id, cids = {}, ids = {};
	      options = options || {};
	      models = _.isArray(models) ? models.slice() : [models];

	      // Begin by turning bare objects into model references, and preventing
	      // invalid models or duplicate models from being added.
	      for (i = 0, length = models.length; i < length; i++) {
	        models[i] = this._prepareModel(models[i], options);
	        model = models[i];
	        if (!model) {
	          throw new Error("Can't add an invalid model to a collection");
	        }
	        cid = model.cid;
	        if (cids[cid] || this._byCid[cid]) {
	          throw new Error("Duplicate cid: can't add the same model " +
	                          "to a collection twice");
	        }
	        id = model.id;
	        if (!Parse._isNullOrUndefined(id) && (ids[id] || this._byId[id])) {
	          throw new Error("Duplicate id: can't add the same model " +
	                          "to a collection twice");
	        }
	        ids[id] = model;
	        cids[cid] = model;
	      }

	      // Listen to added models' events, and index models for lookup by
	      // `id` and by `cid`.
	      for (i = 0; i < length; i++) {
	        (model = models[i]).on('all', this._onModelEvent, this);
	        this._byCid[model.cid] = model;
	        if (model.id) {
	          this._byId[model.id] = model;
	        }
	      }

	      // Insert models into the collection, re-sorting if needed, and triggering
	      // `add` events unless silenced.
	      this.length += length;
	      index = Parse._isNullOrUndefined(options.at) ?
	          this.models.length : options.at;
	      this.models.splice.apply(this.models, [index, 0].concat(models));
	      if (this.comparator) {
	        this.sort({silent: true});
	      }
	      if (options.silent) {
	        return this;
	      }
	      for (i = 0, length = this.models.length; i < length; i++) {
	        model = this.models[i];
	        if (cids[model.cid]) {
	          options.index = i;
	          model.trigger('add', model, this, options);
	        }
	      }
	      return this;
	    },

	    /**
	     * Remove a model, or a list of models from the set. Pass silent to avoid
	     * firing the <code>remove</code> event for every model removed.
	     */
	    remove: function(models, options) {
	      var i, l, index, model;
	      options = options || {};
	      models = _.isArray(models) ? models.slice() : [models];
	      for (i = 0, l = models.length; i < l; i++) {
	        model = this.getByCid(models[i]) || this.get(models[i]);
	        if (!model) {
	          continue;
	        }
	        delete this._byId[model.id];
	        delete this._byCid[model.cid];
	        index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;
	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }
	        this._removeReference(model);
	      }
	      return this;
	    },

	    /**
	     * Gets a model from the set by id.
	     */
	    get: function(id) {
	      return id && this._byId[id.id || id];
	    },

	    /**
	     * Gets a model from the set by client id.
	     */
	    getByCid: function(cid) {
	      return cid && this._byCid[cid.cid || cid];
	    },

	    /**
	     * Gets the model at the given index.
	     */
	    at: function(index) {
	      return this.models[index];
	    },

	    /**
	     * Forces the collection to re-sort itself. You don't need to call this
	     * under normal circumstances, as the set will maintain sort order as each
	     * item is added.
	     */
	    sort: function(options) {
	      options = options || {};
	      if (!this.comparator) {
	        throw new Error('Cannot sort a set without a comparator');
	      }
	      var boundComparator = _.bind(this.comparator, this);
	      if (this.comparator.length === 1) {
	        this.models = this.sortBy(boundComparator);
	      } else {
	        this.models.sort(boundComparator);
	      }
	      if (!options.silent) {
	        this.trigger('reset', this, options);
	      }
	      return this;
	    },

	    /**
	     * Plucks an attribute from each model in the collection.
	     */
	    pluck: function(attr) {
	      return _.map(this.models, function(model){ return model.get(attr); });
	    },

	    /**
	     * When you have more items than you want to add or remove individually,
	     * you can reset the entire set with a new list of models, without firing
	     * any `add` or `remove` events. Fires `reset` when finished.
	     */
	    reset: function(models, options) {
	      var self = this;
	      models = models || [];
	      options = options || {};
	      Parse._arrayEach(this.models, function(model) {
	        self._removeReference(model);
	      });
	      this._reset();
	      this.add(models, {silent: true, parse: options.parse});
	      if (!options.silent) {
	        this.trigger('reset', this, options);
	      }
	      return this;
	    },

	    /**
	     * Fetches the default set of models for this collection, resetting the
	     * collection when they arrive. If `add: true` is passed, appends the
	     * models to the collection instead of resetting.
	     */
	    fetch: function(options) {
	      options = _.clone(options) || {};
	      if (options.parse === undefined) {
	        options.parse = true;
	      }
	      var collection = this;
	      var query = this.query || new Parse.Query(this.model);
	      return query.find().then(function(results) {
	        if (options.add) {
	          collection.add(results, options);
	        } else {
	          collection.reset(results, options);
	        }
	        return collection;
	      })._thenRunCallbacks(options, this);
	    },

	    /**
	     * Creates a new instance of a model in this collection. Add the model to
	     * the collection immediately, unless `wait: true` is passed, in which case
	     * we wait for the server to agree.
	     */
	    create: function(model, options) {
	      var coll = this;
	      options = options ? _.clone(options) : {};
	      model = this._prepareModel(model, options);
	      if (!model) {
	        return false;
	      }
	      if (!options.wait) {
	        coll.add(model, options);
	      }
	      var success = options.success;
	      options.success = function(nextModel, resp, xhr) {
	        if (options.wait) {
	          coll.add(nextModel, options);
	        }
	        if (success) {
	          success(nextModel, resp);
	        } else {
	          nextModel.trigger('sync', model, resp, options);
	        }
	      };
	      model.save(null, options);
	      return model;
	    },

	    /**
	     * Converts a response into a list of models to be added to the collection.
	     * The default implementation is just to pass it through.
	     * @ignore
	     */
	    parse: function(resp, xhr) {
	      return resp;
	    },

	    /**
	     * Proxy to _'s chain. Can't be proxied the same way the rest of the
	     * underscore methods are proxied because it relies on the underscore
	     * constructor.
	     */
	    chain: function() {
	      return _(this.models).chain();
	    },

	    /**
	     * Reset all internal state. Called when the collection is reset.
	     */
	    _reset: function(options) {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	      this._byCid = {};
	    },

	    /**
	     * Prepare a model or hash of attributes to be added to this collection.
	     */
	    _prepareModel: function(model, options) {
	      if (!(model instanceof Parse.Object)) {
	        var attrs = model;
	        options.collection = this;
	        model = new this.model(attrs, options);
	        if (!model._validate(model.attributes, options)) {
	          model = false;
	        }
	      } else if (!model.collection) {
	        model.collection = this;
	      }
	      return model;
	    },

	    /**
	     * Internal method to remove a model's ties to a collection.
	     */
	    _removeReference: function(model) {
	      if (this === model.collection) {
	        delete model.collection;
	      }
	      model.off('all', this._onModelEvent, this);
	    },

	    /**
	     * Internal method called every time a model in the set fires an event.
	     * Sets need to update their indexes when models change ids. All other
	     * events simply proxy through. "add" and "remove" events that originate
	     * in other collections are ignored.
	     */
	    _onModelEvent: function(ev, model, collection, options) {
	      if ((ev === 'add' || ev === 'remove') && collection !== this) {
	        return;
	      }
	      if (ev === 'destroy') {
	        this.remove(model, options);
	      }
	      if (model && ev === 'change:objectId') {
	        delete this._byId[model.previous("objectId")];
	        this._byId[model.id] = model;
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
	    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
	    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
	    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
	    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  Parse._arrayEach(methods, function(method) {
	    Parse.Collection.prototype[method] = function() {
	      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
	    };
	  });

	  /**
	   * Creates a new subclass of <code>Parse.Collection</code>.  For example,<pre>
	   *   var MyCollection = Parse.Collection.extend({
	   *     // Instance properties
	   *
	   *     model: MyClass,
	   *     query: MyQuery,
	   *
	   *     getFirst: function() {
	   *       return this.at(0);
	   *     }
	   *   }, {
	   *     // Class properties
	   *
	   *     makeOne: function() {
	   *       return new MyCollection();
	   *     }
	   *   });
	   *
	   *   var collection = new MyCollection();
	   * </pre>
	   *
	   * @function
	   * @param {Object} instanceProps Instance properties for the collection.
	   * @param {Object} classProps Class properies for the collection.
	   * @return {Class} A new subclass of <code>Parse.Collection</code>.
	   */
	  Parse.Collection.extend = Parse._extend;

	}(this));

	/*global _: false, document: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creating a Parse.View creates its initial element outside of the DOM,
	   * if an existing element is not provided...
	   * @class
	   *
	   * <p>A fork of Backbone.View, provided for your convenience.  If you use this
	   * class, you must also include jQuery, or another library that provides a
	   * jQuery-compatible $ function.  For more information, see the
	   * <a href="http://documentcloud.github.com/backbone/#View">Backbone
	   * documentation</a>.</p>
	   * <p><strong><em>Available in the client SDK only.</em></strong></p>
	   */
	  Parse.View = function(options) {
	    this.cid = _.uniqueId('view');
	    this._configure(options || {});
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	    this.delegateEvents();
	  };

	  // Cached regex to split keys for `delegate`.
	  var eventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be merged as properties.
	  // TODO: include objectId, createdAt, updatedAt?
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes',
	                     'className', 'tagName'];

	  // Set up all inheritable **Parse.View** properties and methods.
	  _.extend(Parse.View.prototype, Parse.Events,
	           /** @lends Parse.View.prototype */ {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    /**
	     * jQuery delegate for element lookup, scoped to DOM elements within the
	     * current view. This should be prefered to global lookups where possible.
	     */
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    /**
	     * Initialize is an empty function by default. Override it with your own
	     * initialization logic.
	     */
	    initialize: function(){},

	    /**
	     * The core function that your view should override, in order
	     * to populate its element (`this.el`), with the appropriate HTML. The
	     * convention is for **render** to always return `this`.
	     */
	    render: function() {
	      return this;
	    },

	    /**
	     * Remove this view from the DOM. Note that the view isn't present in the
	     * DOM by default, so calling this method may be a no-op.
	     */
	    remove: function() {
	      this.$el.remove();
	      return this;
	    },

	    /**
	     * For small amounts of DOM Elements, where a full-blown template isn't
	     * needed, use **make** to manufacture elements, one at a time.
	     * <pre>
	     *     var el = this.make('li', {'class': 'row'},
	     *                        this.model.escape('title'));</pre>
	     */
	    make: function(tagName, attributes, content) {
	      var el = document.createElement(tagName);
	      if (attributes) {
	        Parse.$(el).attr(attributes);
	      }
	      if (content) {
	        Parse.$(el).html(content);
	      }
	      return el;
	    },

	    /**
	     * Changes the view's element (`this.el` property), including event
	     * re-delegation.
	     */
	    setElement: function(element, delegate) {
	      this.$el = Parse.$(element);
	      this.el = this.$el[0];
	      if (delegate !== false) {
	        this.delegateEvents();
	      }
	      return this;
	    },

	    /**
	     * Set callbacks.  <code>this.events</code> is a hash of
	     * <pre>
	     * *{"event selector": "callback"}*
	     *
	     *     {
	     *       'mousedown .title':  'edit',
	     *       'click .button':     'save'
	     *       'click .open':       function(e) { ... }
	     *     }
	     * </pre>
	     * pairs. Callbacks will be bound to the view, with `this` set properly.
	     * Uses event delegation for efficiency.
	     * Omitting the selector binds the event to `this.el`.
	     * This only works for delegate-able events: not `focus`, `blur`, and
	     * not `change`, `submit`, and `reset` in Internet Explorer.
	     */
	    delegateEvents: function(events) {
	      events = events || Parse._getValue(this, 'events');
	      if (!events) {
	        return;
	      }
	      this.undelegateEvents();
	      var self = this;
	      Parse._objectEach(events, function(method, key) {
	        if (!_.isFunction(method)) {
	          method = self[events[key]];
	        }
	        if (!method) {
	          throw new Error('Event "' + events[key] + '" does not exist');
	        }
	        var match = key.match(eventSplitter);
	        var eventName = match[1], selector = match[2];
	        method = _.bind(method, self);
	        eventName += '.delegateEvents' + self.cid;
	        if (selector === '') {
	          self.$el.bind(eventName, method);
	        } else {
	          self.$el.delegate(selector, eventName, method);
	        }
	      });
	    },

	    /**
	     * Clears all callbacks previously bound to the view with `delegateEvents`.
	     * You usually don't need to use this, but may wish to if you have multiple
	     * Backbone views attached to the same DOM element.
	     */
	    undelegateEvents: function() {
	      this.$el.unbind('.delegateEvents' + this.cid);
	    },

	    /**
	     * Performs the initial configuration of a View with a set of options.
	     * Keys with special meaning *(model, collection, id, className)*, are
	     * attached directly to the view.
	     */
	    _configure: function(options) {
	      if (this.options) {
	        options = _.extend({}, this.options, options);
	      }
	      var self = this;
	      _.each(viewOptions, function(attr) {
	        if (options[attr]) {
	          self[attr] = options[attr];
	        }
	      });
	      this.options = options;
	    },

	    /**
	     * Ensure that the View has a DOM element to render into.
	     * If `this.el` is a string, pass it through `$()`, take the first
	     * matching element, and re-assign it to `el`. Otherwise, create
	     * an element from the `id`, `className` and `tagName` properties.
	     */
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = Parse._getValue(this, 'attributes') || {};
	        if (this.id) {
	          attrs.id = this.id;
	        }
	        if (this.className) {
	          attrs['class'] = this.className;
	        }
	        this.setElement(this.make(this.tagName, attrs), false);
	      } else {
	        this.setElement(this.el, false);
	      }
	    }

	  });

	  /**
	   * @function
	   * @param {Object} instanceProps Instance properties for the view.
	   * @param {Object} classProps Class properies for the view.
	   * @return {Class} A new subclass of <code>Parse.View</code>.
	   */
	  Parse.View.extend = Parse._extend;

	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * @class
	   *
	   * <p>A Parse.User object is a local representation of a user persisted to the
	   * Parse cloud. This class is a subclass of a Parse.Object, and retains the
	   * same functionality of a Parse.Object, but also extends it with various
	   * user specific methods, like authentication, signing up, and validation of
	   * uniqueness.</p>
	   */
	  Parse.User = Parse.Object.extend("_User", /** @lends Parse.User.prototype */ {
	    // Instance Variables
	    _isCurrentUser: false,


	    // Instance Methods

	    /**
	     * Internal method to handle special fields in a _User response.
	     */
	    _mergeMagicFields: function(attrs) {
	      if (attrs.sessionToken) {
	        this._sessionToken = attrs.sessionToken;
	        delete attrs.sessionToken;
	      }
	      Parse.User.__super__._mergeMagicFields.call(this, attrs);
	    },

	    /**
	     * Removes null values from authData (which exist temporarily for
	     * unlinking)
	     */
	    _cleanupAuthData: function() {
	      if (!this.isCurrent()) {
	        return;
	      }
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }
	      Parse._objectEach(this.get('authData'), function(value, key) {
	        if (!authData[key]) {
	          delete authData[key];
	        }
	      });
	    },

	    /**
	     * Synchronizes authData for all providers.
	     */
	    _synchronizeAllAuthData: function() {
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }

	      var self = this;
	      Parse._objectEach(this.get('authData'), function(value, key) {
	        self._synchronizeAuthData(key);
	      });
	    },

	    /**
	     * Synchronizes auth data for a provider (e.g. puts the access token in the
	     * right place to be used by the Facebook SDK).
	     */
	    _synchronizeAuthData: function(provider) {
	      if (!this.isCurrent()) {
	        return;
	      }
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	        provider = Parse.User._authProviders[authType];
	      } else {
	        authType = provider.getAuthType();
	      }
	      var authData = this.get('authData');
	      if (!authData || !provider) {
	        return;
	      }
	      var success = provider.restoreAuthentication(authData[authType]);
	      if (!success) {
	        this._unlinkFrom(provider);
	      }
	    },

	    _handleSaveResult: function(makeCurrent) {
	      // Clean up and synchronize the authData object, removing any unset values
	      if (makeCurrent) {
	        this._isCurrentUser = true;
	      }
	      this._cleanupAuthData();
	      this._synchronizeAllAuthData();
	      // Don't keep the password around.
	      delete this._serverData.password;
	      this._rebuildEstimatedDataForKey("password");
	      this._refreshCache();
	      if (makeCurrent || this.isCurrent()) {
	        Parse.User._saveCurrentUser(this);
	      }
	    },

	    /**
	     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
	     * call linkWith on the user (even if it doesn't exist yet on the server).
	     */
	    _linkWith: function(provider, options) {
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	        provider = Parse.User._authProviders[provider];
	      } else {
	        authType = provider.getAuthType();
	      }
	      if (_.has(options, 'authData')) {
	        var authData = this.get('authData') || {};
	        authData[authType] = options.authData;
	        this.set('authData', authData);

	        // Overridden so that the user can be made the current user.
	        var newOptions = _.clone(options) || {};
	        newOptions.success = function(model) {
	          model._handleSaveResult(true);
	          if (options.success) {
	            options.success.apply(this, arguments);
	          }
	        };
	        return this.save({'authData': authData}, newOptions);
	      } else {
	        var self = this;
	        var promise = new Parse.Promise();
	        provider.authenticate({
	          success: function(provider, result) {
	            self._linkWith(provider, {
	              authData: result,
	              success: options.success,
	              error: options.error
	            }).then(function() {
	              promise.resolve(self);
	            });
	          },
	          error: function(provider, error) {
	            if (options.error) {
	              options.error(self, error);
	            }
	            promise.reject(error);
	          }
	        });
	        return promise;
	      }
	    },

	    /**
	     * Unlinks a user from a service.
	     */
	    _unlinkFrom: function(provider, options) {
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	        provider = Parse.User._authProviders[provider];
	      } else {
	        authType = provider.getAuthType();
	      }
	      var newOptions = _.clone(options);
	      var self = this;
	      newOptions.authData = null;
	      newOptions.success = function(model) {
	        self._synchronizeAuthData(provider);
	        if (options.success) {
	          options.success.apply(this, arguments);
	        }
	      };
	      return this._linkWith(provider, newOptions);
	    },

	    /**
	     * Checks whether a user is linked to a service.
	     */
	    _isLinked: function(provider) {
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	      } else {
	        authType = provider.getAuthType();
	      }
	      var authData = this.get('authData') || {};
	      return !!authData[authType];
	    },

	    /**
	     * Deauthenticates all providers.
	     */
	    _logOutWithAll: function() {
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }
	      var self = this;
	      Parse._objectEach(this.get('authData'), function(value, key) {
	        self._logOutWith(key);
	      });
	    },

	    /**
	     * Deauthenticates a single provider (e.g. removing access tokens from the
	     * Facebook SDK).
	     */
	    _logOutWith: function(provider) {
	      if (!this.isCurrent()) {
	        return;
	      }
	      if (_.isString(provider)) {
	        provider = Parse.User._authProviders[provider];
	      }
	      if (provider && provider.deauthenticate) {
	        provider.deauthenticate();
	      }
	    },

	    /**
	     * Signs up a new user. You should call this instead of save for
	     * new Parse.Users. This will create a new Parse.User on the server, and
	     * also persist the session on disk so that you can access the user using
	     * <code>current</code>.
	     *
	     * <p>A username and password must be set before calling signUp.</p>
	     *
	     * <p>Calls options.success or options.error on completion.</p>
	     *
	     * @param {Object} attrs Extra fields to set on the new user, or null.
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is fulfilled when the signup
	     *     finishes.
	     * @see Parse.User.signUp
	     */
	    signUp: function(attrs, options) {
	      var error;
	      options = options || {};

	      var username = (attrs && attrs.username) || this.get("username");
	      if (!username || (username === "")) {
	        error = new Parse.Error(
	            Parse.Error.OTHER_CAUSE,
	            "Cannot sign up user with an empty name.");
	        if (options && options.error) {
	          options.error(this, error);
	        }
	        return Parse.Promise.error(error);
	      }

	      var password = (attrs && attrs.password) || this.get("password");
	      if (!password || (password === "")) {
	        error = new Parse.Error(
	            Parse.Error.OTHER_CAUSE,
	            "Cannot sign up user with an empty password.");
	        if (options && options.error) {
	          options.error(this, error);
	        }
	        return Parse.Promise.error(error);
	      }

	      // Overridden so that the user can be made the current user.
	      var newOptions = _.clone(options);
	      newOptions.success = function(model) {
	        model._handleSaveResult(true);
	        if (options.success) {
	          options.success.apply(this, arguments);
	        }
	      };
	      return this.save(attrs, newOptions);
	    },

	    /**
	     * Logs in a Parse.User. On success, this saves the session to localStorage,
	     * so you can retrieve the currently logged in user using
	     * <code>current</code>.
	     *
	     * <p>A username and password must be set before calling logIn.</p>
	     *
	     * <p>Calls options.success or options.error on completion.</p>
	     *
	     * @param {Object} options A Backbone-style options object.
	     * @see Parse.User.logIn
	     * @return {Parse.Promise} A promise that is fulfilled with the user when
	     *     the login is complete.
	     */
	    logIn: function(options) {
	      var model = this;
	      var request = Parse._request("login", null, null, "GET", this.toJSON());
	      return request.then(function(resp, status, xhr) {
	        var serverAttrs = model.parse(resp, status, xhr);
	        model._finishFetch(serverAttrs);
	        model._handleSaveResult(true);
	        return model;
	      })._thenRunCallbacks(options, this);
	    },

	    /**
	     * @see Parse.Object#save
	     */
	    save: function(arg1, arg2, arg3) {
	      var i, attrs, current, options, saved;
	      if (_.isObject(arg1) || _.isNull(arg1) || _.isUndefined(arg1)) {
	        attrs = arg1;
	        options = arg2;
	      } else {
	        attrs = {};
	        attrs[arg1] = arg2;
	        options = arg3;
	      }
	      options = options || {};

	      var newOptions = _.clone(options);
	      newOptions.success = function(model) {
	        model._handleSaveResult(false);
	        if (options.success) {
	          options.success.apply(this, arguments);
	        }
	      };
	      return Parse.Object.prototype.save.call(this, attrs, newOptions);
	    },

	    /**
	     * @see Parse.Object#fetch
	     */
	    fetch: function(options) {
	      var newOptions = options ? _.clone(options) : {};
	      newOptions.success = function(model) {
	        model._handleSaveResult(false);
	        if (options && options.success) {
	          options.success.apply(this, arguments);
	        }
	      };
	      return Parse.Object.prototype.fetch.call(this, newOptions);
	    },

	    /**
	     * Returns true if <code>current</code> would return this user.
	     * @see Parse.User#current
	     */
	    isCurrent: function() {
	      return this._isCurrentUser;
	    },

	    /**
	     * Returns get("username").
	     * @return {String}
	     * @see Parse.Object#get
	     */
	    getUsername: function() {
	      return this.get("username");
	    },

	    /**
	     * Calls set("username", username, options) and returns the result.
	     * @param {String} username
	     * @param {Object} options A Backbone-style options object.
	     * @return {Boolean}
	     * @see Parse.Object.set
	     */
	    setUsername: function(username, options) {
	      return this.set("username", username, options);
	    },

	    /**
	     * Calls set("password", password, options) and returns the result.
	     * @param {String} password
	     * @param {Object} options A Backbone-style options object.
	     * @return {Boolean}
	     * @see Parse.Object.set
	     */
	    setPassword: function(password, options) {
	      return this.set("password", password, options);
	    },

	    /**
	     * Returns get("email").
	     * @return {String}
	     * @see Parse.Object#get
	     */
	    getEmail: function() {
	      return this.get("email");
	    },

	    /**
	     * Calls set("email", email, options) and returns the result.
	     * @param {String} email
	     * @param {Object} options A Backbone-style options object.
	     * @return {Boolean}
	     * @see Parse.Object.set
	     */
	    setEmail: function(email, options) {
	      return this.set("email", email, options);
	    },

	    /**
	     * Checks whether this user is the current user and has been authenticated.
	     * @return (Boolean) whether this user is the current user and is logged in.
	     */
	    authenticated: function() {
	      return !!this._sessionToken &&
	          (Parse.User.current() && Parse.User.current().id === this.id);
	    }

	  }, /** @lends Parse.User */ {
	    // Class Variables

	    // The currently logged-in user.
	    _currentUser: null,

	    // Whether currentUser is known to match the serialized version on disk.
	    // This is useful for saving a localstorage check if you try to load
	    // _currentUser frequently while there is none stored.
	    _currentUserMatchesDisk: false,

	    // The localStorage key suffix that the current user is stored under.
	    _CURRENT_USER_KEY: "currentUser",

	    // The mapping of auth provider names to actual providers
	    _authProviders: {},


	    // Class Methods

	    /**
	     * Signs up a new user with a username (or email) and password.
	     * This will create a new Parse.User on the server, and also persist the
	     * session in localStorage so that you can access the user using
	     * {@link #current}.
	     *
	     * <p>Calls options.success or options.error on completion.</p>
	     *
	     * @param {String} username The username (or email) to sign up with.
	     * @param {String} password The password to sign up with.
	     * @param {Object} attrs Extra fields to set on the new user.
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is fulfilled with the user when
	     *     the signup completes.
	     * @see Parse.User#signUp
	     */
	    signUp: function(username, password, attrs, options) {
	      attrs = attrs || {};
	      attrs.username = username;
	      attrs.password = password;
	      var user = Parse.Object._create("_User");
	      return user.signUp(attrs, options);
	    },

	    /**
	     * Logs in a user with a username (or email) and password. On success, this
	     * saves the session to disk, so you can retrieve the currently logged in
	     * user using <code>current</code>.
	     *
	     * <p>Calls options.success or options.error on completion.</p>
	     *
	     * @param {String} username The username (or email) to log in with.
	     * @param {String} password The password to log in with.
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @see Parse.User#logIn
	     */
	    logIn: function(username, password, options) {
	      var user = Parse.Object._create("_User");
	      user._finishFetch({ username: username, password: password });
	      return user.logIn(options);
	    },

	    /**
	     * Logs out the currently logged in user session. This will remove the
	     * session from disk, log out of linked services, and future calls to
	     * <code>current</code> will return <code>null</code>.
	     */
	    logOut: function() {
	      if (Parse.User._currentUser !== null) {
	        Parse.User._currentUser._logOutWithAll();
	        Parse.User._currentUser._isCurrentUser = false;
	      }
	      Parse.User._currentUserMatchesDisk = true;
	      Parse.User._currentUser = null;
	      Parse.localStorage.removeItem(
	          Parse._getParsePath(Parse.User._CURRENT_USER_KEY));
	    },

	    /**
	     * Requests a password reset email to be sent to the specified email address
	     * associated with the user account. This email allows the user to securely
	     * reset their password on the Parse site.
	     *
	     * <p>Calls options.success or options.error on completion.</p>
	     *
	     * @param {String} email The email address associated with the user that
	     *     forgot their password.
	     * @param {Object} options A Backbone-style options object.
	     */
	    requestPasswordReset: function(email, options) {
	      var json = { email: email };
	      var request = Parse._request("requestPasswordReset", null, null, "POST",
	                                   json);
	      return request._thenRunCallbacks(options);
	    },

	    /**
	     * Retrieves the currently logged in ParseUser with a valid session,
	     * either from memory or localStorage, if necessary.
	     * @return {Parse.Object} The currently logged in Parse.User.
	     */
	    current: function() {
	      if (Parse.User._currentUser) {
	        return Parse.User._currentUser;
	      }

	      if (Parse.User._currentUserMatchesDisk) {
	        // TODO: Lazily log in anonymous user.
	        return Parse.User._currentUser;
	      }

	      // Load the user from local storage.
	      Parse.User._currentUserMatchesDisk = true;

	      var userData = Parse.localStorage.getItem(Parse._getParsePath(
	          Parse.User._CURRENT_USER_KEY));
	      if (!userData) {
	        // TODO: Lazily log in anonymous user.
	        return null;
	      }
	      Parse.User._currentUser = Parse.Object._create("_User");
	      Parse.User._currentUser._isCurrentUser = true;

	      var json = JSON.parse(userData);
	      Parse.User._currentUser.id = json._id;
	      delete json._id;
	      Parse.User._currentUser._sessionToken = json._sessionToken;
	      delete json._sessionToken;
	      Parse.User._currentUser.set(json);

	      Parse.User._currentUser._synchronizeAllAuthData();
	      Parse.User._currentUser._refreshCache();
	      Parse.User._currentUser._opSetQueue = [{}];
	      return Parse.User._currentUser;
	    },

	    /**
	     * Persists a user as currentUser to localStorage, and into the singleton.
	     */
	    _saveCurrentUser: function(user) {
	      if (Parse.User._currentUser !== user) {
	        Parse.User.logOut();
	      }
	      user._isCurrentUser = true;
	      Parse.User._currentUser = user;
	      Parse.User._currentUserMatchesDisk = true;

	      var json = user.toJSON();
	      json._id = user.id;
	      json._sessionToken = user._sessionToken;
	      Parse.localStorage.setItem(
	          Parse._getParsePath(Parse.User._CURRENT_USER_KEY),
	          JSON.stringify(json));
	    },

	    _registerAuthenticationProvider: function(provider) {
	      Parse.User._authProviders[provider.getAuthType()] = provider;
	      // Synchronize the current user with the auth provider.
	      if (Parse.User.current()) {
	        Parse.User.current()._synchronizeAuthData(provider.getAuthType());
	      }
	    },

	    _logInWith: function(provider, options) {
	      var user = Parse.Object._create("_User");
	      return user._linkWith(provider, options);
	    }

	  });
	}(this));


	// Parse.Query is a way to create a list of Parse.Objects.
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Creates a new parse Parse.Query for the given Parse.Object subclass.
	   * @param objectClass -
	   *   An instance of a subclass of Parse.Object, or a Parse className string.
	   * @class
	   *
	   * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
	   * most common use case is finding all objects that match a query through the
	   * <code>find</code> method. For example, this sample code fetches all objects
	   * of class <code>MyClass</code>. It calls a different function depending on
	   * whether the fetch succeeded or not.
	   *
	   * <pre>
	   * var query = new Parse.Query(MyClass);
	   * query.find({
	   *   success: function(results) {
	   *     // results is an array of Parse.Object.
	   *   },
	   *
	   *   error: function(error) {
	   *     // error is an instance of Parse.Error.
	   *   }
	   * });</pre></p>
	   *
	   * <p>A Parse.Query can also be used to retrieve a single object whose id is
	   * known, through the get method. For example, this sample code fetches an
	   * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
	   * different function depending on whether the fetch succeeded or not.
	   *
	   * <pre>
	   * var query = new Parse.Query(MyClass);
	   * query.get(myId, {
	   *   success: function(object) {
	   *     // object is an instance of Parse.Object.
	   *   },
	   *
	   *   error: function(object, error) {
	   *     // error is an instance of Parse.Error.
	   *   }
	   * });</pre></p>
	   *
	   * <p>A Parse.Query can also be used to count the number of objects that match
	   * the query without retrieving all of those objects. For example, this
	   * sample code counts the number of objects of the class <code>MyClass</code>
	   * <pre>
	   * var query = new Parse.Query(MyClass);
	   * query.count({
	   *   success: function(number) {
	   *     // There are number instances of MyClass.
	   *   },
	   *
	   *   error: function(error) {
	   *     // error is an instance of Parse.Error.
	   *   }
	   * });</pre></p>
	   */
	  Parse.Query = function(objectClass) {
	    if (_.isString(objectClass)) {
	      objectClass = Parse.Object._getSubclass(objectClass);
	    }

	    this.objectClass = objectClass;

	    this.className = objectClass.prototype.className;

	    this._where = {};
	    this._include = [];
	    this._limit = -1; // negative limit means, do not send a limit
	    this._skip = 0;
	    this._extraOptions = {};
	  };

	  /**
	   * Constructs a Parse.Query that is the OR of the passed in queries.  For
	   * example:
	   * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
	   *
	   * will create a compoundQuery that is an or of the query1, query2, and
	   * query3.
	   * @param {...Parse.Query} var_args The list of queries to OR.
	   * @return {Parse.Query} The query that is the OR of the passed in queries.
	   */
	  Parse.Query.or = function() {
	    var queries = _.toArray(arguments);
	    var className = null;
	    Parse._arrayEach(queries, function(q) {
	      if (_.isNull(className)) {
	        className = q.className;
	      }

	      if (className !== q.className) {
	        throw "All queries must be for the same class";
	      }
	    });
	    var query = new Parse.Query(className);
	    query._orQuery(queries);
	    return query;
	  };

	  Parse.Query.prototype = {
	    /**
	     * Constructs a Parse.Object whose id is already known by fetching data from
	     * the server.  Either options.success or options.error is called when the
	     * find completes.
	     *
	     * @param {} objectId The id of the object to be fetched.
	     * @param {Object} options A Backbone-style options object.
	     */
	    get: function(objectId, options) {
	      var self = this;
	      self.equalTo('objectId', objectId);

	      return self.first().then(function(response) {
	        if (response) {
	          return response;
	        }

	        var errorObject = new Parse.Error(Parse.Error.OBJECT_NOT_FOUND,
	                                          "Object not found.");
	        return Parse.Promise.error(errorObject);

	      })._thenRunCallbacks(options, null);
	    },

	    /**
	     * Returns a JSON representation of this query.
	     * @return {Object}
	     */
	    toJSON: function() {
	      var params = {
	        where: this._where
	      };

	      if (this._include.length > 0) {
	        params.include = this._include.join(",");
	      }
	      if (this._select) {
	        params.keys = this._select.join(",");
	      }
	      if (this._limit >= 0) {
	        params.limit = this._limit;
	      }
	      if (this._skip > 0) {
	        params.skip = this._skip;
	      }
	      if (this._order !== undefined) {
	        params.order = this._order;
	      }

	      Parse._objectEach(this._extraOptions, function(v, k) {
	        params[k] = v;
	      });

	      return params;
	    },

	    /**
	     * Retrieves a list of ParseObjects that satisfy this query.
	     * Either options.success or options.error is called when the find
	     * completes.
	     *
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is resolved with the results when
	     * the query completes.
	     */
	    find: function(options) {
	      var self = this;

	      var request = Parse._request("classes", this.className, null, "GET",
	                                   this.toJSON());

	      return request.then(function(response) {
	        return _.map(response.results, function(json) {
	          var obj;
	          if (response.className) {
	            obj = new Parse.Object(response.className);
	          } else {
	            obj = new self.objectClass();
	          }
	          obj._finishFetch(json, true);
	          return obj;
	        });
	      })._thenRunCallbacks(options);
	    },

	    /**
	     * Counts the number of objects that match this query.
	     * Either options.success or options.error is called when the count
	     * completes.
	     *
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is resolved with the count when
	     * the query completes.
	     */
	    count: function(options) {
	      var params = this.toJSON();
	      params.limit = 0;
	      params.count = 1;
	      var request = Parse._request("classes", this.className, null, "GET",
	                                   params);

	      return request.then(function(response) {
	        return response.count;
	      })._thenRunCallbacks(options);
	    },

	    /**
	     * Retrieves at most one Parse.Object that satisfies this query.
	     *
	     * Either options.success or options.error is called when it completes.
	     * success is passed the object if there is one. otherwise, undefined.
	     *
	     * @param {Object} options A Backbone-style options object.
	     * @return {Parse.Promise} A promise that is resolved with the object when
	     * the query completes.
	     */
	    first: function(options) {
	      var self = this;

	      var params = this.toJSON();
	      params.limit = 1;
	      var request = Parse._request("classes", this.className, null, "GET",
	                                   params);

	      return request.then(function(response) {
	        return _.map(response.results, function(json) {
	          var obj = new self.objectClass();
	          obj._finishFetch(json, true);
	          return obj;
	        })[0];
	      })._thenRunCallbacks(options);
	    },

	    /**
	     * Returns a new instance of Parse.Collection backed by this query.
	     * @return {Parse.Collection}
	     */
	    collection: function(items, options) {
	      options = options || {};
	      return new Parse.Collection(items, _.extend(options, {
	        model: this.objectClass,
	        query: this
	      }));
	    },

	    /**
	     * Sets the number of results to skip before returning any results.
	     * This is useful for pagination.
	     * Default is to skip zero results.
	     * @param {Number} n the number of results to skip.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    skip: function(n) {
	      this._skip = n;
	      return this;
	    },

	    /**
	     * Sets the limit of the number of results to return. The default limit is
	     * 100, with a maximum of 1000 results being returned at a time.
	     * @param {Number} n the number of results to limit to.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    limit: function(n) {
	      this._limit = n;
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that the Parse.Object must contain.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    equalTo: function(key, value) {
	      this._where[key] = Parse._encode(value);
	      return this;
	    },

	    /**
	     * Helper for condition queries
	     */
	    _addCondition: function(key, condition, value) {
	      // Check if we already have a condition
	      if (!this._where[key]) {
	        this._where[key] = {};
	      }
	      this._where[key][condition] = Parse._encode(value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be not equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that must not be equalled.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    notEqualTo: function(key, value) {
	      this._addCondition(key, "$ne", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be less than the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an upper bound.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    lessThan: function(key, value) {
	      this._addCondition(key, "$lt", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be greater than the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an lower bound.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    greaterThan: function(key, value) {
	      this._addCondition(key, "$gt", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be less than or equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an upper bound.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    lessThanOrEqualTo: function(key, value) {
	      this._addCondition(key, "$lte", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be greater than or equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an lower bound.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    greaterThanOrEqualTo: function(key, value) {
	      this._addCondition(key, "$gte", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be contained in the provided list of values.
	     * @param {String} key The key to check.
	     * @param {Array} values The values that will match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    containedIn: function(key, values) {
	      this._addCondition(key, "$in", values);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * not be contained in the provided list of values.
	     * @param {String} key The key to check.
	     * @param {Array} values The values that will not match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    notContainedIn: function(key, values) {
	      this._addCondition(key, "$nin", values);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * contain each one of the provided list of values.
	     * @param {String} key The key to check.  This key's value must be an array.
	     * @param {Array} values The values that will match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    containsAll: function(key, values) {
	      this._addCondition(key, "$all", values);
	      return this;
	    },


	    /**
	     * Add a constraint for finding objects that contain the given key.
	     * @param {String} key The key that should exist.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    exists: function(key) {
	      this._addCondition(key, "$exists", true);
	      return this;
	    },

	    /**
	     * Add a constraint for finding objects that do not contain a given key.
	     * @param {String} key The key that should not exist
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    doesNotExist: function(key) {
	      this._addCondition(key, "$exists", false);
	      return this;
	    },

	    /**
	     * Add a regular expression constraint for finding string values that match
	     * the provided regular expression.
	     * This may be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {RegExp} regex The regular expression pattern to match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    matches: function(key, regex, modifiers) {
	      this._addCondition(key, "$regex", regex);
	      if (!modifiers) { modifiers = ""; }
	      // Javascript regex options support mig as inline options but store them
	      // as properties of the object. We support mi & should migrate them to
	      // modifiers
	      if (regex.ignoreCase) { modifiers += 'i'; }
	      if (regex.multiline) { modifiers += 'm'; }

	      if (modifiers && modifiers.length) {
	        this._addCondition(key, "$options", modifiers);
	      }
	      return this;
	    },

	    /**
	     * Add a constraint that requires that a key's value matches a Parse.Query
	     * constraint.
	     * @param {String} key The key that the contains the object to match the
	     *                     query.
	     * @param {Parse.Query} query The query that should match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    matchesQuery: function(key, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$inQuery", queryJSON);
	      return this;
	    },

	   /**
	     * Add a constraint that requires that a key's value not matches a
	     * Parse.Query constraint.
	     * @param {String} key The key that the contains the object to match the
	     *                     query.
	     * @param {Parse.Query} query The query that should not match.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    doesNotMatchQuery: function(key, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$notInQuery", queryJSON);
	      return this;
	    },


	    /**
	     * Add a constraint that requires that a key's value matches a value in
	     * an object returned by a different Parse.Query.
	     * @param {String} key The key that contains the value that is being
	     *                     matched.
	     * @param {String} queryKey The key in the objects returned by the query to
	     *                          match against.
	     * @param {Parse.Query} query The query to run.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    matchesKeyInQuery: function(key, queryKey, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$select",
	                         { key: queryKey, query: queryJSON });
	      return this;
	    },

	    /**
	     * Add a constraint that requires that a key's value not match a value in
	     * an object returned by a different Parse.Query.
	     * @param {String} key The key that contains the value that is being
	     *                     excluded.
	     * @param {String} queryKey The key in the objects returned by the query to
	     *                          match against.
	     * @param {Parse.Query} query The query to run.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    doesNotMatchKeyInQuery: function(key, queryKey, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$dontSelect",
	                         { key: queryKey, query: queryJSON });
	      return this;
	    },

	    /**
	     * Add constraint that at least one of the passed in queries matches.
	     * @param {Array} queries
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    _orQuery: function(queries) {
	      var queryJSON = _.map(queries, function(q) {
	        return q.toJSON().where;
	      });

	      this._where.$or = queryJSON;
	      return this;
	    },

	    /**
	     * Converts a string into a regex that matches it.
	     * Surrounding with \Q .. \E does this, we just need to escape \E's in
	     * the text separately.
	     */
	    _quote: function(s) {
	      return "\\Q" + s.replace("\\E", "\\E\\\\E\\Q") + "\\E";
	    },

	    /**
	     * Add a constraint for finding string values that contain a provided
	     * string.  This may be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} substring The substring that the value must contain.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    contains: function(key, value) {
	      this._addCondition(key, "$regex", this._quote(value));
	      return this;
	    },

	    /**
	     * Add a constraint for finding string values that start with a provided
	     * string.  This query will use the backend index, so it will be fast even
	     * for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} prefix The substring that the value must start with.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    startsWith: function(key, value) {
	      this._addCondition(key, "$regex", "^" + this._quote(value));
	      return this;
	    },

	    /**
	     * Add a constraint for finding string values that end with a provided
	     * string.  This will be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} suffix The substring that the value must end with.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    endsWith: function(key, value) {
	      this._addCondition(key, "$regex", this._quote(value) + "$");
	      return this;
	    },

	    /**
	     * Sorts the results in ascending order by the given key.
	     *
	     * @param {String} key The key to order by.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    ascending: function(key) {
	      this._order = key;
	      return this;
	    },

	    /**
	     * Sorts the results in descending order by the given key.
	     *
	     * @param {String} key The key to order by.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    descending: function(key) {
	      this._order = "-" + key;
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given.
	     * @param {String} key The key that the Parse.GeoPoint is stored in.
	     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    near: function(key, point) {
	      if (!(point instanceof Parse.GeoPoint)) {
	        // Try to cast it to a GeoPoint, so that near("loc", [20,30]) works.
	        point = new Parse.GeoPoint(point);
	      }
	      this._addCondition(key, "$nearSphere", point);
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * @param {String} key The key that the Parse.GeoPoint is stored in.
	     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	     * @param maxDistance Maximum distance (in radians) of results to return.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    withinRadians: function(key, point, distance) {
	      this.near(key, point);
	      this._addCondition(key, "$maxDistance", distance);
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * Radius of earth used is 3958.8 miles.
	     * @param {String} key The key that the Parse.GeoPoint is stored in.
	     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	     * @param {Number} maxDistance Maximum distance (in miles) of results to
	     *     return.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    withinMiles: function(key, point, distance) {
	      return this.withinRadians(key, point, distance / 3958.8);
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * Radius of earth used is 6371.0 kilometers.
	     * @param {String} key The key that the Parse.GeoPoint is stored in.
	     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
	     * @param {Number} maxDistance Maximum distance (in kilometers) of results
	     *     to return.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    withinKilometers: function(key, point, distance) {
	      return this.withinRadians(key, point, distance / 6371.0);
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's
	     * coordinates be contained within a given rectangular geographic bounding
	     * box.
	     * @param {String} key The key to be constrained.
	     * @param {Parse.GeoPoint} southwest
	     *     The lower-left inclusive corner of the box.
	     * @param {Parse.GeoPoint} northeast
	     *     The upper-right inclusive corner of the box.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    withinGeoBox: function(key, southwest, northeast) {
	      if (!(southwest instanceof Parse.GeoPoint)) {
	        southwest = new Parse.GeoPoint(southwest);
	      }
	      if (!(northeast instanceof Parse.GeoPoint)) {
	        northeast = new Parse.GeoPoint(northeast);
	      }
	      this._addCondition(key, '$within', { '$box': [southwest, northeast] });
	      return this;
	    },

	    /**
	     * Include nested Parse.Objects for the provided key.  You can use dot
	     * notation to specify which fields in the included object are also fetch.
	     * @param {String} key The name of the key to include.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    include: function() {
	      var self = this;
	      Parse._arrayEach(arguments, function(key) {
	        if (_.isArray(key)) {
	          self._include = self._include.concat(key);
	        } else {
	          self._include.push(key);
	        }
	      });
	      return this;
	    },

	    /**
	     * Restrict the fields of the returned Parse.Objects to include only the
	     * provided keys.  If this is called multiple times, then all of the keys
	     * specified in each of the calls will be included.
	     * @param {Array} keys The names of the keys to include.
	     * @return {Parse.Query} Returns the query, so you can chain this call.
	     */
	    select: function() {
	      var self = this;
	      this._select = this._select || [];
	      Parse._arrayEach(arguments, function(key) {
	        if (_.isArray(key)) {
	          self._select = self._select.concat(key);
	        } else {
	          self._select.push(key);
	        }
	      });
	      return this;
	    },

	    /**
	     * Iterates over each result of a query, calling a callback for each one. If
	     * the callback returns a promise, the iteration will not continue until
	     * that promise has been fulfilled. If the callback returns a rejected
	     * promise, then iteration will stop with that error. The items are
	     * processed in an unspecified order. The query may not have any sort order,
	     * and may not use limit or skip.
	     * @param callback {Function} Callback that will be called with each result
	     *     of the query.
	     * @param options {Object} An optional Backbone-like options object with
	     *     success and error callbacks that will be invoked once the iteration
	     *     has finished.
	     * @return {Parse.Promise} A promise that will be fulfilled once the
	     *     iteration has completed.
	     */
	    each: function(callback, options) {
	      options = options || {};

	      if (this._order || this._skip || (this._limit >= 0)) {
	        var error =
	          "Cannot iterate on a query with sort, skip, or limit.";
	        return Parse.Promise.error(error)._thenRunCallbacks(options);
	      }

	      var promise = new Parse.Promise();

	      var query = new Parse.Query(this.objectClass);
	      // We can override the batch size from the options.
	      // This is undocumented, but useful for testing.
	      query._limit = options.batchSize || 100;
	      query._where = _.clone(this._where);
	      query._include = _.clone(this._include);

	      query.ascending('objectId');

	      var finished = false;
	      return Parse.Promise._continueWhile(function() {
	        return !finished;

	      }, function() {
	        return query.find().then(function(results) {
	          var callbacksDone = Parse.Promise.as();
	          Parse._.each(results, function(result) {
	            callbacksDone = callbacksDone.then(function() {
	              return callback(result);
	            });
	          });

	          return callbacksDone.then(function() {
	            if (results.length >= query._limit) {
	              query.greaterThan("objectId", results[results.length - 1].id);
	            } else {
	              finished = true;
	            }
	          });
	        });
	      })._thenRunCallbacks(options);
	    }
	  };

	}(this));

	/*global FB: false , console: false*/
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  var PUBLIC_KEY = "*";

	  var initialized = false;
	  var requestedPermissions;
	  var initOptions;
	  var provider = {
	    authenticate: function(options) {
	      var self = this;
	      FB.login(function(response) {
	        if (response.authResponse) {
	          if (options.success) {
	            options.success(self, {
	              id: response.authResponse.userID,
	              access_token: response.authResponse.accessToken,
	              expiration_date: new Date(response.authResponse.expiresIn * 1000 +
	                  (new Date()).getTime()).toJSON()
	            });
	          }
	        } else {
	          if (options.error) {
	            options.error(self, response);
	          }
	        }
	      }, {
	        scope: requestedPermissions
	      });
	    },
	    restoreAuthentication: function(authData) {
	      if (authData) {
	        var authResponse = {
	          userID: authData.id,
	          accessToken: authData.access_token,
	          expiresIn: (Parse._parseDate(authData.expiration_date).getTime() -
	              (new Date()).getTime()) / 1000
	        };
	        var newOptions = _.clone(initOptions);
	        newOptions.authResponse = authResponse;

	        // Suppress checks for login status from the browser.
	        newOptions.status = false;
	        FB.init(newOptions);
	      }
	      return true;
	    },
	    getAuthType: function() {
	      return "facebook";
	    },
	    deauthenticate: function() {
	      this.restoreAuthentication(null);
	      FB.logout();
	    }
	  };

	  /**
	   * Provides a set of utilities for using Parse with Facebook.
	   * @namespace
	   * Provides a set of utilities for using Parse with Facebook.
	   */
	  Parse.FacebookUtils = {
	    /**
	     * Initializes Parse Facebook integration.  Call this function after you
	     * have loaded the Facebook Javascript SDK with the same parameters
	     * as you would pass to<code>
	     * <a href=
	     * "https://developers.facebook.com/docs/reference/javascript/FB.init/">
	     * FB.init()</a></code>.  Parse.FacebookUtils will invoke FB.init() for you
	     * with these arguments.
	     *
	     * @param {Object} options Facebook options argument as described here:
	     *   <a href=
	     *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
	     *   FB.init()</a>. The status flag will be coerced to 'false' because it
	     *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
	     *   explicitly if this behavior is required by your application.
	     */
	    init: function(options) {
	      if (typeof(FB) === 'undefined') {
	        throw "The Facebook JavaScript SDK must be loaded before calling init.";
	      }
	      initOptions = _.clone(options) || {};
	      if (initOptions.status && typeof(console) !== "undefined") {
	        var warn = console.warn || console.log || function() {};
	        warn.call(console, "The 'status' flag passed into" +
	          " FB.init, when set to true, can interfere with Parse Facebook" +
	          " integration, so it has been suppressed. Please call" +
	          " FB.getLoginStatus() explicitly if you require this behavior.");
	      }
	      initOptions.status = false;
	      FB.init(initOptions);
	      Parse.User._registerAuthenticationProvider(provider);
	      initialized = true;
	    },

	    /**
	     * Gets whether the user has their account linked to Facebook.
	     *
	     * @param {Parse.User} user User to check for a facebook link.
	     *     The user must be logged in on this device.
	     * @return {Boolean} <code>true</code> if the user has their account
	     *     linked to Facebook.
	     */
	    isLinked: function(user) {
	      return user._isLinked("facebook");
	    },

	    /**
	     * Logs in a user using Facebook. This method delegates to the Facebook
	     * SDK to authenticate the user, and then automatically logs in (or
	     * creates, in the case where it is a new user) a Parse.User.
	     *
	     * @param {String, Object} permissions The permissions required for Facebook
	     *    log in.  This is a comma-separated string of permissions.
	     *    Alternatively, supply a Facebook authData object as described in our
	     *    REST API docs if you want to handle getting facebook auth tokens
	     *    yourself.
	     * @param {Object} options Standard options object with success and error
	     *    callbacks.
	     */
	    logIn: function(permissions, options) {
	      if (!permissions || _.isString(permissions)) {
	        if (!initialized) {
	          throw "You must initialize FacebookUtils before calling logIn.";
	        }
	        requestedPermissions = permissions;
	        return Parse.User._logInWith("facebook", options);
	      } else {
	        var newOptions = _.clone(options) || {};
	        newOptions.authData = permissions;
	        return Parse.User._logInWith("facebook", newOptions);
	      }
	    },

	    /**
	     * Links Facebook to an existing PFUser. This method delegates to the
	     * Facebook SDK to authenticate the user, and then automatically links
	     * the account to the Parse.User.
	     *
	     * @param {Parse.User} user User to link to Facebook. This must be the
	     *     current user.
	     * @param {String, Object} permissions The permissions required for Facebook
	     *    log in.  This is a comma-separated string of permissions.
	     *    Alternatively, supply a Facebook authData object as described in our
	     *    REST API docs if you want to handle getting facebook auth tokens
	     *    yourself.
	     * @param {Object} options Standard options object with success and error
	     *    callbacks.
	     */
	    link: function(user, permissions, options) {
	      if (!permissions || _.isString(permissions)) {
	        if (!initialized) {
	          throw "You must initialize FacebookUtils before calling link.";
	        }
	        requestedPermissions = permissions;
	        return user._linkWith("facebook", options);
	      } else {
	        var newOptions = _.clone(options) || {};
	        newOptions.authData = permissions;
	        return user._linkWith("facebook", newOptions);
	      }
	    },

	    /**
	     * Unlinks the Parse.User from a Facebook account.
	     *
	     * @param {Parse.User} user User to unlink from Facebook. This must be the
	     *     current user.
	     * @param {Object} options Standard options object with success and error
	     *    callbacks.
	     */
	    unlink: function(user, options) {
	      if (!initialized) {
	        throw "You must initialize FacebookUtils before calling unlink.";
	      }
	      return user._unlinkFrom("facebook", options);
	    }
	  };

	}(this));

	/*global _: false, document: false, window: false, navigator: false */
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * History serves as a global router (per frame) to handle hashchange
	   * events or pushState, match the appropriate route, and trigger
	   * callbacks. You shouldn't ever have to create one of these yourself
	   * — you should use the reference to <code>Parse.history</code>
	   * that will be created for you automatically if you make use of
	   * Routers with routes.
	   * @class
	   *
	   * <p>A fork of Backbone.History, provided for your convenience.  If you
	   * use this class, you must also include jQuery, or another library
	   * that provides a jQuery-compatible $ function.  For more information,
	   * see the <a href="http://documentcloud.github.com/backbone/#History">
	   * Backbone documentation</a>.</p>
	   * <p><strong><em>Available in the client SDK only.</em></strong></p>
	   */
	  Parse.History = function() {
	    this.handlers = [];
	    _.bindAll(this, 'checkUrl');
	  };

	  // Cached regex for cleaning leading hashes and slashes .
	  var routeStripper = /^[#\/]/;

	  // Cached regex for detecting MSIE.
	  var isExplorer = /msie [\w.]+/;

	  // Has the history handling already been started?
	  Parse.History.started = false;

	  // Set up all inheritable **Parse.History** properties and methods.
	  _.extend(Parse.History.prototype, Parse.Events,
	           /** @lends Parse.History.prototype */ {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(windowOverride) {
	      var loc = windowOverride ? windowOverride.location : window.location;
	      var match = loc.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the cross-browser normalized URL fragment, either from the URL,
	    // the hash, or the override.
	    getFragment: function(fragment, forcePushState) {
	      if (Parse._isNullOrUndefined(fragment)) {
	        if (this._hasPushState || forcePushState) {
	          fragment = window.location.pathname;
	          var search = window.location.search;
	          if (search) {
	            fragment += search;
	          }
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      if (!fragment.indexOf(this.options.root)) {
	        fragment = fragment.substr(this.options.root.length);
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    /**
	     * Start the hash change handling, returning `true` if the current
	     * URL matches an existing route, and `false` otherwise.
	     */
	    start: function(options) {
	      if (Parse.History.started) {
	        throw new Error("Parse.history has already been started");
	      }
	      Parse.History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options = _.extend({}, {root: '/'}, this.options, options);
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._wantsPushState = !!this.options.pushState;
	      this._hasPushState = !!(this.options.pushState &&
	                              window.history &&
	                              window.history.pushState);
	      var fragment = this.getFragment();
	      var docMode = document.documentMode;
	      var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) &&
	                   (!docMode || docMode <= 7));

	      if (oldIE) {
	        this.iframe = Parse.$('<iframe src="javascript:0" tabindex="-1" />')
	                      .hide().appendTo('body')[0].contentWindow;
	        this.navigate(fragment);
	      }

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._hasPushState) {
	        Parse.$(window).bind('popstate', this.checkUrl);
	      } else if (this._wantsHashChange &&
	                 ('onhashchange' in window) &&
	                 !oldIE) {
	        Parse.$(window).bind('hashchange', this.checkUrl);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = window.setInterval(this.checkUrl,
	                                                    this.interval);
	      }

	      // Determine if we need to change the base url, for a pushState link
	      // opened by a non-pushState browser.
	      this.fragment = fragment;
	      var loc = window.location;
	      var atRoot  = loc.pathname === this.options.root;

	      // If we've started off with a route from a `pushState`-enabled browser,
	      // but we're currently in a browser that doesn't support it...
	      if (this._wantsHashChange &&
	          this._wantsPushState &&
	          !this._hasPushState &&
	          !atRoot) {
	        this.fragment = this.getFragment(null, true);
	        window.location.replace(this.options.root + '#' + this.fragment);
	        // Return immediately as browser will do redirect to new url
	        return true;

	      // Or if we've started out with a hash-based route, but we're currently
	      // in a browser where it could be `pushState`-based instead...
	      } else if (this._wantsPushState &&
	                 this._hasPushState &&
	                 atRoot &&
	                 loc.hash) {
	        this.fragment = this.getHash().replace(routeStripper, '');
	        window.history.replaceState({}, document.title,
	            loc.protocol + '//' + loc.host + this.options.root + this.fragment);
	      }

	      if (!this.options.silent) {
	        return this.loadUrl();
	      }
	    },

	    // Disable Parse.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      Parse.$(window).unbind('popstate', this.checkUrl)
	                     .unbind('hashchange', this.checkUrl);
	      window.clearInterval(this._checkUrlInterval);
	      Parse.History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();
	      if (current === this.fragment && this.iframe) {
	        current = this.getFragment(this.getHash(this.iframe));
	      }
	      if (current === this.fragment) {
	        return false;
	      }
	      if (this.iframe) {
	        this.navigate(current);
	      }
	      if (!this.loadUrl()) {
	        this.loadUrl(this.getHash());
	      }
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragmentOverride) {
	      var fragment = this.fragment = this.getFragment(fragmentOverride);
	      var matched = _.any(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	      return matched;
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the
	    // history.
	    navigate: function(fragment, options) {
	      if (!Parse.History.started) {
	        return false;
	      }
	      if (!options || options === true) {
	        options = {trigger: options};
	      }
	      var frag = (fragment || '').replace(routeStripper, '');
	      if (this.fragment === frag) {
	        return;
	      }

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._hasPushState) {
	        if (frag.indexOf(this.options.root) !== 0) {
	          frag = this.options.root + frag;
	        }
	        this.fragment = frag;
	        var replaceOrPush = options.replace ? 'replaceState' : 'pushState';
	        window.history[replaceOrPush]({}, document.title, frag);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this.fragment = frag;
	        this._updateHash(window.location, frag, options.replace);
	        if (this.iframe &&
	            (frag !== this.getFragment(this.getHash(this.iframe)))) {
	          // Opening and closing the iframe tricks IE7 and earlier
	          // to push a history entry on hash-tag change.
	          // When replace is true, we don't want this.
	          if (!options.replace) {
	            this.iframe.document.open().close();
	          }
	          this._updateHash(this.iframe.location, frag, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        window.location.assign(this.options.root + fragment);
	      }
	      if (options.trigger) {
	        this.loadUrl(fragment);
	      }
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var s = location.toString().replace(/(javascript:|#).*$/, '');
	        location.replace(s + '#' + fragment);
	      } else {
	        location.hash = fragment;
	      }
	    }
	  });
	}(this));

	/*global _: false*/
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * Routers map faux-URLs to actions, and fire events when routes are
	   * matched. Creating a new one sets its `routes` hash, if not set statically.
	   * @class
	   *
	   * <p>A fork of Backbone.Router, provided for your convenience.
	   * For more information, see the
	   * <a href="http://documentcloud.github.com/backbone/#Router">Backbone
	   * documentation</a>.</p>
	   * <p><strong><em>Available in the client SDK only.</em></strong></p>
	   */
	  Parse.Router = function(options) {
	    options = options || {};
	    if (options.routes) {
	      this.routes = options.routes;
	    }
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var namedParam    = /:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;

	  // Set up all inheritable **Parse.Router** properties and methods.
	  _.extend(Parse.Router.prototype, Parse.Events,
	           /** @lends Parse.Router.prototype */ {

	    /**
	     * Initialize is an empty function by default. Override it with your own
	     * initialization logic.
	     */
	    initialize: function(){},

	    /**
	     * Manually bind a single named route to a callback. For example:
	     *
	     * <pre>this.route('search/:query/p:num', 'search', function(query, num) {
	     *       ...
	     *     });</pre>
	     */
	    route: function(route, name, callback) {
	      Parse.history = Parse.history || new Parse.History();
	      if (!_.isRegExp(route)) {
	        route = this._routeToRegExp(route);
	      }
	      if (!callback) {
	        callback = this[name];
	      }
	      Parse.history.route(route, _.bind(function(fragment) {
	        var args = this._extractParameters(route, fragment);
	        if (callback) {
	          callback.apply(this, args);
	        }
	        this.trigger.apply(this, ['route:' + name].concat(args));
	        Parse.history.trigger('route', this, name, args);
	      }, this));
	      return this;
	    },

	    /**
	     * Whenever you reach a point in your application that you'd
	     * like to save as a URL, call navigate in order to update the
	     * URL. If you wish to also call the route function, set the
	     * trigger option to true. To update the URL without creating
	     * an entry in the browser's history, set the replace option
	     * to true.
	     */
	    navigate: function(fragment, options) {
	      Parse.history.navigate(fragment, options);
	    },

	    // Bind all defined routes to `Parse.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) {
	        return;
	      }
	      var routes = [];
	      for (var route in this.routes) {
	        if (this.routes.hasOwnProperty(route)) {
	          routes.unshift([route, this.routes[route]]);
	        }
	      }
	      for (var i = 0, l = routes.length; i < l; i++) {
	        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(namedParam, '([^\/]+)')
	                   .replace(splatParam, '(.*?)');
	      return new RegExp('^' + route + '$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted parameters.
	    _extractParameters: function(route, fragment) {
	      return route.exec(fragment).slice(1);
	    }
	  });

	  /**
	   * @function
	   * @param {Object} instanceProps Instance properties for the router.
	   * @param {Object} classProps Class properies for the router.
	   * @return {Class} A new subclass of <code>Parse.Router</code>.
	   */
	  Parse.Router.extend = Parse._extend;
	}(this));
	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;
	  var _ = Parse._;

	  /**
	   * @namespace Contains functions for calling and declaring
	   * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
	   * <p><strong><em>
	   *   Some functions are only available from Cloud Code.
	   * </em></strong></p>
	   */
	  Parse.Cloud = Parse.Cloud || {};

	  _.extend(Parse.Cloud, /** @lends Parse.Cloud */ {
	    /**
	     * Makes a call to a cloud function.
	     * @param {String} name The function name.
	     * @param {Object} data The parameters to send to the cloud function.
	     * @param {Object} options A Backbone-style options object
	     * options.success, if set, should be a function to handle a successful
	     * call to a cloud function.  options.error should be a function that
	     * handles an error running the cloud function.  Both functions are
	     * optional.  Both functions take a single argument.
	     * @return {Parse.Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    run: function(name, data, options) {
	      var request = Parse._request("functions", name, null, 'POST',
	                                   Parse._encode(data, null, true));

	      return request.then(function(resp) {
	        return Parse._decode(null, resp).result;
	      })._thenRunCallbacks(options);
	    }
	  });
	}(this));

	(function(root) {
	  root.Parse = root.Parse || {};
	  var Parse = root.Parse;

	  Parse.Installation = Parse.Object.extend("_Installation");

	  /**
	   * Contains functions to deal with Push in Parse
	   * @name Parse.Push
	   * @namespace
	   */
	  Parse.Push = Parse.Push || {};

	  /**
	   * Sends a push notification.
	   * @param {Object} data -  The data of the push notification.  Valid fields
	   * are:
	   *   <ol>
	   *     <li>channels - An Array of channels to push to.</li>
	   *     <li>push_time - A Date object for when to send the push.</li>
	   *     <li>expiration_time -  A Date object for when to expire
	   *         the push.</li>
	   *     <li>expiration_interval - The seconds from now to expire the push.</li>
	   *     <li>where - A Parse.Query over Parse.Installation that is used to match
	   *         a set of installations to push to.</li>
	   *     <li>data - The data to send as part of the push</li>
	   *   <ol>
	   * @param {Object} options An object that has an optional success function,
	   * that takes no arguments and will be called on a successful push, and
	   * an error function that takes a Parse.Error and will be called if the push
	   * failed.
	   */
	  Parse.Push.send = function(data, options) {
	    if (data.where) {
	      data.where = data.where.toJSON().where;
	    }

	    if (data.push_time) {
	      data.push_time = data.push_time.toJSON();
	    }

	    if (data.expiration_time) {
	      data.expiration_time = data.expiration_time.toJSON();
	    }

	    if (data.expiration_time && data.expiration_time_interval) {
	      throw "Both expiration_time and expiration_time_interval can't be set";
	    }

	    var request = Parse._request('push', null, null, 'POST', data);
	    return request._thenRunCallbacks(options);
	  };
	}(this));


/***/ },

/***/ 128:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMIDOperations
	 * @typechecks static-only
	 */

	/*jslint evil: true */

	"use strict";

	var CSSPropertyOperations = require(48);
	var DOMChildrenOperations = require(133);
	var DOMPropertyOperations = require(50);
	var ReactMount = require(18);

	var getTextContentAccessor = require(104);
	var invariant = require(40);

	/**
	 * Errors for properties that should not be updated with `updatePropertyById()`.
	 *
	 * @type {object}
	 * @private
	 */
	var INVALID_PROPERTY_ERRORS = {
	  dangerouslySetInnerHTML:
	    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
	  style: '`style` must be set using `updateStylesByID()`.'
	};

	/**
	 * The DOM property to use when setting text content.
	 *
	 * @type {string}
	 * @private
	 */
	var textContentAccessor = getTextContentAccessor() || 'NA';

	var LEADING_SPACE = /^ /;

	/**
	 * Operations used to process updates to DOM nodes. This is made injectable via
	 * `ReactComponent.DOMIDOperations`.
	 */
	var ReactDOMIDOperations = {

	  /**
	   * Updates a DOM node with new property values. This should only be used to
	   * update DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A valid property name, see `DOMProperty`.
	   * @param {*} value New value of the property.
	   * @internal
	   */
	  updatePropertyByID: function(id, name, value) {
	    var node = ReactMount.getNode(id);
	    invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name));

	    // If we're updating to null or undefined, we should remove the property
	    // from the DOM node instead of inadvertantly setting to a string. This
	    // brings us in line with the same behavior we have on initial render.
	    if (value != null) {
	      DOMPropertyOperations.setValueForProperty(node, name, value);
	    } else {
	      DOMPropertyOperations.deleteValueForProperty(node, name);
	    }
	  },

	  /**
	   * Updates a DOM node to remove a property. This should only be used to remove
	   * DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A property name to remove, see `DOMProperty`.
	   * @internal
	   */
	  deletePropertyByID: function(id, name, value) {
	    var node = ReactMount.getNode(id);
	    invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name));
	    DOMPropertyOperations.deleteValueForProperty(node, name, value);
	  },

	  /**
	   * This should almost never be used instead of `updatePropertyByID()` due to
	   * the extra object allocation required by the API. That said, this is useful
	   * for batching up several operations across worker thread boundaries.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {object} properties A mapping of valid property names.
	   * @internal
	   * @see {ReactDOMIDOperations.updatePropertyByID}
	   */
	  updatePropertiesByID: function(id, properties) {
	    for (var name in properties) {
	      if (!properties.hasOwnProperty(name)) {
	        continue;
	      }
	      ReactDOMIDOperations.updatePropertiesByID(id, name, properties[name]);
	    }
	  },

	  /**
	   * Updates a DOM node with new style values. If a value is specified as '',
	   * the corresponding style property will be unset.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {object} styles Mapping from styles to values.
	   * @internal
	   */
	  updateStylesByID: function(id, styles) {
	    var node = ReactMount.getNode(id);
	    CSSPropertyOperations.setValueForStyles(node, styles);
	  },

	  /**
	   * Updates a DOM node's innerHTML.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} html An HTML string.
	   * @internal
	   */
	  updateInnerHTMLByID: function(id, html) {
	    var node = ReactMount.getNode(id);
	    // HACK: IE8- normalize whitespace in innerHTML, removing leading spaces.
	    // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
	    node.innerHTML = html.replace(LEADING_SPACE, '&nbsp;');
	  },

	  /**
	   * Updates a DOM node's text content set by `props.content`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} content Text content.
	   * @internal
	   */
	  updateTextContentByID: function(id, content) {
	    var node = ReactMount.getNode(id);
	    node[textContentAccessor] = content;
	  },

	  /**
	   * Replaces a DOM node that exists in the document with markup.
	   *
	   * @param {string} id ID of child to be replaced.
	   * @param {string} markup Dangerous markup to inject in place of child.
	   * @internal
	   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
	   */
	  dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
	    var node = ReactMount.getNode(id);
	    DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
	  },

	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markup List of markup strings.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: function(updates, markup) {
	    for (var i = 0; i < updates.length; i++) {
	      updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
	    }
	    DOMChildrenOperations.processUpdates(updates, markup);
	  }

	};

	module.exports = ReactDOMIDOperations;


/***/ },

/***/ 129:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule mutateHTMLNodeWithMarkup
	 * @typechecks static-only
	 */

	/*jslint evil: true */

	'use strict';

	var createNodesFromMarkup = require(134);
	var filterAttributes = require(135);
	var invariant = require(40);

	/**
	 * You can't set the innerHTML of a document. Unless you have
	 * this function.
	 *
	 * @param {DOMElement} node with tagName == 'html'
	 * @param {string} markup markup string including <html>.
	 */
	function mutateHTMLNodeWithMarkup(node, markup) {
	  invariant(node.tagName.toLowerCase() === 'html');

	  markup = markup.trim();
	  invariant(markup.toLowerCase().indexOf('<html') === 0);

	  // First let's extract the various pieces of markup.
	  var htmlOpenTagEnd = markup.indexOf('>') + 1;
	  var htmlCloseTagStart = markup.lastIndexOf('<');
	  var htmlOpenTag = markup.substring(0, htmlOpenTagEnd);
	  var innerHTML = markup.substring(htmlOpenTagEnd, htmlCloseTagStart);

	  // Now for the fun stuff. Pass through both sets of attributes and
	  // bring them up-to-date. We get the new set by creating a markup
	  // fragment.
	  var shouldExtractAttributes = htmlOpenTag.indexOf(' ') > -1;
	  var attributeHolder = null;

	  if (shouldExtractAttributes) {
	    // We extract the attributes by creating a <span> and evaluating
	    // the node.
	    attributeHolder = createNodesFromMarkup(
	      htmlOpenTag.replace('html ', 'span ') + '</span>'
	    )[0];

	    // Add all attributes present in attributeHolder
	    var attributesToSet = filterAttributes(
	      attributeHolder,
	      function(attr) {
	        return node.getAttributeNS(attr.namespaceURI, attr.name) !== attr.value;
	      }
	    );
	    attributesToSet.forEach(function(attr) {
	      node.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
	    });
	  }

	  // Remove all attributes not present in attributeHolder
	  var attributesToRemove = filterAttributes(
	    node,
	    function(attr) {
	      // Remove all attributes if attributeHolder is null or if it does not have
	      // the desired attribute.
	      return !(
	        attributeHolder &&
	          attributeHolder.hasAttributeNS(attr.namespaceURI, attr.name)
	      );
	    }
	  );
	  attributesToRemove.forEach(function(attr) {
	    node.removeAttributeNS(attr.namespaceURI, attr.name);
	  });

	  // Finally, set the inner HTML. No tricks needed. Do this last to
	  // minimize likelihood of triggering reflows.
	  node.innerHTML = innerHTML;
	}

	module.exports = mutateHTMLNodeWithMarkup;


/***/ },

/***/ 130:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */

	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	    obj = obj || {};
	    var args = [a, b, c, d, e];
	    var ii = 0, v;

	    while (args[ii]) {
	      v = args[ii++];
	      for (var k in v) {
	        obj[k] = v[k];
	      }

	      // IE ignores toString in object iteration.. See:
	      // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	      if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	          (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	        obj.toString = v.toString;
	      }
	    }

	    return obj;
	}

	module.exports = copyProperties;


/***/ },

/***/ 131:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactDOMSelection
	 */

	"use strict";

	var getNodeForCharacterOffset = require(136);
	var getTextContentAccessor = require(104);

	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length;

	  // Duplicate selection so we can move range without breaking user selection.
	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);

	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;

	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}

	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */
	function getModernOffsets(node) {
	  var selection = window.getSelection();

	  if (selection.rangeCount === 0) {
	    return null;
	  }

	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;

	  var currentRange = selection.getRangeAt(0);
	  var rangeLength = currentRange.toString().length;

	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

	  var start = tempRange.toString().length;
	  var end = start + rangeLength;

	  // Detect whether the selection is backward.
	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;
	  detectionRange.detach();

	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}

	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;

	  if (typeof offsets.end === 'undefined') {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }

	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}

	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setModernOffsets(node, offsets) {
	  var selection = window.getSelection();

	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = typeof offsets.end === 'undefined' ?
	    start : Math.min(offsets.end, length);

	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);

	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();
	    selection.addRange(range);
	    selection.extend(endMarker.node, endMarker.offset);
	    range.detach();
	  }
	}

	var ReactDOMSelection = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: function(node) {
	    var getOffsets = document.selection ? getIEOffsets : getModernOffsets;
	    return getOffsets(node);
	  },

	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: function(node, offsets) {
	    var setOffsets = document.selection ? setIEOffsets : setModernOffsets;
	    setOffsets(node, offsets);
	  }
	};

	module.exports = ReactDOMSelection;


/***/ },

/***/ 132:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule isNode
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  return !!(object && (
	    typeof Node !== 'undefined' ? object instanceof Node :
	      typeof object === 'object' &&
	      typeof object.nodeType === 'number' &&
	      typeof object.nodeName === 'string'
	  ));
	}

	module.exports = isNode;


/***/ },

/***/ 133:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule DOMChildrenOperations
	 * @typechecks static-only
	 */

	"use strict";

	var Danger = require(139);
	var ReactMultiChildUpdateTypes = require(74);

	var getTextContentAccessor = require(104);

	/**
	 * The DOM property to use when setting text content.
	 *
	 * @type {string}
	 * @private
	 */
	var textContentAccessor = getTextContentAccessor() || 'NA';

	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */
	function insertChildAt(parentNode, childNode, index) {
	  var childNodes = parentNode.childNodes;
	  if (childNodes[index] === childNode) {
	    return;
	  }
	  // If `childNode` is already a child of `parentNode`, remove it so that
	  // computing `childNodes[index]` takes into account the removal.
	  if (childNode.parentNode === parentNode) {
	    parentNode.removeChild(childNode);
	  }
	  if (index >= childNodes.length) {
	    parentNode.appendChild(childNode);
	  } else {
	    parentNode.insertBefore(childNode, childNodes[index]);
	  }
	}

	/**
	 * Operations for updating with DOM children.
	 */
	var DOMChildrenOperations = {

	  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markupList List of markup strings.
	   * @internal
	   */
	  processUpdates: function(updates, markupList) {
	    var update;
	    // Mapping from parent IDs to initial child orderings.
	    var initialChildren = null;
	    // List of children that will be moved or removed.
	    var updatedChildren = null;

	    for (var i = 0; update = updates[i]; i++) {
	      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
	          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
	        var updatedIndex = update.fromIndex;
	        var updatedChild = update.parentNode.childNodes[updatedIndex];
	        var parentID = update.parentID;

	        initialChildren = initialChildren || {};
	        initialChildren[parentID] = initialChildren[parentID] || [];
	        initialChildren[parentID][updatedIndex] = updatedChild;

	        updatedChildren = updatedChildren || [];
	        updatedChildren.push(updatedChild);
	      }
	    }

	    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);

	    // Remove updated children first so that `toIndex` is consistent.
	    if (updatedChildren) {
	      for (var j = 0; j < updatedChildren.length; j++) {
	        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
	      }
	    }

	    for (var k = 0; update = updates[k]; k++) {
	      switch (update.type) {
	        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
	          insertChildAt(
	            update.parentNode,
	            renderedMarkup[update.markupIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
	          insertChildAt(
	            update.parentNode,
	            initialChildren[update.parentID][update.fromIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
	          update.parentNode[textContentAccessor] = update.textContent;
	          break;
	        case ReactMultiChildUpdateTypes.REMOVE_NODE:
	          // Already removed by the for-loop above.
	          break;
	      }
	    }
	  }

	};

	module.exports = DOMChildrenOperations;


/***/ },

/***/ 134:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createNodesFromMarkup
	 * @typechecks
	 */

	/*jslint evil: true, sub: true */

	var ExecutionEnvironment = require(93);

	var createArrayFrom = require(137);
	var getMarkupWrap = require(138);
	var invariant = require(40);

	/**
	 * Dummy container used to render all markup.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Pattern used by `getNodeName`.
	 */
	var nodeNamePattern = /^\s*<(\w+)/;

	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */
	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}

	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */
	function createNodesFromMarkup(markup, handleScript) {
	  var node = dummyNode;
	  invariant(!!dummyNode);
	  var nodeName = getNodeName(markup);

	  var wrap = nodeName && getMarkupWrap(nodeName);
	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];

	    var wrapDepth = wrap[0];
	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }

	  var scripts = node.getElementsByTagName('script');
	  if (scripts.length) {
	    invariant(handleScript);
	    createArrayFrom(scripts).forEach(handleScript);
	  }

	  var nodes = createArrayFrom(node.childNodes);
	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }
	  return nodes;
	}

	module.exports = createNodesFromMarkup;


/***/ },

/***/ 135:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule filterAttributes
	 * @typechecks static-only
	 */

	/*jslint evil: true */

	'use strict';

	/**
	 * Like filter(), but for a DOM nodes attributes. Returns an array of
	 * the filter DOMAttribute objects. Does some perf related this like
	 * caching attributes.length.
	 *
	 * @param {DOMElement} node Node whose attributes you want to filter
	 * @return {array} array of DOM attribute objects.
	 */
	function filterAttributes(node, func, context) {
	  var attributes = node.attributes;
	  var numAttributes = attributes.length;
	  var accumulator = [];
	  for (var i = 0; i < numAttributes; i++) {
	    var attr = attributes.item(i);
	    if (func.call(context, attr)) {
	      accumulator.push(attr);
	    }
	  }
	  return accumulator;
	}

	module.exports = filterAttributes;


/***/ },

/***/ 136:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getNodeForCharacterOffset
	 */

	"use strict";

	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */
	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }
	  return node;
	}

	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */
	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }
	    node = node.parentNode;
	  }
	}

	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */
	function getNodeForCharacterOffset(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;

	  while (node) {
	    if (node.nodeType == 3) {
	      nodeEnd = nodeStart + node.textContent.length;

	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }

	      nodeStart = nodeEnd;
	    }

	    node = getLeafNode(getSiblingNode(node));
	  }
	}

	module.exports = getNodeForCharacterOffset;


/***/ },

/***/ 137:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule createArrayFrom
	 * @typechecks
	 */

	/**
	 * NOTE: if you are a previous user of this function, it has been considered
	 * unsafe because it's inconsistent across browsers for some inputs.
	 * Instead use `Array.isArray()`.
	 *
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return (
	    // not null/false
	    !!obj &&
	    // arrays are objects, NodeLists are functions in Safari
	    (typeof obj == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    ('length' in obj) &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    (typeof obj.nodeType != 'number') &&
	    (
	      // a real array
	      (// HTMLCollection/NodeList
	      (Array.isArray(obj) ||
	      // arguments
	      ('callee' in obj) || 'item' in obj))
	    )
	  );
	}

	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFrom = require('createArrayFrom');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFrom(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * This is also good for converting certain pseudo-arrays, like `arguments` or
	 * HTMLCollections, into arrays.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFrom(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  }
	  if (obj.item) {
	    // IE does not support Array#slice on HTMLCollections
	    var l = obj.length, ret = new Array(l);
	    while (l--) { ret[l] = obj[l]; }
	    return ret;
	  }
	  return Array.prototype.slice.call(obj);
	}

	module.exports = createArrayFrom;


/***/ },

/***/ 138:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule getMarkupWrap
	 */

	var ExecutionEnvironment = require(93);

	var invariant = require(40);

	/**
	 * Dummy container used to detect which wraps are necessary.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */
	var shouldWrap = {
	  // Force wrapping for SVG elements because if they get created inside a <div>,
	  // they will be initialized in the wrong namespace (and will not display).
	  'circle': true,
	  'g': true,
	  'line': true,
	  'path': true,
	  'polyline': true,
	  'rect': true,
	  'text': true
	};

	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	var svgWrap = [1, '<svg>', '</svg>'];

	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],

	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],

	  'optgroup': selectWrap,
	  'option': selectWrap,

	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,

	  'td': trWrap,
	  'th': trWrap,

	  'circle': svgWrap,
	  'g': svgWrap,
	  'line': svgWrap,
	  'path': svgWrap,
	  'polyline': svgWrap,
	  'rect': svgWrap,
	  'text': svgWrap
	};

	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */
	function getMarkupWrap(nodeName) {
	  invariant(!!dummyNode);
	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }
	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode.innerHTML = '<link />';
	    } else {
	      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }
	    shouldWrap[nodeName] = !dummyNode.firstChild;
	  }
	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}


	module.exports = getMarkupWrap;


/***/ },

/***/ 139:
/***/ function(module, exports, require) {

	/**
	 * Copyright 2013 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule Danger
	 * @typechecks static-only
	 */

	/*jslint evil: true, sub: true */

	"use strict";

	var ExecutionEnvironment = require(93);

	var createNodesFromMarkup = require(134);
	var emptyFunction = require(84);
	var getMarkupWrap = require(138);
	var invariant = require(40);
	var mutateHTMLNodeWithMarkup = require(129);

	var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
	var RESULT_INDEX_ATTR = 'data-danger-index';

	/**
	 * Extracts the `nodeName` from a string of markup.
	 *
	 * NOTE: Extracting the `nodeName` does not require a regular expression match
	 * because we make assumptions about React-generated markup (i.e. there are no
	 * spaces surrounding the opening tag and there is at least one attribute).
	 *
	 * @param {string} markup String of markup.
	 * @return {string} Node name of the supplied markup.
	 * @see http://jsperf.com/extract-nodename
	 */
	function getNodeName(markup) {
	  return markup.substring(1, markup.indexOf(' '));
	}

	var Danger = {

	  /**
	   * Renders markup into an array of nodes. The markup is expected to render
	   * into a list of root nodes. Also, the length of `resultList` and
	   * `markupList` should be the same.
	   *
	   * @param {array<string>} markupList List of markup strings to render.
	   * @return {array<DOMElement>} List of rendered nodes.
	   * @internal
	   */
	  dangerouslyRenderMarkup: function(markupList) {
	    invariant(ExecutionEnvironment.canUseDOM);
	    var nodeName;
	    var markupByNodeName = {};
	    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
	    for (var i = 0; i < markupList.length; i++) {
	      invariant(markupList[i]);
	      nodeName = getNodeName(markupList[i]);
	      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
	      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
	      markupByNodeName[nodeName][i] = markupList[i];
	    }
	    var resultList = [];
	    var resultListAssignmentCount = 0;
	    for (nodeName in markupByNodeName) {
	      if (!markupByNodeName.hasOwnProperty(nodeName)) {
	        continue;
	      }
	      var markupListByNodeName = markupByNodeName[nodeName];

	      // This for-in loop skips the holes of the sparse array. The order of
	      // iteration should follow the order of assignment, which happens to match
	      // numerical index order, but we don't rely on that.
	      for (var resultIndex in markupListByNodeName) {
	        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
	          var markup = markupListByNodeName[resultIndex];

	          // Push the requested markup with an additional RESULT_INDEX_ATTR
	          // attribute.  If the markup does not start with a < character, it
	          // will be discarded below (with an appropriate console.error).
	          markupListByNodeName[resultIndex] = markup.replace(
	            OPEN_TAG_NAME_EXP,
	            // This index will be parsed back out below.
	            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
	          );
	        }
	      }

	      // Render each group of markup with similar wrapping `nodeName`.
	      var renderNodes = createNodesFromMarkup(
	        markupListByNodeName.join(''),
	        emptyFunction // Do nothing special with <script> tags.
	      );

	      for (i = 0; i < renderNodes.length; ++i) {
	        var renderNode = renderNodes[i];
	        if (renderNode.hasAttribute &&
	            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

	          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
	          renderNode.removeAttribute(RESULT_INDEX_ATTR);

	          invariant(!resultList.hasOwnProperty(resultIndex));

	          resultList[resultIndex] = renderNode;

	          // This should match resultList.length and markupList.length when
	          // we're done.
	          resultListAssignmentCount += 1;

	        }
	      }
	    }

	    // Although resultList was populated out of order, it should now be a dense
	    // array.
	    invariant(resultListAssignmentCount === resultList.length);

	    invariant(resultList.length === markupList.length);

	    return resultList;
	  },

	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
	    invariant(ExecutionEnvironment.canUseDOM);
	    invariant(markup);
	    // createNodesFromMarkup() won't work if the markup is rooted by <html>
	    // since it has special semantic meaning. So we use an alternatie strategy.
	    if (oldChild.tagName.toLowerCase() === 'html') {
	      mutateHTMLNodeWithMarkup(oldChild, markup);
	      return;
	    }
	    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
	    oldChild.parentNode.replaceChild(newChild, oldChild);
	  }

	};

	module.exports = Danger;


/***/ },

/***/ 140:
/***/ function(module, exports, require) {

	var TRANSFORM_KEY = typeof document.body.style.MozTransform !== 'undefined' ? 'MozTransform' : 'WebkitTransform';
	var FILTER_KEY = typeof document.body.style.MozFilter !== 'undefined' ? 'MozFilter' : 'WebkitFilter';

	module.exports = {
	  TRANSFORM: TRANSFORM_KEY,
	  FILTER: FILTER_KEY
	};

/***/ }
/******/ })