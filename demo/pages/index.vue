
<template>
  <section class="container">
    <create-user-form @create="create"/>
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in $store.state.users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: user.id }}">
          {{ user.name }} 
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>


<script>
import axios from '~/plugins/axios'
import CreateUserForm from '~/components/CreateUserForm.vue';

export default {
  components:{
    CreateUserForm
  },
  async fetch ({ store, params }) {
    let {data} = await axios.get('/users');
    store.commit('init', data);
  },
  methods:{
    async create(name){
      const {data} = await axios.post("/domain/User/create",{name});
      this.$store.commit('create', {id:data.id,name});
    }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
