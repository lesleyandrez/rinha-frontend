function escapeHTML(input) {
    const replace = [['&', '&amp;'], ['<', '&lt;'], ['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']]
    return replace.reduce((escaped, replacement) => escaped.replaceAll(...replacement), input)
}

function formatObject(input) {
    if (input === null) return '<span class="null">null</span>'

    let output = `
    <details open>
        <summary> &nbsp; </summary>
        <ul>
    `
    output += Object.keys(input).map((key) => {
        const isArray = Array.isArray(input[key]);
        const isObject = typeof input[key] === 'object' && input[key] !== null;

        if (isArray || isObject) {
            return `
            <li>
                <details open>
                    <summary>
                        <span class="key">${escapeHTML(key)}:</span>
                        <span class="brackets">[</span>
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
    </details>
    `
    return output
}

function formatArray(input) {
    let output = ''
    output += `<ol start="0">`
    output += input.map((value, index, list) => {
        return `<li>${format(value, index)}</li>`
    }).join('')
    output += `</ol>`
    output += `<span class="brackets">]</span>`
    return output
}

function formatString(input) {
    return `
        <span class="string">
            <span class="string_quotes">\"</span>${escapeHTML(input)}<span class="string_quotes">\"</span>
        </span>`;
}

function formatBoolean(input) {
    return `<span class="${input}">${input}</span>`;
}

function formatNumber(input) {
    return `<span class="number">${input}</span>`;
}

export function format(input) {
    const type = Array.isArray(input) ? 'array' : typeof input

    switch (type) {
        case 'object':
            return formatObject(input)
        case 'array':
            return formatArray(input)
        case 'string':
            return formatString(input)
        case 'boolean':
            return formatBoolean(input)
        case 'number':
            return formatNumber(input)
        default:
            return input
    }
}
