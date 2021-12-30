import React from 'react';
import EventManager from '../../utils/event-manager.service';
import Modal from '../Modal';
/**
 *  Shows Service Error Modal
 *
 * @class ServiceErrorModal
 * @extends {React.PureComponent}
 */
class ServiceErrorModal extends React.PureComponent {
  state = {
    show: false,
    data: null,
  };

  /**
   * Closes service error modal
   *
   * @memberof ServiceErrorModal
   */
  onErrorModalClose = () => {
    /** TODO: Replace with Redux */
    EventManager.publish('serviceError', { show: false });
  };

  /**
   * Adds listener for service errors
   *
   * @memberof ServiceErrorModal
   */
  addServiceErrorListener() {
    EventManager.subscribe('serviceError', (errorModal) => {
      this.setState({ show: errorModal.show, data: errorModal.data }, () =>
        console.error(this.state.data),
      );
    });
  }

  /**
   * React [componentDidMount] hook adds listener
   *
   * @memberof ServiceErrorModal
   */
  componentDidMount() {
    this.addServiceErrorListener();
  }

  render() {
    return (
      <Modal type="CUSTOM" show={this.state.show}>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>We're Sorry</h4>
            </div>
            <div className="modal-body">
              <p>
                An unexpected error has occurred. Our technical staff has been
                automatically notified and will be looking into this with utmost
                urgency.
              </p>
            </div>
            <div className="modal-footer">
              <div className="action" align="right">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onErrorModalClose}
                >
                  Ok. Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ServiceErrorModal;
