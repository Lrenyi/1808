const Role = require("./role.js");
const Map = require("./map.js");


/* 敌机 */
function Enemy({width, height, x, y, speed, img}) {
	Role.call(this, {width, height, x, y, speed, img});
}

Enemy.prototype = Object.create(Role.prototype);

// 工厂设计模式
const EnemyFactory = {
	// 创建敌机对象
	// type: "small"  "middle"  "big"
	createEnemy(type) {
		let enemy;
		if (type === "small")
			enemy = new Enemy({
				width: 34,
				height: 24,
				x: Math.floor(Math.random() * (Map.width - 34)),
				y: 0,
				speed: 5,
				img: "images/small_fly.png"
			});
		else if (type === "middle")
			enemy = new Enemy({
				width: 46,
				height: 60,
				x: Math.floor(Math.random() * (Map.width - 46)),
				y: 0,
				speed: 3,
				img: "images/mid_fly.png"
			});
		else if (type === "big")
			enemy = new Enemy({
				width: 110,
				height: 164,
				x: Math.floor(Math.random() * (Map.width - 110)),
				y: 0,
				speed: 1,
				img: "images/big_fly.png"
			});
		if (enemy) // 创建DOM元素
			enemy.createDom();

		return enemy;
	}
}

module.exports = EnemyFactory;