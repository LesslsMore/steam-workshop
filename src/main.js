console.log('hello world');

import { saveAs } from 'file-saver';

const list_path = '.workshopBrowseItems'
const item_path = '.workshopItem'

// 获取列表元素
var list = document.querySelector(list_path);

// 如果找到了列表元素
if (list) {
    // 获取列表中的所有列表项
    var listItems = list.querySelectorAll(item_path);


    // 创建一个全选复选框
    var selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.addEventListener('change', function () {
        // 遍历每个列表项，设置复选框的选中状态
        listItems.forEach(function (item, index) {
            var checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = selectAllCheckbox.checked;
            // 打印选择框的序号
            if (checkbox.checked) {
                console.log("Checkbox " + (index + 1) + " is checked.");
            }
        });
    });

    // 在列表之前插入全选复选框
    list.parentNode.insertBefore(selectAllCheckbox, list);

    // 遍历每个列表项
    listItems.forEach(function (item, index) {
        // 创建一个多选框元素
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // 将多选框添加到列表项中
        item.insertBefore(checkbox, item.firstChild);

        // 监听多选框的变化事件
        checkbox.addEventListener('change', function () {
            var allChecked = true;
            listItems.forEach(function (checkbox) {
                if (!checkbox.checked) {
                    allChecked = false;
                }
            });
            selectAllCheckbox.checked = allChecked;
            // 打印选择框的序号
            console.log("Checkbox " + (index + 1) + " is " + (checkbox.checked ? "checked" : "unchecked") + ".");
        });
    });
}

let btn = document.createElement("button");
btn.innerHTML = "steam-workshop json 导出";//innerText也可以,区别是innerText不会解析html
btn.onclick = function () {
    let infos = get_item_infos()
    console.log(infos.length)
    console.log(infos)
    var blob = new Blob([JSON.stringify(infos)], { type: "text/plain;charset=utf-8" });
    // var blob = new Blob(["Hello, world!"],{ type: "application/vnd.ms-excel" })
    // saveAs(blob, `steam-workshop.json`);
}

// 在列表之前插入全选复选框
list.parentNode.insertBefore(btn, list);

// let item = document.querySelector(".ipc-metadata-list-summary-item")

function get_item_infos() {
    let infos = []
    document.querySelectorAll(item_path).forEach(
        item => {
            if (item.querySelector('input').checked) {
                let info = get_item_info(item)
                infos.push(info)
            }
        }
    )
    return infos
}

function get_item_info(item) {
    let id = item.querySelector('.ugc').getAttribute('data-appid')
    let pid = item.querySelector('.ugc').getAttribute('data-publishedfileid')
    let href = item.querySelector('.ugc').href
    let rate_url = item.querySelector('.fileRating').src.split('-')[0].split('/')
    let rate = rate_url[rate_url.length - 1]

    let img = item.querySelector('.workshopItemPreviewImage').src 

    let author = item.querySelector('.workshop_author_link').textContent
    let author_link = item.querySelector('.workshop_author_link').href
    let title = item.querySelector('.workshopItemTitle').textContent
     
    
    let info = {
        id,
        pid,
        href,
        rate,
        img,
        author,
        author_link,
        title,
    }
    return info
}



