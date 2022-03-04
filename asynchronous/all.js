//手写Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        //如果不是可迭代对象,抛出错误
        if (typeof promises[Symbol.iterator] !== 'function') throw new TypeError('not iterable')
        //result保存resolve的值,count用来计数已经完成的promise
        let len = promises.length, result = new Array(len), count = 0
        for (let index = 0; index < len; index++) {
            let item = promises[index]
            //如果不是promise直接保存
            if (item instanceof Promise) {
                promises[index].then(res => {
                    result[index] = res
                    count++
                    //完成所有的promise后返回result
                    count === len && resolve(result)
                }, err => {
                    //有一个失败就返回失败
                    reject(err)
                })
            } else {
                result[index] = item
                count++
                count === len && resolve(result)
            }
        }
    })
}