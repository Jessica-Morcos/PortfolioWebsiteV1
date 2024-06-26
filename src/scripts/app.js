document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.scramble');
    const words = Array.from(elements).map(el => el.getAttribute('data-words').split(','));
    const maxWordCount = Math.max(...words.map(w => w.length));
    let currentWordIndex = 0;
    const scrambleInterval = 100; 
    const pauseDuration = 2000; 

    function scrambleAllTexts() {
        elements.forEach((element, idx) => {
            const originalText = element.textContent;
            const newWord = words[idx][currentWordIndex % words[idx].length];
            const maxLength = Math.max(originalText.length, newWord.length);
            let iterations = 0;

           
            element.style.width = `${maxLength + 2}ch`;

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

        setTimeout(() => {
            currentWordIndex++;
            scrambleAllTexts();
        }, scrambleInterval * 15 + pauseDuration);
    }

    scrambleAllTexts();

    const sections = document.querySelectorAll('section, .skills-section, .container, .section, .sidebar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    
    const cardElements = document.querySelectorAll('.polaroid-card');

    cardElements.forEach(cardElement => {
        const imgElement = cardElement.querySelector('img#changeImg');
        const originalSrc = imgElement.src;
        const hoverSrc = 'public/icons/icons8-github-50.png';

        cardElement.addEventListener('mouseover', function() {
            imgElement.classList.add('fade-out-up');
            setTimeout(function() {
                imgElement.src = hoverSrc;
                imgElement.classList.remove('fade-out-up');
                imgElement.classList.add('fade-in-up');
            }, 300); // Duration of the fade-out transition
        });

        cardElement.addEventListener('mouseout', function() {
            imgElement.classList.remove('fade-in-up');
            imgElement.classList.add('fade-out-up');
            setTimeout(function() {
                imgElement.src = originalSrc;
                imgElement.classList.remove('fade-out-up');
                imgElement.classList.add('fade-in-up');
            }, 300); 
        });
    });
    const liElements = document.querySelectorAll('.sidebar.right-sidebar ul li');

    liElements.forEach(liElement => {
        const imgElement = liElement.querySelector('img');
        const originalSrc = imgElement.src;
        let hoverSrc;

 
        if (originalSrc.includes('github')) {
            hoverSrc = 'public/icons/icons8-github-filled-48.png';
        } else if (originalSrc.includes('linkedin')) {
            hoverSrc = 'public/icons/icons8-linkedin-filled-48.png';
        }

        liElement.addEventListener('mouseover', function() {
            imgElement.classList.add('fade-out-up');
            setTimeout(function() {
                imgElement.src = hoverSrc;
                imgElement.classList.remove('fade-out-up');
                imgElement.classList.add('fade-in-up');
            }, 300); // Duration of the fade-out transition
        });

        liElement.addEventListener('mouseout', function() {
            imgElement.classList.remove('fade-in-up');
            imgElement.classList.add('fade-out-up');
            setTimeout(function() {
                imgElement.src = originalSrc;
                imgElement.classList.remove('fade-out-up');
                imgElement.classList.add('fade-in-up');
            }, 300); // Duration of the fade-out transition
        });
    });

});
