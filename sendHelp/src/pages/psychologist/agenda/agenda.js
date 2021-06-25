import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { css } from './style';
import { ListItem, CheckBox } from 'react-native-elements';
import { instance } from '../../../config/axios';

export default function PsychologistSchedulle() {
	const [schedulle, setSchedulle] = useState(null);
	const [check, setCheck] = useState(null);

	function press(id) {
		setCheck(id);
	}

	useEffect(() => {
		async function getSchedulle() {
			try {
				if (check != null) {
					try {
						await instance.put(
							`/psychologist/1/${check}/disable_enableSchedule`
						);
						setCheck(null);
					} catch {
						console.error(err);
					}
				}
				const { data } = await instance.get('/psychologist/1/findSchedule'); //aqui quando o login estiver feito precisamos trocar o id do psico que ta chumbado

				setSchedulle(data);
			} catch (err) {
				console.error(err);
			}
		}
		getSchedulle();
	}, [check]);

	return (
		<>
			<FlatList
				data={schedulle}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<TouchableOpacity>
						<ListItem bottomDivider style={css.container}>
							<ListItem.Content>
								<View style={css.text}>
									<ListItem.Title style={css.dia}>
										{item.diaDisponivel}
									</ListItem.Title>
									<ListItem.Title>
										{'Horario: ' + item.horarioDisponivel}
									</ListItem.Title>
								</View>

								<View style={css.checkbox}>
									<CheckBox
										center
										title="Disponivel"
										onPress={() => press(item.id)}
										checked={item.disponivel}
									/>
								</View>
							</ListItem.Content>
						</ListItem>
					</TouchableOpacity>
				)}
			/>
		</>
	);
}
