import dayjs from "dayjs";

export default (res = null) => {
  if (!res) return null;

  res.cookie("joystickLoginToken", null, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().toDate(),
  });

  res.cookie("joystickLoginTokenExpiresAt", null, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().toDate(),
  });

  return res;
};