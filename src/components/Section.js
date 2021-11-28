class Section {
	constructor({items, renderer}, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._containerSelector = document.querySelector(containerSelector);
	}

	renderItems(extraItems) {
		this._items.concat(extraItems).forEach(item => {
			this._containerSelector.append(this._renderer(item));
		});
	}

	addItem(item) {
		this._containerSelector.prepend(item);
	}
}
export { Section };