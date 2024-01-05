import { Widget } from '../../imports.js'
import { Clock } from '../../misc/main.js'

const TimeDate = Widget.Box({
  hpack: 'start',
  vpack: 'start',
  vertical: true,
  className: 'bg-time-box',
  children: [
    Clock({ 
      interval: 5000,
      format: '%I:%M %p',
      className: 'bg-time-clock',
    }),
    Clock({ 
      interval: 5000,
      format: '%A, %m/%d/%Y',
      className: 'bg-time-date',
    })
  ],
})

export default Widget.Window({
  name: 'desktop',
  child: TimeDate,
  layer: 'background',
  className: 'desktop',
  anchor: ['top', 'bottom', 'left', 'right'],
})
