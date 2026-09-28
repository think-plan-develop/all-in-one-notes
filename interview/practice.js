function processPayment(amount, operation) {
    return operation(amount);
}

function addTax(amount) {
    return amount + amount * 0.18;
}

function applyDiscount(amount) {
    return amount - amount * 0.10;
}

function addPlatformFee(amount) {
    return amount + 50;
}

console.log(processPayment(1000, addTax));          // 1180
console.log(processPayment(1000, applyDiscount));   // 900
console.log(processPayment(1000, addPlatformFee));  // 1050

// hoc


function firstNonRepeating(str) {
    for (let char of str) {
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }

    return null;
}

console.log(firstNonRepeating("aabbcddee"));