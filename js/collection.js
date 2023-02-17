const log = console.log.bind(document);
const post_col_list = document.querySelector('.post-list');
const col_star = document.querySelectorAll('.collection-star');
const star_e = document.querySelectorAll('.collection-star .star-e');
const star_f = document.querySelectorAll('.collection-star .star-f');
const col_ul = document.querySelector('.collection ul');
var col_list = new Array();
// window.localStorage.removeItem("col_list")
window.addEventListener('load', function() {
    let col_list_storage = JSON.parse(window.localStorage.getItem("col_list"));
    if (col_list_storage != null) {
        col_list = col_list_storage;
        col_list.forEach(o => {
            setCollectionStar(col_star.length - 1, o.name);
            makeLiToCollection(o.href, o.name);
        })
    }
})
let pageArray = [];
for (let i = 0; i < col_star.length; i++) {
    pageArray.push([post_col_list.children[i].children[1].innerHTML.trim(), post_col_list.children[i].children[1].href]);
}
// log(pageArray)
//进行收藏勾选

//设置页面收藏星星
function setCollectionStar(length, target) {
    let left = 0,
        right = length;
    for (; left <= right; left++, right--) {
        if (pageArray[left][0] == target) {
            pushCollection(left, pageArray[left][1], pageArray[left][0]);
        }
        if (pageArray[right][0] == target) {
            pushCollection(right, pageArray[left][1], pageArray[left][0]);
        }
    }
}
//空星隐藏，满星显示
function pushCollection(index, href, name) {
    star_e[index].style.display = 'none';
    star_f[index].style.display = 'block';
}

//创建收藏新元素到页面
function makeLiToCollection(href, name) {
    const li = document.createElement('li');
    li.innerHTML = `<li><a href="${href}">${name}</a></li>`;
    col_ul.appendChild(li);
}
//获取点击，并加入收藏
for (let i = 0; i < col_star.length; i++) {
    col_star[i].addEventListener('click', function(e) {
        log(e.target.style.display = 'block')
        if (star_e[i].style.display == 'block') {
            const obj = {
                name: pageArray[i][0],
                href: pageArray[i][1]
            }
            col_list.push(obj);
            pushCollection(i, obj.href, obj.name)
            makeLiToCollection(obj.href, obj.name)
            window.localStorage.setItem("col_list", JSON.stringify(col_list));
        } else {
            star_f[i].style.display = 'none';
            star_e[i].style.display = 'block';
            col_list = col_list.filter(o => o.name != pageArray[i][0]);
            window.localStorage.setItem("col_list", JSON.stringify(col_list));
            col_ul.innerHTML = '';
            col_list.forEach(o => makeLiToCollection(o.href, o.name));
        }
    })
}