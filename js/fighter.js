const Tools = require("./tools.js");
const Map = require("./map.js");

/* 战机 */
const Fighter = {
	width: 66,
	height: 80,
	element: Tools.$("#fighter"),
	x: 0,
	y: 0,

	move(x, y) { // 战机移动
		// 计算定位位置
		var 
			_left = x - this.width / 2,
			_top = y - this.height / 2;
		// 判断是否超出范围
		if (_left < 0)
			_left = 0;
		else if (_left > Map.width - this.width)
			_left = Map.width - this.width;
		if (_top < 0)
			_top = 0;
		else if (_top > Map.height - this.height)
			_top = Map.height - this.height;
		// 设置css样式
		this.element.style.left = _left + "px";
		this.element.style.top = _top + "px";
		// 当前战机的坐标
		this.x = _left;
		this.y = _top;
	}
};

module.exports = Fighter;