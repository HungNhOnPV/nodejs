// function add(a, b) {
// 	if(typeof a !== 'string' || typeof b !== 'string') {
// 		throw new Error('Wrong type');
// 	}

// 	return a + b;
// }

// try {
// 	var result = add('a', 1);
// } catch(error) {
// 	console.log(error);
// }

// console.log('XXX');

function reject() {
	return new Promise(function(resolve, reject) {
		reject(new Error('Promise error'))
	});
}

reject().catch(function(error) {
	console.log('Has error', error.message);
});