//判断数据类型

//基本类型可以用typeof判断->string,number,null,undefined,symbol,bitInt
typeof 'abc' //string
typeof 123 //number

//null需要单独判断,因为null
typeof null //object

//可以通过查找原型链来判断引用类型
console.log([3] instanceof Array) //true

//最全面的判断方式是Object.prototype.toString
console.log(Object.prototype.toString.call(new Date())) //[object Date]

//可以封装一下
function typeofFn(val){
    return Object.prototype.toString.call(val).slice(8,-1)
}