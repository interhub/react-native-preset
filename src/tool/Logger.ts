import {DdLogs, DdRum, DdTrace} from 'dd-sdk-reactnative';
import Bugsnag from '@bugsnag/react-native';
import {NotifiableError, OnErrorCallback} from '@bugsnag/core/types/common';
import {Platform} from 'react-native';

/**
 logger messages for show on DatDog web interface https://app.datadoghq.eu/logs
 */
export enum LOGGER_MESSAGE {
  WALKING_DATA_RAW = 'Данные шагов сырые',
  WALKING_DATA_FILTERED = 'Данные шагов отфильтрованные',
  SPORT_DATA_RAW = 'Спортивные активности сырые',
  SPORT_DATA_CONVERTED = 'Спортивные активности конвертированные',
  ACTIVITIES_DATA_FULL = 'Все активности конвертированные',
  CHECK_ACTIVE_HUB = 'Проверка активации трекера',
  SET_ACTIVE_HUB = 'Активация трекера',
  FAILED_ACTIVE_HUB = 'Не успешная авторизация трекера',
  DEACTIVATE_INTEGRATION = 'Отключение трекера',
  SAVED_ACTIVITIES_DB = 'Активности попавшие в ленту',
}

export enum TRACKER_MESSAGE {
  START_APP_TIME = 'Время запуска приложения',
  SYNC_APP_TIME = 'Время синхронизации активностей',
}

/**
 SDK https://github.com/DataDog/dd-sdk-reactnative
 Docs 1 https://docs.datadoghq.com/real_user_monitoring/reactnative/
 */
class Logger {
  private formatObj(obj: any) {
    if (typeof obj !== 'object') {
      return obj;
    }
    try {
      const formattedObj: any = {
        device_os: Platform.OS,
      };
      Object.keys({...obj}).map((key) => {
        const value = obj[key];
        try {
          if (typeof value === 'object') {
            formattedObj[key] = JSON.stringify(value, null, ' ');
          } else {
            formattedObj[key] = value;
          }
        } catch (e) {
          formattedObj[key] = value;
        }
      });
      return formattedObj;
    } catch (e) {
      return obj;
    }
  }

  public startTrack(message: TRACKER_MESSAGE): {stopTrack: () => void} {
    DdRum.addTiming(message);
    DdRum.startResource(message, 'trackPromise', message, Date.now(), {});
    DdTrace.startSpan(message, Date.now(), {});
    const stopTrack = () => {
      DdRum.stopResource(message, 200, message, Date.now(), {});
      DdTrace.finishSpan(message, Date.now(), {});
    };
    return {stopTrack};
  }

  private getServiceString(message: string, service?: string) {
    return (service ? `[${service}] ` : '') + message;
  }

  public debug(message: LOGGER_MESSAGE, obj: Object, service = '') {
    return DdLogs.debug(
      this.getServiceString(message, service),
      this.formatObj(obj),
    );
  }

  public warn(message: LOGGER_MESSAGE, obj: Object, service = '') {
    return DdLogs.warn(
      this.getServiceString(message, service),
      this.formatObj(obj),
    );
  }

  public error(message: NotifiableError, onError?: OnErrorCallback) {
    Bugsnag.notify(message, onError);
    DdRum.addError(
      String(message),
      String(message),
      String(message),
      Date.now(),
      {message},
    );
    DdLogs.error(String(message), {message});
    return;
  }
}

export default new Logger();
