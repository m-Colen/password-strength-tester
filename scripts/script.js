const strengthMeter = document.querySelector("#strength-meter");
const passwordInput = document.querySelector("#password-input");
const reasonsContainer = document.querySelector("#reasons");

const calculatePasswordStrength = (password) => {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));
  return weaknesses;
};

const updateStrengthMeter = () => {
  const weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) {
      return;
    }
    strength -= weakness.deduction;
    const message = document.createElement("div");
    message.innerText = weakness.message;
    reasonsContainer.appendChild(message);
  });
  console.log(strength);
  strengthMeter.style.setProperty("--strength", strength);
};

const lengthWeakness = (password) => {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short.",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer.",
      deduction: 15,
    };
  }
};

const lowerCaseWeakness = (password) => {
  const regex = /[a-z]/g;
  return characterTypeWeakness(password, regex, "lower case characters");
};

const upperCaseWeakness = (password) => {
  const regex = /[A-Z]/g;
  return characterTypeWeakness(password, regex, "upper case characters");
};

const numberWeakness = (password) => {
  const regex = /\d/g;
  return characterTypeWeakness(password, regex, "numbers");
};

const specialCharactersWeakness = (password) => {
  const regex = /[\W\S]/g;
  return characterTypeWeakness(password, regex, "special characters");
};

const characterTypeWeakness = (password, regex, type) => {
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
};

const repeatCharactersWeakness = (password) => {
  const regex = /(.)\1/g;
  const matches = password.match(regex) || [];
  if (matches.length > 0) {
    return {
      message: "You password has repeat characters.",
      deduction: matches.length * 10,
    };
  }
};

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();
