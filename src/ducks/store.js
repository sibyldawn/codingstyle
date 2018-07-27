import { createStore,applyMiddleware} from 'redux';
import reducer, {session} from './reducer';

export default createStore(reducer)