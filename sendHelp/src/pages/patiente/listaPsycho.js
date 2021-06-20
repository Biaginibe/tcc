import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
} from 'react-native';
import { css } from '../../css/style';
import CompleteFlatList from 'react-native-complete-flatlist';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { instance } from '../../config/axios';

export default function ListPsychologist() {
	const [profiles, setProfiles] = useState(null);
	useEffect(() => {
		async function fetch() {
			try {
				const { data } = await instance.get('/listar');
				setProfiles(data);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		}
		fetch();
	}, []);

	return (
		<>
			<SafeAreaView style={css.container} forceInset={{top:'always'}}>
				<FlatList
					data={profiles}
					keyExtractor={ item => item.id.toString()}
					renderItem={(profiles) => {
						return (
							<TouchableOpacity>
								<ListItem chevron title={profiles.nome} />
							</TouchableOpacity>
						);
					}}
				/>
			</SafeAreaView>
		</>
	);
}
