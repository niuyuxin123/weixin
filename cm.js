const gohttp = require('gohttp');
const wxkey = require('./gzhkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token`
                +`?grant_type=client_credential`
                +`&appid=${wxkey.appid}&secret=${wxkey.secret}`;

var menu_data = {
    button: [
        {
            name:"发图",
            sub_button:[
                {
                    type:"pic_sysphoto",
                    name:"系统拍照发图",
                    key:"send-picture1",
                    sub_button:[]
                },
                {
                    type:"pic_photo_or_album",
                    name:"拍照或者相册发图",
                    key:"send-picture2",
                    sub_button:[]
                },{
                    type:"pic_weixin",
                    name:"微信相册发图",
                    key:"send-picture3",
                    sub_button:[]
                }
            ]

        },
        {
            name: "Linux",
            type: "view",
            url: "https://www.linux.org"
        },
        {
            name: "Send",
            type: "click",
            key: "send-msg"
        }
    ]
};

async function createMenu() {
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);
    //如果没有成功获取access_token则输出错误信息并退出
    if(t.access_token === undefined) {
        console.log(ret);
        process.exit(-1);
    }

    var create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create`+`?access_token=${t.access_token}`;

    ret = await gohttp.post(create_menu_api, {
        body: menu_data,
        headers: {
            //此扩展消息头的key值都应该小写
            'content-type': 'text/plain'
        }
    });
    //输出处理结果
    console.log(ret);
}

createMenu();