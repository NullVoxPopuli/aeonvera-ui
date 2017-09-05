import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

declare global {
  export const $crisp: any
}

const WELCOME_MESSAGE = 'Hello! How may I help? :)';

export default class extends Ember.Service {
  async setUserInfo(userPromise) {
    if (typeof $crisp === 'undefined' || !$crisp) return;

    const user = await userPromise;

    $crisp.push([
      'on', 'session:loaded',
      this.setupCrisp(user)
    ]);

    this.setupFullStory(user);
  }

  setupCrisp(user) {
    return sessionId => {
      const email = user.get('email');
      const name = user.get('name');
      const unread = $crisp.get('chat:unread:count');

      const chatText = $('.crisp-client [data-from="operator"]').text();

      // NOTE: not sure where the string 'How can I help you?' is coming form
      //       because it's not what I'm setting. :-\
      const chatAlreadySent = chatText.includes('How can I help you?');

      // temp disabled, because in order to truely not be annoying, we
      // need to make sure we haven't already sent this message.
      if (!chatAlreadySent) {
        $crisp.push(['do', 'message:show', ['text', WELCOME_MESSAGE]]);
      }

      // disabled, because we don't want the auto-message emailing people willy-nilly
      // $crisp.push(['set', 'user:email', [email]]);
      $crisp.push(['set', 'user:nickname', [name]]);
      $crisp.push([
        'set',
        'session:data',
        [[
          ['email', email],
          ['name', name]
        ]]
      ]);

      $crisp.push([
        'set', 'session:segments',
        [[
          ENV.environment
        ]]
      ])
    }
  }

  setupFullStory(user) {
    if (ENV.environment === 'development' || ENV.environment === 'test') return;
    const FS = window.FS;
    if (typeof FS === 'undefined' || !FS) return;

    // This is an example script - don't forget to change it!
    // http://help.fullstory.com/develop-js/setuservars.
    const email = user.get('email');

    FS.identify(email, {
      displayName: user.get('name'),
      email: email,
      environment: ENV.environment
    });
  }
}
