export interface Login {
  login: Function
  verifyLogin: Function
}

export interface Register {
  register: Function
  verifyRegister: Function
}

export interface ResetPwd {
  resetPwd?: Function
  verifyResetPwd?: Function
}

export interface Logout {
  logout: Function
}

export interface ClearPwd {
  clearPwd: Function
}
