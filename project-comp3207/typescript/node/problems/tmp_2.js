nuiji;
function test1() {
    if (typeof city !== "undefined" && typeof city === "string") {
        return true;
    }
    else {
        return false;
    }
}
function test2() {
    if (typeof survival !== "undefined" && typeof survival === "boolean") {
        return true;
    }
    else {
        return false;
    }
}
function test3() {
    if (typeof year !== "undefined" && typeof year === "number") {
        return true;
    }
    else {
        return false;
    }
}
function test_all() {
    if (test1() && test2() && test3()) {
        return true;
    }
    else {
        return false;
    }
}
console.log(test_all());
