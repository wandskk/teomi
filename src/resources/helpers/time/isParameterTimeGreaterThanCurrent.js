export function isParameterTimeGreaterThanCurrent(parameterTime) {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const [paramHours, paramMinutes] = parameterTime.split(":").map(Number);

  if (
    paramHours > currentHours ||
    (paramHours === currentHours && paramMinutes > currentMinutes)
  ) {
    return true;
  } else {
    return false;
  }
}
