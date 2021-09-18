import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Button
} from "react-native";
import { css } from "../../../css/style";
import { instance } from "../../../config/axios";
import { Octicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/Auth";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

export default function editaPsychologistProfile(navigation) {
  const { token, user, signOut, setUser, psychologist, setPsychologist } = useAuth();
  const {navigate} = useNavigation();
  const [perfil, setPerfil] = useState(user);
  const [nome, setNome] = useState(user.nome);
  
  const [email, setEmail] = useState(user.email);
  const [idade, setIdade] = useState(user.idade);
  const [senha, setSenha] = useState(user.senha);
  const [crp, setCrp] = useState(psychologist.crp);
  const [numeroContato, setNumeroContato] = useState(psychologist.numeroContato);
  const [valorConsulta, setValorConsulta] = useState(psychologist.valorConsulta);
  const [metodologia, setMetodologia] = useState(psychologist.metodologia);
  const [tempoSessao, setTempoSessao] = useState(psychologist.tempoSessao);
  const [tipoAtendimento, setTipoAtendimento] = useState(psychologist.tipoAtendimento);
  const [prefFaixaEtaria, setPrefFaixaEtaria] = useState(psychologist.prefFaixaEtaria);
  const [descricao, setDescricao] = useState(psychologist.descricao);
  const [update, setUpdate] = useState(null);
    console.log(psychologist);
  
  console.log(valorConsulta)

  function handleNavigate(){
    
    navigate('PerfilPsicologo');
  }
  function handleUpdate() {
    
    console.log("ISSO AQUI?")
     setUser({...user, nome: nome, idade:idade, email: email})
     setPsychologist({...psychologist, crp: crp, numeroContato: numeroContato, valorConsulta: valorConsulta, metodologia: metodologia, tempoSessao: tempoSessao, tipoAtendimento: tipoAtendimento, prefFaixaEtaria: prefFaixaEtaria, descricao: descricao })
    console.log(user, token);
    setUpdate(true);
    handleNavigate()
   
  }

  useEffect(() => {
    async function getData() {
      try {
        const valorrequest = psychologist.id;
        if (update != null) {
          try {
            console.log("Entrou no IF")
            await instance.put(
              `/psychologist/${valorrequest}/updatePsychologists?nome=${nome}&idade=${idade}&email=${email}&crp=${crp}&numeroContato=${numeroContato}&valorConsulta=${valorConsulta}&metodologia=${metodologia}&tempoSessao=${tempoSessao}&tipoAtendimento=${tipoAtendimento}&prefFaixaEtaria=${prefFaixaEtaria}&descricao=${descricao}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            
            setUpdate(null);
          } catch {
            console.error(err);
          }
        }
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
  }, [update]);

  console.log(perfil.nome);

  return (
    <View style={css.container}>
      <SafeAreaView style={css.container}>
        
        <ScrollView>
          <TextInput value={nome} onChangeText={(e) => setNome(e)}></TextInput>
          
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
            value={crp}
            onChangeText={(e) => setCrp(e)}
            placeholder="Insira o CRP aqui"
          ></TextInput>
           <TextInput
            value={numeroContato}
            onChangeText={(e) => setNumeroContato(e)}
            placeholder="Insira o Numero aqui"
          ></TextInput>
          <TextInput
            value={valorConsulta}
            onChangeText={(e) => setValorConsulta(e)}
            placeholder="Insira o valor da consulta aqui"
          ></TextInput>
          <TextInput
            value={metodologia}
            onChangeText={(e) => setMetodologia(e)}
            placeholder="Insira o metodologia aqui"
          ></TextInput>
          <TextInput
            value={tempoSessao}
            onChangeText={(e) => setTempoSessao(e)}
            placeholder="Insira o tempo de sessão aqui"
          ></TextInput>
          <TextInput
            value={tipoAtendimento}
            onChangeText={(e) => setTipoAtendimento(e)}
            placeholder="Insira o tipo de atendimento(online ou presencial) aqui"
          ></TextInput>
          <TextInput
            value={prefFaixaEtaria}
            onChangeText={(e) => setPrefFaixaEtaria(e)}
            placeholder="Insira a preferência de faixa etária aqui"
          ></TextInput>
          <TextInput
            value={descricao}
            onChangeText={(e) => setDescricao(e)}
            placeholder="Descreva-se aqui"
          ></TextInput>
        </ScrollView>

       
          {/* <TouchableOpacity onPress={handleUpdate()}>
            SALVAR
          </TouchableOpacity> */}
          <Button onPress={()=>{handleUpdate()}} title="Salvar"></Button>
       

        <TouchableOpacity onPress={signOut}>
          <Octicons name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
