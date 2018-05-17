export default {
  state: {
    location: window.location.pathname,
  },
  effects: {
    async navigate(pathname) {
      history.pushState(null, '', pathname);
      this.setLocation({ pathname: pathname });
    },

    async init() {
      window.addEventListener('popstate', () => {
        this.setLocation({ pathname: window.location.pathname });
      });
    }
  },
  reducers: {
    setLocation(state, { pathname }) {
      return { location: pathname };
    }
  },
};