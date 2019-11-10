export default class Circle {
    constructor(canvasContext, canvas) {
        this.canvasHtml = canvas;
        this.context = canvasContext;
    }

    startDrawing(event) {
        console.log("kółko start");
        this.canvasCopy = this.context.getImageData(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.beginDrawX = event.clientX - this.canvasHtml.offsetLeft;
        this.beginDrawY = event.clientY - this.canvasHtml.offsetTop;
    }

    continueDrawing(event) {
        console.log("kółko rysu rysu");
        this.e = event;
        this.context.clearRect(0, 0, this.canvasHtml.width, this.canvasHtml.height);
        this.context.putImageData(this.canvasCopy, 0, 0);
        this.context.beginPath();
        let currentWidth = (this.e.clientX - this.canvasHtml.offsetLeft) - this.beginDrawX;
        let currentHeight = (this.e.clientY - this.canvasHtml.offsetTop) - this.beginDrawY;
        this.context.arc(
            this.beginDrawX,
            this.beginDrawY,
            Math.sqrt(Math.pow(currentWidth, 2) + Math.pow(currentHeight, 2)),
            0,
            Math.PI * 2,
            true);
        // if (!strokeDisabled.checked) {
        this.context.strokeStyle = this.strokeColor;
        this.context.lineWidth = this.strokeWidth;
        this.context.stroke();
        // }
        // if (!document.querySelector("#fill-disabled").checked) {
        //     this.context.fillStyle = fillColor;
        //     this.context.fill();
        // }
        // if (!document.querySelector("#gradient-disabled").checked) {
        //     var gradient = context.createRadialGradient(
        //         this.beginDrawX,
        //         this.beginDrawY,
        //         Math.sqrt(Math.pow(this.currentWidth, 2)) / 5,
        //         this.beginDrawX,
        //         this.beginDrawY,
        //         Math.sqrt(Math.pow(this.currentWidth, 2)));
        //     gradient.addColorStop(0, fillColor);
        //     gradient.addColorStop(1, gradientColor);
        //     this.context.fillStyle = gradient;
        //     this.context.fill();
        // }
    }
}