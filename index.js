import express from "express";
import morgan from "morgan"
const app = express();
const PORT = 4000;

const usersData = [
    {
       id: 1,
       name: "Hassan",
       age: 18
    },
    {
        id: 2,
        name: "Ali",
        age: 25
    },
    {
        id: 3,
        name: "Usman",
        age: 22
    },
    {
        id: 4,
        name: "Raza",
        age: 15
    },
    {
        id: 5,
        name: "Daniyal",
        age: 28
    },
    {
        id: 6,
        name: "Obaid",
        age: 20
    }
]

function middleware(req, res, next){
    console.log("Middleware ===>", Date.now());
    req.requestBy = "Hassan" // ham middleware ke through koi key bhi add karsakte hain like: requestBy, xyzKey etc.
    // res.status(500).send("System hang") // response yahan se stop bhi karsakty hain.
    next() // agar next() nhi lagaynge to load hota rahe ga aage nhi jayga.
}
// Real life example of middleware //
// for example get ki request par login waghera ka issue nhi hota isliye get par nhi lagaynge but agar user kuch post karna chahta hai to usko pehle login karna parega ab ham middleware POST par lagaynge. 

app.use(morgan("tiny"))
// morgan installed from npm i morgan. ye konsi api call howi hai wo check karne ke liye use krte hain, ye req ki details show karta hai ke konsi req call howi h or konse route pe call howi hai. 
// samajho ye application level middleware lag gaya h.

app.use(middleware) 
// ye middleware pure app par laga howa hai means application level par laga howa hai har request par chalega, seperate request par bhi laga sakte hain.

app.use(express.json())
// ham body main jo data send krte hain postman ke through ye usko json main convert krta h, ye nhi lagaynge to req.body main undefined ayga.

app.get('/', (req, res)=>{
    console.log("Request By ===>", req.requestBy);
    res.send(usersData)
})

app.post('/', (req, res)=>{
    res.send("Post API is called!!")
})

app.put('/', (req, res)=>{
    res.send("Put API is called!!")
})

app.delete('/', (req, res)=>{
    res.send("Delete API is called!!")
})

// this is used to run our server, localhost.
app.listen(PORT, ()=>{
    console.log("Server is Running"+" "+PORT);  
})

// All Requests Summary //
// jab bhi request ati hai to callback milta hai or usme 2chezain milti hain. 1.request 2.response
// response:res dena zarori hai agar ham response:res nahi send karenge to localhost par reload hota rahega.
// Status //
// (Status send karna zarori hai is se frontend ko pata chalega ke kia error hai.) 
// status: 200 (OK) Request is successfull.
// status: 201 (Created) Jab DB main koi new data add ho or successfully get hojaye to 201 status dete hain.
// status: 400 (Bad Request) Server ko request samajh nahi aayi.
// status: 403 (Forbidden) Client ko request access karne ki permission nahi hai.
// status: 404 (Not Found) Requested resource nahi mila, route missing etc.
// status: 500 (Internal Server Error) means hamny data sahi send kia hai server pe koi masla hogaya.