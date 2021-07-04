import React, { useState, useEffect } from 'react'; 
import { css } from './style';
import {
	View,
	TouchableOpacity,
	Text,
	SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { useFilter } from '../../../context/Filter';

export default function Filters() {
	const [modalVisible, setModalVisible] = useState(false);
	const [abordagem, setAbordagem] = useState(null);
	const [tipoAtendimento, setTipoAtendimento] = useState(null);
	const [genero, setGenero] = useState(null);
	const [faixaEtaria, setFaixaEtaria] = useState(null);
	const [tempoSessao, setTempoSessao] = useState(null);
	const [valor, setValor] = useState(null);
	const [aplicar, setAplicar] = useState(null);

	const { filters, setFilters } = useFilter();

	useEffect(() => {
		if (aplicar != null) {
			setFilters({
				abordagem: abordagem,
				tipoAtendimento: tipoAtendimento,
				valor: valor,
				genero: genero,
				faixaEtaria: faixaEtaria,
				tempoSessao: tempoSessao,
			});
		}
		setAplicar(null);
		console.log(filters);
	}, [aplicar]);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};
	
	const aplicarFiltro = () => {
		setModalVisible(false);
		setAplicar(true);
	};

	return (
		<View style={css.container}>
			<Modal
				animationType="slide"
				transparent={true}
				isVisible={modalVisible}
				swipeDirection="up"
				onSwipeComplete={() => {
					setModalVisible(false);
				}}
				onRequestClose={() => {
					alert('Você fechou sem aplicar os filtros!');
					setModalVisible(false);
				}}
				coverScreen={true}
				style={{ flex: 1 }}
			>
				<SafeAreaView style={css.modal}>
					<View>
						<Text style={css.label}>Abordagem:</Text>
						<Picker
							selectedValue={abordagem}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) => setAbordagem(itemValue)}
						>
							<Picker.Item label="Selecione" value={''} />
							<Picker.Item label="Psicanalise" value="psicanalise" />
							<Picker.Item
								label="Terapia cognitiva"
								value="terapia cognitiva"
							/>
							<Picker.Item
								label="Terapia comportamental"
								value="terapia comportamental"
							/>
						</Picker>

						<Text style={css.label}>Tipo de atendimento:</Text>
						<Picker
							selectedValue={tipoAtendimento}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) =>
								setTipoAtendimento(itemValue)
							}
						>
							<Picker.Item label="Selecione" value={''} />
							<Picker.Item label="Online" value="online" />
							<Picker.Item label="Presencial" value="presencial" />
						</Picker>

						<Text style={css.label}>Genero do profissional:</Text>
						<Picker
							selectedValue={genero}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
						>
							<Picker.Item label="Selecione" value={''} />
							<Picker.Item label="Feminino" value="feminino" />
							<Picker.Item label="Masculino" value="masculino" />
						</Picker>

						<Text style={css.label}>Categoria do atendimento:</Text>
						<Picker
							selectedValue={faixaEtaria}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) =>
								setFaixaEtaria(itemValue)
							}
						>
							<Picker.Item label="Selecione" value={''} />
							<Picker.Item label="crianças (6 a 12 anos)" value="crianca" />
							<Picker.Item
								label="adolescente (13 a 17 anos)"
								value="adolescente"
							/>
							<Picker.Item label="jovens (18 a 23 anos)" value="jovem" />
							<Picker.Item label="adultos (+24 anos)" value="adulto" />
							<Picker.Item label="casais" value="casal" />
						</Picker>

						<Text style={css.label}>Tempo de sessão:</Text>
						<Picker
							selectedValue={tempoSessao}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) =>
								setTempoSessao(itemValue)
							}
						>
							<Picker.Item label="Selecione" value={''} />
							<Picker.Item label="30 minutos" value="30 minutos" />
							<Picker.Item label="40 minutos" value="40 minutos" />
							<Picker.Item label="50 minutos" value="50 minutos" />
							<Picker.Item label="60 minutos" value="60 minutos" />
						</Picker>

						<Text style={css.label}>Valor:</Text>
						<Picker
							selectedValue={valor}
							style={css.picker}
							onValueChange={(itemValue, itemIndex) => setValor(itemValue)}
						>
							<Picker.Item label="Selecione" value={''} />
							 <Picker.Item label="Gratuito" value="gratuito" /> 
							<Picker.Item label="$" value="$" /> {/* <=R$25,00 */}
							<Picker.Item label="$$" value="$$" /> {/* R$25,00<>R$50,00*/}
							<Picker.Item label="$$$" value="$$$" /> {/* R$50,00<>R$80,00*/}
						</Picker>

						<View style={css.inline}>
							<TouchableOpacity style={css.botaoAplica} onPress={aplicarFiltro}>
								<Text style={css.textModal}>Aplicar filtros</Text>
							</TouchableOpacity>
							<TouchableOpacity style={css.botaoCancelar} onPress={toggleModal}>
								<Text style={css.textModal}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</Modal>

			<TouchableOpacity style={css.botao} onPress={toggleModal}>
				<Feather name="filter" size={35} color="white" />
			</TouchableOpacity>
		</View>
	);
}
