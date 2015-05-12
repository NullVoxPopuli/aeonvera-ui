import Ember from 'ember';
import ExternalLink from 'aeonvera/components/external-link';

export default ExternalLink.extend({
  templateName: 'components/external-link',
  href: 'mailto:support@aeonvera.com',
  icon: 'envelope'
});
