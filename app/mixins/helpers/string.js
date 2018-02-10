import Mixin from '@ember/object/mixin';

export function randomString(prefix = '', length = 64) {
  let random = Math.random().toString(36).replace(/[^a-z]+/g, '');

  random += Math.random().toString(36).replace(/[^a-z]+/g, '');
  random = random.substr(0, length);
  return prefix + random;
}

export default Mixin.create({
  randomString
});
