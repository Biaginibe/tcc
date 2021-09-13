import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import { css } from "../../../css/style";
import { instance } from '../../../config/axios';
import { Octicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/Auth";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

export default function editaPacienteProfile(navigation) {
  const { token, user, signOut } = useAuth();
  const [perfil, setPerfil] = useState(user);
  const [nome, setNome] = useState(user.nome);
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [idade, setIdade] = useState(user.idade);
  const [senha, setSenha] = useState(user.senha);



  function handleUpdate(){
    
  }

  useEffect(() => {
    async function getData() {
      try {
        const valorrequest = user.id;
        const perfildata = await instance.get(
          `/patientes/${valorrequest}}/findOnebyIDPatientes`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setPerfil(perfildata.data);
        // console.log(perfil);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

 
  console.log(perfil.nome);
  

  return (
    <View style={css.container}>
      <SafeAreaView style={css.container}>
        <Text>Edita DO USUARIO</Text>
        <ScrollView>
          <TextInput
            value={nome}
            onChangeText={(e) => setNome(e)}
            
          ></TextInput>
          <TextInput
            value={cpf}
            onChangeText={(e) => setCpf(e)}
            placeholder={cpf}
          ></TextInput>
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder={email}
          ></TextInput>
          <TextInput
            value={String(idade)}
            onChangeText={(e) => setIdade(e)}
            placeholder={String(idade)}
          ></TextInput>
          <TextInput
            value={senha}
            onChangeText={(e) => setSenha(e)}
            placeholder={senha}
          ></TextInput>
        </ScrollView>

        <TouchableOpacity onPress={handleUpdate()}>
         <Text>SALVAR</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={signOut}>
          <Octicons name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
