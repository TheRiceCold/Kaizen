import { type BarWidget } from 'widget/bar/Bar'
import { opt, mkOptions } from 'lib/option'

const options = mkOptions(OPTIONS, {
  autotheme: opt(false),

  wallpaper: opt(`/home/${USER}/.config/background`, { persistent: true }),

  theme: {
    dark: {
      primary: {
        bg: opt('#6AAAFF'),
        fg: opt('#141414'),
      },
      error: {
        bg: opt('#e55f86'),
        fg: opt('#141414'),
      },
      bg: opt('#373559'),
      fg: opt('#eeeeee'),
      widget: opt('#eeeeee'),
      border: opt('#eeeeee'),
    },
    light: {
      primary: {
        bg: opt('#426ede'),
        fg: opt('#eeeeee'),
      },
      error: {
        bg: opt('#b13558'),
        fg: opt('#eeeeee'),
      },
      bg: opt('#fffffa'),
      fg: opt('#171717'),
      widget: opt('#080808'),
      border: opt('#080808'),
    },

    blur: opt(0),
    scheme: opt<'dark' | 'light'>('dark'),
    widget: { opacity: opt(94) },
    border: {
      width: opt(1),
      opacity: opt(96),
    },

    shadows: opt(true),
    padding: opt(7),
    spacing: opt(12),
    radius: opt(11),
  },

  transition: opt(200),

  font: {
    size: opt(10),
    name: opt('JetBrainsMono Nerd Font'),
  },

  bar: {
    flatButtons: opt(true),
    position: opt<'top' | 'bottom'>('top'),
    corners: opt(true),
    layout: {
      start: opt<BarWidget[]>([
        // 'overview',
        'launcher',
        // 'taskbar',
        // 'expander',
        // 'messages',
      ]),
      center: opt<BarWidget[]>([ 'workspaces' ]),
      end: opt<BarWidget[]>([
        // 'media',
        'expander',
        'tray',
        // 'system',
        'battery',
        'date'
      ]),
    },
    launcher: {
      icon: {
        colored: opt(true),
        icon: opt('system-search-symbolic'),
      },
      label: { colored: opt(false), label: opt(''), },
      action: opt(() => App.toggleWindow('applauncher')),
    },
    date: {
      format: opt('%a %d %I:%M  '),
      action: opt(() => App.toggleWindow('quicksettings')),
    },
    battery: {
      bar: opt<'hidden' | 'regular' | 'whole'>('whole'),
      charging: opt('#93CDA8'),
      percentage: opt(false),
      blocks: opt(10),
      width: opt(28),
      low: opt(30),
    },
    workspaces: {
      workspaces: opt(9),
    },
    taskbar: {
      monochrome: opt(true),
      exclusive: opt(false),
    },
    messages: {
      action: opt(() => App.toggleWindow('datemenu')),
    },
    tray: {
      ignore: opt([ 'KDE Connect Indicator' ]),
    },
    media: {
      monochrome: opt(true),
      preferred: opt('spotify'),
      direction: opt<'left' | 'right'>('right'),
      length: opt(40),
    },
    powermenu: {
      monochrome: opt(false),
      action: opt(() => App.toggleWindow('powermenu')),
    },
  },

  applauncher: {
    iconSize: opt(62),
    width: opt(0),
    margin: opt(80),
    maxItem: opt(6),
    favorites: opt([
      'firefox',
      'org.gnome.Nautilus',
      'org.gnome.Calendar',
      'obsidian',
      'discord',
      'spotify',
    ]),
  },

  overview: {
    scale: opt(9),
    workspaces: opt(7),
    monochromeIcon: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
    layout: opt<'line' | 'box'>('line'),
    labels: opt(true),
  },

  quicksettings: {
    avatar: {
      image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
      size: opt(70),
    },
    width: opt(380),
    position: opt<'left' | 'center' | 'right'>('right'),
    networkSettings: opt('gtk-launch gnome-control-center'),
    media: {
      monochromeIcon: opt(true),
      coverSize: opt(100),
    },
  },

  datemenu: {
    position: opt<'left' | 'center' | 'right'>('center'),
  },

  osd: {
    progress: {
      vertical: opt(true),
      pack: {
        h: opt<'start' | 'center' | 'end'>('end'),
        v: opt<'start' | 'center' | 'end'>('center'),
      },
    },
    microphone: {
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('end'),
      },
    },
  },

  notifications: {
    position: opt<Array<'top' | 'bottom' | 'left' | 'right'>>(['top', 'right']),
    blacklist: opt(['Spotify']),
    width: opt(440),
  },

  hyprland: {
    gaps: opt(1),
    inactiveBorder: opt('333333ff'),
  },
})

globalThis['options'] = options
export default options
