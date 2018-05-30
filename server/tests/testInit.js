import faker from 'faker';

/**
 * Assign test helpers Constants
 * @class
 * @memberof testInit
 */
export default class Test {
  /**
       * Class Constructor
       * @constructor
       * @returns {void} Class instance
       * @memberof testInit
       */
  constructor() {
    this.usersApiRoute = '/api/v1/users';
    this.requestsApiRoute = '/api/v1/requests';

    // Init users constants

    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.adminFirstName = faker.name.firstName();
    this.adminLastName = faker.name.lastName();

    this.demoUserEmail = faker.internet.email();
    this.demoUserPassword = faker.internet.password();
    this.adminEmail = 'fayo@gmail.com';
    this.defaultEmail = 'joy@gmail.com';
    this.adminPsw = 'fayo';
    this.defaultPsw = 'joy';
    this.demoUserDepartment = faker.lorem.text();
    this.demoUserRole = faker.lorem.text();

    // Init requests constants
    this.demoRequestUserId = faker.random.uuid();
    this.demoRequestOption = faker.lorem.text();
    this.demoRequestDescrp = faker.lorem.paragraph();
    this.demoRequestApproved = 'approved';
    this.demoRequestDisapproved = 'dissaproved';
    this.demoRequestResolved = 'resolved';


    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  /**
       * Sets the token property
       *
       * @param {string} token
       * @returns {string} 'token'
       * @memberof testHelper
       */
  setToken(token) {
    this.token = token;
  }

  /**
       * Gets the token property
       *
       * @returns {string} 'token'
       * @memberof testHelper
       */
  getToken() {
    return this.token;
  }
}
