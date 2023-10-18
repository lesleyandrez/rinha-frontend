import './style.scss'

const w = new Worker('worker.js');

w.onmessage = (algo) => {
    console.log({ json: algo.data });
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
