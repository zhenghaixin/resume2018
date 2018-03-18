var oLis = document.querySelectorAll(".main>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;

var a1=oLis[0].querySelector("p");

[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch-this.startY;
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id="";
    });
    if(movePos>0){
        var pos = -winH+movePos;
        this.prevsIndex = (index ==0?oLis.length-1:index-1);
    }else if(movePos<0){
        var  pos = winH+movePos;
        this.prevsIndex = (index == oLis.length-1?0:index+1);

    }
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") " +
        " translate(0,"+movePos+"px)";


}

function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }
}


var oAudio = document.querySelector("#audio1"), oDiv = document.querySelector("#div1");

window.onload = function () {
    oAudio.play();
    oAudio.addEventListener("canplay", function () {
        oDiv.style.display = "block";
        oDiv.className = "move";
    }, false);


    oDiv.onclick = function () {
        if (oAudio.paused) {
            oAudio.play();
            oDiv.className = "move";
            return;
        }
        oAudio.pause();
        oDiv.className = "";
    }
};
