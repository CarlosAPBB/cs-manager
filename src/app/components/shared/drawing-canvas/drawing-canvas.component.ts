import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-drawing-canvas',
  standalone: true,
  imports: [
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.scss'
})
export class DrawingCanvasComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() imageSaved = new EventEmitter<string>();
  @Output() imageCleared = new EventEmitter<any>();
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 300;
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.closePath();
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.imageCleared.emit()
  }

  saveCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const imageUrl = canvas.toDataURL('image/png');
    this.imageSaved.emit(imageUrl);
  }
}
