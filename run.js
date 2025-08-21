alert('Oi, em 1 minuto vou apagar essa tela!');
console.log('Oi de novo');
var a = document.querySelector('.main-sidebar');
if(a) {
    a.style.outline = '1000px solid #ff00005e';
    a.style.outlineOffset = '-1000px';
}

setTimeout(() => {
    window.confirm("Tchau! Vou apagar tudo!");
    document.body.innerHTML = '';    
}, 1000 * 60);

