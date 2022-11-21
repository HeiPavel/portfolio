const links = document.querySelectorAll('.desktop a');
const paragNameTyping = document.getElementById('type-name');
const boxs = document.getElementsByClassName('box');
const iconBar = document.getElementById('light-icon');
const lightModeButton = document.getElementById('light-mode-button');
const menuButton = document.getElementById('menu-button');
const sectionHeaderBoxs = document.getElementsByClassName('content-container');

// Nav bar underline effect
for (const link of links) {
    link.addEventListener('click', event => {
        const underline = event.target.parentElement.querySelector('.underline');
        underline.style.left = `${event.target.offsetLeft}px`;
        underline.style.width = `${event.target.offsetWidth}px`;
    });
};

//Mobile nav menu
const rotateLine = () => {
    const topLine = document.getElementById('top');
    const middleLine = document.getElementById('middle');
    const bottomLine = document.getElementById('bottom');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    if (topLine.className.includes('rotate-top') && bottomLine.className.includes('rotate-bottom') && middleLine.className.includes('hide-middle')) {
        topLine.className = 'menu-button-line';
        middleLine.className = 'menu-button-line';
        bottomLine.className = 'menu-button-line';
        mobileMenu.removeAttribute('class');
        for (const link of mobileMenuLinks) {
            link.removeAttribute('class');
        }
    } else {
        topLine.className = 'menu-button-line rotate-top';
        middleLine.className = 'menu-button-line hide-middle';
        bottomLine.className = 'menu-button-line rotate-bottom';
        mobileMenu.setAttribute('class', 'show-mobile-menu');
        for (const link of mobileMenuLinks) {
            link.setAttribute('class', 'mobile-menu-links');
        }
    }
};

//Type name effect
const typeName = async () => {
    const string = 'Pavel Trofymovych';
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
    typeName();
};

//Skill circle effect

const round = (number, numberOfDigits) => {
    return Number(number.toFixed(numberOfDigits));
};

const placeIconOnCircle = () => {
    let alpha = 0;
    Array.prototype.forEach.call(boxs, box => {
        const iconContainer = document.getElementById('icon-container');
        let iconContainerRadiusString = window.getComputedStyle(iconContainer).width;
        iconContainerRadiusString = iconContainerRadiusString.substring(0, iconContainerRadiusString.indexOf('px'));
        const iconContainerRadius = Number(iconContainerRadiusString)/2;
        const radius = iconContainerRadius/1.5;
        let boxRadiusString = window.getComputedStyle(box).width;
        boxRadiusString = boxRadiusString.substring(0, boxRadiusString.indexOf('px'));
        const boxRadius = Number(boxRadiusString)/2;
        const radians = round((alpha * 0.0174533), 4);
        let x = round((iconContainerRadius - boxRadius), 4);
        let y = round((iconContainerRadius - boxRadius), 4);
        let dx = round((radius * Math.cos(radians)), 4);
        let dy = round(((radius * Math.sin(radians) * -1)), 4);
        const left = Math.round(x + dx);
        const top = Math.round(y + dy);
        box.style.left = `${left}px`;
        box.style.top = `${top}px`;
        alpha += 60;
    });
};

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

//Underline placement and width for section headers
const sectionPlaceHeadersUnderline = () => {
    for (const box of sectionHeaderBoxs) {
        const step = (box.querySelector('.content-container-header').offsetLeft + box.querySelector('.content-container-header').offsetWidth + 5);
        box.querySelector('.underline').style = `--length:${-1 * step}px;`;
        box.querySelector('.content-container-header').style = `--length:${step}px;`;
        box.querySelector('.underline').style.left = `${box.querySelector('.content-container-header').offsetLeft}px`;
        box.querySelector('.underline').style.width = `${box.querySelector('.content-container-header').offsetWidth}px`;
    }
};

// Checking position to start animation at section elements
const startAnimation = (startElement, elementToChangeClass, animationClassName) => {
    const topPosition = startElement.getBoundingClientRect().top;
    const className = elementToChangeClass.className;
    const baseClaseName = className.includes(animationClassName) ? className.slice(0, className.indexOf(' ')) : className;
    if (window.innerHeight - topPosition >= Math.round(window.innerHeight * 0.5)) {
        if (!className.includes(animationClassName)) {
            elementToChangeClass.className = `${baseClaseName} ${animationClassName}`;
        }
    } else {
        if (className.includes(animationClassName)) {
            elementToChangeClass.className = `${baseClaseName}`;
        }
    }
};

const checkSectionPosition = () => {
    for (const box of sectionHeaderBoxs) {
        startAnimation(box, box.querySelector('.content-container-header'), 'center-content-container-header');
        startAnimation(box, box.querySelector('.underline'), 'center-underline');
    }
    startAnimation(document.querySelector('#about'), document.querySelector('#about').querySelector('.text'), 'text-animation');
};

lightModeButton.addEventListener('click', changeLightMode);

menuButton.addEventListener('click', rotateLine);

window.addEventListener('load', typeName);

'resize load'.split(' ').forEach(element => {
    window.addEventListener(element, placeIconOnCircle);
    window.addEventListener(element, sectionPlaceHeadersUnderline);
});  

window.addEventListener('scroll', checkSectionPosition);