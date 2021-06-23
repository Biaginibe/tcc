import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { css } from './style';
import  ListItem  from 'react-native-elements/dist/list/ListItem';
import { instance } from '../../../config/axios';

export default function ListPsychologist() {
	const [profiles, setProfiles] = useState(null);
	useEffect(() => {
		async function getProfiles() {
			try {
				const { data } = await instance.get('/listar');
				setProfiles(data);
			} catch (err) {
				console.error(err);
			}
		}
		getProfiles();
	}, []);

	return (
		<>
			<FlatList
				data={profiles}
				keyExtractor={(item => String(item.id))}
				renderItem={({ item }) => (
					<TouchableOpacity >
							<ListItem bottomDivider style={css.container}>
								<ListItem.Content>
									<ListItem.Title style={css.nome}>{item.nome}</ListItem.Title>
									<ListItem.Subtitle>{item.tipo}</ListItem.Subtitle>
									<ListItem.Title>{'Abordagem: '+item.metodologia}</ListItem.Title>
									<ListItem.Title>{'Faixa etaria: '+item.faixaEtaria}</ListItem.Title>
									<ListItem.Title style={css.valor}>{item.valor}</ListItem.Title>
									<ListItem.Title style={css.tempoSessao}>{'Duração:\n' +item.tempoSessao}</ListItem.Title>
								</ListItem.Content>
								<ListItem.Chevron />
							</ListItem>
					</TouchableOpacity>
				)}
			/>
		</>
	);

}
