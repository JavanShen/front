//闭包
function makeMachine(){
    let num=0
    return function(){
        num++
        console.log(num)
    }
}

//machine依旧可以访问num,可以储存自己的私有变量不被外部访问
let machine=makeMachine()
machine() //1
machine() //2
console.log(num) //num is not defined