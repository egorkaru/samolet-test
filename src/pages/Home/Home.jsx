import React, { useState, useRef } from 'react'
import { PageHeader, Layout, Table, Input, Button, Space } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

import { useLibraryStore } from 'store/library/LibraryHooks'
import SiteMap from 'routes/SiteMap'

const { Content } = Layout

const Styles = {
  render: {
    highlighter: {
      backgroundColor: '#ffc069',
      padding: 0
    },
  },
  filterIcon: {
    searchOutlined: {
      color: '#1890ff'
    },
  },
  filterDropdown: {
    div: {
      padding: 8,
    },
    input: {
      width: 190,
      marginBottom: 8,
      display: 'block',
    },
    button: {
      width: 91,
    },
  }
}

const Home = () => {
  const { formatMessage } = useIntl()
  const { data, isLoading } = useLibraryStore()
  const [searchText, setSearchText] = useState('')
  const searchInputEl = useRef(null)

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const columns = [
    {
      key: 'order',
      title: formatMessage({ id: 'HomePage.table.column.order' }),
      dataIndex: 'order',
    },
    {
      key: 'territory',
      title: formatMessage({ id: 'HomePage.table.column.territory' }),
      dataIndex: 'territory',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={Styles.filterDropdown.div}>
          <Input
            ref={searchInputEl}
            placeholder={formatMessage({ id: 'HomePage.table.filter.placeholder' })}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={Styles.filterDropdown.input}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={Styles.filterDropdown.button}
            >
              <FormattedMessage id="HomePage.table.filter.search" />
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={Styles.filterDropdown.button}>
              <FormattedMessage id="HomePage.table.filter.reset" />
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={filtered ? Styles.filterIcon.searchOutlined : undefined} />,
      onFilter: (value, record) => record.territory.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInputEl.current.select())
        }
      },
      render: text =>
        searchText ? (
          <Highlighter
            highlightStyle={Styles.render.highlighter}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        )
    },
    {
      key: 'libraries',
      title: formatMessage({ id: 'HomePage.table.column.libraries' }),
      dataIndex: 'libraries',
      sorter: (a, b) => a.libraries - b.libraries,
    },
    {
      key: "actions",
      render: ({ kopuk }) => (
        <Link to={SiteMap.library(kopuk)}>
          <FormattedMessage id="HomePage.table.column.action.link" />
        </Link>
      ),
    },
  ]
  return (
    <>
      <PageHeader
        title={<FormattedMessage id="HomePage.title" />}
        backIcon={false}
      />
      <Content className="page-content">
        <Table columns={columns} dataSource={data} loading={isLoading} rowKey="order"/>
      </Content>
    </>
  )
}

export default Home
