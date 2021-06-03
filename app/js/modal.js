const startModalRef = document.querySelector(".main__start__modal-window");
const startModalBtn = document.querySelector(".start_game");
const aboutModalRef = document.querySelector(".main__start__modal-about");
const openAboutModalBtn = document.querySelector(".burger");
const closeAboutModalBtn = document.querySelector(".modal-about__wrapper-btn");



const openStartModal = function() {
    window.addEventListener('keydown', onPressEscape);
    startModalRef.classList.add('show_modal');
}

const onCloseModal = function() {
    window.removeEventListener('keydown', onPressEscape);
    startModalRef.classList.remove('show_modal');
};

const onBackdropClick = function(event) {
    if(event.target === event.currentTarget) {
        onCloseModal();
    }
};

function onPressEscape(event){
    if(event.code === 'Escape'){
        onCloseModal();
    }
};

const openAboutModal = ()=>{
    window.addEventListener('keydown', onAboutPressEscape)
    aboutModalRef.classList.add('show_modal');
}

const onAboutCloseModal = function() {
    window.removeEventListener('keydown', onAboutPressEscape);
    aboutModalRef.classList.remove('show_modal');
};

const onAboutBackdropClick = function(event) {
    if(event.target === event.currentTarget) {
        onAboutCloseModal();
    }
};
const onAboutCloseClick = function(event) {
    if(event.target === event.currentTarget) {
        onAboutCloseModal();
    }
};
function onAboutPressEscape(event){
    if(event.code === 'Escape'){
        onAboutCloseModal();
    }
};

startModalBtn.addEventListener("click", openStartModal);
startModalRef.addEventListener('click', onBackdropClick);
openAboutModalBtn.addEventListener("click", openAboutModal);
aboutModalRef.addEventListener('click', onAboutBackdropClick);
closeAboutModalBtn.addEventListener('click', onAboutCloseClick);