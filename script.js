   let mtabtn=document.getElementById("mta-button1");
   let mtaimg=document.getElementById("mta-logo1");
   let searchword = mtabtn.innerHTML.substring(0,1);
   let placename = [];
    let placelat = [];
    let placelong = [];
    let FINALplaces=[];
    let FINALaddy=[];
    let FINALstation=[];

  
function search()
{
    
    placename = [];
    placelat = [];
    placelong = [];
 searchword = mtabtn.innerHTML.substring(0,1);
let request= new XMLHttpRequest();
let url= "https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json?accessType=DOWNLOAD";
request.open("GET", url, true);

request.onload=function()
{
    let data = JSON.parse(this.response);

   
    if (request.status>= 200 && request.status < 400)
    {
     for(let x=0; x<data.data.length-1;x++)
     {
           
        if(data.data[x][13].includes(searchword))
        {
          
            placename.push(data.data[x][10]);
          placelat.push(parseFloat(data.data[x][11].substring(7,25)))
          placelong.push(parseFloat(data.data[x][11].substring(25,42)));
        }
     }
     findLocations();
    }
};

request.send();

}

function iconChange(icon)
{
   
   
switch (icon) {
    
    case 1:
       
     
     mtabtn.innerHTML="F TRAIN";
        mtaimg.src="f.png";
        
        break;
     case 2:
          mtabtn.innerHTML="G TRAIN";
       mtaimg.src="g.jpg";
     
        break;
         case 4:
              mtabtn.innerHTML="J TRAIN";
       mtaimg.src="j.png";
     
        break;
         case 3:
              mtabtn.innerHTML="M TRAIN";
       mtaimg.src="m.png";
      
        break;
        case 5:
              mtabtn.innerHTML="L TRAIN";
       mtaimg.src="L train.jpg";
      
        break;
        case 6:
              mtabtn.innerHTML="N TRAIN";
       mtaimg.src="n train.jpg";
      
        break;
        case 7:
              mtabtn.innerHTML="Q TRAIN";
       mtaimg.src="Q train.jpg";
      
        break;
        case 8:
              mtabtn.innerHTML="R TRAIN";
       mtaimg.src="r train.jpg";
      
        break;
        case 9:
              mtabtn.innerHTML="W TRAIN";
       mtaimg.src="w train.png";
      
        break;
        case 10:
              mtabtn.innerHTML= "E TRAIN";
       mtaimg.src="e train.jpg";
      
        break;
    default:
        // code
}



}
 
  
  
 
  
function findLocations()
{
 ;
    FINALplaces=[];
    FINALstation=[];
    FINALaddy=[];
    let request= new XMLHttpRequest();
let url= "https://data.cityofnewyork.us/resource/rb9s-d3m8.json";
request.open("GET", url, true);

request.onload=function()
{
    let data = JSON.parse(this.response);

   
    if (request.status>= 200 && request.status < 400)
    {
     for(let x=0; x<data.length-1;x++)
     {
         for(let y=0; y<data.length-1;y++)
         {
       if(distance(placelat[x],placelong[x],data[y].the_geom.coordinates[0],data[y].the_geom.coordinates[1])<=.1)
       {
         FINALplaces.push(data[y].lm_name);
         FINALaddy.push(data[y].desig_addr);
         FINALstation.push(placename[x]);
       }
         }
        
     }
    
    displayResults();

    }
};

request.send();
}



function distance(lat1, lon1, lat2, lon2) 
{ 
var p = 0.017453292519943295; // Math.PI / 180 
var c = Math.cos; 
var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2; 
var distance= 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km }
return 0.621371* distance;
}

function displayResults()
{
 
    document.getElementById("searchbar").style.visibility = "hidden"
    console.log('banana')
      let container=document.getElementById("search-results");
   let info;
   let info2;
   let info3;
 
  
  
    for(let x=0; x<FINALaddy.length-1;x++)
    {
        let row=document.createElement("div");
    row.setAttribute('class','row');
    row.setAttribute('id','all-results'+x.toString());
    let container=document.getElementById("search-results");
    let box=document.createElement("div");
    box.setAttribute('class','col-lg-6');
    box.setAttribute('id','results-23');
    let img=document.createElement('img');
    let name=document.createElement('h3');
   let addy2=document.createElement('h3');
   let station2=document.createElement('h3');
   station2.setAttribute('id','Station'+x.toString());
    switch (searchword) {
        case 'F':
            img.src="f.png";
            break;
         case 'G':
            img.src="g.jpg";
            break;
             case 'J':
            img.src="j.png";
            break;
           case 'M':
              
       img.src="m.png";
      
        break;
        case 'L':
              
       img.src="L train.jpg";
      
        break;
        case 'N':
           
       img.src="n train.jpg";
      
        break;
        case 'Q':
             
       img.src="Q train.jpg";
      
        break;
        case 'R':
              
       img.src="r train.jpg";
      
        break;
        case 'W':
             
       img.src="w train.png";
      
        break;
        case 'E':
              
       img.src="e train.jpg";
      
        break;
        default:
            // code
    }
    img.setAttribute('id','result-pic');
    container.appendChild(row);
    row.appendChild(box);
    box.appendChild(img);
    box.appendChild(name);
    box.appendChild(addy2);
    box.appendChild(station2);
    info=document.createTextNode(FINALplaces[x]);
    info2=document.createTextNode(FINALaddy[x]);
    info3=document.createTextNode(FINALstation[x]);
    name.appendChild(info);
    addy2.appendChild(info2);
    station2.appendChild(info3);
    box.style.cssText="outline: 1px solid black;height:250px; transition: transform .2s; background-color:#B7E9F7; margin-bottom:25px;";
    
      // if(x==1)
      //  {
      //   row.appendChild(slide);
      //   let slide=document.createElement('div');
      //   slide.setAttribute('class','col-lg-6');
      //   let images1=document.createElement('img');
      //   images1.setAttribute('id','picture');
      //   let images2=document.createElement('img');
      //   images2.setAttribute('id','picture');
      //   let images3=document.createElement('img');
      //   images3.setAttribute('id','picture');
      //   let imgslide1=document.createElement('div')
      //   imgslide1.setAttribute('class', 'mySlides fade');
      //   slide.appendChild(imgslide1);
      //   imgslide1.appendChild(images1);
      //   let imgslide2=document.createElement('div')
      //   imgslide2.setAttribute('class', 'mySlides fade');
      //   slide.appendChild(imgslide2);
      //   imgslide2.appendChild(images2);
      //     let imgslide3=document.createElement('div')
      //   imgslide3.setAttribute('class', 'mySlides fade');
      //   slide.appendChild(imgslide3);
      //   imgslide3.appendChild(images3);
      //   let divdot= document.createElement('div');
      //   let dot1= document.createElement('span');
      //    let dot2= document.createElement('span');
      //    let dot3= document.createElement('span');
      //    dot1.setAttribute('class', 'dot');
      //    dot2.setAttribute('class', 'dot');
      //    dot3.setAttribute('class', 'dot');
      //  }
    }
     let slideshow=document.getElementById("slideshow-container");
     console.log(slideshow)
     console.log(slideshow.style.display);
 slideshow.style.display="block";
   
}
//  var inputvalue = document.getElementById("myInput").value;
// console.log(inputvalue.toUpperCase());
// function resultSearch()
// {
//     var inputvalue = document.getElementById("myInput").value;
//     if(inputvalue!=null)
//     {
    
//     for(let x=0;x<FINALaddy.length-1;x++)
//     {
//         var rresultrow=document.getElementById('all-results'+x.toString());
//     var divs=document.getElementById('Station'+x.toString());
//       if(inputvalue.toUpperCase()==divs.innerHTML.toUpperCase());
//       {
//         rresultrow.style.display="none";
//       }
//     }
//     }
// }


