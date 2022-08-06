<template>
  <div class="login">
    <div class="mylogin" align="center">
      <div class="mylogin-left" style="float: left;"></div>
	  <div class="mylogin-right">
		  <el-tabs v-model="activeName" type="card" tab-position="left">
		      <el-tab-pane label="登录" name="first" >
			   <h3 style="color: #000000;">登录</h3>
			   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px;">
			     <el-form-item label="账号" prop="acc">
			       <el-input type="text" v-model="ruleForm.acc" autocomplete="off"></el-input>
			     </el-form-item>
			     <el-form-item label="密码" prop="pass">
			       <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
			     </el-form-item>
			     <el-form-item>
			       <el-button type="primary" @click="login">登录</el-button>
			       <el-button @click="resetForm('ruleForm')">重置</el-button>
			     </el-form-item>
			   </el-form>
			  </el-tab-pane>
		      <el-tab-pane label="注册" name="second">
				  <h3 style="color: #000000;">注册</h3>
				  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px;">
				  	<el-form-item label="账号" prop="acc">
				  	  <el-input type="text" v-model="ruleForm.enrollacc" autocomplete="off"></el-input>
				  	</el-form-item>
				    <el-form-item label="密码" prop="pass">
				      <el-input type="password" v-model="ruleForm.enrollpass" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="确认密码" prop="checkPass">
				      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="年龄" prop="age">
				      <el-input v-model.number="ruleForm.age"></el-input>
				    </el-form-item>
				    <el-form-item>
				      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				      <el-button @click="resetForm('ruleForm')">返回</el-button>
				    </el-form-item>
				  </el-form>
			  </el-tab-pane>
		    </el-tabs>
	  </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data: function () {
	  var validatePass = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入密码'));
	    } else {
	      if (this.ruleForm.checkPass !== '') {
	        this.$refs.ruleForm.validateField('checkPass');
	      }
	      callback();
	    }
	  };
	  var validateAcc = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入账号'));
	    } else if (value !== this.ruleForm.pass) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	  };
	  var checkAge = (rule, value, callback) => {
	    if (!value) {
	      return callback(new Error('年龄不能为空'));
	    }
	    setTimeout(() => {
	      if (!Number.isInteger(value)) {
	        callback(new Error('请输入数字值'));
	      } else {
	        if (value < 18) {
	          callback(new Error('必须年满18岁'));
	        } else {
	          callback();
	        }
	      }
	    }, 1000);
	  };
	  var validateAcc1 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入账号'));
	    } else {
	      callback();
	    }
	  };
	  var validatePass1 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入密码'));
	    } else {
	      if (this.ruleForm.checkPass !== '') {
	        this.$refs.ruleForm.validateField('checkPass');
	      }
	      callback();
	    }
	  };
	  var validatePass2 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'));
	    } else if (value !== this.ruleForm.pass) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	  };
    return {
      ruleForm: {
        acc: "220101",
        pwd: "123",
		pass: '',
		checkPass: '',
		age: ''
      },
	  rules: {
	    acc: [
	      { validator: validatePass, trigger: 'blur' }
	    ],
	    pass: [
	      { validator: validatePass, trigger: 'blur' }
	    ],
		enrollacc: [
		  { validator: validatePass1, trigger: 'blur' }
		],
		enrollpass: [
		  { validator: validatePass1, trigger: 'blur' }
		],
		checkPass: [
		  { validator: validatePass2, trigger: 'blur' }
		],
		age: [
		  { validator: checkAge, trigger: 'blur' }
		]
	  },
	  activeName: 'first'
    };
  },
  methods: {
   login() {
     // url :地址    params:参数     redata:返回结果
     // this.$axios.get('url',{params}).then(function(redata){  })
     console.log(11)
     this.$axios({
       url:'admin/doLogin',
       method:'post',
       headers: { "Content-Type": "multipart/form-data" },
      data:{
        acc:this.$data.ruleForm.acc,
        pwd:this.$data.ruleForm.pwd
      }
     }).then(response=>{
      console.log(response.data)
      if (response.data == 1) {
        alert("登录成功")
        this.$router.replace("/bgHome")
      }else(
        alert("登录失败")
      )
     })
   },
   resetForm(formName) {
     this.$refs[formName].resetFields();
   },
   resetForm(formName) {
     this.$refs[formName].resetFields();
   }
  }
};
</script>

<style>
		.mylogin-left{
			background-color: #000066;
			width: 300px;
			height: 100%;
			background-image: url(../assets/bg.jpg);
			background-size: cover;
		}
	  .login {
	    width: 100vw;
	    padding: 0;
	    margin: 0;
	    height: 100vh;
	    font-size: 16px;
	    background-position: left top;
	    background-color: #242645;
		background-image: url(../assets/background.jpg);
		background-size: cover;
	    color: #fff;
	    font-family: "Source Sans Pro";
	    position: relative;
	  }

	  .mylogin {
	    width: 1060px;
	    height: 600px;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    /* padding: 50px 40px 40px 40px; */
	    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
	    opacity: 1;
		background-color: rgba(255, 255, 255, 0.7);
/* 	   background: linear-gradient(
	      230deg,
	      rgba(235, 235, 235, 1) 50%,
	      rgb(235, 235, 235) 100%
	    ); */
	  }

	  .inps input {
	    border: none;
	    color: #fff;
	    background-color: transparent;
	    font-size: 12px;
	  }

	  .submitBtn {
	    background-color: transparent;
	    color: #39f;
	    width: 200px;
	  }
</style>
