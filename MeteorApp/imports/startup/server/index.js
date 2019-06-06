import './register-apis';
import './migrations';
import seed from './seeds';

Meteor.startup(() => {
    seed();
});
