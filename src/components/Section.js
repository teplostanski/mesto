class Section{
	constructor({ items, renderer}, containerSelector){
		this._items = items;
		this._renderer = renderer;
		this._containerSelector = containerSelector;
	}

	addItem(evt) {
		this._containerSelector.append(evt);
	}

	renderItems(){
		this._items.forEach(item => {
			this._renderer(item);
		});
	}
}
export { Section };