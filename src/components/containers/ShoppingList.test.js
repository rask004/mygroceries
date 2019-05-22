import React from 'react';
import {create} from 'react-test-renderer';
import * as D from 'date-fns';
import frequencies from '../../store/frequencyConstants';

import {ShoppingList} from './ShoppingList';
import {ShoppingListPanel} from './NewShoppingDialog';

import sampleData from '../../data/initialState.json';


const mealplans = sampleData.mealplans;
const recipes = sampleData.recipes;
const products = sampleData.products;
const shoppinglists = sampleData.shoppinglists;


const shoppingList = <ShoppingList
        mealplans={mealplans}
        recipes={recipes}
        products={products}
        shoppingLists={shoppinglists}
        onAddShoppingList={jest.fn()}
        onRemoveShoppingList={jest.fn()}
        onAddShoppingListItem={jest.fn()}
        onRemoveShoppingListItem={jest.fn()}
    />  

describe('ShoppingList Component rendering tests', () => {
    test('rendering snapshot', () => {
        const component = create(shoppingList);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('individual Shopping Lists are rendered correctly', () => {
        const expectedListItems = sampleData.shoppinglists.slice();
        const products = sampleData.products.slice();

        const component = create(shoppingList).root;

        const shoppinglists = component.findAllByProps({className:"content-shopping"});
        shoppinglists.forEach( (shoplist, index) => {
            const expectedDate = D.format(expectedListItems[index].datetime, "dddd, Do MMMM");
            const shownDate = shoplist.findByProps({className:"content-date"}).props.children;
            expect(shownDate).toEqual(expectedDate);
            const expectedItems = expectedListItems[index].items;
            const shoplistItems = shoplist.findAllByType("li");
            const items = shoplistItems.slice(0, shoplistItems.length - 1);

            // last "item" is actually a summary of costs.
            items.forEach( (shoplistItem, index) => {
                const expecteditem = expectedItems[index];
                const expectedItemId = expecteditem.id;
                const expectedProduct = products.find(item => item.id === expectedItemId);
                const quantity = shoplistItem.findByProps({className:"content-quantity"}).props.children;
                const unit = shoplistItem.findByProps({className:"content-unit"}).props.children;
                const name = shoplistItem.findByProps({className:"content-name"}).props.children;
                const brand = shoplistItem.findByProps({className:"content-brand"}).props.children;
                const price = shoplistItem.findByProps({className:"content-price"}).props.children;
                expect(Number(quantity)).toBe(expecteditem.quantity);
                expect(Number(price)).toBe(expectedProduct.unitPrice * expecteditem.quantity);
                expect(unit).toBe(expecteditem.unit);
                expect(name).toBe(expectedProduct.name);
                expect(brand).toBe(expectedProduct.brand);
            });

            let totalCost = 0
            expectedItems.forEach( item => {
                const expectedProduct = products.find(x => x.id === item.id);
                totalCost += expectedProduct.unitPrice * item.quantity;
            });

            const totalPrice = shoplist.findByProps({className:"content-total"}).props.children;

            expect(Number.isNaN(totalPrice)).not.toBeTruthy();
            expect(totalPrice).toEqual(totalCost);
        });
    });
});

describe('ShoppingList Component behaviour tests', () => {

    
    test('click remove ShoppingList calls onRemoveShoppingList', () => {
        const expectedList = sampleData.shoppinglists.slice()[0];
        const component = create(shoppingList).root;
        const shoppinglist = component.findAllByProps({className:"content-shopping"})[0];
        const removeListButton = shoppinglist.findByProps({className: "remove-list-action"});
        removeListButton.props.onClick();
        expect(component.props.onRemoveShoppingList).toHaveBeenCalledWith(expectedList.datetime);
    });

    test('click remove ShoppingList item calls onRemoveShoppingListItem', () => {
        const component = create(shoppingList).root;
        const expectedList = sampleData.shoppinglists.slice()[0];
        const shoppinglist = component.findAllByProps({className:"content-shopping"})[0];
        const expectedItemRemoved = expectedList.items[0];
        const shoplistItem = shoppinglist.findAllByType("li")[0];
        const removeItemButton = shoplistItem.findByProps({className: "remove-item-action"});
        removeItemButton.props.onClick();
        expect(component.props.onRemoveShoppingListItem).toHaveBeenCalledWith(expectedList.datetime, expectedItemRemoved.id);
    });
});


const shoppingListPanel = <ShoppingListPanel
        products={products}
        shoppingLists={shoppinglists}
        addList={jest.fn()}
        addListItem={jest.fn()}
        onClose={jest.fn()}
    />  

describe('ShoppingListPanel Component behaviour tests', () => {
    test('click add ShoppingList calls onAddShoppingList', () => {
        const component = create(shoppingListPanel).root;
        const expectedDatetime = D.format(Date(), "YYYY-MM-DD");
        const expectedRecurring = true;
        const expectedRecurringType = frequencies.MONTHLY;
        const expectedRecurringRate = 3;

        const addTypeSelector = component.findByProps({className:"select-add-form"});
        addTypeSelector.props.onChange({target:{name:"addingList", value:true}});

        const dateSelector = component.findByProps({className:"input-list-date"});
        dateSelector.props.onChange({target:{name:"listDate", value:expectedDatetime}});

        const recurringChecker = component.findByProps({className:"input-list-recurring"});
        recurringChecker.props.onChange({target:{name:"recurring", checked:true, type:"checkbox"}});

        const recurringRate = component.findByProps({className:"input-list-freq-rate"});
        recurringRate.props.onChange({target:{name:"freqRate", value:3}});

        const recurringType = component.findByProps({className:"input-list-freq-type"});
        recurringType.props.onChange({target:{name:"freqType", value:frequencies.MONTHLY}});

        const form = component.findByProps({className:"add-shopping-form"});
        form.props.onSubmit({preventDefault: () => {}});

        expect (component.props.addList).toHaveBeenCalledWith(
            expectedDatetime, expectedRecurring, expectedRecurringType, expectedRecurringRate
        );
    });

    test('click add ShoppingList item calls onAddShoppingListItem', () => {
        const component = create(shoppingListPanel).root;

        const expectedDateTime = shoppinglists[0].datetime;
        const expectedId = products[0].id;
        const expectedQuantity = 100;
        const expectedUnit = "grams";

        const addTypeSelector = component.findByProps({className:"select-add-form"});
        addTypeSelector.props.onChange({target:{name:"addingList", value:false}});

        const dateSelector = component.findByProps({className:"select-add-item-date"});
        dateSelector.props.onChange({target:{name:"date", value:expectedDateTime}});

        const productSelector = component.findByProps({className:"select-add-item-id"});
        productSelector.props.onChange({target:{name:"id", value:expectedId}});

        const quantityInput = component.findByProps({className:"input-add-item-quantity"});
        quantityInput.props.onChange({target:{name:"quantity", value:expectedQuantity}});

        const unitSelector = component.findByProps({className:"select-add-item-unit"});
        unitSelector.props.onChange({target:{name:"unit", value:expectedUnit}});

        const form = component.findByProps({className:"add-shopping-form"});
        form.props.onSubmit({preventDefault: () => {}});

        const item = {id: expectedId, quantity: expectedQuantity, unit: expectedUnit};

        expect (component.props.addListItem).toHaveBeenCalledWith(
            expectedDateTime, item
        );
    });
});