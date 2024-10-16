import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//Creates Game Title Text
const gameName = "Jam Clicker";
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

//Incrementers
let num_notes: number = 0;
function incrementNotes(amt: number): void {
  num_notes += amt;
}

function incrementGrowthRate(amt: number, cost: number): void {
  num_notes -= cost;
  growth_rate += amt;
}

interface Item {
  name: string,
  cost: number,
  rate: number,
  num: number,
  emoji: string
};

const availableItems : Item[] = [
  {name: "Bell", cost: 10, rate: 0.1, num: 0,emoji:"🔔"},
  {name: "Piano", cost: 100, rate: 2, num: 0,emoji:"🎹"},
  {name: "Guitar", cost: 1000, rate: 50, num: 0,emoji:"🎸"},
];

//Creates Upgrade A
const upgrade_count_displayA = document.createElement("div");
app.append(upgrade_count_displayA);
const upgrade_buttonA = document.createElement("button");
upgrade_buttonA.textContent = "🔔";
app.append(upgrade_buttonA);
upgrade_buttonA.addEventListener("click", () => boughtUpgrade("Bell"));
upgrade_buttonA.disabled = true;


function boughtUpgrade(name:string) {
  for (const item of availableItems){
    if(name == item.name){
      incrementGrowthRate(item.rate, item.cost);
      item.num++;
      item.cost*=1.15;
    }

  }
}

//Creates Upgrade B
const upgrade_count_displayB = document.createElement("div");
app.append(upgrade_count_displayB);
const upgrade_buttonB = document.createElement("button");
upgrade_buttonB.textContent = "🎹";
app.append(upgrade_buttonB);
upgrade_buttonB.addEventListener("click", () => boughtUpgrade("Piano"));
upgrade_buttonB.disabled = true;

//Creates Upgrade C

const upgrade_count_displayC = document.createElement("div");
app.append(upgrade_count_displayC);
const upgrade_buttonC = document.createElement("button");
upgrade_buttonC.textContent = "🎸";
app.append(upgrade_buttonC);
upgrade_buttonC.addEventListener("click", () => boughtUpgrade("Guitar"));
upgrade_buttonC.disabled = true;


//Button Cost Checker
function updateDisplay(): void {
  counter.textContent = `Groove Garnered: ${Math.trunc(num_notes * 10) / 10}`;
  growth_rate_display.textContent = `Bandpower: ${Math.trunc(growth_rate * 10) / 10} Groove Per Second`;
  upgrade_count_displayA.textContent = updateUpgrades("Bell");
  upgrade_count_displayB.textContent = updateUpgrades("Piano");
  upgrade_count_displayC.textContent = updateUpgrades("Guitar");
  upgrade_buttonA.disabled = buttonEnableLogic("Bell");
  upgrade_buttonB.disabled = buttonEnableLogic("Piano");
  upgrade_buttonC.disabled = buttonEnableLogic("Guitar");
}

function updateUpgrades(name:string): string {
  for(const item of availableItems){
    if(name == item.name){
      return(`Num ${item.emoji}'s: ${Math.floor(item.num)} | Cost of ${item.emoji}:${Math.trunc(item.cost * 10) / 10}`)
    }
  }
  return("ERROR, no object found with that name");
}
function buttonEnableLogic(name:string): boolean{
  for(const item of availableItems){
    if(name == item.name){
      if(num_notes >= item.cost){
        return (false);
      }
      else{
        return (true);
      }
    }
  }
  return true;
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
