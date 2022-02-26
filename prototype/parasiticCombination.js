//寄生组合式继承
Object.prototype.parasitic=function(obj){
    function F(){}
    F.prototype=obj
    return new F()
}

function extance(child,parent){
    let clone=Object.parasitic(parent.prototype)
    clone.constructor=child
    child.prototype=clone
}

function Parent(age){
    this.name='dog'
    this.age=age
}

Parent.prototype.sayName=function(){
    console.log(this.name)
}

function Child(...arg){
    Parent.call(this,...arg)
}

extance(Child,Parent)

let child=new Child(12)
child.sayName()