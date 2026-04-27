/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'howler' {
  export class Howl {
    constructor(options: any)
    play(): number
    pause(id?: number): this
    stop(id?: number): this
    volume(id?: number, volume?: number): number | this
    fade(from: number, to: number, duration: number, id?: number): this
    loop(loop?: boolean): boolean | this
    state(): 'unloaded' | 'loading' | 'loaded'
    playing(id?: number): boolean
    duration(id?: number): number
  }
  export default Howl
}