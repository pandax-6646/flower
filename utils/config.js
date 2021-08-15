let env = '';
let baseUrl = "";
if (env === "dev") {
  // 本地地址
  baseUrl = "http://localhost:3002/"
} else {
  baseUrl = "http://132.232.87.95:3002/"
}
// 导出
export {
  baseUrl
}