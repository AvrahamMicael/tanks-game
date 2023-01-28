import { DisplayOptions } from "../types.js";
import { Canvas } from "./Canvas.js";

const startBtn: HTMLButtonElement = document.getElementById('startBtn') as HTMLButtonElement;
const menuDiv: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;

export const toggleCanvasAndMenu = (): void => {
  const [ canvasDisplay, menuDisplay ]: [ DisplayOptions, DisplayOptions ] = window.getComputedStyle(Canvas.el, null).display == 'none'
    ? [ 'inline', 'none' ]
    : [ 'none', 'inline' ];
  Canvas.el.style.display = canvasDisplay;
  menuDiv.style.display = menuDisplay;
};


export const onClickStartBtn = (startFunc: () => void): void => {
  startBtn.onclick = (): void => {
    toggleCanvasAndMenu();
    startFunc();
  };
};
