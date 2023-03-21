import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from "native-base"
import React, { useEffect } from "react";
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import AppNavigator from "./AppNavigator";
import * as Font from 'expo-font';

import sagas from "@sagas";
import reducers from '@reducer';
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { View, Text, LogBox } from 'react-native';
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: () => true });
LogBox.ignoreAllLogs()
LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'"]);
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

let store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware, loggerMiddleware))
);

sagaMiddleware.run(sagas)


export default function App() {
  // useEffect(() => {
  //   (async () => await Font.loadAsync({
  //     Roboto: require('native-base/Fonts/Roboto.ttf'),
  //     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //   }))();
  // }, []);
  return (
    <Provider store={store}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
    </Provider>
  )
}
