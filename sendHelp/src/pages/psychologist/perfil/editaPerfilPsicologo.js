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
import { css } from './style';
import { instance } from '../../../config/axios';
import { Octicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/Auth';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

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
	console.log(psychologist);

	console.log(valorConsulta);

	function handleNavigate() {
		navigate('PerfilPsicologo');
	}
	function handleUpdate() {
		console.log('ISSO AQUI?');
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
		console.log(user, token);
		setUpdate(true);
		handleNavigate();
	}

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
					} catch {
						console.error(err);
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

	return (
		<View style={css.container}>
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
						<TextInput
							style={css.input}
							value={crp}
							onChangeText={(e) => setCrp(e)}
							placeholder='Insira o CRP aqui'
						></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={numeroContato}
							onChangeText={(e) => setNumeroContato(e)}
							placeholder='Insira o Numero aqui'
						></TextInput>
					</View>

					
					<View style={css.borderInput}>
          <Picker
              selectedValue={valorConsulta}
              style={css.picker}
              onValueChange={(itemValue, itemIndex) => setValorConsulta(itemValue)}
            >
              <Picker.Item label="Valor da Consulta: " value={""} />
              <Picker.Item label="Gratuito" value="gratuito" />
              <Picker.Item label="$" value="$" />
              <Picker.Item label="$$" value="$$" />
              <Picker.Item label="$$$" value="$$$" />
            </Picker>

						{/* <TextInput
							style={css.input}
							value={valorConsulta}
							onChangeText={(e) => setValorConsulta(e)}
							placeholder='Insira o valor da consulta aqui'
						></TextInput> */}
					</View>

					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={metodologia}
							onChangeText={(e) => setMetodologia(e)}
							placeholder='Insira o metodologia aqui'
						></TextInput>
					</View>

					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={tempoSessao}
							onChangeText={(e) => setTempoSessao(e)}
							placeholder='Insira o tempo de sessão aqui'
						></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={tipoAtendimento}
							onChangeText={(e) => setTipoAtendimento(e)}
							placeholder='Insira o tipo de atendimento aqui'
						></TextInput>
					</View>

					<View style={css.borderInput}>
						<TextInput
							style={css.input}
							value={prefFaixaEtaria}
							onChangeText={(e) => setPrefFaixaEtaria(e)}
							placeholder='Insira a preferência de faixa etária aqui'
						></TextInput>
					</View>
					<View style={css.borderInput}>
						<TextInput
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
		</View>
	);
}
