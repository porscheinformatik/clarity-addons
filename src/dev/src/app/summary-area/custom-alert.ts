import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'my-custom-alert',
  template: `
    <div class="fireworks-alert">
      <canvas #fireworksCanvas width="300" height="150" style="background:#222;display:block;margin:10px auto"></canvas>
      <button type="button" class="btn" (click)="onClose()">Close</button>
    </div>
  `,
  styles: [
    `
      .fireworks-alert {
        padding: 16px;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class CustomAlert implements AfterViewInit {
  @Output() hide = new EventEmitter<void>();

  @ViewChild('fireworksCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  particles: any[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.launchFirework();
    this.animate();
  }

  onClose() {
    this.hide.emit();
  }

  launchFirework() {
    const x = Math.random() * 300;
    const y = 75 + Math.random() * 30;
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * (1.5 + Math.random() * 1.5),
        vy: Math.sin(angle) * (1.5 + Math.random() * 1.5),
        alpha: 1,
        color: `hsl(${Math.random() * 360},100%,50%)`,
      });
    }
    setTimeout(() => this.launchFirework(), 1200 + Math.random() * 800);
  }

  animate() {
    this.ctx.clearRect(0, 0, 300, 150);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.alpha -= 0.01;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
    requestAnimationFrame(() => this.animate());
  }
}
