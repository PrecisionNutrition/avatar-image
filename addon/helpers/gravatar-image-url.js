import { helper } from '@ember/component/helper';
import md5 from 'ember-md5';

export function gravatarImageUrl([email], { size='' }) {
  let hashedEmail = md5(email);

  return `//www.gravatar.com/avatar/${hashedEmail}.jpg?d=mm&s=${size}`;
}

export default helper(gravatarImageUrl);
