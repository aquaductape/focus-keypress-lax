// TODO: test on iframes, webcomponents

let programmaticFocusByKeyboard = false;
let prevFocusedEl: HTMLElement | null = null;

const focusName = "data-focus-keypress-lax";
const addFocusVisible = (el: HTMLElement | null) => {
  if (!el) return;
  el.setAttribute(focusName, "");
};
const removeFocusVisible = (el: HTMLElement | null) => {
  if (!el) return;
  el.removeAttribute(focusName);
};

document.addEventListener(
  "focusin",
  (e) => {
    if (!programmaticFocusByKeyboard) return;

    const target = e.target as HTMLElement;
    if (prevFocusedEl === target) {
      return;
    } else {
      removeFocusVisible(prevFocusedEl);
    }

    addFocusVisible(target);
    prevFocusedEl = target;
  },
  true
);

document.addEventListener(
  "focusout",
  (e) => {
    console.log("focusout");
    if (!programmaticFocusByKeyboard) return;
    removeFocusVisible(prevFocusedEl);
    prevFocusedEl = null;
  },
  true
);

document.addEventListener(
  "mousedown",
  (e) => {
    const target = e.target as HTMLElement;
    const tags = ["INPUT", "TEXTAREA"];
    programmaticFocusByKeyboard = false;
    if (tags.includes(target.nodeName) || target.isContentEditable) {
      if (target !== prevFocusedEl) {
        removeFocusVisible(prevFocusedEl);
      }
      addFocusVisible(target);
      prevFocusedEl = target;
      return;
    }

    removeFocusVisible(prevFocusedEl);
    prevFocusedEl = null;
  },
  true
);

document.addEventListener(
  "keydown",
  (e) => {
    if (prevFocusedEl) {
      programmaticFocusByKeyboard = true;
      return;
    }
    if (!["Escape", " ", "Tab", "Enter"].includes(e.key)) {
      return;
    }

    programmaticFocusByKeyboard = true;
    requestAnimationFrame(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement === document.body) return;

      addFocusVisible(activeElement);
      prevFocusedEl = activeElement;
    });
  },
  true
);

export {};
