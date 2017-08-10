import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('avatar-image', 'Integration | Component | avatar image', {
  integration: true
});


test('default params are appended', function(assert) {
  let expectedParams = `?dpr=${window.devicePixelRatio}`;
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf(expectedParams), -1);
});

test('supports width param', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url w=20}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf('&w=20'), -1, 'sets width parameter for Imgix');
  assert.equal(img.attr('width'), 20, 'sets width attribute on image tag');
});

test('supports height param', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url h=20}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf('&h=20'), -1, 'sets height parameter for Imgix');
  assert.equal(img.attr('height'), 20, 'sets height attribute on image tag');
});

test('supports fit param', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);
  this.set('fit', 'facearea');

  this.render(hbs`{{avatar-image url=url fit=fit}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf('&fit=facearea'), -1);
});

test('supports facepad param', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url facepad=3}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf('&facepad=3'), -1);
});

test('supports faceindex param', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url faceindex=1}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.notEqual(src.indexOf('&faceindex=1'), -1);
});

test('does not insert undefined attributes for Imgix', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');
  let src = img.attr('src');

  assert.equal(src.indexOf(url), 0, 'does not add external host information');

  assert.equal(src.indexOf('&faceindex=undefined'), -1);
});

test('other avatar image attributes', function(assert) {
  let url = '/foo.jpg';

  this.set('url', url);

  this.render(hbs`{{avatar-image url=url alt='Cheesus' avatarImageClass='piggy'}}`);

  let img = this.$().find('[data-test-selector="avatar-image"]');

  assert.equal(img.attr('alt'), 'Cheesus', 'sets "alt" attribute');
  assert.ok(img.hasClass('piggy'), 'sets class names on image');
});

test('no url provided', function(assert) {
  this.render(hbs`{{avatar-image avatarIconClass="foo"}}`);

  let avatarIcon = this.$().find('[data-test-selector="avatar-icon"]');

  assert.equal(avatarIcon.length, 1, 'displays blank avatar icon');
  assert.ok(avatarIcon.hasClass('foo'), 'sets class names on avatar icon');
});
