<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="welcome"/> -->
	<!-- 首页 -->
	<!-- <element1></element1> -->
	<!-- 登录注册 -->
	<!-- <LoginMain></LoginMain> -->
	<!-- 后台首页 -->
	<!-- <bgHome></bgHome> -->
	<router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import element1 from './components/element.vue'
import LoginMain from './components/LoginMain.vue'
import bgHome from './components/bgHome.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
	element1,
	LoginMain,
	bgHome
  }
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
