/**
 * 全局配置文件
 */
module.exports = {
  PAGE_SIZE: 20, // 每页请求的数据个数
  getDB: getDB, // 数据库访问对象
  getCloudEnv: getCloudEnv, // 云环境
}

/**
 * 获取运行环境
 * 
 * test - 测试环境
 * pre  - 预发布环境
 * pro  - 正式环境
 */
function getEnv () {
  return "test";
  // return "pro";
}

/**
 * 获取数据库访问对象
 */
function getDB () {
  return wx.cloud.database();
}

/**
 * 获取云环境值
 */
function getCloudEnv () {
  if (getEnv() == "pro") {
    return "pro-xxx";
  } else {
    return "test-yyy";
  }
}