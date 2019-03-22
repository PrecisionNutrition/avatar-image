import Component from '@ember/component';

import layout from '../templates/components/avatar-image';

/**
 * Display an avatar image that is hosted at a place that (optionally) supports
 * the Imgix API, or defaults to a default SVG icon.
 *
 * https://docs.imgix.com/
 */
export default Component.extend({
  // alt: optional
  // params: optional
  // url: optional
  // avatarImageClass: optional
  // avatarIconClass: optional

  layout,
});
