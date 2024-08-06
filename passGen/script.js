result = document.getElementById('res')
generatebtn = document.getElementById('generatebtn')
function passGen(length,includLowercase,includUppercase,isNumbers,iSymbols) {
    const chrLowercase = 'abcdefghijklmnopqrstuvwxyz'; 
    const chrUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*().,+-/';
    
    let chrs = ''
    chrs += includLowercase ? chrLowercase: '' ;
    chrs += includUppercase ? chrUppercase: '' ;
    chrs += isNumbers ? numbers: '' ;
    chrs += iSymbols ? symbols: '' ;
    
    if (length < 10) {
        return result.value = `please provide a length that must be at least 10 characters`
    }
    let password = ''
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * chrs.length)
        password += chrs[random]
    }
    return password
    
}
generatebtn.onclick = function () {
    passinput = document.getElementById('pass').value
    if (isNaN(passinput)) {
        return result.value = `please provide number not a text`

    }
    const length = passinput
    const includLowercase = true;
    const includUppercase = true;
    const isNumbers = true;
    const iSymbols = true;
    const password = passGen(length,includLowercase,includUppercase,isNumbers,iSymbols)
    result.value = password
    console.log(password)
}

function copy() {
    x=result.value
    navigator.clipboard.writeText(x)
    console.log(x)
    alert('copied')
}