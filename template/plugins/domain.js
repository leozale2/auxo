import axios from './axios';

export default {
  async create(type, data) {
    return (await axios.post(`/domain/${type}/create`, data)).data;
  },

  // @example
  // let user = domain.get('User',id);
  // user('changeName')(name);
  get(type, id) {
    return method => async (...args) => await axios.post(`/domain/${type}/${id}/${method}`, args);
  }
}
