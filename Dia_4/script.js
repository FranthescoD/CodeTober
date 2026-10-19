// ==========================================
// ABORDAGEM 3: Inicialização Three.js (WebGL)
// ==========================================
function initThreeJS() {
    const container = document.getElementById('webgl-card-container');
    if (!container || typeof THREE === 'undefined') return;

    // Criar cena, câmera e renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 3);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Criar uma geometria 3D (ex: Torus Knot - Nó de Toro)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.3,
        metalness: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Interatividade com o mouse
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    container.addEventListener('mousemove', (e) => {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        if (isDragging) {
            mesh.rotation.y += deltaX * 0.01;
            mesh.rotation.x += deltaY * 0.01;
        }
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Loop de animação
    function animate() {
        requestAnimationFrame(animate);
        if (!isDragging) {
            mesh.rotation.y += 0.005;
            mesh.rotation.x += 0.003;
        }
        renderer.render(scene, camera);
    }
    animate();

    // Responsividade ao redimensionar tela
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Chamar ao carregar a página (garantindo que o script do Three.js esteja no head se necessário)
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o script do Three.js dinamicamente se não estiver presente
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initThreeJS;
        document.head.appendChild(script);
    } else {
        initThreeJS();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Comportamento do Card 1 (Mostrar Mais / Expandir)
    const showMoreButton = document.getElementById('showmore-button');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', (e) => {
            // Evita propagação se clicar em elementos internos
            showMoreButton.classList.toggle('Active');
        });
    }

    // 2. Comportamento do Flip Card (Estilo 1 - CSS 3D)
    const flipCard = document.querySelector('[data-flip-card]');
    if (flipCard) {
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('is-flipped');
        });
    }
});
