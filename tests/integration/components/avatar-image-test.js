import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | avatar image', function(hooks) {
  setupRenderingTest(hooks);

  test('when URL present', async function(assert) {
    const alt = 'alt';
    const url = '/foo.jpg';

    this.setProperties({
      alt,
      url,
      params: {
        w: 20,
        h: 30,
      },
    });

    const selector = '[data-test-selector="avatar-image"]';

    await render(hbs`<AvatarImage
      @alt={{alt}}
      @url={{url}}
      @params={{params}}
      @avatarImageClass="piggy"
    />`);

    assert
      .dom(selector)
      .hasAttribute(
        'src',
        new RegExp(`^${url}`),
        'does not prepend host information',
      );

    assert
      .dom(selector)
      .hasAttribute(
        'src',
        new RegExp(/&w=20/),
        'passes attributes to underlying component',
      );

    assert
      .dom(selector)
      .hasAttribute(
        'alt',
        alt,
      );

    assert
      .dom(selector)
      .hasAttribute(
        'width',
        '20',
        'sets width',
      );

    assert
      .dom(selector)
      .hasAttribute(
        'height',
        '30',
        'sets height',
      );

    assert
      .dom(selector)
      .hasClass(
        'piggy',
        'sets class names on image',
      );
  });

  test('when URL blank', async function(assert) {
    await render(hbs`<AvatarImage @avatarIconClass="foo" />`);

    const selector = '[data-test-selector="avatar-icon"]';

    assert.dom(selector).exists();

    assert.dom(selector).hasClass('foo', 'sets class names on avatar icon');
  });

  test('yields nested content', async function(assert) {
    await render(hbs`<AvatarImage><span></span></AvatarImage>`);

    const selector = 'span';

    assert.dom(selector).exists();
  });
});
