import { AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import * as THREE from 'three';

interface StatData {
  label: string;
  value: number;
  segments: number;
  color: number;
}

@Component({
  selector: 'app-interactive-stats',
  standalone: true,
  templateUrl: './interactive-stats.component.html',
  styleUrl: './interactive-stats.component.css'
})
export class InteractiveStatsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('threeCanvas', { read: ElementRef }) threeCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  readonly statsData: StatData[] = [
    { label: 'Campaigns', value: 12.45, segments: 8, color: 0xff4169 },
    { label: 'ROI %', value: 248, segments: 10, color: 0x147ba5 },
    { label: 'Reach M', value: 1.56, segments: 12, color: 0xff4f8d },
    { label: 'Active', value: 78, segments: 6, color: 0x206ba5 }
  ];

  private scenes3D: Array<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    barGroup: THREE.Group;
    animationId: number;
    rect: DOMRect;
    mouseX: number;
    mouseY: number;
  }> = [];

  private readonly ngZone = inject(NgZone);

  ngAfterViewInit(): void {
    this.threeCanvases.changes.subscribe(() => this.initThree());
    setTimeout(() => this.initThree(), 100);
  }

  ngOnDestroy(): void {
    this.scenes3D.forEach(c => cancelAnimationFrame(c.animationId));
  }

  private initThree(): void {
    this.scenes3D.forEach(c => cancelAnimationFrame(c.animationId));
    this.scenes3D = [];

    this.threeCanvases.forEach((ref, index) => {
      const canvas = ref.nativeElement as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.width, canvas.height);
      renderer.setPixelRatio(window.devicePixelRatio);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 100);
      camera.position.set(0, 0, 8);

      const data = this.statsData[index % this.statsData.length];

      const barGroup = new THREE.Group();

      // Graph bars
      for (let i = 0; i < data.segments; i++) {
        const height = (i / data.segments) * data.value * 0.02;
        const geometry = new THREE.BoxGeometry(0.12, height, 0.12);
        const hue = data.color === 0xff4169 || data.color === 0xff4f8d ? 0 : 0.6;
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(hue + i * 0.02, 0.8, 0.6),
          shininess: 120
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set((i - data.segments / 2) * 0.2, height / 2, 0);
        barGroup.add(bar);
      }

      // Statues on top
      const statueGeometry = new THREE.ConeGeometry(0.15, 0.6, 4);
      const statueMaterial = new THREE.MeshPhongMaterial({ color: data.color, shininess: 200 });
      const statue = new THREE.Mesh(statueGeometry, statueMaterial);
      statue.position.y = data.value * 0.02 + 0.4;
      barGroup.add(statue);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 5);
      scene.add(ambientLight, directionalLight, barGroup);

      const sceneData = { renderer, scene, camera, barGroup, animationId: 0, rect, mouseX: 0, mouseY: 0 };
      this.scenes3D.push(sceneData);

      this.animate(sceneData, index);
    });
  }

  private animate(sceneData: any, index: number): void {
    const tick = () => {
      const rect = sceneData.renderer.domElement.getBoundingClientRect();
      const relativeMouseX = sceneData.mouseX * 2 - 1;
      const relativeMouseY = sceneData.mouseY * 2 - 1;

      // Group tilt
      sceneData.barGroup.rotation.y = THREE.MathUtils.lerp(sceneData.barGroup.rotation.y, relativeMouseX * 0.3, 0.12);
      sceneData.barGroup.rotation.x = THREE.MathUtils.lerp(sceneData.barGroup.rotation.x, relativeMouseY * 0.3, 0.12);

      // Animate bars - wave
      const time = Date.now() * 0.002;
      sceneData.barGroup.children.forEach((bar: THREE.Mesh, i: number) => {
        if (bar.geometry.type === 'BoxGeometry') {
          bar.scale.y = 1 + Math.sin(time + i * 0.5) * 0.1;
          bar.rotation.z = Math.sin(time * 1.5 + i) * 0.1;
        }
      });

      // Statue glow pulse
      sceneData.barGroup.children.find((child: THREE.Mesh) => child.geometry.type === 'ConeGeometry')?.scale.setScalar(1 + Math.sin(time * 3) * 0.05);

      sceneData.camera.aspect = rect.width / rect.height;
      sceneData.camera.updateProjectionMatrix();

      sceneData.renderer.setSize(rect.width * window.devicePixelRatio, rect.height * window.devicePixelRatio);
      sceneData.renderer.render(sceneData.scene, sceneData.camera);

      sceneData.animationId = requestAnimationFrame(() => this.animate(sceneData, index));
    };
    tick();
  }

  onCanvasMouseMove(index: number, event: MouseEvent): void {
    const rect = this.threeCanvases.get(index)?.nativeElement.getBoundingClientRect();
    if (rect) {
      const sceneData = this.scenes3D[index];
      sceneData.mouseX = ((event.clientX - rect.left) / rect.width);
      sceneData.mouseY = 1 - ((event.clientY - rect.top) / rect.height);
    }
  }
}
