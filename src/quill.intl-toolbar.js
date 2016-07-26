const SELECT = `
{foo, select,
    foo {Foo}
    bar {Bar}
    other {Baz}
}`.trim();

const PLURAL = `
{foo, plural,
    =0 {no foos}
    one {# foo}
    other {# foos}
}`.trim();

const SELECTORDINAL = `
{foo, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
}`.trim();


export default function(doc) {
    const typeMap = {
        number: '{foo, number}',
        date: '{foo, date, medium}',
        time: '{foo, time, medium}',
        select: SELECT,
        plural: PLURAL,
        selectordinal: SELECTORDINAL
    };

    const addButton = (container, type) => {
        const button = doc.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-type', type);
        button.innerHTML = type;
        button.classList.add(`ql-${type}`);
        button.value = type;
        container.appendChild(button);
    };

    const addControls = (container) => {
        [
            'number',
            'date',
            'time',
            'select',
            'plural',
            'selectordinal'
        ].forEach(type => {
            addButton(container, type);
        });
    };

    const bindEvents = (container, quill) => {
        const buttons = Array.from(container.querySelectorAll('button'));
        buttons.forEach(button => {
            const
                type = button.getAttribute('data-type'),
                text = typeMap[type];

            button.addEventListener('click', () => {
                quill.focus();
                const range = quill.getSelection();
                quill.updateContents({
                    ops: [
                        { retain: range.start },
                        { delete: range.end - range.start },
                        { insert: text }
                    ]
                });
            });
        });
    };

    return function(quill, options) {
        const container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        addControls(container);
        bindEvents(container, quill);
    };
}
