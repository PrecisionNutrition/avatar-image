import Ember from 'ember';
import layout from '../templates/components/avatar-image';

const {
  computed,
  Component,
  String: {
    htmlSafe,
  },
} = Ember;

/**
 * Display an avatar image that is hosted at a place that (optionally) supports
 * the Imgix API, or defaults to a default SVG icon.
 *
 * https://docs.imgix.com/
 */
export default Component.extend({
  // url: optional
  // alt: optional -- highly recommended
  // w: optional
  // h: optional
  // fit: optional
  // facepad: optional
  // avatarImageClass: optional
  // avatarIconClass: optional

  layout,

  urlParams: computed('fit', 'facepad', 'faceindex', 'w', 'h', function() {
    let params = this.getProperties('fit', 'facepad', 'faceindex', 'w', 'h');
    let opts = `dpr=${window.devicePixelRatio}`;

    for (let param in params) {
      let value = params[param];

      if (typeof value === 'undefined') {
        continue;
      }

      opts += `&${param}=${value}`;
    }

    return htmlSafe(opts);
  }),
});
