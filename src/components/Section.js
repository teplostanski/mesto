class Section {
	constructor({items, renderer}, container) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(container);
	}

	renderItems(extraItems) {
		this._items.concat(extraItems).forEach(item => {
			this._container.append(this._renderer(item));
		});
	}

	addItem(item) {
		this._container.prepend(item);
	}
}
export { Section };