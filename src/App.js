import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from 
'react-router-dom';
import Board from './components/Board';
import UltimateBoard from './components/UltimateBoard';

function App() {
  return (
    <div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Tic-Tac-Toe">Tic-Tac-Toe</Link>
            </li>
            <li>
              <Link to="/Ultimate-Tic-Tac-Toe">Ultimate Tic-Tac-Toe</Link>
            </li>
            <li>
              <a href="https://ultimate-t3.herokuapp.com/rules" target="_blank"
                rel="noreferrer">
                Rules for Ultimate Tic-Tac-Toe </a>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/Tic-Tac-Toe" />
        </Route>
        <Route exact path="/Tic-Tac-Toe" component={Board} />
        <Route exact path="/Ultimate-Tic-Tac-Toe" component={UltimateBoard} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
