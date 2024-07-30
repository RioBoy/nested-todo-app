import _ from 'lodash'
import MainForm from '../component/MainForm'
import TaskSection from './TaskSection'

const StageSection = ({
   stages = [],
   idxSite = 0,
   actions = {
      change: () => {},

      // Stage
      removeStage: () => {},

      // Task
      toggleAddTask: () => {},
      removeTask: () => {},
   },
}) => {
   return !_.isEmpty(stages)
      ? stages.map((stage, stageIdx) => (
           <div className="row mb-4" key={stageIdx}>
              <div className="offset-1 col-10 mb-4">
                 <MainForm
                    formRequest={stage}
                    names={{
                       title: `sites.${idxSite}.stages.${stageIdx}.title`,
                    }}
                    isWarningBtn
                    actions={{
                       change: actions.change,

                       // Stage
                       remove: () => actions.removeStage(idxSite, stageIdx),

                       // Task
                       toggleAdd: () =>
                          actions.toggleAddTask(idxSite, stageIdx),
                    }}
                    configHandle={{
                       btnTitle: {
                          add: 'Add Task',
                       },
                    }}
                 />
              </div>

              <TaskSection
                 tasks={stage.tasks}
                 idxSite={idxSite}
                 idxStage={stageIdx}
                 actions={{
                    change: actions.change,
                    removeTask: actions.removeTask,
                 }}
              />
           </div>
        ))
      : null
}

export default StageSection
