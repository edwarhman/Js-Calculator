let calculator = {
  referenceInDOM: document.getElementById("calculator"),
  input: "",
  result: 0,
  history: [],
  buttons: [],

  update: function () {
    let inputString = convertPercents(this.input);
    let inputArray = transformInput(inputString);
    this.result = calcResult(inputArray);
  },
  updateInput: function () {
    this.referenceInDOM.children[0].children[0].textContent = this.input;
  },
  updateOutput: function () {
    this.referenceInDOM.children[0].children[1].textContent = this.result;
  },
};

function convertPercents(inputText) {
  while (inputText.indexOf("%") > 0) {
    inputText = inputText.replace("%", "/100");
  }
  return inputText;
}

function transformInput(inputText) {
  let operatorsPositions = [];
  let indexA = 0;
  let refactorizedInput = [];

  // Save operators positions
  for (let index = 0; index < inputText.length; index++) {
    const character = inputText[index];
    switch (character) {
      case "+":
      case "-":
      case "x":
      case "/":
        operatorsPositions.push(index);
        break;
      default:
        break;
    }
  }

  // Make the new refactorized input
  operatorsPositions.forEach((index) => {
    refactorizedInput.push(inputText.substring(indexA, index));
    refactorizedInput.push(inputText[index]);
    indexA = index + 1;
  });
  // Add the last item to the new input
  refactorizedInput.push(
    inputText.substring(operatorsPositions[operatorsPositions.length - 1] + 1)
  );

  return refactorizedInput;
}

function calcResult(input) {
  let result = 0;
  let index = 0;

  // Multiply
  while ((index = input.indexOf("x")) > 0) {
    input[index - 1] *= input[index + 1];
    input.splice(index, 2);
  }

  // Divide
  while ((index = input.indexOf("/")) > 0) {
    input[index - 1] /= input[index + 1];
    input.splice(index, 2);
  }

  // convert negatives
  while ((index = input.indexOf("-")) > 0) {
    input[index] += input[index + 1];
    input.splice(index + 1, 1);
  }

  // subtract sums
  while ((index = input.indexOf("+")) > 0) {
    input.splice(index, 1);
  }

  // Add items
  input.forEach((element) => {
    result = result + Number(element);
  });

  return result;
}

calculator.referenceInDOM.addEventListener("click", (e) => {
  const targetClasses = e.target.classList;
  const targetId = e.target.id;

  if (targetClasses.contains("calc-button") === true) {
    if (targetId.indexOf("clean") > 0) {
      calculator.input = "";
      calculator.update();
      calculator.updateOutput();
    } else if (targetId.indexOf("delete") > 0) {
      calculator.input = calculator.input.slice(0, -1);
      calculator.update();
      calculator.updateOutput();
    } else if (targetId.indexOf("percent") > 0) {
      calculator.input += "%";
      calculator.update();
    } else if (targetId.indexOf("division") > 0) {
      calculator.input += "/";
    } else if (targetId.indexOf("multi") > 0) {
      calculator.input += "x";
    } else if (targetId.indexOf("minus") > 0) {
      calculator.input += "-";
    } else if (targetId.indexOf("add") > 0) {
      calculator.input += "+";
    } else if (targetId.indexOf("dot") > 0) {
      calculator.input += ".";
    } else if (targetId.indexOf("equal") > 0) {
    } else {
      calculator.input += targetId.slice(-1);
      calculator.update();
      calculator.updateOutput();
    }
    calculator.updateInput();
  }
});
