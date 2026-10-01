// ==================================================
// ELEMNETOS DO DOM - BADGES DINÂMICAS
// ==================================================
const botaoAddBadge = document.getElementById('add-button');
const containerBadges = document.getElementById('badge-variant-1');

const categoriasFotos = [
  'Arte', 'Praia', 'Moda', 'Gatos', 'Shows', 'Carros', 'Luzes',
  'Fauna', 'Flora', 'Livros', 'Viagem', 'Música', 'Comida', 'Espaço',
  'Esnobe', 'Retrato', 'Cidade', 'Cores', 'Solitário', 'Sorriso',
  'Natureza', 'Aventura', 'Aeroespacial', 'Arquitetura', 'Fotografia',
  'Iluminação', 'Paisagem', 'Minimalista', 'Geometria', 'Astronomia'
];

// Função para pegar N elementos aleatórios do array
function obterEtiquetasAleatorias(lista, quantidade = 1) {
  const embaralhado = [...lista].sort(() => 0.5 - Math.random());
  return embaralhado.slice(0, quantidade);
}

// Função para criar e adicionar a badge dinamicamente
function criarBadge() {
  const etiqueta = obterEtiquetasAleatorias(categoriasFotos, 1)[0];
  const badge = document.createElement('span');
  badge.className = 'badge1';

  // Estrutura interna com o texto da tag e o ícone SVG de remover
  badge.innerHTML = `
    <span>${etiqueta}</span>
    <svg class="badge-delete-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="1" y1="1" x2="11" y2="11"></line>
      <line x1="11" y1="1" x2="1" y2="11"></line>
    </svg>
  `;

  // Seleciona o ícone SVG e adiciona evento de remoção
  const deleteBtn = badge.querySelector('.badge-delete-icon');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede propagação do clique
    badge.remove();      // Remove o badge do DOM
  });

  containerBadges.appendChild(badge);
}

// Evento no botão "+" para criar nova badge
if (botaoAddBadge) {
  botaoAddBadge.addEventListener('click', criarBadge);
}

// ==================================================
// ELEMNETOS DO DOM - MENU DE STATUS
// ==================================================
const statusBadgeBtn = document.getElementById('statusBadgeBtn');
const statusMenu = document.getElementById('statusMenu');
const statusOptions = document.querySelectorAll('.status-option');

// Alterna a exibição do menu de status ao clicar na bolinha
if (statusBadgeBtn && statusMenu) {
  statusBadgeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    statusMenu.classList.toggle('active');
  });

  // Atualiza a cor e o status do botão
  statusOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const newStatus = option.getAttribute('data-status');

      // Remove classes anteriores de cor e aplica a nova
      statusBadgeBtn.className = `circle dot-${newStatus}`;

      // Fecha o menu após a seleção
      statusMenu.classList.remove('active');
    });
  });

  // Fecha o menu se o usuário clicar em qualquer outro lugar da página
  document.addEventListener('click', () => {
    statusMenu.classList.remove('active');
  });
}
