import sql from 'mssql'
import { config } from '../config'

const db_config = config.database

/*****************  NANO MANAGEMENT LAYOUT ******************/
export const getMasterEmpTester = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .execute("sp_Market_Layout_AllowTester")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketGridList = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('Assignment', sql.NVarChar, req.body.Assignment)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('BranchType', sql.NVarChar, req.body.BranchType)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('MarketName', sql.NVarChar, req.body.MarketName)
        .input('Optional', sql.NVarChar, req.body.Optional)
        .input('RegisterDateFrom', sql.NVarChar, req.body.RegisterDateFrom)
        .input('RegisterDateTo', sql.NVarChar, req.body.RegisterDateTo)
        .input('ShopRangeFrom', sql.NVarChar, req.body.ShopRangeFrom)
        .input('ShopRangeTo', sql.NVarChar, req.body.ShopRangeTo)
        .execute("sp_Nano_Layout_Market_GridOverview_V2")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getLayoutBranchAndMarketInfo = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketCode', sql.NVarChar, req.body.MarketCode)
        .execute("sp_Nano_Layout_GET_BranchAndMarket_Info")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getLayoutCustInfo = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketCode', sql.NVarChar, req.body.MarketCode)
        .input('PotentialInclude', sql.NVarChar, req.body.MarketCode)
        .execute("sp_Market_Layout_Customer_Information")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getLayoutMarketShareByCAInfo = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketCode', sql.NVarChar, req.body.MarketCode)
        .execute("sp_Market_Layout_SharePort_CAInfo")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getLayoutMarketZoneLockInfo = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketCode', sql.NVarChar, req.body.MarketCode)
        .execute("sp_Market_Layout_ZoneLockInfo")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const setLayoutMarketZoneLocked = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('MarketCode', sql.NVarChar, req.body.MarketCode)
        .input('EventName', sql.NVarChar, req.body.EventName)
        .input('CreateByID', sql.NVarChar, req.body.CreateByID)
        .input('CreateByName', sql.NVarChar, req.body.CreateByName)
        .execute("sp_Market_Layout_ZoneLockHandleInsert")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

/*****************  NANO MANAGEMENT DASHBOARD ******************/
export const getLatestImport = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { return pool.request().query('SELECT * FROM [dbo].[v_NanoLayout_LatestImportFile]') })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketCustomerByAuth = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketName', sql.NVarChar, req.body.MarketName)
        .input('CustomerName', sql.NVarChar, req.body.CustomerName)
        .input('ApplicationNo', sql.NVarChar, req.body.ApplicationNo)
        .input('TopUp', sql.NVarChar, req.body.Topup)
        .input('Product', sql.NVarChar, req.body.Product)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.AreaID)
        .input('BranchCode', sql.NVarChar, req.body.BranchCode)
        .input('EmployeeCode', sql.NVarChar, req.body.Employee)    
        .input('AppDateType', sql.NVarChar, req.body.AppDateType)   
        .input('AppDateFrom', sql.NVarChar, req.body.AppDateFrom)
        .input('AppDateTo', sql.NVarChar, req.body.AppDateTo)
        .input('CycleDayFrom', sql.NVarChar, req.body.CycleDayFrom)
        .input('CycleDayTo', sql.NVarChar, req.body.CycleDayTo)
        .input('OverdueType', sql.NVarChar, req.body.OverdueType)
        .input('OverdueFrom', sql.NVarChar, req.body.OverdueFrom)
        .input('OverdueTo', sql.NVarChar, req.body.OverdueTo)
        .input('MonthOverdueFrom', sql.NVarChar, req.body.MonthOverdueFrom)
        .input('MonthOverdueTo', sql.NVarChar, req.body.MonthOverdueTo)
        .input('NPLFlag', sql.NVarChar, req.body.NPLFlag)
        .input('Isactive', sql.NVarChar, req.body.Isactive)
        .input('Optional', sql.NVarChar, req.body.Optional)
        .input('ModeType', sql.NVarChar, req.body.ModeType)
        .input('WarningCriteria', sql.NVarChar, req.body.WarningCriteria)
        .execute("sp_Nano_Layout_Market_Overview_CustomerV2")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketCustomerByAuthWarning = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketName', sql.NVarChar, req.body.MarketName)
        .input('CustomerName', sql.NVarChar, req.body.CustomerName)
        .input('ApplicationNo', sql.NVarChar, req.body.ApplicationNo)
        .input('TopUp', sql.NVarChar, req.body.Topup)
        .input('Product', sql.NVarChar, req.body.Product)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.AreaID)
        .input('BranchCode', sql.NVarChar, req.body.BranchCode)
        .input('EmployeeCode', sql.NVarChar, req.body.Employee)    
        .input('AppDateType', sql.NVarChar, req.body.AppDateType)   
        .input('AppDateFrom', sql.NVarChar, req.body.AppDateFrom)
        .input('AppDateTo', sql.NVarChar, req.body.AppDateTo)
        .input('CycleDayFrom', sql.NVarChar, req.body.CycleDayFrom)
        .input('CycleDayTo', sql.NVarChar, req.body.CycleDayTo)
        .input('OverdueType', sql.NVarChar, req.body.OverdueType)
        .input('OverdueFrom', sql.NVarChar, req.body.OverdueFrom)
        .input('OverdueTo', sql.NVarChar, req.body.OverdueTo)
        .input('MonthOverdueFrom', sql.NVarChar, req.body.MonthOverdueFrom)
        .input('MonthOverdueTo', sql.NVarChar, req.body.MonthOverdueTo)
        .input('NPLFlag', sql.NVarChar, req.body.NPLFlag)
        .input('Isactive', sql.NVarChar, req.body.Isactive)
        .input('Optional', sql.NVarChar, req.body.Optional)
        .input('ModeType', sql.NVarChar, req.body.ModeType)
        .input('WarningCriteria', sql.NVarChar, req.body.WarningCriteria)
        .execute("sp_Nano_Layout_Market_Overview_CustomerV2_Warning")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketCustomerListByAuth = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('MarketName', sql.NVarChar, req.body.MarketName)
        .input('CustomerName', sql.NVarChar, req.body.CustomerName)
        .input('ApplicationNo', sql.NVarChar, req.body.ApplicationNo)
        .input('TopUp', sql.NVarChar, req.body.Topup)
        .input('Product', sql.NVarChar, req.body.Product)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.AreaID)
        .input('BranchCode', sql.NVarChar, req.body.BranchCode)
        .input('EmployeeCode', sql.NVarChar, req.body.Employee)       
        .input('AppDateFrom', sql.NVarChar, req.body.AppDateFrom)
        .input('AppDateTo', sql.NVarChar, req.body.AppDateTo)
        .input('Isactive', sql.NVarChar, req.body.Isactive)
        .input('Optional', sql.NVarChar, req.body.Optional)
        .execute("sp_Nano_Layout_Market_Overview_CustomerV2_SubGrid")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getRegionSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .execute("sp_Nano_Layout_Overview_RegionSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getAreaSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .execute("sp_Nano_Layout_Overview_AreaSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getZoneSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .execute("sp_Nano_Layout_Overview_ZoneSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getBranchSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .execute("sp_Nano_Layout_Overview_BranchSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getKioskSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .input('Optional', sql.NVarChar, req.body.Optional)   
        .execute("sp_Nano_Layout_Overview_KioskSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketSummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .input('Optional', sql.NVarChar, req.body.Optional)   
        .execute("sp_Nano_Layout_Overview_MarketSummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getCASummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .input('Optional', sql.NVarChar, req.body.Optional)        
        .execute("sp_Nano_Layout_Overview_CASummary")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getMarketCASummary = (req, res) => {
    const pool = new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('AuthID', sql.NVarChar, req.body.AuthID)
        .input('RegionID', sql.NVarChar, req.body.Region)
        .input('AreaID', sql.NVarChar, req.body.Area)
        .input('ZoneValue', sql.NVarChar, req.body.Zone)
        .input('BranchCode', sql.NVarChar, req.body.Branch)
        .input('Employee', sql.NVarChar, req.body.Employee)
        .input('WarningFlag', sql.NVarChar, req.body.WarningFlag)
        .input('Optional', sql.NVarChar, req.body.Optional)        
        .execute("sp_Nano_Layout_Overview_CASummary_ByMarket")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}

export const getCAListInfo = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .input('MarketCode', sql.NVarChar, req.params.marketcode)
        .execute("sp_Nano_Layout_GET_OS_CA_Info")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}


export const getMasterNanoManagementFilter = (req, res) => {
    new sql.ConnectionPool(db_config.nano).connect()
    .then(pool => { 
        return pool.request()
        .execute("sp_Nano_Layout_NanoDashboard_Filter_MasterOptional")
    })
    .then(result => { res.json(result.recordset) })
    .catch(err => { res.json(err) })
}
