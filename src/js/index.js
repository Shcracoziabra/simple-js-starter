import '../styles/style.scss';

const button = document.querySelector('button');
const body = document.body;

function toggleTheme(){
	body.classList.toggle('dark-theme');
};

button.addEventListener('click', toggleTheme);
