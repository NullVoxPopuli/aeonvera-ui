import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { withChai } from 'ember-cli-chai/qunit';

moduleForComponent('error-header', 'Integration | Component | error header', {
  integration: true
});

skip('displays the 401 message', withChai(expect => {

}));

skip('if no error is present, nothing is displayed', withChai(expect => {

}));

skip('if there are an array of strings, the first is displayed', withChai(expect => {

}));

skip('for a json:api error, the first message for the first field is displayed', withChai(expect => {

}));

skip('for a json:api error, if the field is base, only the reason is displayed', withChai(expect => {

}));

skip('for a json:api error, the message is displayed', withChai(expect => {

}));

skip('for a json:api error, the detail is displayed', withChai(expect => {

}));

skip('the error can be hidden', withChai(expect => {

}));

skip('if the error is hidden, upon receiving new attributes, the error should re-display', withChai(expect => {

}));
