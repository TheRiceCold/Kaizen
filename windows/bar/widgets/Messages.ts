import PanelButton from './PanelButton'
import options from 'options'
import icons from 'data/icons'

const n = await Service.import('notifications')
const notifs = n.bind('notifications')
const action = options.bar.messages.action.bind()

export default () => PanelButton({
  onClicked: action,
  className: 'messages',
  visible: notifs.as(n => n.length > 0),
  child: Widget.Box([ Widget.Icon(icons.notifications.message) ]),
})
