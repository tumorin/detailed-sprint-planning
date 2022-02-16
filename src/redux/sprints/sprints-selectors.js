const getCurrentSprint = store => {
    if (store.sprints.length === 0) {
       return null
    } else return store.sprints[store.sprints.length - 1]
}

const getSprints = store => {
    if (store.sprints.length === 0) {
        return null
    } else return store.sprints
}

export {getCurrentSprint, getSprints};