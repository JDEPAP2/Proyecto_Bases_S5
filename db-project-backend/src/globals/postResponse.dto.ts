import { responseDto } from "./response.dto";

export enum state {
    success = "success",
    error = "error"
  }
export interface postResponseDto extends responseDto{
    state: state,
}
