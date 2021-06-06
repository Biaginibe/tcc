import "../src/Styles/Global.css";
import Admin from "./Pages/Admin/index";
import Paciente from "./Pages/Cliente/Paciente/index";
import Psicologo from "./Pages/Cliente/Psicologos/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Paciente">
          <Paciente />
        </Route>
        <Route path="/Psicologo">
          <Psicologo />
        </Route>
        <Route path="/">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
