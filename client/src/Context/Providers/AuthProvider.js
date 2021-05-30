// import { useState, useEffect } from "react";
// import { AuthContext } from "../AuthContext";
// function AuthProvider({ children }) {
//   const UserAuth = {
//     isLoggedIn: false,
//     cpf: "",
//     email: "",
//     nome: "",
//     f_acesso: false,
//   };
//   const [auth, setAuth] = useState(UserAuth);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const handleAuth = ({ Nome, Cpf, Email, F_acesso }) => {
//     if (Cpf !== null || Cpf !== "") {
//       setIsLoggedIn(true);
//       setAuth({
//         isLoggedIn,
//         cpf: Cpf,
//         email: Email,
//         nome: Nome,
//         f_acesso: F_acesso,
//       });
//     }
//   };
//   useEffect(() => {
//     console.log("auth.nome", auth.nome);
//   }, [auth]);
//   return (
//     <AuthContext.Provider value={{ auth, isLoggedIn, handleAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export default AuthProvider;
