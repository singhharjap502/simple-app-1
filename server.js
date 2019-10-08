const express = require('express');
const socket = require('socket.io');
const axios = require('axios') 

var app = express();

app.use(express.static('./public'))

app.get('/api/:query',(req,res)=>{
  console.log(req.params.query)
  axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.params.query}&api-key=KE8Voxmayfzskq82HqIIR8KHy0InEeT0`).then(response=>{res.send(response.data)}).catch(error=>console.log(error))
})
server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
        const checker = (data)=>{
          console.log(data)
          if(data.message === "hello" || data.message === 'hi' || data.message === 'hey'){
            io.emit("RECEIVE_MESSAGE",{author:'bot', message:"How can I help you"})
          }
           else if(data.message === 'thank you' || data.message === 'thanks' || data.message === 'bye'){
             io.emit("RECEIVE_MESSAGE",{author:'bot', message:"Thank you for using the BOT.GoodBye"})
           }
        }
        checker(data)
    })
});