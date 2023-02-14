var clientW;
window.onload = function () {
    console.log(window.localStorage.getItem("theme"))
    if (window.localStorage.getItem("theme") == "dark") {
        document.documentElement.setAttribute("color-theme", "dark");
        // document.documentElement.setAttribute("bg-img", "2");
        document.querySelector('.themePage2').innerHTML = "Dark"
    }
    clientW = document.documentElement.clientWidth;
}
//切换主题颜色
document.querySelector('.themePage2').addEventListener('click', () => {
    if (document.querySelector('.themePage2').innerHTML == "Light") {
        document.querySelector('.themePage2').innerHTML = "Dark"
        document.documentElement.setAttribute("color-theme", "dark");
        window.localStorage.setItem("theme", "dark");

    } else {
        document.querySelector('.themePage2').innerHTML = "Light"
        document.documentElement.setAttribute("color-theme", "light");
        window.localStorage.setItem("theme", "light");
    }
});
const h1 = document.querySelectorAll('h1');
const h2 = document.querySelectorAll('h2');
const h3 = document.querySelectorAll('h3');
const h4 = document.querySelectorAll('h4');
let bgn = document.querySelector(".post-md").children[0];
const menu = document.querySelector('.menu>ul');
let menuShowControl = true;
//控制菜单显示
document.querySelector('.menuShow').addEventListener('click', () => {
    if (menuShowControl == true) {
        document.querySelector('.menu').style.display = 'none';
    } else {
        document.querySelector('.menu').style.display = 'block';
    }
    menuShowControl = !menuShowControl;

});
const postMain = document.querySelector('.post-main');
//回到顶部
document.querySelector('.top').addEventListener('click', () => {
    postMain.scrollTo(0, 0);
    window.scrollTo(0, 0);
});

//生成首个标题
menuSet(bgn, menu);
//当下一个兄弟节点不为空时，持续生成目录
while ((bgn = bgn.nextElementSibling) != null) {
    menuSet(bgn, menu);
}

//自动生成文章目录
function menuSet(bgn, menu) {
    if (bgn.tagName == "H1") {
        const nli = document.createElement("li");
        nli.innerHTML = `<span class="h1T"><div class="topic-1"><div>一级标题</div><div class="topic-content">${bgn.innerHTML}</div></div></span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H2") {
        const nli = document.createElement("li");
        nli.innerHTML = `<span class="h2T"><div class="topic-2"><div>二级标题</div><div class="topic-content">${bgn.innerHTML}</div></div></span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H3") {
        const nli = document.createElement("li");
        nli.innerHTML = `<span class="h3T"><div class="topic-3"><div>三级标题</div><div class="topic-content">${bgn.innerHTML}</div></div></span>`;
        menu.appendChild(nli);
    } else if (bgn.tagName == "H4") {
        const nli = document.createElement("li");
        nli.innerHTML = `<span class="h4T"><div class="topic-4"><div>四级标题</div><div class="topic-content">${bgn.innerHTML}</div></div></span>`;
        menu.appendChild(nli);
    } else {
        return;
    }
}

//目录点击跳转
const h1T = document.querySelectorAll('.menu>ul>li>.h1T');
const h2T = document.querySelectorAll('.menu>ul>li>.h2T');
const h3T = document.querySelectorAll('.h3T');
const h4T = document.querySelectorAll('.h4T');
const shu = [h1T, h2T, h3T, h4T];
const zu = [h1, h2, h3, h4];
for (let j = 0; j < shu.length; j++) {
    for (let i = 0; i < shu[j].length; i++) {
        shu[j][i].onclick = function () {
            let position = zu[j][i].offsetTop;
            postMain.scrollTo(0, position);
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
window.onscroll = function () {
    if (document.querySelector('.menu>ul').children.length != 0 && menuShowControl == true) {
        document.querySelector('.menu').style.display = 'block';
    }
    menuHide();
    showCurrent();
}
document.querySelector('.post-main').onscroll = showCurrent;
document.querySelector('.menu>ul').onscroll = function () {
    menuHide();
}
//自动隐藏目录
function menuHide() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (clientW < 700)
            document.querySelector('.menu').style.display = 'none';
    }, 1500)
}

function getTop(aa) {
    let offset = aa.offsetTop;
    if (aa.offsetParent != null) offset += getTop(aa.offsetParent);
    return offset;
}
//用于限制执行次数
let shuzu = [];
let set = 0;

let log = console.log.bind(document);
//当前文段显示颜色
function showCurrent() {
    let hs = document.querySelectorAll('.post-main h1, .post-main h2, .post-main h3, .post-main h4');
    // log(hs)
    for (let i = 0; i < hs.length; i++) {

        if (hs[i].offsetTop < scroll().top || hs[i].offsetTop < postMain.scrollTop) {

            if (((Math.abs(scroll().top - hs[i].offsetTop) < 20) || (clientW > 700 && Math.abs(postMain.scrollTop - hs[i].offsetTop) < 20))  && shuzu[0] == shuzu[1] ) {
                showColor(i);
            } else {
                shuzu[set] = 0;
                set++;
            }
            if (set > 1) set = 0;
        }
    }
}
function showColor(i) {
    shuzu[set] = 1;
    const menuli = document.querySelectorAll('.menu .topic-content');
    for (let j = 0; j < menuli.length; j++) {
        menuli[j].style.color = "var(--font-color-1)";
    }
    menuli[i].style.color = "rgba(158, 215, 236, 0.9)";
    document.querySelector('.menu>ul').scrollTo(0, menuli[i].offsetTop - 100);
    set++;
}