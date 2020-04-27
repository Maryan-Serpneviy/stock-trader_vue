<template>
  <div>
    <app-stock
      v-for="stock in stocks"
      :stock="stock"
      :key="stock.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { IStock } from '../shared/interfaces'
import Stock from '../components/stocks/Stock.vue'

@Component({
  name: 'Stocks',
  components: {
    'app-stock': Stock
  }
})
export default class extends Vue {
  get stocks(): Array<IStock> {
    return this.$store.getters.stocks
  }
}
</script>
