/**
 * Does something, not sure yet
 * @returns
 */
export function drag(): void {
    return;
}

/**
 * If a pip is given values that fall outside of the Slider min-max values,
 * prevent the pip from escaping.
 * @param options slider options
 * @param pips list of pips or undefined
 */
export function checkAndContainPips(options: SliderOptions, pips?: PipOptions[]): void {
    if (!pips || typeof pips === 'string' || !pips.length) return;
    const { min, max } = options.values;

    pips.find(({ values }) => {
        if (!values.max || !values.min) return;
        if (values?.min < min || max < values?.max)
            throw new Error(
                `Pip is outside of Slider min-max values. (Slider _ Pip). Min:${min}<=${values.min}; Max:${max}>=${values.max}.
                Double-check all pip values.`
            );
        return;
    });
}

// export type PipOptions = PipOptionsAdvanced | number
export type PipOptions = {
    id: string;
    values: {
        min?: number;
        max?: number;
        now: number;
    };
    label: string;
    labelState?: 'show' | 'hide';

    /**
     * Allows individual pip to override Slider `containPips` flag.
     * Slider is able to go outside of Slider min-max container.
     *
     * @default false
     */
    slippery?: boolean;
};

/**
 * Configuration object for slider.
 */
export type SliderOptions = {
    id: string;

    /**
     * Visually hide features.
     *
     * @default false
     */
    hide?: {
        /**
         * Hide labels for all pips.
         *
         * @default false
         */
        labels: boolean;
    };

    /**
     * Minimum and maximum values pip(s) can achieve.
     *
     * This can be overriden, see `containPip` flag or PipOption's `slippery` flag.
     */
    values: {
        min: number;
        max: number;
    };

    /**
     * Draws lines between pips. Only works when there are <=2 pips present.
     *
     * @default true
     */
    range?: boolean;

    /**
     * Prevent pips from being pushed outside the min-max.
     *
     * This flag can be overriden for a specific pip, iff their `slippery` flag is present.
     *
     * @default true
     */
    containPip?: boolean;
};
