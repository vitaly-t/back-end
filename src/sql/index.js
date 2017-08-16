const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath, {minify: true})
}

module.exports = {
  skill: {
    new: sql('./skill/new.sql'),
    create: sql('./skill/create.sql'),
    view: sql('./skill/view.sql')
  },
  workshop: {
    create: sql('./workshop/create.sql'),
    get: sql('./workshop/get.sql'),
    new: sql('./workshop/new.sql'),
    unreached: sql('./workshop/unreached.sql')
  },
  user: {
    userLoginInfo: sql('./user/user-login-info.sql'),
    profile: sql('./user/profile.sql'),
    voteSkills: sql('./user/vote-skills.sql'),
    equipSkills: sql('./user/equip-skills.sql'),
    createWorkshops: sql('./user/create-workshops.sql'),
    attendWorkshops: sql('./user/attend-workshops.sql')
  },
  functionDeclaration: sql('./function-declaration.sql')
}
