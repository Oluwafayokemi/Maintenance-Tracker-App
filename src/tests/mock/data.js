const user = {
  userId: 1,
  firstName: 'fayokemi',
  lastName: 'adeyina',
  email: 'fayoaright@gmail.com',
  department: 'Water Management',
  isAdmin: true,
};

const requests = {
  requestid: 24,
  userid: 3,
  firstname: 'omotola',
  lastname: 'adeyina',
  email: 'omotola@gmail.com',
  department: 'Water Management',
  equipment: 'Electricity',
  description: 'aisdfj;aosidfoasdf',
  status: 'resolved',
  date: '2018-09-04T11:04:49.885Z',
};

const statusData = {
  requestId: 4,
  userid: 2,
  equipment: 'equipment',
  description: 'desccription',
  status: 'approved',
  date: '2018-10-04T18:40:30.688Z',
};

const newRequest = {
  requestid: 5,
  userid: 1,
  equipment: 'Generator',
  description: 'k;lk;;lk',
  status: 'pending',
  date: '2018-10-04T21:58:17.269Z',
};

export const userResponse = {
  status: 200,
  sucess: true,
  message: 'Sign in successful',
  user,
  token: 'someToken',
};

export const requestResponse = {
  status: 200,
  requests,
};

export const statusResponse = {
  status: 201,
  updatedRequest: {
    request: statusData,
  },
};

export const newRequestData = {
  status: 201,
  success: 'true',
  message: 'Request created successfully',
  request: newRequest,
};

export const userRequest = {
  status: 200,
  requests: statusData,
};
