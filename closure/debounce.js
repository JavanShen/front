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
        const _this=this
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout((...arg)=>{
            fn.call(_this,...arg)
        },delay,...arg)
    }
}

let res=debounce(sayName,1000,'dog')
res()
res() //dog

function sayName(name){
    console.log(name)
}