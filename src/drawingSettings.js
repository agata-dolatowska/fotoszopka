class drawingSettings {
    constructor() {
        this.renderSettings = this.renderSettings();
        this.brushType = document.querySelector('.menu-brush .active').dataset.brush;
        this.fillColor = document.querySelector('#fill').value;
        this.strokeColor = document.querySelector('#stroke').value;
        this.strokeWidth = document.querySelector('#stroke-width').value;
        this.gradientColor = document.querySelector('#fill-gradient').value;
        this.kupa = this.kupa();
    }
    kupa() {
        // console.log(this.brushType);
    }

    renderSettings() {
        const html = `
        <div class='settings'>
            <div class='menu-brush'>
                <button class='active' data-brush='brush'>Brush</button>
                <button data-brush='circle'>Circle</button>
                <button data-brush='rectangle'>Rectangle</button>
                <button data-brush='line'>Line</button>
            </div>
            <div class='menu-colors'>
                <label for="fill">main fill color</label>
                <input type="color" id="fill" value="#ff0000" disabled="true">
                <label><input type="checkbox" id="fill-disabled" checked="true" disabled="false">no fill</label>

                <label for="fill-gradient">| gradient color</label>
                <input type="color" id="fill-gradient" disabled="true" value="#00ff00">
                <label><input type="checkbox" id="gradient-disabled" checked="true" disabled="false">no gradient</label>

                <label for="stroke">| stroke</label>
                <input type="color" id="stroke" value="#000000">
                <label><input type="checkbox" id="stroke-disabled">no stroke</label>
                <input type="range" name="points" value="3" min="1" max="10" id="stroke-width">stroke width
            </div>
        </div>
        `;
        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    }
}
const settings = new drawingSettings();
export default settings;