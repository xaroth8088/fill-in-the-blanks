let CLUSTER_PREVENTION_THRESHOLD = 5;
let REPLACEMENT_CHANCE = 0.2;

let tagLookup = {
    'JJ': 'Adjective',
    'NN': 'Noun',
    'NNP': 'Proper Noun',
    'NNS': 'Noun (plural)',
    'RB': 'Adverb',
    'VB': 'Verb',
    'VBD': 'Verb (past tense)',
    'VBG': 'Verb ending in &quot;ing&quot;'
};

let pTags = document.querySelectorAll('p:not([class])');
pTags.forEach(async (pTag) => {
    let newMarkup = "";
    let clusterPrevention = Number.POSITIVE_INFINITY;

    const data = compendium.analyse(pTag.innerText, null, ['sentiment', 'negation', 'type']);

    data.forEach(sentence => {
        sentence.tokens.forEach(token => {
            clusterPrevention++;

            const tagName = tagLookup[token.pos];
            if (tagName !== undefined && clusterPrevention > CLUSTER_PREVENTION_THRESHOLD && Math.random() < REPLACEMENT_CHANCE) {
                clusterPrevention = 0;
                newMarkup += `<input placeholder="${tagName}" style="text-align: center; border: none; border-bottom: 1px solid black;"/> `;
            } else {
                newMarkup += `${token.raw} `;
            }
        });
    });

    pTag.innerHTML = newMarkup;
});
