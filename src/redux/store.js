import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { tasksReducer } from './tasks/reducer';
import { logReducer } from './auth/reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  userLogged: logReducer,
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;