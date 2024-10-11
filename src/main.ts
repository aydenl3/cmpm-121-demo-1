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

//Incrementers
let num_notes: number = 0;
function incrementNotes(amt: number): void {
  num_notes += amt;
  counter.textContent = `Notes Played: ${num_notes}`;
}

function incrementGrowthRate(amt: number, cost: number): void {
  num_notes -= cost;
  growth_rate += amt;
}

//Creates Counter
const counter = document.createElement("div");
app.append(counter);

//Creates Upgrade Button
const upgrade_button1 = document.createElement("button");
upgrade_button1.textContent = "🎸";
app.append(upgrade_button1);
upgrade_button1.addEventListener("click", () => incrementGrowthRate(1,10));
upgrade_button1.disabled = true;


//Auto-Clicker Logic
let start_time = performance.now();
let cache: number = 0;
let growth_rate:number = 0;
requestAnimationFrame(animate);
function animate(): void {
  cache += performance.now() - start_time;
  if (cache >= 1000) {
    cache -= 1000;
    incrementNotes(growth_rate);
  }
  start_time = performance.now();
  if(num_notes >= 10){
    upgrade_button1.disabled = false;
  }
  else{
    upgrade_button1.disabled = true;
  }
  requestAnimationFrame(animate);
  //console.log(cache);
}
