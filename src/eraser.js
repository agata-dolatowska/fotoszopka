export default class Eraser {
  constructor(canvasContext, canvas) {
    this.canvasHtml = canvas;
    this.context = canvasContext;
  }

  startDrawing() {
    this.canvasCopy = this.context.getImageData(
      0,
      0,
      this.canvasHtml.width,
      this.canvasHtml.height
    );
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = "#FFFFFF";
    this.context.lineWidth = 1;
  }

  continueDrawing(event) {
    this.beginDrawX =
      event.clientX - this.canvasHtml.offsetLeft - this.context.eraserWidth / 2;
    this.beginDrawY =
      event.clientY - this.canvasHtml.offsetTop - this.context.eraserWidth / 2;

    this.context.fillRect(
      this.beginDrawX,
      this.beginDrawY,
      this.context.eraserWidth,
      this.context.eraserWidth
    );
  }
}
