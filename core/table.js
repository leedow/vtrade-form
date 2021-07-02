const Base = require('./base')
const helper = require('./helper')

module.exports = class Table extends Base { 
  constructor(options={}) {
  	super(options)
  }

  /*
   * 添加总和列
   * @group 需要计算的col key
   */
  addCaulateCol(key, func='sum', format, colName) {
  	this.appendCols([{
  		id: func,
  		name: colName||func
  	}])
  	this.rows.forEach(row => {
  		let aims = row.cols.filter(col => typeof col[key] == 'number')
  			.map(col => col[key])
  		row.addCols({
  			[func]: format?format(helper[func](aims)):helper[func](aims)
  		})
  	})
  }

  /*
   * 添加总和行
   * @key 需要计算的col key
   * @func 计算函数名
   * @format 格式化函数
   */
  addCaculateRow(key, func='sum', format) {
  	let row = {}
  	this.cols.forEach(col => {
  		let cols = this.getColsById(col.id)
  			.filter(col => typeof col[key] == 'number')
  			.map(col => col[key])

  		if(cols.length > 0) {
  			if(format) {
  				row[col.id] = format(helper[func](cols))
  			} else {
  				row[col.id] = helper[func](cols)
  			}
  		}

  	})
  	this.addRow(row, func)
  }

}
