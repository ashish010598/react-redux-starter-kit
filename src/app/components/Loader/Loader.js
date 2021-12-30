import React from 'react';
import PropTypes from 'prop-types';

import IMG from 'app/utils/images';
import EventManager from '../../utils/event-manager.service';
import './Loader.scss';

class MainLoader extends React.PureComponent {
  state = {
    loaderClass: '',
  };

  componentDidMount() {
    this.addLoaderListener();
  }

  addLoaderListener = () => {
    /** TODO: Use Redux */
    EventManager.subscribe('loader', (show) => {
      this.setState({
        loaderClass: show ? 'show' : 'hide',
      });
    });
  };

  render() {
    return (
      <>
        {this.props && this.props.textLoader ? (
          <div className="webloading">
            <div className="loading">
              <div className="loader" />
              <h3>Thank you for your patience.</h3>
              <h4>Loading Your Data.....</h4>
            </div>
          </div>
        ) : (
          <div className={`loader-wrap ${this.state.loaderClass}`}>
            <img src={IMG.loader} alt="Loader" className="loader" />
          </div>
        )}
      </>
    );
  }
}

MainLoader.propTypes = {
  textLoader: PropTypes.bool,
};

export default MainLoader;
