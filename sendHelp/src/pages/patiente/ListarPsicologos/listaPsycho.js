import React, { useState, useEffect } from 'react';
import {
	TouchableOpacity,
	FlatList,
	ScrollView,
	TextInput,
	View,
} from 'react-native';
import { css } from './style';
import ListItem from 'react-native-elements/dist/list/ListItem';
import { instance } from '../../../config/axios';
import Filters from '../../../components/patiente/filter/Filter';
import { useFilter } from '../../../context/Filter';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ListPsychologist() {
	const [profiles, setProfiles] = useState(null);
	const [search, setSearch] = useState('');
	const { navigate } = useNavigation();
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
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		}
		getProfiles();
	}, [filters]);

	async function onClick() {
		const data2 = await instance.post(
			`/listarLike?abordagem=${filters.abordagem}&
													tipoAtendimento=${filters.tipoAtendimento}&
													valor=${filters.valor}&
													genero=${filters.genero}&
													faixaEtaria=${filters.faixaEtaria}&
													tempoSessao=${filters.tempoSessao}`,
			{ like: search },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);
		setProfiles(data2.data);
		// console.log(data2.data)
		setSearch('');
	}
	function handleLista(id) {
		console.log('funciona?');
		{
			navigate('ProfileMarker', { valorid: id });
		}
	}

	return (
		<View style={css.bigContainer}>
			{/* <ScrollView > */}
			<View style={css.input}>
				<TextInput
					onChangeText={setSearch}
					value={search}
					placeholder='Procure um psicologo...'
				/>
				<TouchableOpacity onPress={onClick}>
					<FontAwesome
						name='search'
						size={20}
						style={{ marginLeft: 65 }}
						color='#053165'
					/>
				</TouchableOpacity>
			</View>
			<FlatList
				data={profiles}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={(e) => handleLista(item.id)}>
						<ListItem bottomDivider style={css.container}>
							<ListItem.Content>
								<View style={css.inline}>

								<ListItem.Title style={css.nome}>
									{item.nome}
								</ListItem.Title>
								<ListItem.Title style={css.valor}>
									{item.valorConsulta}
								</ListItem.Title>
								</View>
								<ListItem.Subtitle>
									{item.tipoAtendimento}
								</ListItem.Subtitle>
								<View style={{maxWidth: '70%', marginBottom: 5}}>
									<ListItem.Title>
										{'Abordagem: ' + item.metodologia}
									</ListItem.Title>
								</View>
								<ListItem.Title>
									{'Faixa etaria: ' + item.prefFaixaEtaria}
								</ListItem.Title>
								
								<ListItem.Title style={css.tempoSessao}>
									{'Duração:\n' + item.tempoSessao}
								</ListItem.Title>
							</ListItem.Content>
							{/* <ListItem.Chevron /> */}
						</ListItem>
					</TouchableOpacity>
				)}
			/>
			<Filters />
		</View>
	);
}
