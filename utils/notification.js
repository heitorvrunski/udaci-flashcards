import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notification'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Hi!',
        body: " Let`s study a little more.",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            priority: 'high',
            sticky: false,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let notify = new Date()
                            notify.setDate(notify.getDate()+1)
                            notify.setHours(18)
                            notify.setMinutes(15)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: notify,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}