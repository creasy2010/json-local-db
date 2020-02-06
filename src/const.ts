import {join} from "path";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/

let ConstProjectName=".demo";
export const baseDir = join(
  process.env.HOME || process.env.USERPROFILE,
  ConstProjectName,
);

export function setProjectName(projectName:string){
  ConstProjectName=projectName;
}


export function getBaseDir():string{
  return join(
    process.env.HOME || process.env.USERPROFILE,
    ConstProjectName,
  );
}



