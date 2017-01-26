import './main.css';
import './images/featuredimage-icon.png';

import AppView from './scripts/behaviorform.js';

$(() => {
  if ($('#fieldset-featured-image').length > 0) {
    new AppView();
  }
});
