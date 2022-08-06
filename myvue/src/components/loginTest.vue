<template>
	<div id="login" style="width: 500px;">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="账号" prop="acc">
		    <el-input type="text" v-model="ruleForm.acc" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
		    <el-button @click="resetForm('ruleForm')">注册</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	 export default {
		 name:'login',
	    data() {
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
	      return {
	        ruleForm: {
	          acc: '',
	          pass: ''
	        },
	        rules: {
	          acc: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	  }
</script>

<style>
</style>
