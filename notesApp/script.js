const btn = document.getElementById("btnDarkM");

let q = true
btn.onclick = function() {
    // if (q) {
        // document.body.classList.add('black')
        // document.body.classList.remove('white')
    //     q = false
    // } else {
    //     document.body.classList.remove('black')
    //     document.body.classList.add('white')
    //     q = true
    // }
    // q = q ? (document.body.classList.add('black'), document.body.classList.remove('white'), false): (document.body.classList.add('white'), document.body.classList.remove('black'), true);
    document.body.classList.toggle('dark-mode')
    
}