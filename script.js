const  profile = document.querySelector('.profile');
const  profileContainer = profile.querySelector('.profile__bio');
const  nameProfile = profileContainer.querySelector('.profile__name'); // имя владельца профайла
const  jobProfile = profileContainer.querySelector('.profile__about'); // профессия владельца профайла
const  cardBox = document.querySelector('.elements'); // коробка карточек
const  card = cardBox.querySelector('.element'); // карточка
const  fotoCard = cardBox.querySelector('.element__foto'); // фотография карточки
const  captionCard = cardBox.querySelector('.element__caption'); // подпись карточки 
const  textCard = cardBox.querySelector('.element__caption-town'); // текст подписи карточки
const  likeCard = cardBox.querySelector('.element__button-like'); // кнопка не активного like карточки
const  addInfoButton = profileContainer.querySelector('.profile__edit-button'); // кнопка вызывающая модальное окно
const  popupContainer = document.querySelector('.popup__container'); // попап контейнер
const  popup = document.querySelector('.popup_profile-edit'); // для вызова попап редактировать профиль
const  closeAddInfoButton = popupContainer.querySelector('.popup__close-icon'); // кнопка закрытия модального окна
const  formElement = popupContainer.querySelector('.popup__form'); // попап форма редактировать профиль
const  nameInput = formElement.querySelector('.popup__input_data_name'); // строка ввода имени
const  jobInput = formElement.querySelector('.popup__input_data_about'); // строка ввода профессии


function openAddInfo() {
  popup.classList.add('popup_opened');
}

function closeAddInfo() {
  popup.classList.remove('popup_opened');
}

addInfoButton.addEventListener('click', openAddInfo);
closeAddInfoButton.addEventListener('click', closeAddInfo);

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 

const initialCards = [
  {
    name: 'Выборг',
    link: 'images/viborg.jpg'
  },
  {
    textCard: 'Кабардино-Балкария',
    fotoCard: 'images/kabardino-balkariya.jpg'
  },
  {
    textCard: 'Казань',
    fotoCard: 'images/kazan.png'
  },
  {
    textCard: 'Лахденпохья',
    fotoCard: 'images/lahdenpokhya.jpg'
  },
  {
    textCard: 'Йошкар-Ола',
    fotoCard: 'images/yoshkar-ola.jpg'
  },
  {
    textCard: 'Териберка',
    fotoCard: 'images/teriberka.jpg'
  },
]

function addCardElement() {
  for (let i=0; i <= 5; i += 1) {
    /*let ink = initialCards.link[i];*/
  cardBox.insertAdjacentHTML('beforeend',`
    <article class="element">
      <img fotoCard(${initialCards.link}) />
      <div class="element__caption">
        <h2 textCard(${initialCards.name})</h2>
        <button class="element__button-like" type="button" aria-label="Кнопка like"></button>
      </div>
    </article>
  `
  )
  } 
}

addCardElement()