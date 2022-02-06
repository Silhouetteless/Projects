const opener = document.querySelector(".opener");
const cont = document.querySelector(".content");
const arrow = document.querySelector(".opener .dropIcon");

function dropdown(open, content, icon) {
    for (let i = 0; i < open.length; i++) {
        open[i] = document.addEventListener("click",function(){
            content[i].classList.toggle("content-active");
            icon[i].classList.toggle("rotate");
            for(var j = 0; j < open.length; j++) {
                if(i != j) {
                    content[j].classList.remove("content-active");
                    icon[j].classList.remove("rotate");
                }
            }
        });
    }
}

dropdown(openet, cont, arrow);