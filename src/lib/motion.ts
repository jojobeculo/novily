/** Long, soft deceleration — the signature curve of the site. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

/** Shared in-view settings: animate once, a little before the element is fully visible. */
export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
