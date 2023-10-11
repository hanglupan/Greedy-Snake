import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
class GameControl{
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    direction: string = '';//控制方向
    isLive = true;//记录游戏是否结束
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,1);
        this.init();//初始化
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));//添加键盘事件监听
        this.run();//运行
    }
    keydownHandler(event: KeyboardEvent) {//键盘事件
        this.direction = event.key;
    }
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {//来计算X值和Y值
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        this.checkEat(X, Y);//检查蛇头是否吃到了食物
        try {//更新蛇头
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert("GAME OVER!");
            this.isLive = false;
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);//调用自身
    }
    //检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {//蛇头部是否等于食物的位置，初始食物位置已经在less里面设置好了
            this.food.change();//重置食物位置
            this.scorePanel.addScore();//增加分数
            this.snake.addBody();//增加蛇身
        }
    }
}
export default GameControl;