const cont = document.querySelector(".cont");
const ranNum = Math.ceil(Math.random() * 10);

for (let i = 0; i < ranNum; i++) {
    const el = document.createElement("div");
    el.classList.add("circle");
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    el.style.backgroundColor = randomColor;
    cont.appendChild(el);
}