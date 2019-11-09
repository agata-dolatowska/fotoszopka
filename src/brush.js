import settings from './drawingSettings';
export default class Brush {
    constructor(canvasContext, canvas, event) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
        this.e = event;
        this.kupa = this.kupa();
        this.context.strokeStyle = settings.strokeColor;
        this.context.lineWidth = settings.strokeWidth;
        this.startDrawing = this.startBrush;
    }

    kupa() {
        // console.log(this.context);

    }

    startDrawing() {
        console.log("brush start");
        let beginDrawX = this.e.clientX - this.canvasHtml.offsetLeft;
        let beginDrawY = this.e.clientY - this.canvasHtml.offsetTop;
        this.context.moveTo(beginDrawX, beginDrawY);
        this.context.beginPath();
    }

    continueBrush(event) {
        // console.log(this.context.strokeStyle)
        console.log("brush rysu rusu");
        this.e = event;
        this.context.lineTo(this.e.clientX - this.canvasHtml.offsetLeft, this.e.clientY - this.canvasHtml.offsetTop);
        this.context.stroke();
    }
}