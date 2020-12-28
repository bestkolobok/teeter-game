export { default as ControlsSection } from '../../components/ControlsSection.vue'
export { default as GameLayout } from '../../components/GameLayout.vue'
export { default as Modal } from '../../components/Modal.vue'
export { default as Shape } from '../../components/Shape.vue'
export { default as Teeter } from '../../components/Teeter.vue'

export const LazyControlsSection = import('../../components/ControlsSection.vue' /* webpackChunkName: "components/ControlsSection" */).then(c => c.default || c)
export const LazyGameLayout = import('../../components/GameLayout.vue' /* webpackChunkName: "components/GameLayout" */).then(c => c.default || c)
export const LazyModal = import('../../components/Modal.vue' /* webpackChunkName: "components/Modal" */).then(c => c.default || c)
export const LazyShape = import('../../components/Shape.vue' /* webpackChunkName: "components/Shape" */).then(c => c.default || c)
export const LazyTeeter = import('../../components/Teeter.vue' /* webpackChunkName: "components/Teeter" */).then(c => c.default || c)
