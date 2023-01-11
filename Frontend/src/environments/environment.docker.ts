// @ts-ignore
const serverURL = window['env']['apiUrl'];
export const environment = {
  production: true,

  authApi: serverURL + "/auth",
  userApi: serverURL + "/user",
  imageApi: serverURL + "/image"
};
