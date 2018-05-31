/* eslint-disable class-methods-use-this */
import Validator from 'validatorjs';

/**
 * @export
 * @class Validation
 */
class Validation {
  /**
     * Validate request record
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @param {function} next
     * @returns {object} Class instance
     * @memberof Validation
     */
  validateRequest(req, res, next) {
    const requestRules = {
      option: 'required|string',
      description: 'required|string',
    };

    const validate = new Validator(req.body, requestRules);
    if (validate.passes()) return next();

    const error = {};
    const description = validate.errors.first('description');
    const option = validate.errors.first('option');

    if (description) {
      error.description = description;
    }
    if (option) {
      error.option = option;
    }

    return res.status(400).json({
      message: 'one or more required field is/are missing',
      statusCode: 400,
      error,
    });
  }


  /**
     * Validate Login record
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @param {function} next
     * @returns {object} Class instance
     * @memberof Validation
     */
  validateLogin(req, res, next) {
    const validateLogin = {
      email: 'required|email',
      password: 'required|string|min:5|max:10',
    };

    const validate = new Validator(req.body, validateLogin);
    if (validate.passes()) return next();

    let error = {};
    const email = validate.errors.first('email');
    const password = validate.errors.first('password');

    if (!email && !password) {
      error = 'The email and password fields are required';
    } else if (email) {
      error.email = email;
    } else if (password) {
      error.password = password;
    }

    return res.status(400).json({
      message: 'one or more required field is/are missing',
      statusCode: 400,
      error,
    });
  }

  /**
     * Validate Sign up record
     *
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @param {function} next
     * @returns {object} Class instance
     * @memberof Validation
     */
  validateRegister(req, res, next) {
    const validation = {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|email',
      department: 'required|string',
      password: 'required|string|min:5|max:10',
    };

    const validate = new Validator(req.body, validation);
    if (validate.passes()) return next();

    const error = {};
    const firstName = validate.errors.first('firstName');
    const lastName = validate.errors.first('lastName');
    const email = validate.errors.first('email');
    const department = validate.errors.first('department');
    const password = validate.errors.first('password');

    if (firstName) {
      error.firstName = firstName;
    }
    if (lastName) {
      error.lastName = lastName;
    }
    if (email) {
      error.email = email;
    }
    if (department) {
      error.department = department;
    }
    if (password) {
      error.password = password;
    }

    return res.status(400).send({
      message: 'one or more required field is/are missing',
      statusCode: 400,
      error,
    });
  }
}

export default Validation;
