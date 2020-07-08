import React from 'react'
import { IntlProvider } from 'react-intl'

import messagesRU from 'locales/ru.json'

const Internationalization = ({ children }) => (
  <IntlProvider locale="ru" messages={messagesRU}>
    {children}
  </IntlProvider>
)

export default Internationalization
