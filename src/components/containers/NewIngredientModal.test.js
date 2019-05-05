import React from 'react';
import {create} from 'react-test-renderer';

import {NewIngredientPanel} from './NewIngredientModal';

import sampleData from '../../data/initialState.json';
import color from '@material-ui/core/colors/brown';


const products = sampleData.products;

const modal = <NewIngredientPanel 
        products={products}
        onClose={jest.fn()}
        onAddIngredient={jest.fn()}
    />


describe('NewIngredientModal Component render tests', () => {

    test('renders correctly', () => {
        const component = create(modal);
        expect(component.toJSON()).toMatchSnapshot();
    });
});


describe('NewIngredientModal Component behaviour tests', () => {

    test('modal UI changes', () => {

        const component = create(modal).root;
        const nameField = component.findByProps({name:"name"});
        const categoryField = component.findByProps({name:"category"});
        const subcategoryField = component.findByProps({name:"subcategory"});
        const brandField = component.findByProps({name:"brand"});
        const countryField = component.findByProps({name:"coo"});
        const defaultUnitField = component.findByProps({name:"defaultunit"});
        const quantityField = component.findByProps({name:"quantity"});
        const unitField = component.findByProps({name:"unit"});

        expect(categoryField.props.error).toBeTruthy();
        expect(subcategoryField.props.error).toBeTruthy();
        expect(brandField.props.error).toBeTruthy();
        expect(countryField.props.error).toBeTruthy();
        expect(defaultUnitField.props.error).toBeTruthy();
        expect(quantityField.props.error).toBeTruthy();
        expect(unitField.props.error).toBeTruthy();

        // text fields
        expect(nameField.props.error).toBeTruthy();
        expect(nameField.props.value).toBe("");
        nameField.props.onChange({
            target: {
                name: "name",
                value: "braeburn pear"
            }
        });
        expect(nameField.props.error).not.toBeTruthy();
        expect(nameField.props.value).toBe("braeburn pear");

        expect(categoryField.props.error).toBeTruthy();
        expect(categoryField.props.value).toBe("");
        categoryField.props.onChange({
            target: {
                name: "category",
                value: "produce"
            }
        });
        expect(categoryField.props.error).not.toBeTruthy();
        expect(categoryField.props.value).toBe("produce");

        expect(subcategoryField.props.error).toBeTruthy();
        expect(subcategoryField.props.value).toBe("");
        subcategoryField.props.onChange({
            target: {
                name: "subcategory",
                value: "fruit"
            }
        });
        expect(subcategoryField.props.error).not.toBeTruthy();
        expect(subcategoryField.props.value).toBe("fruit");

        expect(brandField.props.error).toBeTruthy();
        expect(brandField.props.value).toBe("");
        brandField.props.onChange({
            target: {
                name: "brand",
                value: "sunkrass ltd"
            }
        });
        expect(brandField.props.error).not.toBeTruthy();
        expect(brandField.props.value).toBe("sunkrass ltd");

        expect(countryField.props.error).toBeTruthy();
        expect(countryField.props.value).toBe("");
        countryField.props.onChange({
            target: {
                name: "coo",
                value: "California"
            }
        });
        expect(countryField.props.error).not.toBeTruthy();
        expect(countryField.props.value).toBe("California");

        // units
        expect(unitField.props.error).toBeTruthy();
        expect(defaultUnitField.props.error).toBeTruthy();
        defaultUnitField.props.onChange({
            target: {
                name: "defaultunit",
                value: "each"
            }
        });
        expect(defaultUnitField.props.error).not.toBeTruthy();
        expect(unitField.props.value).toBe("each");
        expect(unitField.props.error).not.toBeTruthy();
        unitField.props.onChange({
            target: {
                name: "unit",
                value: "gram"
            }
        });
        expect(unitField.props.value).toBe("gram");
        expect(unitField.props.error).not.toBeTruthy();
        expect(defaultUnitField.props.error).not.toBeTruthy();


        // quantity
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: ""
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "a"
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "1"
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "1."
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: ".1"
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "1.0"
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "0.1"
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "."
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "0"
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "-1"
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "-1.0"
            }
        });
        expect(quantityField.props.error).toBeTruthy();
        quantityField.props.onChange({
            target: {
                name: "quantity",
                value: "500"
            }
        });
        expect(quantityField.props.error).not.toBeTruthy();

        // check warning message at bottom?
    });


    test('save button click', () => {
        const ingredient = {
            name: "pineapple",
            category: "canned foodstuffs",
            subcategory: "canned fruit",
            brand: "starkiss",
            coo: "mexico",
            defaultunit: "gram"
        };
        const quantity = "500";
        const unit = "gram";

        const component = create(modal).root;
        const nameField = component.findByProps({name:"name"});
        const categoryField = component.findByProps({name:"category"});
        const subcategoryField = component.findByProps({name:"subcategory"});
        const brandField = component.findByProps({name:"brand"});
        const countryField = component.findByProps({name:"coo"});
        const defaultUnitField = component.findByProps({name:"defaultunit"});
        const quantityField = component.findByProps({name:"quantity"});
        const unitField = component.findByProps({name:"unit"});

        const form = component.findByType("form");

        const onSubmitEvent = {
            preventDefault: () => {}
        }

        const getChangeEvent = (name, value) => {
            return {
                target: {
                    name,
                    value
                }
            };
        }

        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        brandField.props.onChange(getChangeEvent("brand", ingredient.brand));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        nameField.props.onChange(getChangeEvent("name", ingredient.name));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        categoryField.props.onChange(getChangeEvent("category", ingredient.category));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        subcategoryField.props.onChange(getChangeEvent("subcategory", ingredient.subcategory));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        countryField.props.onChange(getChangeEvent("coo", ingredient.coo));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        defaultUnitField.props.onChange(getChangeEvent("defaultunit", ingredient.defaultunit));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        unitField.props.onChange(getChangeEvent("unit", unit));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).not.toHaveBeenCalled();

        // do not do unit field last if default unit field called, as later also changes the former.
        quantityField.props.onChange(getChangeEvent("quantity", quantity));
        form.props.onSubmit(onSubmitEvent);
        expect(component.props.onAddIngredient).toHaveBeenCalledWith(ingredient, quantity, unit);
    });

    test('cancel button click', () => {

        const component = create(modal).root;
        const cancelButton = component.findByProps({className: "action-cancel"});
        const nameField = component.findByProps({name:"name"});
        expect(nameField.props.value).toBe("");
        nameField.props.onChange({
            target: {
                name: "name",
                value: "orange"
            }
        });
        expect(nameField.props.value).toBe("orange");
        cancelButton.props.onClick();
        expect(component.props.onClose).toHaveBeenCalled();
        expect(nameField.props.value).toBe("");
    });
});
