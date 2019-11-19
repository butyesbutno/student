<template>
<div class="popContainer" v-show="loading">
</div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      loading: false
    }
  },
  created () {
    var that = this
    this.$root.eventBus.$on('loading', function (show) {
      that.loading = show
    })
  }
}
</script>

<style scoped>
</style>
