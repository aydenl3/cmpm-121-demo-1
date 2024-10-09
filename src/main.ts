import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing gameee";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
const button = document.createElement("button");
button.textContent = "🎷";
app.append(button);