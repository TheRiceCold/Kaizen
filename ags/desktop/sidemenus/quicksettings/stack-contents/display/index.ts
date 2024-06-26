import Header from '../Header'
import Brightness from './Brightness'

import ThemeSettings from './theme-settings'

import options from 'options'

const { scheme } = options.theme

export default Widget.Box(
  { vertical: true, className: 'display-options' },
  Header('Display Options', [
    Widget.Button({
      cursor: 'pointer',
      tooltipText: 'Click to toggle',
      label: scheme.bind().as((s: string) => `Color mode: ${s}`),
      onClicked() { scheme.value = (scheme.value === 'dark') ? 'light' : 'dark' },
    }),
  ]),
  Widget.Box({ vertical: true }, Brightness, ThemeSettings)
)
