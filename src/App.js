/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
     <StackNavigator/>
      <StatusBar style="auto" />
    </Provider>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
