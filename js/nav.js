window.onload = function() {
    console.log(storage.retrieve("theme"))
    if(storage.retrieve("theme") == "dark") {
        document.documentElement.setAttribute("color-theme", "dark");
        document.querySelector('.themePage2').innerHTML = "Dark"
    }
}
document.querySelector('.themePage2').addEventListener('click', () =>{
    if (document.querySelector('.themePage2').innerHTML == "Light") {
        document.querySelector('.themePage2').innerHTML = "Dark"
        document.documentElement.setAttribute("color-theme", "dark");
        storage.save("theme","dark");

    } else {
        document.querySelector('.themePage2').innerHTML = "Light"
        document.documentElement.setAttribute("color-theme", "light");
        storage.save("theme","light");
    }
});
let h1 = document.querySelectorAll('h1');
let h2 = document.querySelectorAll('h2');
let h3 = document.querySelectorAll('h3');
let h4 = document.querySelectorAll('h4');
let bgn = document.querySelector(".post-md").children[0];
let menu = document.querySelector('.menu>ul');
var menuShowControl = true;

document.querySelector('.menuShow').addEventListener('click', () => {
    if (menuShowControl == true) {
        document.querySelector('.menu').style.display = 'none';
    } else {
        document.querySelector('.menu').style.display = 'block';
    }
    menuShowControl = !menuShowControl;

});
document.querySelector('.top').addEventListener('click', () => {
    window.scrollTo(0, 0);
});

menuSet(bgn, menu);
while ((bgn = bgn.nextElementSibling) != null) {
    menuSet(bgn, menu);
}

function menuSet(bgn, menu) {
    if (bgn.tagName == "H1") {
        let nli = document.createElement("li");
        nli.innerHTML = `<span class="h1T">@${bgn.innerHTML}</span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H2") {
        let nli = document.createElement("li");
        nli.innerHTML = `<span class="h2T">${bgn.innerHTML}</span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H3") {
        let nli = document.createElement("li");
        nli.innerHTML = `<span class="h3T">->${bgn.innerHTML}</span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H4") {
        let nli = document.createElement("li");
        nli.innerHTML = `<span class="h4T">-->${bgn.innerHTML}</span>`;
        menu.appendChild(nli);
    } else {
        return;
    }
}
let h1T = document.querySelectorAll('.menu>ul>li>.h1T');
let h2T = document.querySelectorAll('.menu>ul>li>.h2T');
let h3T = document.querySelectorAll('.h3T');
let h4T = document.querySelectorAll('.h4T');
let shu = [h1T, h2T, h3T, h4T];
let zu = [h1, h2, h3, h4];
for (let j = 0; j < shu.length; j++) {
    for (let i = 0; i < shu[j].length; i++) {
        shu[j][i].onclick = function() {
            let position = zu[j][i].offsetTop;
            window.scrollTo(0, position);
        }
    }
}
// var json = {left: 10, right: 10} 变异
//json.left json.top
function scroll() {
    if (window.pageYOffset != null) // ie9+ 和其他浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else if (document.compatMode == "CSS1Compat") // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { // 剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
var timer = null;
window.onscroll = function() {
    if (document.querySelector('.menu>ul').children.length != 0 && menuShowControl == true) {
        document.querySelector('.menu').style.display = 'block';
    }
    menuHide();
    showCurrent();
}
document.querySelector('.menu>ul').onscroll = function() {
    menuHide();
}

function menuHide() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        document.querySelector('.menu').style.display = 'none';
    }, 1500)
}

function getTop(aa) {
    let offset = aa.offsetTop;
    if (aa.offsetParent != null) offset += getTop(aa.offsetParent);
    return offset;
}
let shuzu = [];
let set = 0;

function showCurrent() {
    let hs = document.querySelectorAll('h1, h2, h3, h4');
    for (let i = 0; i < hs.length; i++) {
        if (hs[i].offsetTop < scroll().top) {
            if (scroll().top - hs[i].offsetTop < 60 && shuzu[0] == shuzu[1]) {
                shuzu[set] = 1;
                let menuli = document.querySelectorAll('.menu>ul>li>span');
                for (let j = 0; j < menuli.length; j++) {
                    menuli[j].style.color = "var(--font-color-1)";
                }
                menuli[i].style.color = "rgba(158, 215, 236, 0.9)";
                document.querySelector('.menu>ul').scrollTo(0, menuli[i].offsetTop - 100);
                set++;
            } else {
                shuzu[set] = 0;
                set++;
            }
            if (set > 1) set = 0;

        }
    }
}