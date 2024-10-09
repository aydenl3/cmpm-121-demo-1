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
function incrementNotes(): void {
    num_notes++;
    counter.textContent = `Notes Played: ${num_notes}`;
}

//Creates Counter
button.addEventListener("click",incrementNotes);
const counter = document.createElement("div");
app.append(counter);

//Auto-Clicker Logic
setInterval(incrementNotes,1000);