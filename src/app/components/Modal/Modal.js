import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

/**
 *
 * Generic Modal Component
 * @param props Props
 * @returns
 */
class Modal extends PureComponent {
  modalClassName = null;

  constructor(props) {
    super(props);
    if (this.props.show) {
      this.modalClassName = 'modal show';
      if (this.props.customClassName) {
        this.modalClassName = `${this.modalClassName} ${this.props.customClassName}`;
      }
      document.body.classList.add('modal-open');
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open');
  }

  render() {
    return (
      <div className={this.modalClassName}>
        {this.props.type !== 'CUSTOM' ? (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                {this.props.data.title ? (
                  <h4>{this.props.data.title}</h4>
                ) : null}
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  className="icon-outlined-cross"
                  type="button"
                  onClick={() =>
                    this.props.data.onAction('CANCEL', this.props.data)
                  }
                />
              </div>
              <div className="modal-body">{this.props.data.body}</div>
              {this.props.data.footer && (
                <div className="modal-footer" align="right">
                  {this.props.data.footer}
                </div>
              )}
            </div>
          </div>
        ) : (
          this.props.show && this.props.children
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  customClassName: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.any,
};

export default Modal;
