import React, { Component } from 'react';
import '../css/modal.css';
import {IconContext} from 'react-icons';
import {FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        return (
            <React.Fragment>
            {
                !this.props.show ?
                "" :
                <div className="modal-background">
                    <button type="button" 
                      className="modal-button-close" 
                      onClick={this.props.onClose}>
                        <IconContext.Provider value={{color: "white", size: "3em"}}>
                            <FaRegTimesCircle/>
                        </IconContext.Provider>
                    </button>
                    <div className="modal">
                      {this.props.children}
                    </div>
                    <div className="modal-shadow">
                    </div>
                </div>
            }
            </React.Fragment>
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
}

export default Modal;