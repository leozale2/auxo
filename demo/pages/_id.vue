
<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      User
    </h1>
    <div class="info">
      <p v-show="error" class="error"> {{error}} </p>
      <p> <label>{{ user.name }} <input v-model="name" /> </label></p>
      <p> <label><img height="30" @click="refresh" ref="captcha" src="/captcha" /> <input v-model="captcha" /></label> </p>
      <p>
        <a @click="submit" href="#" class="button"> submit </a>
        <nuxt-link class="button" to="/">
        Users
      </nuxt-link>
    </p>
    </div>
    <div>

    </div>
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
       name:'',
       captcha:'',
       error:''
     }
  },
  methods:{

    refresh(){
      this.$nextTick( ()=> {
        this.$refs.captcha.setAttribute("src","/captcha?"+Date.now());
      })
    },

    async submit(){
       // await axios.post(`/domain/User/${this.user.id}/changeName`,[this.name]);
       let user = domain.get('User',this.user.id);
       let {error} = await user('changeName')(this.name , this.captcha);
       if(error && error.captcha){
         this.error = error.captcha;
       }else{
         this.error = ""
         this.user.name = this.name;
       }
       this.name = "";
       this.captcha = "";
       this.refresh();

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

label{
  font-size: 20pt;
  border-bottom: 1px solid #333;
}

input {
  border:none;
  font-size: 17pt;
  outline: none;
}

.title
{
  margin-top: 30px;
}

.error{
  color:#f66;
}

.info
{
  color: #9aabb1;
  margin: 0 auto;
  text-align: left;
  width: 400px;
}
.button
{
  margin-right: 10px;
  font-size: 10px
}
</style>
