/** @jsx React.DOM */

var NavBar = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="brand" href="#">ReactHack</a>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className={this.props.active === 'home' && 'active'}><a href="#">Home</a></li>
                <li className={this.props.active === 'about' && 'active'}><a href="#about">About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBar;