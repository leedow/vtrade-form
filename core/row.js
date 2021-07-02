const Col = require('./col')

module.exports = class Row {
	/*
	 * @options {id, cols:{colId:colValue}}
	 */
	constructor(options={}) {
		this.id = options.id||null
		this.cols = []
		if(options.cols)
			this.addCols(options.cols)
	}

	addCols(cols) {
		Object.keys(cols).forEach(id => {
			this.addCol(id, cols[id])
		})
	}

	addCol(colId, data) {
		let col = {
			id: colId
		}
		if(typeof data == 'object') {
			Object.keys(data).forEach(key => {
				col[key] = data[key]
			})
		} else {
			col.value = data
		}
		this.cols.push(new Col(col))
	}

	findCol(colId) {
		return this.cols.find(col => col.id == colId)
	}
} 
