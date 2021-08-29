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
import { useAuth } from '../../context/Auth';

export default function ProfilePsycho(route, navigation) {
  const { token, user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [segunda, setSegunda] = useState([]);
  const [terca, setTerca] = useState([]);
  const [quarta, setQuarta] = useState([]);
  const [quinta, setQuinta] = useState([]);
  const [sexta, setSexta] = useState([]);
  const [sabado, setSabado] = useState([]);
  const [domingo, setDomingo] = useState([]);

  const { valorid } = route.route.params;

  useEffect(() => {
    async function getData() {
      try {
        const valorrequest = valorid;
        console.log("VALOR DA PAGINA" + valorid);
        console.log("VALOR DE REQUEST" + valorrequest);
        const perfildata = await instance.get(
          `/Psychologist/${valorrequest}}/findPsychologistsjoinUsers`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
        );

        setPerfil(perfildata.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const valorrequest = valorid;
        const scheduledata = await instance.get(
          `/psychologist/${valorrequest}}/findAllbyWeekSchedules`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
        );
        // console.log(scheduledata.data);
        setSegunda(scheduledata.data.scheduleSeg);
        setTerca(scheduledata.data.scheduleTer);
        setQuarta(scheduledata.data.scheduleQua);
        setQuinta(scheduledata.data.scheduleQui);
        setSexta(scheduledata.data.scheduleSex);
        setSabado(scheduledata.data.scheduleSab);
        setDomingo(scheduledata.data.scheduleDom);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [route.route.params]);

  return (
    <SafeAreaView style={css.container}>
      

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
        <Text style={styles.text}>Horarios Disponiveis</Text>
        {segunda.length != 0 && segunda !== [] ? (
          <View>
            <Text style={styles.text}>Segunda</Text>
          </View>
        ) : null}

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

        {terca.length != 0 && terca !== []  ? (
          <View>
            <Text style={styles.text}>Terça</Text>
          </View>
        ) : null}
        <FlatList
          data={terca}
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
  
        {quarta.length != 0 && quarta !== []  ? (
          <View>
            <Text style={styles.text}>Quarta</Text>
          </View>
        ) : null}
        <FlatList
          data={quarta}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Quarta" ? (
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
        {quinta.length != 0 && quinta.segunda !== [] ? (
          <View>
            <Text style={styles.text}>Quinta</Text>
          </View>
        ) : null}
        <FlatList
          data={quinta}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Quinta" ? (
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
            ) : <View>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>Horário Indisponível</Text>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>

            </View>
          }
        />
        {sexta.length != 0 && sexta !== [] ? (
          <View>
            <Text style={styles.text}>Sexta</Text>
          </View>
        ) : null}
        <FlatList
          data={sexta}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Sexta" ? (
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
        {sabado.length != 0 && sabado !== [] ? (
          <View>
            <Text style={styles.text}>Sabádo</Text>
          </View>
        ) : null}
        <FlatList
          data={sabado}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Sabádo" ? (
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
        {domingo.length != 0 && domingo !== [] ? (
          <View>
            <Text style={styles.text}>Domingo</Text>
          </View>
        ) : null}
        <FlatList
          data={domingo}
          horizontal
          keyExtractor={(item) => Number(item.id)}
          renderItem={({ item }) =>
            item.disponivel == true && item.diaDisponivel == "Domingo" ? (
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
