const cont = document.querySelector(".cont");
const ranNum = Math.ceil(Math.random() * 30);

for (let i = 0; i < ranNum; i++) {
    const el = document.createElement("div");
    el.classList.add("circle");
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    el.style.backgroundColor = randomColor;
    cont.appendChild(el);
}

const obj = {
    score_a: 30,
    score_b: 19,
    score_c: 11,
}

for(let prop in obj) obj[prop]++;
console.log(obj);

const basArr = ['basmach', 'igul', 'class']
const newBasArr = []
for(let i = 0; i < 7; i++) newBasArr.push(...basArr);
console.log(newBasArr)

// Object.values(basArr).forEach(value => {
//     for (let i = 0; i < 7; i++) {
//         newBasArr.push(value);
//     }
// });
// console.log(newBasArr);

