import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SiteMap from 'routes/SiteMap'
import HomePage from 'pages/Home'
import LibraryPage from 'pages/Library'

const routes = [
  {
    key: 'HomePage',
    path: SiteMap.home(),
    exact: true,
    component: HomePage,
  },
  {
    key: 'LibraryPage',
    path: SiteMap.library(':kopuk'),
    component: LibraryPage,
  },
]

const Routes = () => (
  <Switch>
    {routes.map(route => <Route {...route}/>)}
  </Switch>
)

export default Routes
