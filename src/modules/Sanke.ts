class Snake{
    //蛇头
    head: HTMLElement;
    //蛇身（包括蛇头）
    bodies: HTMLCollection;
    //蛇容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div ') as HTMLElement;//找到第一个div作为头 断言
        this.bodies = this.element.getElementsByTagName('div');//返回带有指定标签名的对象的集合
    }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value) {//value设置蛇头的移动方向
        if (this.X == value) return;//旧值和新值相同
        if (value < 0 || value > 290) throw new Error('蛇撞墙了！');
        //左右移动的时候，左移动不能右调头，反之亦然
        if (this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft===value) {
            if (value > this.X) {//本来往左走的，现在要反方向走，应该继续往右走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value) {
        if (this.Y == value) return;
        if (value < 0 || value > 290) throw new Error('蛇撞墙了！');
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (this.Y < value) {
                this.Y -= 10;
            } else {
                this.Y += 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }
    //添加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>");
    }
    //移动
    moveBody() {
        //后面身体的位置为前面身体的位置，才能在视觉上移动
        for (let i = this.bodies.length - 1; i > 0; i--){//不包括蛇头
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;//前面一个的X
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;//前面一个的Y
            //当前位置
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查蛇头是否撞到身体上
    checkHeadBody() {
        //检查身体的其他部分（除去蛇头）是否和蛇头位置重叠
        for (let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {//蛇头是否和蛇身重叠
                throw new Error('撞到自己了！');
            }
        }
    }

}
export default Snake;