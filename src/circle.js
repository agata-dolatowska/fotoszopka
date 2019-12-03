export default class Circle {
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
    this.e = event;
    this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
    this.context.putImageData(this.canvasCopy, 0, 0);
    this.context.beginPath();
    const currentWidth =
      this.e.clientX - this.canvasHtml.offsetLeft - this.beginDrawX;
    const currentHeight =
      this.e.clientY - this.canvasHtml.offsetTop - this.beginDrawY;
    this.context.arc(
      this.beginDrawX,
      this.beginDrawY,
      Math.sqrt(Math.pow(currentWidth, 2) + Math.pow(currentHeight, 2)),
      0,
      Math.PI * 2,
      true
    );
    if (!document.querySelector("#stroke-disabled").checked) {
      this.context.stroke();
    }
    if (!document.querySelector("#fill-disabled").checked) {
      this.context.fill();
    }
    if (!document.querySelector("#fill-gradient-disabled").checked) {
      const currentWidth =
        this.e.clientX - this.canvasHtml.offsetLeft - this.beginDrawX;
      const gradient = this.context.createRadialGradient(
        this.beginDrawX,
        this.beginDrawY,
        Math.sqrt(Math.pow(currentWidth, 2)) / 5,
        this.beginDrawX,
        this.beginDrawY,
        Math.sqrt(Math.pow(currentWidth, 2))
      );
      gradient.addColorStop(0, this.context.gradientBaseColor);
      gradient.addColorStop(1, this.context.gradientColor);
      this.context.fillStyle = gradient;
      this.context.fill();
    }
  }
}
