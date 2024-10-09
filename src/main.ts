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

//Creates Counter
let num_notes:number = 0;
button.addEventListener('click', (Increment: MouseEvent) => {
    console.log(Increment); // This logs the event object
    console.log('Notes Played!');
    num_notes++;
    counter.textContent = `Notes Played: ${num_notes}`;
  });
const counter = document.createElement("div");
app.append(counter);