export function repeat(element, count) {
    const p = [];

    console.log(typeof element);
    let func = (i)=>element;
    if(typeof element === 'function') {
        func = element;
    }

    for (let i = 0; i < count; i++) {
        p.push(func(i));
    }

    return p;
}