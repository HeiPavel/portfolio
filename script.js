const underline = document.getElementById('underline');
const links = document.querySelectorAll('header a');
const nav = document.querySelector('nav');
const paragNameTyping = document.getElementById('type-name');

for (const link of links) {
    link.addEventListener('click', event => {
        underline.style.left = `${event.target.offsetLeft}px`;
        underline.style.width = `${event.target.offsetWidth}px`;
    });
};

/*nav.addEventListener('mouseleave', () => {
    underline.style.left = '0';
    underline.style.width = `100%`;
});*/
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

window.addEventListener('load', typeName(string));