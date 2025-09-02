const hamburger = document.querySelector('.hamburger');
const menuContainer = document.querySelector('.navbar-links');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

function toggleMenu() {
		menuContainer.classList.toggle('open');
		const isOpen = menuContainer.classList.contains('open');
		hamburger.textContent = menuContainer.classList.contains('open') ? '✖' : '☰';
		
		main.style.display = isOpen ? 'none' : '';
		footer.style.display = isOpen ? 'none' : '';
}

hamburger.addEventListener('click', toggleMenu);

window.addEventListener('resize', () => {
	if (window.innerWidth > 768) {
		menuContainer.classList.remove('open');
		hamburger.textContent = '☰';
		main.style.display = '';
		footer.style.display = '';
	}
});