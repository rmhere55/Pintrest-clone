// function closeNotification() {
//     document.querySelector('.notification-box').style.display = 'none';
//   }

//   function closeTermsAndPolicy() {
//     document.getElementById('termsAndPolicy').style.display = 'none';
//   }



  
const cardData = [
  { title: 'Card Title 1', description: 'Card Description 1', imgUrl: 'https://picsum.photos/500/400?random=1' },
  { title: 'Card Title 2', description: 'Card Description 2', imgUrl: 'https://picsum.photos/500/400?random=2' },
  { title: 'Card Title 3', description: 'Card Description 3', imgUrl: 'https://picsum.photos/500/400?random=3' },
  // Add more card data as needed
];

function createCard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.style.backgroundImage = `url('${card.imgUrl}')`;

  cardElement.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">${card.title}</h3>
      <p class="card-text">${card.description}</p>
      <div class="card-actions">
        <button>
          <i class="fa-regular fa-circle-down fa-xl" style="color: #333;"></i>
        </button>
        <button>
          <i class="fa-solid fa-share" style="color: #333;"></i>
        </button>
      </div>
    </div>
    <div class="card-overlay">
      <i class="fa fa-heart"></i>
    </div>
  `;

  return cardElement;
}

function loadCards() {
  const container = document.getElementById('cardContainer');
  cardData.forEach(card => {
    const cardElement = createCard(card);
    container.appendChild(cardElement);
  });
}

document.addEventListener('DOMContentLoaded', loadCards);