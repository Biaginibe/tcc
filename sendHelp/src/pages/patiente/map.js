import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { css } from '../../css/style';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Feather, AntDesign } from '@expo/vector-icons';
import {axios, instance} from '../../config/axios';

export default function MapPatiente(/*{navigation}*/) {
	const [origin, setOrigin] = useState(null);
	const [psychologist, setPsychologist] = useState(null);

	useEffect(() => {
		(async function getLocationAsync() {
			const { status, permissions } = await Permissions.askAsync(
				Permissions.LOCATION
			);
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true,
				});
				console.log("oi")
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.00922,
					longitudeDelta: 0.00421,
				});
			} else {
				throw new Error('Location permission not granted');
			}
		})();
	}, []);

	useEffect(() => {
		(async function getPsychologistLocation() {
			await instance
			.get('/')
			.then((response) => {
					setPsychologist(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.error('ops! ocorreu um erro ' + error);
				});
				
		})();
		// getPsychologistLocation();
	}, []);

	return (
		<View style={css.container}>
			{/* <Button title={'botão'} onPress={() => navigation.navigate('ProfilePsychologist')}/> */}

			<MapView
				style={css.map}
				initialRegion={origin}
				showsUserLocation={true}
				loadingEnabled={true}
			></MapView>
			{psychologist &&
				psychologist.map((psychologist, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: Number(psychologist.latitude),
							longitude: Number(psychologist.longitude),
						}}
					>
						<AntDesign name="exclamation" size={24} color="black" />
					</Marker>
				))}
			<StatusBar style="auto" />
		</View>
	);
}
