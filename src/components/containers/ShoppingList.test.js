import React from 'react';
import {create} from 'react-test-renderer';
import * as D from 'date-fns';

import {ShoppingList} from './ShoppingList';

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
            const shownDate = shoplist
                .findByProps({className:"content-date"}).props.children;
            expect(shownDate)
                .toEqual(expectedDate);
            const expectedItems = expectedListItems[index].items;
            const shoplistItems = shoplist.findAllByType("li");
            const items = shoplistItems.slice(shoplistItems.length);

            // last "item" is actually a summary of costs.
            items.forEach( (shoplistItem, index) => {
                const expecteditem = expectedItems[index];
                const expectedItemId = expecteditem.id;
                const expectedProduct = products.find(item => item.id === expectedItemId);
                const quantity = shoplistItem.findByProps({className:"content-quantity"}).props.children;
                const unit = shoplistItem.findByProps({className:"content-unit"}).props.children;
                const name = shoplistItem.findByProps({className:"content-name"}).props.children;
                const brand = shoplistItem.findByProps({className:"content-brand"}).props.children;
                expect(Number(quantity)).toBe(expecteditem.quantity);
                expect(unit).toBe(expecteditem.unit);
                expect(name).toBe(expectedProduct.name);
                expect(brand).toBe(expectedProduct.brand);
            });
        });
    });
});

describe('ShoppingList Component behaviour tests', () => {

    test('click add ShoppingList calls onAddShoppingList', () => {
        expect(false).toBeTruthy();
    });

    test('click remove ShoppingList calls onRemoveShoppingList', () => {
        const expectedList = sampleData.shoppinglists.slice()[0];
        const component = create(shoppingList).root;
        const shoppinglist = component.findAllByProps({className:"content-shopping"})[0];
        const removeListButton = shoppinglist.findByProps({className: "remove-list-action"});
        removeListButton.props.onClick();
        expect(component.props.onRemoveShoppingList).toHaveBeenCalledWith(expectedList.datetime);
    });

    test('click add ShoppingList item calls onAddShoppingListItem', () => {
        expect(false).toBeTruthy();
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
