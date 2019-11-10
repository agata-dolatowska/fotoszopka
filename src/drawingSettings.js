export default class drawingSettings {
    constructor() {
        this.renderSettings = this.renderSettings();
        this.brushType = document.querySelector('.menu-brush .active').dataset.brush;
        this.fillColor = document.querySelector('#fill').value;
        this.strokeColor = document.querySelector('#stroke').value;
        this.strokeWidth = document.querySelector('#stroke-width').value;
        this.gradientColor = document.querySelector('#fill-gradient').value;
        document.querySelector('.menu-brush').addEventListener('click', e => this.setBrushType(e));
        document.querySelector('#fill').addEventListener('input', () => this.setFillColor());
        document.querySelector('#stroke').addEventListener('input', () => this.setStrokeColor());
        document.querySelector('#stroke-width').addEventListener('input', e => this.setStrokeWidth(e));
        document.querySelector('#fill-gradient').addEventListener('input', e => this.setGradientColor(e));
    }

    setBrushType(event) {
        document.querySelector('.menu-brush .active').classList.remove('active');
        event.target.classList.add('active');
        this.brushType = document.querySelector('.menu-brush .active').dataset.brush;
    }

    setFillColor() {
        this.fillColor = document.querySelector('#fill').value;
    }

    setStrokeColor() {
        this.strokeColor = document.querySelector('#stroke').value;
        console.log(this.strokeColor);
    }

    setStrokeWidth(e) {
        this.strokeWidth = e.target.value;
        console.log(this.strokeWidth);
    }

    setGradientColor() {
        this.gradientColor = document.querySelector('#fill-gradient').value;
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
// const settings = new drawingSettings();
// export default settings;