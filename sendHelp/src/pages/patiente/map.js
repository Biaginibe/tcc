import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { css } from '../../css/style';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { instance } from '../../config/axios';
import Filters from '../../components/patiente/filter/Filter';
import { useFilter } from '../../context/Filter';
import { useAuth } from '../../context/Auth';

export default function MapPatiente() {
	const [origin, setOrigin] = useState(null);
	const [psychologist, setPsychologist] = useState(null);
	const { filters } = useFilter();
	const { token } = useAuth();

	useEffect(() => {
		(async function getLocationAsync() {
			const { status } = await Location.requestPermissionsAsync();
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true,
					psychologist,
				});
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.1922,
					longitudeDelta: 0.1421,
				});
			} else {
				throw new Error('Localização não autorizada');
			}
		})();
	}, []);

	useEffect(() => {
		async function fetch() {
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
					`/filter?abordagem=${filters.abordagem}&
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
				setPsychologist(data);
			} catch (err) {
				console.error(err);
			}
		}

		fetch();
	}, [filters]);

	return (
		<View style={css.container}>
			<MapView
				style={css.map}
				initialRegion={origin}
				showsUserLocation={true}
				loadingEnabled={false}
				zoomEnabled={true}
				showsMyLocationButton={true}
			>
				{psychologist &&
					psychologist.map((psychologist, index) => (
						<Marker
							key={index}
							coordinate={{
								latitude: Number(psychologist.latitude),
								longitude: Number(psychologist.longitude),
							}}
						>
							<AntDesign
								name='enviroment'
								size={24}
								color='#054781'
							/>
						</Marker>
					))}
			</MapView>
			<Filters cssName={'mapa'} />

			<StatusBar style='auto' />
		</View>
	);
}
