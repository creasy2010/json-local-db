import {join} from 'path';
import {writeJsonSync,readJSONSync,existsSync, ensureFile,ensureFileSync, ensureDir, readJSON} from "fs-extra";
import {debounce,cloneDeep} from  'lodash';
import {v1} from 'uuid';
import {getBaseDir} from './const';
import produce from "immer"

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/


export class ArrayBase<T extends IBase> {
  fileLoc: string;

  db:T[];



  constructor(key: string) {
    this.fileLoc = join(getBaseDir(), key+".json");
    console.log(`从${this.fileLoc }读取配置信息`)
    this.init();
  }

  init=()=> {
    if (existsSync(this.fileLoc)) {
      this.db = readJSONSync(this.fileLoc);
    } else {
      this.db = [];
       ensureFileSync(this.fileLoc);
      this.dump();
    }

    process.on('exit', (code) => {
      this.dump();
    });
  }

  public findIndex(id:string):number{
    for (let i = 0, iLen = this.db.length; i < iLen; i++) {
      let item = this.db[i];
      if(item.id===id){
        return i;
      }
    }
    return -1;
  }

  public async findById(id:string){
    // @ts-ignore
    let [taskInfo] = this.db.filter((item)=>item.id==id);
    return taskInfo;
  }


  public add (item:T) {
    let time =Date.now();

    if(!item.id){
      item.id =v1();
    }

    this.db.push({createTime:time, ...item});
    this.dump();
  }

  del(id:string) {
    this.db=this.db.filter((item)=>item.id!==id);
    this.dump();
  }

  async update(id,updateItem:Partial<T>) {

    let index =  this.findIndex(id);

    let item  = this.db[index];
    item = produce<T>(item, draftState => {
      for (let updateItemKey in updateItem) {
        if(draftState.hasOwnProperty(updateItemKey)){
          //@ts-ignore
          draftState[updateItemKey] = updateItem[updateItemKey];
        }
      }
      draftState.updateTime =Date.now();
    });

    this.db.splice(index,1,item);
    this.dump();
  }

  //5秒才会真正被执行;
  dump=debounce(()=> {
    writeJsonSync(this.fileLoc,this.db,{spaces:2});
  },800)
}

export interface IBase{
  id?:string;
  createTime?:number;
  updateTime?:number;
}
