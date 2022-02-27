//模拟new
function newSimulation(source,...arg){
    //声明一个空对象
    let obj={}
    //设置空对象的原型为构造函数原型
    Object.setPrototypeOf(obj,source.prototype)
    //修改this的指向
    const res=source.call(obj,...arg)
    //查看是否有返回值,如果返回值为对象直接返回,否则返回obj
    return typeof res==='object'?res:obj
}

function Parent(age){
    this.name='dog'
    this.age=age
}

function Fruit(){
    this.name='apple'
    return {name:'pineapple'}
}

Parent.prototype.sayName=function(){
    console.log(this.age)
}

let parent=newSimulation(Parent,12)
parent.sayName() //12

let fruit=newSimulation(Fruit)
console.log(fruit.name) //pineapple