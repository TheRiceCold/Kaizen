import { Widget, Mpris, Utils } from '../../../../../imports.js'
import { icons } from '../../../../../constants/main.js'

/**
 * @param {string} coverPath
 */
const blurCoverArtCss = coverPath => {

  /** @param {string} bg
  *   @param {string} color
  */
  const genCss = (bg, color) =>
    `background-image: radial-gradient(
      circle at right,
      rgba(0, 0, 0, 0),
      ${color} 11.5rem), url('${bg}');
    background-position: right top, right top;
    background-size: contain;
    transition: all 0.7s ease;
    background-repeat: no-repeat;`

  if(coverPath) {
    const color = Utils.exec(`bash -c "convert ${coverPath} -crop 5%x100%0+0+0 -colors 1 -unique-colors txt: | head -n2 | tail -n1 | cut -f4 -d' '"`)
    return genCss(coverPath, color)
  }
  return 'background-color: #0e0e1e'
}

/**
 * @param {import('types/service/mpris').MprisPlayer} player
 * @param {import('types/widgets/icon').Props} props
 */
const PlayerIcon = (player, { ...props } = {}) => {
  const icon = Utils.lookUpIcon(player.entry)
    ? player.entry
    : icons.mpris.fallback
  return Widget.Icon({
    ...props,
    className: 'music-player-icon',
    icon: icon,
  })
}

/**
 * @param {import('types/service/mpris').MprisPlayer} player
 */
const MprisPlayer = player => Widget.Box({
  className: 'music-container',
  css: player.bind('cover_path').transform(path => blurCoverArtCss(path)),
  vertical: true,
  children: [
    Widget.Box({
      tooltip_text: player.identity || '',
      children: [
        PlayerIcon(player),
        Widget.Label({
          label: player.identity,
          className: 'music-player-name',
        })
      ]
    }),
    Widget.Box({
      vertical: true,
      children: [
        Widget.Box({
          vertical: true,
          children: [
            Widget.Label({
              xalign: 0,
              truncate: 'end',
              max_width_chars: 35,
              className: 'music-title',
              label: player.bind('track_title')
            }),
            Widget.Label({
              max_width_chars: 35,
              truncate: 'end',
              className: 'music-artist',
              xalign: 0,
              label: player.bind('track_artists').transform(art => art.join(', '))
            }),
          ]
        }),
        Widget.Box({
          className: 'music-control-box',
          children: [
            Widget.Box({
              vpack: 'center',
              spacing: 10,
              children: [
                Widget.Button({
                  className: 'music-button',
                  onClicked: () => player.previous(),
                  child: Widget.Icon(icons.mpris.prev),
                }),
                Widget.Button({
                  onClicked: () => player.playPause(),
                  child: Widget.CircularProgress({
                    className: 'music-progress',
                    start_at: 0.75,
                    child: Widget.Icon({ className: 'music-button' }).hook(Mpris, (icon) => {
                      let icn = icons.mpris.stopped
                      if (player.play_back_status === 'Playing')
                        icn = icons.mpris.playing
                      else if (player.play_back_status === 'Paused')
                        icn = icons.mpris.paused

                      icon.icon = icn
                    }),
                  })
                    .hook(player, prog => {
                      if (!player) return
                      prog.value = player.position / player.length
                    })
                    .poll(1000, prog => {
                      if (!player) return
                      prog.value = player.position / player.length
                    })
                }),
                Widget.Button({
                  className: 'music-button',
                  onClicked: () => player.next(),
                  child: Widget.Icon(icons.mpris.next)
                }),
              ]
            }),
          ]
        })
      ]
    })
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'qs-menu',
  children: [
    Widget.Box({
      spacing: 5,
      hexpand: true,
      vertical: true,
      attribute: {
        'player': new Map(),
        'onAdded': (box, id) => {
          const player = Mpris.getPlayer(id)
          if (!id || !player || box.attribute.player.has(id)) return
          const playerWidget = MprisPlayer(player)
          box.attribute.player.set(id, playerWidget)
          box.pack_start(playerWidget, false, false, 0)
        },
        'onRemoved': (box, id) => {
          if (!id || !box.attribute.player.has(id)) return
          box.attribute.player.get(id).destroy()
          box.attribute.player.delete(id)
        }
      }
    }).hook(Mpris, (box, id) => box.attribute.onAdded(box, id), 'player-added')
      .hook(Mpris, (box, id) => box.attribute.onRemoved(box, id), 'player-closed')
  ]
})

