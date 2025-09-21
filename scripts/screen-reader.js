// Script para leitura de texto selecionado
let screenReaderMode = false;
const screenReaderBtn = document.getElementById('screen-reader-btn');
let naturalVoice = null;

function getNaturalBrazilianVoice() {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang === 'pt-BR' && /Luciana|Camila|Vitoria|female|mulher/i.test(v.name));
    if (preferred) return preferred;
    return voices.find(v => v.lang === 'pt-BR') || null;
}

function speakText(text) {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    if (!naturalVoice) {
        naturalVoice = getNaturalBrazilianVoice();
    }
    if (naturalVoice) {
        utter.voice = naturalVoice;
    }
    utter.lang = 'pt-BR';
    utter.rate = 0.95;
    utter.pitch = 1.1;
    utter.volume = 1;
    window.speechSynthesis.speak(utter);
}

function handleMouseOver(e) {
    if (!screenReaderMode) return;
    const target = e.target;
    // Evita ler o botão de leitura
    if (target.id === 'screen-reader-btn') return;
    // Só lê se for um elemento textual
    const allowedTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'A', 'LABEL', 'BUTTON'];
    if (!allowedTags.includes(target.tagName)) return;
    let text = target.innerText || target.alt || target.ariaLabel || '';
    text = text.trim();
    if (text.length > 0) {
        speakText(text);
    }
}

if (typeof speechSynthesis !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = () => {
        naturalVoice = getNaturalBrazilianVoice();
    };
}

screenReaderBtn.addEventListener('click', function() {
    screenReaderMode = !screenReaderMode;
    screenReaderBtn.style.background = screenReaderMode ? '#4caf50' : '#222';
    screenReaderBtn.setAttribute('aria-pressed', screenReaderMode);
    if (screenReaderMode) {
        document.body.addEventListener('mouseover', handleMouseOver, true);
    } else {
        document.body.removeEventListener('mouseover', handleMouseOver, true);
        window.speechSynthesis.cancel();
    }
});
