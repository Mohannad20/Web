import { subjects } from "./questions.js";
document.addEventListener('DOMContentLoaded', ()=>{
    const darkmBtn = document.getElementById("btnDarkM");
    const questionNbr = document.getElementById("qNbr");
    const question = document.getElementById("question");
    const containerA = document.querySelector(".containerA");
    const containerB = document.querySelector(".containerB");
    const options = document.querySelector(".options");
    const nextBtn = document.getElementById("rightAngle");
    const prevBtn = document.getElementById("leftAngle");
    let index = 0;

    darkmBtn.addEventListener('click', ()=>{
        document.body.classList.toggle("dark-mode");
    })

    Object.entries(subjects).forEach(([key]) => {
        const subBtn = document.createElement("button");
        subBtn.textContent = key;
        containerB.append(subBtn)
    })

    const subjectBtns = document.querySelectorAll(".containerB button");

    subjectBtns.forEach(btn => {
        btn.addEventListener("click", () =>{
            btn.style.display = 'none'
            containerA.style.display = 'grid'
            
            const choosedBtn = btn.textContent;
            const selectedSubject = subjects[choosedBtn];
            console.log(selectedSubject.questions[1]);
            // selectedSubject.questions.forEach(quest => {
                // console.log(quest);
                Object.entries(selectedSubject.questions[0]).forEach(([key, value]) => {
                    console.log(key);
                    console.log(value);

                    
                    // console.log('question :',value.number);
                    // console.log('question :',value.question);
                    // console.log('question options :',value.options);
                    // console.log('answer:',value.correctAnswer);
                    // questionNbr.textContent = value.number;
                    // question.textContent = value.question;
                    // value.options.forEach(option => {
                    //     const optionElement = document.createElement("button");
                    //     optionElement.textContent = option;
                    //     options.append(optionElement)
                    // })
                })
                // for(s in (selectedSubject.questions)){
                //     console.log(selectedSubject.questions[s]);
                    
                // }
                
                
            // })
        })
    })
    nextBtn.addEventListener("click", () =>{
        display(1)
    })
    prevBtn.addEventListener("click", () =>{
        display(-1)
    })
    if (subjectBtns.length > 0) {
        subjectBtns[index].classList.add('display');
    }
    function display(direction) {
        subjectBtns[index].classList.remove('display')
        index = (subjectBtns.length + index + direction) % subjectBtns.length;
        subjectBtns[index].classList.add('display')
    }


    
})