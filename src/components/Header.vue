<template>
  <div>
    <nav class="navbar navbar-default position-relative">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">Stock Trader</router-link>
        </div>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <router-link to="/portfolio" tag="li" active-class="active">
              <a>Portfolio</a>
            </router-link>
            <router-link to="/stocks" tag="li" active-class="active">
              <a>Stocks</a>
            </router-link>
          </ul>

          <ul class="nav navbar-nav navbar-light pull-right">
            <li>
              <strong class="navbar-text">Credits: {{ credits }}</strong>
            </li>
            <li @click="endDay">
              <a href="#">End day</a>
            </li>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                :class="dropMenu"
                @click="dropMenu = !dropMenu"
                data-toggle="dropdown"
              >
                Save & Load <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" @click="saveData">Save data</a>
                </li>
                <li>
                  <a href="#" @click="loadData">Load data</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <app-loader v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import service from '../services'
import Loader from '@/components/Loader'

@Component({
  name: 'Header',
  components: {
    'app-loader': Loader
  }
})
export default class extends Vue {
  dropMenu = false
  loading = false

  get credits(): number {
    return this.$store.getters.credits
  }

  endDay(): void {
    this.$store.dispatch('endDay')
  }

  async saveData(): Promise<void> {
    this.loading = true
    const { data } = this.$store.getters

    try {
      const response = await service.put('data.json', data)
      if (response.statusText == 'OK') {
        this.loading = false
      }
    } catch (err) {
      console.error(err)
    }
  }

  async loadData(): Promise<void> {
    this.loading = true

    try {
      const response = await this.$store.dispatch('load')
      if (response.statusText == 'OK') {
        this.loading = false
      }
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
nav {
  z-index: 2;
}
</style>
