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

    @property(cc.Prefab)
    bullt:cc.Prefab = null;

    firePoint: cc.Node  = null;

    @property(cc.AudioClip)
    fireAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    walkAudio: cc.AudioClip = null;

    vertical:number = 0;
    horizontal:number = 0;

    rBody: cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.director.getPhysicsManager().enabled = true;
    }
    up(){
        this.horizontal=0;
        this.vertical = 1;
    }
    down(){
        this.horizontal=0;
        this.vertical = -1;
    }
    left(){
        this.vertical = 0;
        this.horizontal = -1;
    }
    right(){
        this.vertical = 0;
        this.horizontal = 1;
    }
    stop(){
        this.vertical = 0;
        this.horizontal = 0;
    }
    start () {
        this.firePoint = this.node.getChildByName("firePoint");
        this.rBody = this.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(event)=>{
            
            switch(event.keyCode){
                case cc.macro.KEY.w:
                    this.vertical = 1;
                    break;
                case cc.macro.KEY.s:
                    this.vertical = -1;
                    break;
                case cc.macro.KEY.a:
                    this.horizontal = -1;
                    break;
                case cc.macro.KEY.d:
                    this.horizontal = 1;
                    break;
                case cc.macro.KEY.j:
                    this.fire();
                    break;
            }
        })

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,(event)=>{
            if(event.keyCode == cc.macro.KEY.w && this.vertical==1){
                this.vertical = 0;
            }
            if(event.keyCode == cc.macro.KEY.s && this.vertical == -1){
                this.vertical = 0;
            }
            if(event.keyCode == cc.macro.KEY.a && this.horizontal == -1){
                this.horizontal = 0;
            }
            if(event.keyCode == cc.macro.KEY.d && this.horizontal == 1){
                this.horizontal = 0;
            }
        })
    }
    fire(){
        let bult = cc.instantiate(this.bullt);
        // if(cc.audioEngine.isMusicPlaying)
        // cc.audioEngine.playMusic(this.fireAudio,false);
        cc.audioEngine.playEffect(this.fireAudio,false);
        bult.rotation = this.node.rotation;
        bult.setParent(cc.director.getScene());
        let pos  = this.firePoint.convertToWorldSpaceAR(cc.v2(0,0))
        bult.x = pos.x;
        bult.y = pos.y;
    }
    update (dt) {
        if(this.vertical !=0){
            this.node.rotation = this.vertical > 0 ?0 : 180;
            this.rBody.linearVelocity = cc.v2(0, 50*this.vertical);
            if(cc.audioEngine.isMusicPlaying()==false ){
                cc.audioEngine.playMusic(this.walkAudio,true);
            }
        }else if(this.horizontal != 0 ){
            this.node.rotation = this.horizontal > 0 ?90 : 270;
            this.rBody.linearVelocity = cc.v2(50*this.horizontal,0);
            if(cc.audioEngine.isMusicPlaying()==false ){
                cc.audioEngine.playMusic(this.walkAudio,true);
            }
        }else{
            this.rBody.linearVelocity = cc.v2(0,0)
            cc.audioEngine.stopMusic();
        }
    }
    onBeginContact(e){
        if(e.colliderA.node.name == 'wall'){
            this.stop();
        }
    }
}
