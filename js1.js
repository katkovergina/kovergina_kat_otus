const curry = fn => {
    const term = (...args) => {
        return n => {
            if(!n) {
                return args.reduce((count, a) => {
                    return fn.call(fn, count, a)
                }, 0)
            }
            return term (...args, n)
        }
    }
    return term()
}

const sum = curry((x, y) => x + y)
console.log(sum(1)(2)(3)(5)(7)())


