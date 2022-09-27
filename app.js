import { PIRATE, MINION, EXTRA_PAGE_ID } from "./constants.js";
import { createTranslateView } from "./view.js";
import { createNavigateButton, addNavButton } from "./minions.js";

async function fetchData(url) {
	const response = await fetch(url);
	if (response.ok) {
		const parsedData = await response.json();
		return parsedData;
	}
	console.log("HTTP error", response.status);
}

async function fetchAndTranslate(text, targetLanguage) {
	const data = await fetchData(
		`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${targetLanguage}`
	);
	return data;
}

async function funnyTranslate(text, targetLanguage) {
	const data = await fetchData(
		`https://api.funtranslations.com/translate/${targetLanguage}.json?text=${text}`
	);

	console.log(data);
	return data;
}

function renderError(error) {
	const errorDiv = document.querySelector("#error");
	errorDiv.textContent = error;
}

function main() {
	const main = document.querySelector("main");
	main.appendChild(createTranslateView());

	const select = document.querySelector("select");
	const textTo = document.querySelector(".textTo");
	const translateBtn = document.querySelector(".button");
	const textForm = document.querySelector(".textForm");

	textForm.addEventListener("keyup", (e) => {
		if (e.target.value === "") {
			textTo.value = "";
		}
	});

	translateBtn.addEventListener("click", async () => {
		let text = textForm.value;
		let targetLanguage = select.value;
		textTo.value;

		if (textForm.value) {
			try {
				if (targetLanguage == MINION || targetLanguage == PIRATE) {
					const translation = await funnyTranslate(text, targetLanguage);
					textTo.value = translation.contents.translated;
				} else {
					const translation = await fetchAndTranslate(text, targetLanguage);
					textTo.value = translation.responseData.translatedText;
				}
			} catch (error) {
				renderError(error.message);
			}
		} else {
			renderError("YOU HAVE TO ENTER TEXT");
		}
	});
    const tryb = document.getElementById("tryb")
	select.addEventListener("change", async (e) => {
		document.body.classList.remove("minion-mode", "pirate-mode");
		tryb.innerHTML = "";

		if (e.target.value == MINION) {
			document.body.classList.add("minion-mode");
			tryb.appendChild(createNavigateButton("DLeBwgYXWgk"));
			addNavButton();
		} else if (e.target.value == PIRATE) {
			document.body.classList.add("pirate-mode");
			tryb.appendChild(createNavigateButton("knP4V8cY7W4"));
			addNavButton();
		}
	});

	const soundBtn = document.querySelector(".micro");
	soundBtn.addEventListener("click", (e) => {
		let sound = new SpeechSynthesisUtterance(textTo.value);
		sound.lang = e.target.value;
		speechSynthesis.speak(sound);
	});
}

window.addEventListener("load", main);
