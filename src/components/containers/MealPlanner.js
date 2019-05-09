import React, { Component } from 'react';
import * as DateFns from 'date-fns';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPlannedMeal, removePlannedMeal } from '../../store/actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {FaTrash, FaPlus} from 'react-icons/fa'
import 'typeface-roboto';
import '../../css/mealplanner.css';


class MealPlanner extends Component {
    constructor(props) {
        super(props);

        const now = new Date();

        this.state = {
            date: DateFns.format(now, "YYYY-MM-DD"),
            time: DateFns.format(now, "HH:mm"),
            recipeId: this.props.recipes[0].id,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const date = this.state.date;
        const time = this.state.time;
        const datetime = date + "T" + time;
        this.props.onAddMealplan(datetime, this.state.recipeId);
    };

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };


    render() {
        const orderedMealplans = this.props.mealplans.slice().sort(
            (a,b) => DateFns.isBefore(DateFns.parse(a), DateFns.parse(b))
        );

        const renderMealplans = orderedMealplans.map( (item, step) => {
            const recipe = this.props.recipes.find(x => x.id === Number(item.recipeId));
            const title = recipe ? recipe.title : "";
            const dt = DateFns.parse(item.datetime);
            return (
                <li className="mealplan-item" key={step}>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={3} className="content-date">
                            <Typography>{DateFns.format(dt, "YYYY-MM-DD")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} className="content-time">
                            <Typography>{DateFns.format(dt, "HH:mm")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} className="content-recipe">
                            <Typography>{title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={1}>
                            <Button className="action-remove" 
                                type="button" color="primary" size="medium" variant="contained"
                                onClick={() => this.props.onRemoveMealplan(item.datetime)}>
                                <FaTrash/>
                            </Button>
                        </Grid>
                    </Grid>
                </li>
            );
        });

        const recipeOptions = this.props.recipes.map( (item) => {
            return (
                <option key={item.id} value={item.id}>{item.title}</option>
            )
        });

        return (
            <Card className="mealplan">

                <Typography className="mealplan-title" variant="display1" 
                    gutterBottom={true}>Meal Planner</Typography>

                <ul>
                    {renderMealplans}
                </ul>

                <form className="add-form" onSubmit={this.handleSubmit}>
                    <Typography variant="title">Add Meal</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                name="date"
                                type="date"
                                className="picker-date"
                                value={this.state.date}
                                onChange={this.handleChange}
                                inputProps={{
                                    min: DateFns.format(Date(), "YYYY-MM-DD")
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                name="time"
                                type="time"
                                className="picker-time"
                                value={this.state.time}
                                onChange={this.handleChange}
                                inputProps={{
                                    min: DateFns.format(Date(), "HH:mm"),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <FormControl>
                                <Select
                                    className="select-recipe"
                                    value={this.state.recipeId}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'recipeId'    
                                    }}
                                >
                                    {recipeOptions}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={1}>
                            <Button className="action-add" 
                                type="submit" color="primary" size="medium" variant="contained">
                                <FaPlus/>
                            </Button>
                        </Grid>
                    </Grid>
                </form>                
            </Card>
        );
    }
}

MealPlanner.propTypes = {
    mealplans: PropTypes.array.isRequired,
    recipes: PropTypes.array.isRequired,
    onAddMealplan: PropTypes.func.isRequired,
    onRemoveMealplan: PropTypes.func.isRequired,
}


const mapStateToProps = state => {
	return {
        mealplans: state.mealplans,
        recipes: state.recipes,
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