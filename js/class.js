// 资源分类
let artName = document.querySelectorAll(".archive-main span");
let articlesClass = document.querySelector(".articlesClass");
let artClassArray = [];
let artNameH = new Array(new Array(0));
artName.forEach((o, i) => {
  //获取分类
  if (!artClassArray.includes(o.nextElementSibling.innerHTML.trim())) {
    artClassArray.push(o.nextElementSibling.innerHTML.trim());
  }
  //保存名称以及链接地址
  artNameH.push([o.innerHTML.trim(), o.parentNode.href, o.nextElementSibling.innerHTML.trim()])
});
//将不同类别显示在页面
artClassArray.forEach((o, i) => {
  let newLi = document.createElement("li");
  let curString = "";
  artNameH.forEach((v, k) => {
    if(v[2] == o) {
      curString += `<li><a href="${v[1]}">${v[0]}</a></li>`;
    }
  });
  //生成每个类别的字符串添加进 ul
  newLi.innerHTML = `<span>${o}</span><ul class="articlesUL">${curString}</ul>`;
  articlesClass.appendChild(newLi);
});