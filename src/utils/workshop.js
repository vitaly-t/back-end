const R = require('ramda')

const adapter = workshop => {
  const tsFields = [
    'startDatetime',
    'endDatetime',
    'reachedDatetime',
    'deadline',
    'closing',
    'createdAt',
    'updatedAt'
  ]

  const toInt = x => +x

  return R.apply(
    R.pipe,
    tsFields.map(x => R.over(R.lensProp(x), toInt))
  )(workshop)
}

const assocPhase = R.curry((now, workshop) => {
  const stateEqual = value => R.pipe(
    R.prop('state'),
    R.equals(value)
  )
  const past = field => R.pipe(R.prop(field), R.gte(now))
  const isFull = R.converge(
    R.equals,
    [R.prop('attendeesNumber'), R.prop('maxNumber')]
  )

  const phase = R.cond([
    [stateEqual('judge_ac'), R.always('investigating')],
    [stateEqual('reached'), R.cond(
      [
        [past('startDatetime'), R.always('over')],
        [past('closing'), R.always('closing')],
        [isFull, R.always('full')],
        [R.T, R.always('reached')]
      ]
    )],
    [R.T, R.prop('state')]
  ])(workshop)

  return R.pipe(
    R.dissoc('state'),
    R.assoc('phase', phase)
  )(workshop)
})

module.exports = {
  adapter,
  assocPhase
}
