//防抖
/**
 * 无论触发多少次,如果触发间隔小于delay只会触发一次
 * @param {function} fn 要执行的函数
 * @param {number} delay 延迟时间(毫秒)
 * @param  {...any} arg 函数参数
 * @returns {function}
 */
function debounce(fn,delay,...arg){
    let timer=null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(fn,delay,...arg)
    }
}

class Test{
    constructor(){
        this.age=12
    }
}

let res=debounce(sayName,1000,'dog')
res()
res() //dog

let test=new Test()
test.sayAge=sayName
test.sayAge('haha')

function sayName(name){
    console.log(name)
    console.log(this.age)
}