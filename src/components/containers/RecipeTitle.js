import React from 'react';
import PropTypes from 'prop-types';
import {EditableTextItem} from '../ui/EditableTextItem';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';


const TitleSection = (props) => {
    return (
        <Typography variant="display1" gutterBottom={true}>
            <EditableTextItem
                variant="detail-title"
                updateText={props.updateTitle}
                text={props.title}
                placeholder="Recipe Title"
            />
        </Typography>
    );
}

TitleSection.propTypes = {
    updateTitle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}


export default TitleSection;