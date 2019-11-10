import Brush from "./brush";
import Line from "./line";
import Rectangle from './rectangle';
import Circle from './circle';
import drawingSettings from './drawingSettings';

export default class Canvas {
    constructor() {
        this.renderCanvas = this.renderCanvas();
        this.canvasHtml = document.querySelector('.canvas');
        this.canvasHtml.width = window.innerWidth;
        this.canvasHtml.height = window.innerHeight;
        this.context = this.canvasHtml.getContext('2d');
        this.settings = new drawingSettings();
        this.canvasHtml.addEventListener('mousedown', e => this.startDrawing(e));
        this.canvasHtml.addEventListener('mousemove', e => this.continueDrawing(e));
        this.canvasHtml.addEventListener('mouseup', e => this.finishDrawing(e));

        this.brushTypes = {
            'brush': new Brush(this.context, this.canvasHtml, this.settings),
            'line': new Line(this.context, this.canvasHtml, this.settings),
            'rectangle': new Rectangle(this.context, this.canvasHtml, this.settings),
            'circle': new Circle(this.context, this.canvasHtml, this.settings)
        };

        this.drawingHistory = [];
        this.canDraw = false;
    }

    startDrawing(e) {
        this.canDraw = true;
        this.brushTypes[this.settings.brushType].startDrawing(e);
    }

    continueDrawing(e) {
        if (this.canDraw) {
            this.brushTypes[this.settings.brushType].continueDrawing(e);
        }
    }

    finishDrawing(e) {
        if (this.canDraw) {
            this.context.closePath();
        }
        this.canDraw = false;
    }

    renderCanvas() {
        const html = '<canvas class="canvas"></canvas>'
        document.querySelector("body").insertAdjacentHTML('beforeend', html);
    }
}