document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector(".typing-text");
    const fullText = textElement.innerHTML;

    let index = 0;
    let tempHTML = ""; // Stocke le texte progressivement

    function type() {
        if (index < fullText.length) {
            const currentChar = fullText[index];

            // Ajoute le texte un caractère à un
            tempHTML += currentChar;
            textElement.innerHTML = tempHTML;
            index++;

            let speed = 45;
            setTimeout(type, speed);
        } else {
            textElement.classList.remove("typing-text"); // Supprime la barre à la fin
        }
    }

    type();
});