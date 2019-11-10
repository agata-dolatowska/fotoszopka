import settings from "./drawingSettings";

export default class Line {
    constructor(canvasContext, canvas) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
        this.strokeColor = settings.strokeColor;
        this.strokeWidth = settings.strokeWidth;
    }

    startDrawing(event) {
        this.canvasCopy = this.context.getImageData(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
        this.beginDrawY = event.clientY - this.canvasHtml.offsetTop;
    }

    continueDrawing(event) {
        this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.context.putImageData(this.canvasCopy, 0, 0);
        this.context.strokeStyle = this.strokeColor;
        this.context.lineWidth = this.strokeWidth;
        this.context.beginPath();
        this.context.moveTo(this.beginDrawX, this.beginDrawY);
        this.context.lineTo((event.clientX - this.canvasHtml.offsetLeft), (event.clientY - this.canvasHtml.offsetTop));
        this.context.stroke();
    }
}