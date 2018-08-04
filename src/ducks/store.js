import { createStore,applyMiddleware} from 'redux';
import reducer, {session} from './reducer';

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())