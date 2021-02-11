import './App.css';
import MainPage from './components/pages/MainPage';
import CommitPage from './components/pages/CommitPage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
    <div className="app-routes">
      <Switch>
        <Route path="/commit/:hash" component={CommitPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
