	
function test1(){
	if (typeof a !== 'undefined') {
		return false;	
	}	
}
function over_all_test(){
	if (test1() == true) {
		return true;
	} else {
        return false;
    }
}
console.log(over_all_test());
