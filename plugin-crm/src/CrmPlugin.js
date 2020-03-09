import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'CrmPlugin';

export default class CrmPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    
    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

      if (window.location !== window.parent.location) {

        manager.updateConfig({
          componentProps: {
            AgentDesktopView: {
              showPanel2: false,
            },
          },
        });

        const receiveMessage = ev => {
            const { event, sid } = ev.data;

            if(sid) {

              if(event === "acceptTask"){
                flex.Actions.invokeAction("AcceptTask", { sid });
              }

              if(event === "rejectTask") {
                flex.Actions.invokeAction("RejectTask", { sid });
              }
            }
    
        }

        window.addEventListener("message", receiveMessage, false);

        manager.workerClient.on("reservationCreated", function(reservation) {
            if (reservation.task.taskChannelUniqueName === 'voice') {
                window.parent.postMessage({ event: "reservationCreated", caller: reservation.task.attributes.caller, sid: reservation.sid }, "*");
            };

            resStatus.forEach((e) => {
                reservation.on(e, () => {
                  window.parent.postMessage({ event: "reservationChangedFromCreated" }, "*");
                });
            });
        });

    }

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    // manager.store.addReducer(namespace, reducers);
  }
}
