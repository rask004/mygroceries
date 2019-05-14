import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


function ListWithAddButton(props) {
    const {
        onClick,
        buttonContent,
        className,
        orderedlist,
        title,
        children } = props;

    const listRendering = orderedlist ?
            <List component='ol'>
                {children}
            </List> :
            <List component='ul'>
                {children}
            </List>;

    const listTitle = title ? title : "";

    return (
        <div className={ className ? className : "" }>
            {listTitle}
            {listRendering}
            <Button type="button" color="primary" size="medium" variant="contained" 
                className="action-add"
                onClick={onClick}>
                {buttonContent}
            </Button>
        </div>
    );
}
ListWithAddButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    buttonContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    orderedlist: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}
ListWithAddButton.defaultProps = {
    className: null,
    title: null,
    orderedList: true
}


function ListWithAddForm (props) {
    const {
        orderedList,
        children,
        formChildren,
        title
    } = props;
    const listRendering = orderedList ?
            <List component='ol'>
                {children}
            </List> :
            <List component='ul'>
                {children}
            </List>;

    return (
        <div>
            {title}

            {listRendering}

            {formChildren}
        </div>
    );
    
}
ListWithAddForm.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    formChildren: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    orderedlist: PropTypes.bool
}
ListWithAddForm.defaultProps = {
    title: "",
    orderedList: true
}


export {ListWithAddForm, ListWithAddButton};