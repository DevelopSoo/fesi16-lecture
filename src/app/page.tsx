"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // 1. 장면 만들기
    // 촬영을 위한 세트장을 하나 만든다.
    // 카메라, 조명, 모델
    const scene = new THREE.Scene();

    // 5. 배경색 설정하기
    scene.background = new THREE.Color("#f0f0f0");

    // 2. canvas에 장면을 그리기
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    // 130: 시야각-> 클수록 더 넓은 범위를 볼 수 있다.
    // 1: 가로 세로 비율 -> 1:1 비율로 보여준다.
    const camera = new THREE.PerspectiveCamera(130, 1);
    camera.position.set(0, 0, 5);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    mainLight.position.set(0, 0, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    const controls = new OrbitControls(camera, canvasRef.current);
    // 관성 효과(부드러운 감속 효과)를 활성화 -> 마우스를 놓았을 때도 약간 더 부드럽게 움직임이 멈춤
    controls.enableDamping = true;
    // 관성 효과의 감쇠(저항) 정도를 설정 -> 값이 클수록 더 빨리 멈추고, 작을수록 더 천천히 멈춤
    controls.dampingFactor = 0.05;
    // false로 하면 일반적으로 3D 모델을 중심으로 회전/이동하게 됨
    // 우클릭 후 드래그하면 차이점을 알 수 있습니다.
    controls.screenSpacePanning = false;
    // 카메라가 모델(중심점)에서 얼마나 가까이 접근할 수 있는지 최소 거리를 설정
    controls.minDistance = 4;
    // 카메라가 모델(중심점)에서 얼마나 멀리 떨어질 수 있는지 최대 거리를 설정
    controls.maxDistance = 10;
    // 카메라가 위/아래로 회전할 수 있는 최대 각도를 설정 -> Math.PI(180도)이므로, 카메라가 모델의 아래쪽까지도 볼 수 있음
    controls.maxPolarAngle = Math.PI;

    // 3. 모델 불러오기
    const loader = new GLTFLoader();
    loader.load("/planet/scene.gltf", (gltf) => {
      scene.add(gltf.scene);

      function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      animate();
    });

    return () => {
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    // 모델을 보여줄 캔버스 만들기
    <div className="h-[500px] w-[500px]">
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}
