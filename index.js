/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geocoder from 'react-native-geocoding';
import {API_KEY} from '@env';

Geocoder.init(API_KEY);

AppRegistry.registerComponent(appName, () => App);
