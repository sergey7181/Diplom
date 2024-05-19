let avt =  [];                                  // Колода карт автора
let user = [];                                  // Колода карт игрока
let col2 = document.getElementById("col_2");    // Место на столе, куда бросает карту автор 
let col3 = document.getElementById("col_3");    // Место на столе, куда бросает карту игрок
let info = document.getElementById("info");     // Верхний экран
let info_t = document.getElementById("info_t"); // Кол-во тузов у игрока
let info_k = document.getElementById("info_k"); // Кол-во королей у игрока
let info_6 = document.getElementById("info_6"); // Кол-во "6" у игрока  
let info_V = document.getElementById("info_V"); // Всего карт у игрока 
let vziatka = [];                               // Взятка на столе


function start() {
  avt =  []; user = []; vziatka = [];
  document.getElementById("col_1").hidden = false;     // Колода карт автора на столе 
  document.getElementById("col_1").style.opacity = 1;
  col2.hidden = true;
  col3.hidden = true;
  let col4 = document.getElementById("col_4");         // Колода карт игрока на столе
  col4.hidden = false;
  col4.style.opacity = 1;
  document.querySelector(".ekran2").hidden = false;    // Включаем боковой экран      
  document.querySelector(".ekran2").style.top = col4.getBoundingClientRect().top - 13 + "px";  // Назначаем местоположение бокового экрана 
  document.querySelector(".brosoc").disabled = false;  // Активация кнопки "Бросаем карту"
  razdacha_card();                                     // Раздаем карты автору и игроку
  infor();                                             // Вывод инф-ии на боковой экран 
  inf_console();                                       // Вывод колоды карт автора и игрока в консоль
  info.innerText = `Карты розданы\nБросайте карту`;
}  

function brosoc() {
  infor();                        // Вывод инф-ии на боковой экран
  while(true) {
    let avt0 = avt.shift();       // Берем верние карты из колоды
    let user0 = user.shift();
    if(user0 == undefined) {                               // Если карты закончились - конец игры
      info.innerText = `Вы проиграли!\nСыграем еще ?`;
      document.querySelector(".brosoc").disabled = true;   // Дезактивация кнопки "Бросаем карту"
      document.getElementById("col_4").hidden = true;
      col2.hidden = true;
      col3.hidden = true;
      break;
    }
    if(avt0 == undefined) {
      info.innerText = `Вы выиграли!!!\nСыграем еще ?`;
      document.querySelector(".brosoc").disabled = true;
      document.getElementById("col_1").hidden = true;
      col2.hidden = true;
      col3.hidden = true;
      break;
    }
    
    vziatka.push(`${avt0}`);       // Записываем карты в массив взятки на столе 
    vziatka.push(`${user0}`);

    col2.innerHTML = `<img src="Card/${avt0}.gif" class="img-fluid" alt="Карта">`;  // Бросаем карты на стол
    col3.innerHTML = `<img src="Card/${user0}.gif" class="img-fluid" alt="Карта">`;
    col2.hidden = false;
    col3.hidden = false;

    let avt0_int = parseInt(avt0);     // Считываем цифру карты отвечающую за старшинство    
    let user0_int = parseInt(user0);
    if( (avt0_int == 0 && user0_int == 8) || (avt0_int == 4 && user0_int == 7) ) {   //Если встречаются "6" и туз, "10" и король
      avt = dob_col(avt, "Моя взяла");                                       // Добавляем взятку в колоду и выводим: "Моя взяла" на верхний экран
      inf_console();  
      break;
    }
    if( (user0_int == 0 && avt0_int == 8) || (user0_int == 4 && avt0_int == 7) ) {
      user = dob_col(user, "Ваша взяла");
      inf_console();  
      break;
    }
          
    if(avt0_int > user0_int) {
      avt = dob_col(avt, "Моя взяла");    // Добавляем взятку в колоду и выводим: "Моя взяла" на верхний экран
    } else if( avt0_int < user0_int ) {
      user = dob_col(user, "Ваша взяла");
    } else {
      info.innerText = `Это спор\nБросайте карту`;
      break;
    }  
    inf_console();
    break;

    function dob_col(col_x, soob) {
      info.innerText = soob + `\n` + "Бросайте карту" ;  // Выводим: "Моя взяла" или "Ваша взяла" на верхний экран
      col_x = col_x.concat(vziatka);       // Добавляем взятку в колоду
      vziatka = [];                        // Обнуляем взятку  
      return col_x; 
    }
  }   // Конец цикла while(true)
}   // Конец функции brosoc()

function infor() {                // Вывод инф-ии на боковой экран
  info_t.innerText = schit("8");
  info_k.innerText = schit("7");
  info_6.innerText = schit("0");
  info_V.innerText = user.length;;

  function schit(a) {              // Вычисляет кол-во карт старшинства 'a'
    let st = user.filter( (item) => { return item.includes(a); });
    return st.length;
  }
} // КонеЦ функции infor()

function razdacha_card() {
  let masts = ['t', 'c', 'b', 'p'];    // Масть карт t-треф, c-черви, b-бубны, p-пики
  masts.forEach( (item) => {           // Формирование колоды автора из 36 карт
    for (let i = 0; i < 9; i++) {
      avt.push(`${i}` + item);
    }
  });  
  for (let i = 0; i < 18; i++) {            // Формирование колоды карт игрока: берем из колоды автора 18 карт случайным образом   
    let sl = Math.round(Random(0, 35 - i));
    user[i] = avt[sl];
    avt.splice(sl, 1);
  } 

  function Random(min, max) {                    // Генерация случайных чисел в диапазоне (min, max)
    return Math.random() * (max - min) + min;
  }
} // КонеЦ функции razdacha_card()

function inf_console() {
  console.log(avt);
  console.log(user);
}