const sprintsData = [
    {
        "id": 1,
        "name": 'Sprint Valhalla',
        "start": '17-Nov-2021',
        "end": '30-Nov-2021',
        "goal": 'create MVP'
    },
    {
        "id": 2,
        "name": 'Sprint Asgard',
        "start": '01-Dec-2021',
        "end": '14-Dec-2021',
        "goal": 'add authorization'
    },
    {
        "id": 3,
        "name": 'Sprint Odin',
        "start": '15-Dec-2021',
        "end": '28-Dec-2021',
        "goal": 'pred-realize version'
    }
]

const teamData = [
    {
        "name": "Yuriy",
        "surname": 'Tumorin',
        "nick": "YT",
        "active": true,
    },
    {
        "name": "Bill",
        "surname": 'Gates',
        "nick": "BG",
        "active": true,
    },
    {
        "name": "Steve",
        "surname": 'Jobs',
        "nick": "SJ",
        "active": false,
    },
]

const issuesData = [
    {
        "id": 1,
        "description": 'Set up the project on devs machines',
        "status": "in progress",
    },
    {
        "id": 2,
        "description": 'Set up GIT',
        "status": "done",
    },
    {
        "id": 3,
        "description": 'Set up CI',
        "status": "to do",
    },
    {
        "id": 4,
        "description": 'Set up hosting',
        "status": "to do",
    },
    {
        "id": 5,
        "description": 'Prepare requirements for the next sprint',
        "status": "to do",
    },
]

const daysData = [
    {
        "sprintID": 3,
        "dayNumber": 1,
        "issueID": 1,
        "workWith": [
            "YT",
            "BG"
        ]
    },
    {
        "sprintID": 3,
        "dayNumber": 2,
        "issueID": 1,
        "workWith": [
            "BG"
        ]
    },
    {
        "sprintID": 3,
        "dayNumber": 1,
        "issueID": 2,
        "workWith": [
            "SJ"
        ]
    },
]

export {sprintsData, teamData, issuesData, daysData};
