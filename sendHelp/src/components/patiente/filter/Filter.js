import React, { useState } from 'react';
import { css } from './style';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

export default function Filters() {
	const [modalVisible, setModalVisible] = useState(false);
	const [filtroAbordagem, setFiltroAbordagem] = useState(null);
	const [filtroAtendimento, setFiltroAtendimento] = useState(null);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<View style={css.position}>
			<View style={css.container}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Os filtros foram aplicados.');
						setModalVisible(!modalVisible);
					}}
					coverScreen={false}
					style={css.modal}
				>
					<View>
						<View>
                            <Text>Abordagem:</Text>
							<Picker
								selectedValue={filtroAbordagem}
								style={css.picker}
								onValueChange={(itemValue, itemIndex) =>
									setFiltroAbordagem(itemValue)
								}
							>
								<Picker.Item label="Tanto faz" value="" />
								<Picker.Item label="Psicanalise" value="psicanalise" />
								<Picker.Item label="Terapia cognitiva" value="terapia cognitiva" />
							</Picker>
                            <Text>Tipo de atendimento:</Text>
							<Picker
								selectedValue={filtroAtendimento}
								style={css.picker}
								onValueChange={(itemValue, itemIndex) =>
									setFiltroAtendimento(itemValue)
								}
							>
								<Picker.Item label="Tanto faz" value="misto" />
								<Picker.Item label="Online" value="online" />
								<Picker.Item label="Presencial" value="presencial" />
							</Picker>
							<TouchableOpacity style={css.botao} onPress={toggleModal}>
								<Text style={css.textModal}>Aplicar filtros</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<TouchableOpacity style={css.botao} onPress={toggleModal}>
					<Feather name="filter" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

{
	/* <ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
			>
				{categorias.map((categoria, index) => (
					<TouchableOpacity key={index} style={css.filterItem}>
						<Text>{categoria.nome}</Text>
					</TouchableOpacity>
				))}
			</ScrollView> */
}
