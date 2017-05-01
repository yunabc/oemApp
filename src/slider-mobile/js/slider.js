/**
 * 开发时间：2016/5/24
 * 开发人员：boxUnll
 * 开发项目：移动端滑动验证代码
 */
    var oBtn = document.getElementById('btn');
    var oW,oLeft;
    var oSlider=document.getElementById('slider');
    var oTrack=document.getElementById('track');
    var oIcon=document.getElementById('icon');
    var oSpinner=document.getElementById('spinner');
    var callBack=document.getElementById('callBack');
	var flag=1;
 
    oBtn.addEventListener('touchstart',function(e){
		if(flag==1){
			console.log(e);
			var touches = e.touches[0];
			oW = touches.clientX - oBtn.offsetLeft;
			oBtn.className="button";
			oTrack.className="track";
		}
        
    },false);
 
    oBtn.addEventListener("touchmove", function(e) {
		if(flag==1){
			var touches = e.touches[0];
			oLeft = touches.clientX - oW;
			if(oLeft < 0) {
				oLeft = 0;
			}else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-30) {
				oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
			}
			oBtn.style.left = oLeft + "px";
			oTrack.style.width=oLeft+ 'px';			
		}
        
    },false);
 
    oBtn.addEventListener("touchend",function() {
        if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
            oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
            oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-30);
            oIcon.style.display='none';
            oSpinner.style.display='block';	
            callBack.innerText="验证通过";			
			flag=0;			
        }else{
            oBtn.style.left = 0;
            oTrack.style.width= 0;
        }
        oBtn.className="button-on";
        oTrack.className="track-on";       
    },false);
 
    
