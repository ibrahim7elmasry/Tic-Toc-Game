/**
 * @format
 */

import {AppRegistry} from 'react-native';
 
import {name as appName} from './app.json';
import Game from './App/Container/Game';
// import App from './App/Container/App';
 
AppRegistry.registerComponent(appName, () => Game);
