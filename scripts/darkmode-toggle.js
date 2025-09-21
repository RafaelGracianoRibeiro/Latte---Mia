// Script para alternância de modo escuro/claro
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
    toggle.checked = false; // Garante que o slider começa desativado
    document.body.classList.remove('dark-mode'); // Garante modo claro

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});
