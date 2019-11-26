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
      console.log("usuwaj :<");
      window.removeEventListener("keydown", this.typeText);
      this.eventActive = false;
    }
    window.addEventListener("keydown", e => this.typeText(e));
  }

  typeText(e) {
    this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
    this.context.putImageData(this.canvasCopy, 0, 0);
    this.typedText += e.key;
    this.context.fillText(this.typedText, this.beginDrawX, this.beginDrawY);
    this.eventActive = true;
  }

  continueDrawing() {}
}
