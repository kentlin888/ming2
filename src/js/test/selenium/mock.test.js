// import axios from 'axios'

// jest.mock('axios')
//https://medium.com/enjoy-life-enjoy-coding/jest-jojo%E6%98%AF%E4%BD%A0-%E6%88%91%E7%9A%84%E6%9B%BF%E8%BA%AB%E8%83%BD%E5%8A%9B%E6%98%AF-mock-4de73596ea6e
// 判斷該產品是否有折扣
const checkDiscount = (name) => {
    if (name === 'milk') {
        return true
    }
    return false
}

// 計算購買產品的總額
const calculateThePrice = (goods, checkDiscount) => {
    let totalPrice = 0
    goods.forEach((item) => {
        // 先計算原價
        let price = Number(item.price) * Number(item.count)

        // 如果有折扣要半價
        if (checkDiscount(item.name)) {
            price *= 0.5
        }

        // 將價格加到總合上
        totalPrice += price
    })
    return totalPrice
}
//被測試的函式 calculateThePrice 稱為 SUT （ System Under Test 測試目標）， 
//checkDiscount 被稱為 SUT 的 DOC （ Depended-on Component 依賴組件）。

// 創建一個產品物件提供測試
const shoppingCart = [{
        name: 'milk',
        price: 39,
        count: 2
    },
    {
        name: 'apple',
        price: 25,
        count: 3
    },
]

describe('mock demo', () => {
    // 建立 Mock 取代 CheckDiscount
    const mockCheckDiscount = jest.fn()
    // 設定回傳值
    mockCheckDiscount
        .mockReturnValueOnce(true)
        .mockReturnValue(false)
    it('jest.fn()', () => {
        // 確認期望是否正確
        //Test can return expect price
        expect(calculateThePrice(shoppingCart, mockCheckDiscount)).toBe(114)
        console.log("LOG: ~ file: mock.test.js ~ line 65 ~ it ~ mockCheckDiscount.mock.results", mockCheckDiscount.mock.results)
        expect(mockCheckDiscount.mock.calls.length).toBe(2)
        //傳入第N次參數，參數的第N個值 [ [ 'milk' ], [ 'apple' ] ]
        expect(mockCheckDiscount.mock.calls[0][0]).toBe('milk')
        //console.log("LOG: ~ file: mock.test.js ~ line 56 ~ it ~ mockCheckDiscount.mock.calls", mockCheckDiscount.mock.calls)


    })


    it('jest.mock()', () => {

        let axios = require('axios')
        // // 使用 jset.mock 自動模擬整個 axios 模組        
        jest.mock('axios')

        let resFakeData = {
            "userId": 5555,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }
        axios.get.mockResolvedValue(resFakeData)
        return axios.get('https://jsonplaceholder.typicode.com/todos/1').then((resp) => {
            console.log('resp.data----', resp)
            // 值會是 [ ['url/allGoods'] ]
            // 代表執行一次，那次接收到的參數為 'url/allGoods'
            console.log(axios.get.mock.calls)
            return resp.data
        })
    })
    it('jest.spyOn()', () => {
        let productModule = {
            checkDiscount: (name) => {
                console.log('run---',name)
                if (name === 'milk') {
                    return true
                }
                return false
            },
        }

        let shoppingCart = [{
                name: 'milk',
                price: 39,
                count: 2
            },
            {
                name: 'apple',
                price: 25,
                count: 3
            },
        ]
        // 以 objectName 及 methodName 創建 spy 替身
        const spyCheckDiscount = jest.spyOn(productModule, 'checkDiscount')
        // 設定假資料回傳
        spyCheckDiscount
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false)
        // 將 spy 送入測試
        let result = calculateThePrice(shoppingCart, spyCheckDiscount)
        console.log("LOG: ~ file: mock.test.js ~ line 118 ~ it ~ result", result)
        expect(result).toBe(114)
    })

})


// 將一個簡單的 Function 指定給 jest.fn 的第一個引數
const returnDoubleMock = jest.fn((x) => {
    return x * 2
})
// 執行時會依照該 Function 的邏輯回傳值
returnDoubleMock(5) // 回傳 10
returnDoubleMock(3) // 回傳 6