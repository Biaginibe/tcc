import "../src/Styles/Global.css";
import Admin from "./Pages/Admin/index";
import Paciente from "./Pages/Cliente/Paciente/index";
import Psicologo from "./Pages/Cliente/Psicologos/index";
import Login from "./Pages/Login/login";
import AuthProvider from "./Context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route path="/Paciente">
          <Paciente />
        </Route>
        <Route path="/Psicologo">
          <Psicologo />
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
