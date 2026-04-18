"use client";

/**
 * useCursor
 *
 * Programmatic alternative to data-cursor attributes.
 * Use when you need to control cursor state from JS logic
 * (e.g. during a drag, after an async action, on canvas hover).
 *
 * Usage:
 *   const { enter, leave } = useCursor("hover");
 *   <div onMouseEnter={enter} onMouseLeave={leave}>...</div>
 *
 *   // Or with inline handlers:
 *   const { enter, leave } = useCursor("drag");
 *   <canvas onMouseEnter={enter} onMouseLeave={leave} />
 */

type CursorState = "default" | "hover" | "text" | "drag" | "hide";

const dispatchCursor = (state: CursorState) => {
    document.dispatchEvent(
        new CustomEvent("cursor:set", { detail: { state } })
    );
};

const useCursor = (state: CursorState) => ({
    enter: () => dispatchCursor(state),
    leave: () => dispatchCursor("default"),
    set: () => dispatchCursor(state),
    reset: () => dispatchCursor("default"),
});

export default useCursor;