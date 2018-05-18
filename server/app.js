import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';
import requestRouter from './routes/request';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestRouter);

app.get('/', (req, res) => {
    res.status(200).json(db.users)
});

app.post('/api/v1/signin', (req, res) => {
    if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
        res.status(200).json({
            success: 'true',
            message: 'success, you are now logged in',
            user: db.user
        })
    } else {
        res.status(400).json({
            success: 'false',
            message: 'error logging in'
        })
    }
})

app.post('/api/v1/register', (req, res) => {
    const { name, email, password } = req.body
    db.users.push({
        id: db.users.length + 1,
        name,
        email,
        password,
        joined: new Date()
    })
    res.status(201).json({
        success: 'true',
        message: 'successfully created new user',
        newUser: db.users[db.users.length - 1]
    });
})

app.get('/api/v1/users/profile/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let found = true;
    db.users.find(user => {
        if (user.id === id) {
            found = true;
            return res.status(201).json({
                success: 'true',
                message: 'user found',
                user: user
            })
        }
        if (!found) {
            res.status(404).json({
                success: 'false',
                message: 'user not found'
            })
        }
    })
})


app.delete('/api/v1/users/requests/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.requests.find((request, index) => {
        if (request.id === id) {
            db.requests.splice(index, 1);
            return res.status(201).json({
                success: 'true',
                message: 'request sucesfully deleted',
            });
        }
    });
    return res.status(404).json({
        success: 'false',
        message: 'request not found'
    })
});

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

export default app;
