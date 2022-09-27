export const createTranslateView = () => {
	const container = document.createElement("div");

	container.innerHTML = String.raw`
    <h1>GoTranslate<h1/>
        <div id="error"></div>
        <div class="container">
      
            <textarea class="textForm" placeholder=" Enter text" maxlength="450"></textarea>
            <textarea class="textTo" placeholder=" Translation" disabled></textarea>
        </div>
        <div class="button-container">
            <select class="select">
                <option value="nl">Dutch</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="minion">Minions</option>
                <option value="pirate">Pirates</option>
            </select>
            <button class="button">Translate</button>
            <button class="micro"><img src="./images/sound.svg" alt="sounds" class="soundicon"></button>
            <div id="tryb"></div>
        </div>
       
    `;
	return container;
};
