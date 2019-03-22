import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | avatar image', function(hooks) {
  setupRenderingTest(hooks);

  test('default params are appended', async function(assert) {
    let expectedParams = `?dpr=${window.devicePixelRatio}`;
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} />`);

    let avatarImg = find('[data-test-selector="avatar-image"]');

    assert.equal(
      avatarImg.getAttribute('src').indexOf(url),
      0,
      'does not add external host information'
    );

    assert.notEqual(
      avatarImg.getAttribute('src').indexOf(expectedParams),
      -1
    );
  });

  test('supports width param', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} @w={{20}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.notEqual(src.indexOf('&w=20'), -1, 'sets width parameter for Imgix');
    assert.equal(img.getAttribute('width'), 20, 'sets width attribute on image tag');
  });

  test('supports height param', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} @h={{20}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.notEqual(src.indexOf('&h=20'), -1, 'sets height parameter for Imgix');
    assert.equal(img.getAttribute('height'), 20, 'sets height attribute on image tag');
  });

  test('supports fit param', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);
    this.set('fit', 'facearea');

    await render(hbs`<AvatarImage @url={{url}} @fit={{fit}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.notEqual(src.indexOf('&fit=facearea'), -1);
  });

  test('supports facepad param', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} @facepad={{3}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.notEqual(src.indexOf('&facepad=3'), -1);
  });

  test('supports faceindex param', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} @faceindex={{1}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.notEqual(src.indexOf('&faceindex=1'), -1);
  });

  test('does not insert undefined attributes for Imgix', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} />`);

    let img = find('[data-test-selector="avatar-image"]');
    let src = img.getAttribute('src');

    assert.equal(src.indexOf(url), 0, 'does not add external host information');

    assert.equal(src.indexOf('&faceindex=undefined'), -1);
  });

  test('other avatar image attributes', async function(assert) {
    let url = '/foo.jpg';

    this.set('url', url);

    await render(hbs`<AvatarImage @url={{url}} @alt="Cheesus" @avatarImageClass="piggy" />`);

    let img = find('[data-test-selector="avatar-image"]');

    assert.equal(img.getAttribute('alt'), 'Cheesus', 'sets "alt" attribute');
    assert.ok(img.classList.contains('piggy'), 'sets class names on image');
  });

  test('no url provided', async function(assert) {
    await render(hbs`<AvatarImage @avatarIconClass="foo" />`);

    let avatarIcon = find('[data-test-selector="avatar-icon"]');

    assert.ok(avatarIcon, 'displays blank avatar icon');
    assert.ok(avatarIcon.classList.contains('foo'), 'sets class names on avatar icon');
  });
});
