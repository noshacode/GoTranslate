import { EXTRA_PAGE_ID } from "./constants.js";

export const createVideoElement = (videoId) => {
	const videoElement = document.createElement("div");

	videoElement.innerHTML = String.raw`
	<h1 id="h1">GoTranslate</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
	return videoElement;
};

// button in html
export const createNavigateButton = (videoId) => {
	const navButton = document.createElement("div");
	navButton.innerHTML = String.raw`
    <button id=${EXTRA_PAGE_ID} class="button" data-videoid=${videoId}>Info</button>
    `;
	return navButton;
};

// click button
export function addNavButton() {
	const navButton = document.getElementById(EXTRA_PAGE_ID);
	navButton.addEventListener("click", (e) => {
		const videoId = e.target.getAttribute("data-videoid");
		newPageForVideo(videoId);
	});
}
//function empty the page and append video to main
export function newPageForVideo(videoId) {
	const main = document.querySelector("main");
	main.innerHTML = "";
	main.appendChild(createVideoElement(videoId));
}
