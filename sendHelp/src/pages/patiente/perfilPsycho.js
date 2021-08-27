import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  SectionList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ListItem } from "react-native-elements";
import { css } from "../../css/style";
import { instance } from "../../config/axios";

export default function ProfilePsycho(route, navigation) {
  
  const [perfil, setPerfil] = useState(null);
  const [segunda, setSegunda] = useState(null);
  const [terca, setTerca] = useState();
  
  
  const { valorid } = route.route.params;

  useEffect(() => {
    async function getData() {
      try {
        const valorrequest = valorid;
        console.log("VALOR DA PAGINA" + valorid);
        console.log("VALOR DE REQUEST" + valorrequest);
        const perfildata = await instance.get(
          `/Psychologist/${valorrequest}}/findPsychologistsjoinUsers`
        );
        
        setPerfil(perfildata.data);
        
        
      } catch (err) {
        console.log(err);
      }
      try{
        
        
        const scheduledata = await instance.get(
          `/psychologist/1/findAllbyWeekSchedules`
        );
        console.log(scheduledata.data.scheduleSeg);
        setSegunda(scheduledata.data.scheduleSeg);
        console.log(segunda);
      }
      catch(err){
        console.log(err);
      }
    }
    getData();
  }, [route.route.params]);

  // useEffect(() => {
  //   async function getScheduleData() {
  //     try {
  //       const valorrequest = valorid;

  //       const scheduledata = await instance.get(
  //         `/psychologist/1/findAllbyWeekSchedules`
  //       );
  //       //console.log(scheduledata.data);
  //       console.log(scheduledata.data.scheduleSeg);
  //       setSegunda((scheduledata.data.scheduleSeg));

  //       console.log(segunda);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getScheduleData();
  // }, [route.route.params]);

  return (
    <SafeAreaView style={css.container}>
      <Text>{"PERFIL DO PSICOLOGO" + valorid}</Text>

      <View>
        <FlatList
          data={perfil}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.client.user.nome}</ListItem.Title>
                <ListItem.Subtitle>{item.tipo}</ListItem.Subtitle>
                <ListItem.Title>
                  {"Idade:  " + item.client.user.idade}
                </ListItem.Title>
                <ListItem.Title>
                  {"Abordagem: " + item.metodologia}
                </ListItem.Title>
                <ListItem.Title>
                  {"Faixa etária: " + item.prefFaixaEtaria}
                </ListItem.Title>
                <ListItem.Title>{item.valorConsulta}</ListItem.Title>
                <ListItem.Title>
                  {"Tempo de Sessão: " + item.tempoSessao}
                </ListItem.Title>
                <ListItem.Title>
                  <TouchableOpacity>
                    <Text>Entrar em Contato</Text>
                  </TouchableOpacity>
                </ListItem.Title>
                <ListItem.Title>{item.descricao}</ListItem.Title>
              </ListItem.Content>
              
            </ListItem>
          )}
        />
       
        <Text style={styles.text}>Segunda</Text>
        
        <FlatList
        data={segunda}
        horizontal
        keyExtractor={(item) => Number(item.id)}
        renderItem={({ item }) =>
          item.disponivel == true && item.diaDisponivel == "Segunda" ? (
            <View>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    <TouchableOpacity style={styles.button}>
                      <Text>{item.horarioDisponivel}</Text>
                    </TouchableOpacity>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
          ) : item.lenght <= 0 && item.diaDisponivel == "Segunda" ? (
            <ListItem>
              <ListItem.Content>
                <TouchableOpacity style={styles.button}>
                  <Text>Entrar na Fila</Text>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          ) : null
        }
      /> 
        
        <Text style={styles.text}>Terça</Text>
        <FlatList
          data={segunda}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Terça" ? (
              <View>
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>
                      <TouchableOpacity style={styles.button}>
                        <Text>{item.horarioDisponivel}</Text>
                      </TouchableOpacity>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            ) : null
          }
        />
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});
