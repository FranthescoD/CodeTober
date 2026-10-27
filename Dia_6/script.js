// ==========================================
// DIA 6: Lógica dos Sliders Interativos
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Slider 1: Neon Liquid (Atualização Dinâmica do Fill)
    const slider1 = document.getElementById('slider-1');
    const slider1Val = document.getElementById('slider-1-val');
    
    if (slider1 && slider1Val) {
        const updateNeonSlider = () => {
            const val = slider1.value;
            slider1Val.textContent = val + '%';
            slider1.style.background = `linear-gradient(to right, #06b6d4 ${val}%, #cbd5e1 ${val}%)`;
        };

        slider1.addEventListener('input', updateNeonSlider);
        updateNeonSlider(); // Inicialização
    }


    // 2. Slider 2: Seletor Cyberpunk Tático (Passos Discretos)
    const slider2 = document.getElementById('slider-2');
    const slider2Val = document.getElementById('slider-2-val');
    const cyberSteps = document.querySelectorAll('.cyber-step');
    
    if (slider2 && slider2Val) {
        const modes = [
            { name: 'ECO (Nível 1)', label: 'ECO' },
            { name: 'NORMAL (Nível 2)', label: 'NORM' },
            { name: 'SPORT (Nível 3)', label: 'SPORT' },
            { name: 'TURBO (Nível 4)', label: 'TURBO' }
        ];

        const updateCyberSlider = () => {
            const idx = Number(slider2.value) - 1;
            slider2Val.textContent = modes[idx].name;

            cyberSteps.forEach((step, i) => {
                if (i === idx) {
                    step.classList.add('active-cyber');
                } else {
                    step.classList.remove('active-cyber');
                }
            });
        };

        slider2.addEventListener('input', updateCyberSlider);
        updateCyberSlider(); // Inicialização
    }


    // 3. Slider 3: Termostato Vertical
    const slider3 = document.getElementById('slider-3');
    const slider3Val = document.getElementById('slider-3-val');

    if (slider3 && slider3Val) {
        const updateVerticalSlider = () => {
            slider3Val.textContent = slider3.value + '°C';
        };

        slider3.addEventListener('input', updateVerticalSlider);
        updateVerticalSlider(); // Inicialização
    }


    // 4. Slider 4: Pad Bidirecional 2D (Eixos X, Y)
    const xyPad = document.getElementById('xy-pad');
    const xyHandle = document.getElementById('xy-handle');
    const xyLineX = document.getElementById('xy-line-x');
    const xyLineY = document.getElementById('xy-line-y');
    const xyValX = document.getElementById('xy-val-x');
    const xyValY = document.getElementById('xy-val-y');

    if (xyPad && xyHandle && xyValX && xyValY) {
        let isDragging = false;

        const updatePadPosition = (clientX, clientY) => {
            const rect = xyPad.getBoundingClientRect();
            
            // Calcula posições relativas clamping entre 0 e rect.width / height
            let x = clientX - rect.left;
            let y = clientY - rect.top;

            x = Math.max(0, Math.min(x, rect.width));
            y = Math.max(0, Math.min(y, rect.height));

            // Converte para porcentagens (0% a 100%)
            const pctX = Math.round((x / rect.width) * 100);
            // Eixo Y invertido para que 0% seja na parte inferior e 100% no topo
            const pctY = Math.round((1 - (y / rect.height)) * 100);

            // Atualiza o knob visual e as linhas de guia
            xyHandle.style.left = `${(x / rect.width) * 100}%`;
            xyHandle.style.top = `${(y / rect.height) * 100}%`;

            if (xyLineX) xyLineX.style.top = `${(y / rect.height) * 100}%`;
            if (xyLineY) xyLineY.style.left = `${(x / rect.width) * 100}%`;

            // Atualiza os valores na interface
            xyValX.textContent = pctX + '%';
            xyValY.textContent = pctY + '%';
        };

        // Eventos de Mouse
        xyPad.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePadPosition(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updatePadPosition(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Eventos de Touch (Smartphones/Tablets)
        xyPad.addEventListener('touchstart', (e) => {
            isDragging = true;
            if (e.touches.length > 0) {
                updatePadPosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length > 0) {
                updatePadPosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

});
