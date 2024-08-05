import styles from "./Notification.module.css";
import cx from "classnames";
import { ReactComponent as SuccessIcon } from '../../svgs/greenCheck.svg'
import { ReactComponent as ErrorIcon } from '../../svgs/redX.svg'

const icon = {
  'success': SuccessIcon,
  'error': ErrorIcon
}



export const Notification = ({ notificationType, message, messageHeading }) => {
  const IconC = icon[notificationType]
  return (
    <div className={cx(styles.notificationContainer, styles[`${notificationType}Container`], { [styles.hide]: !message })}>
      <div className={cx(styles.notificationIconContainer, styles[notificationType])}>
        {IconC && <IconC style={{
          // zIndex: 5,
          borderRadius: '50%',
          height: '1.5rem',
          width: '1.5rem'
        }} /> }
      </div>
      <div className={styles.messageContainer}>
        <h4 className={styles.messageHeading}>{messageHeading}</h4>
        <p className={styles.message}>{message}</p>

      </div>
    </div>
  )
};
