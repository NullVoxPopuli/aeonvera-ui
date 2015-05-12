import Ember from 'ember';

export function submitIdeaLink(){
  var t = this.container.lookup('utils:t')

  var url = 'https://github.com/NullVoxPopuli/aeonvera/issues?state=open';
  var text = t('submitideas');

  var anchor = '<a href="' + url + '">' + text + '</a>';
  return Ember.String.htmlSafe(anchor);
}

export default Ember.HTMLBars.makeBoundHelper(submitIdeaLink);
