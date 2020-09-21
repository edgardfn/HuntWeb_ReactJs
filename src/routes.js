import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from "./pages/product";

const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} />
        </Switch>    
    </BrowserRouter>
);

// Browser Router vai definir que esta utilizando rotas atravès do browser.
// Switch permitir que apenas uma rota seja chamada ao mesmo tempo.

export default Routes;

