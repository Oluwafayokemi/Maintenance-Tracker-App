/**
 * @file seedRequestTable
 */

/**
 * @constant insertRequestTable
 * @constant insertRequestKayTable
 * @constant insertRequest2Table
 * @description seed RequestTable with Data
 */
export const insertRequestTable =
  ";INSERT INTO requests(userId, equipment, description, status) VALUES(1, 'generator', 'Generator goes off always', 'pending')";
export const insertRequestKayTable =
  ";INSERT INTO requests(userId, equipment, description, status) VALUES(1, 'generator', 'Generator goes off always', 'approve')";
export const insertRequest2Table =
  ";INSERT INTO requests(userId, equipment, description, status) VALUES(2, 'Air Condition', 'air condition blows hot air', 'resolved')";
