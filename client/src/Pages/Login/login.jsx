import { useEffect, useState, useContext } from "react";
import { useFetch, postData } from "../../Hooks/useFetch";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/styles.css";
import { instance } from "../../Config/axios";
import { useHistory } from "react-router-dom";
// import "./css/styles.css";
import { useAuth } from "../../Context/AuthContext";

/* import "./../../hooks/useFetch"; */
function Login() {
  const [cpf, setCpf] = useState(null); // Setando valor padrão para null
  const [pass, setPass] = useState(null); // Setando valor padrão para null
  const { token, user, signOut, signIn, type } = useAuth();
  //const context = useContext(AuthContext);
  let history = useHistory();

  async function handleSubmit(e) {
    console.log("chegou aqui!!");
    console.log("-----------" + pass);
    e.preventDefault();
    await instance
      .post("/login", {
        cpf: cpf,
        pass: pass,
      })

      .then((response) => {
        signIn(response.data);
      })

      .catch((err) => {
        //Alert.alert('Aviso!', 'CPF ou senha incorreto.');
      });
  }
  useEffect(() => {
    if (type == "admin") {
      console.log("chegou aqui?");
      history.push("/admin");
    }
  }, [type]);

  return (
    <div>
      <header className="navbarDesktop">
        <div className="links-container">
          <Link to="/" className="logo">
            SendHelp
          </Link>
        </div>
      </header>
      <form id="form_login" onSubmit={handleSubmit}>
        {/* chama função handleSubmit ao clicar no botão submit */}

        <div className="loginContainer">
          <div className="formwrap">
            <label className="login">CPF:</label>
            <input
              className="login"
              type="text"
              name="user_cpf"
              autoFocus
              required
              //validações simples

              onChange={(e) =>
                setCpf(e.target.value)
              } /* atualiza a variável a cada mudança */
            ></input>

            <label className="senha">Senha:</label>
            <input
              className="login"
              type="password"
              name="user_senha"
              required
              onChange={(e) => {
                let senha = e.target.value;
                console.log(senha);
                setPass(senha);
              }}
            ></input>
            <div id="loginBtn">
              <button
                type="submit"
                form="form_login"
                value="enviar_login"
                className="submit"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Login;
