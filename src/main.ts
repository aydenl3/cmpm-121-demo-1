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
button.className = "circular-button";
app.append(button);
button.addEventListener("click", () => incrementNotes(1));

//Creates Counter
const counter = document.createElement("div");
app.append(counter);

//Creates GrowthRate Display
const growth_rate_display = document.createElement("div");
app.append(growth_rate_display);

interface Item {
  name: string;
  cost: number;
  rate: number;
  num: number;
  emoji: string;
  description: string;
  display: HTMLDivElement;
  button: HTMLButtonElement;
}
const dummydiv = document.createElement("div");
const dummybutton = document.createElement("button");
const MILLISECOND_PER_SECOND = 1000;
const ITEM_COST_GROWTH_RATE = 1.15;

const availableItems: Item[] = [
  {
    name: "Bell",
    cost: 10,
    rate: 0.1,
    num: 0,
    emoji: "🔔",
    description: "There's a reason you don't see these",
    display: dummydiv,
    button: dummybutton,
  },
  {
    name: "Piano",
    cost: 100,
    rate: 2,
    num: 0,
    emoji: "🎹",
    description: "Soft and soulful...",
    display: dummydiv,
    button: dummybutton,
  },
  {
    name: "Guitar",
    cost: 1000,
    rate: 50,
    num: 0,
    emoji: "🎸",
    description: "The foundation of any great band! (probably)",
    display: dummydiv,
    button: dummybutton,
  },
  {
    name: "Drum",
    cost: 5000,
    rate: 200,
    num: 0,
    emoji: "🥁",
    description: "Jam On!",
    display: dummydiv,
    button: dummybutton,
  },
  {
    name: "Mic",
    cost: 15000,
    rate: 1000,
    num: 0,
    emoji: "🎙️",
    description: "The ultimate human instrument",
    display: dummydiv,
    button: dummybutton,
  },
];

function makeButton(item: Item) {
  item.display = document.createElement("div");
  app.append(item.display);
  const description = document.createElement("div");
  description.textContent = item.description;
  app.append(description);
  item.button = document.createElement("button");
  item.button.textContent = item.emoji;
  app.append(item.button);
  item.button.addEventListener("click", () => boughtUpgrade(item));
  item.button.disabled = true;
}
for (const item of availableItems) {
  makeButton(item);
}

//Button Cost Checker
function updateDisplay(): void {
  counter.textContent = `Groove Garnered: ${Math.trunc(num_notes * 10) / 10}`;
  growth_rate_display.textContent = `Bandpower: ${Math.trunc(growth_rate * 10) / 10} Groove Per Second`;
  for (const item of availableItems) {
    item.display.textContent = updateUpgrades(item);
    item.button.disabled = buttonEnableLogic(item);
  }
}

function updateUpgrades(item: Item): string {
  return `Num ${item.emoji}'s: ${Math.floor(item.num)} | Cost of ${item.emoji}:${Math.trunc(item.cost * 10) / 10}`;
}
function buttonEnableLogic(item: Item): boolean {
  if (num_notes >= item.cost) {
    return false;
  } else {
    return true;
  }
}
//Incrementers
let num_notes: number = 0;
function incrementNotes(amt: number): void {
  num_notes += amt;
}

function incrementGrowthRate(amt: number, cost: number): void {
  num_notes -= cost;
  growth_rate += amt;
}
function boughtUpgrade(item: Item) {
  incrementGrowthRate(item.rate, item.cost);
  item.num++;
  item.cost *= ITEM_COST_GROWTH_RATE;
}

//Auto-Clicker Logic
let start_time = performance.now();
let ms_elapsed: number = 0;
let growth_rate: number = 0;
requestAnimationFrame(animate);
function animate(): void {
  ms_elapsed += performance.now() - start_time;
  if (ms_elapsed >= MILLISECOND_PER_SECOND) {
    ms_elapsed -= MILLISECOND_PER_SECOND;
    incrementNotes(growth_rate);
  }
  start_time = performance.now();
  updateDisplay();
  requestAnimationFrame(animate);
}
