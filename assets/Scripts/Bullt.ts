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

  

    rbody : cc.RigidBody = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let r = cc.misc.degreesToRadians(this.node.rotation);
        let v = cc.v2(0,1).rotate(-r);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(v.x*200,v.y*200);
    }
    onBeginContact(){
        this.node.destroy();
    }
    update (dt) {}
}
