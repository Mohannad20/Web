document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById("btnDarkM");
    const correctBtn = document.getElementById("correctBtn");
    const elements = document.querySelectorAll('#title, #content')
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const btnAddN = document.getElementById("btnAddN");
    const navContent = document.querySelector(".navContent");

    let currentNoteIndex = null;

    btn.onclick = function() {
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
        correctBtn.style.display = 'none'
        if (noteTitle === '' && noteContent === '') {
            return;
        }else{
            if (currentNoteIndex !== null) {
                updateToLocal(currentNoteIndex, noteTitle, noteContent)
            } else {
                addNoteToNav(noteTitle)
                addNoteToLocal(noteTitle,noteContent)
            }
            currentNoteIndex = null;
        }
    })

    function updateToLocal(index, title, content) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes[index] = {title, content};
        localStorage.setItem('notes', JSON.stringify(notes));

        const navItems = navContent.querySelectorAll('li');
        if (navItems[index]) {
            navItems[index].textContent = title
        }
    }

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

    navContent.addEventListener('click', (event) => {
        const clickedItem = event.target;
        
        if (clickedItem.tagName === 'LI') {
            console.log('note clicked');
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            const index = Array.from(navContent.children).indexOf(clickedItem);
            let note = notes[index];
            if (note) {
                title.value = note.title;
                content.value = note.content;
                currentNoteIndex = index;
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
        currentNoteIndex = null;
    })
})