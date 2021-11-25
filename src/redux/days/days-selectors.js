const getDays = store => store.days;

const getDaysBySprintId = (store, sprint) => {
    if (!sprint) return [];
    return getDays(store).filter(day => day.sprintID === sprint.id);
}

export {getDaysBySprintId};