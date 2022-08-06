<template>
  <!--  tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
  <div>
    <el-button type="success" @click="showAdd">新增</el-button>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%"
      :row-class-name="tableRowClassName" @selection-change="handleSelectionChange"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column v-if="false" label="角色Id" sortable prop="roleId">
      </el-table-column>
      <el-table-column label="角色名称" sortable prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述" prop="mydescribe">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="rolePower(scope.$index, scope.row)">权限管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
      :page-size="pageSize" @current-change="currnetChange">
    </el-pagination>
    <!-- 新增界面-->
    <el-form ref="form" :model="form" label-width="80px" v-if="add.is">
      <el-form-item label="角色名称">
        <el-input v-model="add.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="add.roleDescribe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddUser">新增</el-button>
        <el-button @click="cancleAdd">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改界面-->
    <el-form ref="form" :model="form" label-width="80px" v-if="del.is">
      <el-form-item label="角色名称">
        <el-input v-model="del.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="del.roleDescribe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="delUser">修改</el-button>
        <el-button @click="cancleDel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 权限管理-->
    <el-dialog title="权限管理" :visible.sync="rolepower.is" @close="find()">
      <tree-transfer :title="['已分配权限', '未分配权限']" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"
        @addBtn='add' @removeBtn='remove' :mode='mode' height='540px' filter openAll>
      </tree-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleRolePower">取 消</el-button>
        <el-button type="primary" @click="savePower">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer' // 引入
  export default {
    props: ['id'],
    data() {
      return {
        roleId: '',
        mode: "transfer", // transfer addressList
        fromData: [],
        toData: [],
        rolepower: {
          is: false
        },
        add: {
          is: false,
          roleName: '',
          roleDescribe: ''
        },
        del: {
          is: false,
          roleName: '',
          roleDescribe: ''
        },
        currentPage: 1,
        pageSize: 5,
        total: 4,
        tableData: [],
        search: ''
      }
    },
    methods: {
      handlerTree(data, selData) {
        for (var i = data.length - 1; i >= 0; i--) {
          for (var j = selData.length - 1; j >= 0; j--) {
            if (data[i] && (data[i].id === selData[j].id)) {
              // 当id相等可以删除的情况 即：没有子级可以删除；
              if (!data[i].children && !selData[j].children ) {
                data.splice(i, 1)
              } else {
                this.handlerTree(data[i].children, selData[j].children)
              }
            }
          }
        }

        for (var i = data.length - 1; i >= 0; i--) {
          if (data[i].pid == 0) {
            if (data[i].children == "") {
              data.splice(i, 1)
            }
          }
        }
      },
      cancleRolePower() {
        this.$data.rolepower.is = false
      },
      /* 保存权限按钮*/
      savePower() {
        console.log(this.$data.fromData)
        var powerList = this.$data.fromData
        var powerIdList = []
        for (var i = 0; i < powerList.length; i++) {
          powerIdList.push(powerList[i].id)
          var childList = powerList[i].children
          for (var j = 0; j < childList.length; j++) {
            powerIdList.push(childList[j].id)
          }
        }
        var idList = JSON.stringify(powerIdList)
        this.$axios({
          url: 'admin/addPower',
          method: 'post',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: {
            powerIds: idList,
            roleId: this.$data.roleId
          }
        }).then(result => {
          if (result.data == 1) {/
            this.$message({
              type: 'success',
              message: '权限保存成功!'
            });
            this.cancleRolePower()
          } else {
            this.$message({
              type: 'success',
              message: '权限保存失败!'
            });
          }
        })

      },
      addChild(list, powerId) {
        var child = []
        for (var j = 0; j < list.length; j++) {
          if (list[j].parentId == powerId) {
            var ch = {
              id: list[j].powerId,
              label: list[j].powerName,
              pid: list[j].parentId
            }
            child.push(ch)
          }
        }
        return child
      },
      /* 显示权限管理界面*/
      rolePower(index, row) {
        this.$data.roleId = row.roleId
        this.$axios({
          url: 'admin/findPower',
          method: 'post',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: {
            roleId: row.roleId
          }
        }).then(result => {
          /* 所有权限*/
          var powerList = result.data.powerList
          /* 角色权限*/
          var roleList = result.data.roleList

          console.log(powerList)
          console.log(roleList)
          var dataList = [] // 权限数组
          var rolePowerList = [] // 角色权限数组
          for (var i = 0; i < powerList.length; i++) {
            if (powerList[i].parentId == 0) {
              var data = {
                id: powerList[i].powerId,
                pid: powerList[i].parentId,
                label: powerList[i].powerName,
                children: this.addChild(powerList, powerList[i].powerId)
              }
              dataList.push(data)
            }
          }

          for (var i = 0; i < roleList.length; i++) {
            if (roleList[i].parentId == 0) {
              var data = {
                id: roleList[i].powerId,
                pid: roleList[i].parentId,
                label: roleList[i].powerName,
                children: this.addChild(roleList, roleList[i].powerId)
              }
              rolePowerList.push(data)
            }
          }

          this.handlerTree(dataList,rolePowerList)
          this.$data.fromData = rolePowerList
          this.$data.toData = dataList
          this.$data.rolepower.is = true
        })
      },
      /* 查询方法*/
      find() {
        this.$axios({
          url: 'admin/role',
          method: 'post',
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }).then(result => {
          console.log(result.data)
          this.$data.tableData = result.data
          this.$data.total = result.data.length
        })
      },
      /* 显示修改界面 */
      handleEdit(index, row) {
        // console.log(index, row);
        console.log(row);
        this.$data.del.roleName = row.roleName;
        this.$data.del.roleDescribe = row.roleDescribe;
        this.$data.del.is = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      currnetChange(val) {
        console.log(val)
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

      },
      /* 修改界面取消按钮 */
      cancleDel() {
        this.$data.del.is = false;
      },
      /* 显示新增界面 */
      showAdd() {
        this.$data.add.is = true;
      },
      /* 新增界面取消按钮 */
      cancleAdd() {
        this.$data.add.is = false;
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      }
    },
    computed: {},
    components: {
      treeTransfer
    }, // 注册
    mounted() {
      this.find()
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
