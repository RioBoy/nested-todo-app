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
           <div className="row mb-4" key={taskIdx}>
              <div className="offset-2 col-8">
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
