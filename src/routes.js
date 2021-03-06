import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import NavBar from './components/containers/NavigationBar';
import RecipeMaster from './components/containers/RecipeMaster';
import RecipeDetail from './components/containers/RecipeDetail';
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
                    <Route path="/mealplan/">
                    </Route>
                    <Route path="/shopping/">
                    </Route>
                </Switch>
            </main>
            </div>
        </Route>
    </Router>
);


export default routes;