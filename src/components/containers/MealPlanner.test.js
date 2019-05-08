import React from 'react';
import {create} from 'react-test-renderer';
import moment from 'moment';

import {MealPlanner} from './MealPlanner';

import sampleData from '../../data/initialState.json';


const mealplans = sampleData.mealplan;
const recipes = sampleData.recipes;

const mealplanner = <MealPlanner
        mealplans
        recipes
        onAddMealplan={jest.fn()}
        onRemoveMealplan={jest.fn()}
    />  


describe('MealPlanner Component rendering tests', () => {
    test.skip('rendering snapshot', () => {
        const component = create(mealplanner);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('datetimes and details are rendered correctly', () => {
        const component = create(mealplanner).root;
        const listitems = component.findAllByType('li');
        const orderedMealplans = mealplans.slice().sort(
            (a,b) => moment(a.datetime).isBefore(b.datetime)
        );
        listitems.forEach( (item, step) => {
            const expectedMealplan = orderedMealplans[step];
            const dateItem = item.findByProps({className:'content-date'});
            const timeItem = item.findByProps({className:'content-time'});            
            const recipeItem = item.findByProps({className:'content-recipe'});

            const recipeId = (x => x.title === recipeItem.props.children).id;

            const actualMealPlan = {
                datetime: moment(dateItem + " " + timeItem),
                recipeId: recipeId
            };

            expect(expectedMealplan).toEqual(actualMealPlan);
        });
    });
});

describe('MealPlanner Component behaviour tests', () => {
    test.skip('selecting date shows correct time and recipes', () => {
        // no date selection is being implemented at this time
        expect(false).toBeTruthy();
    });

    test('click add mealplan calls onAddMealplan', () => {
        const component = create(mealplanner).root;

        const expectedDatetime = moment("2019-02-27 07:00:00");
        const expectedRecipeId = recipes[1].id;

        const addButton = component.findByProps({className: "add-button"});
        addButton.props.onClick();
        const mealPlanForm = component.findByType("form");
        const dateField = mealPlanForm.findByProps({className:'picker-date'});
        const timeField = mealPlanForm.findByProps({className:'picker-time'});
        const recipeField = mealPlanForm.findByProps({className:'select-recipe'});
        dateField.props.onChange({
            target: {
                name:  "date",
                value: "2019-02-27"
            }
        });
        timeField.props.onChange({
            target: {
                name:  "time",
                value: "07:00"
            }
        });
        recipeField.props.onChange({
            target: {
                name:  "title",
                value: recipes[1].title
            }
        });
        mealPlanForm.props.onSubmit({ preventDefault: () => {}});

        expect(component.props.onAddMealplan).toHaveBeenCalledWith(expectedDatetime, expectedRecipeId);
    });

    test.skip('click add mealplan (fixed date) calls onAddMealplan', () => {
        // no add mealplan with fixed date selection is being implemented at this time
        expect(false).toBeTruthy();
    });

    test('click remove mealplan calls onRemoveMealplan', () => {
        const component = create(mealplanner).root;
        const targetDateTime = mealplans[0].datetime;

        const listItem = component.findAllByType('li')[0];
        const removeButton = listItem.findByProps('action-remove');
        removeButton.props.onClick();

        expect(component.props.onRemoveMealplan).toHaveBeenCalledWith(targetDateTime);

        expect(false).toBeTruthy();
    });
});
