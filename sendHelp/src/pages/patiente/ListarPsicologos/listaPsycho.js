import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { css } from './style';
import ListItem from 'react-native-elements/dist/list/ListItem';
import { instance } from '../../../config/axios';
import Filters from '../../../components/patiente/filter/Filter';
import { useFilter } from '../../../context/Filter';
import { useAuth } from '../../../context/Auth';

export default function ListPsychologist() {
	const [profiles, setProfiles] = useState(null);
	const { filters } = useFilter();
	const { token } = useAuth();

	useEffect(() => {
		async function getProfiles() {
			try {
				if (filters.abordagem == null) {
					filters.abordagem = '';
				}
				if (filters.tipoAtendimento == null) {
					filters.tipoAtendimento = '';
				}
				if (filters.valor == null) {
					filters.valor = '';
				}
				if (filters.genero == null) {
					filters.genero = '';
				}
				if (filters.faixaEtaria == null) {
					filters.faixaEtaria = '';
				}
				if (filters.tempoSessao == null) {
					filters.tempoSessao = '';
				}
				const { data } = await instance.get(
					`/listar?abordagem=${filters.abordagem}&
															tipoAtendimento=${filters.tipoAtendimento}&
															valor=${filters.valor}&
															genero=${filters.genero}&
															faixaEtaria=${filters.faixaEtaria}&
															tempoSessao=${filters.tempoSessao}`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);
				setProfiles(data);
			} catch (err) {
				console.error(err);
			}
		}
		getProfiles();
	}, [filters]);

	return (
		<>
			<ScrollView>
				<FlatList
					data={profiles}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<TouchableOpacity>
							<ListItem bottomDivider style={css.container}>
								<ListItem.Content>
									<ListItem.Title style={css.nome}>
										{item.nome}
									</ListItem.Title>
									<ListItem.Subtitle>
										{item.tipo}
									</ListItem.Subtitle>
									<ListItem.Title>
										{'Abordagem: ' + item.metodologia}
									</ListItem.Title>
									<ListItem.Title>
										{'Faixa etaria: ' + item.faixaEtaria}
									</ListItem.Title>
									<ListItem.Title style={css.valor}>
										{item.valor}
									</ListItem.Title>
									<ListItem.Title style={css.tempoSessao}>
										{'Duração:\n' + item.tempoSessao}
									</ListItem.Title>
								</ListItem.Content>
								<ListItem.Chevron />
							</ListItem>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
			<Filters />
		</>
	);
}
