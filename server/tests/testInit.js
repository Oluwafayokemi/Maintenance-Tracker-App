import faker from 'faker';

/**
 * Assign test helpers Constants
 * @class
 * @memberof testInit
 */
export default class testInit {
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
        this.adminEmail = 'fayoaright@gmail.com';
        this.defaultEmail = 'omotola@gmail.com';
        this.adminPsw = 'Excellemce';
        this.defaultPsw = 'Upright';
        this.demoUserRequests = [
            {
                option: 'electricity',
                status: 'accepted',
                description: 'Water pumper not working'
            },
            {
                option: 'electricity',
                status: 'accepted',
                description: 'Water pumper not working'
            },
            {
                option: 'electricity',
                status: 'accepted',
                description: 'Water pumper not working'
            }
        ];


        // Init requests constants
        this.demoRequestUserId = faker.random.uuid();
        this.demoRequestOption = faker.lorem.text();
        this.demoRequestDescrp = faker.lorem.paragraph();
        this.demoRequestStatus = faker.lorem.text();

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
