import { gravatarImageUrl } from '@precision-nutrition/avatar-image/helpers/gravatar-image-url';
import { module, test } from 'qunit';

module('Unit | Helper | gravatar image url', function() {
  test('generates the URL to the image', function(assert) {
    let result = gravatarImageUrl(['joe@example.com'], {});

    assert.equal(result, 'https://www.gravatar.com/avatar/f5b8fb60c6116331da07c65b96a8a1d1.jpg?d=mm&s=');
  });

  test('supports the size attribute', function(assert) {
    let result = gravatarImageUrl(['joe@example.com'], { size: 20 });

    assert.equal(result, 'https://www.gravatar.com/avatar/f5b8fb60c6116331da07c65b96a8a1d1.jpg?d=mm&s=20');
  });
});
