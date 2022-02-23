//节流
/**
 * 无论触发多少次,只会按照规定的时间间隔触发
 * @param {function} fn 要执行的函数
 * @param {number} delay 延迟时间(毫秒)
 * @param  {...any} arg 函数参数
 * @returns {function}
 */
function throttle(fn,delay,...arg){
    let pre=0
    return function(){
        let now=+new Date,_this=this
        if(now-pre>delay){
            fn.call(_this,...arg)
            pre=now
        }
    }
}

let res=throttle(sayName,1000,'dog')
res()
res() //dog

function sayName(name){
    console.log(name)
}