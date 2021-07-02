const Col = require('./col')
const Row = require('./row')

module.exports = class Table { 
  constructor(options={}) {
  	this.name = options.name||''
  	this.type = 'Table'
  	this.cols = [] // [{id, name, group}...]
  	this.rows = [] // { id:{event, value, params, group, datas}, id2:value }

    if(options.cols) this.setCols(options.cols)
  }

  setCols(cols) {
    cols.forEach(col => {
      this.cols.push(new Col(col))
    })
  }

  /*
   * @row {key: value||{event, value, params, group, datas}} 其中key为cols的id
   */
  addRow(row) {
  	this.rows.push(new Row({
      cols: row
    }))
  }

  /*
   * 获取指定id的col列
   */
  getColsById(colId) {
    let res = []
    this.rows.forEach(row => {
      let aim = row.findCol(colId)
      if(aim) res.push(aim)
    })
    return res
  }

  /*
   * 根据指定的group获取
   */
 

  /*
   * 获取格式化后的表单数据
   * @return {
    		cols: [name]
    		rows: [
    			[{event, value, params}||value]
    		]
       }
   */
  getData() {
  	let rows = []

  	this.rows.forEach(row => {
  		let tmp = []
  		this.cols.forEach(col => {
        let res = row.findCol(col.id)
  			if( res ) {
  				tmp.push(res.getJson())
  			} else {
  				tmp.push('')
  			}
  			
  		})
  		rows.push(tmp)
  	})

  	return {
  		cols: this.cols.map(col => col.name),
  		rows
  	}
  }


}
