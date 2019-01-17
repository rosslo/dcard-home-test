import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
  };

  render() {
    const { isOpen, children } = this.props;
    const isOpenClass = isOpen ? 'open' : '';

    return (
      <div ref={(ref) => { this.modal = ref; }} className={`modal-container ${isOpenClass}`}>
        <div className="modal">
          {children}
        </div>
      </div>
    );
  }
}
