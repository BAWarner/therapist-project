import React from 'react';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import Navigation from './Components/Nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navigation />
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
