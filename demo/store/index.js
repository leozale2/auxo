
export const state = ()=>({
  users: []
});

export const mutations = {
  create (state , user) {
    state.users.push(user);
  },
  init(state, users){
    state.users = users;
  }
}
