import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'

const { interval, format, action } = options.bar.datemenu

const Time = Widget.Label({
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind()
})

export default BarButton({
  child: Time,
  window: 'datemenu',
  className: 'datemenu',
  onClicked: action.bind(),
})