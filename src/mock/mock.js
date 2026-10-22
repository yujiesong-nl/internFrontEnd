const Mock = require("mockjs");
const Random = Mock.Random;

Mock.setup({
  timeout: "3000"
});

const getManage = function() {
  return [
    {
      id: "1",
      name: Random.cname()
    },
    {
      id: "2",
      name: Random.cname()
    },
    {
      id: "3",
      name: Random.cname()
    }
  ];
};

const getIntern = function() {
  const data = {};
  for (var i = 0; i < 10; i++) {
    const guid = Random.guid();
    const evaluate = Random.integer(0, 5);
    const signContract = Random.boolean();
    data[guid] = {
      id: guid,
      name: Random.cname(),
      school: "北京清华大学",
      head: Random.cname(),
      beginDate: Random.date("yyyy-MM-dd"),
      evaluateNumber: evaluate,
      evaluationResult: evaluate > 0 ? Random.boolean() : null,
      signContract: signContract,
      signType: signContract ? Random.integer(1, 3) : 0
    };
  }
  return data;
};

const getEvaluationForm = function() {
  return {
    beginDate: Random.date("yyyy-MM-dd"),
    name: Random.cname(),
    projectName: "check in",
    head: Random.cname(),
    formList: [
      {
        id: Random.guid(),
        itemName: "学习能力",
        describe:
          "能够主动学习，积极请教各项业务知识，对工作中遇到疑难问题具有钻研精神，对难度大的工作也能积极接受，努力去做"
      },
      {
        id: Random.guid(),
        itemName: "沟通能力",
        describe:
          "能很快理解别人所表达的意思，并能精准表达自己的想法，遇到问题能确保及时沟通"
      },
      {
        id: Random.guid(),
        itemName: "职业态度",
        describe: "工作态度、时间观念、踏实稳定程度、按时参加培训"
      },
      {
        id: Random.guid(),
        itemName: "项目技能",
        describe: "能独立承担项目中的任务，掌握了项目要求的基本知识技能"
      }
    ]
  };
};

const getInternEvaluationList = function() {
  const data = {};
  const n = Random.integer(3, 10);
  for (var i = 0; i < n; i++) {
    const guid = Random.guid();
    data[guid] = {
      beginDate: Random.date("yyyy-MM-dd"),
      evaluationTime: Random.date("yyyy-MM-dd"),
      name: Random.cname(),
      projectName: "check in",
      head: Random.cname(),
      formResult: Random.boolean(),
      formList: [
        {
          id: Random.guid(),
          itemName: "学习能力",
          describe:
            "能够主动学习，积极请教各项业务知识，对工作中遇到疑难问题具有钻研精神，对难度大的工作也能积极接受，努力去做",
          radio: Random.integer(1, 3),
          comment: "test " + Random.integer(1, 3000)
        },
        {
          id: Random.guid(),
          itemName: "沟通能力",
          describe:
            "能很快理解别人所表达的意思，并能精准表达自己的想法，遇到问题能确保及时沟通",
          radio: Random.integer(1, 3),
          comment: "test " + Random.integer(1, 3000)
        },
        {
          id: Random.guid(),
          itemName: "职业态度",
          describe: "工作态度、时间观念、踏实稳定程度、按时参加培训",
          radio: Random.integer(1, 3),
          comment: "test " + Random.integer(1, 3000)
        },
        {
          id: Random.guid(),
          itemName: "项目技能",
          describe: "能独立承担项目中的任务，掌握了项目要求的基本知识技能",
          radio: Random.integer(1, 3),
          comment: "test " + Random.integer(1, 3000)
        }
      ]
    };
  }
  return data;
};

// Mock.mock(
//   RegExp("/intern/getInternEvaluationList/*" + ".*"),
//   "get",
//   getInternEvaluationList
// );
// Mock.mock(/intern/, "get", getIntern);
// Mock.mock(/intern\/sandinternevaluate/, "post", {});
// Mock.mock(RegExp("/evaluationform/*" + ".*"), "post", {});
// Mock.mock(RegExp("/system/basic/deps/manage/*" + ".*"), "get", getManage);
// Mock.mock(RegExp("/evaluationform/*" + ".*"), "get", getEvaluationForm);
