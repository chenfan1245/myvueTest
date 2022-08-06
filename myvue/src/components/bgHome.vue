<template>
	<div id="bgHome">
		<div id="bgHead">
			<div class="block" style="position: absolute;top: 10px;right: 155px;"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
			<p style="color: #FFFFFF;position: absolute;top: 25px;right: 30px;">欢迎你:景庆大王</p>
		</div>
		<div id="leftNav">
			<el-radio-group v-model="isCollapse">
			  <el-radio-button :label="false">展开</el-radio-button>
			  <el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>
			<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="margin-top: 40px;">
			  <el-submenu index="1">
			    <template slot="title">
			      <i class="el-icon-location"></i>
			      <span slot="title">导航一</span>
			    </template>
			    <el-menu-item-group>
			      <span slot="title">分组一</span>
			      <el-menu-item index="1-1">
					  <router-link to="/userList/123">用户管理</router-link>
				  </el-menu-item>
			      <el-menu-item index="1-2">
					    <router-link to="/menuList">菜单管理</router-link>
				  </el-menu-item>
			    </el-menu-item-group>
			    <el-menu-item-group title="分组2">
			      <el-menu-item index="1-3">
					  <router-link to="/roleList">角色管理</router-link>
				  </el-menu-item>
			    </el-menu-item-group>
			    <el-submenu index="1-4">
			      <span slot="title">选项4</span>
			      <el-menu-item index="1-4-1">
					   <router-link to="/rolePowerManage">角色权限管理</router-link>
				  </el-menu-item>
			    </el-submenu>
			  </el-submenu>
			  <el-menu-item index="2">
			    <i class="el-icon-menu"></i>
			    <span slot="title">导航二</span>
			  </el-menu-item>
			  <el-menu-item index="3" disabled>
			    <i class="el-icon-document"></i>
			    <span slot="title">导航三</span>
			  </el-menu-item>
			  <el-menu-item index="4">
			    <i class="el-icon-setting"></i>
			    <span slot="title">导航四</span>
			  </el-menu-item>
			</el-menu>
		</div>
		<div id="right-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		name:'bgHome',
		 data () {
		      return {
		        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
		        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
		        sizeList: ["large", "medium", "small"],
				isCollapse: true
		      }
		    },
			 methods: {
			      handleOpen(key, keyPath) {
			        console.log(key, keyPath);
			      },
			      handleClose(key, keyPath) {
			        console.log(key, keyPath);
			      }
			    }
	}
</script>

<style>
	 .el-menu-vertical-demo:not(.el-menu--collapse) {
		margin-top: 80px;
	    width: 303px;
	    min-height: 640px;
	  }
	#bgHome{
		width: 100vw;
		padding: 0;
		margin: 0;
		height: 100vh;
		background-color: #00979D;
	}
	#bgHead{
		width: 80%;
		height: 80px;
		background-color: #000066;
		margin-left: 305px;
	}
	#leftNav{
		position: absolute;
		top: 0;
		width: 305px;
		height: 100%;
		background-color: #aaaaff;
	}
	#right-content{
		position: absolute;
		top: 80px;
		left: 305px;
		width: 1225px;
		height: 640px;
		background-color: #55ffff;
	}
</style>
