const tamanhoPagina = 1000;
let isLarge = null;

document.addEventListener('click', (event) => {
    const $target = event.target;
    if ($target.tagName === 'BUTTON' && $target.id) {
        const ref = {
            id: $target.id,
            lastIndex: $target.dataset.lastIndex,
            input: window.store.um,
        };

        console.log(ref);
        const $lastItemRendered = $target.parentElement.previousElementSibling;

        $target.parentElement.insertAdjacentHTML('beforebegin', format(window.store.um, undefined, +ref.lastIndex + 1))
        $lastItemRendered.nextElementSibling.querySelector('summary')?.focus();
        $target.dataset.lastIndex = +$target.dataset.lastIndex + tamanhoPagina;

        console.log(+$target.dataset.lastIndex, window.store.um.length);
        if (+$target.dataset.lastIndex + 1 >= window.store.um.length) {
            $target.remove();
        }
    }
});

function escapeHTML(input) {
    const replace = [['&', '&amp;'], ['<', '&lt;'], ['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']]
    return replace.reduce((escaped, replacement) => escaped.replaceAll(...replacement), input)
}

function formatObject(input, index) {
    if (input === null) return '<span class="null">null</span>'

    const withDetail = index !== undefined;

    if (isLarge === null) {
        const $nameOfJSON = document.querySelector('.viewer h2');
        isLarge = $nameOfJSON.dataset.isLarge === 'true';
    }

    let output = `
    ${withDetail ? `<details class="object-in-array" ${isLarge ? '' : 'open'}>
    <summary> ${index}: <span class="braces"></span> </summary>
    <ul>
    ` : '<ul>'}
    `
    output += Object.keys(input).map((key, __index) => {
        const isArray = Array.isArray(input[key]);
        const isObject = typeof input[key] === 'object' && input[key] !== null;

        const isRootArray = key === '';

        if (isArray || isObject) {
            return `
            <li>
                <details open>
                    <summary>
                        ${isRootArray ? '' : `<span class="key">${escapeHTML(key)}:</span>`}
                        ${(isObject && !isArray) ? '<span class="braces"></span>' : ''}
                        ${isArray ? '<span class="brackets">[</span>' : ''}
                    </summary>
                    ${format(input[key])}
                </details>
            </li>
            `;
        }

        return `
        <li>
            <span class="key">${escapeHTML(key)}:</span>
            ${format(input[key])}
        </li>
        `
    }).join('')

    output += `
        </ul>
    ${withDetail ? '</details>' : ''}
    `
    return output
}

function formatArray(input, _index, startWith = 0) {
    let output = ''

    if (startWith === 0) {
        output += `<ol start="0">`
    }

    const tamanhoTotal = input.length;
    let temMaisItens = false;
    if (tamanhoPagina < tamanhoTotal) {
        temMaisItens = true;
    }

    for (let index = startWith; index < (tamanhoPagina + startWith); index++) {
        const value = input[index];
        if (value === undefined) break;
        if (!Array.isArray(value)) {
            output += `<li>${format(value, index)}</li>`
            if (temMaisItens && index === tamanhoPagina - 1) {
                window.store = {
                    um: input,
                };
                output += `<li><button id="${'um'}" data-last-index="${index}"> Carregar mais...</button></li>`;
            }
            continue;
        }

        const indexHTML = index !== undefined ? `<span class="index"> ${index}: </span>` : '';
        output += `
        <li>
            <details open>
                <summary>
                    ${indexHTML}
                    <span class="key"></span>
                    <span class="brackets">[</span>
                </summary>
                ${format(value, index)}
            </details>
        </li>
        `;
    }
    if (startWith === 0) {
        output += `</ol>`
        output += `<span class="brackets">]</span>`
    }
    return output
}

function formatString(input, index) {
    const indexHTML = index !== undefined ? `<span class="index"> ${index}: </span>` : '';

    return `
        ${indexHTML}
        <span class="string">
            <span class="string_quotes">\"</span>${escapeHTML(input)}<span class="string_quotes">\"</span>
        </span>`;
}

function formatBoolean(input, index) {
    const indexHTML = index !== undefined ? `<span class="index"> ${index}: </span>` : '';
    return `
        ${indexHTML}
        <span class="${input}">${input}</span>
    `;
}

function formatNumber(input, index) {
    const indexHTML = index !== undefined ? `<span class="index"> ${index}: </span>` : '';
    return `
        ${indexHTML}
        <span class="number">${input}</span>
    `;
}

export function format(input, index, startWith) {
    const type = Array.isArray(input) ? 'array' : typeof input

    switch (type) {
        case 'object':
            return formatObject(input, index)
        case 'array':
            return formatArray(input, index, startWith)
        case 'string':
            return formatString(input, index)
        case 'boolean':
            return formatBoolean(input, index)
        case 'number':
            return formatNumber(input, index)
        default:
            return input
    }
}
