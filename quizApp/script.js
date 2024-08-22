document.addEventListener('DOMContentLoaded', ()=>{
    const btnDarkM = document.getElementById("btnDarkM");


    btnDarkM.addEventListener('click', ()=>{
        document.body.classList.toggle("dark-mode");
    })
})