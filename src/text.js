export default class Text {
  constructor(canvasContext, canvas) {
    this.canvasHtml = canvas;
    this.context = canvasContext;
  }

  startDrawing(event) {
    this.typedText = "";
    this.beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
    this.beginDrawY = event.clientY - this.canvasHtml.offsetTop;
    this.canvasCopy = this.context.getImageData(
      0,
      0,
      this.canvasHtml.width,
      this.canvasHtml.height
    );
    if (this.eventActive) {
      window.removeEventListener("keydown", this.typeTextEvent);
      this.eventActive = false;
    }
    this.typeTextEvent = e => this.typeText(e);
    window.addEventListener("keydown", this.typeTextEvent);
  }

  typeText(e) {
    this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
    this.context.putImageData(this.canvasCopy, 0, 0);
    this.typedText += e.key;
    this.context.fillText(this.typedText, this.beginDrawX, this.beginDrawY);
    this.eventActive = true;
  }
}
