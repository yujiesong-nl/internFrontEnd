const Mock = require("mockjs");
const Random = Mock.Random;

const emps = [
  {
    id: 3,
    name: "赵琳浩",
    gender: "男",
    birthday: "1993-03-04T00:00:00.000+0000",
    idCard: "610122199303041456",
    wedlock: "未婚",
    nativePlace: "陕西",
    email: "zhao@qq.com",
    phone: "15698887795",
    address: "陕西省西安市莲湖区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "博士",
    specialty: "电子工程",
    school: "哈尔滨理工大学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000003",
    contractTerm: 3.5,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2021-07-14T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 91,
      name: "技术部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 12,
      name: "初级测试工程师",
      titleLevel: "初级",
      createDate: null
    },
    position: {
      id: 33,
      name: "java 开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 3,
      name: "共青团员"
    },
    salary: null
  },
  {
    id: 4,
    name: "鹿存亮",
    gender: "男",
    birthday: "1990-01-03T00:00:00.000+0000",
    idCard: "610122199001031456",
    wedlock: "已婚",
    nativePlace: "陕西",
    email: "zhao@qq.com",
    phone: "15612347795",
    address: "陕西省西安市莲湖区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "高中",
    specialty: "电子工程",
    school: "哈尔滨理工大学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000004",
    contractTerm: 3.5,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2021-07-14T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 92,
      name: "运维部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 12,
      name: "初级测试工程师",
      titleLevel: "初级",
      createDate: null
    },
    position: {
      id: 34,
      name: "测试开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 3,
      name: "共青团员"
    },
    salary: null
  },
  {
    id: 5,
    name: "姚森",
    gender: "男",
    birthday: "1991-02-05T00:00:00.000+0000",
    idCard: "610122199102058952",
    wedlock: "已婚",
    nativePlace: "河南",
    email: "yaosen@qq.com",
    phone: "14785559936",
    address: "河南洛阳人民大道58号",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "硕士",
    specialty: "室内装修设计",
    school: "西北大学",
    beginDate: "2017-01-02T00:00:00.000+0000",
    workState: "在职",
    workID: "00000005",
    contractTerm: 7.0,
    conversionTime: "2017-04-02T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2017-01-02T00:00:00.000+0000",
    endContract: "2024-01-17T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 92,
      name: "运维部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 15,
      name: "中级开发工程师",
      titleLevel: "中级",
      createDate: null
    },
    position: {
      id: 34,
      name: "测试开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 3,
      name: "共青团员"
    },
    salary: null
  },
  {
    id: 6,
    name: "云星",
    gender: "女",
    birthday: "1993-01-05T00:00:00.000+0000",
    idCard: "610122199301054789",
    wedlock: "已婚",
    nativePlace: "陕西西安",
    email: "yunxing@qq.com",
    phone: "15644442252",
    address: "陕西西安新城区",
    posName: null,
    engageForm: "劳务合同",
    tiptopDegree: "硕士",
    specialty: "通信工程",
    school: "西安电子科技学校",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000006",
    contractTerm: 5.25,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2023-04-13T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 92,
      name: "运维部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 16,
      name: "高级工程师",
      titleLevel: "中级",
      createDate: null
    },
    position: {
      id: 34,
      name: "测试开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 1,
      name: "中共党员"
    },
    salary: null
  },
  {
    id: 7,
    name: "贾旭明",
    gender: "男",
    birthday: "1993-11-11T00:00:00.000+0000",
    idCard: "610122199311111234",
    wedlock: "已婚",
    nativePlace: "广东广州",
    email: "jiaxuming@qq.com",
    phone: "15644441234",
    address: "广东省广州市天河区冼村路",
    posName: null,
    engageForm: "劳务合同",
    tiptopDegree: "初中",
    specialty: "通信工程",
    school: "西北大学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000007",
    contractTerm: 5.25,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2023-04-13T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 78,
      name: "市场部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 15,
      name: "中级开发工程师",
      titleLevel: "中级",
      createDate: null
    },
    position: {
      id: 33,
      name: "java 开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 4,
      name: "民革党员"
    },
    salary: null
  },
  {
    id: 8,
    name: "张黎明",
    gender: "男",
    birthday: "1991-02-01T00:00:00.000+0000",
    idCard: "610144199102014569",
    wedlock: "已婚",
    nativePlace: "广东",
    email: "zhangliming@qq.com",
    phone: "18979994478",
    address: "广东珠海",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "高中",
    specialty: "考古",
    school: "清华大学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000008",
    contractTerm: 7.0,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2025-01-30T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 91,
      name: "技术部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 15,
      name: "中级开发工程师",
      titleLevel: "中级",
      createDate: null
    },
    position: {
      id: 33,
      name: "java 开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 6,
      name: "民建会员"
    },
    salary: null
  },
  {
    id: 9,
    name: "薛磊",
    gender: "男",
    birthday: "1992-07-01T00:00:00.000+0000",
    idCard: "610144199207017895",
    wedlock: "已婚",
    nativePlace: "陕西西安",
    email: "xuelei@qq.com",
    phone: "15648887741",
    address: "西安市雁塔区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "初中",
    specialty: "无",
    school: "华胥中学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000009",
    contractTerm: 6.0,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2024-01-17T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 92,
      name: "运维部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 14,
      name: "初级开发工程师",
      titleLevel: "初级",
      createDate: null
    },
    position: {
      id: 34,
      name: "测试开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 13,
      name: "普通公民"
    },
    salary: null
  },
  {
    id: 10,
    name: "张洁",
    gender: "女",
    birthday: "1990-10-09T00:00:00.000+0000",
    idCard: "420177199010093652",
    wedlock: "未婚",
    nativePlace: "海南",
    email: "zhangjie@qq.com",
    phone: "13695557742",
    address: "海口市美兰区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "高中",
    specialty: "无",
    school: "海南侨中",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000010",
    contractTerm: 1.0,
    conversionTime: "2018-01-31T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2019-01-01T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 92,
      name: "运维部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 16,
      name: "高级工程师",
      titleLevel: "中级",
      createDate: null
    },
    position: {
      id: 34,
      name: "测试开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 5,
      name: "民盟盟员"
    },
    salary: null
  },
  {
    id: 12,
    name: "陈静2",
    gender: "女",
    birthday: "1989-02-01T00:00:00.000+0000",
    idCard: "421288198902011234",
    wedlock: "已婚",
    nativePlace: "海南",
    email: "chenjing@qq.com",
    phone: "18795556693",
    address: "海南省海口市美兰区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "高中",
    specialty: "市场营销",
    school: "武汉大学",
    beginDate: "2015-06-09T00:00:00.000+0000",
    workState: "在职",
    workID: "00000012",
    contractTerm: 3.0,
    conversionTime: "2015-09-10T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2015-06-09T00:00:00.000+0000",
    endContract: "2018-06-08T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 82,
      name: "华南市场部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 12,
      name: "初级测试工程师",
      titleLevel: "初级",
      createDate: null
    },
    position: {
      id: 30,
      name: "数据库开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 1,
      name: "中共党员"
    },
    salary: null
  },
  {
    id: 13,
    name: "赵琳浩2",
    gender: "男",
    birthday: "1993-03-04T00:00:00.000+0000",
    idCard: "610122199303041456",
    wedlock: "未婚",
    nativePlace: "陕西",
    email: "zhao@qq.com",
    phone: "15698887795",
    address: "陕西省西安市莲湖区",
    posName: null,
    engageForm: "劳动合同",
    tiptopDegree: "博士",
    specialty: "电子工程",
    school: "哈尔滨理工大学",
    beginDate: "2018-01-01T00:00:00.000+0000",
    workState: "在职",
    workID: "00000013",
    contractTerm: 3.5,
    conversionTime: "2018-04-01T00:00:00.000+0000",
    notWorkDate: null,
    beginContract: "2018-01-01T00:00:00.000+0000",
    endContract: "2021-07-14T00:00:00.000+0000",
    workAge: null,
    department: {
      id: 91,
      name: "技术部",
      parentId: null,
      enabled: false,
      children: [],
      parent: false
    },
    nation: {
      id: 1,
      name: "汉族"
    },
    jobLevel: {
      id: 12,
      name: "初级测试工程师",
      titleLevel: "初级",
      createDate: null
    },
    position: {
      id: 33,
      name: "java 开发工程师",
      createDate: null
    },
    politicsStatus: {
      id: 3,
      name: "共青团员"
    },
    salary: null
  }
];

const EmpList = function() {
  return { emps: emps, count: emps.length };
};

//Mock.mock("/employee/basic/emp", "get", EmpList);
