function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 78, 30, 46, 59];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
