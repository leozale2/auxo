
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <h2 class="info">
      {{ user.name }} <input v-model="name" @change="change"/>
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>


<script>
import domain from '~/plugins/domain'
import axios from '~/plugins/axios'

async function get(id){
  const {data} = await axios.get('/users/' + id);
  return data;
}

export default {

  data(){
     return {
       name:''
     }
  },
  methods:{
    async change(){
       // await axios.post(`/domain/User/${this.user.id}/changeName`,[this.name]);
       let user = domain.get('User',this.user.id);
       await user('changeName')(this.name);
       this.user.name = this.name;
       this.name = "";
    }
  },
  async asyncData ({ params, error }) {
      let user = await get(params.id);
      return {user};
  },
  head () {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
