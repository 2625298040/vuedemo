import { requestPost } from './request'

//购物车 进入 confirmOrder 创建订单 
export function create_order(data) {
    //data在传递过来之前就需要定义好格式
    // console.log(data);
    return requestPost({
        url: 'vuedemo/creat_order',
        data
    })
}

//details 进入confirmOrder  创建订单

export function create_details_order(data) {
    return requestPost({
        url: '/vuedemo/buy_goods',
        data
    })
}

export function getOrderbyOrderId(data) {
    //data在传递过来之前就需要定义好格式
    // console.log(data);
    return requestPost({
        url: 'vuedemo/get_goods_inorder',
        data: {
            order_id: data
        }
    })
}



// 获取订单内商品信息
export function getOrderGoods(id) {
    return requestPost({
        url: "/vuedemo/get_goods_inorder",
        data: {
            order_id: id
        }
    })
}


export function getOrderState(data) {
    return requestPost({
        url: "/vuedemo/update_order_state",
        data
    })
}


// 获取该用户的所有订单
export function getOrder(data) {
    return requestPost({
        url: "/vuedemo/get_order",
        // 两个参数 一个user_id 一个state订单状态 1---待支付 2---支付成功 3---支付失败
        data
    })
}


