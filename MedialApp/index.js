import { AppRegistry } from 'react-native';
import AppNew from './AppNew'; // Updated import
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppNew);
