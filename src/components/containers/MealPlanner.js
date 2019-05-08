import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPlannedMeal, removePlannedMeal } from '../../store/actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import '../../css/navbar.css';


class MealPlanner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mealplans = this.props.mealplans.slice().sort(
            (a,b) => moment(a.datetime).isBefore(b.datetime)
        ).map( (item, step) => {
            return (
                <li className="mealplan-item" key={step}>
                    <div className="mealplan-content">
                        <span className="content-date">{moment(item.datetime).format("LL")}</span>
                    </div>
                    <div className="mealplan-content">
                        <span className="content-time">{moment(item.datetime).format("LT")}</span>
                    </div>
                    <div className="mealplan-content">
                        <span className="content-recipe">{item.recipeId}</span>
                    </div>
                    <button type="button">Remove</button>
                </li>
            );
        });

        return (
            <Card>

                <Typography variant="display1" gutterBottom={true}>Meal Planner</Typography>

                <ul>
                    {mealplans}
                </ul>

                <button type="button">Add</button>

            </Card>
        );
    }
}

MealPlanner.propTypes = {
    mealplans: PropTypes.array.isRequired,
    onAddMealplan: PropTypes.func.isRequired,
    onRemoveMealplan: PropTypes.func.isRequired,
}


const mapStateToProps = state => {
	return {
        mealplans: state.mealplans,
        recipes: state.recipes,
        // add a timezone difference?
    }
}

const mapDispatchToProps = dispatch => {
	return {
		onAddMealplan(datetime, recipeId) {
			dispatch(
				addPlannedMeal(datetime, recipeId)
			);
        },
        onRemoveMealplan(datetime) {
            dispatch(
                removePlannedMeal(datetime)
            );
        }
	}
}


export {MealPlanner};

const ConnectedMealPlanner = connect(mapStateToProps, mapDispatchToProps)(MealPlanner);
export default withRouter(ConnectedMealPlanner);