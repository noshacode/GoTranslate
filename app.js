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
    return data
}

function main() {
	let textTo = document.querySelector(".textTo");
	const translateBtn = document.querySelector(".button");
	let textForm = document.querySelector(".textForm");
	translateBtn.addEventListener("click", async() => {
		let text = textForm.value;
// let translation = textTo.value
		// console.log(translation);
        const translation = await fetchAndTranslate(text,"nl");
        textTo.value=translation.responseData.translatedText
        // console.log(translation.responseData["translatedText"])

	});

	
	
}

window.addEventListener("load", main);
