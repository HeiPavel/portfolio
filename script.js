const links = document.querySelectorAll('.desktop a');
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
const paragNameTyping = document.getElementById('type-name');
const boxs = document.getElementsByClassName('box');
const iconBar = document.getElementById('light-icon');
const lightModeButton = document.getElementById('light-mode-button');
const menuButton = document.getElementById('menu-button');
const sectionHeaderBoxs = document.getElementsByClassName('content-container');
const projectContainer = document.getElementsByClassName('project-content-box');
let check = false;
let checkLinkClick = false;

// Nav bar underline effect
const setOffset = (underlineElement, elementToGetOffset) => {
    underlineElement.style.left = `${elementToGetOffset.offsetLeft}px`;
    underlineElement.style.width = `${elementToGetOffset.offsetWidth}px`;
};

const setUnderline = (event) => {
    const underline = document.querySelector('header').querySelector('.desktop').querySelector('.underline');
    if (event.type === 'click') {
        checkLinkClick = true;
        setOffset(underline, event.target);
        Promise.all(underline.getAnimations().map(animation => animation.finished)).then(() => checkLinkClick = false);
    }
    if ((event.type === 'scroll' || event.type === 'resize') && !checkLinkClick && window.innerWidth >= 960) {
        for (const container of sectionHeaderBoxs) {
            const top = container.getBoundingClientRect().top;
            if (window.innerHeight - top >= Math.round(window.innerHeight * 0.5)) {
                const id = container.getAttribute('id');
                if (id === 'about' || 'projects' || 'contact') {
                    check = true;
                }
                    const linkOnScroll = document.querySelector('header').querySelector('.desktop').querySelector(`#desktop-${id}`);
                    setOffset(underline, linkOnScroll);
            }
        }
        const bodyTop = document.body.getBoundingClientRect().top * -1;
        if (bodyTop <= (sectionHeaderBoxs[0].getBoundingClientRect().top) && check) {
            const linkOnScrollHome = document.querySelector('header').querySelector('.desktop').querySelector(`#desktop-home`);
            setOffset(underline, linkOnScrollHome);
            check= false;
        }
    }
};

//Mobile nav menu
const rotateLine = () => {
    const topLine = document.getElementById('top-line');
    const middleLine = document.getElementById('middle-line');
    const bottomLine = document.getElementById('bottom-line');
    const mobileMenu = document.getElementById('mobile-menu');
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

const mathRadius = (element) => {
    let containerRadiusString = window.getComputedStyle(element).width;
    containerRadiusString = containerRadiusString.substring(0, containerRadiusString.indexOf('px'));
    return Number(containerRadiusString)/2;
};

const placeIconOnCircle = () => {
    let alpha = 0;
    Array.prototype.forEach.call(boxs, box => {
        const iconContainer = document.getElementById('icon-container');
        const iconContainerRadius = mathRadius(iconContainer);
        const radius = iconContainerRadius/1.5;
        const boxRadius = mathRadius(box);
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
const startAnimation = (startElement, elementToChangeClass, animationClassName, multiplyer) => {
    const topPosition = startElement.getBoundingClientRect().top;
    const className = elementToChangeClass.className;
    const baseClaseName = className.includes(animationClassName) ? className.slice(0, className.indexOf(' ')) : className;
    if (window.innerHeight - topPosition >= Math.round(window.innerHeight * multiplyer)) {
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
        startAnimation(box, box.querySelector('.content-container-header'), 'center-content-container-header', 0.5);
        startAnimation(box, box.querySelector('.underline'), 'center-underline', 0.5);
    }
    startAnimation(document.querySelector('#about'), document.querySelector('#about').querySelector('.text'), 'text-animation', 0.5);
    for (const project of projectContainer) {
        startAnimation(project, project.querySelector('.project-container'), 'project-animation', 0.5);
    }
};

//Remove animation from project container for mobile
const removeAnimation = () => {
    for (const bar of projectContainer) {
        if (window.innerWidth >= 960) {
            bar.querySelector('.bar-one').className = 'project-rotate bar-one animate-one';
            bar.querySelector('.bar-two').className = 'project-rotate bar-two animate-two';
        } else {
            bar.querySelector('.bar-one').className = 'project-rotate bar-one';
            bar.querySelector('.bar-two').className = 'project-rotate bar-two';
        }
    }
};

lightModeButton.addEventListener('click', changeLightMode);

for (const link of links) {
    link.addEventListener('click', setUnderline);
};

window.addEventListener('scroll', setUnderline);
window.addEventListener('resize', setUnderline);

menuButton.addEventListener('click', rotateLine);

for (const link of mobileMenuLinks) {
    link.addEventListener('click', rotateLine);
}

window.addEventListener('load', typeName);

'resize load'.split(' ').forEach(element => {
    window.addEventListener(element, placeIconOnCircle);
    window.addEventListener(element, sectionPlaceHeadersUnderline);
    window.addEventListener(element, removeAnimation);
});  

window.addEventListener('scroll', checkSectionPosition);