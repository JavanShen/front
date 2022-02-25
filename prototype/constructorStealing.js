//借用构造函数
function Parent(age){
    this.name='dog'
    this.food=['apple','peach','rice']
    this.age=age
}

Parent.prototype.sayName=function(){
    console.log(this.name)
}

function Child(...arg){
    Parent.call(this,...arg)
}

let child=new Child(12)
let child2=new Child()

console.log(child.age) //12

child.food.push('egg')
console.log(child2.food) //[ 'apple', 'peach', 'rice' ]

//缺点:
//无法继承原型链中的函数
child.sayName() //not a function
