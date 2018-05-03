const {
  BaseKonnector,
  requestFactory,
  signin,
  saveFiles,
  addData
} = require('cozy-konnector-libs')
const request = requestFactory({
//  cheerio: true,
  debug: true,
  jar: true
})

const baseUrl = 'https://www.transavia.com/fr-FR'
const accountUrl = baseUrl + '/mon-transavia/compte/apercu-du-compte/'
const loginUrl = baseUrl + '/mon-transavia/compte/logon/'
const gigyaLoginUrl = 'https://accounts.eu1.gigya.com/accounts.login'
const gigyaApiKey = '3_taaiCfP3iDMp4z_VcVEqowqZ-P-Ervma1e6TgKcrFdEan6Nbd0IjUjJ0umu-vYfF'
const authCookieName = 'glt_3_taaiCfP3iDMp4z_VcVEqowqZ-P-Ervma1e6TgKcrFdEan6Nbd0IjUjJ0umu-vYfF'

module.exports = new BaseKonnector(start)

async function start(fields) {
  await login(fields.email, fields.password)

}

async function login(email, pass) {
  const $1 = await request({
    url: loginUrl
  })
  const body = await request({
    url: gigyaLoginUrl,
    method: 'POST',
    form: {
      loginID: email,
      password: pass,
      targetEnv: 'jssdk',
      APIKey: '3_taaiCfP3iDMp4z_VcVEqowqZ-P-Ervma1e6TgKcrFdEan6Nbd0IjUjJ0umu-vYfF'
    }
  })
  LT3Token = encodeURIComponent(body.sessionInfo.login_token)
  console.log(LT3Token)
  cookieString = `${authCookieName}=${LT3Token}`

  // Check to see login, should expect 'Bonjour Prénom'
  await request({
    url: accountUrl,
    headers: {
      Cookie: cookieString
    }
  })


}



// Sigin usage not useful due to js part constructing many things

  // await signin({
  //   url: loginUrl,
  //   formSelector: '#gigya-login-form',
  //   formData: {
  //     loginID: email,
  //     password: pass,
  //     username: email

  //   }
  // })
