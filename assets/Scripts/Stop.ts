// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tank:cc.Node = null;

    start () {
        this.tank = cc.find("Canvas/tank").getComponent("Tank");
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            this.stop();
        })
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            this.stop();
        })
    }
    stop(){
        this.tank.stop();
    }

    // update (dt) {}
}