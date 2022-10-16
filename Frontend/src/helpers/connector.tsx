import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import{ CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

// Heroku deploy: https://cs4261todolist.herokuapp.com/
var host = "http://localhost:8080";

var url = host + "/api/v1/";

export async function register(email:string, password:string, fname:string, lname:string, role:string){

    let content = await client({
        method: 'post',
        url: url+"register",
        data: {
          email: email,
          password: password,
          fname: fname,
          lname: lname,
          role: role,
        }
      });
    return content;
}

export async function userdel(){

    let content = await client({
        method: 'delete',
        url: url+"delete",
        withCredentials: true
      });
    return content;
}

export async function login(email:string, password:string){

    let content = await client({
        method: 'post',
        url: url+"login",
        withCredentials: true,
        data: {
          email: email,
          password: password, 
        }
      });
    return content;
}

export async function logout(){

    let content = await client({
        method: 'post',
        url: url+"logout",
        withCredentials: true
      });
    return content;
}

export async function getinfo(){

    let content = await client({
        method: 'get',
        url: url+"info",
        withCredentials: true
      });
    return content;
}

export async function runall(){ //for testing only

    await register("bigguy@gmail.com", "big stuff","big","guy","student").then(()=>console.log("success reg")).catch(()=>console.log("unsuc reg"));
    await login("bigguy@gmail.com", "big stuff").then(()=>console.log("success login")).catch(()=>console.log("unsuc login"));
    await getinfo().then((content)=>console.log(content.data)).catch((err)=>console.log("uncomfy"));
    await logout().then(()=>console.log("logout suc")).catch(()=>(console.log("logout err")));
    await userdel().then(()=>console.log("del suc")).catch((err)=>console.log("del err"));
    await login("bigguy@gmail.com", "big stuff").then(()=>console.log("success login")).catch(()=>console.log("unsuc login"));
    await userdel().then(()=>console.log("del suc")).catch((err)=>console.log("del err"));
}
