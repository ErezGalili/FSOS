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
    constructor(edge){
        this.edge = edge;
        this.sqr = edge**2;
    }
    res(){
        console.log('The area is '+ this.sqr+ ' sqr')
    }
}

const s = new Squre(15)
s.res()

