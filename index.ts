require('dotenv').config()
var credentials = {
  username: process.env.RH_UNAME,
  password: process.env.RH_PASS,
}

var robinhoodSdk = require('robinhood')
const Robinhood = robinhoodSdk(credentials, () => {
  Robinhood.quote_data('CEI', function(err: any, resp: any, body: any) {
    // console.log(body)
    if (body && body.results && body.results[0] && body.results[0].bid_price) {
      var options = {
        type: 'limit',
        quantity: 1,
        bid_price: body.results[0].ask_price,
        instrument: {
          url: body.results[0].instrument,
          symbol: body.results[0].symbol
        }
      }
      if (err) {
        //
      }
      // console.log(body, resp)
      Robinhood.place_buy_order(options, function(error: any, response:any, body: any) {
        if(error) {
          console.log(error)
        } else {
          console.log(body)
        }
      })
    }
  })

})
