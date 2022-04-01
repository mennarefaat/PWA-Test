// code load startegies : ... install , clear , fetch  ,..
let cachname="static-cache";
let cachedassets=[
    './index.html',
    './contact.html',
    './index.css',
    './callback.json'
];



// install :  event with service worker : write caches 

self.addEventListener('install',async function(){

    console.log('From Install');
    
    let createdcache=await caches.open(cachname);
    
    await createdcache.addAll(cachedassets);
    
    await self.skipWaiting();
});
self.addEventListener('activate',async function(){
console.log('From activate');

});
self.addEventListener('fetch',async function(event){
   
    if(!navigator.onLine)
    {
                return await event.respondWith(cachefirst(event.request));// cachfirst


    }else{
         return await event.respondWith(netwrokfirst(event.request));

    }
});


async function cachefirst(req){
    return await caches.match(req)||await caches.match('fallback.json');
}
async function netwrokfirst(req){
    let dynamiccache = await caches.open('dynamic-cache');
    let resp=await fetch(req);
    await dynamiccache.put(req,resp.clone());
    return resp;

}


