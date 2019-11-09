export default class Line {
    constructor(canvasContext, canvas, event) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
        this.e = event;
        this.canvasCopy;
        this.strokeColor = '#000000';
        this.strokeWidth = 10;
        this.beginDrawX;
        this.beginDrawY;
        this.startDrawing = this.startLine;
    }

    startLine() {
        this.canvasCopy = this.context.getImageData(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.beginDrawX = this.e.clientX - this.canvasHtml.offsetLeft;
        this.beginDrawY = this.e.clientY - this.canvasHtml.offsetTop;
    }

    continueLine(event) {
        this.e = event;
        this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.context.putImageData(this.canvasCopy, 0, 0);
        this.context.strokeStyle = this.strokeColor;
        this.context.lineWidth = this.strokeWidth;
        this.context.beginPath();
        this.context.moveTo(this.beginDrawX, this.beginDrawY);
        this.context.lineTo((this.e.clientX - this.canvasHtml.offsetLeft), (this.e.clientY - this.canvasHtml.offsetTop));
        this.context.stroke();
    }
}