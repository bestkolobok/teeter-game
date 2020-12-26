export { default as Teeter } from '../../components/Teeter.vue'

export const LazyTeeter = import('../../components/Teeter.vue' /* webpackChunkName: "components/Teeter" */).then(c => c.default || c)
