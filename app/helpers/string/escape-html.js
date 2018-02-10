import { helper } from '@ember/component/helper';
import $ from 'jquery';

export function escapeHTML(string) {
  return $('<div />').text(string).html();
}

export default helper((params, hash) => escapeHTML(params[0]));
