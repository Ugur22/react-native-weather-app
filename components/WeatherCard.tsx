import { Card, Text, Button, Icon } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { useGetCurrentWeatherQuery } from '../redux/slices/weatherApi/weatherApi';
import { match, P } from 'ts-pattern';
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import * as Location from 'expo-location';
import { setSelectedLocation } from '../redux/slices/location/LocationSlice';
import Ionicons from '@expo/vector-icons/MaterialIcons';
import WeatherIcon from './WeatherIcon';




export default function WeatherCard() {

  const SearchedLocation = useSelector((state: RootState) => state.location.selectedLocation);

  const { data, isLoading, error } = useGetCurrentWeatherQuery({
    location: SearchedLocation || '',
  });

  const dispatch = useDispatch();

  const getCurrentLocation = async (dispatch: React.Dispatch<any>) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const { coords } = currentLocation;
    const { latitude, longitude } = coords;

    const reverseGeocodedLocation = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocodedLocation.length > 0) {
      const { city } = reverseGeocodedLocation[0];
      dispatch(setSelectedLocation(city));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentLocation(dispatch);
    };

    fetchData();

  }, []);

  const handleGetCurrentLocation = () => {
    getCurrentLocation(dispatch);
  };

  return (
    <>
      <View style={styles.container}>

        <Button radius={"md"} size='md' type="solid" onPress={handleGetCurrentLocation} containerStyle={{
          width: 'auto', marginHorizontal: 10, paddingVertical: 8, alignSelf: 'flex-end'
        }} buttonStyle={{
          flexDirection: 'row', alignItems: 'center', columnGap: 5
        }}>
          <Ionicons name="pin-drop" size={24} color="white" />
          my location
        </Button>
        <Card containerStyle={{ borderRadius: 16 }}>
          {match({ isLoading, error, data })
            .with({ isLoading: true }, () => <ActivityIndicator size="large" />)
            .with({ error: { status: 400, data: { cod: '400', message: 'Nothing to geocode' } } },
              () => <Text>Invalid location or no location. Please try again.</Text>)
            .with({ error: { status: 404, data: { cod: '404', message: 'city not found' } } },
              () => <Text>Invalid location or no location. Please try again.</Text>)
            .with({ error: true }, () => <Text>No weather data available or city does not exist</Text>)
            .with(
              {
                data: {
                  name: P.string, sys: { country: P.string }, main: { temp: P.number }, wind: { speed: P.number },
                  weather: [{ description: P.string }]
                }
              },
              ({ data }) => {
                const { name, main, wind, weather, sys } = data;
                const [{ description }] = weather;
                return (
                  <>
                    <View style={styles.body}>
                      <View>
                        <Text h3 style={{ color: '#658DE4' }}>{main.temp}°C</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                          <Text h4 >{name}</Text>
                          <Text h4 h4Style={{ color: '#959494' }}>{sys.country}</Text>
                        </View>
                      </View>
                      <WeatherIcon condition={weather?.[0]?.main} />
                    </View>
                    <Card.Divider />
                    <Text>Wind Speed: {wind.speed} m/s </Text>
                    <Text>Forecast: {description}</Text>
                  </>
                );
              }
            )
            .exhaustive()}
        </Card>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerInner: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  body: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});