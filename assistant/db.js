db.getCollection('product').insertMany({
    "id": "1",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product1.jpg",
    "name": "钱包",
    "price": "132.00",
    "source": "国内·广东"
}, {
    "id": "2",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product2.jpg",
    "name": "金色木吉他",
    "price": "480.50",
    "source": "国内·广东"
}, {
    "id": "3",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product3.jpg",
    "name": "红纹铁质装订机",
    "price": "28.00",
    "source": "国内·福建"
}, {
    "id": "4",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product4.jpg",
    "name": "新鲜有机青蔬",
    "price": "30.90",
    "source": "国内·江苏"
}, {
    "id": "5",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product5.jpg",
    "name": "仿铁盘创意时钟",
    "price": "45.00",
    "source": "海外·瑞典"
}, {
    "id": "6",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product6.jpg",
    "name": "新鲜采摘葡萄",
    "price": "24.80",
    "source": "国内·新疆"
}, {
    "id": "7",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product7.jpg",
    "name": "果蔬大礼包",
    "price": "158.00",
    "source": "海外·新西兰"
}, {
    "id": "8",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product8.jpg",
    "name": "红色复古轿车模型",
    "price": "35.00",
    "source": "海外·德国"
}, {
    "id": "9",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product9.jpg",
    "name": "风驰电掣小摩托",
    "price": "249.00",
    "source": "国内·浙江"
}, {
    "id": "10",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product10.jpg",
    "name": "筐装大红苹果",
    "price": "29.80",
    "source": "国内·山东"
}, {
    "id": "11",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product11.jpg",
    "name": "精装耐用男鞋",
    "price": "335.00",
    "source": "国内·广东"
}, {
    "id": "12",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product12.jpg",
    "name": "宗教圣地旅游纪念",
    "price": "1668.00",
    "source": "海外·印度"
}, {
    "id": "13",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product13.jpg",
    "name": "高品质原装泵",
    "price": "2000.80",
    "source": "国内·河北"
}, {
    "id": "14",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product14.jpg",
    "name": "金刚轱辘圈",
    "price": "34.00",
    "source": "国内·辽宁"
}, {
    "id": "15",
    "image": "https://demo-1256969339.cos.ap-shanghai.myqcloud.com/product15.jpg",
    "name": "万圣节南瓜",
    "price": "29.90",
    "source": "海外·美国"
});

db.getCollection('order').insert({
    openid: '',
    orderList: [{
            orderid: '1',
            productList: [{
                id: '2',
                count: '2'
            }, {
                id: '1',
                count: '2'
            }],
            createtime: Date()
        },
        {
            orderid: '3',
            productList: [{
                id: '2',
                count: '2'
            }, {
                id: '1',
                count: '2'
            }],
            createtime: Date()
        },
        {
            orderid: '4',
            productList: [{
                id: '2',
                count: '2'
            }, {
                id: '3',
                count: '2'
            }, {
                id: '1',
                count: '2'
            }],
            createtime: Date()
        },
    ]
});


db.getCollection('trolley').insert({
    openid: '',
    productList: [{
        id: '2',
        count: '2'
    }, {
        id: '1',
        count: '2'
    }],
    createtime: Date()
});