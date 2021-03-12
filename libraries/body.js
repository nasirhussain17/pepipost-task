const users = require('../users-data/users');
function getBody(){
        var userdata =[]
        var userinfo={}
        users.map((user)=>{
        userinfo={
            "email":user.email,
            "name":user.name
        }
        userdata.push(userinfo)
        })

        let body={
            "from": {
            "email": "info@tagnpin.com",
            "name": "Lesley Knope"
            },
            "subject": "Tribute to Lil'Sebastian",
            "template_id": 0,
            "content": [
            {
                "type": "html",
                "value": "[%LEAD%] & [%BAND%] will be singing a tribute song for our Lil'Sebastian."
            }
            ],
            "personalizations": [
            {
                "attributes": {
                "LEAD": "Andy Dwyer",
                "BAND": "Mouse Rat"
                },
                "to": userdata,
            }
            ],
        }
  return body;
}
module.exports = getBody