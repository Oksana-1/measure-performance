const addItems = (num) => {
	const rootElem = document.querySelector("#wrapper");
	for (let i = 0; i < num; i++) {
		const item = document.createElement("div");
		item.classList.add("item");
		item.innerHTML = `Item #${i + 1}`
		rootElem.append(item);
	}
}
const measure = (fn, limit) => {
	const before = performance.now();
	for (let i = 0; i < limit; i++) {
		fn();
	}
	return (performance.now() - before) / limit;
}
const measureSelectors = () => {
	const firstChild = measure(() => document.querySelector("#wrapper .item:first-child"), 5000);
	const lastChild = measure(() => document.querySelector("#wrapper .item:last-child"), 5000);
	const element = document.querySelector("#summary");
	element.innerHTML = `
		<p>Get first child took: ${firstChild} ms</p>
		<p>Get last child took: ${lastChild} ms</p>
`
}
addItems(100);
measureSelectors();
const runFibonacciOnWorkers = () => {
	const workerCode = document.querySelector("#workerCode").textContent;
	const blob = new Blob([workerCode], {type: "text/javascript"});
	const url = URL.createObjectURL(blob);
	new Worker(url);
}
runFibonacciOnWorkers();
