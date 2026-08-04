import { initPage } from '../shared/page.js';
import { mountStage } from '../shared/stage.js';

initPage();

/* The planet is the page's backdrop, not its content: the document is complete
   and readable before this resolves, and stays that way if it never does. */
mountStage({
  canvas: '#nm-canvas',
  load: () => import('./scene.js'),
});
