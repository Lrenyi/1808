const Role = require("./role.js");
const Fighter = require("./fighter.js");

/* 子弹 */
function Bullet(){
	// 构造函数继承
	Role.call(this, {
		width: 6, 
		height: 14,
		img: "images/bullet.png",
		x: Fighter.x + Fighter.width / 2,
		y: Fighter.y - 14,
		speed: -5
	});
}
// 原型链继承
Bullet.prototype = Object.create(Role.prototype);

module.exports = Bullet;