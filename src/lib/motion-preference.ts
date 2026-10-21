/** The visitor's animation choice, kept in the browser (no cookie). */
export type MotionChoice = "reduce" | "full";

export const MOTION_KEY = "noveo-motion";

/**
 * Runs before the first paint (inline in <head>), so a visitor who turned
 * animations off never sees them start.
 */
export const motionInitScript = `try{var m=localStorage.getItem("${MOTION_KEY}");if(m==="reduce"||m==="full")document.documentElement.dataset.motion=m}catch(e){}`;
