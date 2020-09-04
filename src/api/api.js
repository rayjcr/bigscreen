import * as api from '../utils/api';
import fetch from '../utils/fetch';

export function attendanceRule(data){
  return api.axGet('BIKaoQinRule',data)
}
export function schoolBaseInfo(data){
  return api.axGet('BITeacherAndStudentDetails',data)
}
export function attendanceRate(data){
  return api.axGet('BIClockInRateByClass',data)
}
export function attendanceTimeRange(data){
  return api.axGet('BIDistributionOfTimeByDayState',data)
}
export function realTimeStatisticsStu(data){
  return api.axGet('BICurrentKaoQinStatisticsByDayState',data)
}
export function realTimeStatisticsCls(data){
  return api.axGet('BICurrentKaoQinByDayState',data)
}
export function todayVisitor(data){
  return api.axGet('BIVisitorStatistics',data)
}
export function realTimeStatisticsSch(data){
  return api.axGet('BICurrentKaoQinStatisticsByDayState',data)
}
export function pollingInfo(data){
  return api.axGet('BIKaoQinInterfaceTimeConfig',data)
}
export function temperatureStatistics(data){
  return api.axGet('BIKaoQinTemperatureStatistics',data)
}