import React, { Component } from 'react';
import PropTypes from 'prop-types';


class OrderedList extends Component {
    render() {
        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }
                <ol>
                    {this.props.children}
                </ol>
            </div>
        );
    }
}


OrderedList.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}


class OrderedListAddButton extends Component {
    render() {
        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }
                <ol>
                    {this.props.children}
                </ol>
                <button type="button" onClick={this.props.onClick}>{this.props.buttonTitle}</button>
            </div>
        );
    }
}


OrderedListAddButton.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
}


export {OrderedList, OrderedListAddButton};