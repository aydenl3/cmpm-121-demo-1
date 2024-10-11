import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//Creates Game Title Text
const gameName = "My amazing game";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Creates Button
const button = document.createElement("button");
button.textContent = "🎷";
app.append(button);
button.addEventListener("click", () => incrementNotes(1));

//Creates Counter
const counter = document.createElement("div");
app.append(counter);

//Creates GrowthRate Display
const growth_rate_display = document.createElement("div");
app.append(growth_rate_display);

//Creates Upgrade Count Displays
const upgrade_count_displayA = document.createElement("div");
app.append(upgrade_count_displayA);
const upgrade_count_displayB = document.createElement("div");
app.append(upgrade_count_displayB);
const upgrade_count_displayC = document.createElement("div");
app.append(upgrade_count_displayC);

//Incrementers
let num_notes: number = 0;
function incrementNotes(amt: number): void {
  num_notes += amt;
}

function incrementGrowthRate(amt: number, cost: number): void {
  num_notes -= cost;
  growth_rate += amt;
}

//Creates Upgrade A
const upgrade_buttonA = document.createElement("button");
upgrade_buttonA.textContent = "🔔";
app.append(upgrade_buttonA);
let numUpgradesA: number = 0;
let costUpgradeA: number = 10;
upgrade_buttonA.addEventListener("click", boughtUpgradeA);
upgrade_buttonA.disabled = true;
function boughtUpgradeA() {
  incrementGrowthRate(0.1, costUpgradeA);
  numUpgradesA++;
  costUpgradeA *= 1.15;
}

//Creates Upgrade B
const upgrade_buttonB = document.createElement("button");
upgrade_buttonB.textContent = "🎹";
app.append(upgrade_buttonB);
let numUpgradesB: number = 0;
let costUpgradeB: number = 100;
upgrade_buttonB.addEventListener("click", boughtUpgradeB);
upgrade_buttonB.disabled = true;
function boughtUpgradeB() {
  incrementGrowthRate(2, costUpgradeB);
  numUpgradesB++;
  costUpgradeB *= 1.15;
}
//Creates Upgrade C
const upgrade_buttonC = document.createElement("button");
upgrade_buttonC.textContent = "🎸";
app.append(upgrade_buttonC);
let numUpgradesC: number = 0;
let costUpgradeC: number = 1000;
upgrade_buttonC.addEventListener("click", boughtUpgradeC);
upgrade_buttonC.disabled = true;
function boughtUpgradeC() {
  incrementGrowthRate(50, costUpgradeC);
  numUpgradesC++;
  costUpgradeC*= 1.15;
}

//Button Cost Checker
function updateDisplay(): void {
  counter.textContent = `Notes Played: ${Math.trunc(num_notes * 10) / 10}`;
  growth_rate_display.textContent = `Bandpower: ${Math.trunc(growth_rate * 10) / 10} Notes Per Second`;
  upgrade_count_displayA.textContent = `Num A's: ${Math.floor(numUpgradesA)}cost of A:${Math.trunc(costUpgradeA * 100) / 100}`;
  upgrade_count_displayB.textContent = `Num B's: ${Math.floor(numUpgradesB)}cost of B:${Math.trunc(costUpgradeB * 100) / 100}`;
  upgrade_count_displayC.textContent = `Num C's: ${Math.floor(numUpgradesC)}cost of C:${Math.trunc(costUpgradeC * 100) / 100}`;
  if (num_notes >= costUpgradeA) {
    upgrade_buttonA.disabled = false;
  }
  else{
    upgrade_buttonA.disabled = true;
  }
  if (num_notes >= costUpgradeB) {
    upgrade_buttonB.disabled = false;
  }
  else{
    upgrade_buttonB.disabled = true;
  }
  if (num_notes >= costUpgradeC) {
    upgrade_buttonC.disabled = false;
  }
  else{
    upgrade_buttonC.disabled = true;
  }
}

//Auto-Clicker Logic
let start_time = performance.now();
let cache: number = 0;
let growth_rate: number = 0;
requestAnimationFrame(animate);
function animate(): void {
  cache += performance.now() - start_time;
  if (cache >= 1000) {
    cache -= 1000;
    incrementNotes(growth_rate);
  }
  start_time = performance.now();
  updateDisplay();
  requestAnimationFrame(animate);
}
