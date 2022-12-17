import { atom } from "recoil";

export const groupMembersState = atom({
  key: "groupMembers",
  default: ["영수", "영희"],
});
