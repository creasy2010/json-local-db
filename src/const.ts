import {join} from "path";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/

export const baseDir = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);

