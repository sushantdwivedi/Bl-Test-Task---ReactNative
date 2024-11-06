import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StatusBar} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <AppNavigator />
    </Provider>
  );
};

export default App;
