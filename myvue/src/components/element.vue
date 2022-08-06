<template>
	<div id="home">
		<div id="head">
			<el-menu
			  :default-active="activeIndex2"
			  class="el-menu-demo"
			  mode="horizontal"
			  @select="handleSelect"
			  background-color="#545c64"
			  text-color="#fff"
			  active-text-color="#ffd04b" style="">
			  <el-menu-item index="1" style="margin-left: 500px;">处理中心</el-menu-item>
			  <el-submenu index="2">
			    <template slot="title">我的工作台</template>
			    <el-menu-item index="2-1">选项1</el-menu-item>
			    <el-menu-item index="2-2">选项2</el-menu-item>
			    <el-menu-item index="2-3">选项3</el-menu-item>
			    <el-submenu index="2-4">
			      <template slot="title">选项4</template>
			      <el-menu-item index="2-4-1">选项1</el-menu-item>
			      <el-menu-item index="2-4-2">选项2</el-menu-item>
			      <el-menu-item index="2-4-3">选项3</el-menu-item>
			    </el-submenu>
			  </el-submenu>
			  <el-menu-item index="3">消息中心</el-menu-item>
			  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
			  <el-button type="success" icon="el-icon-s-promotion" style="margin-left: 330px; margin-top: 10px;">登录</el-button>
			</el-menu>
		</div>
		<div id="banner">
			<div id="banner-left" style="float: left;width: 240px;height: 100%;background-color: #FFFFFF;">
				<el-cascader-panel :options="options":size = "medium "></el-cascader-panel>
			</div>
			<div id="banner-right" style="float: left;width: 1091px;height: 100%;background-color: #dcdcdc;">
				 <el-carousel height="400px" direction="vertical" :autoplay="false">
				    <el-carousel-item v-for="item in 3" :key="item">
				      <h3 class="medium">{{ item }}</h3>
				    </el-carousel-item>
				  </el-carousel>
			</div>
		</div>
		<div id="content">
			<div id="content-top" style="width: 100%;height: 94%;background-color: #FFFFFF;">
				 <el-col :span="4" v-for="(o, index) in 5" :key="o"  style="margin-left: 35px;margin-top: 20px;">
				    <el-card :body-style="{ padding: '0px'}">	
				      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
				      <div style="padding: 14px;">
				        <span>好吃的汉堡</span>
				        <div class="bottom clearfix">
				          <time class="time">{{ currentDate }}</time>
				          <el-button type="text" class="button">操作按钮</el-button>
				        </div>
				      </div>
				    </el-card>
				  </el-col>
				  <el-col :span="4" v-for="(o, index) in 5" :key="o"  style="margin-left: 35px;margin-top: 30px;">
				     <el-card :body-style="{ padding: '0px'}">	
				       <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
				       <div style="padding: 14px;">
				         <span>好吃的汉堡</span>
				         <div class="bottom clearfix">
				           <time class="time">{{ currentDate }}</time>
				           <el-button type="text" class="button">操作按钮</el-button>
				         </div>
				       </div>
				     </el-card>
				   </el-col>
				   
			</div>
			<div id="content-bottom">
			 <el-pagination
			   background
			   layout="prev, pager, next"
			   :total="1000">
			 </el-pagination>
			</div>
		</div>
		<div id="bottom" style="background-color: #ffffff;width: 100%;height: 100px;">
			<p>Copyright &copy; 2019 - {{nowYear}} 版权所有| by
							<a href="#">Luochenfan</a>
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:'home',
		data() {
		      return {
		        activeIndex: '1',
		        activeIndex2: '1',
				 currentDate: new Date(),
				 options: [{
				          value: 'zhinan',
				          label: '家用电器',
				          children: [{
				            value: 'shejiyuanze',
				            label: '设计原则',
				            children: [{
				              value: 'yizhi',
				              label: '一致'
				            }, {
				              value: 'fankui',
				              label: '反馈'
				            }, {
				              value: 'xiaolv',
				              label: '效率'
				            }, {
				              value: 'kekong',
				              label: '可控'
				            }]
				          }, {
				            value: 'daohang',
				            label: '导航',
				            children: [{
				              value: 'cexiangdaohang',
				              label: '侧向导航'
				            }, {
				              value: 'dingbudaohang',
				              label: '顶部导航'
				            }]
				          }]
				        }, {
				          value: 'zujian',
				          label: '手机/运营商/数码',
				          children: [{
				            value: 'basic',
				            label: 'Basic',
				            children: [{
				              value: 'layout',
				              label: 'Layout 布局'
				            }, {
				              value: 'color',
				              label: 'Color 色彩'
				            }, {
				              value: 'typography',
				              label: 'Typography 字体'
				            }, {
				              value: 'icon',
				              label: 'Icon 图标'
				            }, {
				              value: 'button',
				              label: 'Button 按钮'
				            }]
				          }, {
				            value: 'form',
				            label: 'Form',
				            children: [{
				              value: 'radio',
				              label: 'Radio 单选框'
				            }, {
				              value: 'checkbox',
				              label: 'Checkbox 多选框'
				            }, {
				              value: 'input',
				              label: 'Input 输入框'
				            }, {
				              value: 'input-number',
				              label: 'InputNumber 计数器'
				            }, {
				              value: 'select',
				              label: 'Select 选择器'
				            }, {
				              value: 'cascader',
				              label: 'Cascader 级联选择器'
				            }, {
				              value: 'switch',
				              label: 'Switch 开关'
				            }, {
				              value: 'slider',
				              label: 'Slider 滑块'
				            }, {
				              value: 'time-picker',
				              label: 'TimePicker 时间选择器'
				            }, {
				              value: 'date-picker',
				              label: 'DatePicker 日期选择器'
				            }, {
				              value: 'datetime-picker',
				              label: 'DateTimePicker 日期时间选择器'
				            }, {
				              value: 'upload',
				              label: 'Upload 上传'
				            }, {
				              value: 'rate',
				              label: 'Rate 评分'
				            }, {
				              value: 'form',
				              label: 'Form 表单'
				            }]
				          }, {
				            value: 'data',
				            label: 'Data',
				            children: [{
				              value: 'table',
				              label: 'Table 表格'
				            }, {
				              value: 'tag',
				              label: 'Tag 标签'
				            }, {
				              value: 'progress',
				              label: 'Progress 进度条'
				            }, {
				              value: 'tree',
				              label: 'Tree 树形控件'
				            }, {
				              value: 'pagination',
				              label: 'Pagination 分页'
				            }, {
				              value: 'badge',
				              label: 'Badge 标记'
				            }]
				          }, {
				            value: 'notice',
				            label: 'Notice',
				            children: [{
				              value: 'alert',
				              label: 'Alert 警告'
				            }, {
				              value: 'loading',
				              label: 'Loading 加载'
				            }, {
				              value: 'message',
				              label: 'Message 消息提示'
				            }, {
				              value: 'message-box',
				              label: 'MessageBox 弹框'
				            }, {
				              value: 'notification',
				              label: 'Notification 通知'
				            }]
				          }, {
				            value: 'navigation',
				            label: 'Navigation',
				            children: [{
				              value: 'menu',
				              label: 'NavMenu 导航菜单'
				            }, {
				              value: 'tabs',
				              label: 'Tabs 标签页'
				            }, {
				              value: 'breadcrumb',
				              label: 'Breadcrumb 面包屑'
				            }, {
				              value: 'dropdown',
				              label: 'Dropdown 下拉菜单'
				            }, {
				              value: 'steps',
				              label: 'Steps 步骤条'
				            }]
				          }, {
				            value: 'others',
				            label: 'Others',
				            children: [{
				              value: 'dialog',
				              label: 'Dialog 对话框'
				            }, {
				              value: 'tooltip',
				              label: 'Tooltip 文字提示'
				            }, {
				              value: 'popover',
				              label: 'Popover 弹出框'
				            }, {
				              value: 'card',
				              label: 'Card 卡片'
				            }, {
				              value: 'carousel',
				              label: 'Carousel 走马灯'
				            }, {
				              value: 'collapse',
				              label: 'Collapse 折叠面板'
				            }]
				          }]
				        }, {
				          value: 'ziyuan',
				          label: '电脑/办公',
				          children: [{
				            value: 'axure',
				            label: 'Axure Components'
				          }, {
				            value: 'sketch',
				            label: 'Sketch Templates'
				          }, {
				            value: 'jiaohu',
				            label: '组件交互文档'
				          }]
				        },
						{
						  value: 'ziyuan',
						  label: '电脑/办公',
						  children: [{
						    value: 'axure',
						    label: 'Axure Components'
						  }, {
						    value: 'sketch',
						    label: 'Sketch Templates'
						  }, {
						    value: 'jiaohu',
						    label: '组件交互文档'
						  }]
						},
						{
						  value: 'ziyuan',
						  label: '电脑/办公',
						  children: [{
						    value: 'axure',
						    label: 'Axure Components'
						  }, {
						    value: 'sketch',
						    label: 'Sketch Templates'
						  }, {
						    value: 'jiaohu',
						    label: '组件交互文档'
						  }]
						},
						{
						  value: 'ziyuan',
						  label: '电脑/办公',
						  children: [{
						    value: 'axure',
						    label: 'Axure Components'
						  }, {
						    value: 'sketch',
						    label: 'Sketch Templates'
						  }, {
						    value: 'jiaohu',
						    label: '组件交互文档'
						  }]
						},
						{
						  value: 'ziyuan',
						  label: '电脑/办公',
						  children: [{
						    value: 'axure',
						    label: 'Axure Components'
						  }, {
						    value: 'sketch',
						    label: 'Sketch Templates'
						  }, {
						    value: 'jiaohu',
						    label: '组件交互文档'
						  }]
						},]
		      };
		    },
		    methods: {
		      handleSelect(key, keyPath) {
		        console.log(key, keyPath);
		      }
		    }
	}
</script>

<style>
	 .time {
	    font-size: 13px;
	    color: #999;
	  }
	  
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }
	
	  .button {
	    padding: 0;
	    float: right;
	  }
	
	  .image {
	    width: 100%;
	    display: block;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
	 .el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	  
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
	.el-cascader-panel{
		height: 100%;
		width: 240px;
	}
	#home{
		width: 100vw;
		padding: 0;
		margin: 0;
		height: 100vh;
		background-color: #00979D;
	}
	#head{
		width: 100%;
		height: 61px;
	}
	#banner{
		width: 87%;
		height: 400px;
		padding-left: 100px;
		padding-right: 100px;
	}
	#content{
		width: 87%;
		height: 830px;
		background-color: #00979D;
		padding-left: 100px;
		padding-right: 100px;
	}
</style>
