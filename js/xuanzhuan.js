

// 页面加载事件
window.onload = function() {
	var config = [
        {
            "width": 400,
            "top": 20,
            "left": 50,
            "opacity": 0.2,
            "zIndex": 2
        },//0
        {
            "width": 600,
            "top": 70,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 800,
            "top": 100,
            "left": 200,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 400,
            "top": 20,
            "left": 750,
            "opacity": 0.2,
            "zIndex": 2
        }//4
    ];
    // 1， 找到事件的相关元素
    var slide = document.querySelector("#slide");
    var arrow = document.querySelector("#arrow");
    var arrRight = document.querySelector("#arrRight");
    var arrLeft = document.querySelector("#arrLeft");
    var ulBox = slide.children[0];
    var lis = ulBox.children;
    var timer;
    var flag = true;
   	// 2，遍历当前的li，设置它的样式
   	asign()
   	function asign() {
   		for (var i = 0; i < lis.length; i++) {
	   		animate(lis[i], config[i], function() {
	   			flag = true
	   		})
	   	}
   	}
   	// 3, 鼠标经过大盒子，显示左右的箭头
   	slide.onmouseenter = function() {
   		clearInterval(timer)
   		animate(arrow, {
   			"opacity" : 1
   		})
   	} 
   	slide.onmouseleave = function() {
   		timer = setInterval(arrRight.onclick, 1000)
   		animate(arrow, {
   			"opacity" : 0
   		})
   	} 
   	// 4, 点击右箭头
   	arrRight.onclick = function() {
   		if(flag) {
   			flag = false
   			config.unshift(config.pop())
   			asign()
   		}
   	}
	arrLeft.onclick = function() {
   		if(flag) {
   			flag = false
   			config.push(config.shift())
   			asign()
   		}
   	}

   	timer = setInterval(arrRight.onclick, 1000)
}

// 旋转动画
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {//特殊处理
                var leader = getStyle(obj, k) * 100;//1  0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
                var target = json[k] * 100;//0.5
                var step = (target - leader) / 10;//0.5-1=-0.5
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {//如果有才调用
                fn();//动画执行完成后执行
            }
        }
    }, 15);
}

function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}