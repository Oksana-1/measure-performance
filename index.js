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
		<p>First child: ${firstChild} ms</p>
		<p>Last child: ${lastChild} ms</p>
`
}
addItems(15000);
measureSelectors();
