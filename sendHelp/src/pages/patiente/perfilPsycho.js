import React, {useState} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, FlatList, SectionList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { css } from '../../css/style';

export default function ProfilePsycho(route, navigation) {
	const [perfil, setPerfil] = useState(null);
	const {valorid}=route.route.params;
	console.log(route.route.params);
	
	
	
	return (
		<SafeAreaView style={css.container}>

			<Text>{"PERFIL DO PSICOLOGO"+valorid} </Text>

			<View>
				{/* <FlatList data={perfil}
				keyExtractor={(item => String(item.id))}
				renderItem={({item})=>(
					<ListItem bottomDivider style={css.container}>
							<ListItem.Content>
								<ListItem.Title style={css.nome}>{item.nome}</ListItem.Title>
								<ListItem.Subtitle>{item.tipo}</ListItem.Subtitle>
								<ListItem.Title>Idade</ListItem.Title>
								<ListItem.Title>{'Abordagem: ' + item.metodologia}</ListItem.Title>
								<ListItem.Title>{'Faixa etária: ' + item.faixaEtaria}</ListItem.Title>
								<ListItem.Title>{item.valor}</ListItem.Title>
								<ListItem.Title>{'Tempo de Sessão: ' + item.tempoSessao}</ListItem.Title>
								<ListItem.Title>Horarios Disponiveis</ListItem.Title>
								<ListItem.Title>Link Entrar em Contato</ListItem.Title>
								<ListItem.Title>Descrição</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron />
						</ListItem>
				)}
				>
					
				</FlatList> */}

				<ScrollView>
					
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
