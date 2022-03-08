//手写Promise.race
function promiseRace(promises){
    return new Promise((resolve,reject) => {
        //如果不是可迭代对象,抛出错误
        if (typeof promises[Symbol.iterator] !== 'function') throw new TypeError('not iterable')
        for(let promise of promises){
            Promise.resolve(promise).then(res=>{
                resolve(res)
            },err=>{
                reject(err)
            }).catch(err=>{reject(err)})
        }
    })
}