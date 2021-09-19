import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Alert,
	Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

import { css } from './style';
import { instance } from '../../../config/axios';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SwitchSelector from 'react-native-switch-selector';

export default function editaPsychologistProfile(navigation) {
	const { token, user, signOut, setUser, psychologist, setPsychologist } =
		useAuth();
	const { navigate } = useNavigation();
	const [perfil, setPerfil] = useState(user);
	const [nome, setNome] = useState(user.nome);

	const [email, setEmail] = useState(user.email);
	const [idade, setIdade] = useState(user.idade);
	const [senha, setSenha] = useState(user.senha);
	const [crp, setCrp] = useState(psychologist.crp);
	const [numeroContato, setNumeroContato] = useState(
		psychologist.numeroContato
	);
	const [valorConsulta, setValorConsulta] = useState(
		psychologist.valorConsulta
	);
	const [metodologia, setMetodologia] = useState(psychologist.metodologia);
	const [tempoSessao, setTempoSessao] = useState(psychologist.tempoSessao);
	const [tipoAtendimento, setTipoAtendimento] = useState(
		psychologist.tipoAtendimento
	);
	const [prefFaixaEtaria, setPrefFaixaEtaria] = useState(
		psychologist.prefFaixaEtaria
	);
	const [descricao, setDescricao] = useState(psychologist.descricao);
	const [update, setUpdate] = useState(null);
	const [initial, setInitial] = useState(null);
	const [initial2, setInitial2] = useState(null);

	function handleNavigate() {
		navigate('PerfilPsicologo');
	}
	function handleUpdate() {
		setUser({ ...user, nome: nome, idade: idade, email: email });
		setPsychologist({
			...psychologist,
			crp: crp,
			numeroContato: numeroContato,
			valorConsulta: valorConsulta,
			metodologia: metodologia,
			tempoSessao: tempoSessao,
			tipoAtendimento: tipoAtendimento,
			prefFaixaEtaria: prefFaixaEtaria,
			descricao: descricao,
		});
		setUpdate(!update);

		handleNavigate();
	}

	useEffect(() => {
		if (valorConsulta == 'gratuito') setInitial(1);
		else if (valorConsulta == '$') setInitial(2);
		else if (valorConsulta == '$$') setInitial(3);
		else if (valorConsulta == '$$$') setInitial(4);
		else setInitial(-1);

		if (tempoSessao == '30 minutos') setInitial2(1);
		else if (tempoSessao == '40 minutos') setInitial2(2);
		else if (tempoSessao == '50 minutos') setInitial2(3);
		else if (tempoSessao == '60 minutos') setInitial2(4);
		else setInitial2(-1);
	});

	useEffect(() => {
		async function getData() {
			try {
				const valorrequest = psychologist.id;
				if (update != null) {
					try {
						console.log('Entrou no IF');
						await instance.put(
							`/psychologist/${valorrequest}/updatePsychologists?nome=${nome}&idade=${idade}&email=${email}&crp=${crp}&numeroContato=${numeroContato}&valorConsulta=${valorConsulta}&metodologia=${metodologia}&tempoSessao=${tempoSessao}&tipoAtendimento=${tipoAtendimento}&prefFaixaEtaria=${prefFaixaEtaria}&descricao=${descricao}`,
							{
								headers: {
									Authorization: 'Bearer ' + token,
								},
							}
						);

						setUpdate(null);
					} catch (err) {
						console.log(err);
					}
				}
				const perfildata = await instance.get(
					`/patientes/${valorrequest}}/findOnebyIDPatientes`,
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					}
				);

				setPerfil(perfildata.data);

				// console.log(perfil);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, [update]);

	console.log(perfil.nome);

	const options = [
		{
			value: '',
		},
		{
			label: 'gratuito',
			value: 'gratuito',
			accessibilityLabel: 'gratuito',
		},
		{
			label: '$',
			value: '$',
			accessibilityLabel: '$',
		},
		{
			label: '$$',
			value: '$$',
			accessibilityLabel: '$$',
		},
		{
			label: '$$$',
			value: '$$$',
			accessibilityLabel: '$$$',
		},
	];
	const options2 = [
		{
			value: '',
		},
		{
			label: '30',
			value: '30 minutos',
			accessibilityLabel: '30 minutos',
		},
		{
			label: '40',
			value: '40 minutos',
			accessibilityLabel: '40 minutos',
		},
		{
			label: '50',
			value: '50 minutos',
			accessibilityLabel: '50 minutos',
		},
		{
			label: '60',
			value: '60 minutos',
			accessibilityLabel: '60 minutos',
		},
	];

	return (
		<View style={css.container}>
			{initial && initial2 && (
				<SafeAreaView style={css.containerLateral}>
					<ScrollView>
						<View style={css.borderInput}>
							<TextInput
								style={css.input}
								value={nome}
								onChangeText={(e) => setNome(e)}
								placeholder='Nome'
							></TextInput>
						</View>
						<View style={css.borderInput}>
							<TextInput
								style={css.input}
								value={email}
								onChangeText={(e) => setEmail(e)}
								placeholder='Email'
							></TextInput>
						</View>
						<View style={css.borderInput}>
							<TextInput
								style={css.input}
								value={String(idade)}
								onChangeText={(e) => setIdade(e)}
								placeholder={String(idade)}
							></TextInput>
						</View>

						<View style={css.borderInput}>
							<TextInputMask
								type={'cel-phone'}
								options={{
									maskType: 'BRL',
									withDDD: true,
									dddMask: '(99) ',
								}}
								style={css.input}
								value={numeroContato}
								onChangeText={(e) => setNumeroContato(e)}
								placeholder='Insira o Numero aqui'
							></TextInputMask>
						</View>
						<Text style={css.info}>Faixa de valor da consulta</Text>
						<SwitchSelector
							options={options}
							initial={initial}
							onPress={(value) => setValorConsulta(value)}
							buttonColor={'#F1F1F1'}
							selectedColor={'#0BBF59'}
							borderRadius={5}
							style={{ marginBottom: 20 }}
							hasPadding
						/>
						<Text style={css.info}>Tempo da sessão em minutos</Text>
						<SwitchSelector
							options={options2}
							initial={initial2}
							onPress={(value) => setTempoSessao(value)}
							buttonColor={'#F1F1F1'}
							selectedColor={'#0BBF59'}
							borderRadius={5}
							style={{ marginBottom: 20 }}
							hasPadding
						/>
						<View style={css.borderInput}>
							<Picker
								selectedValue={metodologia}
								style={css.picker}
								onValueChange={(itemValue, itemIndex) =>
									setMetodologia(itemValue)
								}
							>
								<Picker.Item label='Metodologia' value={''} />
								<Picker.Item
									label='Psicanalise'
									value='psicanalise'
								/>
								<Picker.Item
									label='Terapia Cognitivo-Comportamental'
									value='terapia cognitivo-comportamental'
								/>
								<Picker.Item
									label='Terapia Comportamental'
									value='terapia comportamental'
								/>
								<Picker.Item
									label='Terapia Interpessoal'
									value='terapia interpessoal'
								/>
							</Picker>
						</View>

						<View style={css.borderInput}>
							<Picker
								selectedValue={tipoAtendimento}
								style={css.picker}
								onValueChange={(itemValue, itemIndex) =>
									setTipoAtendimento(itemValue)
								}
							>
								<Picker.Item
									label='Tipo de atendimento'
									value={''}
								/>
								<Picker.Item label='Online' value='online' />
								<Picker.Item
									label='Presencial'
									value='presencial'
								/>
							</Picker>
						</View>

						<View style={css.borderInput}>
							<Picker
								selectedValue={prefFaixaEtaria}
								style={css.picker}
								onValueChange={(itemValue, itemIndex) =>
									setPrefFaixaEtaria(itemValue)
								}
							>
								<Picker.Item
									label='Faixa etária atendida'
									value={''}
								/>
								<Picker.Item
									label='crianças (6 a 12 anos)'
									value='criança'
								/>
								<Picker.Item
									label='adolescente (13 a 17 anos)'
									value='adolescente'
								/>
								<Picker.Item
									label='jovens (18 a 23 anos)'
									value='jovem'
								/>
								<Picker.Item
									label='adultos (+24 anos)'
									value='adulto'
								/>
								<Picker.Item label='casais' value='casal' />
							</Picker>
						</View>
						<View style={css.borderInput}>
							<TextInput
								style={css.input}
								value={crp}
								onChangeText={(e) => setCrp(e)}
								placeholder='Insira o CRP aqui'
							></TextInput>
						</View>
						<Text style={css.info}>Descrição:</Text>
						<View style={css.borderInput}>
							<TextInput
								multiline={true}
								style={css.input}
								value={descricao}
								onChangeText={(e) => setDescricao(e)}
								placeholder='Descreva-se aqui'
							></TextInput>
						</View>

						<TouchableOpacity onPress={handleUpdate}>
							<View style={css.btnSave}>
								<Text style={css.txtSave}>Salvar</Text>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			)}
		</View>
	);
}
