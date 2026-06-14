import { useState, useEffect, useRef } from "react";

type Options = {
    /** Milliseconds to wait before showing the indicator.
     *  Requests that finish before this threshold show nothing. Default 200. */
    delay?: number;
    /** Once shown, the minimum milliseconds the indicator stays visible.
     *  Prevents a jarring flash when the request finishes shortly after delay. Default 500. */
    minDuration?: number;
};

/**
 * Wraps a boolean loading flag and returns a smoothed version:
 *  - withholds the indicator until `delay` ms have elapsed
 *  - once visible, keeps it visible for at least `minDuration` ms
 */
export function useDelayedLoading(
    isLoading: boolean,
    { delay = 200, minDuration = 500 }: Options = {},
): boolean {
    const [visible, setVisible] = useState(false);
    const visibleRef = useRef(false);
    const minEndRef = useRef(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (isLoading) {
            if (visibleRef.current) return;
            clearTimer();
            timerRef.current = setTimeout(() => {
                minEndRef.current = Date.now() + minDuration;
                visibleRef.current = true;
                setVisible(true);
            }, delay);
        } else {
            clearTimer();
            if (!visibleRef.current) return;
            const remaining = minEndRef.current - Date.now();
            if (remaining > 0) {
                timerRef.current = setTimeout(() => {
                    visibleRef.current = false;
                    setVisible(false);
                }, remaining);
            } else {
                visibleRef.current = false;
                setVisible(false);
            }
        }

        return clearTimer;
    }, [isLoading, delay, minDuration]);

    return visible;
}
