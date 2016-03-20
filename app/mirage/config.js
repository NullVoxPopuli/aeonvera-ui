import 'aeonvera/tests/helpers/parse-query-params';


export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.urlPrefix = '';

  // make this `api`, for example, if your API is namespaced
  // don't namespace, because the sign in route isn't on the api
  // this.namespace = 'api';

  // delay for each request, automatically set to 0 during testing
  // this.timing = 400;

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */
  this.delete('api/users/sign_out', function(db, request){
    return {};
  });
  this.delete('users/sign_out', function(db, request){
    return {};
  });
  this.post('/api/users/sign_in', function(db, request) {
    let queryParams = request.requestBody;
    let params = parseQueryParams(queryParams);
    let email = params['user%5Bemail%5D'].replace('%40', '@');

    let user = db.users.where({email: email})[0];
    return {
      email: user.email,
      id: user.id,
      token: user.token
    };
  });

  this.post('/api/users', function(db, request) {
    return {};
  });

  this.passthrough('/write-blanket-coverage', ['post']);

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
