export default class drawingSettings {
  constructor(context, canvas) {
    this.context = context;
    this.canvasHtml = canvas;
    this.renderSettings();
    this.brushType = document.querySelector(
      ".menu-brush .active"
    ).dataset.brush;
    this.optionsAvailability();
    this.setGradientColor();
    this.setFillColor();
    document
      .querySelector(".menu-brush")
      .addEventListener("click", e => this.setBrushType(e));
    document
      .querySelector("#fill")
      .addEventListener("input", () => this.setFillColor());
    document
      .querySelector("#stroke")
      .addEventListener("input", () => this.setStrokeColor());
    document
      .querySelector("#stroke-width")
      .addEventListener("input", () => this.setStrokeWidth());
    document
      .querySelector("#fill-gradient")
      .addEventListener("input", () => this.setGradientColor());
    document
      .querySelector(".clear")
      .addEventListener("click", () => this.clearCanvas());
    document
      .querySelector(".undo")
      .addEventListener("click", () => this.undoDrawing());
    this.drawingHistory = [];
  }

  setBrushType(event) {
    document.querySelector(".menu-brush .active").classList.remove("active");
    event.target.classList.add("active");
    this.brushType = document.querySelector(
      ".menu-brush .active"
    ).dataset.brush;
    this.optionsAvailability();
  }

  optionsAvailability() {
    if (this.brushType == "brush" || this.brushType == "line") {
      document.querySelector("#fill-disabled").disabled = true;
      document.querySelector("#gradient-disabled").disabled = true;
      document.querySelector("#fill-disabled").checked = true;
      document.querySelector("#gradient-disabled").checked = true;
      document.querySelector("#stroke-disabled").disabled = true;
    } else {
      document.querySelector("#fill-disabled").disabled = false;
      document.querySelector("#gradient-disabled").disabled = false;
      document.querySelector("#stroke-disabled").disabled = false;
    }
  }

  setFillColor() {
    this.context.fillStyle = document.querySelector("#fill").value;
    this.context.gradientBaseColor = document.querySelector("#fill").value;
  }

  setStrokeColor() {
    this.context.strokeStyle = document.querySelector("#stroke").value;
  }

  setStrokeWidth() {
    this.context.lineWidth = document.querySelector("#stroke-width").value;
  }

  setGradientColor() {
    this.context.gradientColor = document.querySelector("#fill-gradient").value;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
  }

  undoDrawing() {
    if (this.drawingHistory.length > 1) {
      this.context.clearRect(
        0,
        0,
        this.canvasHtml.width,
        this.canvasHtml.height
      );
      this.context.putImageData(
        this.drawingHistory[this.drawingHistory.length - 2],
        0,
        0
      );
      this.drawingHistory.pop();
    }
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
                <label for='fill'>main fill color</label>
                <input type='color' id='fill' value='#ff0000'>
                <label><input type='checkbox' id='fill-disabled' checked='true'>no fill</label>

                <label for='fill-gradient'>| gradient color</label>
                <input type='color' id='fill-gradient' value='#00ff00'>
                <label><input type='checkbox' id='gradient-disabled' checked='true'>no gradient</label>

                <label for='stroke'>| stroke</label>
                <input type='color' id='stroke' value='#000000'>
                <label><input type='checkbox' id='stroke-disabled'>no stroke</label>
                <input type='range' name='points' value='3' min='1' max='10' id='stroke-width'>stroke width
            </div>
            <button class='undo'>undo</button>
            <button class='clear'>clear</button>
        </div>
        `;
    document.querySelector("body").insertAdjacentHTML("afterbegin", html);
  }
}
