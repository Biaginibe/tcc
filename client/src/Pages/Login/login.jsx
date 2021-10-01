import { useEffect, useState, useContext } from "react";
import { useFetch, postData } from "../../Hooks/useFetch";
import { Link } from "react-router-dom";
import { instance } from "../../Config/axios";
import { useHistory } from "react-router-dom";
// import "./css/styles.css";
import { useAuth } from "../../Context/AuthContext";

/* import "./../../hooks/useFetch"; */
function Login() {
  const [cpf, setCpf] = useState(null); // Setando valor padrão para null
  const [pass, setPass] = useState(null); // Setando valor padrão para null
  const { token, user, signOut, signIn } = useAuth();
  //const context = useContext(AuthContext);
  let history = useHistory();

  async function handleSubmit() {
    console.log("chegou aqui!!");
    
    await instance
      .post("/login", {
        cpf: cpf,
        pass: pass,
        
      })
      
      .then((response) => {
        console.log("AQUI------------");
        console.log("-----------" + response);
        signIn(response.data);
      })

      .catch((err) => {
        setPass("");
        //Alert.alert('Aviso!', 'CPF ou senha incorreto.');
      });
  }
  // useEffect(() => {
  //     if (user !== null)
  //     console.log(user);
  //         history.push("/admin");
  //   }, [user]);

  return (
    <form id="form_login" onSubmit={handleSubmit}>
      {/* chama função handleSubmit ao clicar no botão submit */}
      <h1 id="loginTitle">Wall-et</h1>
      <div className="loginContainer">
        <div className="login">
          <label className="login">CPF:</label>
          <input
            className="login"
            type="text"
            name="user_cpf"
            autoFocus
            required
            maxLength="11"
            minLength="11" //validações simples
            pattern="\d*"
            onChange={(e) =>
              setCpf(e.target.value)
            } /* atualiza a variável a cada mudança */
          ></input>

          <label className="login">Senha:</label>
          <input
            className="login"
            type="password"
            name="user_senha"
            required
            onChange={(e) =>
              setPass(e.target.value)
            } /* atualiza a variável a cada mudança */
          ></input>
        </div>
        <div id="loginBtn">
          <button type="submit" form="form_login" value="enviar_login">
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
}
export default Login;
