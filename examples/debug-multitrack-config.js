import { createMultiTrackBuilder } from '../utils/MultiTrackBuilder.js';

async function debugMultiTrackConfig() {
  let video={
    "type": "canvas",
    "width": 1280,
    "height": 720,
    "duration": 23.159999999999997,
    "name": "儿童故事视频",
    "author": "chnak",
    "cover": null,
    "refId": "hg039u3k1zs",
    "children": [
        {
            "type": "spine",
            "refId": "rq95os8i9r9",
            "zIndex": 0,
            "children": [
                {
                    "bgcolor": "#333",
                    "active": true,
                    "isCover": true,
                    "id": "cover",
                    "type": "scene",
                    "duration": 3,
                    "zIndex": 2,
                    "refId": "cwz30zmgxlg",
                    "isScene": false,
                    "children": [
                        {
                            "src": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80",
                            "x": "50vw",
                            "y": "50vh",
                            "width": "100vw",
                            "height": "100vh",
                            "object-fit": "cover",
                            "duration": 3,
                            "blur": null,
                            "effect": [
                                {
                                    "name": "fadeOut",
                                    "time": 0.5,
                                    "delay": 2.5
                                }
                            ],
                            "start": 0,
                            "type": "image",
                            "refId": "hp8pkfmczup",
                            "zIndex": 1,
                            "active": true,
                            "children": []
                        },
                        {
                            "text": "儿童故事视频",
                            "fontSize": "28rpx",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "40vh",
                            "duration": 3,
                            "color": "#fff",
                            "start": 0,
                            "stroke": {
                                "color": "#FFF",
                                "size": 0
                            },
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "effect": [
                                {
                                    "name": "zoomOutDown",
                                    "time": 0.5,
                                    "delay": 2.5
                                }
                            ],
                            "type": "text",
                            "refId": "8848v6of5ol",
                            "backgroundColor": null,
                            "letterSpacing": null,
                            "lineHeight": "120%",
                            "asMask": false,
                            "zIndex": 4,
                            "width": null,
                            "wrap": true,
                            "height": null,
                            "active": true,
                            "children": []
                        },
                        {
                            "text": "小熊的森林冒险",
                            "fontSize": "16rpx",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "60vh",
                            "stroke": {
                                "color": "#FFF",
                                "size": 0
                            },
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "duration": 3,
                            "color": "#fff",
                            "start": 0,
                            "effect": [
                                {
                                    "name": "zoomOutDown",
                                    "time": 0.5,
                                    "delay": 2.5
                                }
                            ],
                            "type": "text",
                            "refId": "3b85jf1vctj",
                            "backgroundColor": null,
                            "letterSpacing": null,
                            "lineHeight": "120%",
                            "asMask": false,
                            "zIndex": 4,
                            "width": null,
                            "wrap": true,
                            "height": null,
                            "active": true,
                            "children": []
                        },
                        {
                            "text": "2025年09月29日",
                            "fontSize": "14rpx",
                            "color": "#fff",
                            "x": "50vw",
                            "y": "78vh",
                            "stroke": {
                                "color": "#070707",
                                "size": "5%"
                            },
                            "duration": 3,
                            "start": 0,
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "effect": [
                                {
                                    "name": "fadeOutDownBig",
                                    "time": 0.5,
                                    "delay": 2.5
                                }
                            ],
                            "type": "text",
                            "refId": "y6dw2b48t8n",
                            "backgroundColor": null,
                            "letterSpacing": null,
                            "lineHeight": "120%",
                            "asMask": false,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "zIndex": 4,
                            "width": null,
                            "wrap": true,
                            "height": null,
                            "active": true,
                            "children": []
                        }
                    ]
                },
                {
                    "duration": 1,
                    "key": "fade",
                    "zIndex": 6,
                    "type": "trans",
                    "refId": "4vac21x9cmk",
                    "prevRefId": "cwz30zmgxlg",
                    "nextRefId": "qlzoxcn8dsa",
                    "children": []
                },
                {
                    "bgcolor": "#fff",
                    "zIndex": 2,
                    "compositionId": "hg039u3k1zs",
                    "duration": 6.047999999999999,
                    "parentId": "rq95os8i9r9",
                    "type": "scene",
                    "id": "axtj6v46sgs",
                    "refId": "qlzoxcn8dsa",
                    "active": true,
                    "isScene": true,
                    "children": [
                        {
                            "src": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80",
                            "x": "50vw",
                            "y": "50vh",
                            "width": "100vw",
                            "height": "100vh",
                            "duration": 6.047999999999999,
                            "effect": [],
                            "compositionId": "hg039u3k1zs",
                            "parentId": "qlzoxcn8dsa",
                            "zIndex": 1,
                            "type": "image",
                            "refId": "vhkwhiivs7n",
                            "active": true,
                            "children": [],
                            "start": 0,
                            "end": 6.047999999999999
                        }
                    ],
                    "start": 3,
                    "end": 9.047999999999998
                },
                {
                    "duration": 1,
                    "key": "fadeIn",
                    "zIndex": 6,
                    "type": "trans",
                    "refId": "60pbjrkrlpr",
                    "prevRefId": "qlzoxcn8dsa",
                    "nextRefId": "0lqqx21mq8j",
                    "children": []
                },
                {
                    "bgcolor": "#fff",
                    "zIndex": 2,
                    "compositionId": "hg039u3k1zs",
                    "duration": 7.56,
                    "parentId": "rq95os8i9r9",
                    "type": "scene",
                    "id": "2vtx5g7l3ay",
                    "refId": "0lqqx21mq8j",
                    "active": true,
                    "isScene": true,
                    "children": [
                        {
                            "src": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80",
                            "x": "50vw",
                            "y": "50vh",
                            "width": "100vw",
                            "height": "100vh",
                            "duration": 7.56,
                            "effect": [],
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 1,
                            "type": "image",
                            "refId": "gv1qp175ap4",
                            "active": true,
                            "children": [],
                            "start": 0,
                            "end": 7.56
                        }
                    ],
                    "start": 9.047999999999998,
                    "end": 16.607999999999997
                },
                {
                    "duration": 1,
                    "key": "fadeOut",
                    "zIndex": 6,
                    "type": "trans",
                    "refId": "hhbb6djxzq",
                    "prevRefId": "0lqqx21mq8j",
                    "nextRefId": "jrrsq2exqxb",
                    "children": []
                },
                {
                    "bgcolor": "#fff",
                    "zIndex": 2,
                    "compositionId": "hg039u3k1zs",
                    "duration": 6.552,
                    "parentId": "rq95os8i9r9",
                    "type": "scene",
                    "id": "02k2y98v5b2e",
                    "refId": "jrrsq2exqxb",
                    "active": true,
                    "isScene": true,
                    "children": [
                        {
                            "src": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80",
                            "x": "50vw",
                            "y": "50vh",
                            "width": "100vw",
                            "height": "100vh",
                            "duration": 6.552,
                            "effect": [],
                            "compositionId": "hg039u3k1zs",
                            "parentId": "jrrsq2exqxb",
                            "zIndex": 1,
                            "type": "image",
                            "refId": "motkfvb9f0a",
                            "active": true,
                            "children": [],
                            "start": 0,
                            "end": 6.552
                        }
                    ],
                    "start": 16.607999999999997,
                    "end": 23.159999999999997
                }
            ],
            "duration": 23.159999999999997
        },
        {
            "type": "scene",
            "id": "subtitle",
            "zIndex": 1000,
            "refId": "2xjcv9gu04l",
            "active": true,
            "isScene": false,
            "children": [
                {
                    "refId": "nf06xlb1zoc",
                    "type": "speech",
                    "isSubtitle": true,
                    "duration": 4.032,
                    "children": [
                        {
                            "text": "在一个阳光明媚的早晨，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.848,
                            "src": "D:/code/foliko-trade/public/files/1rt2c001dh51d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "qlzoxcn8dsa",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "ozv1ktnj6cf",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 0,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 1.848
                        },
                        {
                            "text": "小熊贝贝决定去森林里探险。",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 2.184,
                            "src": "D:/code/foliko-trade/public/files/1rt2c001dh51d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "qlzoxcn8dsa",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "n2w9onpg22",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 1.848,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 4.032
                        }
                    ],
                    "audio": true,
                    "src": "D:/code/foliko-trade/public/files/1rt2c001dh51d.mp3",
                    "volume": 2,
                    "start": 3,
                    "end": 7.032
                },
                {
                    "refId": "0tyjmm03dbhc",
                    "type": "speech",
                    "isSubtitle": true,
                    "duration": 7.56,
                    "children": [
                        {
                            "text": "它走啊走，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.0216216216216216,
                            "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "7o4kb1ul0n",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 0,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 1.0216216216216216
                        },
                        {
                            "text": "遇到了小兔子和小松鼠。",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 2.2475675675675677,
                            "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "2eb86w2q012",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 1.0216216216216216,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 3.2691891891891895
                        },
                        {
                            "text": "它们一起玩耍，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.4302702702702703,
                            "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "9pzlnyxdvht",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 3.2691891891891895,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 4.69945945945946
                        },
                        {
                            "text": "分享食物，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.0216216216216216,
                            "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "uowcdf0dawm",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 4.69945945945946,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 5.721081081081081
                        },
                        {
                            "text": "度过了愉快的一天。",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.838918918918919,
                            "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "0lqqx21mq8j",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "4u174xmk1dc",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 5.721081081081081,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 7.5600000000000005
                        }
                    ],
                    "audio": true,
                    "src": "D:/code/foliko-trade/public/files/1rt2c002dh50d.mp3",
                    "volume": 2,
                    "start": 9.047999999999998,
                    "end": 16.607999999999997
                },
                {
                    "refId": "iyek35oa5ij",
                    "type": "speech",
                    "isSubtitle": true,
                    "duration": 6.552,
                    "children": [
                        {
                            "text": "太阳下山时，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 1.1232000000000002,
                            "src": "D:/code/foliko-trade/public/files/1rt2c003dh51d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "jrrsq2exqxb",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "rjbvs305mqi",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 0,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 1.1232000000000002
                        },
                        {
                            "text": "贝贝高高兴兴地回家了，",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 2.0592,
                            "src": "D:/code/foliko-trade/public/files/1rt2c003dh51d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "jrrsq2exqxb",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "yn68rofyhel",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 1.1232000000000002,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 3.1824000000000003
                        },
                        {
                            "text": "心里想着：森林真是个充满快乐的地方！",
                            "fontSize": "15rpx",
                            "color": "#fff",
                            "fontFamily": "D:/code/foliko-trade/public/fonts/MicrosoftYaHei-01.ttf",
                            "x": "50vw",
                            "y": "90vh",
                            "duration": 3.3695999999999997,
                            "src": "D:/code/foliko-trade/public/files/1rt2c003dh51d.mp3",
                            "volume": 2,
                            "compositionId": "hg039u3k1zs",
                            "parentId": "jrrsq2exqxb",
                            "zIndex": 4,
                            "tts": true,
                            "type": "text",
                            "refId": "yxrshcky71o",
                            "backgroundColor": null,
                            "stroke": {
                                "color": "#000",
                                "size": 0
                            },
                            "start": 3.1824000000000003,
                            "shadow": {
                                "color": null,
                                "alpha": 1,
                                "offset": null
                            },
                            "wrap": true,
                            "active": true,
                            "children": [],
                            "end": 6.552
                        }
                    ],
                    "audio": true,
                    "src": "D:/code/foliko-trade/public/files/1rt2c003dh51d.mp3",
                    "volume": 2,
                    "start": 16.607999999999997,
                    "end": 23.159999999999997
                }
            ],
            "duration": 23.159999999999997,
            "start": 0,
            "end": 23.159999999999997
        },
        {
            "type": "audio",
            "audio": true,
            "src": "D:/code/foliko-trade/tmp/download/1rt2d001dh51d.mp3",
            "duration": 151.353,
            "fadeOut": 1,
            "refId": "zxd5ybxr56",
            "zIndex": 7,
            "children": [],
            "start": 3
        }
    ]
}

const file_name=`output/demo.mp4`
        const builder = createMultiTrackBuilder({
            width: video.width,
            height: video.height,
            fps: 30,
            outPath: file_name
        });
        const all_scenes=video.children.find(a=>a.type==="spine").children
        const scenes=all_scenes.filter(a=>a.type==="scene")
        const mainTrack = builder.createTrack({ zIndex: 1 });
        for(const item of scenes){
            const scene = mainTrack.createScene({ duration: item.duration,startTime:item.start||0 })
            for(const ele of item.children){
                if(ele.type==='image'){
                    scene.addImage({
                        width:ele.width,
                        height:ele.height,
                        duration:ele.duration,
                        x:ele.x,
                        y:ele.y,
                        src:ele.src,
                        startTime:ele.start||0,
                        fit:"cover"
                    })
                }else if(ele.type==='text'){
                    scene.addText({
                        duration:ele.duration,
                        x:ele.x,
                        y:ele.y,
                        startTime:ele.start||0,
                        fontSize:ele.fontSize.replace('rpx','%'),
                        color:ele.color,
                        fontPath:ele.fontFamily,
                    })
                }
            }
        }

        const subtitles=video.children.find(a=>a.id==='subtitle')?.children||[]
        const speakTrack = builder.createTrack({ zIndex: 2 });
        const duration=subtitles.reduce((acc,item)=>acc+item.duration,0)
        const scene = speakTrack.createScene({ duration: duration+3 })
        for(const item of subtitles){
            const text=item.children.map(a=>a.text).join('')
            const ele=item.children[0];
            console.log(item.start,'==',item.duration)
            scene.addSubtitle({
                text:text,
                fontSize:ele.fontSize.replace('rpx','%'),
                x:ele.x,
                y:ele.y,
                duration:item.duration,
                audio:item.src,
                color:ele.color,
                fontPath:ele.fontFamily,
                startTime:item.start
            })
        }


        
        

  try {
    const outputPath = await builder.render();
    console.log(`��� 多轨道调试视频已保存到: ${outputPath}`);
    console.log("✨ 多轨道配置调试完成！");
  } catch (error) {
    console.error("❌ 多轨道配置调试失败:", error);
  }
}

debugMultiTrackConfig().catch(console.error);
