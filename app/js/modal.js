const startModalRef = document.querySelector(".main__start__modal-window");
const startModalBtn = document.querySelector(".start_game");
const audioRef = document.querySelector(".bg-music");


const openStartModal = ()=>{
    window.addEventListener('keydown', onPressEscape)
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

startModalBtn.addEventListener("click", openStartModal);
startModalRef.addEventListener('click', onBackdropClick);