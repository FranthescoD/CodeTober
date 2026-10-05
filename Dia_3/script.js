
const botao = document.getElementById('showmore-button');

botao.addEventListener('click', showMore);

function showMore() {
    const button = document.getElementById('showmore-button');
    button.classList.toggle('hide');
    button.classList.toggle('Active');
}

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os flip cards da página que possuem o atributo data-flip-card
  const flipCards = document.querySelectorAll('[data-flip-card]');

  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
});
