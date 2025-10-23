document.addEventListener('DOMContentLoaded', () => {
    // Referencje do elementów DOM
    const robotTextElement = document.getElementById('robot-text');
    const finalButton = document.getElementById('final-button');
    const robotElement = document.querySelector('.robot');
    const emojiContainer = document.getElementById('emoji-container');
    const blackboardContent = document.getElementById('blackboard-content');

    // Funkcje pomocnicze
    const delay = ms => new Promise(res => setTimeout(res, ms));

    function typeWriter(text) {
        return new Promise(resolve => {
            let i = 0;
            robotTextElement.textContent = '';
            function type() {
                if (i < text.length) {
                    robotTextElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 40); // Szybkość pisania
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    function launchEmojis(count) {
        const emojis = ['❤️', '😍', '💖', '🥰', '😘'];
        for (let i = 0; i < count; i++) {
            const emoji = document.createElement('span');
            emoji.classList.add('flying-emoji');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = `${Math.random() * 80 + 10}%`;
            emoji.style.animationDelay = `${Math.random() * 0.8}s`;
            emojiContainer.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2000);
        }
    }
    
    // Funkcja do pokazywania treści na tablicy
    async function showOnBlackboard(type) {
        blackboardContent.classList.remove('visible');
        await delay(300); // Czas na zniknięcie starej treści

        switch (type) {
            case 'games':
                blackboardContent.innerHTML = '<span class="icon-games-symbol">🎮</span><br>Mini Gry';
                break;
            case 'puzzle':
                blackboardContent.innerHTML = '2 + 2 = 5';
                break;
            case 'button':
                blackboardContent.innerHTML = '<span class="icon-button-symbol">START</span>';
                break;
            case 'clear':
            default:
                blackboardContent.innerHTML = '';
                break;
        }

        if (type !== 'clear') {
            blackboardContent.classList.add('visible');
        }
    }

    // Główna sekwencja zdarzeń
    async function playTeacherSequence() {
        await typeWriter("Więc tak, jesteś gotowa?");
        await delay(1500);

        await typeWriter("Chcę Ci opowiedzieć, na czym polega Twoje słodkie zadanie...");
        
        // Sekwencja "słodkości"
        robotElement.classList.add('robot-love');
        launchEmojis(10);
        await delay(2500);
        robotElement.classList.remove('robot-love');
        
        await typeWriter("Okej... Twoje zadanie to przejście kilku mini gier.");
        await showOnBlackboard('games');
        await delay(3000);

        await typeWriter("Musisz je wszystkie ukończyć, aby przejść dalej.");
        await delay(1500);

        await typeWriter("Nie są ciężkie, wiesz? Dasz radę!");
        await showOnBlackboard('puzzle');
        await delay(3000);

        await typeWriter("W każdej mini grze będziesz miała opis, co robić.");
        await delay(1500);
        await typeWriter("Więc nie martw się.");
        await delay(1500);

        await typeWriter("Teraz możemy na prawdę zacząć!");
        await showOnBlackboard('clear');
        await delay(1500);

        await typeWriter("Kliknij przycisk 'Start', aby kontynuować."); // ZMIANA TUTAJ
        await showOnBlackboard('button');
        
        // Pokaż finałowy przycisk
        finalButton.classList.remove('hidden');
    }

    // Start
    playTeacherSequence();
});