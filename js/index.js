// global declarations


// menu-component
var menu_items = ["Overview","Onboarding","Monitoring","Flagging","Source of Income","UAR"];
var selected_menu ="";

// userdata
var user = {
    name:"Elon Musk",
    email:"elon@twitter.com",
    avatar_url:"./img/avatar.svg"
}


// page-content
var page_content = {
    "Monitoring": {
        tabs: ["pending","completed"],
        actions:[
            {
                icon:"./img/x-circle.svg",
                type:"danger",
                title:"Close account"
            }
        ],
        data: {
            "pending": [
            {
                user:{
                    name:"Sam Altman",
                    email:"Samaltman123@gmail.com"
                },
                risk:"medium",
                trigger_reason:"IP Change",
                in_queue:"4 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"Yes",
                    on:"23 Aug, 2023"
                }
            },
            {
                user:{
                    name:"Sameer Choubey",
                    email:"sameerchoubey123@gmail.com"
                },
                risk:"high",
                trigger_reason:"FIFO",
                in_queue:"4 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"no",
                    on:undefined
                }
            },
            {
                user:{
                    name:"Adarsh Panikkar",
                    email:"adarsh@onjuno.com"
                },
                risk:"low",
                trigger_reason:"IP Change",
                in_queue:"5 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"No",
                    on:undefined
                }
            },
            {
                user:{
                    name:"Pratik Shetty",
                    email:"pratik3@gmail.com"
                },
                risk:"high",
                trigger_reason:"FIFO",
                in_queue:"5 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"Yes",
                    on:"12 Sept, 2023"
                }
            },
            {
                user:{
                    name:"Elon Musk",
                    email:"elon@twitterceo.com"
                },
                risk:"low",
                trigger_reason:"FIFO",
                in_queue:"5 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"Yes",
                    on:"12 Sept, 2023"
                }
            },
            {
                user:{
                    name:"Trina Kundu",
                    email:"trina@onjuno.com"
                },
                risk:"low",
                trigger_reason:"FIFO",
                in_queue:"5 days",
                date_added:"12 Oct, 2023",
                reviewed: {
                    status:"Yes",
                    on:"12 Sept, 2023"
                }
            },
            
        ],
            "completed":[
                {
                    user:{
                        name:"Sam Altman",
                        email:"Samaltman123@gmail.com"
                    },
                    risk:"medium",
                    action_reason:"flagged",
                    close_by:"14 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Neil",
                        email:"neil@onjuno.com"
                    }
                },
                {
                    user:{
                        name:"Sameer Choubey",
                        email:"sameerchoubey123@gmail.com"
                    },
                    risk:"high",
                    action_reason:"closed",
                    close_by:"14 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Pratik",
                        email:"pratik@onjuno.com"
                    }
                },
                {
                    user:{
                        name:"Adarsh Panikkar",
                        email:"adarsh@onjuno.com"
                    },
                    risk:"low",
                    action_reason:"IP Change",
                    close_by:"15 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Prashanth",
                        email:"prashanth@onjuno.com"
                    }
                },
                {
                    user:{
                        name:"Pratik Shetty",
                        email:"pratik3@gmail.com"
                    },
                    risk:"high",
                    action_reason:"FIFO",
                    close_by:"15 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Rasleen Kaur",
                        email:"rasleen@onjuno.com"
                    }
                },
                {
                    user:{
                        name:"Elon Musk",
                        email:"elon@twitterceo.com"
                    },
                    risk:"low",
                    action_reason:"FIFO",
                    close_by:"15 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Pratik Shetty",
                        email:"pratik@onjuno.com"
                    }
                },
                {
                    user:{
                        name:"Trina Kundu",
                        email:"trina@onjuno.com"
                    },
                    risk:"low",
                    action_reason:"FIFO",
                    close_by:"5 days",
                    date_added:"12 Oct, 2023",
                    action_by: {
                        name:"Varun Deshpande",
                        email:"varun@onjuno.com"
                    }
                },
                
            ]
        }
    }
}

var selected_tab = ""; 
var sort_descending = ["risk"];
// elements

var menu_element = $("#menu-holder");
var tabs_container = $("#tabs-container");
var table_comp = $("#table-comp");
var table_headings = $("tr#heading");
var table_body = $("tr#body");



// menu-component
function render_menu(menutitle="Monitoring")
{
  menu_element.html("");
  selected_menu = menutitle;
  menu_items.map((x)=>{
      
      if(x!=selected_menu)
      menu_element.append(`<div class="menu-item">${x}</div>`)
      else
      menu_element.append(`<div class="menu-item active">${x}</div>`)
      
  });
  
  
}

function handle_menu_click()
  {
    $("#menu-holder").on("click", ".menu-item", function() {
        selected_menu = $(this).html();
        render_menu(selected_menu);
    });
    render_tabs();

  }


// tabs-component
function render_tabs(tab=page_content[selected_menu]["tabs"][0])
{
    let tabs = page_content[selected_menu]["tabs"];
    tabs_container.html("");
    let className = "";

    

    tabs.map((t,index)=>{
        console.log("rendering tabs");
        if(t==tab)
        {
            tabs_container.append(`<div class="tab-item active">
            <span class="tab">${t}</span>
            <div class="underline active"></div>
            </div>`)
        }
        else 
        {
            tabs_container.append(`<div class="tab-item"}">
                <span class="tab">${t}</span>
                <div class="underline"><div/>
                </div>`)
        }
    });

    handle_tab_click();

    render_table(tab); 
    
}

function handle_tab_click()
{
    $(".tab-item").on("click", "span.tab", function() {
        selected_tab = $(this).html();
        console.log(selected_tab);
        render_tabs(selected_tab);  
        render_table(selected_tab);
    });
}

// table-component 

function render_table(tab)
{
    let table_data = page_content[selected_menu]["data"][tab];
    console.log(table_data);
    if(table_data.length>0)
    {
        let table_keys = Object.keys(table_data[0]);
    
   
    
    
    

    table_comp.html("");
    var newRow = $("<tr>");
    
    table_keys.map((th)=>{
        var heading = "";
        if(th=="risk")
          { 
             heading = "risk level";
             newRow.append(
                `
                
                <th><div><span>${heading}</span><img class="active" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
            )
          }
        else if(th=="trigger_reason")
           { 
             heading = "Trigger reason";
             newRow.append(
            `
            <th><div><span>${heading}</span></div></th>
            `
                )    
            }
        else if(th=="action_reason")
           { 
             heading = "Action reason";
             newRow.append(
            `
            <th><div><span>${heading}</span></div></th>
            `
                )    
            }
        else if(th=="in_queue")
            {
                heading = "In queue for";
                let is_active= "";
                if(sort_descending.includes(th))
                {
                    is_active ="active";
                }
                else 
                {
                    is_active = "";
                }
                newRow.append(
                `
                <th><div><span>${heading}</span><img class="${is_active}" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
            )}
        else if(th=="close_by")
            {
                heading = "Time to close";
                let is_active= "";
                if(sort_descending.includes(th))
                {
                    is_active ="active";
                }
                else 
                {
                    is_active = "";
                }
                newRow.append(
                `
                <th><div><span>${heading}</span><img class="${is_active}" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
            )}
        else if(th=="date_added")
            {
                heading = "Date added on";
                newRow.append(
                `
                <th><div><span>${heading}</span>
                <img class="" src="./img/chevrons-up-down.svg" alt="">
                </div></th>`
            )}
        else if(th=="reviewed")
            {
                heading = "Previously reviewd"
                newRow.append(
                `
                <th><div><span>${heading}</span></div></th>
                `
            )}
        else if(th=="action_by")
            {
                heading = "Action taken by"
                newRow.append(
                `
                <th><div><span>${heading}</span></div></th>
                `
            )}
        else
            {
                heading = th;
                newRow.append(
                    `
                    <th><span>${heading}</span></th>
                    `
            )} 
    });

    table_comp.append(newRow);

    table_data.map((data)=>{
        table_comp.append(
            `
            <tr>
            <td>
                                        <div class="user">
                                            <div class="info">
                                                <div class="name">${data.user.name}</div>
                                                <div class="email">${data.user.email}</div>
                                            </div>
                                            <div class="link">
                                                <img src="./img/external-link.png" alt="">
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="risk-level ${data.risk}">
                                            <div class="status-circle">
                                                <div class="dot-circle">

                                                </div>
                                            </div>
                                            <div class="title">
                                                <span>
                                                    ${data.risk}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <b>${data.trigger_reason? data.trigger_reason: data.action_reason}</b>
                                    </td>
                                    <td>
                                        <b>${data.in_queue? data.in_queue: data.close_by }</b>
                                    </td>
                                    <td>
                                        <div class="date">
                                            ${data.date_added}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="review">
                                            <b>${data?.reviewed ? data.reviewed.status : data.action_by.name}</b> <br>
                                            <span class="date"> ${data?.reviewed? (data.reviewed.on?data.reviewed.on : ""):(data.action_by? data.action_by.email :"")}</span>
                                        </div>
                                    </td>
            </tr>
            `
        )
    });
    
    }
    
    
}

function handleCloseAccount(val)
{
    console.log(val);
    if(val==true)
    $("#overlay-container").removeClass("close");
    else
    $("#overlay-container").addClass("close");
}

function handle_table_sort()
  {

    console.log("sort");
    $("th div").on("click", "span", function() {
        let selected_sort = $(this).html();
        if(!sort_descending.includes(selected_sort))
        sort_descending.push(selected_sort);
        else 
        {
            sort_descending.splice(sort_descending.indexOf(selected_sort),1)
        }


    });
    
    

  }


 



$(document).ready(function(){

    $("#account-info #name").html(user.name);
    $("#account-info #email").html(user.email);
    $("#avatar-holder #avatar").css("background-image", "url('"+user.avatar_url+"')");

    render_menu();
    
    handle_menu_click();
    
    

  });

  

