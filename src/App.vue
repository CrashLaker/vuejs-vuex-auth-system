<template>
  <div id="app">
    <nav class="indigo">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo center">
          Cloud<i class="material-icons">cloud</i>
        </a>
        <router-link v-if="!isAuth" to="/login" class="right">
          Login <i class="right material-icons">login</i>
        </router-link>
        <div v-else class="right">
          <div class="left" style="margin-right:10px;">
            Welcome user
          </div>
          <a href="#!" class="right" @click="logout">
            Logout <i class="right material-icons">logout</i>
          </a>
        </div>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li v-if="isAuth"><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container" style="height:30px;">
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
  },
  computed: {
    isAuth(){
      return this.$store.getters.isAuth
    }
  },
  created(){
    this.$store.dispatch('tryLogin')
  },
  mounted(){

  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
