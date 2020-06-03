import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import AppConfig from './AppConfig'
import {setSession, getSession} from '../Utils/Utils'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '302',
  storeConfig: {
    key: 'root',
    storage: storage, // Come back and replace this at some point
    // storage: 'AsyncStorage', // Come back and replace this at some point
    blacklist: [], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

const currentReducerVersion = getSession('currentReducerVersion')
console.log('currentReducerVersionSession===>', currentReducerVersion)
const nextReducerVersion = REDUX_PERSIST.reducerVersion
if (currentReducerVersion !== nextReducerVersion) {
  setSession({currentReducerVersion: nextReducerVersion, [AppConfig.loginFlag]: false})
}
// setSession({name: 'opet', alamat: 'jakarta'})

export default REDUX_PERSIST
