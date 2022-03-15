const getTeam = store => {
    if (store.team.length === 0) {
        return []
    } else return store.team}


export {getTeam};