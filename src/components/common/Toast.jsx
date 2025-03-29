import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Toast utility functions for displaying notifications
 * 
 * @example
 * // Display a success toast
 * showToast.success('Account created successfully!');
 * 
 * // Display an error toast
 * showToast.error('Failed to save changes.');
 * 
 * // Display an info toast with custom options
 * showToast.info('Your session will expire soon.', { 
 *   autoClose: 5000,
 *   position: 'bottom-center'
 * });
 */
export const showToast = {
  success: (message, options = {}) => toast.success(message, options),
  error: (message, options = {}) => toast.error(message, options),
  info: (message, options = {}) => toast.info(message, options),
  warning: (message, options = {}) => toast.warning(message, options),
  // Add a method for custom toast without pre-defined styling
  custom: (message, options = {}) => toast(message, options)
};

/**
 * Toast component that displays notifications
 * 
 * @param {Object} props
 * @param {string} props.position - Position of the toast container
 * @param {number} props.autoClose - Auto close time in ms (false to disable)
 * @param {boolean} props.closeOnClick - Whether to close on click
 * @param {boolean} props.draggable - Whether toasts can be dragged
 * @param {string} props.theme - Theme ('light', 'dark', or 'colored')
 */
const Toast = ({
  position = 'top-right',
  autoClose = 3000,
  closeOnClick = true,
  draggable = true,
  theme = 'light'
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={closeOnClick}
      rtl={false}
      pauseOnFocusLoss
      draggable={draggable}
      pauseOnHover
      theme={theme}
      toastClassName="font-sans"
      // Custom styling to match your app's aesthetics
      style={{ zIndex: 9999 }}
    />
  );
};

export default Toast;
