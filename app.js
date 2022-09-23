import { PIRATE, MINION } from "./constants.js";

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

	console.log(data);
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
	// const h1 = document.createElement("h1");
	const errorDiv = document.querySelector("#error");
	errorDiv.textContent = error;
	// document.body.appendChild(h1);

	console.log(error);
}

function main() {
	let body = document.querySelector("body");
	const select = document.querySelector("select");
	const textTo = document.querySelector(".textTo");
	const translateBtn = document.querySelector(".button");
	const textForm = document.querySelector(".textForm");
	translateBtn.addEventListener("click", async () => {
		let text = textForm.value;
		let targetLanguage = select.value;

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
	select.addEventListener("change", async (e) => {
		//    textTo =e.target.value
		if (e.target.value == MINION) {
			document.body.classList.add("minion-mode");
			document.body.classList.remove("pirate-mode");
		} else if (e.target.value == PIRATE) {
			document.body.classList.add("pirate-mode");
			document.body.classList.remove("minion-mode");
		} else {
			document.body.classList.remove("minion-mode", "pirate-mode");
		}
	});
}

window.addEventListener("load", main);
