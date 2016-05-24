"use strict";

window.onload = function() {
    waterfall('main','box');
    var dataInt = {
        'data': [{
            'src': 'img/1.jpg'
        }, {
            'src': 'img/2.jpg'
        }, {
            'src': 'img/3.jpg'
        }, {
            'src': 'img/4.jpg'
        }, {
            'src': 'img/5.jpg'
        }, {
            'src': 'img/6.jpg'
        }, {
            'src': 'img/7.jpg'
        }, {
            'src': 'img/8.jpg'
        }, {
            'src': 'img/9.jpg'
        }, {
            'src': 'img/10.png'
        }, {
            'src': 'img/11.png'
        }, {
            'src': 'img/12.png'
        }, {
            'src': 'img/13.png'
        }, {
            'src': 'img/14.png'
        }, {
            'src': 'img/1.jpg'
        }, {
            'src': 'img/2.jpg'
        }, {
            'src': 'img/3.jpg'
        }, {
            'src': 'img/4.jpg'
        }, {
            'src': 'img/5.jpg'
        }, {
            'src': 'img/6.jpg'
        }, {
            'src': 'img/7.jpg'
        }, {
            'src': 'img/8.jpg'
        }, {
            'src': 'img/9.jpg'
        }, {
            'src': 'img/10.png'
        }, {
            'src': 'img/11.png'
        }, {
            'src': 'img/12.png'
        }, {
            'src': 'img/13.png'
        }, {
            'src': 'img/14.png'
        }, {
            'src': 'img/1.jpg'
        }, {
            'src': 'img/2.jpg'
        }, {
            'src': 'img/3.jpg'
        }, {
            'src': 'img/4.jpg'
        }, {
            'src': 'img/5.jpg'
        }, {
            'src': 'img/6.jpg'
        }, {
            'src': 'img/7.jpg'
        }, {
            'src': 'img/8.jpg'
        }, {
            'src': 'img/9.jpg'
        }, {
            'src': 'img/10.png'
        }, {
            'src': 'img/11.png'
        }, {
            'src': 'img/12.png'
        }, {
            'src': 'img/13.png'
        }, {
            'src': 'img/14.png'
        }]
    };
    var n = 0;
    window.onscroll = function() {
        if (checkScrollSlide() && n < dataInt.data.length) {
            //将数据块渲染到页面尾部
            loadImg(dataInt.data[n].src, function() {
                var oBox = document.createElement('div');
                oBox.className = 'box animate';
                oBox.style.position = 'absolute';
                oBox.appendChild(this);
                oParent.appendChild(oBox);
                minH = Math.min.apply(null, hArr);
                oParent.style.height = Math.max.apply(null, hArr) + 'px';
                index = getMinHIndex(hArr, minH);
                hArr[index] += oBox.offsetHeight; //就是这里改变每列高度
                getPosition(oBox, oParent);
                ++n;
            });
        }
    }
}

//预加载img
var loadImg = function(url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback.call(img);
        return;
    }
    img.onload = function() {
        callback.call(img);
    }
};

var minH = 0;
var index = 0;
var oParent = document.getElementById('main');
var hArr = []; //存放每一列高度的数组
var waterfall = function(parent, box) {
    //获取元素
    var oBoxs = getByClass(oParent, 'box animate');
    //计算整个页面所需列数
    var oBoxW = oBoxs[0].offsetWidth; //获取盒子的宽度值(包括内边距边框)
    var cols = Math.floor(oParent.offsetWidth / oBoxW) //获取页面列数
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight)
        } else {
            minH = Math.min.apply(null, hArr); //Math.min()方法只能求一个个数(1,2,3,4)这样的，所以不能直接以数组做参数，但是apply方法会把数组值一个个传入，因此就可以啦
            oParent.style.height = Math.max.apply(null, hArr) + 'px';
            index = getMinHIndex(hArr, minH); //得到最低一列的位置标记
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * index + 'px';
            hArr[index] += oBoxs[i].offsetHeight; //就是这里改变每列高度
        }
    }
};

//封装确认元素位置的方法
var getPosition = function(element, container) {
        element.style.top = minH + 'px';
        element.style.left = index * element.offsetWidth + 'px';
    }
    //用于获取某一class的元素
var getByClass = function(parent, clsName) {
    var boxArr = new Array(),
        oElements = parent.getElementsByTagName('*'); //  这会将父元素所有子元素提取出来
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i])
        }
    }
    return boxArr;
};

var getMinHIndex = function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return i;
    }
};

//检测是否具备滚动加载数据块的条件
var checkScrollSlide = function() {
    var oBoxs = getByClass(oParent, 'box animate');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight); //求最后一个盒子距页面顶端的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = window.innerHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
};
