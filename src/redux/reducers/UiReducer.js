let inititalState = {
  // change all variable show modal = one name
  nameUI: '',

  messageTitle: '',
  messageContent: '',
  funcMsg: () => {},

  // confirm box
  confirmTitle: '',
  confirmContent: '',
  onConfirmOk: () => {},
  onConfirmCancel: () => {},
  confirmCancelText: '',
  confirmOkText: '',
  confirmImgUrl: '',
  centerButtonContent: '',
  centerButtonFunc: undefined,
  nameClose: '',

  // progress update app
  progress: 0,
};
const uiReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'SHOW_PROGRESS':
      return Object.assign({}, state, {nameUI: 'progress'});
    case 'SET_PROGRESS':
      return {...state, progress: action.progress};
    case 'SHOW_LOADING':
      return Object.assign({}, state, {nameUI: 'loading'});
    case 'SHOW_MESSAGE':
      return Object.assign({}, state, {
        nameUI: 'message',
        messageTitle: action.title,
        messageContent: action.content,
        funcMsg: action.funcMsg,
        nameClose: action.nameClose,
      });
    case 'SHOW_CONFIRM':
      return Object.assign({}, state, {
        confirmTitle: action.title,
        confirmContent: action.content,
        onConfirmOk: action.onOk,
        onConfirmCancel: action.onCancer,
        confirmOkText: action.textOk,
        confirmCancelText: action.textCancer,
        confirmImgUrl: action.confirmImgUrl,
        nameUI: 'comfirmBox',
      });

    case 'HIDE_MODAL':
      return inititalState;
    default:
      return state;
  }
};
export default uiReducer;
