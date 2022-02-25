//原型链继承
function Parent(){
    this.name='dog'
    this.food=['apple','peach','rice']
}

Parent.prototype.sayName=function(){
    console.log(this.name)
}

function Child(){}
Child.prototype=new Parent()

let child=new Child()
child.sayName() //dog

//缺点:
//会共享引用类型的属性
let child2=new Child()
child.food.push('egg')
console.log(child2.food) //['apple','peach','rice','egg']

//创建实例的时候无法传参