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

//Incrementer
let num_notes: number = 0;
function incrementNotes(amt: number): void {
  num_notes += amt;
  counter.textContent = `Notes Played: ${num_notes}`;
}

//Creates Counter
button.addEventListener("click", () => incrementNotes(1));
const counter = document.createElement("div");
app.append(counter);

//Auto-Clicker Logic
let start_time = performance.now();
let cache: number = 0;
requestAnimationFrame(animate);
function animate():void {
  cache += (performance.now() - start_time);
  if (cache >= 1000){
    cache -= 1000;
    incrementNotes(1);
  }
  start_time = performance.now();
  requestAnimationFrame(animate);
  //console.log(cache);
}
