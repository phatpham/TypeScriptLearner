function test1() {
  if (typeof a !== "undefined") {
    return true;
  } else {
    return false;
  }
}
function test_all() {
  if (test1() == true) {
    return true;
  } else {
    return false;
  }
}
console.log(test_all());
