<template>
  <div class="col-sm-6 col-md-4">
    <div :class="randomPanel">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(price: {{ stock.price }} | amount: {{ stock.amount }})</small>
        </h3>
      </div>

      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Amount"
            v-model="amount"
            :style="inputBorder"
          >
        </div>
        <div class="pull-right">
          <button
            class="btn btn-primary"
            @click="sellStock"
            :disabled="inputError"
          >Sell</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IPortfolioStock } from '@/shared/interfaces'
import Stock from '../stocks/Stock.vue'

@Component
export default class extends Stock {
  @Prop({ required: true }) readonly stock!: IPortfolioStock

  get creditsExceed() {
    return this.stock.amount < this.amount
  }

  get inputError(): boolean {
    return this.amount <= 0 || String(this.amount).includes('.') || this.creditsExceed
  }

  sellStock(): void {
    const order: IPortfolioStock = {
      ...this.stock,
      amount: Number(this.amount)
    }
    this.$store.dispatch('sell', order)
    this.amount = 0
  }
}
</script>
