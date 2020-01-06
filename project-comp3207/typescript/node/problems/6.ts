
function test1() {
    if (avatarNum === 7) {
        return true;
    } else {
        return false;
    }
}

function test2() {
    if (answer === "Fairy") {
        return true;
    } else {
        return false;
    }
}

function test_all() {
    return (test1() && test2());
}