import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { gravatarImageUrl } from '@precision-nutrition/avatar-image/helpers/gravatar-image-url';
import escapeRegExp from '../../helpers/escape-reg-exp';

module('Integration | Component | avatar-or-gravatar', function(hooks) {
  setupRenderingTest(hooks);

  test('with a user with an avatar url', async function(assert) {
    this.set('user', {
      avatar: {
        url: 'http://example.com/sister-nancy.jpg',
      },
      email: 'nancy@dancehall.net',
    });

    await render(hbs`<AvatarOrGravatar
      @user={{user}}
      data-test-selector="avatar-or-gravatar"
    />`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('src', new RegExp(`^${escapeRegExp(this.user.avatar.url)}\\?dpr=[0-9]&faceindex=1&facepad=3&fit=facearea$`));
  });

  test('with a user with an email but no avatar url', async function(assert) {
    this.set('user', {
      email: 'nancy@dancehall.net',
    });

    await render(hbs`<AvatarOrGravatar
      @user={{user}}
      data-test-selector="avatar-or-gravatar"
    />`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('src', gravatarImageUrl([this.user.email], {}));
  });

  test('includes the size attribute in the avatar url', async function(assert) {
    this.set('size', 99);
    this.set('user', {
      avatar: {
        url: 'http://example.com/spice.jpg',
      },
    });

    await render(hbs`<AvatarOrGravatar
      @size={{size}}
      @user={{user}}
      data-test-selector="avatar-or-gravatar"
    />`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('src', new RegExp(`^${escapeRegExp(this.user.avatar.url)}\\?dpr=[0-9]&faceindex=1&facepad=3&fit=facearea&h=${this.size}&w=${this.size}$`));
  });

  test('includes the size attribute in the gravatar url', async function(assert) {
    this.set('size', 99);
    this.set('user', {
      email: 'nancy@dancehall.net',
    });

    await render(hbs`<AvatarOrGravatar
      @size={{size}}
      @user={{user}}
      data-test-selector="avatar-or-gravatar"
    />`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('src', gravatarImageUrl([this.user.email], { size: this.size }));
  });

  test('sets the img height and width based on the size value', async function(assert) {
    this.set('size', 45);
    this.set('user', {
      avatar: {
        url: 'http://example.com/barrington-levy.jpg',
      },
    });

    await render(hbs`<AvatarOrGravatar
      @size={{size}}
      @user={{user}}
      data-test-selector="avatar-or-gravatar"
    />`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('height', `${this.size}`);

    assert
      .dom('[data-test-selector="avatar-or-gravatar"] img')
      .hasAttribute('width', `${this.size}`);
  });
});
