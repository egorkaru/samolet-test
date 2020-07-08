import React from 'react'
import { Layout, ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import ruRU from 'antd/lib/locale-provider/ru_RU'

import Internationalization from 'components/Internationalization'
import LibraryProvider from 'store/library/LibraryProvider'
import Routes from 'routes/Routes'

import 'app.css'


export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={ruRU}>
        <Internationalization>
          <LibraryProvider>
            <Layout className="app-layout">
              <Routes />
            </Layout>
          </LibraryProvider>
        </Internationalization>
      </ConfigProvider>
    </BrowserRouter>
  )
}
