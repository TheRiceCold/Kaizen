import { services } from '../../constants/main.js'
import { Notification } from '../../misc/main.js'

const { Notifications } = services

export default Widget.Box({
  vertical: true,
  className: 'notification-popup spacing-v-5-revealer',
  attribute: {
    map: new Map(),

    dismiss: (box, id, force = false) => {
      if (!id || !box.attribute.map.has(id)) 
        return

      const notif = box.attribute.map.get(id)
      if (notif === null || notif.attribute.hovered && !force)
        return

      notif.revealChild = false
      notif.attribute.destroyWithAnims()
      box.attribute.map.delete(id)
    },

    notify: (box, id) => {
      if (!id || Notifications.dnd) return
      if (!Notifications.getNotification(id)) return

      box.attribute.map.delete(id)

      const notification = Notifications.getNotification(id)
      const newNotif = Notification({ notification, isPopup: true })
      box.attribute.map.set(id, newNotif)
      box.pack_end(box.attribute.map.get(id), false, false, 0)
      box.show_all()
    },
  },
  setup: self => self
    .hook(Notifications, (box, id) => box.attribute.notify(box, id), 'notified')
    .hook(Notifications, (box, id) => box.attribute.dismiss(box, id), 'dismissed')
    .hook(Notifications, (box, id) => box.attribute.dismiss(box, id, true), 'closed')
})