export const createTranslateView = () => {
	const container = document.createElement("div");

	container.innerHTML = String.raw`
        <h1 id="h1">GoTranslate</h1>
        <div class="container">
            <textarea class="textForm text" placeholder=" Enter text" maxlength="450"></textarea>
            <textarea class="textTo text" placeholder=" Translation" disabled></textarea>
        </div>
        <div id="error"></div>
        <div class="button-container">
            <select class="select button">
                <option value="nl">Dutch</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="minion">Minions</option>
                <option value="pirate">Pirates</option>
            </select>
            <button class="translateBtn button">Translate</button>
            <button class="micro button"><img src="./images/sound.svg" alt="sounds" class="soundicon"></button>
            <div id="extraInfoBtn"></div>
            
        </div>
    `;
	return container;
};
