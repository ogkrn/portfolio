'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * NebulaEtherflow
 * - Mouse-driven liquid flow
 * - Galaxy stars distorted by fluid velocity
 * - Single file
 * - Three.js only
 * - Tailwind-ready
 * - SSR-safe (Next.js)
 */
export default function NebulaEtherflow() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const mouseActive = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    /* ---------------- Renderer ---------------- */
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    /* ---------------- Resize ---------------- */
    const resolution = new THREE.Vector3()
    const resize = () => {
      const w = mountRef.current!.clientWidth
      const h = mountRef.current!.clientHeight
      renderer.setSize(w, h)
      resolution.set(w, h, w / h)
    }
    resize()
    window.addEventListener('resize', resize)

    /* ---------------- Mouse ---------------- */
    const onMove = (e: MouseEvent) => {
      const r = mountRef.current!.getBoundingClientRect()
      mouse.current.set(
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height
      )
      mouseActive.current = 1
    }
    const onLeave = () => (mouseActive.current = 0)
    mountRef.current.addEventListener('mousemove', onMove)
    mountRef.current.addEventListener('mouseleave', onLeave)

    /* ---------------- Fluid Pass ---------------- */
    const SIM_SIZE = 256
    const velocityRT = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, {
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false
    })

    const fluidScene = new THREE.Scene()
    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: mouse.current },
        uActive: { value: 0 }
      },
      vertexShader: `
        void main(){ gl_Position = vec4(position,1.0); }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uActive;

        void main(){
          vec2 uv = gl_FragCoord.xy / ${SIM_SIZE.toFixed(1)};
          vec2 dir = uv - uMouse;
          float d = length(dir)+0.001;
          vec2 flow = normalize(dir) * 0.12 * uActive / d;

          flow += vec2(
            sin(uv.y*8.0 + uTime),
            cos(uv.x*8.0 + uTime)
          ) * 0.03;

          gl_FragColor = vec4(flow,0.0,1.0);
        }
      `
    })
    fluidScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fluidMaterial))

    /* ---------------- Galaxy ---------------- */
    const galaxyMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: resolution },
        uFlow: { value: velocityRT.texture }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = vec4(position,1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec3 uResolution;
        uniform sampler2D uFlow;
        varying vec2 vUv;

        float star(vec2 p){
          float d = length(p);
          return 0.02 / d;
        }

        void main(){
          vec2 uv = (vUv*uResolution.xy - 0.5*uResolution.xy)/uResolution.y;
          vec2 flow = texture2D(uFlow, vUv).xy;
          uv += flow;

          vec3 col = vec3(0.0);
          for(int i=0;i<4;i++){
            float depth = float(i)*0.25;
            vec2 p = fract(uv*(16.0-depth*10.0)+depth*120.0)-0.5;
            col += vec3(0.45,0.65,1.0)*star(p)*(1.0-depth);
          }

          float a = smoothstep(0.0,0.6,length(col));
          gl_FragColor = vec4(col,a);
        }
      `
    })
    const galaxy = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), galaxyMaterial)
    scene.add(galaxy)

    /* ---------------- Loop ---------------- */
    const clock = new THREE.Clock()
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const t = clock.getElapsedTime()

      mouseActive.current += (0 - mouseActive.current) * 0.05

      fluidMaterial.uniforms.uTime.value = t
      fluidMaterial.uniforms.uActive.value = mouseActive.current
      galaxyMaterial.uniforms.uTime.value = t

      renderer.setRenderTarget(velocityRT)
      renderer.render(fluidScene, camera)
      renderer.setRenderTarget(null)

      renderer.render(scene, camera)
    }
    loop()

    /* ---------------- Cleanup ---------------- */
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      mountRef.current?.removeEventListener('mousemove', onMove)
      mountRef.current?.removeEventListener('mouseleave', onLeave)
      velocityRT.dispose()
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    />
  )
}

/*
usage -- 

<LiquidEther ref={etherRef} />
{etherRef.current && (
  <GalaxyWithFluid
    flowTexture={etherRef.current.output.simulation.fbos.vel_0.texture}
  />
)}



*/