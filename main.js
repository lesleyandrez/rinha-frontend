import { format } from './format';
import { allTypes } from './model';
import './style.scss'

const w = new Worker('worker.js');

w.onmessage = (algo) => {
    const $wellcome = document.querySelector('.wellcome');
    $wellcome.hidden  = true;

    const $viewer = document.querySelector('.viewer');

    $viewer.insertAdjacentHTML('beforeend', format(algo.data));
}

const $inputFile = document.getElementById('input-file');

$inputFile.onchange = async (e) => {
    const stringContent = await readFile(e.target);

    w.postMessage({ stringContent });
};

function readFile(fileInput) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(fileInput.files[0], 'latin1');
    });
}
