<template>
  <div id="app">
    <router-view/>
    <loading></loading>
  </div>
</template>

<script>
import loading from './components/loading'
export default {
  name: 'App',
  components: {
    loading
  }
}
</script>

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
body {
  background-color: #F9F9F9;
}
input {
  -webkit-appearance: none;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.pageBoxDefault {
  height: 100vh;
  width: 100%;
  background-color: rgb(249,249,249);
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.inputHintSpan {
  display: inline-block;
  width: 100%;
  height: 0.43rem;
  line-height: 0.43rem;
  padding-left: 0.15rem;
  font-family: 'PingFang-SC-Regular';
  text-align: left;
  font-size: 0.135rem;
  color: #999;
  background-color: #F9F9F9;
}

.inputField {
  display: block;
  width: 100%;
  height: 0.52rem;
  line-height: 0.43rem;
  padding-left: 0.15rem;
  font-family: 'PingFang-SC-Regular';
  text-align: left;
  font-size: 0.125rem;
  color: #999;
  background-color: white;
  border:0;
}

.doActionSpan {
  display: inline-block;
  width: 3.45rem;
  height: 0.44rem;
  line-height: 0.44rem;
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  border-radius: 8px;
  font-family: 'PingFang-SC-Medium';
  text-align: center;
  font-size: 0.15rem;
  color: #FFF;
  background-color: #5E89FF;
  -webkit-appearance: none;
}
.columnFlexCenter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34,34,34,0.2);
}

</style>
