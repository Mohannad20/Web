const countdowns = document.querySelectorAll(".countdown");
countdowns.forEach(countdown => countdownCreating(countdown));

function countdownCreating(countdown) {
    const target = new Date(countdown.dataset.targetDate);
    const now = new Date();
    const monthDays = new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
    console.log(monthDays);
    const parts = {
        days : {text : ['days', 'day'], dots : monthDays},
        hours : {text : ['hours', 'hour'], dots : 24},
        minutes : {text : ['minutes', 'minute'], dots : 60},
        seconds : {text : ['seconds', 'second'], dots : 60}
    }
    Object.entries(parts).forEach(([key, value] )=> {
        const partEl = document.createElement('div');
        partEl.classList.add("part", key);
        partEl.style.setProperty("--dots", value.dots);


        const remainingTime = document.createElement('div');
        remainingTime.classList.add('remainingTime');
        remainingTime.innerHTML = `
            <span class="text"></span>
            <span class="number"></span>
        `;
        partEl.append(remainingTime);

        for (let i = 0; i < value.dots; i++) {
            const dotcontainer = document.createElement('div');
            dotcontainer.classList.add("dotcontainer");
            dotcontainer.style.setProperty("--idxDot", i);

            const dot = document.createElement('div');
            dot.classList.add('dot');
            dotcontainer.append(dot);
            partEl.append(dotcontainer);
        }
        countdown.append(partEl)
        parts[key].element = partEl;
        
    })
    setInterval(() => {
        getRemainingTime(target,parts, )
    }, 1000);
    // console.log(target.getTime());
    // console.log(now.getTime());
}

function getRemainingTime(target,parts){
    const now = new Date();
    const timeDiff = target.getTime() - now.getTime();
    console.log(timeDiff);
    let seconds = Math.floor(timeDiff / 1000)%60;
    let minutes = Math.floor(timeDiff / (1000 * 60))%60;
    let hours = Math.floor(timeDiff / (1000 * 60 * 60))%60;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    console.log(seconds);    
    console.log(minutes);
    console.log(hours);
    console.log(days);

    Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
        const remainingEl = parts[key].element.querySelector(".number");
        const textEl = parts[key].element.querySelector(".text");

        remainingEl.innerText = value;
        textEl.innerText = parts[key].text[Number(value === 1 || value === 0)];
        
        const dots = parts[key].element.querySelectorAll(".dot")
        dots.forEach((dot, idx) =>{
            dot.dataset.active = idx < value;
            dot.dataset.lastactive = idx === value;
        })

    })
}
