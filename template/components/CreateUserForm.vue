<template lang="html">
   <div>
     <input type="text" v-model="name" value="">
     <button @click="create()">创建</button>
   </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data(){
    return {
      name:''
    }
  },
  methods:{
    async create(){
      // const result = await axios.post("/domain/User/create",{name:this.name});
      this.$emit("create",this.name);
      this.name = "";
      
    }
  }
}
</script>

<style lang="css">
</style>
