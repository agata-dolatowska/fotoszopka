import settings from "./drawingSettings";

export default class Rectangle {
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
        let currentWidth = (event.clientX - this.canvasHtml.offsetLeft) - this.beginDrawX;
        let currentHeight = (event.clientY - this.canvasHtml.offsetTop) - this.beginDrawY;
        // if (!strokeDisabled.checked) {
        this.context.lineWidth = this.strokeWidth;
        this.context.strokeStyle = this.strokeColor;
        this.context.strokeRect(
            this.beginDrawX,
            this.beginDrawY,
            currentWidth,
            currentHeight);
        // }
        // if (!document.querySelector("#fill-disabled").checked) {
        // this.context.fillStyle = fillColor;
        // this.context.fillRect(
        //     this.beginDrawX,
        //     this.beginDrawY,
        //     currentWidth,
        //     currentHeight);
        // }
        // if (!document.querySelector("#gradient-disabled").checked) {
        // let gradient = this.context.createLinearGradient(
        //     this.beginDrawX,
        //     this.beginDrawY,
        //     (this.e.clientX - this.canvasHtml.offsetLeft),
        //     (this.e.clientY - this.canvasHtml.offsetTop));
        // gradient.addColorStop(0, fillColor);
        // gradient.addColorStop(1, gradientColor);
        // this.context.fillStyle = gradient;
        // this.context.fillRect(
        //     this.beginDrawX,
        //     this.beginDrawY,
        //     currentWidth,
        //     currentHeight);
        // }
    }
}