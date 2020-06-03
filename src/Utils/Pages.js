// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
import PageHome from '../Pages/Home/PageHome'
import Concal from '../Pages/Concal/PageConcal'
import Login from '../Pages/Login/PageLogin'

const lp = {
  '/': { route: '/', path: '/', component: PageHome },
  '/home': { route: '/home', path: '/home', component: PageHome },
  '/conference-call': { route: '/conference-call', path: '/conference-call', component: Concal },
  '/login': { route: '/login', path: '/login', component: Login },
  '/signup': { route: '/signup', path: '/signup', component: Concal }
}
export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
