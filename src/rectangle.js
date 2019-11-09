export default class Rectangle {
    constructor(canvasContext, canvas, event) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
        this.e = event;
        this.canvasCopy;
        this.strokeColor = '#000000';
        this.strokeWidth = 10;
        this.beginDrawX;
        this.beginDrawY;
        this.startDrawing = this.startRectangle;
    }

    startRectangle() {
        console.log("rectangle start");
        this.canvasCopy = this.context.getImageData(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.beginDrawX = this.e.clientX - this.canvasHtml.offsetLeft;
        this.beginDrawY = this.e.clientY - this.canvasHtml.offsetTop;
    }

    continueRectangle(event) {
        this.e = event;
        this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.context.putImageData(this.canvasCopy, 0, 0);
        let currentWidth = (this.e.clientX - this.canvasHtml.offsetLeft) - this.beginDrawX;
        let currentHeight = (this.e.clientY - this.canvasHtml.offsetTop) - this.beginDrawY;
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