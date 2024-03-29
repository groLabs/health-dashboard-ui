import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import dashboardReducer from './store/reducers/groStats';
import priceCheckReducer from './store/reducers/priceCheck';
import Dashboard from './components/dashboard/Dashboard';

// Set global state variables through Redux
const rootReducer = combineReducers({
  groStats: dashboardReducer,
  priceCheck: priceCheckReducer,
});
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
