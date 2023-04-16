import Persistent from "../utilities/persistent.mjs";
import Observable from "../utilities/observable.mjs";
import { MODES } from "./enums.mjs"

export const Mode = new Observable(MODES.MAIN)
