const game = document.getElementById('game');


function allGame(game, count) {
  const randomArray = [];
  let firstCard = null;
  let secondCard = null;

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    for (let i = 1; i <= count; i++) {
      randomArray.push(i, i);//чтобы появлялось 2 одинаковых числа
    }
    return randomArray;
  };


// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(randomArray) {
    for (let i = 0; i < randomArray.length; i++) {
      const randomIndex = Math.floor((Math.random() * randomArray.length));//чтобы получить любой доступный индекс из массива
      let temp = randomArray[i];
      randomArray[i] = randomArray[randomIndex];
      randomArray[randomIndex] = temp;
    }
    return randomArray;
  }

  //создание кнопки сыграть еще раз
  function createButton(){
    let button = document.createElement('button')
    button.textContent = 'Сыграть ещё раз!'
    button.classList.add('btn', 'btn-success', 'btn-lg', 'text-nowrap');
    game.append(button)
    return(button)
  }


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {
    let firstArray = createNumbersArray(count);
    let mixedArray = shuffle(randomArray);

  //создание карточек
    for (const cardNumber of randomArray) {
      let card = document.createElement('div');
      card.textContent = cardNumber;
      card.classList.add('card');

  //клик по карточке
      card.addEventListener('click', function(){
        if(card.classList.contains('open') || card.classList.contains('coincidence')){//условие в случае если мы нажмем на 1 и ту же карту 2 раза
          return
        }

        if(firstCard!==null && secondCard!==null){//если при 3 клике
          firstCard.classList.remove('open')
          secondCard.classList.remove('open')
          firstCard = null//сбрасываем их
          secondCard = null
        }

        card.classList.add('open');

        if (firstCard==null) {
          firstCard = card
        } else {
          secondCard = card
        }

        if(firstCard!==null && secondCard!==null) {
          let firstCardNumber = firstCard.textContent
          let secondCardNumber = secondCard.textContent

          if(firstCardNumber === secondCardNumber) {
            firstCard.classList.add('coincidence')
            secondCard.classList.add('coincidence')
          }
        }

        if(randomArray.length === document.querySelectorAll('.coincidence').length){

          setTimeout(function(){
            alert ('Вы победили!!!')//Если игра выиграна то показывает это
            let finishButton = createButton();
            finishButton.addEventListener('click', function(){
              location.reload();
              // let count = Number(prompt('Введите количество пар', 8));//чтобы перед игрой можно было выбрать сколько пар
              // allGame(game, count) // рекурсия - вызов функции в этой функции
            })
          }, 400)//это чтобы немного выжидать а потом показывать
        }
      })

      game.append(card)
    }
  }
  startGame(count)
}

let count = Number(prompt('Введите количество пар', 8));//чтобы перед игрой можно было выбрать сколько пар
allGame(game, count)

