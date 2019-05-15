import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import NavBar from './components/containers/NavigationBar';
import RecipeMaster from './components/containers/RecipeMaster';
import RecipeDetail from './components/containers/RecipeDetail';
import MealPlanner from './components/containers/MealPlanner';
import ShoppingLists from './components/containers/ShoppingList';
import './css/routecontainers.css';


const RoutedRecipeMaster = withRouter(RecipeMaster);
const RoutedRecipeDetail = withRouter(RecipeDetail);

const routes = (
    <Router>
        <Route path="/" exact >
            <div className="screen-view">
            <NavBar />
            <main className="main-view">
                <Switch>
                    <Route path="/recipe/">
                        <RoutedRecipeMaster />
                        <Route path="/recipe/:id/" component={RoutedRecipeDetail} />
                    </Route>
                    <Route path="/products/">
                    </Route>
                    <Route path="/mealplanner/" component={MealPlanner}>
                    </Route>
                    <Route path="/shopping/" component={ShoppingLists}>
                    </Route>
                </Switch>
            </main>
            </div>
        </Route>
    </Router>
);


export default routes;