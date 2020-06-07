<template>
  <div id="login" class="container">
    <div v-if="!isAuth" class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s2" style="line-height:47px;">
            Login:
          </div>
          <div class="input-field col s4">
            <input  id="username" type="text" class="validate" v-model="username">
          </div>
          <div class="input-field col s4">
            <input id="password" type="text" class="validate" @keyup.enter="login" v-model="password">
          </div>
          <div class="input-field col s2">
            <button style="" class="btn left indigo" @click="login">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      User logged in
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/components/axios-auth.js'

export default {
  name: 'Login',
  components: {
  },
  computed: {
    isAuth(){
      return this.$store.getters.isAuth
    }
  },
  data(){
    return {
      username: 'admin',
      password: 'password'
    }
  },
  methods: {
    login: function(){
      let authData = {
        username: this.username,
        password: this.password
      }
      if (this.$store.dispatch('login', authData)){
        this.$router.push('/')
      }
    }
  }
}
</script>
