const assert = require('assert')
const Table = require('../core/table')

describe('测试table',function(){
	 
	let table = null
	const cols = [
		{id: 'a', name: 'one'},
		{id: 'b', name: 'two'},
		{id: 'c', name: 'three'}
	]
	const row1 = {
		a: 1,
		b: 2,
		c: 3
	}
	const row2 = {
		a: 2,
		b: 2,
		c: 4
	}
	const row3 = {
		a: 6,
		b: 1
	}

	it('对象创建',function(){
		table = new Table({
			name:'test'
		})
		table.setCols(cols)
		table.addRow(row1)
		table.addRow(row2)
		table.addRow(row3)

		assert.deepEqual( table.name, 'test')
		table.print()
	})

	it('addCaulateCol',function(){
		table.addCaulateCol('value','sum', (value)=>`=${value}`)
		table.print()
		let cols = table.getColsById('sum')
		assert.deepEqual( cols[0].value, '=6')
		assert.deepEqual( cols[1].value, '=8')
		assert.deepEqual( cols[2].value, '=7')
	})

	it('addCaculateRow',function(){
		table.addCaculateRow('value', 'avg', (value)=>{
			return Number(value.toFixed(2))
		})
		table.print()

		let row = table.getRowById('avg')
		assert.deepEqual( row.id, 'avg')

		assert.deepEqual( row.findCol('a').value, 3)
		assert.deepEqual( row.findCol('b').value, Number((5/3).toFixed(2)))
		assert.deepEqual( row.findCol('c').value, 3.5)
		
	})


 

})