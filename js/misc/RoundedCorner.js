import { Widget, Utils } from '../imports.js'

const Lang = imports.lang
const { NORMAL } = imports.gi.Gtk.StateFlags

export default (place, className) => Widget.DrawingArea({
  className,
  hpack: place.includes('left') ? 'start' : 'end',
  vpack: place.includes('top') ? 'start' : 'end',
  setup: (widget) => Utils.timeout(1, () => {
    const r = widget.get_style_context().get_property('border-radius', NORMAL)
    widget.set_size_request(r, r)
    widget.connect('draw', Lang.bind(widget, (widget, cr) => {
      const c = widget.get_style_context().get_property('background-color', NORMAL)
      const r = widget.get_style_context().get_property('border-radius', NORMAL)
      widget.set_size_request(r, r)

      switch (place) {
        case 'topleft':
          cr.arc(r, r, r, Math.PI, 3 * Math.PI / 2)
          cr.lineTo(0, 0)
          break

        case 'topright':
          cr.arc(0, r, r, 3 * Math.PI / 2, 2 * Math.PI)
          cr.lineTo(r, 0)
          break

        case 'bottomleft':
          cr.arc(r, 0, r, Math.PI / 2, Math.PI)
          cr.lineTo(0, r)
          break

        case 'bottomright':
          cr.arc(0, 0, r, 0, Math.PI / 2)
          cr.lineTo(r, r)
          break
      }

      cr.closePath()
      cr.setSourceRGBA(c.red, c.green, c.blue, c.alpha)
      cr.fill()
    }))
  }),
})