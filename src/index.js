import React, { useEffect } from "react";
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import sagas from "@sagas";
import reducers from '@reducer';
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { NativeBaseProvider } from "native-base"
import AppNavigator from "./AppNavigator";
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: () => true });
LogBox.ignoreAllLogs()

let store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware, loggerMiddleware))
);

sagaMiddleware.run(sagas)

App = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <AppNavigator />
            </NativeBaseProvider>
        </Provider>
    )
}

export default App
