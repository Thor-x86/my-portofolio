/**
 *  This component adapts three.js to ReactJS for rendering a cube
**/

import React from 'react';

import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls';

/**
 *  Move things gracefully
 *  
 *  @param {number} from
 *  @param {number} to
 *  @param {number} [factor]
 */
function lerp(from, to, factor = 8) {
  return from + ((to - from) / factor);
}

/**
 *  @typedef {object} Props : Anything you can put to this component
 *  
 *  @property {string} className
 *  @property {number} pitch
 *  @property {number} yaw
 *  @property {number} roll
 *  
 *  @extends {React.Component<Props>}
 */
class ThreeScene extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.isDragging = false;

    this.handleResize = this.handleResize.bind(this);
    this.handleDragging = this.handleDragging.bind(this);
    this.handleDragged = this.handleDragged.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: '#43a047' });
    const cube = new THREE.Mesh(geometry, material);

    const light = new THREE.PointLight('#ffffff', 2);
    light.position.set(8, 8, 8);

    camera.position.z = 2;
    camera.position.y = 0.25;
    scene.add(cube);
    scene.add(light);
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    this.controls = new DragControls([cube], camera, renderer.domElement);

    this.renderer.domElement.oncontextmenu = (() => {return false;});
    this.mount.appendChild(this.renderer.domElement);
    this.start();

    window.addEventListener('resize', this.handleResize);
    this.renderer.domElement.addEventListener('pointerdown', this.handleDragging);
    window.addEventListener('pointerup', this.handleDragged);
  }

  componentWillUnmount() {
    this.renderer.domElement.removeEventListener('pointerdown', this.handleDragging);
    window.removeEventListener('pointerup', this.handleDragged);
    window.removeEventListener('resize', this.handleResize);
    this.stop();
    this.controls.dispose();
    this.renderer.dispose();
    this.mount.removeChild(this.renderer.domElement);
  }

  handleResize() {
    const width = this.mount.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  handleDragging() {
    this.isDragging = true;
  }

  handleDragged() {
    this.isDragging = false;
  }

  start() {
    if (!this.frameId) {
      this.controls.activate();
      this.frameId = requestAnimationFrame(this.update);
    }
  }

  update() {
    this.cube.rotation.x += this.props.pitch || 0;
    this.cube.rotation.y += this.props.yaw || 0;
    this.cube.rotation.z += this.props.roll || 0;

    if(!this.isDragging) {
      this.cube.position.x = lerp(this.cube.position.x, 0);
      this.cube.position.y = lerp(this.cube.position.y, 0);
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.update);
  }

  stop() {
    this.controls.deactivate();
    cancelAnimationFrame(this.frameId);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        className={this.props.className || ""}
        ref={(mount) => { this.mount = mount }}
      />
    );
  }
}

export default ThreeScene;