//this的指向
// window.name='dog'
function fn(){
    console.log(this.name)
}
//默认情况指向全局对象,严格模式下会绑定undefined
fn() //dog

String.prototype.sayName=function(){
    console.log(this)
}

//链式调用会指向最后调用的那个对象
'cat'.sayName() //String('cat')

//作为参数会指向包裹的函数
function outer(fn){
    this.name='bird'
    fn()
}

outer(fn) //bird

function Animal(){
    this.name='dog'
}
Animal.prototype.sayAge=function(){
    console.log(this.age)
}

//new会把this指向生成的实例
let animal=new Animal()
animal.age=12
animal.sayAge() //12


//可以用call,apply,bind手动修改this指向
let obj={
    name:'log'
}
fn.call(obj) //log

//箭头函数没有this会通过作用域链查找外层的this