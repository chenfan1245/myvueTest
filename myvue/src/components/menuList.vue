<template>
	<!--  tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
	 <div>
		 <el-button type="success" @click="showAdd">新增</el-button>
		 <el-table
		    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
		    style="width: 100%"
			:row-class-name="tableRowClassName"
			 @selection-change="handleSelectionChange"
			 :default-sort = "{prop: 'date', order: 'descending'}">
		    <el-table-column
		       type="selection"
		       width="55">
			</el-table-column>
			<el-table-column
			  label="菜单名称"
			  sortable
			  prop="menuName">
			</el-table-column>
		    <el-table-column
		      label="菜单地址"
			  sortable
		      prop="menuUrl">
		    </el-table-column>
			<el-table-column
			  label="父级菜单"
			  prop="parent">
			</el-table-column>
		    <el-table-column
		      align="right">
		      <template slot="header" slot-scope="scope">
		        <el-input
		          v-model="search"
		          size="mini"
		          placeholder="输入关键字搜索"/>
		      </template>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <el-pagination
		    background
		    layout="prev, pager, next"
		    :total="total"
			:current-page="currentPage"
			:page-size="pageSize"
			@current-change="currnetChange">
		  </el-pagination>
		  <el-form ref="form" :model="form" label-width="80px" v-if="add.is">
		    <el-form-item label="菜单名称">
		      <el-input v-model="add.menuName"></el-input>
		    </el-form-item>
			<el-form-item label="菜单地址">
			  <el-input v-model="add.menuUrl"></el-input>
			</el-form-item>
			<el-form-item label="父级菜单">
			  <el-input v-model="add.parent"></el-input>
			</el-form-item>
		    <el-form-item>
		      <el-button type="primary" @click="AddUser">新增</el-button>
		      <el-button @click = "cancleAdd">取消</el-button>
		    </el-form-item>
		  </el-form>
		  <el-form ref="form" :model="form" label-width="80px" v-if="del.is">
		    <el-form-item label="菜单名称">
		      <el-input v-model="del.menuName"></el-input>
		    </el-form-item>
			<el-form-item label="菜单地址">
			  <el-input v-model="del.menuUrl"></el-input>
			</el-form-item>
			<el-form-item label="父级菜单">
			  <el-input v-model="del.parent"></el-input>
			</el-form-item>
		    <el-form-item>
		      <el-button type="primary" @click="delUser">修改</el-button>
		      <el-button @click = "cancleDel">取消</el-button>
		    </el-form-item>
		  </el-form>
	 </div>
		
</template>

<script>
	  export default {
		props:['id'],
	    data() {
	      return {
			add:{
				is:false,
				menuName:'',
				menuUrl:'',
				parent:''	
			},
			del:{
				is:false,
				menuName:'',
				menuUrl:'',
				parent:''				
			},		
			currentPage:1,
			pageSize:2,
			total:4,
	        tableData: [{
			  menuName:'用户管理',
	          menuUrl: '#',
	          parent: '用户管理'
	        }, {
			 menuName:'菜单管理',
			 menuUrl: '#',
			 parent: '菜单管理'
	        }, {
			  menuName:'用户权限分配',
			  menuUrl: '#',
			  parent: '用户权限分配'
	        }, {
			 menuName:'角色管理',
			 menuUrl: '#',
			 parent: '角色管理'
	        }],
	        search: ''
	      }
	    },
	    methods: {
			/* 显示修改界面 */
	      handleEdit(index, row) {
	        // console.log(index, row);
			console.log(row);
			this.$data.del.menuName = row.menuName;
			this.$data.del.menuUrl = row.menuUrl;
			this.$data.del.parent = row.parent;
			this.$data.del.is = true;
	      },
	      handleDelete(index, row) {
	        console.log(index, row);
	      },
		  currnetChange(val){
			  console.log(val)
			this.$data.currentPage = val
		  },
		  tableRowClassName({row, rowIndex}) {
		          if (rowIndex === 1) {
		            return 'warning-row';
		          } else if (rowIndex === 3) {
		            return 'success-row';
		          }
		          return '';
		  },
			handleSelectionChange(val) {
				 this.multipleSelection = val;
			},
			/* 修改界面确认按钮 */
			delUser(){
				
			},
			/* 修改界面取消按钮 */
			cancleDel(){
				this.$data.del.is = false;
			},
			/* 显示新增界面 */
			showAdd(){
				this.$data.add.is = true;
			},
			/* 新增界面取消按钮 */
			cancleAdd(){
				this.$data.add.is = false;
			}
	    },
		computed:{
		}
	  }
</script>

<style>
	.el-table .warning-row {
	    background: oldlace;
	  }
	
	  .el-table .success-row {
	    background: #f0f9eb;
	  }
</style>
