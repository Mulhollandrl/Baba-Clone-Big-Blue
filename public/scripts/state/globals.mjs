import { Persistent } from "../utilities/persistent";
import { Observable } from "../utilities/observable";
import { Modes } from "./enums"

export const Mode = new Observable(Modes.MAIN)
