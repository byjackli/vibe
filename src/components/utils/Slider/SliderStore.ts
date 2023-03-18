import { writable } from 'svelte/store';
import { checkAndContainPips, type PipOptions, type SliderOptions } from './Slider';
type SliderStore = Record<
    string,
    {
        options: SliderOptions;
        pips: PipOptions[];
    }
>;
const map: SliderStore = {};

export const SliderStore = writable(map);

export function sliderUpdate(): boolean {
    return false;
}

export function sliderAdd(options: SliderOptions, pips: PipOptions[]): boolean {
    checkAndContainPips(options, pips);

    return true;
}

export function sliderRemove(): boolean {
    return false;
}

export function pipUpdate(): boolean {
    return false;
}
