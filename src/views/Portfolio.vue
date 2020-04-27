<template>
  <div>
    <app-stock
      v-for="stock in portfolio"
      :key="stock.id"
      :stock="stock"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IPortfolioStock } from '@/shared/interfaces'
import Stock from '../components/portfolio/Stock.vue'

@Component({
  name: 'Portfolio',
  components: {
    'app-stock': Stock
  }
})
export default class extends Vue {
  modal = false

  get portfolio(): Array<IPortfolioStock> {
    return this.$store.getters.portfolio
  }
}
</script>
