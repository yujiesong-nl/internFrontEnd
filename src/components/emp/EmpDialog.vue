<template>
  <div>
    <el-form :model="emp" :rules="rules" ref="EmpForm" style="margin: 0px;padding: 0px;">
      <div>
        <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    placeholder="请输入员工姓名"
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 150px"
                    v-model="emp.name"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女" style="margin-left: 15px">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    placeholder="出生日期"
                    size="mini"
                    style="width: 150px"
                    type="date"
                    v-model="emp.birthday"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="政治面貌:" prop="politicId">
                  <el-select
                    placeholder="政治面貌"
                    size="mini"
                    style="width: 200px"
                    v-model="emp.politicId"
                    @change="selectChange"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in politics"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="民族:" prop="nationId">
                  <el-select
                    placeholder="请选择民族"
                    @change="selectChange"
                    size="mini"
                    style="width: 150px"
                    v-model="emp.nationId"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in nations"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="籍贯:" prop="nativePlace">
                  <el-input
                    placeholder="员工籍贯"
                    size="mini"
                    style="width: 120px"
                    v-model="emp.nativePlace"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input
                    placeholder="电子邮箱地址..."
                    prefix-icon="el-icon-message"
                    size="mini"
                    style="width: 150px"
                    v-model="emp.email"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input
                    placeholder="联系地址..."
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 200px"
                    v-model="emp.address"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="职位:" prop="posId">
                  <el-select
                    placeholder="请选择职位"
                    size="mini"
                    style="width: 150px"
                    v-model="emp.posId"
                    @change="posIdChange"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in positions"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="职称:" prop="jobLevelId">
                  <el-select
                    placeholder="请选择职称"
                    size="mini"
                    style="width: 120px"
                    v-model="emp.jobLevelId"
                    @change="selectChange"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in joblevels"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="所属部门:" prop="departmentId">
                  <el-popover
                    placement="right"
                    title="请选择部门"
                    trigger="manual"
                    v-model="showOrHidePop"
                  >
                    <el-tree
                      :data="deps"
                      :default-expand-all="true"
                      :expand-on-click-node="false"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                    ></el-tree>
                    <div
                      @click.left="showDepTree"
                      slot="reference"
                      style="width: 150px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"
                      v-bind:style="{color: depTextColor}"
                    >{{emp.departmentName}}</div>
                  </el-popover>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="电话号码:" prop="phone">
                  <el-input
                    placeholder="电话号码..."
                    prefix-icon="el-icon-phone"
                    size="mini"
                    style="width: 200px"
                    v-model="emp.phone"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="工号:" prop="workID">
                  <el-input
                    disabled
                    placeholder="员工工号..."
                    size="mini"
                    style="width: 150px"
                    v-model="emp.workID"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="学历:" prop="tiptopDegree">
                  <el-select
                    placeholder="最高学历"
                    size="mini"
                    style="width: 120px"
                    v-model="emp.tiptopDegree"
                  >
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      v-for="item in degrees"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="毕业院校:" prop="school">
                  <el-input
                    placeholder="毕业院校名称"
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 150px"
                    v-model="emp.school"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="专业名称:" prop="specialty">
                  <el-input
                    placeholder="专业名称"
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 200px"
                    v-model="emp.specialty"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="入职日期:" prop="beginDate">
                  <el-date-picker
                    placeholder="入职日期"
                    size="mini"
                    style="width: 130px"
                    type="date"
                    v-model="emp.beginDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="转正日期:" prop="conversionTime">
                  <el-date-picker
                    placeholder="转正日期"
                    size="mini"
                    style="width: 130px"
                    type="date"
                    v-model="emp.conversionTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="合同起始日期:" prop="beginContract">
                  <el-date-picker
                    placeholder="合同起始日期"
                    size="mini"
                    style="width: 135px"
                    type="date"
                    v-model="emp.beginContract"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="合同终止日期:" prop="endContract">
                  <el-date-picker
                    placeholder="合同终止日期"
                    size="mini"
                    style="width: 135px"
                    type="date"
                    v-model="emp.endContract"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号码:" prop="idCard">
                  <el-input
                    placeholder="请输入员工身份证号码..."
                    prefix-icon="el-icon-edit"
                    size="mini"
                    style="width: 180px"
                    v-model="emp.idCard"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="聘用形式:" prop="engageForm">
                  <el-radio-group v-model="emp.engageForm">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio label="劳务合同" style="margin-left: 15px">劳务合同</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="婚姻状况:" prop="wedlock">
                  <el-radio-group v-model="emp.wedlock">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚" style="margin-left: 15px">未婚</el-radio>
                    <el-radio label="离异" style="margin-left: 15px">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="usernameShow">
            <el-col :span="8">
              <el-form-item label="用户名:" prop="username">
                <el-input
                  placeholder="用户名..."
                  prefix-icon="el-icon-edit"
                  size="mini"
                  style="width: 200px"
                  v-model="emp.username"
                  @input="selectChange"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span slot="footer">
            <el-button @click="open=false" size="mini">取 消</el-button>
            <el-button @click.prevent="saveEmp('EmpForm')" size="mini" type="primary">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  props: [
    "title",
    "type",
    "row",
    "politics",
    "nations",
    "positions",
    "deps",
    "joblevels"
  ],
  data() {
    return {
      usernameShow: false,
      open: true,
      emp: {
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nativePlace: "",
        email: "",
        phone: "",
        address: "",

        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workState: "",
        workID: "",
        contractTerm: "",
        conversionTime: "",
        notWorkDate: "",
        beginContract: "",
        endContract: "",
        workAge: "",
        departmentId: "",
        departmentName: "所属部门...",
        nationId: "",

        jobLevelId: "",
        posId: "",

        politicId: "",

        username: ""
      },
      degrees: [
        { id: 4, name: "大专" },
        { id: 5, name: "本科" },
        { id: 6, name: "硕士" },
        { id: 7, name: "博士" },
        {
          id: 3,
          name: "高中"
        },
        { id: 2, name: "初中" },
        { id: 1, name: "小学" },
        { id: 8, name: "其他" }
      ],
      rules: {
        name: [{ required: true, message: "必填:姓名", trigger: "blur" }],
        gender: [{ required: true, message: "必填:性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "必填:出生日期", trigger: "blur" }
        ],
        idCard: [
          {
            required: true,
            message: "必填:身份证号码",
            trigger: "blur"
          },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证号码格式不正确",
            trigger: "blur"
          }
        ],
        wedlock: [
          { required: true, message: "必填:婚姻状况", trigger: "blur" }
        ],
        nationId: [{ required: true, message: "必填:民族", trigger: "change" }],
        nativePlace: [
          { required: true, message: "必填:籍贯", trigger: "blur" }
        ],
        politicId: [
          { required: true, message: "必填:政治面貌", trigger: "blur" }
        ],
        email: [
          { required: true, message: "必填:电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, message: "必填:电话号码", trigger: "blur" }],
        address: [
          { required: true, message: "必填:联系地址", trigger: "blur" }
        ],
        departmentId: [
          { required: true, message: "必填:部门", trigger: "change" }
        ],
        jobLevelId: [
          { required: true, message: "必填:职称", trigger: "change" }
        ],
        posId: [{ required: true, message: "必填:职位", trigger: "change" }],
        engageForm: [
          { required: true, message: "必填:聘用形式", trigger: "blur" }
        ],
        tiptopDegree: [
          { required: true, message: "必填:最高学历", trigger: "change" }
        ],
        specialty: [{ required: true, message: "必填:专业", trigger: "blur" }],
        workID: [{ required: true, message: "必填:工号", trigger: "blur" }],
        school: [{ required: true, message: "必填:毕业院校", trigger: "blur" }],
        beginDate: [
          { required: true, message: "必填:入职日期", trigger: "blur" }
        ],
        conversionTime: [
          { required: true, message: "必填:转正日期", trigger: "blur" }
        ],
        beginContract: [
          { required: true, message: "必填:合同起始日期", trigger: "blur" }
        ],
        endContract: [
          { required: true, message: "必填:合同终止日期", trigger: "blur" }
        ],
        workAge: [{ required: true, message: "必填:工龄", trigger: "blur" }]
      },
      defaultProps: {
        label: "name",
        isLeaf: "leaf",
        children: "children"
      },
      depTextColor: "#c0c4cc",
      showOrHidePop: false
    };
  },
  methods: {
    selectChange() {
      this.$forceUpdate();
    },
    posIdChange(val) {
      let obj = this.positions.find(item => {
        return item.id === val;
      });
      if (obj.name == "实习生") {
        this.usernameShow = true;
      } else {
        this.usernameShow = false;
        this.emp.username = null;
      }
      this.$forceUpdate();
    },
    handleNodeClick(data) {
      this.emp.departmentName = data.name;
      this.emp.departmentId = data.id;
      this.showOrHidePop = false;
      this.depTextColor = "#606266";
    },
    showDepTree() {
      this.showOrHidePop = !this.showOrHidePop;
    },
    saveEmp(EmpForm) {
      this.$refs["EmpForm"].validate(valid => {
        if (valid) {
          if (this.type === "add") {
            this.postRequest("/employee/basic/emp", this.emp).then(resp => {
              if (resp && resp.status == 200) {
                this.$parent.loadEmps();
              } else {
                this.$parent.loadEmps();
              }
            });
            this.closeDialog();
          } else if (this.type === "edit") {
            delete this.emp.hr;
            delete this.emp.department;
            delete this.emp.nation;
            delete this.emp.jobLevel;
            delete this.emp.position;
            delete this.emp.politicsStatus;
            delete this.emp.posName;
            delete this.emp.notWorkDate;
            delete this.emp.workAge;
            delete this.emp.salary;
            this.putRequest("/employee/basic/emp", this.emp).then(resp => {
              if (resp && resp.status == 200) {
                this.$parent.loadEmps();
              } else {
                this.$parent.loadEmps();
              }
            });
            this.closeDialog();
          }
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.open = false;
    },
    formatDate(date) {
      const re1 = /^\d{4}-\d{2}-\d{2}/;
      const re2 = /(?<=\D)\d{2}:\d{2}:\d{2}/;
      let Fdate = re1.exec(date)[0] + " " + re2.exec(date)[0];
      return Fdate;
    }
  },
  created() {
    if (this.type === "add") {
      this.getRequest("/employee/basic/maxWorkID").then(resp => {
        if (resp && resp.status == 200) {
          this.emp.workID = resp.data;
        }
      });
    } else if (this.type === "edit") {
      this.emp = this.row;
      this.emp.id = this.row.id;
      this.emp.departmentId = this.row.department.id;
      this.emp.departmentName = this.row.department.name;
      this.emp.nationId = this.row.nation.id;
      this.emp.jobLevelId = this.row.jobLevel.id;
      this.emp.posId = this.row.position.id;
      this.emp.politicId = this.row.politicsStatus.id;
      if (this.emp.position.name == "实习生") {
        this.usernameShow = true;
        this.emp.username = this.row.hr ? this.row.hr.username : null;
        this.emp.hid = this.row.hr ? this.row.hr.id : 0;
      }
      this.emp.birthday = this.formatDate(this.row.birthday);
      this.emp.conversionTime = this.formatDate(this.row.conversionTime);
      this.emp.beginContract = this.formatDate(this.row.beginContract);
      this.emp.endContract = this.formatDate(this.row.endContract);
      this.emp.beginDate = this.formatDate(this.row.beginDate);
    }
  },
  watch: {
    open(val) {
      if (val === false) {
        this.$emit("close-dialog");
      }
    }
  }
};
</script>
