import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import AddProduct from './components/AddProduct/AddProduct';
import ManageProduct from './components/ManageProduct/ManageProduct';
import { createContext } from 'react';
import { useState } from 'react';
import OrderProcess from './components/OrderProcess/OrderProcess';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <AddProduct></AddProduct>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <ManageProduct></ManageProduct>
          </PrivateRoute>
          <PrivateRoute path="/OrderProcess/:key">
            <OrderProcess></OrderProcess>
          </PrivateRoute>
          <Route path="*">
            
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
