window.onload = function() {
    console.log(window.localStorage.getItem("theme"))
    if (window.localStorage.getItem("theme") == "dark") {
        document.querySelector('.theme').click();
        // document.documentElement.setAttribute("bg-img", "2");
    }
    if (window.localStorage.getItem("listC") == "single") {
        document.querySelector('.postListC .singleRow').click();
    }
}
//所有文章
document.querySelector('.allArticle').addEventListener('click', () => {
    document.querySelector('.articles').style.display = 'block';
});
document.querySelector('.closeArt').addEventListener('click', () => {
    document.querySelector('.articles').style.display = 'none';
});

//文章搜索
const searchBody = document.querySelector('.header .searchBody');
const searchSvg = document.querySelector('.searchBody .ssvg');
const searchResultUl = document.querySelector('.search .result ul');
const searchResult = document.querySelector('.search .result');
const searchInp = document.querySelector('.searchBody input');
const cover = document.querySelector('.cover');
cover.addEventListener('click', () => {
    searchInp.value = '';
    searchResultUl.innerHTML = '';
    searchResult.style.display = 'none';
    cover.style.display = 'none';
});
searchSvg.addEventListener('click', () => {
    searchInp.focus();
});
searchInp.addEventListener('focus', () => {
    searchBody.style.background = 'rgba(255, 255, 255, 1)';
    searchBody.style.width = '96%';
    searchBody.style.boxShadow = '3px 4px 12px 3px rgba(111, 109, 133, 0.2)';
    searchSvg.style.transform = "translateX(0%)";
    cover.style.display = 'block';
});
searchInp.addEventListener('blur', () => {
    searchBody.style.background = 'var(--bg-color-3)';
    searchBody.style.width = '87%';
    searchBody.style.boxShadow = '3px 4px 12px 3px rgba(111, 109, 133, 0.09)';
    searchSvg.style.transform = "translateX(-260%)";
    cover.style.display = 'none';
});
searchInp.addEventListener('keyup', () => {
    if (searchInp.value.trim() != '') {
        searchResult.style.display = 'block';
        var reg = new RegExp(searchInp.value + '\+', 'i');
        let artLiSpan = document.querySelectorAll(".articles li span");
        searchResultUl.innerHTML = '';
        searchResult.style.display = 'none';
        artLiSpan.forEach((o, i) => {
            if (reg.test(o.innerHTML)) {
                searchResult.style.display == 'none' && (searchResult.style.display = 'block');
                let nli = document.createElement("li");
                console.log(o.parentNode.href)
                nli.innerHTML = `<a href="${o.parentNode.href}"><span class=""><p>-></p>${o.innerHTML}<p><-</p></span><a>`;
                searchResultUl.appendChild(nli);
            }
        })
    } else {
        searchResult.style.display = 'none';
    }
});

//更多
const more = document.querySelector('.more');
more.addEventListener('click', () => {
    more.innerHTML = "";
    more.style.background = "var(--bg-color-3)";
    more.style.transform = "scale(60)";
    const moreC = document.querySelector('.moreContent');
    const cMore = document.querySelector('.closeMore');
    moreC.classList.add("more-show");
    moreC.classList.remove("more-hide");
    moreC.style.display = 'block';
    cMore.style.display = 'block';
    cMore.addEventListener('click', () => {
        more.style.transform = "scale(0.01)";
        moreC.classList.remove("more-show");
        moreC.classList.add("more-hide");
        more.innerHTML = "More";
        more.addEventListener('transitionend', () => {
            if (moreC.classList.contains("more-hide")) {
                more.style.transform = "scale(1)";
                more.style.background = "rgba(255,255,255,0)";
                cMore.style.display = 'none';
                moreC.style.display = 'none';
            }
        });
    });
});
//资源或建议推送
document.querySelector('.send').addEventListener('click', () => {
    const input = document.querySelectorAll('.m_pub');
    if (input[1].value.trim() != '') {
        let comment = `${input[0].value}+-->${input[1].value}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.bemfa.com/api/wechat/v1/weget.php?msg2=hahahaha&type=2&uid=88538b55194ff028c5f950c9ac1fb9ce&device=我是设备名称&msg=' + comment);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText)
                console.log("推送成功！")
            }
        }
        alert("推送成功！");
        input[0].value = '';
        input[1].value = '';
    } else {
        alert("需要输入内容");
    }
});

//主题切换
const theme = document.querySelector('.theme');
theme.addEventListener('click', () => {
    if (theme.innerHTML == "Light") {
        theme.innerHTML = "Dark"
        document.documentElement.setAttribute("color-theme", "dark");
        document.querySelector('.logo text').style.fill = "rgba(255,255,255,0.7)";
        document.querySelector('.frame').style.filter =  "opacity(0.2)";

        // document.documentElement.setAttribute("bg-img", "2");
        window.localStorage.setItem("theme", "dark");

    } else {
        theme.innerHTML = "Light"
        document.documentElement.setAttribute("color-theme", "light");
        document.querySelector('.logo text').style.fill = "rgba(51,51,51,0.8)";
        document.querySelector('.frame').style.filter =  "opacity(0.5)";
        window.localStorage.setItem("theme", "light");
    }
});

//列表样式切换
document.querySelector('.postListC .singleRow').addEventListener('click', () => {
    const posts = document.querySelectorAll('.post');
    posts.forEach(o => {
        o.style.width = "100%";
        o.style.height = "140px";
        o.style.padding = "1em";
    });
    document.querySelector('.postListC .singleRow path').setAttribute("fill", "rgba(13, 145, 145,0.3)");
    document.querySelector('.postListC .singleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0.09)";
    document.querySelector('.postListC .doubleRow path').setAttribute("fill", "var(--font-color-2)");
    document.querySelector('.postListC .doubleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0)";
    window.localStorage.setItem("listC", "single");
});
document.querySelector('.postListC .doubleRow').addEventListener('click', () => {
    const posts = document.querySelectorAll('.post');
    posts.forEach(o => {
        o.style.width = "48%";
        o.style.height = "180px";
        o.style.padding = "0.6em";
    });
    document.querySelector('.postListC .singleRow path').setAttribute("fill", "var(--font-color-2)");
    document.querySelector('.postListC .singleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0)";
    document.querySelector('.postListC .doubleRow path').setAttribute("fill", "rgba(13, 145, 145,0.3)");
    document.querySelector('.postListC .doubleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0.2)";
    window.localStorage.setItem("listC", "double");
});