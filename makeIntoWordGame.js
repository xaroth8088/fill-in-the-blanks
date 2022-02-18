function fillInTheBlanksMain() {
    if (window.fillInTheBlanksState === "complete") {
        // Everything's been shown and we don't have any sort of built-in "go back to normal" functionality, so bail
        return;
    }

    if (window.fillInTheBlanksState === "getinputs") {
        // The user has (probably) filled in the inputs, and wants to see their results now.
        window.fillInTheBlanksState = "complete";

        document.querySelectorAll('.fill-in-the-blanks-text').forEach(tag => tag.style.filter = "none");
        return;
    }

    // This is the first time we've been run, so do all the setup on the page
    window.fillInTheBlanksState = "getinputs";

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
                    newMarkup += `<input placeholder="${tagName}" class="fill-in-the-blanks-input" /> `;
                } else {
                    newMarkup += `<span class="fill-in-the-blanks-text">${token.raw} </span>`;
                }
            });
        });

        pTag.innerHTML = newMarkup;
    });
}

fillInTheBlanksMain();
