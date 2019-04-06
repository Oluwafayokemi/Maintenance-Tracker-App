/**
 * @file createRequestTable
 */

/**
 * @constant createRequestTable
 * @description create RequestTable in the database
 */
const createRequestTable =
  ';DROP TABLE IF EXISTS requests CASCADE; CREATE TABLE requests(requestId SERIAL PRIMARY KEY NOT NULL, userId SERIAL NOT NULL, equipment VARCHAR(100) NOT NULL,  description TEXT NOT NULL, status VARCHAR(100), date TIMESTAMP DEFAULT NOW())';

export default createRequestTable;
