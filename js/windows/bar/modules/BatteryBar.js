import PanelButton from './PanelButton.js'
import { FontIcon } from '../../../misc/main.js'
import { services, options, icons } from '../../../constants/main.js'

const { battery } = options
const { Battery } = services

const Indicator = Widget.Stack({
  children: {
    false: FontIcon(icons.battery.default),
    true: FontIcon(icons.battery.charging)
  },
  visible: options.battery.bar.showIcon.bind('value'),
  setup: self => self.hook(Battery, stack => 
    stack.shown = `${Battery.charging || Battery.charged}`
  ),
})

const PercentLabel = () => Widget.Revealer({
  transition: 'slide_right',
  revealChild: options.battery.showPercentage.bind('value'),
  child: Widget.Label({ 
    label: Battery.bind('percent').transform(p => `${p}%`),
  }),
})

const LevelBar = () => Widget.LevelBar({
  setup: self => self.hook(
    battery.bar.full, self => {
      const value = battery.bar.full.value ? 'fill' : 'center'
      self.vpack = value
      self.hpack = value
    }
  ),
  value: Battery.bind('percent').transform(p => p / 100),
})

const WholeButton = Widget.Overlay({
  child: LevelBar(),
  passThrough: true,
  className: 'whole-button',
  overlays: [
    Widget.Box({
      hpack: 'center',
      children: [
        FontIcon({ 
          icon: icons.battery.charging, 
          visible: Battery.bind('charging'),
        }),
        Widget.Box({ 
          hpack: 'center', 
          vpack: 'center', 
          child: PercentLabel() 
        }),
      ],
    })
  ],
})

const Content = Widget.Box({
  visible: Battery.bind('available'),
  children: options.battery.bar.full.bind('value').transform(full => full
    ? [WholeButton] : [
      Indicator,
      PercentLabel(),
      LevelBar(),
    ]),
  setup: self => self.hook(Battery, w => {
    w.toggleClassName('half', Battery.percent < 48)
    w.toggleClassName('low', Battery.percent < battery.low.value)
    w.toggleClassName('medium', Battery.percent < battery.medium.value)
    w.toggleClassName('charging', Battery.charging || Battery.charged)
  }),
})

export default PanelButton({ 
  content: Content, 
  className: 'battery-bar',
  onClicked: () => battery.showPercentage.value = !options.battery.showPercentage.value, 
})
