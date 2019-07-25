import './register-apis';
import './migrations';
import './email';
import seed from './seeds';

Meteor.startup(() => {
    seed();
});
