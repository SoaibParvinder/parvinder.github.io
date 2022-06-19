const Selector = ele => document.querySelector(ele),
    SelectorAll = eleAll => document.querySelectorAll(eleAll),
    newEle = newele => document.createElement(newele),
    hrefIndex = href => window.location.href.indexOf(href),
    lsGet = item => localStorage.getItem(item),
    lsSet = (key, value) => localStorage.setItem(key, value),
    lsRem = item => localStorage.removeItem(item),
    sI = (fun, time) => setInterval(fun, time),
    sT = (fun, time) => setTimeout(fun, time),
    cI = intervaliable => clearInterval(intervaliable),
    cT = intervaliable => clearTimeout(intervaliable),
    docLis = (eve, fun) => document.addEventListener(eve, fun);

var lastY;
var dirY;
var lastChild;

const parentImg = Selector('.parent_img');
const childImg = SelectorAll('.parent_img .main_img');

let determineY = async e => {
    let currentY = e.changedTouches[0].clientY;
    if (currentY == lastY) return;
    if (currentY > lastY) dirY = 'up';
    if (currentY < lastY) dirY = 'down';
    lastY = currentY;
    e.preventDefault();
}

let makeScroll = async e => {
    if (lastChild && lastChild.style.display == 'block') return;
    lastChild = e.target;

    if (dirY == 'down') {

        e.target.style.animation = 'imgRoll 10s infinite ease-in-out, fadeOut 1s forwards ease-in-out';

        if (e.target.nextElementSibling) {
            sT(() => SelectorAll(`.main_img:not(.${e.target.nextElementSibling.classList[1]})`).forEach(c => c.style.display = 'none'), 1000);
            SelectorAll(`.imgSlider:not(.${e.target.nextElementSibling.classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll(`.textSlider:not(.${e.target.nextElementSibling.classList[1]})`).forEach(i => i.classList.remove('active'));
            e.target.nextElementSibling.style.display = 'block';
            e.target.nextElementSibling.style.animation = 'imgRoll 10s infinite ease-in-out, fadeIn 1s forwards ease-in-out';
            Selector(`.imgSlider.${e.target.nextElementSibling.classList[1]}`).classList.add('active');
            Selector(`.textSlider.${e.target.nextElementSibling.classList[1]}`).classList.add('active');
        } else {
            sT(() => SelectorAll(`.main_img:not(.${childImg[0].classList[1]})`).forEach(c => c.style.display = 'none'), 1000);
            SelectorAll(`.imgSlider:not(.${childImg[0].classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll(`.textSlider:not(.${childImg[0].classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll('.imgSlider')[0].classList.add('active');
            SelectorAll('.textSlider')[0].classList.add('active');
            childImg[0].style.display = 'block';
            childImg[0].style.animation = 'imgRoll 10s infinite ease-in-out, fadeIn 1s forwards ease-in-out';
        }
    };

    if (dirY == 'up') {

        e.target.style.animation = 'imgRoll 10s infinite ease-in-out, fadeOut 1s forwards ease-in-out';

        if (e.target.previousElementSibling) {
            sT(() => SelectorAll(`.main_img:not(.${e.target.previousElementSibling.classList[1]})`).forEach(c => c.style.display = 'none'), 1000);
            SelectorAll(`.imgSlider:not(.${e.target.previousElementSibling.classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll(`.textSlider:not(.${e.target.previousElementSibling.classList[1]})`).forEach(i => i.classList.remove('active'));
            e.target.previousElementSibling.style.display = 'block';
            e.target.previousElementSibling.style.animation = 'imgRoll 10s infinite ease-in-out, fadeIn 1s forwards ease-in-out';
            Selector(`.imgSlider.${e.target.previousElementSibling.classList[1]}`).classList.add('active');
            Selector(`.textSlider.${e.target.previousElementSibling.classList[1]}`).classList.add('active');
        } else {
            sT(() => SelectorAll(`.main_img:not(.${childImg[childImg.length - 1].classList[1]})`).forEach(c => c.style.display = 'none'), 1000);
            SelectorAll(`.imgSlider:not(.${childImg[childImg.length - 1].classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll(`.textSlider:not(.${childImg[childImg.length - 1].classList[1]})`).forEach(i => i.classList.remove('active'));
            SelectorAll('.imgSlider')[childImg.length - 1].classList.add('active');
            SelectorAll('.textSlider')[childImg.length - 1].classList.add('active');
            childImg[childImg.length - 1].style.display = 'block'
            childImg[childImg.length - 1].style.animation = 'imgRoll 10s infinite ease-in-out, fadeIn 1s forwards ease-in-out';
        }
    };
}

parentImg.addEventListener('touchmove', determineY);

parentImg.addEventListener('touchend', makeScroll);