import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { css } from '../../css/style';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { instance } from '../../config/axios';
import Filters from '../../components/patiente/filter/Filter';


export default function MapPatiente() {
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
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.01922,
					longitudeDelta: 0.01421,
				});
			} else {
				throw new Error('Location permission not granted');
			}
		})();
	}, []);

	useEffect(() => {
		async function fetch() {
		 try {
			  const { data } = await instance.get('/');
			  setPsychologist(data);
			  console.log(psychologist)
		  } catch (err) { console.error(err) }
	  }
	  
	  fetch()
		
	  }, []);

	return (
		<View style={css.container}>
			
			<MapView
				style={css.map}
				initialRegion={origin}
				showsUserLocation={true}
				loadingEnabled={true}
				zoomEnabled={true}
				showsMyLocationButton={true}
			>{psychologist &&
				psychologist.map((psychologist, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: Number(psychologist.latitude),
							longitude: Number(psychologist.longitude),
						}}
					>
						
						<AntDesign name="enviroment" size={24} color="#054781" />
					</Marker>
				))}</MapView>
			
			<StatusBar style="auto" />
		</View>
	);
}
