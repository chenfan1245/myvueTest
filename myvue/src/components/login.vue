<template>
	<div id="login">
		<h1>{{msg}}</h1>
		{{message}}
		<button type="button" v-on:click="fun1">点我嘛-求求惹！！😍</button>
    <p id="testp">创建</p>
	</div>
</template>
<script>
	export default {
		name:'login',
		props:['message'],
		data(){
			return{
				msg:'今天是疯狂星期四'
			}
		},
		methods:{
			fun1:function(){
				console.log(this.$props.message)
				this.$emit("parentEvent",this.$props.message-=1);
			}
		},
    beforeCreate() {
      // console.log("创建前-----------",this.$data.msg)
    },
    created() {
      // this.$data.msg = '创建'
      var ptest = document.getElementById('testp');
      ptest.innerHTML = "<font color='red'> 创建后</font>"
      console.log("创建----------",this.$data.msg)
    },
    mounted() {
       // this.$data.msg = '创建'
      // this.$axios.get()
      console.log("移动--------",this.$data.msg)
    },
    beforeMount() {

    },
    beforeUpdate() {
      console.log("更新前----------")
    },
    updated() {
      console.log("更新之后")
    }
	}
</script>

<style>
</style>
