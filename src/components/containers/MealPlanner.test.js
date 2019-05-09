import React from 'react';
import {create} from 'react-test-renderer';
import moment from 'moment';

import {MealPlanner} from './MealPlanner';

import sampleData from '../../data/initialState.json';
import dataConstants from '../../data/constants';


const mealplans = sampleData.mealplans;
const recipes = sampleData.recipes;

const mealplanner = <MealPlanner
        mealplans={mealplans}
        recipes={recipes}
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
            // immediate childs are within Typography components (material ui).
            const dateItem = item.findByProps({className:'content-date'}).props.children.props.children;
            const timeItem = item.findByProps({className:'content-time'}).props.children.props.children;
            const recipeItem = item.findByProps({className:'content-recipe'}).props.children.props.children;

            const recipe = recipes.find(x => x.title === recipeItem);
            const recipeId = recipe.id;

            const actualMealPlan = {
                datetime: dateItem + "T" + timeItem + "Z",
                recipeId: recipeId
            };

            expect(actualMealPlan).toEqual(expectedMealplan);
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

        const expectedDatetime = moment("2019-02-27T07:00Z");
        const expectedRecipeId = recipes[1].id;

        const mealPlanForm = component.findByProps({className:"add-form"});
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
                name:  "recipeId",
                value: recipes[1].id
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
        const orderedMealplans = mealplans.slice().sort(
            (a,b) => moment(a.datetime).isBefore(b.datetime)
        );
        const targetDateTime = orderedMealplans[0].datetime;

        const listItem = component.findAllByType('li')[0];
        const removeButton = listItem.findByProps({className:'action-remove'});
        removeButton.props.onClick();

        expect(component.props.onRemoveMealplan).toHaveBeenCalledWith(targetDateTime);
    });
});