document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.scramble');
    const words = Array.from(elements).map(el => el.getAttribute('data-words').split(','));
    const maxWordCount = Math.max(...words.map(w => w.length));
    let currentWordIndex = 0;
    const scrambleInterval = 100; // interval between scrambling steps in milliseconds
    const pauseDuration = 2000; // duration to pause on the correct word in milliseconds

    function scrambleAllTexts() {
        elements.forEach((element, idx) => {
            const originalText = element.textContent;
            const newWord = words[idx][currentWordIndex % words[idx].length];
            const maxLength = Math.max(originalText.length, newWord.length);
            let iterations = 0;

            const interval = setInterval(() => {
                element.textContent = newWord.split('').map((char, index) => {
                    if (index < iterations) {
                        return newWord[index];
                    }
                    return String.fromCharCode(33 + Math.random() * 94);
                }).join('');

                if (iterations >= maxLength) {
                    clearInterval(interval);
                    element.textContent = newWord;
                }

                iterations += 1;
            }, scrambleInterval);
        });

        // Pause on the correct word
        setTimeout(() => {
            currentWordIndex++;
            scrambleAllTexts();
        }, scrambleInterval * 15 + pauseDuration); // Adjust timing for sync effect
    }

    scrambleAllTexts();
});
