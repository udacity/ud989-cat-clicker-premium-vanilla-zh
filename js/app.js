
/* ======= Model（模型） ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus（章鱼） ======= */

var octopus = {

    init: function() {
        // 将我们当前的猫设置为列表中的第一个
        model.currentCat = model.cats[0];

        // 告诉我们的视图开始初始化
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // 将当前选择的猫设置为传入的对象
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // 递增当前选择的猫的计数器
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View（视图） ======= */

var catView = {

    init: function() {
        // 存储 DOM 元素以便稍后访问
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // 点击后，增加当前猫的计数器
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // 渲染此视图（用正确的值更新 DOM 元素）
        this.render();
    },

    render: function() {
        // 使用当前 cat 的值更新 DOM 元素
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // 存储 DOM 元素以便稍后访问
        this.catListElem = document.getElementById('cat-list');

        // 渲染此视图（用正确的值更新 DOM 元素）
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // 我们从章鱼那得到所有的猫
        var cats = octopus.getCats();

        // 清空猫列表
        this.catListElem.innerHTML = '';

        // 循环所有的猫
        for (i = 0; i < cats.length; i++) {
            // 这是我们正在循环的猫
            cat = cats[i];

            // 创建一个新的猫列表项并设置其文本
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // 点击时，setCurrentCat 并呈现 catView
            //（这使用我们循环中的闭包技巧将cat变量的值连接到click事件函数）
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // 最后，将元素添加到列表中
            this.catListElem.appendChild(elem);
        }
    }
};

// 开始吧！
octopus.init();
