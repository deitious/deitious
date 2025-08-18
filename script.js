const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const close = document.getElementById('close');

document.querySelectorAll('.thumbnail').forEach(img => {
    img.onclick = () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    };
});

close.onclick = () => {
    modal.style.display = 'none';
};
