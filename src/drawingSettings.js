export default class drawingSettings {
  constructor(context, canvas) {
    this.context = context;
    this.canvasHtml = canvas;
    this.brushType = "brush";
    this.renderSettings();
    this.optionsAvailability();
    this.setValues();
    document
      .querySelector(".clear")
      .addEventListener("click", () => this.clearCanvas());
    document
      .querySelector(".undo")
      .addEventListener("click", () => this.undoDrawing());
    this.drawingHistory = [];
  }

  setBrushType(event) {
    this.lastTool = document.querySelector(".menu-brush .active").dataset.brush;
    if (this.lastTool == "color-picker") {
      this.canvasHtml.removeEventListener("mousemove", this.pickerPreviewEvent);
      this.canvasHtml.removeEventListener("click", this.pickerSaveEvent);
    }
    document.querySelector(".menu-brush .active").classList.remove("active");
    event.target.classList.add("active");
    this.brushType = document.querySelector(
      ".menu-brush .active"
    ).dataset.brush;
    if (this.brushType == "color-picker") {
      this.getColorFromCanvas();
    }

    this.optionsAvailability();
  }

  setEraserWidth(eraserWidthInput) {
    this.context.eraserWidth = eraserWidthInput.value;
  }

  optionsAvailability() {
    this.brushOpts = {
      brush: [
        ["fill-disabled", true],
        ["fill-gradient-disabled", true],
        ["stroke-disabled", false]
      ],
      line: [
        ["fill-disabled", true],
        ["fill-gradient-disabled", true],
        ["stroke-disabled", false]
      ],
      circle: [
        ["fill-disabled", false],
        ["fill-gradient-disabled", false],
        ["stroke-disabled", false]
      ],
      circle: [
        ["fill-disabled", false],
        ["fill-gradient-disabled", false],
        ["stroke-disabled", false]
      ],
      rectangle: [
        ["fill-disabled", false],
        ["fill-gradient-disabled", false],
        ["stroke-disabled", false]
      ],
      text: [
        ["fill-disabled", false],
        ["fill-gradient-disabled", true],
        ["stroke-disabled", true]
      ]
    };
    for (let y in this.brushOpts[this.brushType]) {
      document.querySelector(
        "#" + this.brushOpts[this.brushType][y][0]
      ).checked = this.brushOpts[this.brushType][y][1];
    }
  }

  setValues() {
    this.brushType = document.querySelector(
      ".menu-brush .active"
    ).dataset.brush;

    this.gradientInput = document.querySelector("#fill");
    this.fillInput = document.querySelector("#fill");
    this.setFillColor(this.fillInput);
    this.gradientInput = document.querySelector("#fill-gradient");
    this.setGradientColor(this.gradientInput);
    this.strokeWidthInput = document.querySelector("#stroke-width");
    this.setStrokeWidth(this.strokeWidthInput);
    this.strokeColorInput = document.querySelector("#stroke");
    this.setStrokeColor(this.strokeColorInput);
    this.eraserWidthInput = document.querySelector("#eraser-width");
    this.setEraserWidth(this.eraserWidthInput);

    document
      .querySelector(".menu-brush")
      .addEventListener("click", e => this.setBrushType(e));

    this.eraserWidthInput.addEventListener("input", e =>
      this.setEraserWidth(this.eraserWidthInput)
    );

    this.fillInput.addEventListener("input", e =>
      this.setFillColor(this.fillInput)
    );
    this.strokeColorInput.addEventListener("input", e =>
      this.setStrokeColor(this.strokeColorInput)
    );
    this.strokeWidthInput.addEventListener("input", e =>
      this.setStrokeWidth(this.strokeWidthInput)
    );
    this.gradientInput.addEventListener("input", e =>
      this.setGradientColor(this.gradientInput)
    );
  }

  setFillColor(fillInput) {
    this.context.fillStyle = fillInput.value;
    this.context.gradientBaseColor = fillInput.value;
  }

  setStrokeColor(strokeColorInput) {
    this.context.strokeStyle = strokeColorInput.value;
  }

  setStrokeWidth(strokeWidthInput) {
    this.context.lineWidth = strokeWidthInput.value;
  }

  setGradientColor(gradientInput) {
    this.context.gradientColor = gradientInput.value;
  }

  getColorFromCanvas() {
    this.pickerPreviewEvent = e => this.getColor(e);
    this.canvasHtml.addEventListener("mousemove", this.pickerPreviewEvent);

    this.pickerSaveEvent = () => this.saveColor();
    this.canvasHtml.addEventListener("click", this.pickerSaveEvent);
  }

  saveColor() {
    this.canvasHtml.removeEventListener("mousemove", this.pickerPreviewEvent);
  }

  getColor(e) {
    const color = this.context.getImageData(e.layerX, e.layerY, 1, 1).data;
    const colorArray = Array.prototype.slice.call(color);
    const rgbaElementsToHex = colorArray.map(rgbaEl =>
      rgbaEl.toString(16).length == 1
        ? "0" + rgbaEl.toString(16)
        : rgbaEl.toString(16)
    );
    const hexColor = `#${rgbaElementsToHex[0]}${rgbaElementsToHex[1]}${rgbaElementsToHex[2]}`;

    const allColorInputs = [
      ...document.querySelectorAll('input[type="checkbox"]:not(:checked)')
    ];
    const colorInputs = allColorInputs.map(
      colorInput =>
        (document.querySelector(
          `#${colorInput.id.replace("-disabled", "")}`
        ).value = hexColor)
    );
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
                <button data-brush='eraser'>Eraser</button>
                <button data-brush='text'>Text</button>
                <button data-brush='color-picker' id="color-picker">Color picker</button>
            </div>
            <div class='menu-colors'>
                <label for='fill'>main fill color</label>
                <input type='color' id='fill' value='#ff0000'>
                <label><input type='checkbox' id='fill-disabled'>no fill</label>

                <label for='fill-gradient'>| gradient color</label>
                <input type='color' id='fill-gradient' value='#00ff00'>
                <label><input type='checkbox' id='fill-gradient-disabled'>no gradient</label>

                <label for='stroke'>| stroke</label>
                <input type='color' id='stroke' value='#000000'>
                <label><input type='checkbox' id='stroke-disabled'>no stroke</label>
                <input type='range' value='3' min='1' max='10' id='stroke-width'>stroke width
                <input type='range' value='10' min='1' max='10' id='eraser-width'>eraser width

            </div>
            <button class='undo'>undo</button>
            <button class='clear'>clear</button>
        </div>
        `;
    document.querySelector("body").insertAdjacentHTML("afterbegin", html);
  }
}
