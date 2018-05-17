import { Provider } from 'react-redux';
import store from 'store';
import { Router, Route, getComponent } from 'router';

import 'styles/app.css?global';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            path="/"
            component={getComponent(() => import('pages/Main'))}
          />
          <Route
            path="/pokemon/:name"
            component={getComponent(() => import('pages/Pokemon'))}
          />
        </Router>
      </Provider>
    );
  }
}