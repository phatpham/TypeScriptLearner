a = 1;
a = 1;
function test1() {
    if (typeof a !== 'undefined') {
        return true;
    }
}
function over_all_test() {
    if (test1() == true) {
        return true;
    }
}
over_all_test();
