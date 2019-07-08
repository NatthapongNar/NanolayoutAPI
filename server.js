import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { configAccessHeader, config } from './src/config'
import {    
    /** NANO MANAGEMENT LAYOUTS **/
    getMasterEmpTester,
    getLayoutBranchAndMarketInfo,
    getLayoutCustInfo,
    getLayoutMarketShareByCAInfo,
    getLayoutMarketZoneLockInfo,
    setLayoutMarketZoneLocked,

    /** NANO MANAGEMENT DASHBOARD **/
    getLatestImport,
    getRegionSummary,
    getAreaSummary,
    getZoneSummary,
    getBranchSummary,
    getKioskSummary,
    getMarketSummary,
    getCASummary,
    getMarketCASummary,
    getCAListInfo,
    getMarketGridList,
    getMarketCustomerByAuth,
    getMarketCustomerByAuthWarning,
    getMarketCustomerListByAuth,

    getMasterNanoManagementFilter

} from './src/api'

const app = express()
const apiRoutes = express.Router()
const path_uri = '/nanolayout/api'

app.use(configAccessHeader)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

/** NANO MANAGEMENT LAYOUT **/
app.get(`${path_uri}/layout/emp/tester`, getMasterEmpTester)

app.post(`${path_uri}/grid/market`, getMarketGridList)

app.post(`${path_uri}/layout/marketinfo`, getLayoutBranchAndMarketInfo)
app.post(`${path_uri}/layout/custinfo`, getLayoutCustInfo)
app.post(`${path_uri}/layout/camktshare`, getLayoutMarketShareByCAInfo)

app.post(`${path_uri}/layout/lockinfo`, getLayoutMarketZoneLockInfo)
app.post(`${path_uri}/layout/mkt/lockhandle`, setLayoutMarketZoneLocked)

/** NANO MANAGEMENT DASHBOARD **/
app.get(`${path_uri}/latest/import`, getLatestImport)
app.get(`${path_uri}/grid/filter/optional`, getMasterNanoManagementFilter)


app.post(`${path_uri}/grid/customer`, getMarketCustomerByAuth)
app.post(`${path_uri}/grid/customer/warning`, getMarketCustomerByAuthWarning)
app.post(`${path_uri}/grid/custdetails`, getMarketCustomerListByAuth)

app.post(`${path_uri}/summary/region`, getRegionSummary)
app.post(`${path_uri}/summary/area`, getAreaSummary)
app.post(`${path_uri}/summary/zone`, getZoneSummary)
app.post(`${path_uri}/summary/branch`, getBranchSummary)
app.post(`${path_uri}/summary/kiosk`, getKioskSummary)
app.post(`${path_uri}/summary/market`, getMarketSummary)
app.post(`${path_uri}/summary/ca`, getCASummary)
app.post(`${path_uri}/summary/marketca`, getMarketCASummary)

app.get(`${path_uri}/market/cadetails/:marketcode`, getCAListInfo)

app.listen(config.port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`nanolayout listen on port ${config.port}`)
    }
})