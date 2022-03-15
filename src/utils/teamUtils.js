const getTeamMemberByNick = (team, nick) => {
    return team.find( teamMember => teamMember.nick === nick);
}

export {getTeamMemberByNick}