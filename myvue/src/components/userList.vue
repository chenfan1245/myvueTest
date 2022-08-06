<template>
  <!--  tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
  <div>
    <div id="">
      <el-input size="small" placeholder="请输入账号" suffix-icon="el-icon-star-on" v-model="findLike.acc" clearable
        style="width: 200px;float: left;">
      </el-input>
      <el-input size="small" placeholder="请输入姓名" suffix-icon="el-icon-user-solid" v-model="findLike.name" clearable
        style="width: 200px;float: left;">
      </el-input>
      <el-button type="success" @click="find" style="float: left;">查询</el-button>
    </div>
    <el-button type="success" @click="showAdd">新增</el-button>
    <!-- 数据表格-->
    <div style="height: 400px;">
      <el-table  v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)
          .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"
        :row-class-name="tableRowClassName" @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" v-if="del.show" prop="id">
        </el-table-column>
        <el-table-column label="账号" prop="acc">
        </el-table-column>
        <el-table-column label="密码" prop="pwd">
        </el-table-column>
        <el-table-column label="姓名" sortable prop="name">
        </el-table-column>
        <el-table-column label="年龄" sortable prop="age">
        </el-table-column>
        <el-table-column label="地址" prop="address">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页栏-->
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
      :page-size="pageSize" @current-change="currnetChange">
    </el-pagination>
    <!-- 新增用户-->
    <el-dialog title="新增用户" :visible.sync="add.is">
      <el-form ref="form" :model="add" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="add.acc"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="add.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="add.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add.is = false">取 消</el-button>
        <el-button type="primary" @click="AddUser">新 增</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户-->
    <el-dialog title="修改用户" :visible.sync="del.is" @close="find">
      <el-form ref="form" :model="del" label-width="80px">
        <input type="hidden" v-model="del.id" />
        <el-form-item label="账号">
          <el-input v-model="user.acc" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.pwd"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="user.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleDel">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        findLike: {
          acc: '',
          name: ''
        },
        add: {
          is: false,
          acc: '',
          age: '',
          name: '',
          address: ''
        },
        del: {
          show: false,
          is: false,
        },
        /* 当前页*/
        currentPage: 1,
        /* 每页限制数*/
        pageSize: 5,
        /* 总数据*/
        total: 4,
        tableData: [],
        search: '',
        user: {},
        loading:true
      }
    },
    methods: {
      /* 显示修改界面 */
      handleEdit(index, row) {
        // console.log(index, row);
        // console.log(row);
        this.$data.user = row
        console.log(this.$data.user)
        this.$data.del.is = true;
      },
      /*删除操作 */
      handleDelete(index, row) {

        console.log(index, row);
        this.open(index, row)
      },
      /* 页面改变*/
      currnetChange(val) {
        this.$data.currentPage = val
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
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
      delUser() {
        this.$confirm('此操作将永久修改该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'admin/upd',
            method: 'post',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: {
              id: this.user.id,
              pwd: this.user.pwd,
              age: this.user.age,
              address: this.user.address
            }
          }).then(result => {
            console.log(result.data)
            if (result.data == 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              /* 界面关闭*/
              this.cancleDel();
              /* 查询数据*/
              this.find();
            } else {
              this.$message({
                type: 'success',
                message: '修改失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      /* 修改界面取消按钮 */
      cancleDel() {
        this.$data.del.is = false;
        // /* 查询数据*/
        // this.find();
      },
      /* 显示新增界面 */
      showAdd() {
        this.$data.add.is = true;
      },
      /* 新增界面确认按钮*/
      AddUser() {
        this.$axios({
          url: 'admin/add',
          method: 'post',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: {
            acc: this.$data.add.acc,
            pwd: this.$data.add.pwd,
            age: this.$data.add.age,
            address: this.$data.add.address
          }
        }).then(result => {
          console.log(result.data)
          if (result.data == 1) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            /* 界面关闭*/
            this.cancleAdd();
            /* 查询数据*/
            this.find();
          } else {
            this.$message({
              type: 'success',
              message: '添加失败!'
            });
          }
        })
      },
      /* 新增界面取消按钮 */
      cancleAdd() {
        this.$data.add.is = false;
      },
      /* 查询方法*/
      find() {
        this.$axios({
          url: 'admin/find',
          method: 'post',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: {
            acc: this.$data.findLike.acc,
            name: this.$data.findLike.name
          }
        }).then(result => {
          console.log(result.data)
          /* 替换表格内的数据*/
          this.$data.tableData = result.data
          /* 更新总条数*/
          this.$data.total = result.data.length
          setTimeout(()=>{
            this.$data.loading = false
          },1000);
        })
      },
      open(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'admin/del',
            method: 'post',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: {
              id: row.id,
            }
          }).then(result => {
            console.log(result.data)
            if (result.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              /* 查询数据*/
              this.find();
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted() {
      this.find();
    },
    computed: {
      reMessage() {
        this.$data.id = this.$route.params.id;
        console.log(this.$route.params.id);
      }
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

  /*用户添加*/
  #addUser {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 254, 254, 0.5);
  }

  #addUser-content {
    position: absolute;
    left: 38%;
    top: 20%;
    text-align: center;
    background-color: #f1efef;
    padding: 10px;
    z-index: 100;
  }
</style>
