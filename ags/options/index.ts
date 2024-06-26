import { opt, mkOptions } from 'lib/option'
import windows from './windows'
import theme from './theme'
import fonts from './fonts'

type TShader =
  | 'default'
  | 'blue light'
  | 'grayscale'
  | 'invert'

export default mkOptions(OPTIONS, {
  autotheme: opt(true),
  transition: opt(200),
  avatar: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),

  hyprland: {
    gaps: opt(1.5),
    gapsWhenOnly: opt(false),
    inactiveBorder: opt('333333ff'),
    shader: opt<TShader>('default'),
  },

  wallpaper: {
    market: opt<import('service/wallpaper').Market>('random'),
    resolution: opt<import('service/wallpaper').Resolution>(1920),
  },

  ai: {
    defaultGPTProvider: opt('openai'),
    defaultTemperature: opt(0.9),
    enhancements: opt(true),
    useHistory: opt(true),
    writingCursor: opt(' ...'), // Warning: Using weird characters can mess up Markdown rendering
    proxyUrl: opt(null), // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
  },

  player: {
    preferred: opt('spotify'),
    visualizer: { width: opt(8), height: opt(24) },
  },

  workspaces: {
    num: opt(10),
    scale: opt(8),
    showNumber: opt(true),
    substitutes: opt({
      'vesktop': 'discord',
      'org.gnome.Nautilus': 'files',
      'notion-app-enhanced': 'notion',
      '.blueman-manager-wrapped': 'blueman',
      '.blueman-sendto-wrapped': 'blueman-send',
      '.blueman-adapters-wrapped': 'blueman-adapters',
    })
  },

  ...fonts,
  ...theme,
  ...windows,
})
