// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
import PageHome from '../Pages/Home/PageHome'
import Concal from '../Pages/Concal/PageConcal'
import Login from '../Pages/Login/PageLogin'
import Signup from '../Pages/SingUp/PageSignup'

const lp = {
  '/': { route: '/', path: '/', component: PageHome },
  '/home': { route: '/home', path: '/home', component: PageHome },
  '/concal': { route: '/concal', path: '/concal', component: Concal },
  '/login': { route: '/login', path: '/login', component: Login },
  '/signup': { route: '/signup', path: '/signup', component: Signup }
}
export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
