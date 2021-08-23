import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  SectionList,
  ScrollView,
  
} from "react-native";
import { ListItem } from "react-native-elements";
import { css } from "../../css/style";
import { instance } from "../../config/axios";

export default function ProfilePsycho(route, navigation) {
  const [perfil, setPerfil] = useState();
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
  
  return (
    <SafeAreaView style={css.container}>
      <Text>{"PERFIL DO PSICOLOGO" + valorid}</Text>

      <View>
        {console.log(perfil)}
     

        <FlatList data={perfil}
				renderItem={({item})=>(
					<ListItem bottomDivider >
							<ListItem.Content>
								<ListItem.Title >{item.client.user.nome}</ListItem.Title>
								<ListItem.Subtitle>{item.tipo}</ListItem.Subtitle>
								<ListItem.Title>{'Idade:  '+ item.client.user.idade}</ListItem.Title>
								<ListItem.Title>{'Abordagem: ' + item.metodologia}</ListItem.Title>
								<ListItem.Title>{'Faixa etária: ' + item.prefFaixaEtaria}</ListItem.Title>
								<ListItem.Title>{item.valorConsulta}</ListItem.Title>
								<ListItem.Title>{'Tempo de Sessão: ' + item.tempoSessao}</ListItem.Title>
								<ListItem.Title>Horarios Disponiveis(ainda não sei como integrar agenda :P)</ListItem.Title>
								<ListItem.Title><TouchableOpacity style={css.contactbutton}><Text>Entrar em Contato</Text></TouchableOpacity></ListItem.Title>
								<ListItem.Title>{item.descricao}</ListItem.Title>
							</ListItem.Content>
							
						</ListItem>
				)}
				/>
      </View>
    </SafeAreaView>
  );
}
