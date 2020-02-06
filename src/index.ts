
/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/2/6
 **/

export {ArrayBase} from  './array-base';
export {JsonBase} from  './json-base';
import {setProjectName} from './const';

/**
 *
 * @param projectName
 */
export function init(projectName:string) {
  setProjectName(projectName);
  return ;
}