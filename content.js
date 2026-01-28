function matchCase(template, word) {
    let result = "";

    for (let i = 0; i < word.length; i++) {
        const templateChar = template[i] || template[template.length - 1];
        const wordChar = word[i];

        if (templateChar === templateChar.toUpperCase()) {
            result += wordChar.toUpperCase();
        } else {
            result += wordChar.toLowerCase();
        }
    }

    return result;
}

function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(/microsoft/gi, match => {
            return matchCase(match, "microslop");
        });
    } else {
        node.childNodes.forEach(replaceText);
    }
}

replaceText(document.body);

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => replaceText(node));
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
