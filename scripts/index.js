//определяю попап редактирования профиля
const editPopup = document.querySelector('#popupEditProfile');

//определяю кнопку редактирования профиля(значок карандаш)
const editButton = document.querySelector('.profile__edit-button');

//определяю имя пользователя в ПРОФИЛЕ(нужно это для того чтобы связать с input в form в ПОПАПЕ)
const nameProfile = document.querySelector('.profile__name');

//определяю описание пользователя в ПРОФИЛЕ
const descriptionProfile = document.querySelector('.profile__description');

//отпределяю форму для ввода текста в ОТКРЫТОМ ПОПАПЕ
const popupEditForm = document.querySelector('.popup__form');

//определяю строчку для ввода имени и описания пользователя в  ОТКРЫТОМ ПОПАПЕ
const nameInput = popupEditForm.querySelector('input[name="name"]');
const descriptionInput = popupEditForm.querySelector('input[name="description"]');


//определяю стили для закрытия попапа
const closeButtons = document.querySelectorAll('.popup__close');

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

//Открыть
function toggleOpenPopups(popup) {
  popup.classList.add('popup_opened');
}

//Закрыть
function toggleClosePopups(popup) {
  popup.classList.remove('popup_opened');
}

//Редактирование профиля
//функция-обработчик события
function onClickEditButton(){
  //ввод имени input[name='name'] и input[name='description']
  //со значением VALUE(значение текстовых полей) присваивается
  //.profile__name со свойством textContent(управляет тестовым содежимым, позволяет
  //получить и перезаписать текстовое содержимое элемента не трогая разметку)
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
	//вешаю переключатель на айдишник
	toggleOpenPopups(editPopup);
}


//Добавить данные в профиль
//вешаю событие отправки формы submit
function formSubmitEditProfileHandler (evt) {
  //отменяю стандартную функцию перезагрузки страницы при успешной отправки формы
  evt.preventDefault();

  //получение новых текстовых значение
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

	toggleClosePopups(editPopup);
	/*
	//полученные текстовые данные сохраняются в переменные
  //закрытие попапа по нажатию кнопки 'сохранить'
  onClickEditButton();
	*/
}


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



//параметр parametr_card произвольный и неявно объявляет переменную в которой хранятся значения для link alt и name. Эти значения берутся из массива с помощью forEach и хранятся в произвольной переменной parametr_card откуда берутся и вешаются атрибутами в вёрстку
function firstSixCards(parametr_card) {

	//соответственно я клонирую контент первого дочернего элемента шаблона(родителя)
	const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
	//беру картинку
	const cardCloneImage = cardClone.querySelector('.card__img');
	//вешаю атрибуты
	cardCloneImage.setAttribute('src', parametr_card.link);
	cardCloneImage.setAttribute('alt', parametr_card.alt);
	//и магии не произошло
	//СУКА КАК ЖЕ Я НЕНАВИЖУ ДЖАВАСКPИПТ

	cardCloneImage.addEventListener('click', onClickByImg);

	//дальше для клонированой карточки в заголовок подгребается название картинки из массива
	cardClone.querySelector('.card__capture').textContent = parametr_card.name;

	//вырываю клонированую карточку .card со всем её блядским содержимым из шаблона template и вставляю её в разметку, то есть в начало ноды .cards
	cardsContainer.prepend(cardClone);
}

//и вишенка на торте-функция перебирает массив методом forEach (с)метод forEach() позволяет выполнить переданную функцию один раз для каждого элемента в массиве в порядке возрастания индекса.
initialCards.forEach(firstSixCards);
//ЕБАТЬ НЕУЖЕЛИ КАРТОЧКИ ПОЯВИЛИСЬ, ЭТО ЛИ НЕ ЧУДО!
//мне каждая строчка даётся с боей.
//главное не забыть через 5 минут как писать эту хрень. А дальше Реакт, я вообще чёкнусь.


				/*
				//Можно перебирать первые 6 карточек не методом foeEach а циклом for...of
				function firstSixCards(parametr_card) {

					//соответственно я клонирую контент первого дочернего элемента шаблона(родителя)
					const cardClone = templateForCard.content.firstElementChild.cloneNode(true);
					//беру картинку
					const cardCloneImage = cardClone.querySelector('.card__img');
					//вешаю атрибуты
					cardCloneImage.setAttribute('src', parametr_card.link);
					cardCloneImage.setAttribute('alt', parametr_card.alt);
					//и магии не произошло
					//СУКА КАК ЖЕ Я НЕНАВИЖУ ДЖАВАСКPИПТ

					//дальше для клонированой карточки в заголовок подгребается название картинки из массива
					cardClone.querySelector('.card__capture').textContent = parametr_card.name;

					return cardClone;
				}

				//Но для этого нужно создать цикл for...of
				//где переменная явно объявлена
				for (const parametr_card of initialCards) {
					//где cardsContainer родительская нода и метод appendChild добавляет узел в конец списка дочерних элементов родителя
					cardsContainer.appendChild(firstSixCards(parametr_card));
				}
				//и нужно вывести результат клонированной ноды(карточки) внутри функции с помощью return
				//И ЭТОТ МЕТОД ДЕЛАЕТ КОД ДЛИННЕЕ НА 2 СТРОЧКИ
				*/



//время пилить кнопку для добавления новых карточек
const addCardPopup = document.querySelector('#popupPlace');
const addButton = document.querySelector('.profile__add-button');
const placeNameInput = addCardPopup.querySelector('input[name="place"]');
const placeImgInput = addCardPopup.querySelector('input[name="url"]');
const addCardForm = addCardPopup.querySelector('.popup__form');

//функция-обработчик события
function formSubmitAddCardHandler (evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeImg = placeImgInput.value;
  const data = {
    name: placeName,
    link: placeImg,
    alt: placeName
  };
  cardsContainer.prepend(createCard(data));
  toggleClosePopups(addCardPopup);
  addCardForm.reset();
}

//функция-обработчик события
//вешаю переключать на кнопку '+'
function onClickAddButton() {
  toggleOpenPopups(addCardPopup);
}


//функция-обработчик события
function onClickCloseButton(evt) {
  toggleClosePopups(evt.target.closest('.popup'));
}


//ФИНАЛЬНЫЙ ШТРИХ: ХЕРАЧИМ ГАЛЕРЕЮ
const galleryPopup = document.getElementById('popupGallery');
const galleryImg = document.querySelector('.popup__img-gallery');
const galleryCapture = document.querySelector('.popup__figcaption');
const cardCapture = document.querySelector('.card__capture');

function onClickByImg (evt) {
  const newLink = evt.target.getAttribute('src');
  const newTxt = evt.target.getAttribute('alt');
  galleryImg.setAttribute('src', newLink);
  galleryImg.setAttribute('alt', newTxt);
  galleryCapture.textContent = newTxt;
  toggleOpenPopups(galleryPopup);
	//ЩИКАРНО, картинка открывается по клику,но на так как хотелось бы, время писать стили.
}

//РЕАКЦИЯ НА СОБЫТИЯ

//синтаксис следующий: элемент[которому добавляем слушатель].методСлушателя(событие, на которое нужно отреагировать, `handler` — функция-обработчик события)

//отправка формы
popupEditForm.addEventListener('submit', formSubmitEditProfileHandler);
//клик по кнопке 'редактирование профиля'(карандаш)
editButton.addEventListener('click', onClickEditButton);
//клик по кнопке 'закрыть'
closeButtons.forEach((button) => {
  button.addEventListener('click', onClickCloseButton);
})

addButton.addEventListener('click', onClickAddButton);




				/*
					+ кнопка "добавить картинку" работает
					+ кнопки "закрыть" работают

					+ кнопка "сохранить" на попапе редакторования профиля работает

					+- кнопка "сохранить" на попапе добавления картинки работет, картинки не добавляются

					СЛЕДУЮЩИЙ ШАГ

					- добавить попап открытия картинки по клику
					- добавить возможность добавления картинок в галерею

					- добавить возмржность ставить и убирать лайки
					- добавить возможность удалять картинки
					- добавить кнопку удаления

					-поправить стили
				*/