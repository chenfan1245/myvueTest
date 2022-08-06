<template>
  <div class="hello">
	
    <h1>{{ msg }}</h1>
	{{count}}
    <button type="button" v-on:click="fun01">点我</button>
	<ul>
		<li v-for="item in stu">
			{{item.name}}--{{item.age}}--{{item.score}}
		</li>
	</ul>
	
	<router-link to="/login">登录</router-link><br>
	<router-link to="/enroll">注册</router-link>
	<router-view></router-view>
	
	<login v-bind:message="count"></login>
	<login v-bind:message="count" v-on:parentEvent="fun02"></login>
  </div>
</template>

<script>
	import login from './login.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
	  return{
		  count:0,
		  stu:[
			  {name:'景庆',age:18,score:59.5},
			  {name:'诗婷',age:8,score:9.5},
			  {name:'永波',age:8,score:0.5}
		  ],
	  }  
  },
  methods:{
	  fun01:function(){
		  this.$data.count+=1
	  },
	  fun02:function(re){
		  console.log(typeof(re))
		  this.$data.count = re
	  }
  },
  components:{
	  login
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
