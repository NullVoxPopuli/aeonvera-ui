import { helper } from '@ember/component/helper';

export function trueOrUndefined(params/*, hash*/) {
  const thing = params[0];

  return (thing === true || thing === undefined);
}

export default helper(trueOrUndefined);
