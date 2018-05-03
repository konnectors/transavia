

The service use https://www.gigya.com/ for account management
https://developers.gigya.com/display/GD/accounts.login+REST

See useful url in src/index.js

### Things we kown about auth :

## Signin auth don't work

It is due to some part of auth made by js code.

## Minimal logged request that work extract from a webbrowser:
```
curl 'https://www.transavia.com/fr-FR/mon-transavia/compte/apercu-du-compte/'
  -H 'Cookie: ASP.NET_SessionId=XXXXXXXXXXXXXXXX;
              glt_3_taaiCfP3iDMp4z_VcVEqowqZ-P-Ervma1e6TgKcrFdEan6Nbd0IjUjJ0umu-vYfF=LT3_XXXXXXXXXXX%7CUUID%3DXXXXX'
```
Should receive a html mentionning 'Bonjour {prénom}'


## How to get LT3Token (POST login at gigya.com):


The request against gigya.com in index.js can give the token in JS.
During webbrowser auth, a full js function as callback is given.

We can modify the request to have a json with LT3TOken ready
Using reverse and gigya docs https://developers.gigya.com/display/GD/accounts.login+REST
We need to get the transavia api key for gigya api.
```
curl 'https://accounts.eu1.gigya.com/accounts.login'
  -H 'Cookie:  apiDomain_3_Y-cDedqT0nYgjVVcsZMBb0i9JkwLbjb74RhtMVVcquSPYu_kK34xyNAP0Ph5_wBO=eu1.gigya.com'
  --data 'loginID=email@example.com&
          password=mypassword&
          targetEnv=jssdk&
          APIKey=3_taaiCfP3iDMp4z_VcVEqowqZ-P-Ervma1e6TgKcrFdEan6Nbd0IjUjJ0umu-vYfF'
```

The token gived seems legit but can't be tested in the field because of ASP.NETSessionID cookie
NB : the token need to be urlencoded in cookie


## Things we known about ASP.NETSessionId

- Request without a VALID one redirect to logon by 302
- Set as soon as the first request
- Didn't change during a full web browser login
- Can't be find as ASP.NETSessionId or as clear text value in a full HAR
- Is probably use in context by the js callback given by gigya
- Can be generated after some other requests during log (/validateLogon, or cdns.eu1.gigya.com/gs/sso.htm)




