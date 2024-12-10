// Fonction pour générer des numéros aléatoires uniques
function generateRandomNumbers(count, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers);
}

// Fonction pour comparer les numéros de l'utilisateur et les numéros gagnants
function compareNumbers(userNumbers, lottoNumbers) {
  return userNumbers.filter((num) => lottoNumbers.includes(num));
}

// Gestionnaire de l'événement "Jouer"
document.getElementById("playButton").addEventListener("click", () => {
  // Récupération des numéros de l'utilisateur
  const userNumbers = [
    parseInt(document.getElementById("num1").value),
    parseInt(document.getElementById("num2").value),
    parseInt(document.getElementById("num3").value),
    parseInt(document.getElementById("num4").value),
  ];

  // Vérification des entrées utilisateur
  if (userNumbers.some(isNaN)) {
    alert("Veuillez entrer tous les numéros correctement.");
    return;
  }

  // Génération des numéros gagnants
  const lottoNumbers = generateRandomNumbers(4, 9);

  // Comparaison des numéros
  const matches = compareNumbers(userNumbers, lottoNumbers);

  // Affichage des résultats dans le DOM
  document.getElementById(
    "lottoNumbers"
  ).textContent = `Numéros gagnants : ${lottoNumbers.join(", ")}`;
  document.getElementById("yourMatches").textContent =
    matches.length > 0
      ? `Vos correspondances : ${matches.sort((a, b) => a - b).join(", ")}`
      : "Vos correspondances : Aucune";

  // Vérification : si tous les chiffres correspondent, afficher l'animation du rectangle
  if (
    matches.length === 4 &&
    matches.every((num) => lottoNumbers.includes(num))
  ) {
    showWinnerBanner();
  }
});

// Affichage et animation du rectangle "WINNER"
function showWinnerBanner() {
  const banner = document.getElementById("winnerBanner");

  // Affiche avec effet de zoom
  banner.classList.remove("hidden", "hide");
  banner.classList.add("show");

  // Reste affiché pendant 6 secondes, puis disparaît
  setTimeout(() => {
    banner.classList.remove("show");
    banner.classList.add("hide");
  }, 8000); // 2s pour apparaître + 6s affiché
}

// Gestion du Gold
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
