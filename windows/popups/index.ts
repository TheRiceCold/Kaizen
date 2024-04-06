import Media from './media'
import DrawTools from './draw-tools'
import Notifications from './notifications'

import options from 'options'

const Top = Widget.Window({
  anchor: ['top'],
  name: 'top-popups',
  className: 'popups',
  exclusivity: 'ignore',
  child: Widget.Box({
    vertical: true,
    children: [ DrawTools, Media, Notifications() ],
    css: `padding: 2px; margin-top: ${options.theme.spacing * 4}px;`,
  }),
})

const Bottom = Widget.Window({
  anchor: ['bottom'],
  className: 'popups',
  name: 'bottom-popups',
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    // children: [ Indicators, Dock ], // TODO:
  }),
})

export default [ Top, Bottom ]
