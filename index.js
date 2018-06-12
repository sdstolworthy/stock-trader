var credentials = {
  username: 'sdstolworthy@gmail.com',
  password: 'ceenrps93S',
}

var robinhoodSdk = require('robinhood')
const Robinhood = robinhoodSdk(credentials, () => {
  Robinhood.quote_data('CEI', function(err, resp, body) {
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
        console.log(err)
      }
      // console.log(body, resp)
      Robinhood.place_buy_order(options, function(error, response, body) {
        console.log('in buy')
        if(error) {
          console.log(error)
        } else {
          console.log(body)
        }
      })
    }
  })

})
