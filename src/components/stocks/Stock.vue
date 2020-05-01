<template>
  <div class="col-sm-6 col-md-4">
    <div :class="randomPanel">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>({{ stock.price }})</small>
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
            @click="buyStock"
            :disabled="inputError"
          >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IStock, IPortfolioStock } from '@/shared/interfaces'

@Component
export default class extends Vue {
  @Prop({ required: true }) readonly stock!: IStock

  amount = 1

  readonly panelTypes: Array<string> = ['success', 'warning', 'danger', 'default', 'info']
  get randomPanel(): string {
    const style = this.panelTypes[Math.ceil(Math.random() * this.panelTypes.length - 1)]
    return `panel panel-${style}`
  }

  get credits(): number {
    return this.$store.getters.credits
  }

  get enoughCredits(): boolean {
    return this.credits >= this.stock.price * this.amount
  }

  get inputBorder(): object | string {
    return this.inputError ? { borderColor: '#dc3545' } : ''
  }

  get inputError(): boolean {
    return this.amount <= 0 || String(this.amount).includes('.') || !this.enoughCredits
  }

  buyStock(): void {
    const order: IPortfolioStock = {
      ...this.stock,
      amount: Number(this.amount)
    }
    this.$store.dispatch('buy', order)
    this.amount = 1
  }
}
</script>
