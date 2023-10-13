import mixpanel from 'mixpanel-browser';
mixpanel.init('f56cdb1cb8cec36d7d2b6d42bc6dddff');

let actions = {
  identify: (id) => {
    mixpanel.identify(id);
  },
  alias: (id) => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;