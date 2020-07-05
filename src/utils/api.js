import axios from '@/utils/req'

function getAreaJson () {
  return new Promise((resolve, reject) => {
    axios.get('/areas', {
      responseType: 'json',
      crossDomain: true
    }).then(res => {
      resolve(res.data)
    }).catch(
      err => {
        reject(err)
      }
    )
  })
}

function getProvinceData () {
  return new Promise((resolve, reject) => {
    axios.get('/provinceData', {
      responseType: 'json',
      crossDomain: true
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function getNationalData () {
  return new Promise((resolve, reject) => {
    axios.get('/nationStatement', {
      responseType: 'json',
      crossDomain: true
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function getCityData (codeid) {
  return new Promise((resolve, reject) => {
    axios.get('/cityStatement', {
      responseType: 'json',
      crossDomain: true,
      params: {
        codeid
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function getPeople (codeid, page, pageSize, name, idcard) {
  return new Promise((resolve, reject) => {
    axios.get('/people', {
      responseType: 'json',
      crossDomain: true,
      params: {
        codeid,
        page,
        pageSize,
        name,
        idcard
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function getPeopleCount (codeid, name, idcard) {
  return new Promise((resolve, reject) => {
    axios.get('/count', {
      responseType: 'json',
      crossDomain: true,
      params: {
        codeid, name, idcard
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function delPerson (id) {
  return new Promise((resolve, reject) => {
    axios.post('/del_people', {
      responseType: 'json',
      crossDomain: true,
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function updatePerson (person) {
  return new Promise((resolve, reject) => {
    axios.post('/update_people', {
      responseType: 'json',
      crossDomain: true,
      data: {
        person
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function createPerson (person) {
  return new Promise((resolve, reject) => {
    axios.post('/create_people', {
      responseType: 'json',
      crossDomain: true,
      data: {
        person
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export { getAreaJson, getProvinceData, getNationalData, getCityData, getPeople, getPeopleCount, delPerson, updatePerson, createPerson }
