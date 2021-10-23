import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { css } from './style';

export default function FlatSchedule({data}) {
	return (
		<FlatList
			data={data}
			horizontal
			keyExtractor={(item) => Number(item.id)}
			renderItem={({ item }) => {
				return (
					<View>
						<ListItem>
							<ListItem.Content>
								<ListItem.Title style={css.schedulesTouchable}>
									<TouchableOpacity>
										<Text style={css.schedules}>
											{item.horarioDisponivel}
										</Text>
									</TouchableOpacity>
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				);
			}}
		/>
	);
}
