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
const upgrade_count_display = document.createElement("div");
app.append(upgrade_count_display);

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
upgrade_buttonA.addEventListener("click", boughtUpgradeA);
upgrade_buttonA.disabled = true;
function boughtUpgradeA(){
  incrementGrowthRate(0.1,10);
  numUpgradesA++;
}

//Creates Upgrade B
const upgrade_buttonB = document.createElement("button");
upgrade_buttonB.textContent = "🎹";
app.append(upgrade_buttonB);
let numUpgradesB: number = 0;
upgrade_buttonB.addEventListener("click", boughtUpgradeB);
upgrade_buttonB.disabled = true;
function boughtUpgradeB(){
  incrementGrowthRate(2,100);
  numUpgradesB++;
}
//Creates Upgrade C
const upgrade_buttonC = document.createElement("button");
upgrade_buttonC.textContent = "🎸";
app.append(upgrade_buttonC);
let numUpgradesC: number = 0;
upgrade_buttonC.addEventListener("click", boughtUpgradeC);
upgrade_buttonC.disabled = true;
function boughtUpgradeC(){
  incrementGrowthRate(50,1000);
  numUpgradesC++;
}

//Button Cost Checker
function updateDisplay(): void{
  counter.textContent = `Notes Played: ${Math.trunc(num_notes * 10) / 10}`;
  growth_rate_display.textContent = `Bandpower: ${Math.trunc(growth_rate * 10) / 10} Notes Per Second`;
  upgrade_count_display.textContent = `Upgrade A: ${Math.floor(numUpgradesA)} Upgrade B: ${Math.floor(numUpgradesB)} Upgrade C: ${Math.floor(numUpgradesC)}`;
  if (num_notes >= 10 && num_notes < 100) {
    upgrade_buttonA.disabled = false;
    upgrade_buttonB.disabled = true;
    upgrade_buttonC.disabled = true;
  }
  else if(num_notes >= 100 && num_notes < 1000) {
    upgrade_buttonA.disabled = false;
    upgrade_buttonB.disabled = false;
    upgrade_buttonC.disabled = true;
  }
  else if(num_notes >= 1000) {
    upgrade_buttonA.disabled = false;
    upgrade_buttonB.disabled = false;
    upgrade_buttonC.disabled = false;
  }
  else{
    upgrade_buttonA.disabled = true;
    upgrade_buttonB.disabled = true;
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
