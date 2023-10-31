function escapeHTML(input) {
    const replace = [['&', '&amp;'], ['<', '&lt;'], ['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']]
    return replace.reduce((escaped, replacement) => escaped.replaceAll(...replacement), input)
}

function formatObject(input, index) {
    if (input === null) return '<span class="null">null</span>'

    const withDetail = index !== undefined;

    let output = `
    ${withDetail ? `<details class="object-in-array" open>
    <summary> ${index}: <span class="braces"></span> </summary>
    <ul>
    ` : '<ul>'}
    `
    output += Object.keys(input).map((key, __index) => {
        const isArray = Array.isArray(input[key]);
        const isObject = typeof input[key] === 'object' && input[key] !== null;

        if (isArray || isObject) {
            return `
            <li>
                <details open>
                    <summary>
                        <span class="key">${escapeHTML(key)}:</span>
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

function formatArray(input, _index) {
    let output = ''

    output += `<ol start="0">`
    for (let index = 0; index < 100; index++) {
        const value = input[index];
        if (value === undefined) break;
        // output += input.map((value, index) => {
        if (!Array.isArray(value)) {
            // return `<li>${format(value, index)}</li>`
            output += `<li>${format(value, index)}</li>`
            continue;
        }

        // return `
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
        // }).join('')
    }
    output += `</ol>`
    output += `<span class="brackets">]</span>`
    return output
}

function formatString(input, index) {

    const indexHTML = index !== undefined ? `<span> ${index}: </span>` : '';

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

export function format(input, index) {
    const type = Array.isArray(input) ? 'array' : typeof input

    switch (type) {
        case 'object':
            return formatObject(input, index)
        case 'array':
            return formatArray(input, index)
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
