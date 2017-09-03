import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

declare global {
  export const $crisp: any
}

export default class extends Ember.Service {
  async setUserInfo(userPromise) {
    if (!$crisp) return;

    const user = await userPromise;

    $crisp.push([
      'on', 'session:loaded',
      this.setupCrisp(user)
    ]);
  }

  setupCrisp(user) {
    return sessionId => {
      const email = user.get('email');
      const name = user.get('name');
      const unread = $crisp.get('chat:unread:count');

      // temp disabled, because in order to truely not be annoying, we
      // need to make sure we haven't already sent this message.
      // if (unread > 0) {
      //   $crisp.push(['do', 'message:show', ['text', 'Hello! How can I help? :)']]);
      // }

      // disabled, because we don't want the auto-message emailing people willy-nilly
      // $crisp.push(['set', 'user:email', [email]]);
      $crisp.push(['set', 'user:nickname', [name]]);
      $crisp.push([
        'set',
        'session:data',
        [[
          ['email', email],
          ['name', name],
          ['environment', ENV.environment]
        ]]
      ]);
    }
  }
}
