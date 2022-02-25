//寄生式继承
Object.prototype.parasitic=function(obj){
    function F(){}
    F.prototype=obj
    return new F
}

function extance(origin){
    let clone=Object.parasitic(origin)
    clone.sayAge=function(){
        console.log(22)
    }
    return clone
}

let obj={
    name:'dog'
}

let child=extance(obj)
console.log(child.name)
child.sayAge()

//缺点:
//无法函数复用
//只能从对象上继承
//会共享引用类型