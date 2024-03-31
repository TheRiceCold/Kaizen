import { type Props as RevealerProps } from 'types/widgets/label'
import { type ButtonProps } from 'types/widgets/button'

import timer from './timer'
import weather from './weather'

import options from 'options'
import { sidemenuShow } from 'lib/variables'

const isActive = Variable('calendar')
const stackItems = [
  { 
    name: 'calendar' , 
    content: Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
  },
  { name: 'weather', content: weather },
  { name: 'agenda', content: Widget.Box([ ]) },
  { name: 'timer', content: timer },
  { name: 'events', content: Widget.Box([ ]) },
]

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

const Buttons = Widget.Box({
  hpack: 'center',
  className: 'buttons',
  spacing: options.theme.spacing * 1.5,
  children: stackItems.map(item => Widget.Button({
    label: item.name,
    onClicked() {
      Stack.shown = item.name
      isActive.value = item.name
    }
  })
  .hook(isActive, (self: ButtonProps) => self.toggleClassName('active', isActive.value === self.label)))
})

export default Widget.Revealer({
  transition: 'slide_down',
  child: Widget.Box({
    vertical: true,
    className: 'datemenu',
    children: [ Stack, Buttons ]
  }),
  transitionDuration: options.transition.value,
})
.hook(sidemenuShow.datemenu, (self: RevealerProps) => {
  self.revealChild = sidemenuShow.datemenu.value
})
