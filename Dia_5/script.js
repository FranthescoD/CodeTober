// ==========================================
// DIA 5: Lógica dos Toggles Interativos
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Toggle Estilo Apple
    const appleToggle = document.getElementById('apple-toggle');
    const appleStatus = document.getElementById('apple-status');
    if (appleToggle && appleStatus) {
        appleToggle.addEventListener('change', () => {
            appleStatus.textContent = appleToggle.checked ? 'Ligado' : 'Desligado';
            appleStatus.style.color = appleToggle.checked ? '#34c759' : 'var(--color-dark)';
        });
    }


    // 2. Toggle de Card (Dark / Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeCardBox = document.getElementById('theme-card-box');
    const themeCardLabel = document.getElementById('theme-card-label');
    if (themeToggle && themeCardBox) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                themeCardBox.classList.add('dark-mode-card');
                themeCardLabel.textContent = 'Modo Escuro Ativo';
            } else {
                themeCardBox.classList.remove('dark-mode-card');
                themeCardLabel.textContent = 'Modo Claro Ativo';
            }
        });
    }


    // 3. Toggle de Filtro de Lista Animado
    const filterToggle = document.getElementById('filter-toggle');
    const demoFilteredList = document.getElementById('demo-filtered-list');
    if (filterToggle && demoFilteredList) {
        filterToggle.addEventListener('change', () => {
            const items = demoFilteredList.querySelectorAll('li');
            const showOnlyFav = filterToggle.checked;

            items.forEach(item => {
                const isFav = item.getAttribute('data-fav') === 'true';
                if (showOnlyFav && !isFav) {
                    item.classList.add('hidden-item');
                } else {
                    item.classList.remove('hidden-item');
                }
            });
        });
    }


    // 4. Toggle de Alta Segurança (Confirmação)
    const secureToggle = document.getElementById('secure-toggle');
    const secureStatus = document.getElementById('secure-status');
    if (secureToggle && secureStatus) {
        secureToggle.addEventListener('change', () => {
            if (secureToggle.checked) {
                secureStatus.textContent = '⚡ Sistema Armado / Ativo!';
                secureStatus.style.color = '#ef4444';
            } else {
                secureStatus.textContent = 'Sistema Travado';
                secureStatus.style.color = 'var(--color-dark)';
            }
        });
    }


    // 5. Potenciômetro Radial (Toggle em Arco / Níveis)
    const radialToggle = document.getElementById('radial-toggle');
    const radialVal = document.getElementById('radial-val');
    const radialKnob = radialToggle ? radialToggle.querySelector('.radial-knob') : null;
    
    if (radialToggle && radialVal && radialKnob) {
        const levels = [
            { name: 'Eco (0°)', angle: 0 },
            { name: 'Normal (90°)', angle: 90 },
            { name: 'Turbo (180°)', angle: 180 },
            { name: 'Max (270°)', angle: 270 }
        ];
        let currentLevel = 0;

        radialToggle.addEventListener('click', () => {
            currentLevel = (currentLevel + 1) % levels.length;
            const lvl = levels[currentLevel];
            radialKnob.style.transform = `rotate(${lvl.angle}deg)`;
            radialVal.textContent = lvl.name;
        });
    }


    // 6. Neon Cyber Toggle
    const cyberToggleInput = document.getElementById('cyber-toggle-input');
    const cyberLabelText = document.querySelector('.cyber-label-text');
    if (cyberToggleInput && cyberLabelText) {
        cyberToggleInput.addEventListener('change', () => {
            cyberLabelText.textContent = cyberToggleInput.checked ? 'ONLINE' : 'OFF';
        });
    }

});
