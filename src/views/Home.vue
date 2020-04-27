<template>
  <div>
    <h1>Trade or view your portfolio</h1>
    <h6>You may Save & Load your data</h6>
    <h6>Click 'End day' to start a new day</h6>
    <hr>
    <p>Your credits: {{ credits }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  get credits(): number {
    return this.$store.getters.credits
  }
}
</script>
