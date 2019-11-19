let sysData = {
  apiUrl: 'http://47.104.186.222:8100',
  serverErrCode: [{
    code: -999,
    msg: '',
    action: '/login'
  }],
  uri: {
    userinfo: {
      login: '/userInfo/login',
      sendcode: '/userInfo/sendPhone',
      insertUser: '/userInfo/insertUser',
      searchByUserId: '/userInfo/searchByUserId',
      searchForUserId: '/userInfo/searchForUserId',
      batchDelete: '/userInfo/batchDelete'
    },
    family: {
      searchFamilyList: '/userFamilyInfo/searchFamilyList',
      insertUserFamily: '/userFamilyInfo/insertUserFamily',
      updateFamily: '/userFamilyInfo/updateFamily',
      deleteFamily: '/userFamilyInfo/deleteFamily',
      getFamilyList: '/userFamilyInfo/getFamilyList'
    },
    userFamilyLock: {
      insertFamilyLock: '/userFamilyLock/insertFamilyLock',
      findFamilyLockDetails: '/userFamilyLock/findFamilyLockDetails',
      deleteFamilyLock: '/userFamilyLock/deleteFamilyLock',
      updateFamilyLock: '/userFamilyLock/updateFamilyLock'
    },
    lockInfo: {
      list: '/lockInfo/list',
      updateLock: '/lockInfo/updateLock',
      searchLock: '/lockInfo/searchLock'
    },
    lockWarningLog: {
      lockOpeningRecord: '/lockWarningLog/lockOpeningRecord',
      lockPolice: '/lockWarningLog/lockPolice',
      offLinePolice: '/lockWarningLog/offLinePolice',
      electricityPolice: '/lockWarningLog/electricityPolice'
    },
    userPassword: {
      // TBD
      disposablePassword: '/userPassword/disposablePassword',
      temporaryPassword: '/userPassword/temporaryPassword',
      resettingUserPassword: '/userPassword/resettingUserPassword',
      deletePassword: '/userPassword/delete'
    },
    lockOpenLog: {
      lockOpenRecord: '/lockOpenLog/lockOpenRecord'
    }
  }
}

sysData.IsArray = function (obj) {
  if (obj === undefined || obj === null) return false
  if (typeof obj !== 'object') return false
  if (typeof obj.length === 'number') {
    return true
  } else {
    return false
  }
}

sysData.IsAdminUser = function (usertype) {
  return usertype === '1'
}

sysData.androidPermission = function (permissions, authority, successCb, failureCb) {
  // 校验app是否有安卓权限
  permissions.checkPermission(authority, function (cs) {
    // hasPermission 验证是否成功
    if (!cs.hasPermission) {
      // app申请写入权限
      permissions.requestPermission(authority, function (s) {
        if (s.hasPermission) {
          // 申请成功
          successCb()
        } else {
          // 申请失败
          failureCb()
        }
      }, function (error) {
        console.log('requestPermission failed', error)
      })
    } else {
      // 拥有权限
      successCb()
    }
  }, function (error) {
    console.log('checkPermission failed', error)
  })
}
sysData.IsDateExpired = function (stringTime) {
  var stamp = Date.parse(new Date(stringTime))
  var newDate = new Date()
  let stampCmp = newDate.getTime()
  console.log('IsDateExpired', stampCmp - stamp, stampCmp, stamp)
  return stampCmp > stamp
}

sysData.convertFormatDate = function (stringTime) {
  // stringTime = '2017-09-15T11:08:13.681648';
  var timestamp = Date.parse(new Date(stringTime))
  var newDate = new Date()
  newDate.setTime(timestamp * 1000)
  return newDate
}

sysData.getCalculatedDate = function (day, hour) { // 2019-11-11T13:33:20.035Z
  let nowdate = new Date(+new Date() + 8 * 3600 * 1000)
  if (day !== undefined || hour !== undefined) {
    let timestamp = nowdate.getTime()
    timestamp = timestamp / 1000
    if (day !== undefined) {
      timestamp += day * 24 * 3600
    }
    if (hour !== undefined) {
      timestamp += hour * 3600
    }
    nowdate.setTime(timestamp * 1000)
  }
  // let t = nowdate.toJSON()
  return nowdate.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

sysData.checkServerErrCode = function (res, that) {
  sysData.serverErrCode.forEach(code => {
    if (res.code === code.code) {
      if (code.action !== undefined) {
        that.$router.push(code.action)
      } else {
        that.$alert(res.content + res.code)
      }
    }
  })
}

sysData.updateLockStatus = function (l, electricity, lockSignal) {
  // 'offlineBattery', 'lowBattery', 'normalBattery'],
  // ['offlineSignal', 'lowSignal', 'normalSignal'],
  let batteryImg = 'offlineBattery'
  let signalImg = 'offlineSignal'
  let batteryDesc = '离线'
  let signalDesc = '离线'
  if (electricity >= 4.5) {
    batteryImg = 'normalBattery'
    batteryDesc = '电量正常'
  } else if (electricity >= 3.6) {
    batteryImg = 'lowBattery'
    batteryDesc = '低电量'
  }
  if (lockSignal >= 10) {
    signalImg = 'normalSignal'
    signalDesc = '信号正常'
  } else if (lockSignal > 0) {
    signalImg = 'lowSignal'
    signalDesc = '信号差'
  }
  l.batteryImg = batteryImg
  l.batteryDesc = batteryDesc
  l.signalImg = signalImg
  l.signalDesc = signalDesc
}

sysData.backendLock2Frontend = function (l, familyId) {
  let t = {
    electricity: l.electricity, // 电量
    errorStatus: l.errorStatus, // 错误状态(1=正常、2=故障、3=冻结门锁) ,
    imei: l.imei, // 门锁唯一标识 ,
    lockInfoId: l.lockInfoId, // 门锁的id
    lockSignal: l.lockSignal, // 信号强度
    name: l.name, // 门锁名称
    onlineStatus: l.onlineStatus, // 在线状态(1=在线、2=离线) ,
    type: l.type, // 关联类型(1=房主、2=家庭成员)

    // translated message
    familyId: familyId,

    model: 'NB-P10',
    fmversion: 'v1.0'
  }
  sysData.updateLockStatus(t, l.electricity, l.lockSignal)
  return t
}
export default sysData
