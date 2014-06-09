var shuffle = require("./shuffle");
var evaluator = require("./evaluator");

shuffle.test();
console.log("\tPassed %d/%d tests", shuffle.getPassCount(), shuffle.getPassCount() + shuffle.getFailCount());

evaluator.test();
console.log("\tPassed %d/%d tests", evaluator.getPassCount(), evaluator.getPassCount() + evaluator.getFailCount());

