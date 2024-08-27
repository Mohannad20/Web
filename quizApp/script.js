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
    const scoreCorrect = document.getElementById("scoreCorrect");
    const scoreIncorrect = document.getElementById("scoreIncorrect");
    const repeatBtn = document.getElementById("repeatBtn");
    const containerC = document.querySelector(".containerC");

    let index = Math.floor(Math.random() * 7);
    let shuffledQuestions = [];
    let currentIndexQuestion = 0;
    let counterCorrectAnswers = 0;
    let counterIncorrectAnswers = 0;

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
            backBtn.style.display = 'block'
            containerA.style.display = 'grid'
            containerB.style.display = 'none';

            const choosedBtn = btn.textContent;
            const selectedSubject = subjects[choosedBtn];
            
            if (selectedSubject) {
                shuffledQuestions = shuffle(selectedSubject.questions);
                currentIndexQuestion = 0;
                console.log(shuffledQuestions);
                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
        })
    })

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }
    
    function displayOptions(index, subject) {
        const questionObj = subject[index];
        
        questionNbr.textContent = currentIndexQuestion+1;
        question.textContent = questionObj.question;
        
        options.innerHTML = ``;
        // console.log(questionObj.options);
        const optionListShuffled = shuffle([...questionObj.options]);
        console.log(optionListShuffled);
        
        
        optionListShuffled.forEach(option => {
            const optionElement = document.createElement("button");
            optionElement.textContent = option;
            options.append(optionElement)
        })

        const answers = document.querySelectorAll(".options button")
        answers.forEach(answer => {
            answer.addEventListener("click", ()=>{
                const choosedAnswer = answer.textContent;
                console.log(choosedAnswer);
                console.log(questionObj.correctAnswer);
                console.log(currentIndexQuestion);

                if (choosedAnswer === questionObj.correctAnswer) {
                    answer.style.background = 'green'
                    counterCorrectAnswers += 1
                }else{
                    answer.style.background = 'red'
                    counterIncorrectAnswers += 1
                }

                scoreCorrect.textContent = counterCorrectAnswers;
                scoreIncorrect.textContent = counterIncorrectAnswers;

                if (currentIndexQuestion >= shuffledQuestions.length -1) {
                    // finalScore();
                    setTimeout(() => {
                        containerDisplayer(containerA,containerC)
                    }, 300)
                }
                
                setTimeout(()=> {
                    if (currentIndexQuestion < shuffledQuestions.length -1) {
                        currentIndexQuestion +=1;
                        displayOptions(currentIndexQuestion, subject);
                    } else {
                        containerDisplayer(containerA,containerC)
                    }
                },200)
        })      
        })
    }

    function containerDisplayer(a,b) {
        a.style.display = 'none'
        b.style.display = 'flex'
    }

    repeatBtn.addEventListener("click", () =>{
        setTimeout(() => {
            containerDisplayer(containerC,containerB)
        }, 500)
        // containerC.style.display = 'none';
        // containerB.style.display = 'flex';
        currentIndexQuestion = 0;
        counterCorrectAnswers = 0;
        counterIncorrectAnswers = 0;

    })

    backBtn.addEventListener("click", () => {
        containerA.style.display = 'none';
        backBtn.style.display = 'none';
        containerB.style.display = 'flex';
        currentIndexQuestion = 0;
        console.log(currentIndexQuestion);
    });
    
    nextBtn.addEventListener("click", () =>{
            display(1)
            if (shuffledQuestions.length > 0) {
                currentIndexQuestion = (currentIndexQuestion + 1) % shuffledQuestions.length;
                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
    })
    prevBtn.addEventListener("click", () =>{
            display(-1)
            if (shuffledQuestions.length > 0) {
                currentIndexQuestion = (currentIndexQuestion -1 + shuffledQuestions.length) % shuffledQuestions.length;
                displayOptions(currentIndexQuestion, shuffledQuestions)
            }
    })
    // function hiddenChildren(container) {
    //     Array.from(container.children).forEach(child => {
    //         child.style.display = 'none'
    //     })
    // }
    // function displayChildren(container) {
    //     Array.from(container.children).forEach(child => {
    //         child.style.display = 'block'
    //     })
    // }
    if (subjectBtns.length > 0) {
        subjectBtns[index].classList.add('display');
    }
    function display(direction) {
        subjectBtns[index].classList.remove('display')
        index = (subjectBtns.length + index + direction) % subjectBtns.length;
        subjectBtns[index].classList.add('display')
    }    
})