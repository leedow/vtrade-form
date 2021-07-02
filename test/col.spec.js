const assert = require('assert')
const Col = require('../core/col')

describe('测试col',function(){

	it('对象创建',function(){
		col = new Col({
			id: 'test',
			name: 'testName',
			group: 'group',
			event: 'e',
			params: 'params',
			value: 'value',
			datas: {a:1}
		})
		assert.deepEqual( col.id, 'test')
		assert.deepEqual( col.name, 'testName')
		assert.deepEqual( col.group, 'group')
		assert.deepEqual( col.event, 'e')
		assert.deepEqual( col.params, 'params')
		assert.deepEqual( col.value, 'value')
		assert.deepEqual( col.datas, {a:1})


	})

})