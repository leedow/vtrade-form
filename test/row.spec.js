const assert = require('assert')
const Row = require('../core/row')

describe('测试row',function(){
	let row = null
	it('对象创建',function(){
		row = new Row({
			id: 'test',
			cols: {
				a: 1,
				b: 2,
				c: {event: 'e', value: 3}
			}
		})
		assert.deepEqual( row.id, 'test')
		assert.deepEqual( row.cols.length, 3)
	})

	it('addCols',function(){
		row.addCols({
			d: 4
		})
		assert.deepEqual( row.cols.length, 4)
	})

	it('findCol',function(){
		let res = row.findCol('a')
		assert.deepEqual( res.value, 1)

		let res2 = row.findCol('aa')
		assert.deepEqual( res2, null)
	})

})