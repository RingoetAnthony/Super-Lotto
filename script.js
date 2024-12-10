function generateRandomNumbers(count, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers);
}

function compareNumbers(userNumbers, lottoNumbers) {
  return userNumbers.filter((num) => lottoNumbers.includes(num));
}

document.getElementById("playButton").addEventListener("click", () => {
  const userNumbers = [
    parseInt(document.getElementById("num1").value),
    parseInt(document.getElementById("num2").value),
    parseInt(document.getElementById("num3").value),
    parseInt(document.getElementById("num4").value),
  ];

  if (userNumbers.some(isNaN)) {
    alert("Veuillez entrer tous les numéros correctement.");
    return;
  }

  const lottoNumbers = generateRandomNumbers(4, 9);

  const matches = compareNumbers(userNumbers, lottoNumbers);

  document.getElementById(
    "lottoNumbers"
  ).textContent = `Numéros gagnants : ${lottoNumbers.join(", ")}`;
  document.getElementById("yourMatches").textContent =
    matches.length > 0
      ? `Vos correspondances : ${matches.sort((a, b) => a - b).join(", ")}`
      : "Vos correspondances : Aucune";

  if (
    matches.length === 4 &&
    matches.every((num) => lottoNumbers.includes(num))
  ) {
    showWinnerBanner();
  }
});

function showWinnerBanner() {
  const banner = document.getElementById("winnerBanner");

  banner.classList.remove("hidden", "hide");
  banner.classList.add("show");

  setTimeout(() => {
    banner.classList.remove("show");
    banner.classList.add("hide");
  }, 8000);
}

let currentGold = 1000000000;

function updateGoldDisplay() {
  document.getElementById(
    "currentGold"
  ).textContent = `Montant actuel : ${currentGold.toLocaleString()} Gold`;
}

document.getElementById("addGoldButton").addEventListener("click", () => {
  const goldInput = document.getElementById("goldInput");
  const amountToAdd = parseInt(goldInput.value, 10);

  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    alert("Veuillez entrer un montant valide.");
    return;
  }

  currentGold += amountToAdd;
  updateGoldDisplay();
  goldInput.value = "";
});

updateGoldDisplay();
