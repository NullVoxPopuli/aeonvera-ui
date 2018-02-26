import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';

export default Route.extend(AuthenticatedUi, {
  i18n: service(),
});
