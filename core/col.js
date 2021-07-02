module.exports = class Col {
	constructor(options={}) {
		this.id = options.id // 列ID
		this.name = options.name||null // 作为表头时显示的名称
		this.group = options.group||null

		this.event = options.event||null // 自定义事件
		this.params = options.params||null // 事件入参
		this.value = options.value||'' // 显示值
		this.datas = options.datas||null // 附加参数

		//this.options = options
	}

	getJson() {
		let json = {}
		let configs = ['name', 'group', 'event', 'params', 'value', 'datas']

		configs.forEach(config => {
			if(this[config]) json[config] = this[config]
		})

		if(Object.keys(json).length == 1) {
			return this.value
		} else {
			return json
		}

	}
} 
