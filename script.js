let mirror = document.getElementById("calculator-mirror");
let calculator = document.getElementById("calculator-container");
let numbers = document.querySelectorAll(".numbers input");
let operator = document.querySelectorAll(".sinais input");
let result = document.querySelector("#equal");
let clear = document.querySelector("#c");
let resultDisplayed = false;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    let currentString = mirror.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      mirror.innerHTML += e.target.value;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      resultDisplayed = false;
      mirror.innerHTML += e.target.value;
    } else {
      resultDisplayed = false;
      mirror.innerHTML = "";
      mirror.innerHTML += e.target.value
    }
  });
}
for(let i = 0; i < operator.length; i++){
  operator[i].addEventListener('click', function(e){
    let currentString = mirror.innerHTML
    let lastChar = currentString[currentString.length - 1]
    
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.substring(0, currentString.length - 1) + e.target.value;
      mirror.innerHTML = newString;
      console.log(newString)
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      mirror.innerHTML += e.target.value;
    }
})
} 
result.addEventListener('click', function(){
  let mirrorString = mirror.innerHTML
  let numbers = mirrorString.split(/\+|\-|\×|\÷/g);
  let operators = mirrorString.replace(/[0-9]|\./g, "").split("")

  let divide = operators.indexOf("÷");
  while(divide < -1){
    numbers.splice(divide, 2 , numbers[divide] / numbers[divide +1])
    operators.splice(divide, 1)
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    console.log(subtract);
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
    console.log(subtract)
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  mirror.innerHTML = numbers[0];
  resultDisplayed = true;
})
clear.addEventListener("click", function () {
 mirror.innerHTML = "";
});