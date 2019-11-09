import Brush from "./brush";
import Line from "./line";
import Rectangle from './rectangle';
import Circle from './circle';
import settings from './drawingSettings';

export default class Canvas {
    constructor() {
        this.renderCanvas = this.renderCanvas();
        this.canvasHtml = document.querySelector('.canvas');
        this.canvasHtml.width = window.innerWidth;
        this.canvasHtml.height = window.innerHeight;
        this.context = this.canvasHtml.getContext('2d');
        this.canvasHtml.addEventListener('mousedown', e => this.startDrawing(e));
        // this.canvasHtml.addEventListener('mousemove', e => this.continueDrawing(e));
        this.canvasHtml.addEventListener('mouseup', e => this.finishDrawing(e));

        this.brushTypes = {
            'brush': new Brush(this.context, this.canvasHtml, e),
            'line': new Line(this.context, this.canvasHtml, e),
            'rectangle': new Rectangle(this.context, this.canvasHtml, e),
            'circle': new Circle(this.context, this.canvasHtml, e)
        };
        this.drawingHistory = [];
        this.canDraw = false;
    }

    startDrawing(e) {
        this.canDraw = true;

        console.log(settings.brushType);
        this.brushTypes[settings.brushType].startDrawing();
    }

    continueDrawing(e) {
        // console.log(settings.brushType);
        if (this.canDraw) {
            const brushTypes = {
                'brush': () => this.brush.continueBrush,
                'line': () => this.line.continueLine,
                'rectangle': () => this.rectangle.continueRectangle,
                'circle': () => this.circle.continueCircle
            }
            brushTypes[settings.brushType];

            // switch (settings.brushType) {
            //     case 'brush':
            //         this.brush.continueBrush(e);
            //         break;
            //     case 'line':
            //         this.line.continueLine(e);
            //         break;
            //     case 'rectangle':
            //         this.rectangle.continueRectangle(e);
            //         break;
            //     case 'circle':
            //         this.circle.continueCircle(e);
            //         break;
            // }
        }
    }

    finishDrawing(e) {
        // console.log("koniec");
        this.canDraw = false;
        this.context.closePath();
    }

    renderCanvas() {
        const html = '<canvas class="canvas"></canvas>'
        document.querySelector("body").insertAdjacentHTML('beforeend', html);
    }
}