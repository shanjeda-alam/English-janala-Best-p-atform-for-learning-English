const createElement = (arr) => {
    const HTMLElement = arr.map(
        el => `<span class="btn">${el}</span>`
    );

    console.log(HTMLElement.join(""));
};

const synonyms = ["hlw", "hi"];

createElement(synonyms);