export default class Rectangle {
  constructor(canvasContext, canvas) {
    this.canvasHtml = canvas;
    this.context = canvasContext;
  }

  startDrawing(event) {
    this.canvasCopy = this.context.getImageData(
      0,
      0,
      this.canvasHtml.width,
      this.canvasHtml.height
    );
    this.beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
    this.beginDrawY = event.clientY - this.canvasHtml.offsetTop;
  }

  continueDrawing(event) {
    this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
    this.context.putImageData(this.canvasCopy, 0, 0);
    const currentWidth =
      event.clientX - this.canvasHtml.offsetLeft - this.beginDrawX;
    const currentHeight =
      event.clientY - this.canvasHtml.offsetTop - this.beginDrawY;
    if (!document.querySelector("#stroke-disabled").checked) {
      this.context.strokeRect(
        this.beginDrawX,
        this.beginDrawY,
        currentWidth,
        currentHeight
      );
    }
    if (!document.querySelector("#fill-disabled").checked) {
      this.context.fillRect(
        this.beginDrawX,
        this.beginDrawY,
        currentWidth,
        currentHeight
      );
    }
    if (!document.querySelector("#fill-gradient-disabled").checked) {
      const gradient = this.context.createLinearGradient(
        this.beginDrawX,
        this.beginDrawY,
        event.clientX - this.canvasHtml.offsetLeft,
        event.clientY - this.canvasHtml.offsetTop
      );
      gradient.addColorStop(0, this.context.gradientBaseColor);
      gradient.addColorStop(1, this.context.gradientColor);
      this.context.fillStyle = gradient;
      this.context.fillRect(
        this.beginDrawX,
        this.beginDrawY,
        currentWidth,
        currentHeight
      );
    }
  }
}
