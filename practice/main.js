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

console.log(isValidParentheses("({[]})"));
