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
    const backBtn = document.getElementById("backBtn");

    let index = Math.floor(Math.random() * 7);
    let shuffledQuestions = [];
    let currentIndexQuestion = 0;

    darkmBtn.addEventListener('click', ()=>{
        document.body.classList.toggle("dark-mode");
    })

    Object.entries(subjects).forEach(([key]) => {
        const subBtn = document.createElement("button");
        subBtn.textContent = key;
        containerB.append(subBtn)
    })

    const subjectBtns = document.querySelectorAll(".containerB button");

    backBtn.addEventListener("click", () => {
        containerA.style.display = 'none';
        backBtn.style.display = 'none';
        displayChildren(containerB); // Show all subject buttons
        containerB.style.display = 'flex';
    });
    subjectBtns.forEach(btn => {
        btn.addEventListener("click", () =>{
            // btn.style.display = 'none'
            // hiddenChildren(containerB)
            // containerA.style.display = 'grid'
            // backBtn.style.display = 'block'

            containerB.style.display = 'none';
            containerA.style.display = 'grid';
            backBtn.style.display = 'block';
            
            const choosedBtn = btn.textContent;
            const selectedSubject = subjects[choosedBtn];
            // console.log(selectedSubject.questions[1]);
            // const randomindex = Math.floor(Math.random() * 10)
            // console.log(randomindex);
            // console.log(selectedSubject.questions[randomindex]);
            
            // shuffle(selectedSubject.questions)
            // console.log(selectedSubject.questions);
            
            if (selectedSubject) {
                shuffledQuestions = shuffle(selectedSubject.questions);
                console.log(shuffledQuestions);
                
                // const randomindex = Math.floor(Math.random() * shuffledQuestions.length)
                // console.log(randomindex);
                

                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
            // console.log(selectedSubject.questions);


            
        })
    })

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    function displayOptions(index,  subject) {
        const questionObj = subject[index];

        // questionNbr.textContent = questionObj.number;
        questionNbr.textContent = currentIndexQuestion+1;
        question.textContent = questionObj.question;

        options.innerHTML = ``;
        questionObj.options.forEach(quest => {
            const optionElement = document.createElement("button");
            optionElement.textContent = quest;
            options.append(optionElement)
        })
        
    }

    nextBtn.addEventListener("click", () =>{
        // if (containerB.style.display === 'flex') {
            
            display(1)
        // } else {
            if (shuffledQuestions.length > 0) {
                currentIndexQuestion = (currentIndexQuestion + 1) % shuffledQuestions.length;
                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
        // }
    })
    prevBtn.addEventListener("click", () =>{
        // if (containerB.style.display === 'flex') {
            display(-1)
        // } else {
            if (shuffledQuestions.length > 0) {
                currentIndexQuestion = (currentIndexQuestion -1 + shuffledQuestions.length) % shuffledQuestions.length;
                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
        // }
    })
    function hiddenChildren(container) {
        Array.from(container.children).forEach(child => {
            child.style.display = 'none'
        })
    }
    function displayChildren(container) {
        Array.from(container.children).forEach(child => {
            child.style.display = 'block'
        })
    }
    if (subjectBtns.length > 0) {
        subjectBtns[index].classList.add('display');
    }
    function display(direction) {
        subjectBtns[index].classList.remove('display')
        index = (subjectBtns.length + index + direction) % subjectBtns.length;
        subjectBtns[index].classList.add('display')
    }


    
})