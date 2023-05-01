const dialog = document.getElementById('dialog')

let clickSound=new Audio("media/click.mp3")
clickSound.volume=0.9

// Close dialog when Esc key is pressed
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
        dialog.close();
        clickSound.play()
        
        
    }
});

// Close dialog when clicked outside
dialog.addEventListener('click', event => {
    if (event.target !== dialog) {
        
        dialog.close();
        clickSound.play()
        
    }
});
function openDialog() {
    dialog.showModal();
    }
