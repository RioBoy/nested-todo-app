import _ from 'lodash'
import MainForm from '../component/MainForm'

const TaskSection = ({
   tasks = [],
   idxSite = 0,
   idxStage = 0,
   actions = { change: () => {}, removeTask: () => {} },
}) => {
   return !_.isEmpty(tasks)
      ? tasks.map((task, taskIdx) => (
           <div
              key={taskIdx}
              className={'row ' + (_.isEmpty(tasks) ? 'mb-4' : '')}>
              <div
                 className={
                    'offset-2 col-8 ' + (!_.isEmpty(tasks) ? 'mb-4' : '')
                 }>
                 <MainForm
                    formRequest={task}
                    names={{
                       title: `sites.${idxSite}.stages.${idxStage}.tasks.${taskIdx}.title`,
                    }}
                    isUseBtnAdd={false}
                    actions={{
                       change: actions.change,

                       // Task
                       remove: () =>
                          actions.removeTask(idxSite, idxStage, taskIdx),
                    }}
                 />
              </div>
           </div>
        ))
      : null
}

export default TaskSection
