function syncAdd(a, b) {
    return a + b
}

function asyncAdd(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(a + b) }, 500)
    })
}

function ada(a, b) {
    console.log(syncAdd(a, b))
}
async function add(a, b) {
    const result = await asyncAdd(a, b)
    console.log(result)
}

asyncAdd(11, 13).then(console.log)

asyncAdd(11, 13)
    .then(res => { console.log(res); return asyncAdd(res, 7) })
    .then(res => { console.log(res); return asyncAdd(res, 19) })
    .then(res => { console.log(res); return asyncAdd(res, 2) })
    .then(console.log)


fetch('https://www.hebcal.com/converter?cfg=json&date=2024-12-05&g2h=1&strict=1')
    .then(res => res.json())
    .then(data => {console.log(data.events[0])})
