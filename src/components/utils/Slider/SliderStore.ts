import { writable } from "svelte/store";
const map = {}

export const SliderStore = writable(map);


export function unmountSlider(): boolean {
    return false
}

export function mountSlider(): boolean {
    return false
}

export function updateSlider(): boolean {
    return false
}