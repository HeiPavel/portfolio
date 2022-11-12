const underline = document.getElementById('underline');
const links = document.querySelectorAll('header a');
const paragNameTyping = document.getElementById('type-name');
const boxs = document.getElementsByClassName('box');
const iconBar = document.getElementById('light-icon');
const lightModeButton = document.getElementById('light-mode-button');

// Nav bar underline effect
for (const link of links) {
    link.addEventListener('click', event => {
        underline.style.left = `${event.target.offsetLeft}px`;
        underline.style.width = `${event.target.offsetWidth}px`;
    });
};

//Type name effect
const string = 'Pavel Trofymovych';
const typeName = async (string) => {
    for (let i = 0; i < string.length; i++) {
        let addLetter;
        const prom = new Promise(resolve => {
            setTimeout(() => {
                resolve(string[i]);
            }, 200);
        });
        addLetter = await prom;
        paragNameTyping.textContent += `${addLetter}`;
    }
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
            paragNameTyping.textContent = '';
        }, 3000);
    });
    typeName(string);
};

//Skill circle effect
let alpha = 0;

const round = (number, numberOfDigits) => {
    return Number(number.toFixed(numberOfDigits));
}

Array.prototype.forEach.call(boxs, box => {
    const radius = 100;
    let boxRadiusString = window.getComputedStyle(box).width;
    boxRadiusString = boxRadiusString.substring(0, boxRadiusString.indexOf('px'));
    const boxRadius = Number(boxRadiusString)/2;
    const radians = round((alpha * 0.0174533), 4);
    let x = round((150 - boxRadius), 4);
    let y = round((150 - boxRadius), 4);
    let dx = round((radius * Math.cos(radians)), 4);
    let dy = round(((radius * Math.sin(radians) * -1)), 4);
    const left = Math.round(x + dx);
    const top = Math.round(y + dy);
    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
    alpha += 60;
});

//Light mode button
const changeLightMode = () => {
    if (iconBar.getAttribute('class') === null) {
        iconBar.setAttribute('class', 'light-mode');
        document.documentElement.setAttribute('class', 'root-light-mode');
    } else {
        iconBar.removeAttribute('class');
        document.documentElement.removeAttribute('class');
    }
};

lightModeButton.addEventListener('click', changeLightMode);

window.addEventListener('load', typeName(string));