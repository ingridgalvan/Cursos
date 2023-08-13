var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function (m, key, value) {
    vars[key] = value;
  });
const id_user = JSON.parse(localStorage.getItem("id"));

var userList = [];
var currentUser = 0;

function handlerUser(avatar,name,user){
  document.getElementById("head-msg").innerHTML =`
  <img src="${avatar}" class=" img-user-head"/>
       <div> ${name} </div>
  `;
  currentUser = user;
  $("#contMsg").html("")
  Chat.getChatByUser();
}

const Chat = {
  getEachUserChat: function(){
     
    $.ajax({
      type:"GET",
      url:"./../../controllers/ChatController.php",
      data:{action:"getEachUserChat",user:id_user},
      dataType:"json",
      success:function(resp){
       console.log(resp);
        userList = resp? resp : [];
        $("#users-chat").html("")
        for(var item of userList){
          $("#users-chat").prepend(`
          <div class="list-group" onclick="handlerUser('${item.image == null || item.type_image == null? "./../IMG/user.png" : "data:" + item.type_image + ";base64," + item.image}','${item.name}',${item.id_user})">
                    <div class="list-group-item list-group-item-action d-flex justify-content-start align-items-center">
                      <img style="width:100px; height:100px;object-fit:cover" src="${item.image == null || item.type_image == null ? "./../IMG/user.png" : "data:" + item.type_image + ";base64," + item.image}" class=" img-user"/>
                      <div class="pl-2 w-100">
                              <div class="d-flex justify-content-between">
                              <p> ${item.name}  </p>
                              <small id="lastMessageFecha${item.id_user}"  class="form-text text-muted">  </small>
                              </div>
                              <p id="lastMessage${item.id_user}">    </p>
                               <div/>
                    </div>
                </div>`)
                  $.ajax({
                    async:false,
                    type:"POST",
                    url:"./../../controllers/ChatController.php",
                    data:{action:"getLastMessage",from:id_user,to:item.id_user},
                    dataType:'json',
                    success:function(data){
                     //  
                   
                      $("#lastMessage" + item.id_user).html(data.from == id_user? "Tú: " + data.message : data.message)
                      $("#lastMessageFecha" + item.id_user).html(data.created_at)
                    },
                    error:function (x,y,z){
                       
                      console.error(x.responseText);
                    }
                  })
        }
        
        if(vars.to){
          currentUser = vars.to;
            var isExist = false;
            for(var item of userList){
              if(item.id_user == vars.to){
                isExist = true;
                document.getElementById("head-msg").innerHTML =`
              <img src="${item.image == null || item.image == "" || item.type_image == null ? "./../IMG/user.png" : "data:" + item.type_image + ";base64," + item.image}" class=" img-user-head"/>
                   <div> ${item.name} </div>
              `; 
              Chat.getChatByUser()
                break;
              }
            }
        
            if(!isExist){
                Chat.getInfoUser(vars.to);
            }
        }
      },
      error:function (x,y,z){
         
        console.error(x.responseText);
      }
    })
  },
  getInfoUser: function(to){
    $.ajax({
      type:"GET",
      url:"./../../controllers/ChatController.php",
      data:{action:"getInfoUser",to},
      dataType:"json",
      success:function(resp){
         
        console.log(resp);
        $("#users-chat").prepend(`
        <div class="list-group" onclick="handlerUser('${resp.image == null || resp.image == "" || resp.type_image == null ? "./../IMG/user.png" : "data:" + resp.type_image + ";base64," + resp.image}','${resp.name}',${to})">
                  <div class="list-group-item list-group-item-action d-flex justify-content-start align-items-center">
                    <img style="width:100px; height:100px; object-fit:cover" src="${resp.image == null || resp.image == "" || resp.type_image == null ? "./../IMG/user.png" : "data:" + resp.type_image + ";base64," + resp.image}" class=" img-user"/>
                    <div class="pl-2"><p> ${resp.name}  </p>
                            <p> Borrador   </p> <div/>
                  </div>
              </div>`);
              
              document.getElementById("head-msg").innerHTML =`
  <img src="${resp.image == null || resp.image == "" || resp.type_image == null ? "./../IMG/user.png" : "data:" + resp.type_image + ";base64," + resp.image}" class=" img-user-head"/>
       <div> ${resp.name} </div>
  `; 
      },
      error:function (x,y,z){
         
        console.error(x.responseText);
      }
    })
  },
  addChat: function(from,to,msg){
     
    $.ajax({
      type:"POST",
      url:"./../../controllers/ChatController.php",
      data:{action:"addChat",from,to,msg},
      success:function(resp){
        $("#textMessageChat").val("");
        Chat.getEachUserChat();
      },
      error:function (x,y,z){
        console.error(x.responseText);
      }
    })
  },
  getChatByUser: function(){
    $.ajax({
      type:"POST",
      url:"./../../controllers/ChatController.php",
      data:{action:"getChatByUser",from:id_user,to:currentUser},
      dataType:'json',
      success:function(resp){
        console.log(resp);
        $("#contMsg").html("")
        for(var item of resp){
          
          if(item.from == id_user){
            $("#contMsg").append(`
              <div class=" d-flex w-100 justify-content-end">
                  <div class="comment owner">
                    ${item.message}
                  </div> 
               </div>
            `)
          }else{
                $("#contMsg").append(`
                <div class=" d-flex w-100 justify-content-start">
                <div class="comment noowner">
                  ${item.message}
                </div> 
                </div>
                `)
             
          }
        }
      },
      error:function (x,y,z){
        console.error(x.responseText);
      }
    })
  }
  
  
}

Chat.getEachUserChat()

$("#btnEnviarChat").click(function(){

  if(currentUser == 0){
    toastr.info('', 'Selecciona un usuario');
    return
  }
  
    const msg =  $("#textMessageChat").val();
    if(msg != "" && currentUser != 0){
        Chat.addChat(id_user,currentUser,msg)
        $("#contMsg").html("")
        Chat.getChatByUser();
    }
});