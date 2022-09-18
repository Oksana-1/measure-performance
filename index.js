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
