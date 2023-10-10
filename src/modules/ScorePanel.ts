class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number;//设置最大等级
    upScore: number;//设置多少分可以升级
    constructor(maxLevel:number=10,upScore:number=10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    //加分
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';//变成字符串,每次加1
        if (this.score % this.upScore == 0) {
            this.levelUp();
        }
    }
    //提高等级
    levelUp() {
        if (this.level < this.maxLevel) {//没有突破最大的等级
            this.levelEle.innerHTML = ++this.level + '';//变成字符串,每次加1
        }
    }
}
export default ScorePanel;