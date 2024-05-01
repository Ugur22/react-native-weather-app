import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { theme } from './theme';
import WeatherCard from './components/WeatherCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@rneui/themed';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SearchField from './components/SearchField';


export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Weather app', style: { color: '#fff' } }}
            rightComponent={{ icon: 'cloud', color: '#fff' }}
          />
          <SearchField />
          <View style={styles.container}>
            <WeatherCard />
            <StatusBar style="auto" />
          </View>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});