let mind = {
    "meta": {
        "name": "jsMind",
        "author": "hizzgdev@163.com",
        "version": "0.4.6"
    },
    "format": "node_array",
    "data": [
        {
            "id": "2jbtvtcl",
            "topic": "充電站營運中心",
            "isroot": true
        },
        {
            "id": "7ruzi8ld",
            "topic": "充電站資料庫",
            "parentid": "2jbtvtcl",
            "background-color": "#B801B8",
        },
        {
            "id": "kpew4utd",
            "topic": "種類",
            "parentid": "7ruzi8ld"
        },
        {
            "id": "m7pkejnk",
            "topic": "Oracle",
            "parentid": "kpew4utd"
        },
        {
            "id": "ik7j1tkk",
            "topic": "MSSQL",
            "parentid": "kpew4utd"
        },
        {
            "id": "d4jakl2y",
            "topic": "MySQL",
            "parentid": "kpew4utd"
        },
        {
            "id": "rpzpex7f",
            "topic": "NoSQL / Mongo / Firebase",
            "parentid": "kpew4utd"
        },
        {
            "id": "7ywgp4s0",
            "topic": "公司本地機房",
            "parentid": "7ruzi8ld"
        },
        {
            "id": "0hmala7u",
            "topic": "備援資料庫",
            "parentid": "7ywgp4s0"
        },
        {
            "id": "1qgs3iao",
            "topic": "雲端資料庫",
            "parentid": "7ruzi8ld"
        },
        {
            "id": "gwuc0t4f",
            "topic": "Azure",
            "parentid": "1qgs3iao"
        },
        {
            "id": "axnn2be1",
            "topic": "GCP",
            "parentid": "1qgs3iao"
        },
        {
            "id": "xilv3qps",
            "topic": "Firebase",
            "parentid": "axnn2be1"
        },
        {
            "id": "rjyz9nwk",
            "topic": "AWS",
            "parentid": "1qgs3iao"
        },
        {
            "id": "pjzoo2w8",
            "topic": "Redis cache DB",
            "parentid": "7ruzi8ld"
        },
        {
            "id": "ilwengjc",
            "topic": "營運伺服器(本地/雲端)",
            "parentid": "2jbtvtcl",
            "background-color": "#7D7200",
        },
        {
            "id": "ovimpcng",
            "topic": "微服務架構",
            "parentid": "ilwengjc"
        },
        {
            "id": "v9dusgm5",
            "topic": "Docker Images",
            "parentid": "ilwengjc"
        },
        {
            "id": "erkclymo",
            "topic": "Linux",
            "parentid": "ilwengjc"
        },
        {
            "id": "n8zrgyno",
            "topic": "Node.js / Express",
            "parentid": "ilwengjc"
        },
        {
            "id": "7d7t2hcz",
            "topic": "Apache / Nginx",
            "parentid": "ilwengjc"
        },
        {
            "id": "wrr8s06m",
            "topic": "Firebase / Cloud",
            "parentid": "ilwengjc"
        },
        {
            "id": "wdi3p0o4",
            "topic": "研發專案管理",
            "parentid": "2jbtvtcl",
            "background-color": "#3F0903",
        },
        {
            "id": "uiu461ob",
            "topic": "文件管理",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "uijud4hz",
            "topic": "Markdown文件",
            "parentid": "uiu461ob"
        },
        {
            "id": "ih4ej34w",
            "topic": "google 文件",
            "parentid": "uiu461ob"
        },
        {
            "id": "30jz50pk",
            "topic": "WBS(工作分解)",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "5ftgyzeo",
            "topic": "甘特圖(進度控制)",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "h7ss1ame",
            "topic": "Trello(看板式管理)",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "rahq9ekf",
            "topic": "敏捷式開發?",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "4073pe8p",
            "topic": "程式碼管理",
            "parentid": "wdi3p0o4"
        },
        {
            "id": "i2cq43by",
            "topic": "Github",
            "parentid": "4073pe8p"
        },
        {
            "id": "lrnzig9a",
            "topic": "每日工作日誌回報",
            "parentid": "wdi3p0o4"
        },
        //=========== 監控中心
        {
            "id": "vwhksq3e",
            "topic": "監控中心",
            "parentid": "2jbtvtcl",
            "direction": "left",
            "background-color": "#0B7E0B",
        },
        {
            "id": "310eak2e",
            "topic": "HTML / Javascript / CSS",
            "parentid": "vwhksq3e"
        },
        {
            "id": "5rkolaaq",
            "topic": "DashBoard / Chart / Data Table",
            "parentid": "vwhksq3e"
        },
        {
            "id": "6qus042x",
            "topic": "Webpack / React",
            "parentid": "vwhksq3e"
        },
        //=========== 行動裝置
        {
            "id": "h1dg29zg",
            "topic": "行動裝置",
            "parentid": "2jbtvtcl",
            "direction": "left",
            "background-color": "#FF5B22",
        },
        {
            "id": "z8amitn8",
            "topic": "PWA",
            "parentid": "h1dg29zg"
        },
        {
            "id": "xiopqf31",
            "topic": "iOS / Android App",
            "parentid": "h1dg29zg"
        },
        //=========== 自動化測試
        {
            "id": "2d17wdwt",
            "topic": "自動化測試",
            "parentid": "2jbtvtcl",
            "direction": "left",
            "foreground-color": "black",
            "background-color": "yellow",
        },
        {
            "id": "prctlm77",
            "topic": "Unit Test",
            "parentid": "2d17wdwt"
        },
        {
            "id": "497kaoe6",
            "topic": "Mocha",
            "parentid": "prctlm77"
        },
        {
            "id": "iptwe40k",
            "topic": "Jest",
            "parentid": "prctlm77"
        },
        {
            "id": "p0hyx2h8",
            "topic": "GUI Test",
            "parentid": "2d17wdwt"
        },
        {
            "id": "uix4wq6v",
            "topic": "Selenium",
            "parentid": "p0hyx2h8"
        },
        {
            "id": "kthqyaxi",
            "topic": "Appium",
            "parentid": "p0hyx2h8"
        },
        {
            "id": "am9usa3f",
            "topic": "Customization",
            "parentid": "p0hyx2h8"
        },
        {
            "id": "8bgii7py",
            "topic": "API Test",
            "parentid": "2d17wdwt"
        },
        {
            "id": "vsgbe75e",
            "topic": "Mocha",
            "parentid": "8bgii7py"
        },
        {
            "id": "6xv2m38n",
            "topic": "SuperTest",
            "parentid": "8bgii7py"
        },
        {
            "id": "p3f5mr8b",
            "topic": "Chakram",
            "parentid": "8bgii7py"
        },
        //========== 維運自動警示系統
        {
            "id": "aaior818",
            "topic": "維運自動警示系統",
            "parentid": "2jbtvtcl",
            "direction": "left",
            "background-color": "#B10706",
        },
        
    ]
};
let arrayColorNodes = []

function colorMind(list_MindData) {
    //let list_ColorData = list_MindData;
    arrayColorNodes = list_MindData.filter((item) => {
        return (item["background-color"]) //not null
    })
    list_MindData.forEach(itemChild => {
        if (itemChild["background-color"])
            return
        if (itemChild.notuse) {
            switch (itemChild.notuse) {
                case 1:// learened
                    itemChild["background-color"] = "#888888" //888888
                    break;
                case 2:// can't do it
                    itemChild["background-color"] = "#888888" //CCCCCC
                    break;
                default:
                    itemChild["background-color"] = "#CCCCCC"
                    break;
            }
            return
        }
        let foundParent = arrayColorNodes.find((itemParent) => {
            return (itemParent.id === itemChild.parentid)
        })
        // possible undefined
        if (foundParent) {
            itemChild["background-color"] = foundParent["background-color"]
            itemChild["foreground-color"] = foundParent["foreground-color"]
        }


        //console.log("LOG: ~ file: 1_basic.js ~ line 445 ~ found ~ found", found)
        // if(arrayColorNodes.includes(item.parentid))//is child
        // item["background-color"] = 
    });
    return list_MindData;
}

function load_jsmind() {
    let list_ColorData = colorMind(mind.data);
    list_ColorData = colorMind(mind.data);
    list_ColorData = colorMind(mind.data);
    list_ColorData = list_ColorData.map((item) => {
        if(item.notuse)
            item.expanded = false;
        return item
    })
    mind.data = list_ColorData;
    var options = {
        container: 'jsmind_container',
        editable: true,
        theme: 'primary',
        view:{
            engine: 'canvas',   // 思维导图各节点之间线条的绘制引擎 canvas/svg
            // hmargin:100,        // 思维导图距容器外框的最小水平距离
            // vmargin:50,         // 思维导图距容器外框的最小垂直距离
            // line_width:2,       // 思维导图线条的粗细
            // line_color:'#555'   // 思维导图线条的颜色
        },
    }
    var jm = jsMind.show(options, mind);
    

    // remove not use nodes
    let listNotuseNodes = list_ColorData.filter((item) => {
        return (item.notuse)
    })
    listNotuseNodes.forEach((item) => {
        jm.remove_node(item.id)
    })
    //jm.remove_node('6c6d020d748cd3f7')//Security

    // jm.set_readonly(true);
    // var mind_data = jm.get_data();
    // alert(mind_data);
    // jm.add_node("sub2", "sub23", "new node", {
    //     "background-color": "red"
    // });
    // jm.set_node_color('sub21', 'green', '#ccc');
}

load_jsmind();
// console.log(arrayColorNodes)