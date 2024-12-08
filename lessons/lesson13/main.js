function generate7BoomAfterDelayAsync(min, max) {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            const number = Math.ceil(Math.random() * (max - min))+min
            if (number % 7 == 0) resolve(number + " is BOOOM");
            else reject(new Error("you Didn't get a BOOM"));
        }, 1000)
    })
    return p
}

const promise = generate7BoomAfterDelayAsync(7, 100)
    .then((str) => console.log(str))
    .catch((err) => console.log(err.message))

const IsPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    } 
    return num > 1
}

function generatePrimeNumberAfterDelayAsync (min, max) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.ceil(Math.random() * (max - min)) + min
            for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
                if (num % i === 0) return reject(new Error(num + " is not Prime"));
            }
            resolve(num + " is Prime")
        }, 1000)
    });
}

const scndPromise = generatePrimeNumberAfterDelayAsync (7, 100)
    .then((str) => console.log(str))
    .catch((err) => console.log(err.message))

function generateCuteAnimalAfterDelayAsync(){
    const animals = ["Kitty", "Puppy", "Bunny", "Parrot", "Scorp", "Spider", "Cockroch"]
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        const num = Math.floor(Math.random()*7)
        if(num<=3) resolve(animals[num]+ " is very cute");
        else reject(new Error(animals[num]+ " is not cute at all"));
        },1000)
    })
}

async function f3(){
    try{
        const sol = await generateCuteAnimalAfterDelayAsync()
        console.log(sol)
    }
    catch(err){
        console.log(err.message)
    }
}z

f3()