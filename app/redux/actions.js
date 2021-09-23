import { UPDATE_TOTAL } from "./action-types";

export function updateTotal(payload) {
  console.log({ action: UPDATE_TOTAL})
  return { type: UPDATE_TOTAL, payload }
};