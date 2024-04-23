const inputs = document.querySelectorAll(".number");
inputs.forEach(x => x.addEventListener("change", update));
update();

document.getElementById("num-cards-drawn").addEventListener("change", update);

/**
 * 
 * @returns {number}
 */
function getTotal() {
    let total = 0;
    const nums = document.querySelectorAll(".number");

    nums.forEach(num => total += num.valueAsNumber);
    return total;
}

/**
 * 
 * @returns {number}
 */
function getNumCardsDrawn() {
    let input = document.getElementById("num-cards-drawn");
    return input.valueAsNumber;
}

function update() {
    const total = getTotal();

    const statBoxes = document.querySelectorAll(".stats");

    statBoxes.forEach(stat => {
        // stat.children[0].textContent = `${Math.round(stat.children[stat.children.length-1].valueAsNumber/total * 10000) / 100} %`
        const statNum = stat.children[stat.children.length-1].valueAsNumber
        stat.children[0].textContent = `${round(calculatePercentage(statNum), 3)} %`
    });
}

/**
 * 
 * @param {number} num 
 * @param {number} decimals 
 */
function round(num, decimals) {
    return Math.round(num * 10**(2+decimals)) / 10 ** decimals
}

/**
 * 
 * @param {number} num 
 * @returns {number}
 */
function calculatePercentage(num) {
    const cardsDrawn = getNumCardsDrawn();
    const total = getTotal();

    let mult = 1
    for (let i = 0; i < cardsDrawn; i++) {
        mult *= ((total-num-i)/(total-i))
    }
    return 1 - mult;
}
