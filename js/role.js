const Map = require("./map.js");

/* 作为 子弹与敌机 的父类 */
function Role({width, height, x, y, speed, img}) {
	this.width = width;
	this.height = height;
	this.element = null;
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.img = img;
	this.isAlive = true;
}

// 动态创建DOM元素
Role.prototype.createDom = function() {
	// 创建图像节点
	const img = this.element = document.createElement("img");
	// 设置节点属性
	this.element.src = this.img;
	// 设置图像节点CSS样式
	img.style.width = this.width + "px";
	img.style.height = this.height + "px";
	img.style.position = "absolute";
	img.style.left = this.x + "px";
	img.style.top = this.y + "px";
	// 添加到地图的游戏界面中
	Map.gameElement.appendChild(img);
}

// 移动
Role.prototype.move = function() {
	// 修改定位的 y 坐标
	this.y += this.speed;
	// 设置CSS样式
	this.element.style.top = this.y + "px";
	// 判断是否超出地图范围
	if (this.y < 0 || this.y > Map.height) {
		this.isAlive =false;
		Map.gameElement.removeChild(this.element);
	}
}


module.exports = Role;