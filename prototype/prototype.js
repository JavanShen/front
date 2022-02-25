//原型链
function Animal(){
    this.name='dog'
}
//可以在原型上添加方法,实例会获得这个方法
Animal.prototype.sayName=function(){
    console.log(this.name)
}

let animal=new Animal()
animal.sayName() //dog

let obj={
    age:12
}

//原型上有一个constructor指向构造对象
console.log(Animal.prototype.constructor===Animal) //true

//Object.getPrototypeOf可以获取构造对象的原型
console.log(Object.getPrototypeOf(animal)===Animal.prototype) //true
console.log(Object.getPrototypeOf(obj)===Object.prototype) //true

//instanceof可以查看构造函数的原型是否出现在某个实例的原型链上
console.log(animal instanceof Animal) //true