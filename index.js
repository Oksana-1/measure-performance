/**
 * Returns milliseconds passed from start to end of a function
 *
 * @param {function} fn Function to measure performance
 * @param {number} limit The number of times to run a function
 * @return {number} average number of milliseconds to execute 1 function call
 */

const measure = (fn, limit) => {
	const before = performance.now();
	for (let i = 0; i < limit; i++) {
		fn();
	}
	return (performance.now() - before) / limit;
}
// Measuring performance of :first-child, :last-child selectors
const addItems = (num) => {
	const rootElem = document.querySelector("#firstLastSelectorWrapper");
	for (let i = 0; i < num; i++) {
		const item = document.createElement("div");
		item.classList.add("item");
		item.innerHTML = `Item #${i + 1}`
		rootElem.append(item);
	}
}
const measureSelectors = () => {
	const firstChild = measure(() => document.querySelector("#firstLastSelectorWrapper .item:first-child"), 5000);
	const lastChild = measure(() => document.querySelector("#firstLastSelectorWrapper .item:last-child"), 5000);
	const element = document.querySelector("#firstLastSelectorSummary");
	element.innerHTML = `
		<p>Get first child took: ${firstChild} ms</p>
		<p>Get last child took: ${lastChild} ms</p>
`
}
addItems(100);
measureSelectors();

// Measuring performance of fibonacci on web-workers
const runFibonacciOnWorkers = () => {
	const result = document.querySelector("#fibonacciWebWorkersPerformance");
	const workerCode = document.querySelector("#workerCode").textContent;
	const blob = new Blob([workerCode], {type: "text/javascript"});
	const url = URL.createObjectURL(blob);
	const fibonacciWorker = new Worker(url);
	// Receive value from web-worker
	fibonacciWorker.onmessage = function(e) {
		result.innerHTML = `<p>Everage run of fibonacci-fn took: ${e.data} ms</p>`;
	}
}
runFibonacciOnWorkers();

// Measuring performance of Promises vs Observables
const promiseHandler = () => {
	const dogPromise = new Promise((resolve) => {
		setTimeout(() => {
			resolve("Dog");
		}, 0);
	});
	dogPromise.then((result) => result);
}
const observableHandler = () => {
	const catObservable = new rxjs.Observable((observer) => {
		setTimeout(() => {
			observer.next("Cat");
			observer.complete();
		}, 0);
	});
	catObservable.subscribe({
		next(result) {
			return result;
		},
	});
}
const measurePromisesAndObservables = () => {
const observableTime = measure(observableHandler, 5000);
	const promiseTime = measure(promiseHandler, 5000);
const element = document.querySelector("#promiseObservablePerformance");
element.innerHTML = `
	<p>Dog's promise took: ${promiseTime} ms</p>
	<p>Cat's observable took: ${observableTime} ms</p>
`
}
measurePromisesAndObservables();

// Measuring performance of array.includes vs object.hasOwnProperty
function generateArray(limit) {
	const array = [];
	setTimeout(() => {
		for (let i = 1; i < limit; i++) {
			array.push(`Value-${i}`);
		}
	});
	return array;
}
function generateObject(limit) {
	const obj = {};
	setTimeout(() => {
		for (let i = 1; i < limit; i++) {
			obj[`Value-${i}`] = true;
		}
	});
	return obj;
}


setTimeout(() => {
	measureArrayGenerator();
}, 0);
setTimeout(() => {
	measureObjectGenerator();
}, 0);
setTimeout(() => {
	measureArrayVsObjects(5000)
}, 0)
function measureArrayGenerator() {
	const generateArrayTime = measure(() => generateArray(5000), 5000);
	const element = document.getElementById("generateArray");
	element.innerHTML = `It took ${generateArrayTime} ms to generate array with 5000 elements`
}
function measureObjectGenerator() {
	const generateObjTime = measure(() => generateArray(5000), 5000);
	const element = document.getElementById("generateObject");
	element.innerHTML = `It took ${generateObjTime} ms to generate object with 5000 elements`
}
function measureArrayVsObjects (times) {
	const array =  generateArray(5000);
	const obj = generateObject(5000);
	function findInArray(value) {
		return array.includes(value);
	}
	function findInObject (value) {
		return obj.hasOwnProperty(value);
	}
	const arrayIncludesTimeTruthy = measure(() => findInArray("Value-1"), times);
	const arrayIncludesTimeFalsy = measure(() => findInArray("Value-0"), times);
	const objectHasOwnPropertyTimeTruthy = measure(() => findInObject("Value-1"), times);
	const objectHasOwnPropertyTimeFalsy = measure(() => findInObject("Value-0"), times);
	const arrayIncludesTruthy = document.getElementById("arrayIncludesTruthy");
	const arrayIncludesFalsy = document.getElementById("arrayIncludesFalsy");
	const objectHasOwnPropertyTruthy = document.getElementById("objectHasOwnPropertyTruthy");
	const objectHasOwnPropertyFalsy = document.getElementById("objectHasOwnPropertyFalsy");
	arrayIncludesTruthy.innerHTML = `It took ${arrayIncludesTimeTruthy} ms to find is element in array (for truthy search)`;
	arrayIncludesFalsy.innerHTML =  `It took ${arrayIncludesTimeFalsy} ms to find is element in array (for falsy search)`;
	objectHasOwnPropertyTruthy.innerHTML = `It took ${objectHasOwnPropertyTimeTruthy} ms to find is element in object (for truthy search)`;
	objectHasOwnPropertyFalsy.innerHTML = `It took ${objectHasOwnPropertyTimeFalsy} ms to find is element in object (for falsy search)`;
}
