import axios from 'axios';
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT } from '../config';

export const contactAPI = {
  isConfigured: Boolean(CONTACT_FORM_ENDPOINT),

  /** Body: { name, email, subject, message } — posted to the configured form backend. */
  send: async ({ name, email, subject, message }) => {
    const response = await axios.post(
      CONTACT_FORM_ENDPOINT,
      { name, email, _replyto: email, _subject: subject, subject, message },
      { headers: { Accept: 'application/json' } }
    );
    return response.data;
  },

  /** Fallback when no form backend is configured: hand the message to the visitor's mail client. */
  mailtoHref: ({ name, email, subject, message }) => {
    const body = `${message}\n\n— ${name} (${email})`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  },
};
