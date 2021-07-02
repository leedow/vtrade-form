const assert = require('assert')
const Base = require('../core/base')

describe('测试base',function(){
	 
	let base = null
	const cols = [
		{id: 'one', name: 'one'},
		{id: 'two', name: 'two'}

	]
	const row1 = {
			one: 1,
			two: 2
		}
	const row2 = {
			one: 2,
			two: 4
		}
	const row3 = {
			one: {event:'event', value:1, params: 1},
			two: 2
		}

	it('对象创建',function(){
		base = new Base({
			name:'test'
		})
		assert.deepEqual( base.name, 'test')
	})

	it('setCols',function(){
		base.setCols(cols)
		assert.deepEqual( base.cols.length, 2)
	})

	it('addRow',function(){
		base.addRow(row1)
		assert.deepEqual( base.rows.length, 1)
		assert.deepEqual( base.rows[base.rows.length-1].cols.length, 2)


		base.addRow(row2)
		assert.deepEqual( base.rows.length, 2)
		assert.deepEqual( base.rows[base.rows.length-1].cols.length, 2)

		 
		base.addRow(row3)
		assert.deepEqual( base.rows.length, 3)
		assert.deepEqual( base.rows[base.rows.length-1].cols.length, 2)

		 
	})



	it('getData',function(){
		assert.deepEqual( base.getData(), {
			cols: cols.map(col=>col.name),
			rows: [
				[row1.one,row1.two],
				[row2.one,row2.two],
				[row3.one,row3.two]
			]
		})
	})

	 

	it('getColsById',function(){
		assert.deepEqual( base.getColsById('one').length, 3)
	})
 

})