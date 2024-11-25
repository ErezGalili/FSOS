function isValidParentheses(s) {
    const stack = []
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    const filteredString = s.split('').filter(char => '()[]{}'.includes(char))
    for (let i = 0; i < filteredString.length; i++) {
        const char = filteredString[i]

        if (map[char]) {
            stack.push(char)
        } else {
            const last = stack.pop()
            if (map[last] !== char) {
                return false
            }
        }
    }
    return stack.length === 0
}

class Squre {
    constructor(edge) {
        this.edge = edge;
        this.sqr = edge ** 2;
    }
    res() {
        console.log('The area is ' + this.sqr + ' sqr')
    }
}

const s = new Squre(15)
s.res()

class Dice {
    #faceUp = 0
    constructor() {
        this.#faceUp = this.roll()
    }
    get faceUp() {
        return this.#faceUp;
    }
    roll() {
        this.#faceUp = Math.ceil(Math.random() * 6)
        return this.#faceUp
    }
}
const d = new Dice()
console.log(d.faceUp)

function factorial(n) {
    if (n == 1) return 1;
    return n * factorial(n - 1)
}

function factorial2(n) {
    let sum = 1
    for (let i = 1; i <= n; i++) {
        sum *= i
    }
    return sum
}

function fibo(n) {
    if (n <= 2) return 1;
    return fibo(n - 1) + fibo(n - 2)
}

console.log(fibo(15));


class Friend {
    #friend = undefined
    constructor(friend) {
        if (friend instanceof Friend) {
            this.#friend = friend
        }
    }
    get friend() {
        return this.#friend
    }
    setFriend(newFriend) {
        if (newFriend instanceof Friend) {
            this.#friend = newFriend
        }
    }
    knows(target, visited = new Set()) {
        if (this === target) return true
        if (!this.#friend) return false
        if (visited.has(this)) return false
        visited.add(this)
        return this.#friend.knows(target, visited)
    }
}

const alice = new Friend();
const bob = new Friend();
const charlie = new Friend();

alice.setFriend(bob);
bob.setFriend(charlie);

// console.log(alice.knows(charlie));
// console.log(bob.knows(alice));
// console.log(charlie.knows(alice));

// charlie.setFriend(alice);
// console.log(alice.knows(charlie));
// console.log(charlie.knows(bob));
// console.log(bob.knows(alice));

//JS

const log = document.querySelector("#log");

class Pillow {
    constructor(softness) {
        this.softness = softness || Math.ceil(Math.random() * 5);
        this.currentUser = null;
    }

    isAvailable() {
        return this.currentUser === null;
    }
    assignUser(user) {
        if (this.isAvailable()) {
            this.currentUser = user;
            return true;
        } else {
            return false;
        }
    }
    releaseUser() {
        this.currentUser = null;
    }
}

class Person {
    constructor(name, soft_pref) {
        this.name = name;
        this.soft_pref = soft_pref;
        this.sleeping = false;
    }

    sleep(p) {
        let sentence;
        if (this.sleeping) {
            sentence = "zzzzzzzz....";
        } else if (!(p instanceof Pillow)) {
            sentence = "This is Not a Pillow!!";
        } else if (!p.isAvailable()) {
            sentence = `This pillow is already taken by ${p.currentUser.name}!`;
        } else if (p.softness > this.soft_pref) {
            sentence = "too soft";
        } else if (p.softness < this.soft_pref) {
            sentence = "not soft enough";
        } else {
            sentence = "just right";
            this.sleeping = true;
            p.assignUser(this);
        }
        this.#talk(sentence);
    }
    wakeup(p) {
        if (this.sleeping) {
            this.#talk("I'm up");
            this.sleeping = false;
            if (p instanceof Pillow && p.currentUser === this) {
                p.releaseUser();
            }
        }
    }
    #talk(sentence) {
        log.innerHTML += `${this.name} says: "${sentence}"<br>`;
    }
}

const P = new Pillow(3);

let david = new Person("David", 3);
let john = new Person("John", 3);

david.sleep(P);
john.sleep(P); 

david.wakeup(P);
john.sleep(P);

