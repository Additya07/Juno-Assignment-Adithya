// global declarations

// menu-component
var menu_items =  [];
var error="";
var original_content;


// userdata
var user = {
    name:"",
    email:"",
    avatar_url:"",
}


// page-content
var page_content = {
}



var selected_menu ="";
var selected_tab = ""; 
var sort_descending = [];
// elements

var hamburger = $(".hamburger");
var menu_element = $("#menu-holder");
var tabs_container = $("#tabs-container");
var table_comp = $("#table-comp");
var table_headings = $("tr#heading");
var table_body = $("tr#body");

var count = 0;


$('.hamburger').click(function(){
   
    $('.sidenav-container').css({"z-index":"40","transform":"translateX(0%)","transition":"all 200ms ease-in-out"});
    
})
$('.close-menu').click(function(){

    $('.sidenav-container').css({"z-index":"40", "transform":"translateX(-100%)","transition":"all 150ms ease-out"});
  
})

// menu-component
function render_menu(menutitle="Monitoring")
{
  menu_element.html("");
  selected_menu = menutitle;
  $("#page-heading").html(selected_menu);
  console.log( $("#page-heading").html());
  var w_width=window.innerWidth;
  console.log(w_width);
  if(w_width<=400) {
    $('.sidenav-container').css("z-index","2");
    count=0;
  }
  menu_items.map((x)=>{
      
      if(x!=selected_menu)
      menu_element.append(`<div class="menu-item">${x}</div>`)
      else
      menu_element.append(`<div class="menu-item active">${x}</div>`)
      
  });
  render_tabs();

  
  
}

function handle_menu_click()
  {
    $("#menu-holder").on("click", ".menu-item", function() {
        selected_menu = $(this).html();
        
       
        render_menu(selected_menu);
        
       
    });

    render_tabs(); 
    selected_tab = page_content[selected_menu]["tabs"][0];
   

  }


// tabs-component
function render_tabs(tab=page_content[selected_menu]["tabs"][0])
{
    let tabs = page_content[selected_menu]["tabs"];
    tabs_container.html("");
    let className = "";

    console.log(tabs);
    if(tabs!=undefined && tabs?.length>0)
    {

    $(".page-head section").css({"display":"flex"});
    $("#tab-header").css({"display":"flex"});
    $("#comming-soon").css({"display":"none"});
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

    }
    else{
        tabs_container.html("");
        $(".page-head section").css({"display":"none"});
        $("#tab-header").css({"display":"none"});
        $("#comming-soon").css({"display":"flex ", "flex-direction":"column"});
        // $("#tab-content").html("");
    }

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
    if(table_data && table_data.length>0)
    {
        let table_keys = Object.keys(table_data[0]);
    
    table_comp.html("");
    var newRow = $("<tr>");
    
    table_keys.map((th)=>{
        var heading = "";
        if(th=="risk")
          { 
             heading = "Risk level";
             let className = ""
             if(sort_descending.includes("risk"))
             {
                className="active";
             }
           
            
             newRow.append(
                `
                <th>
                <div data-key="${th}">
                <span data-key="${th}">${heading}</span>
                <img class="${className}" src="./img/chevrons-up-down.svg" alt="">
                </div>
                </th>
                `
            
            )
          }
        else if(th=="trigger_reason")
           { 
             heading = "Trigger reason";
             newRow.append(
            `
            <th><div data-key="${th}"><span data-key="${th}">${heading}</span></div></th>
            `
                )    
            }
        else if(th=="action_reason")
           { 
             heading = "Action reason";
             newRow.append(
            `
            <th><div data-key="${th}"><span data-key="${th}">${heading}</span></div></th>
            `
                )    
            }
        else if(th=="in_queue")
            {
                heading = "In queue for";
                let className = "";
                if(sort_descending.includes("in_queue"))
                {
                   className="active";
                }
                newRow.append(
                `
                <th><div data-key="${th}"><span data-key="${th}">${heading}</span><img class="${className}" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
            )}
        else if(th=="close_by")
            {
                heading = "Time to close";
                let className = "";
                if(sort_descending.includes("close_by"))
                {
                   className="active";
                }
                newRow.append(
                `
                <th><div data-key="${th}"><span data-key="${th}">${heading}</span><img class="${className}" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
            )}
        else if(th=="date_added")
            {
                heading = "Date added on";
                let className=""
                if(sort_descending.includes("date_added"))
                {
                   className="active";
                }
                newRow.append(
                `
                <th><div data-key="${th}"><span data-key="${th}">${heading}</span><img class="${className}" src="./img/chevrons-up-down.svg" alt=""></div></th>
                `
                
            )}
        else if(th=="reviewed")
            {
                heading = "Previously reviewd"
                newRow.append(
                `
                <th><div data-key="${th}"><span data-key="${th}">${heading}</span></div></th>
                `
            )}
        else if(th=="action_by")
            {
                heading = "Action taken by"
                newRow.append(
                `
                <th><div data-key="${th}"><span data-key="${th}">${heading}</span></div></th>
                `
            )}
        else
            {
                heading = th;
                newRow.append(
                    `
                    <th><div data-key="${th}"><span>${heading}</span></div></th>
                    `
            )} 
    });

    table_comp.append(newRow);

    handle_table_sort();

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
                                            ${formatDate(data.date_added)}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="review">
                                            <b>${data?.reviewed ? data.reviewed.status : data.action_by.name}</b> <br>
                                            <span class="date"> ${data?.reviewed? (data.reviewed.on? formatDate(data.reviewed.on) : ""):(data.action_by? data.action_by.email :"")}</span>
                                        </div>
                                    </td>
            </tr>
            `
        )
    });
    
    }
    else 
    {
        table_comp.html("");
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


    $("th").on("click", "div", function() {
        let selected_sort = $(this).data("key");
        
        // console.log(selected_sort);
        if(!sort_descending.includes(selected_sort))
        {
            sort_descending.push(selected_sort);
           
            // console.log("adding class",sort_descending);
        }else 
        {
            
            sort_descending.splice(sort_descending.indexOf(selected_sort),1)
            // console.log("removing class",sort_descending);
        }

        sort_data(selected_sort);


    });
    
    

  }



$(document).ready(function(){
    

    getData();
   

  });

  function set_user()
  {
    $("#account-info #name").html(user.name);
        $("#account-info #email").html(user.email);
        $("#avatar-holder #avatar").css("background-image", "url('"+user.avatar_url+"')");

  }


  function getData()
  {
    $.getJSON('js/data-model.json', function(jsonData) {
        console.log(jsonData);
        menu_items = jsonData.menu_items;
        page_content = JSON.parse(JSON.stringify(jsonData.page_content));
        original_content = JSON.parse(JSON.stringify(page_content));;
        user = jsonData.user;

        set_user();
        

        render_menu();
        handle_menu_click();
        // Now you can work with the JSON data here
      }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("Request Failed: " + err);
      });
  }

  function formatDate(date) {
    // console.log("formatting");
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  function sort_data(key)
  {
    console.log(key);
    if(key=="risk")
    {
        let dataArray = page_content[selected_menu]["data"][selected_tab];
        console.log(dataArray);
        temp_data = [...dataArray];

        if(!sort_descending.includes('risk'))
        {
            temp_data.sort(function(a, b) {
            // Assign numerical values to "high," "medium," and "low"
            var riskValues = { "high": 1, "medium": 2, "low": 3 };
      
            // Compare the risk values for sorting
            return riskValues[a.risk] - riskValues[b.risk];
          });
        }
        else 
        {
            temp_data.sort(function(a, b) {
                // Assign numerical values to "high," "medium," and "low"
                var riskValues = { "high": 1, "medium": 2, "low": 3 };
          
                // Compare the risk values for sorting
                return riskValues[b.risk] - riskValues[a.risk];
              }); 
        }

          console.log("sorted",temp_data);
          page_content[selected_menu]["data"][selected_tab] = [...temp_data];
          render_table(selected_tab);



    }
    else if(key=="in_queue")
    {
        let dataArray = page_content[selected_menu]["data"][selected_tab];
        console.log(dataArray);
        temp_data = [...dataArray];

        if(sort_descending.includes('in_queue'))
        {
            temp_data.sort(function(a, b) {
                // Extract the numeric value from the "in_queue" strings
                var daysA = parseInt(a.in_queue);
                var daysB = parseInt(b.in_queue);
          
                // Compare the numeric values for sorting
                return daysA - daysB;
              });
        } 
        else 
        {
            temp_data.sort(function(b, a) {
                // Extract the numeric value from the "in_queue" strings
                var daysA = parseInt(a.in_queue);
                var daysB = parseInt(b.in_queue);
          
                // Compare the numeric values for sorting
                return daysA - daysB;
              });
        }

          console.log("sorted",temp_data);
          page_content[selected_menu]["data"][selected_tab] = [...temp_data];
          render_table(selected_tab);



    }
    else if(key=="date_added")
    {
        let dataArray = page_content[selected_menu]["data"][selected_tab];
        console.log(dataArray);
        temp_data = [...dataArray];

        if(!sort_descending.includes('date_added'))
        {
            temp_data.sort(function(a, b) {

            return a.date_added - b.date_added;
          });
        } 
        else 
        {
            temp_data.sort(function(a, b) {
                
                
                return b.date_added - a.date_added;
              }); 
        }

          console.log("sorted",temp_data);
          page_content[selected_menu]["data"][selected_tab] = [...temp_data];
          render_table(selected_tab);



    }
    else if(key=="close_by")
    {
        let dataArray = page_content[selected_menu]["data"][selected_tab];
        console.log(dataArray);
        temp_data = [...dataArray];

        if(!sort_descending.includes('close_by'))
        {
            temp_data.sort(function(a, b) {

                var daysA = parseInt(a.close_by);
                var daysB = parseInt(b.close_by);
          
                // Compare the numeric values for sorting
                return daysA - daysB;
          });
        } 
        else 
        {
            temp_data.sort(function(a, b) {
                
                
                var daysA = parseInt(a.close_by);
                var daysB = parseInt(b.close_by);
          
                // Compare the numeric values for sorting
                return daysB - daysA;
              }); 
        }

          console.log("sorted",temp_data);
          page_content[selected_menu]["data"][selected_tab] = [...temp_data];
          render_table(selected_tab);



    }
    else if(key=="risk_select")
    {
        let dataArray = original_content[selected_menu]["data"][selected_tab];
        console.log(dataArray);
        temp_data = [...dataArray];
        let temporary_data;
        console.log("present data", dataArray,$("#risk-level").val().toLowerCase()!='all');

        if($("#risk-level").val().toLowerCase()!='all')
        
        {
            temporary_data = $.grep(temp_data, function(obj) {
           
            return obj.risk == $("#risk-level").val().toLowerCase();
          });
        }
        else 
        {
            temporary_data = dataArray;
        }
        
       

          console.log("sorted",temporary_data);
          page_content[selected_menu]["data"][selected_tab] = [...temporary_data];
          render_table(selected_tab);



    }
  }

  function search_user()
  {
    let dataArray = original_content[selected_menu]["data"][selected_tab];
    
    temp_data = [...dataArray];
    let temporary_data;
    console.log("present data", dataArray,$("#search-input").val().toLowerCase()!='all');
    let query = $("#search-input").val().toLowerCase();
    let results = []
    console.log($("#search-input").val());
    if(query!="")
    {
        dataArray.map((data)=>{
        if(data.user.email.toLowerCase().includes(query) || data.user.name.toLowerCase().includes(query) )
        {
            results.push(data);
        }

    });
    }
    else 
    {
        results = [...dataArray];
    }

    page_content[selected_menu]["data"][selected_tab] = [...results]
    render_table(selected_tab);

  }

  function allowSubmit() {
    console.log("activeating");
    var close_req={};
    close_req.email = $("input#email").val();
    close_req.file_uar = $('input[name="file_uar"]:checked').val();
    close_req.charge_fee = $('input[name="charge_fee"]:checked').val();
    close_req.reason = $("input#reason").val();
    close_req.note = $("input#note").val();
    close_req.charge_fee = $('input[name="charge_fee"]:checked').val();
    if(close_req.email!="" && close_req.email.includes("@") && close_req.file_uar!=undefined && close_req.reason!="" &&close_req.note!="" && close_req.charge_fee!=undefined )
        {
            $("#close-btn").addClass("active");
            error="";
           
        }
    else 
        {
        error = "All Fields are required!";
        console.log(error);
        $("#close-btn").removeClass("active");
        }
    
    }

  function submit_close_account()
  {
    var close_req={};
    close_req.email = $("input#email").val();
    close_req.file_uar = $('input[name="file_uar"]:checked').val();
    close_req.charge_fee = $('input[name="charge_fee"]:checked').val();
    close_req.reson = $("input#reason").val();
    close_req.note = $("input#note").val();

    console.log("submited",close_req);
    $("#close_error").html(error);
    if(error=="" && close_req.charge_fee=="yes")
    {
        handleCloseAccount(false);  
    }
}

  

