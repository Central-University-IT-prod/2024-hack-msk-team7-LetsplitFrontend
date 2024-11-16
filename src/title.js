export function setTitlePage(page) {
    setTitle(getText(page));
}

function setTitle(text){
    const element = document.getElementById("title");
    element.innerText = text;
}

function getText(page){
    return "LetSplit " + "- " + page;
}