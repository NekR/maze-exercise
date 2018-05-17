import { dispatch } from '@rematch/core';
import { connect } from 'react-redux';
import { Router as _Router, Route } from 'react-enroute';

export const Router = connect(
  (state) => {
    return { location: state.router.location }
  }
)(_Router);

export { Route };

export function getComponent(load) {
  return class AsyncComponent extends Component {
    state = {};

    componentDidMount() {
      load().then(Component => {
        this.setState({ Component: Component.default });
      });
    }

    render() {
      const { Component } = this.state;

      return Component ? <Component {...this.props} /> : null;
    }
  };
}

dispatch.router.init();