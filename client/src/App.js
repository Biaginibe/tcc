import '../src/Styles/Global.css';
import Admin from './Pages/Admin/index';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>  
      </Switch>
      
    </Router>
  );
}

export default App;
