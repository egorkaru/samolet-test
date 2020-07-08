import React from 'react'
import { PageHeader, Layout, Skeleton, Descriptions } from 'antd'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { useFindLibrary } from 'store/library/LibraryHooks'
import SiteMap from 'routes/SiteMap'
import ErrorResult from 'components/ErrorResult'

const { Content } = Layout

const Library = ({ match: { params: { kopuk }}}) => {
  const { data, isLoading, isError } = useFindLibrary(kopuk)
  const history = useHistory()

  const showData = data && !isLoading
  return (
    <>
      <PageHeader
        title={<FormattedMessage id="LibraryPage.title" />}
        subTitle={(!isLoading && data) && data.territory}
        onBack={() => history.push(SiteMap.home())}
      />
      <Content className="page-content">
        {isLoading && <Skeleton />}
        {isError && <ErrorResult />}
        {showData && (
          <Descriptions bordered>
            {Object.keys(data).map(
              key => (
                <Descriptions.Item
                  key={key}
                  label={<FormattedMessage id={`LibraryPage.description.${key}`} />}
                >
                  {data[key]}
                </Descriptions.Item>
              )
            )}
          </Descriptions>
        )}
      </Content>
    </>
  )
}

export default Library
