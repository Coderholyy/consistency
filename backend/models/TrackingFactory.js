import HabitTracking from "./HabitTracking.js";
import MoneyTracking from "./MoneyTracking.js";
import DietTracking from "./DietTracking.js";

class TrackingFactory {
  static createTracking(
    type,
    userId,
    title,
    goal,
    unit,
    frequency,
    repeat_interval
  ) {
    switch (type) {
      case "habit":
        return new HabitTracking(
          type,
          userId,
          title,
          goal,
          unit,
          frequency,
          repeat_interval
        );
      case "money":
        return new MoneyTracking(
          type,
          userId,
          title,
          goal,
          unit,
          frequency,
          repeat_interval
        );
      case "diet":
        return new DietTracking(
          type,
          userId,
          title,
          goal,
          unit,
          frequency,
          repeat_interval
        );
      default:
        throw new Error("Invalid tracking type");
    }
  }
}

export default TrackingFactory;
