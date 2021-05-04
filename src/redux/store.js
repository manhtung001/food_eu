import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/RootReducer';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	// whitelist: ['homeScreenReducer'],

}
const persistedReducer = persistReducer(persistConfig, RootReducer)

const configureStore = () => {
	const store = createStore(
		persistedReducer,
		// applyMiddleware(...loggerMiddleware),
	);
	return store;
};

export default configureStore;
