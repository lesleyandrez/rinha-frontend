import { format } from './format';
import { allTypes } from './model';
import './style.scss'

const w = new Worker('worker.js');

const $wellcome = document.querySelector('.wellcome');
const $loading = document.querySelector('.loading');

w.onmessage = (algo) => {
    if (algo.data instanceof Error) {
        document.getElementById('msg-invalid-json').hidden = false;
        $loading.hidden = true;
        $wellcome.hidden = false;
        return;
    }

    document.getElementById('msg-invalid-json').hidden = true;

    const $viewer = document.querySelector('.viewer');
    let isArray = Array.isArray(algo.data);

    $loading.hidden = true;
    $viewer.insertAdjacentHTML('beforeend', format(isArray ? { "": algo.data } : algo.data));
}

const $inputFile = document.getElementById('input-file');

$inputFile.onchange = async (e) => {
    const { name, content } = await readFile(e.target);
    const $nameOfJSON = document.querySelector('.viewer h2');
    $nameOfJSON.innerText = name;
    $nameOfJSON.dataset.isLarge = content.length > 1620000;

    $wellcome.hidden = true;
    $loading.hidden = false;

    w.postMessage({ stringContent: content });
};

function readFile(fileInput) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: fileInput.files[0].name, content: reader.result });
        reader.readAsText(fileInput.files[0], 'latin1');
    });
}
