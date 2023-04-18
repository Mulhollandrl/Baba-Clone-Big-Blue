import Persistent from "../utilities/persistent.mjs";
import Observable from "../utilities/observable.mjs";
import { modesEnum } from "./enums.mjs"

export const Mode = new Observable(modesEnum.HOME)
