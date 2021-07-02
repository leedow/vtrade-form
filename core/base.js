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
    this.cols = []
    cols.forEach(col => {
      this.cols.push(new Col(col))
    })
  }

  appendCols(cols) {
    cols.forEach(col => {
      this.cols.push(new Col(col))
    })
  }

  /*
   * @row {key: value||{event, value, params, group, datas}} 其中key为cols的id
   */
  addRow(row, id) {
  	this.rows.push(new Row({
      id,
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


  getRowById(rowId) {
    return this.rows.find(row => row.id == rowId)
  }

 

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

  /*
   * 打印表格
   */
   print() {
      let format = this.getData()
      let data = format.rows
      data.forEach((row, i) => {
        row.forEach((col, i2) => {
          if(typeof col == 'object') {
            data[i][i2] = JSON.stringify(col)
          }
        })
      })
      data.unshift(format.cols)
      console.table(data)
   }


}
