// ДЗ 1. Консольное меню
// Запуск: node homework-1.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const INPUT_ERROR = 'нужно ввести число не меньше 0';

// Превращает введённый текст в число. Пустая строка и текст дают NaN
function toNumber(text) {
  if (text.trim() === '') {
    return NaN;
  }
  return Number(text);
}

// Бюджет, расстояние, сумма и высота должны быть обычным числом не меньше 0
function isValidAmount(value) {
  return Number.isFinite(value) && value >= 0;
}

// ---------- 1. Билетная касса ----------

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

// Считает билеты вычитанием, без деления и округления
function maxTickets(budget, price) {
  if (price <= 0) {
    return 0;
  }

  let count = 0;
  let rest = budget;
  while (rest >= price) {
    rest -= price;
    count++;
  }
  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

// ---------- 2. Доставка заказа ----------

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }
  // Неполный километр после десятого считаем как целый
  return distance <= 10 ? 200 : 200 + Math.ceil(distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// ---------- 3. Лестница ----------

function printSteps(height) {
  let built = 0;

  for (let step = 1; step <= height; step++) {
    if (step === 4) {
      continue; // ступень 4 не строят
    }
    if (step > 10) {
      console.log('Дальше лестница не построена');
      break;
    }
    console.log(`Ступень ${step}`);
    built++;
  }

  console.log(`Всего построено: ${built}`);
}

// ---------- Ввод данных для каждого пункта меню ----------

function runTickets() {
  rl.question('Категория билета: ', (categoryText) => {
    rl.question('Бюджет: ', (budgetText) => {
      const budget = toNumber(budgetText);
      if (isValidAmount(budget)) {
        printTicketResult(toNumber(categoryText), budget);
      } else {
        console.log(INPUT_ERROR);
      }
      rl.close();
    });
  });
}

function runDelivery() {
  rl.question('Расстояние: ', (distanceText) => {
    rl.question('Сумма заказа: ', (totalText) => {
      const distance = toNumber(distanceText);
      const total = toNumber(totalText);
      if (isValidAmount(distance) && isValidAmount(total)) {
        printDelivery(distance, total);
      } else {
        console.log(INPUT_ERROR);
      }
      rl.close();
    });
  });
}

function runStairs() {
  rl.question('Высота лестницы: ', (heightText) => {
    const height = toNumber(heightText);
    if (isValidAmount(height)) {
      printSteps(height);
    } else {
      console.log(INPUT_ERROR);
    }
    rl.close();
  });
}

// ---------- Меню ----------

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', (choice) => {
  switch (choice.trim()) {
    case '1':
      runTickets();
      break;
    case '2':
      runDelivery();
      break;
    case '3':
      runStairs();
      break;
    default:
      console.log('такой задачи нет');
      rl.close();
  }
});
