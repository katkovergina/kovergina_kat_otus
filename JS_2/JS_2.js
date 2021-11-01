async function promiseReduce(asyncFunctions = [], reduce, initialValue = 0) {
    return asyncFunctions.reduce(
        (promise, fun) => promise.then(
            async total => {
                try {
                    return reduce(total, await fun());
                } catch (e) {
                    console.warn(`${fun.name} failed with ${e}`);
                    return total;
                }
            }
        ),
        Promise.resolve(initialValue)
    );
}


const fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
};

const fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 500);
});

const fn3 = () => new Promise(() => {
    console.log('fn3');
    throw new Error('Что-то пошло не так');
});

const fn4 = () => new Promise(resolve => {
    console.log('fn4');
    setTimeout(() => resolve(5), 500);
});

promiseReduce(
    [fn1, fn2, fn3, fn4],
    function(memo, value) {
        console.log('reduce');
        return memo * value;
    },
    4,
).then(console.log);

