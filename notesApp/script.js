document.addEventListener('DOMContentLoaded', ()=>{

const btn = document.getElementById("btnDarkM");
const correctBtn = document.getElementById("correctBtn");
const elements = document.querySelectorAll('#title, #content')
const title = document.getElementById("title");
const content = document.getElementById("content");
const btnAddN = document.getElementById("btnAddN");
const navContent = document.querySelector(".navContent");
const navItems = document.querySelectorAll(".navContent li");
console.log(navItems); // Check this to ensure it selects the correct elements


    
    // let q = true
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

elements.forEach(element => {
    element.addEventListener("focus",function () {
        correctBtn.style.display = 'inline-block';

    })
})
correctBtn.addEventListener('click', ()=>{
    const noteTitle = title.value;
    const noteContent = content.value;
    addNoteToNav(noteTitle)
    addNoteToLocal(noteTitle,noteContent)
    correctBtn.style.display = 'none'

})

function addNoteToNav(title) {
    const note = document.createElement('li');
    note.textContent = title;
    navContent.append(note)
}
function addNoteToLocal(title,content) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({title, content})
    localStorage.setItem('notes', JSON.stringify(notes))
}

function loadNoteToNav() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToNav(note.title)
    })
}
window.addEventListener('load',loadNoteToNav)

// navItems.forEach((item, index) => {
//     item.addEventListener("click", () => {

//         console.log('note already clicked');
//         let notes = JSON.parse(localStorage.getItem('notes')) || [];

//         let note = notes[index];
//         if (note) {   
//             title.value = note.title
//             content.textContent = note.content
//         }
        
//     });
// });
navContent.addEventListener('click', (event) => {
    const clickedItem = event.target;
    
    if (clickedItem.tagName === 'LI') {
        console.log('note clicked');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const index = Array.from(navContent.children).indexOf(clickedItem);
        let note = notes[index];
        if (note) {
            title.value = note.title;
            content.value = note.content; // Update the textarea value
        }
    }
});
navContent.addEventListener("mousemove", ()=>{

    const navItems = navContent.querySelectorAll('li');
    navItems.forEach(item =>{
        if (!item.querySelector('.fa-trash-can')) {
            
            const deteleBtn = document.createElement('i');
            deteleBtn.classList.add('fa-regular', 'fa-trash-can');
            item.appendChild(deteleBtn)

            item.addEventListener('mouseover', ()=>{
                deteleBtn.style.display = 'inline-block'
            })
            item.addEventListener('mouseout', ()=>{
                deteleBtn.style.display = 'none'
            })
            
            deteleBtn.addEventListener("click", ()=>{
                item.remove();
                let notes = JSON.parse(localStorage.getItem('notes')) || [];
                const index = Array.from(navContent.children).indexOf(item);
                notes.splice(index,1);
                localStorage.setItem('notes',JSON.stringify(notes));

            })
        }

    })
})
btnAddN.addEventListener("click", ()=>{
    title.value =``;
    content.value =``;
})
})