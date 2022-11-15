import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import{ CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

var host = "http://localhost:8080";

var url = host + "/api/v1/";

//user API

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
        url: url+"deleteUser",
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

//event API

export async function addevent(title:string, description:string, location:string, time:string, invite:string, capacity: string){

  let content = await client({
      method: 'post',
      url: url+"addEvent",
      withCredentials: true,
      data: {
        title: title,
        description: description,
        location: location,
        time: time,
        invite: invite,
        capacity: capacity,
      }
    });
  return content;
}

export async function getevent(page:number){

  let content = await client({
      method: 'get',
      url: url+"getEvent?page="+page.toString(),
      withCredentials: true
    });
  return content;
}

export async function geteventbyid(id:number){

  let content = await client({
      method: 'get',
      url: url+"getEventById?id="+id.toString(),
      withCredentials: true
    });
  return content;
}

export async function geteventsize(){

  let content = await client({
      method: 'get',
      url: url+"getEventSize",
      withCredentials: true
    });
  return content;
}

export async function eventdel(id:number){

  let content = await client({
      method: 'delete',
      url: url+"removeEvent?id="+id.toString(),
      withCredentials: true
    });
  return content;
}


export async function updatetitle(id:number, title:string){

  let content = await client({
      method: 'patch',
      url: url+"updateTitle",
      withCredentials: true,
      data: {
        id: id.toString(),
        title: title,
      }
    });
  return content;
}

export async function updatedescription(id:number, description:string){

  let content = await client({
      method: 'patch',
      url: url+"updateDescription",
      withCredentials: true,
      data: {
        id: id.toString(),
        description: description,
      }
    });
  return content;
}

export async function updatelocation(id:number, location:string){

  let content = await client({
      method: 'patch',
      url: url+"updateLocation",
      withCredentials: true,
      data: {
        id: id.toString(),
        location: location,
      }
    });
  return content;
}

export async function updatetime(id:number, time:string){

  let content = await client({
      method: 'patch',
      url: url+"updateTime",
      withCredentials: true,
      data: {
        id: id.toString(),
        time: time,
      }
    });
  return content;
}

export async function updateInviteOnly(id:number, invite:string){

  let content = await client({
      method: 'patch',
      url: url+"updateInvite",
      withCredentials: true,
      data: {
        id: id.toString(),
        invite: invite,
      }
    });
  return content;
}

//admin API

var urladmin = host + "/api/admin/";

export async function addeventadmin(title:string, email:string, description:string, location:string, time:string, invite:string, capacity:string){

  let content = await client({
      method: 'post',
      url: urladmin+"addEvent",
      withCredentials: true,
      data: {
        title: title,
        email: email,
        description: description,
        location: location,
        time: time,
        invite: invite,
        capacity: capacity,
      }
    });
  return content;
}

export async function eventdeladmin(id:number){

  let content = await client({
      method: 'delete',
      url: urladmin+"removeEvent?id="+id.toString(),
      withCredentials: true
    });
  return content;
}


export async function updatetitleadmin(id:number, title:string){

  let content = await client({
      method: 'patch',
      url: urladmin+"updateTitle",
      withCredentials: true,
      data: {
        id: id.toString(),
        title: title,
      }
    });
  return content;
}

export async function updatedescriptionadmin(id:number, description:string){

  let content = await client({
      method: 'patch',
      url: urladmin+"updateDescription",
      withCredentials: true,
      data: {
        id: id.toString(),
        description: description,
      }
    });
  return content;
}

export async function updatelocationadmin(id:number, location:string){

  let content = await client({
      method: 'patch',
      url: urladmin+"updateLocation",
      withCredentials: true,
      data: {
        id: id.toString(),
        location: location,
      }
    });
  return content;
}

export async function updatetimeadmin(id:number, time:string){

  let content = await client({
      method: 'patch',
      url: urladmin+"updateTime",
      withCredentials: true,
      data: {
        id: id.toString(),
        time: time,
      }
    });
  return content;
}

export async function updateEmailadmin(id:number, email:string){

  let content = await client({
      method: 'patch',
      url: urladmin+"updateEmail",
      withCredentials: true,
      data: {
        id: id.toString(),
        email: email,
      }
    });
  return content;
}

// Rsvp API

export async function updateRsvp(eventid: number, status:string){

  let content = await client({
    method: 'patch',
    url: url+"updateRsvp",
    withCredentials: true,
    data: {
      event_id: eventid.toString(),
      status: status,
    }
  })
  return content;
}

export async function getRsvp(eventid: number, status: string){

  let content = await client({
    method: 'get',
    url: url+"getRsvp?id="+eventid.toString()+"&status="+status,
    withCredentials: true,
  })
  return content;
}

export async function getCount(event_id: number){

  let content = await client({
    method: 'get',
    url: url+"getCount?id="+event_id.toString(),
    withCredentials: true,
  })
  return content;
}

export async function getRsvpStatus(event_id: number){

  let content = await client({
    method: 'get',
    url: url+"getRsvpStatus?id="+event_id.toString(),
    withCredentials: true,
  })
  return content;
}

export async function hostRemove(event_id: number, email: string){

  let content = await client({
    method: 'delete',
    url: url+"hostRemove?id="+event_id.toString()+"&email="+email,
    withCredentials: true,
  })
  return content;
}

export async function hostInvite(event_id: number, email: string){

  let content = await client({
    method: 'post',
    url: url+"hostInvite",
    withCredentials: true,
    data: {
      email: email,
      event_id: event_id
    }
  })
  return content;
}


export async function runall(){ //for testing only

    await register("dobigstuff@gmail.com", "big stuff","big","guy","student").then(()=>console.log("success reg")).catch(()=>console.log("unsuc reg"));
    await login("dobigstuff@gmail.com", "big stuff").then(()=>console.log("success login")).catch(()=>console.log("unsuc login"));
    await getinfo().then((content)=>console.log(content.data)).catch((err)=>console.log("uncomfy"));
    await addevent("big stuff","unique","stuff","student", "FALSE", "100").then(()=>console.log("add suc")).catch(()=>console.log("add fail"));
    await getevent(1).then((content)=>console.log(content.data)).catch((err)=>console.log("uncomfy"));
    await eventdel(3).then(()=>console.log("event del suc")).catch(()=>console.log("del event err"));
    await updatetitle(1, "order of big guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatedescription(1, "order of big guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatelocation(1, "order of big guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatetime(1, "order of big guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await geteventsize().then((content)=>console.log(content.data)).catch(()=>console.log("size fail"));
    await updateRsvp(1, "WillAttend").then(()=>console.log("successful update Attend")).catch(()=>console.log("unsuc update Attend"));
    
    await userdel().then(()=>console.log("del suc")).catch(()=>console.log("del err"));

    await register("dobigstuff@gmail.com", "big stuff","big","guy","admin").then(()=>console.log("success admin reg")).catch(()=>console.log("unsuc reg"));
    await login("dobigstuff@gmail.com", "big stuff").then(()=>console.log("success login")).catch(()=>console.log("unsuc login"));
    await getinfo().then((content)=>console.log(content.data)).catch((err)=>console.log("uncomfy"));
    await addeventadmin("big stuff", "bigboi@boi.com","unique","stuff","student", "True","6969").then(()=>console.log("add suc")).catch(()=>console.log("add fail"));
    await eventdeladmin(5).then(()=>console.log("event del suc")).catch(()=>console.log("del event err"));
    await updatetitleadmin(4, "pho guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatedescriptionadmin(4, "pho guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatelocationadmin(4, "pho guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await updatetimeadmin(4, "pho guy").then(()=>console.log("successful update")).catch(()=>console.log("unsuc update"));
    await geteventsize().then((content)=>console.log(content.data)).catch(()=>console.log("size fail"));
    await userdel().then(()=>console.log("del suc")).catch(()=>console.log("del err"));
}
