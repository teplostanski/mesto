//определяю попап редактирования профиля
const editPopup = document.querySelector('#popupEditProfile');

//определяю кнопку редактирования профиля(значок карандаш)
const editButton = document.querySelector('.profile__edit-button');

//определяю имя пользователя в ПРОФИЛЕ(нужно это для того чтобы связать с input в form в ПОПАПЕ)
const nameProfile = document.querySelector('.profile__name');

//определяю описание пользователя в ПРОФИЛЕ
const descriptionProfile = document.querySelector('.profile__description');

//отпределяю форму для ввода текста в ОТКРЫТОМ ПОПАПЕ
const popupForm = document.querySelector('.popup__form');

//определяю строчку для ввода имени и описания пользователя в  ОТКРЫТОМ ПОПАПЕ
const nameInput = popupForm.querySelector('input[name="name"]');
const descriptionInput = popupForm.querySelector('input[name="description"]');


//определяю стили для закрытия попапа
const closeButton = document.querySelector('.popup__close');

const initialCards = [
  {
    name: "Птичий мир",
    link: "./images/planet-bird-man.jpg",
    alt: "Птичий мир"
  },

  {
    name: "Флупилэнд",
    link: "./images/flupiland.jpg",
    alt: "Флупилэнд"
  },

  {
    name: "Планета с кричащим солнцем",
    link: "./images/sun.jpg",
    alt: "Планета с кричащим солнцем"
  },

  {
    name: "Планета Сквончи",
    link: "./images/sqwonch.jpg",
    alt: "Планета Сквончи"
  },

  {
    name: "Постапокалиптическая Земля",
    link: "./images/apocalips.jpg",
    alt: "Постапокалиптическая Земля"
  },

  {
    name: "Мир Юнити",
    link: "./images/unity.jpg",
    alt: "Мир Юнити"
  },
];

//объявляю шаблон (родитель)
const templateForCard = document.querySelector('#templateForCard');
const cardsContainer = document.querySelector('.cards');

//дочерний элемент (Child)
const card = cardsContainer.querySelector('.card');

function firstSixCards(card) {

	//соответственно я клонирую контент первого дочернего элемента шаблона(родителя)
	const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
	//беру картинку
	const cardCloneImage = cardClone.querySelector('.card__img');
	//вешаю атрибуты
	cardCloneImage.setAttribute('src', card.link);
	cardCloneImage.setAttribute('alt', card.alt);
	//и магии не произошло
	//СУКА КАК ЖЕ Я НЕНАВИЖУ ДЖАВАСКИПТ

	//навешиваю слушатель

	//дальше для клонированой карточки в заголовок подгребается название картинки из массива
	cardClone.querySelector(".card__capture").textContent = card.name;

	//берём клонированую карточку .card со всем её блядским содержимым и добавляетм её в начало ноды .cards
	cardsContainer.prepend(cardClone);
}

//и вишенка на торте-функция перебирает массив методом forEach (с)метод forEach() позволяет выполнить переданную функцию один раз для каждого элемента в массиве в порядке возрастания индекса.
initialCards.forEach(firstSixCards);
//ЕБАТЬ НЕУЖЕЛИ КАРТОЧКИ ПОЯВИЛИСЬ, ЭТО ЛИ НЕ ЧУДО!


/*
const addCardPopup = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = addCardPopup.querySelector('input[name="place"]');
const placeImgInput = addCardPopup.querySelector('input[name="url"]');
const addCardForm = addCardPopup.querySelector('.popup__form');

const galleryPopup = document.getElementById('popupGallery');
const galleryImg = document.querySelector('.popup__img-gallery');
const galleryCapture = document.querySelector('.popup__figcaption');
const cardCapture = document.querySelector('.card__capture');
*/

/*
//Открыть ПопАп
function onClickEditButton(){
  //.popup + .popup_opened
  editPopup.classList.add('popup_opened');
  //ввод имени input[name='name'] и input[name='description']
  //со значением VALUE(значение текстовых полей) присваивается
  //.profile__name со свойством textContent(управляет тестовым содежимым, позволяет
  //получить и перезаписать текстовое содержимое элемента не трогая разметку)
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}
//Закрыть ПопАп
function onClickCloseButton(){
  //.popup - .popup_opened
  editPopup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', onClickCloseButton);
*/

//попап редактирования профиля
//эксперимент открытия и закрытия попапа методом toggle(код стал короче на 4 строчки потому что не надо писать функцию для закрытия попапа,следовательно обработчики событий для закрытия и открытия попапа обращаются в одной и той же функции)
//Открыть ПопАп
function onClickEditButton(){
  //.popup + .popup_opened
  editPopup.classList.toggle('popup_opened');
  //ввод имени input[name='name'] и input[name='description']
  //со значением VALUE(значение текстовых полей) присваивается
  //.profile__name со свойством textContent(управляет тестовым содежимым, позволяет
  //получить и перезаписать текстовое содержимое элемента не трогая разметку)
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}


//Добавить данные в профиль
//вешаю событие отправки формы submit
function formSubmitHandler (evt) {
  //отменяю стандартную функцию перезагрузки страницы при успешной отправки формы
  evt.preventDefault();

  //получение новых текстовых значение
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  //полученные текстовые данные сохраняются в переменные
  //закрытие попапа по нажатию кнопки 'сохранить'
  onClickEditButton();
}


//обработчики событий

//отправка формы
popupForm.addEventListener('submit', formSubmitHandler);
//клик по кнопке 'редактирование профиля'(карандаш)
editButton.addEventListener('click', onClickEditButton);
//клик по кнопке 'закрыть'
closeButton.addEventListener('click', onClickEditButton);
