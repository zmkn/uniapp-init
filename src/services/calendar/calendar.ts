import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarPattern } from "./calendar-pattern";

export class Calendar {
  private constructor() {}

  formatMD(timestamp: number): string {
    return format(timestamp, CalendarPattern.md, { locale: zhCN });
  }

  formatHM(timestamp: number): string {
    return format(timestamp, CalendarPattern.hm, { locale: zhCN });
  }

  formatYMD(timestamp: number): string {
    return format(timestamp, CalendarPattern.ymd, { locale: zhCN });
  }

  formatWeek(timestamp: number): string {
    return format(timestamp, CalendarPattern.week, { locale: zhCN });
  }

  formatYMDHMS(timestamp: number): string {
    return format(timestamp, CalendarPattern.ymdhms, { locale: zhCN });
  }

  private static _instance?: Calendar;

  static getInstance(): Calendar {
    if (!this._instance) {
      this._instance = new Calendar();
    }
    return this._instance;
  }
}
