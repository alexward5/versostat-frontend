import { useState } from "react";

// Open/close state for the mobile nav drawer. `isClosing` stops a toggle from
// re-opening the drawer while it's still animating closed
export function useMobileNav() {
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const close = () => {
        setIsClosing(true);
        setOpen(false);
    };
    const onTransitionEnd = () => setIsClosing(false);
    const toggle = () => {
        if (!isClosing) setOpen((prev) => !prev);
    };

    return { open, toggle, close, onTransitionEnd };
}
