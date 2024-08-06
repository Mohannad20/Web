function rollDice() {
    const dice = document.getElementById('inpDice').value;
    const img = document.getElementById('img');
    const result = document.getElementById('result');
    values = []
    images = []
    for (let i = 0; i < dice; i++) {
        value = Math.ceil(Math.random() * 6)
        // value = Math.floor(Math.random() * 6) + 1
        values.push(value)
        result.textContent = values.join('   -   ')
        images.push(`<img src="img/${value}.png" height=100 alt="Dice ${value}">`)
        img.innerHTML = images.join('    ')
    }
}