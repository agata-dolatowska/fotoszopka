export default class Brush {
  constructor(canvasContext, canvas) {
    this.canvasHtml = canvas;
    this.context = canvasContext;
  }

  startDrawing(event) {
    const beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
    const beginDrawY = event.clientY - this.canvasHtml.offsetTop;

    this.context.moveTo(beginDrawX, beginDrawY);
    this.context.beginPath();
  }

  continueDrawing(event) {
    this.context.lineTo(
      event.clientX - this.canvasHtml.offsetLeft,
      event.clientY - this.canvasHtml.offsetTop
    );
    this.context.stroke();
  }
}
