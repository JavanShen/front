//手写promise

//声明promise的三个状态
const PENDING = 'PENDING'
const FULFILLED = 'FUlFIlled'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    let called;
    //判断是否是对象或函数
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            let then = x.then;
            //判断是否是promise
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    //如果还有promise继续递归
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        //如果是普通值直接resolve
        resolve(x)
    }
}

class MyPromise {
    /**
     * 
     * @param {function} executor 一个接受resolve和reject的函数
     */
    constructor(executor) {
        //状态:初始为PENDING
        this.state = PENDING
        //成功和失败返回的值
        this.value = undefined
        this.reason = undefined
        //成功或失败后执行的回调函数
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value)=>{
            //只有在状态为PENDING时才会执行,对应了promise状态一旦更改无法再改变
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => {
                    fn()
                });
            }
        }

        let reject = (reason)=> {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => {
                    fn()
                });
            }
        }

        //如果执行出错直接失败
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        //如果没有传值或者不是函数就初始化
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

        //返回一个新的promise实现链式调用
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.value === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        //处理返回的值实现值的穿透
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }

            if (this.value === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.state === PENDING) {
                //传入队列等状态改变后执行
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
}

//使用
let promise1=new MyPromise((resolve,reject) => {
    console.log('start')
    setTimeout(() => {
        console.log('setTimeout')
        resolve(12)
    }, 1000);
    console.log('two')
})

promise1.then(res=>{
    console.log(res)
    return res
},err=>{
    console.log(err)
})
.then(res=>{
    console.log(res)
    return new MyPromise((resolve,reject) => {
        setTimeout(() => {
            reject('fail')
        }, 1000);
    })
},err=>{
    console.log(err)
})
.then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})
//start->two->setTimeout->12->12->fail

