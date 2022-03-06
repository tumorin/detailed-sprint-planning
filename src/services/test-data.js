const sprintsData = [
    {
        "id": 1,
        "name": 'Sprint Valhalla',
        "start": '2021-11-17',
        "end": '2021-11-30',
        "goal": 'create MVP'
    },
    {
        "id": 2,
        "name": 'Sprint Asgard',
        "start": '2022-01-16',
        "end": '2022-02-02',
        "goal": 'add authorization'
    },
    {
        "id": 3,
        "name": 'Sprint Odin',
        "start": '2022-02-16',
        "end": '2022-03-02',
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
        "id": '1',
        "description": 'Set up the project on devs machines',
        "status": "in progress",
    },
    {
        "id": '278433',
        "description": 'Set up GIT',
        "status": "done",
    },
    {
        "id": '3',
        "description": 'Set up CI',
        "status": "to do",
    },
    {
        "id": '487464443',
        "description": 'Set up hosting',
        "status": "to do",
    },
    {
        "id": '5',
        "description": 'Prepare requirements for the next sprint',
        "status": "to do",
    },
]

const daysData = [
    {
        "sprintID": 3,
        "dayNumber": 5,
        "issueID": '1',
        "workWith": "YT"
    },
    {
        "sprintID": 3,
        "dayNumber": 2,
        "issueID": '1',
        "workWith": "BG"
    },
    {
        "sprintID": 3,
        "dayNumber": 4,
        "issueID": '1',
        "workWith": "BG"
    },
    {
        "sprintID": 3,
        "dayNumber": 1,
        "issueID": '487464443',
        "workWith":  "SJ"
    },
    {
        "sprintID": 2,
        "dayNumber": 1,
        "issueID": '2',
        "workWith": "BG"
    },
]

export {sprintsData, teamData, issuesData, daysData};
