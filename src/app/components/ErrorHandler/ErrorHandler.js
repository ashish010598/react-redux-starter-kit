import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(err) {
    if (window.uiLogging) {
      const error = {
        message: err.stack,
      };
      window.uiLogging.logException(error);
    }
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Modal type="CUSTOM" show={this.state.error}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>We're sorry</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.errorMsg}</p>
            </div>
            <div className="modal-footer" />
          </div>
        </Modal>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  errorMsg: PropTypes.string,
  children: PropTypes.any,
};

ErrorBoundary.defaultProps = {
  errorMsg: `An unexpected error has occurred. Please reach out to our team at trado.in to resolve this issue.`,
};
