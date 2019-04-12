import React, { Component } from 'react';
import {FaPlusSquare} from 'react-icons/fa';
import PropTypes from 'prop-types';


class AddForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.addItem} 
                    className={ this.props.className ? this.props.className : "" }>
                <button type="submit"><FaPlusSquare/></button>
                {this.props.children}
            </form>
        );
    }
}

AddForm.propTypes = {
    className: PropTypes.string,
    addItem: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}


export {AddForm};

