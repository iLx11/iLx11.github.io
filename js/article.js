window.onload = function() {
    console.log(storage.retrieve("theme"))
    if(storage.retrieve("theme") == "dark") {
        document.querySelector('.theme').click();
    }
    if(storage.retrieve("listC") == "single") {
        document.querySelector('.postListC .singleRow').click();
    }
}

document.querySelector('.allArticle').addEventListener('click', () => {
    document.querySelector('.articles').style.display = 'block';
});
document.querySelector('.closeArt').addEventListener('click', () => {
    document.querySelector('.articles').style.display = 'none';
});
let searchBody = document.querySelector('.header .searchBody');
let searchSvg = document.querySelector('.searchBody .ssvg');
let searchResultUl = document.querySelector('.search .result ul');
let searchResult = document.querySelector('.search .result');
let searchInp = document.querySelector('.searchBody input');
searchSvg.addEventListener('click', () => {
    searchInp.focus();
});
searchInp.addEventListener('focus', () => {
    searchBody.style.background = 'rgba(255, 255, 255, 1)';
    searchBody.style.width = '96%';
    searchBody.style.boxShadow = '3px 4px 12px 3px rgba(111, 109, 133, 0.2)';
    searchSvg.style.transform = "translateX(0%)";

});
searchInp.addEventListener('blur', () => {
    searchBody.style.background = 'var(--bg-color-3)';
    searchBody.style.width = '87%';
    searchBody.style.boxShadow = '3px 4px 12px 3px rgba(111, 109, 133, 0.09)';
    searchSvg.style.transform = "translateX(-260%)";
    // document.documentElement.setAttribute("color-theme", "light");
    searchInp.value = '';
    searchResultUl.innerHTML = '';
    searchResult.style.display = 'none';
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
                nli.innerHTML = `<a href="${o.parentNode.href}"><span class=""><p>-></p>${o.innerHTML}<p><-</p></span><a>`;
                searchResultUl.appendChild(nli);
            }
        })
    } else {
        searchResult.style.display = 'none';
    }
});
let more = document.querySelector('.more');
more.addEventListener('click', () => {
    more.innerHTML = "";
    more.style.background = "var(--bg-color-3)";
    more.style.transform = "scale(60)";
    let moreC = document.querySelector('.moreContent');
    let cMore = document.querySelector('.closeMore');
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
document.querySelector('.send').addEventListener('click', () => {
    let input = document.querySelectorAll('.m_pub');
    if (input[1].value.trim() != '') {
        let comment = `${input[0].value}+-->${input[1].value}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.bemfa.com/api/device/v1/data/3/push/get/?uid=4a0a53fe249e4d889d9310e03aba10d7&topic=comment&msg=' + comment);
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
document.querySelector('.theme').addEventListener('click', () => {
    if (document.querySelector('.theme').innerHTML == "Light") {
        document.querySelector('.theme').innerHTML = "Dark"
        document.documentElement.setAttribute("color-theme", "dark");
        storage.save("theme","dark");

    } else {
        document.querySelector('.theme').innerHTML = "Light"
        document.documentElement.setAttribute("color-theme", "light");
        storage.save("theme","light");
    }
});
document.querySelector('.postListC .singleRow').addEventListener('click', () => {
    let posts = document.querySelectorAll('.post');
    posts.forEach(o => {
        o.style.width = "100%";
        o.style.height = "140px";
        o.style.padding = "1em";

    });
    document.querySelector('.postListC .singleRow path').setAttribute("fill", "rgba(13, 145, 145,0.3)");
    document.querySelector('.postListC .singleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0.09)";
    document.querySelector('.postListC .doubleRow path').setAttribute("fill", "var(--font-color-2)");
    document.querySelector('.postListC .doubleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0)";
    storage.save("listC","single");
});
document.querySelector('.postListC .doubleRow').addEventListener('click', () => {
    let posts = document.querySelectorAll('.post');
    posts.forEach(o => {
        o.style.width = "48%";
        o.style.height = "180px";
        o.style.padding = "0.6em";
    });
    document.querySelector('.postListC .singleRow path').setAttribute("fill", "var(--font-color-2)");
    document.querySelector('.postListC .singleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0)";
    document.querySelector('.postListC .doubleRow path').setAttribute("fill", "rgba(13, 145, 145,0.3)");
    document.querySelector('.postListC .doubleRow').style.boxShadow = "3px 4px 12px 3px rgba(111, 109, 133, 0.2)";
    storage.save("listC","double");
});