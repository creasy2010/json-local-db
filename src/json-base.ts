/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/
import {join} from 'path';
import {writeJsonSync,readJSONSync,existsSync, ensureFile,ensureFileSync, ensureDir, readJSON} from "fs-extra";
import {debounce} from  'lodash';
import {getBaseDir} from './const';
import {v1} from 'uuid';


export class JsonBase<T=any>{
  fileLoc: string;
  data:T;

  _defautValue;

  constructor(key: string,defaultValue:T) {
    this.fileLoc = join(getBaseDir(), key+".json");
    this._defautValue=defaultValue;
    this.init();
  }

  init=()=> {
    debugger;
    if (existsSync(this.fileLoc)) {
      this.data = readJSONSync(this.fileLoc);
    } else {
      debugger;
      ensureFileSync(this.fileLoc);
      this.data=this._defautValue;
      this.dump();
    }
    process.on('exit', (code) => {
      this.dump();
    });
  }

  //5秒才会真正被执行;
  dump=debounce(()=> {
    if(this.data){
      writeJsonSync(this.fileLoc,this.data,{spaces:2});
    }
  },0)

}