const db = {
    users: [
        {
            id: 1,
            name: 'sola',
            email: 'sola@gmail.com',
            password: 'cookies',
            department: 'event and planning',
            request: [
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
            ],
            joined: new Date()
        },
        {
            id: 2,
            name: 'Bello',
            email: 'bello@gmail.com',
            password: 'veges',
            department: 'event and planning',
            request: [
                {
                    option: 'water supply',
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

            ],
            joined: new Date()
        },
        {
            id: 3,
            name: 'Lola',
            email: 'lola@gmail.com',
            password: 'apple',
            department: 'event and planning',
            request: [
                {
                    option: 'computer',
                    status: 'accepted',
                    description: 'Water pumper not working'
                },
                {
                    option: 'electricity',
                    status: 'accepted',
                    description: 'Water pumper not working'
                }
            ],
            joined: new Date()
        }
    ],

    requests: [
        {
            id: 1,
            userId: 1,
            name: 'ezekiel',
            status: 'accepted',
            option: 'electricity',
            description: 'Air condition blows hot air',
            date: new Date()
        },
        {
            id: 2,
            userId: 3,
            name: 'Isaace',
            status: 'resolved',
            option: 'computer',
            description: 'Air condition blows hot air',
            date: new Date(),
        },
        {
            id: 3,
            userId: 1,
            status: 'rejected',
            name: 'hope',
            option: 'furniture',
            description: 'Air condition blows hot air',
            date: new Date(),
        },
        {
            id: 4,
            userId: 2,
            name: 'john',
            status: 'accepted',
            department: 'Crispy Rice',
            option: 'electricity',
            description: 'Air condition blows hot air',
            date: new Date()
        },
        {
            id: 5,
            userId: 2,
            status: [],
            name: 'sola',
            department: 'Crispy Rice',
            option: 'electricity',
            description: 'Air condition blows hot air',
            date: new Date()
        },
        {
            id: 6,
            userId: 3,
            status: [],
            name: 'funke',
            department: 'Crispy Rice',
            option: 'electricity',
            description: 'Air condition blows hot air',
            date: new Date()
        }
    ]
}

export default db;

