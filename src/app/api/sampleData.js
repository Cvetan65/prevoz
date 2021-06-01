export const sampleData = [
    {
        id: '1',
        dest: 'Од Бтола кон Скопје',
        date: new Date ('2018-03-21') ,
        brMes: 1,
        ciyt:'Битола', 
        venue: 'Атпазар, Битола, Макеоднија',
        description: 'При патувањето допуштено е носење на една торба/куфер, не поголем од 60Х70х25. За додтен багаж или пратки обратете се до предлагачот на патувањето.',
        hostedBy: 'Цеко',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                displayName: 'Ристе',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                displayName: 'Петко',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        dest: 'Од Скопје кон Битола',
        brMes: 6,
        date: new Date ('2018-03-18'),
        description: 'При патувањето допуштено е носење на една торба/куфер, не поголем од 60Х70х25',
        city: 'Скопје, Македонија',
        venue: 'Битпазар, Скопје, Македонија',
        hostedBy: 'Свирко',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'a',
                displayName: 'Трајко',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                displayName: 'Петко',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    }
];