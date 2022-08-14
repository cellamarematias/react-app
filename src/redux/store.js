import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { tasksReducer } from './tasks/reducer';
import { logReducer } from './auth/reducer';
import { ExpensessReducer } from './expenses/reducer';
import { couplesReducer } from './couples/reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  userLogged: logReducer,
  expenses: ExpensessReducer,
  couples: couplesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;