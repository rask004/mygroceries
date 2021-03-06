import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class LinkAsButton extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.onClick) {
            this.props.onClick();
        }

        this.props.history.push(this.props.targetUrl);
    }

    render() {
        return (
                <button className={this.props.className}
                    type='button'
                    onClick={this.handleClick}
                >
                    {this.props.children}
                </button>
        );
    }
}

LinkAsButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    targetUrl: PropTypes.string.isRequired,
}

LinkAsButton.defaultProps = {
    className: null,
    onClick: null,
}

const LinkButton = withRouter(LinkAsButton);


class LinkAsDiv extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.onClick) {
            this.props.onClick();
        }

        this.props.history.push(this.props.targetUrl);
    }

    render() {
        return (
                <div className={this.props.className}
                    onClick={this.handleClick}
                >
                    {this.props.children}
                </div>
        );
    }
}

LinkAsDiv.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    targetUrl: PropTypes.string.isRequired,
}

LinkAsDiv.defaultProps = {
    className: null,
    onClick: null,
}

const LinkDiv = withRouter(LinkAsDiv);


export {LinkButton, LinkDiv};