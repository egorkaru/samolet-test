import React from 'react'
import { Result, Button } from 'antd'
import { FormattedMessage } from 'react-intl'

const ErrorResult = () => (
  <Result
    status="error"
    title={<FormattedMessage id="ErrorResult.title" />}
    subTitle={<FormattedMessage id="ErrorResult.subtitle" />}
    extra={
      <Button type="primary" onClick={() => document.location.reload()}>
        <FormattedMessage id="ErrorResult.button" />
      </Button>
    }
  />
)

export default ErrorResult
