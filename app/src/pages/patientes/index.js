import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { css } from './assets/css/style';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function patienteView() {
	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);

	useEffect(() => {
		(async function () {
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
					latitudeDelta: 0.00922,
					longitudeDelta: 0.00421,
				});
			} else {
				throw new Error('Location permission not granted');
			}
		})();
	}, []);

	return (
		<View style={css.container}>
			<MapView
				style={css.map}
				initialRegion={origin}
				showsUserLocation={true}
        loadingEnabled={true}
			></MapView>
			

			<StatusBar style="auto" />
		</View>
	);
}