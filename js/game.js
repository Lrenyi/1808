// 引入模块
const Fighter = require("./fighter.js")
const Bullet = require("./bullet.js")
const EnemyFactory = require("./enemy.js")
const Map = require("./map.js")
const Tools = require("./tools.js");


/* 引擎 */
const Game = {
	bullets: [], // 存放所有生成的子弹对象
	enemies: [], // 存放所有生成的敌机
	// 初始化
	init() {
		this.addListener();
	},
	// 添加事件监听
	addListener() {
		// 点击屏幕开始
		Tools.on(Map.startElement, "click", ()=>{
			Map.startElement.style.display = "none";
			// 生成子弹
			this.genBullet();
		});

		// 鼠标移动，战机跟随
		Tools.on(Map.gameElement, "mousemove", (event)=>{
			// 鼠标在文档中的位置
			var
				_pageX = event.pageX,
				_pageY = event.pageY;
			// 换算为在地图中的位置
			var
				_offsetX = _pageX - Tools.offset(Map.gameElement).left,
				_offsetY = _pageY - Tools.offset(Map.gameElement).top;
			// 战机移动
			Fighter.move(_offsetX, _offsetY);
		});
	},
	// 生成子弹
	genBullet() {
		let count = 0;
		setInterval(()=>{
			count++;
			// 生成子弹
			if (count % 10 === 0) { // 生成一次子弹
				// 创建子弹对象
				let bullet = new Bullet();
				// 创建DOM元素
				bullet.createDom();
				// 保存到数组中
				this.bullets.push(bullet);
			}
			// 生成敌机
			if (count % 30 === 0) 
				this.enemies.push(EnemyFactory.createEnemy("small"))			
			if (count % 100 === 0)
				this.enemies.push(EnemyFactory.createEnemy("middle"))
			if (count % 200 === 0)
				this.enemies.push(EnemyFactory.createEnemy("big"))

			// 所有子弹移动
			for(let i = this.bullets.length - 1; i >= 0; i--) {
				this.bullets[i].move();
				if (!this.bullets[i].isAlive)
					this.bullets.splice(i, 1);
			}
			// 所有敌机移动
			for(let i = this.enemies.length - 1; i >= 0; i--) {
				this.enemies[i].move();
				if (!this.enemies[i].isAlive)
					this.enemies.splice(i, 1);
			}

			// 检测是否有角色碰撞
			for (let i = this.bullets.length - 1; i >= 0; i--) {
				let bullet = this.bullets[i];				
				for (let j = this.enemies.length - 1; j >= 0; j--) {
					let enemy = this.enemies[j];
					if (this.check(bullet, enemy)) { // 碰撞
						bullet.element.parentNode.removeChild(bullet.element);
						this.bullets.splice(i, 1);
						enemy.element.parentNode.removeChild(enemy.element);
						this.enemies.splice(j, 1);
						break;
					}
				}
			}
		}, 1000/60);
	},
	// 检测是否两个角色碰撞
	check(role1, role2) {
		return !(role1.y > role2.y + role2.height
					|| role1.x > role2.x + role2.width
					|| role1.y + role1.height < role2.y
					|| role1.x + role1.width < role2.x);
	}
};

// 初始化
Game.init();