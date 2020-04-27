<template>
  <div id="app" class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from './components/Header.vue'

@Component({
  name: 'App',
  components: {
    'app-header': Header
  }
})
export default class extends Vue {

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 500px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.slide-enter-active {
  animation: slide-in 0.2s;
}

.slide-leave-active {
  animation: slide-out 0.25s;
}

@keyframes slide-in {
  from {
    transform: translateY(-100vw);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-100vw);
  }
}
</style>
