//1.引入router包\VUE
import VueRouter from 'vue-router'
import Vue from 'vue'

//2.应用router
Vue.use(VueRouter)

//3.创建路由
import login from '../components/LoginMain.vue'
import login1 from '../components/login.vue'
import enroll from '../components/enrollTest.vue'
import baHome from '../components/bgHome.vue'
import userList from '../components/userList.vue'
import menuList from '../components/menuList.vue'
import roleList from '../components/roleList.vue'
import rolePowerManage from '../components/rolePowerManage.vue'

const paths = [
	{path:'/',redirect:'/login'},
	{path:'/bgHome',component:baHome,
		children:[
			{path:'/userList/:id',component:userList,props:true},
			{path:'/menuList',component:menuList,props:true},
			{path:'/roleList',component:roleList,props:true},
			{path:'/rolePowerManage',component:rolePowerManage,props:true}
		]
	},
	{path:'/login',component:login},
	{path:'/login1',component:login1},
	{path:'/enroll',component:enroll}
]

const router = new VueRouter({
	routes:paths
})

//4.封装给外部使用的对象引用
export default router
