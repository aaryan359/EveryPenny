import React from 'react';
import { Text } from 'react-native';
import MainNavigation from './Src/Navigation/MainNavigation';
import {Provider} from 'react-redux';
import {store} from './Src/store/store';


const App = () => {
  return (
 
      <Provider store={store}>
            <MainNavigation />
      </Provider>

 
  );
};

export default App;