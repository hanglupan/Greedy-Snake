class Food{
    //定义一个名为element的元素，属于HTMLElement类
    private element: HTMLElement;
    constructor() {
        // 获取页面的food元素并赋值给element
        // 末尾加上！表示id为food的元素必定存在（非空）
        this.element = document.getElementById('food')!;
    }
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    change() {
        //随机生成一个食物
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}
export default Food;