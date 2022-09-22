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

async function minionsTranslate(text, targetLanguage) {
	const data = await fetchData(``);

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
	const select = document.querySelector("select");
	const textTo = document.querySelector(".textTo");
	const translateBtn = document.querySelector(".button");
	const textForm = document.querySelector(".textForm");
	translateBtn.addEventListener("click", async () => {
		let text = textForm.value;
		let targetLanguage = select.value;

		if (textForm.value) {
			try {
				const translation = await fetchAndTranslate(text, targetLanguage);
				textTo.value = translation.responseData.translatedText;
			} catch (error) {
				renderError(error.message);
			}
		}else{
            renderError("YOU HAVE TO ENTER TEXT")
        }

		// console.log(translation.responseData["translatedText"])
		// const translation1 = await fetchAndTranslate(text,"fr");
		// textTo.value=translation1.responseData.translatedText

		// const translation2 = await fetchAndTranslate(text,"es");
		// textTo.value=translation2.responseData.translatedText
	});
	// button.addEventListener("change", async(e) => {
	//    textTo =e.target.value
	//     console.log(e.target.value)

	// });
}

window.addEventListener("load", main);
