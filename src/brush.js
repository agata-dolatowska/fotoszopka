export default class Brush {
    constructor(canvasContext, canvas, settings) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
        // this.settings = settings;
        // this.context.strokeStyle = this.settings.strokeColor;
        // this.context.lineWidth = this.settings.strokeWidth;
    }

    startDrawing(event) {
        let beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
        let beginDrawY = event.clientY - this.canvasHtml.offsetTop;

        this.context.moveTo(beginDrawX, beginDrawY);
        this.context.beginPath();
    }

    continueDrawing(event) {
        console.log(this.context.lineWidth);
        this.context.lineTo(event.clientX - this.canvasHtml.offsetLeft, event.clientY - this.canvasHtml.offsetTop);
        this.context.stroke();
    }
}