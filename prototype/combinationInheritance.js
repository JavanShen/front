//组合继承
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

Child.prototype=new Parent()

let child=new Child(12)
let child2=new Child()

child.food.push('egg')
console.log(child2.food);

//缺点:
//会调用两遍Parent