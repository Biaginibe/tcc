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
  StyleSheet
} from "react-native";
import { ListItem } from "react-native-elements";
import { css } from "../../css/style";
import { instance } from "../../config/axios";

export default function ProfilePsycho(route, navigation) {
  const [perfil, setPerfil] = useState();
  const [schedule, setSchedule] = useState();
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
    }
    getData();
  }, [route.route.params]);

  useEffect(() => {
    async function getScheduleData() {
      try {
        const valorrequest = valorid;

        const scheduledata = await instance.get(`/psychologist/1/findSchedule`);
        console.log(scheduledata.data);
        setSchedule(scheduledata.data);
      } catch (err) {
        console.log(err);
      }
    }
    getScheduleData();
  }, [route.route.params]);

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
                  <TouchableOpacity >
                    <Text>Entrar em Contato</Text>
                  </TouchableOpacity>
                </ListItem.Title>
                <ListItem.Title>{item.descricao}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <FlatList
          data={schedule}
          
          numColumns={"1"}
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true  ?  (
              <View>
                <ListItem bottomDivider topDivider>
                  <ListItem.Content>
                    <ListItem.Title>
                      {item.diaDisponivel}
                    </ListItem.Title>
                    <ListItem.Title>
                        <TouchableOpacity style={styles.button}><Text>{item.horarioDisponivel}</Text></TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
