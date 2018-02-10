import { inject as service } from '@ember/service';
import ExternalLink from 'aeonvera/components/links/external-link';

export default ExternalLink.extend({
  i18n: service(),

  layoutName: 'components/links/external-link',
  href: 'https://github.com/NullVoxPopuli/aeonvera/issues?state=open',

  text: function() {
    return this.get('i18n').t('submitideas');
  }.property()
});
