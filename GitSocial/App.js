/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: LoginPage},
  Profile: {screen: MainPage},
});

const App = createAppContainer(MainNavigator);

export default App;
