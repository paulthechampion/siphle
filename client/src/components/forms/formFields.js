
var today = new Date()
var yyyy = (today.getFullYear())-13
var mm = ("0" + (today.getMonth() + 1)).slice(-2)
var dd = ("0" + (today.getDate() + 1)).slice(-2)
today=yyyy+"-"+mm+"-"+dd

export const signInField =[
    {name:"email", noValueError:"You must provide an Email", placeholder:"Email", type:"email"},
    {name:"password",noValueError:"You mst provide a Password", placeholder:"Password", type:"password"},
]

export const signUpField =[
    {name:"email", noValueError:"You must provide an Email", placeholder:"Email", type:"email"},
    {name:"password",noValueError:"You must provide a Password", placeholder:"Password", type:"password"},
    {name:"confirmPassword",noValueError:"You must provide a Password", placeholder:"Confirm Password", type:"password"}
]

export const addInfoField =[
    {name:"displayname", noValueError:"You can't be nameless", placeholder:"Display Name", type:"text"},
    {name:"username", noValueError:"You must add a unique Username", placeholder:"User name", type:"text"},
    {name:"birthday", noValueError:"Enter Your bithday, You must be at least 13 to use this app", placeholder:"Bithday", type:"date", max:today}
]